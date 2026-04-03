"use client";

import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/":          "Farm Dashboard",
  "/fields":    "Fields",
  "/inputs":    "Inputs",
  "/finances":  "Finances",
};

function getTitle(pathname: string): string {
  if (routeTitles[pathname]) return routeTitles[pathname];
  if (pathname.startsWith("/fields/")) return "Field Calculator";
  return "Midwest Modding Studio";
}

export default function Header() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header
      className="fixed top-0 left-0 right-0 h-13 z-50 flex items-center px-6
                 border-b border-farm-border"
      style={{
        background: "linear-gradient(180deg, #161f2e 0%, #111827 100%)",
      }}
    >
      {/* Left: page identity */}
      <div>
        <p className="text-sm font-semibold text-farm-text leading-tight">{title}</p>
        <p className="text-[10px] uppercase tracking-widest text-farm-subtle leading-tight mt-0.5">
          Midwest Modding Studio
        </p>
      </div>

      {/* Right: reserved for user/account */}
      <div className="ml-auto" />
    </header>
  );
}
