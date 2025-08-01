
"use client";

import Link from 'next/link';
import { Button } from './ui/button';
import { GraduationCap, Menu, Loader2, User, Shield, LogOut, FileArchive, StickyNote, FlaskConical, Bot, Info, Mail, UploadCloud, FileCheck, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

const mainNavLinks = [
  { href: '/past-papers', label: 'Past Papers', icon: FileArchive },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/lab-manuals', label: 'Lab Manuals', icon: FlaskConical },
  { href: '/ai-study-guide', label: 'AI Study Guide', icon: Bot },
];

const moreDropdownLinks = [
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
]

export default function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const NavLink = ({ href, children, className, icon: Icon }: { href: string; children: React.ReactNode, className?: string, icon?: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-primary flex items-center gap-2",
          isActive ? "text-primary font-semibold" : "text-slate-600",
          className
        )}
        onClick={() => setSheetOpen(false)}
      >
      {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Link>
    );
  };
  

  const MoreDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hidden md:flex items-center gap-1 text-slate-600 font-semibold">
                More <ChevronDown className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {moreDropdownLinks.map(link => (
                 <DropdownMenuItem key={link.href} asChild>
                     <Link href={link.href} className='flex items-center gap-2'><link.icon className="h-4 w-4"/>{link.label}</Link>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">QUEST Study Hub</span>
        </Link>
        
        <nav className="hidden items-center space-x-4 text-sm font-medium md:flex">
          {mainNavLinks.map((link) => (
              <NavLink key={link.href} href={link.href} className="font-semibold text-slate-600 hover:text-primary" icon={link.icon}>
                {link.label}
              </NavLink>
          ))}
           <div className="hidden md:block">
             <MoreDropdown />
           </div>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            
            {isClient && loading ? (
                <Loader2 className="h-5 w-5 animate-spin"/>
            ) : isClient && !user ? (
                 <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" asChild size="sm">
                        <Link href="/login" className="flex items-center gap-2"><LogIn className="h-4 w-4"/>Login</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/register" className="flex items-center gap-2"><UserPlus className="h-4 w-4"/>Register</Link>
                    </Button>
                </div>
            ) : isClient && user ? (
                <>
                 <Button asChild size="sm" className="hidden sm:flex items-center gap-2">
                    <Link href="/upload">
                        <UploadCloud className="h-4 w-4" />
                        <span>Upload</span>
                    </Link>
                 </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {user.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.fullName}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                         <Link href="/my-uploads"><FileCheck className="mr-2 h-4 w-4" />My Uploads</Link>
                       </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                          <Link href="/account"><User className="mr-2 h-4 w-4" />Account</Link>
                      </DropdownMenuItem>
                      {user.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin"><Shield className="mr-2 h-4 w-4" />Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
                </>
            ): (
              <div className="h-10 w-10"></div>
            )}
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background w-[280px]">
               <SheetHeader className="border-b pb-4 text-left">
                  <SheetTitle>
                     <Link href="/" className="flex items-center space-x-2" onClick={() => setSheetOpen(false)}>
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Navigation Menu</span>
                    </Link>
                  </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 text-lg font-medium mt-8">
                {[...mainNavLinks, ...moreDropdownLinks].map((link) => {
                    return (
                        <NavLink key={link.href + link.label} href={link.href} className="text-base" icon={link.icon}>
                            {link.label}
                        </NavLink>
                    )
                })}
                
                 <div className="mt-auto border-t border-border pt-6">
                 <h4 className="px-1 text-sm font-semibold text-muted-foreground mb-4">Account</h4>
                  <div className="grid gap-4">
                    {isClient && user && (
                      <>
                        <NavLink href="/upload" className="text-base" icon={UploadCloud}>Upload Material</NavLink>
                        <NavLink href="/my-uploads" className="text-base" icon={FileCheck}>My Uploads</NavLink>
                        <NavLink href="/account" className="text-base" icon={User}>Account</NavLink>
                        {user.role === 'admin' && <NavLink href="/admin" className="text-base" icon={Shield}>Admin</NavLink> }
                      </>
                    )}
                 </div>

                 <div className="mt-8 border-t border-border pt-6">
                  {isClient && loading ? null : isClient && user ? (
                      <Button variant="secondary" className="w-full mt-4" onClick={() => {logout(); setSheetOpen(false);}}><LogOut className="mr-2 h-4 w-4"/>Logout</Button>
                  ) : isClient ? (
                      <div className="grid gap-4">
                          <Button asChild className="w-full" variant="outline">
                              <Link href="/login" onClick={() => setSheetOpen(false)}>Login</Link>
                          </Button>
                          <Button asChild className="w-full" variant="primary">
                              <Link href="/register" onClick={() => setSheetOpen(false)}>Register</Link>
                          </Button>
                      </div>
                   ) : null}
                  </div>
                 </div>

              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
