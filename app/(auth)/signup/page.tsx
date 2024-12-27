'use client'

import { useSignupMutation } from '@/gql/authMutations'
import { setToken } from '@/utils/token'
import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const SignupPage = () => {
  const [state, setState] = useState({ password: '', email: '' })
  const [signupResult, signup] = useSignupMutation()
  const router = useRouter()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await signup({ input: state })
    if (response.data?.createUser) {
      setToken(response.data.createUser.token)
      router.push('/')
    }
  }

  return (
    <>
      <div className="bg-white rounded-md border p-4 w-full shadow-sm">
        <div className="text-2xl text-black/70">Sign up</div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 mt-4">
          <div>
            <Input
              value={state.email}
              onValueChange={(v) => setState((s) => ({ ...s, email: v }))}
              variant="faded"
              label="Email"
              classNames={{
                inputWrapper: 'bg-slate-50 border-slate-100',
              }}
            />
          </div>
          <div>
            <Input
              variant="faded"
              value={state.password}
              onValueChange={(v) => setState((s) => ({ ...s, password: v }))}
              label="Password"
              type="password"
              classNames={{ inputWrapper: 'bg-slate-50 border-slate-100' }}
            />
          </div>
          <div className="text-end">
            <Button type="submit" variant="solid" color="primary">
              Signup
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-3 text-slate-400">
        Already have an account ?{' '}
        <Link href="/signin" className=" text-slate-600">
          Login
        </Link>
      </p>
    </>
  )
}

export default SignupPage
