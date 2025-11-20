import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { scrollManager } from "@/lib/scrollManager";

export function Header() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      // Set pending target and navigate to home
      scrollManager.setPendingTarget(sectionId);
      setLocation("/");
    } else {
      // Already on home, scroll directly
      scrollManager.scrollToSection(sectionId);
    }
  };

  const navigation = [
    { name: "Home", href: "/", type: "link" },
    { name: "Analyze Media", href: "/upload", type: "link" },
    { name: "Features", sectionId: "features", type: "scroll" },
    { name: "Pricing", sectionId: "pricing", type: "scroll" },
  ];

  const isActive = (item: typeof navigation[0]) => {
    if (item.type === "link") {
      if (item.href === "/") return location === "/";
      return location.startsWith(item.href);
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 hover-elevate px-2 py-1 rounded-md -ml-2 cursor-pointer" data-testid="link-logo">
              <img
                src="/deepmind logo.png"
                alt="DeepMinds Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold">DeepMinds</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              item.type === "link" ? (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={isActive(item) ? "bg-accent" : ""}
                    data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => scrollToSection(item.sectionId!)}
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" data-testid="button-login">
              Login
            </Button>
            <Link href="/upload">
              <Button data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  item.type === "link" ? (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${isActive(item) ? "bg-accent" : ""}`}
                        data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        scrollToSection(item.sectionId!);
                        setIsOpen(false);
                      }}
                      data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.name}
                    </Button>
                  )
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" data-testid="mobile-button-login">
                    Login
                  </Button>
                  <Link href="/upload" onClick={() => setIsOpen(false)}>
                    <Button className="w-full" data-testid="mobile-button-get-started">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
