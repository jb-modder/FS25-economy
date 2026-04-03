"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="5.5" height="5.5" rx="0.75" fill="currentColor" />
    <rect x="8.5" y="1" width="5.5" height="5.5" rx="0.75" fill="currentColor" />
    <rect x="1" y="8.5" width="5.5" height="5.5" rx="0.75" fill="currentColor" />
    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.75" fill="currentColor" />
  </svg>
);

const FieldsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1" y="2"   width="13" height="1.5" rx="0.5" fill="currentColor" />
    <rect x="1" y="5.5" width="13" height="1.5" rx="0.5" fill="currentColor" />
    <rect x="1" y="9"   width="13" height="1.5" rx="0.5" fill="currentColor" />
    <rect x="1" y="12.5" width="13" height="1.5" rx="0.5" fill="currentColor" />
  </svg>
);

const InputsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path
      d="M5.5 1h4v2.25L12 7v6.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5V7l2.5-3.75V1z"
      stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"
    />
    <line x1="3.5" y1="9" x2="11.5" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

const FinancesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <rect x="1"   y="7.5" width="3" height="6" rx="0.5" fill="currentColor" />
    <rect x="6"   y="4.5" width="3" height="9" rx="0.5" fill="currentColor" />
    <rect x="11"  y="1.5" width="3" height="12" rx="0.5" fill="currentColor" />
    <line x1="0.5" y1="14" x2="14.5" y2="14" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const navItems = [
  { label: "Dashboard", href: "/",          icon: DashboardIcon },
  { label: "Fields",    href: "/fields",     icon: FieldsIcon    },
  { label: "Inputs",    href: "/inputs",     icon: InputsIcon    },
  { label: "Finances",  href: "/finances",   icon: FinancesIcon  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-13 bottom-0 w-52 bg-farm-panel border-r border-farm-border flex flex-col">

      {/* Branding */}
      <div className="px-4 py-5 border-b border-farm-border">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 bg-farm-accent text-farm-bg text-[11px] font-black flex items-center justify-center rounded-sm shrink-0 tracking-tight">
            AF
          </div>
          <span className="text-sm font-semibold text-farm-text tracking-wide">AgriForge</span>
        </div>
        <p className="text-[11px] text-farm-subtle ml-9 uppercase tracking-widest">Workbench</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-2 mt-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={[
                "relative flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors",
                "border-l-2",
                isActive
                  ? "border-farm-accent bg-farm-border text-farm-text"
                  : "border-transparent text-farm-muted hover:bg-farm-border hover:text-farm-text",
              ].join(" ")}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
