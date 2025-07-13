import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="w-full lg:grid h-full lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="mx-auto h-8" />
            <h1 className="text-3xl font-bold font-headline">Welcome to EcoConnect</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Login</CardTitle>
              <CardDescription>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" asChild>
                  <Link href="/dashboard">Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1080x1920"
          alt="Image"
          width="1080"
          height="1920"
          data-ai-hint="forest nature"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
