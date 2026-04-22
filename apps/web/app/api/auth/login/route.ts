import { NextRequest, NextResponse } from "next/server";
import { login } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const token = await login(email, password);
  if (!token) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  return NextResponse.json({ token });
}
