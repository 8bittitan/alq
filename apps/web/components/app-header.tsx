'use client'

import {
  CircleUser,
  Info,
  KeyRound,
  LogOut,
  Menu,
  MoonStar,
  Package2,
  Settings,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import { logout } from '~/actions/auth'
import CodeExamples from '~/components/code-examples'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'

type Props = {
  username: string
}

export default function AppHeader({ username }: Props) {
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/app"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="w-6 h-6" />
              ALQ
            </Link>
            <Link
              href="/app/apikeys"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <KeyRound className="w-5 h-5" />
              API Key
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ALQ is Open Source</CardTitle>
                <CardDescription>
                  This was built as a personal project and is open source.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full" asChild>
                  <a href="https://github.com/8bittitan/alq" target="_blank">
                    View repo
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
      <div className="ml-auto flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline" className="rounded-full">
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Example Request</DialogTitle>
              <DialogDescription>
                This is just an example of how to make a request
              </DialogDescription>
            </DialogHeader>
            <CodeExamples />
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${username}`}
                />
                <AvatarFallback>
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4 mr-2" /> Light theme
                </>
              ) : (
                <>
                  <MoonStar className="h-4 w-4 mr-2" /> Dark theme
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/settings" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
