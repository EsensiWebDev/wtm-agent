import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch("http://54.255.206.242:4816/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();

  // Forward the cookie from backend to client
  const response = NextResponse.json(data, { status: res.status });

  const refreshToken = res.headers.get("set-cookie");
  if (refreshToken) {
    response.headers.set("set-cookie", refreshToken);
  }

  // if (res.status !== 200) {
  //   return NextResponse.json(
  //     { error: data.message || "Login failed" },
  //     { status: res.status },
  //   );
  // }

  return response;
}
