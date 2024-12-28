'use client'

import { useSigninMutation } from '@/gql/authMutations'
import { setToken } from '@/utils/token'
import { Button, Input, Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const SigninPage = () => {
  const [state, setState] = useState({ password: '', email: '' })
  const [{ fetching }, signin] = useSigninMutation()
  // const [signinResult, signin] = useMutation(SigninMutation)
  const router = useRouter()

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)

    if (state.email.trim() === '' || state.password.trim() === '') {
      return
    }

    const result = await signin({ input: state })
    console.log(result.data)
    if (result.data?.signin) {
      setToken(result.data.signin.token)
      router.push('/')
    }
  }

  return (
    <>
      <div className="bg-white rounded-md border p-4 w-full shadow-sm">
        <div className="text-2xl text-black/70">Sign in</div>
        <form onSubmit={handleSignin} className="flex flex-col gap-4 mt-4">
          <div>
            <Input
              value={state.email}
              onValueChange={(v) => setState((s) => ({ ...s, email: v }))}
              variant="faded"
              name="email"
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
              name="password"
              type="password"
              classNames={{ inputWrapper: 'bg-slate-50 border-slate-100' }}
            />
          </div>
          <div className="text-end">
            <Button type="submit" variant="solid" color="primary">
              {fetching ? <Spinner color="default" /> : 'Signin'}
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-3 text-slate-400">
        Don&apos;t have an account ?{' '}
        <Link href="/signup" className=" text-slate-600">
          Register
        </Link>
      </p>
    </>
  )
}

export default SigninPage
