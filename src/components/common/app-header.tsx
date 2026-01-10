"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "The Book", href: "/book" },
  { label: "FAQ", href: "/faq" },
  { label: "The Author", href: "/author" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-wide text-white"
            >
              let me give you the game
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-x-10">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-semibold uppercase transition-colors",
                    pathname === item.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white"
              aria-label="Open menu"
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-6 bg-white" />
                <span className="block h-0.5 w-6 bg-white" />
                <span className="block h-0.5 w-6 bg-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MODAL */}
      {open && (
        <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm">
          <div className="flex h-full flex-col items-center justify-center text-center">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Menu */}
            <nav className="space-y-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-lg font-semibold uppercase tracking-wide transition-colors",
                    pathname === item.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
