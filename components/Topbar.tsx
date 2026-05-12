"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/discovery", label: "HR Discovery" },
  { href: "/assess", label: "Employee Assessment" },
  { href: "/dashboard", label: "HR Dashboard" },
];

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/95 px-8 py-3.5 text-white backdrop-blur max-lg:flex-col max-lg:items-start">
      <Link href="/" className="flex items-center gap-3 text-[19px] font-black tracking-[-0.04em]">
        <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-sky-500 text-[15px] font-black text-white">
          S
        </span>
        <span>SkillGap AI</span>
      </Link>

      <nav className="flex flex-wrap items-center gap-1">
        {navItems.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-pill px-3.5 py-2 text-[13px] font-bold transition ${
                active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
