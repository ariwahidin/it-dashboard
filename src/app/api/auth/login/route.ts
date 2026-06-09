import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";
import { signToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "Username and password required." }, { status: 400 });
    }

    const db = await getDB();
    const res = db.exec(
      "SELECT id, username, password, role FROM users WHERE username = ?",
      [username.trim()]
    );

    if (res.length === 0 || res[0].values.length === 0) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const [id, uname, hashedPw, role] = res[0].values[0] as [number, string, string, string];

    const valid = await bcrypt.compare(password, hashedPw);
    if (!valid) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    const token = await signToken({ userId: id, username: uname, role });

    const response = NextResponse.json({ ok: true, username: uname, role });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[Login Error]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}