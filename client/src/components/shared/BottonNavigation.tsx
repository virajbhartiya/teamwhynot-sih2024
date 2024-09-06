import { Menubar, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { Home, User, Settings } from 'lucide-react'

const BottonNavigation = () => {
  return (
    <div className="menubar-container">
      <Menubar>
        <MenubarMenu>
          <div className="flex justify-between w-full">
            <MenubarTrigger className="order-3 menubar-trigger-large">
              <Home className="h-6 w-6" />
            </MenubarTrigger>
            <MenubarTrigger className="order-2 menubar-trigger-large mx-auto">
              <User className="h-6 w-6" />
            </MenubarTrigger>
            <MenubarTrigger className="order-1 menubar-trigger-large">
              <Settings className="h-6 w-6" />
            </MenubarTrigger>
          </div>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default BottonNavigation
