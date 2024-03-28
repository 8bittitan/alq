import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

import RegisterForm from './form'

export default function RegisterPage() {
  return (
    <div className="pt-16">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email below to register for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login.
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
