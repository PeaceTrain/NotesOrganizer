import React from "react";

export function PageShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export function Badge({ label }: { label: string }) {
  return <span style={{ border: "1px solid #ddd", borderRadius: 6, padding: "2px 8px" }}>{label}</span>;
}
