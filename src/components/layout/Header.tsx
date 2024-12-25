import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../theme-provider';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">HAMBRE</span>
        </a>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <nav className="hidden md:flex items-center space-x-4">
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
                  Mis Notas
                </Button>
                <Button className="justify-start">Iniciar sesión</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}