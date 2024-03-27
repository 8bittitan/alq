import LoginForm from './form'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

export default function LoginPage() {
  return (
    <div className="pt-16">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up.
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
