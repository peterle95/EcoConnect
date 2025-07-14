import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function SignupPage() {
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-6">
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
                            <Input id="name" placeholder="John" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="surname">Surname</Label> 
                            <Input id="surname" placeholder="Doe" required />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full" asChild>
                            <Link href="/dashboard">Create Account</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
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
