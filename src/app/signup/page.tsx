"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"INDIVIDUAL" | "ORGANIZATION">("INDIVIDUAL")
  const [fullName, setFullName] = useState("")
  const [surname, setSurname] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      const url = `${apiBase.replace(/\/$/, '')}/auth/signup`
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || "Signup failed")
      }
      const data = await res.json()
      if (data?.access_token) {
        try { localStorage.setItem("access_token", data.access_token) } catch {}
      }
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="mx-auto h-8" />
            <h1 className="text-3xl font-bold font-headline">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Join our community and start your sustainability journey
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
              <CardDescription>
                Already have an account?{" "}
                <Link href="/" className="underline">
                  Login
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input id="surname" placeholder="Doe" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <select id="role" className="border rounded h-10 px-3 bg-background" value={role} onChange={(e) => setRole(e.target.value as any)}>
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="ORGANIZATION">Organization</option>
                  </select>
                </div>
                {error && (
                  <p className="text-sm text-red-500" role="alert">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <div className="hidden bg-muted lg:block h-full overflow-hidden">
        <Image
          src="/images/1200x1200"
          alt="Image"
          width={1080}
          height={1920}
          data-ai-hint="forest nature"
          className="h-full w-full object-screen dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
