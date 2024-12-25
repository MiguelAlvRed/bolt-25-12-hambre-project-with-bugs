import { Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from './ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">HAMBRE</span>
        </a>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost">Mis Notas</Button>
          <Button>Iniciar sesión</Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost" className="justify-start">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              <Button variant="ghost" className="justify-start">
                Mis Notas
              </Button>
              <Button className="justify-start">Iniciar sesión</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}