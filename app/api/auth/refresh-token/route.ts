import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await fetch("http://54.255.206.242:4816/api/refresh-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: req.cookies.get("cookie")?.value || "",
    },
    credentials: "include",
  });

  const data = await res.json();

  const response = NextResponse.json(data, { status: res.status });

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
