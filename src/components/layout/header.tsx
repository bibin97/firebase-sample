'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, Wand2 } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/copy-generator', label: 'AI Copy Generator' },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => (
    <nav className={cn('flex items-center gap-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center font-bold text-lg">
            <Wand2 className="h-6 w-6 mr-2 text-primary" />
            MashMagic
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">Log in</Button>
          <Button>Get Started</Button>
        </div>

        <div className="flex md:hidden items-center ml-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col p-6">
                <Link
                  href="/"
                  className="flex items-center font-bold text-lg mb-8"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Wand2 className="h-6 w-6 mr-2 text-primary" />
                  MashMagic
                </Link>
                <NavLinks
                  className="flex-col items-start gap-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
