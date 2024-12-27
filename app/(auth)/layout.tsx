import { PropsWithChildren } from 'react'
import Logo from '../_components/Logo'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-slate-50 w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-screen-sm flex items-center justify-center">
        <div className="w-full">
          <div className="mb-4">
            <Logo />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
