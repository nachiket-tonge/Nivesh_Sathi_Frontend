import { NextResponse } from "next/server";
import { API } from "../../../../lib/config";

export async function POST(req) {
  try {
    const body = await req.json();

    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(API.AI.RECOMMEND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });

  } catch (err) {
    console.error("Proxy error:", err);

    return NextResponse.json(
      { error: "Proxy failed" },
      { status: 500 }
    );
  }
}