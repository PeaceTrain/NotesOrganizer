import Link from "next/link";
import React from "react";

const nav = ["Inbox", "Notes", "Topics", "Screenshots", "Lists", "Workflows", "Search", "Admin"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ fontFamily: "Inter, sans-serif", margin: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
          <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
            <h2>InkForge</h2>
            <nav style={{ display: "grid", gap: 8 }}>
              {nav.map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`}>{item}</Link>
              ))}
            </nav>
          </aside>
          <main style={{ padding: 20 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
