import Logo from '@/app/_components/Logo'
import { removeToken } from '@/utils/token'
import { Button } from '@nextui-org/react'
import { Boxes, LayoutGrid, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/', name: 'Issues', Icon: Boxes },
  { href: '/projects', name: 'Projects', Icon: LayoutGrid },
  { href: '/settings', name: 'Settings', Icon: Settings },
]

const Sidebar = () => {
  const router = useRouter()
  const handleLogout = () => {
    console.log('lgging out')
    removeToken()
    router.push('/signin')
  }

  return (
    <div className="w-full h-full py-3 flex flex-col justify-between">
      <div>
        <div className="px-4 ">
          <Link href="/" className="">
            <Logo />
          </Link>
        </div>
        <div className="mt-8 px-4 ">
          <div>
            {links.map((link) => {
              return (
                <div key={link.href}>
                  <Link href={link.href}>
                    <div className="flex gap-2 items-center hover:bg-white border hover:border-black/20 border-transparent py-2 px-2 rounded-lg transition-all">
                      <link.Icon size={16} />
                      <span>{link.name}</span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* <button className="text-center px-6 py-2">Logout</button> */}
      <Button
        className="m-1 w-2/3 place-self-center"
        type="button"
        variant="solid"
        color="default"
        onPress={handleLogout}
      >
        Logout
      </Button>
    </div>
  )
}

export default Sidebar
