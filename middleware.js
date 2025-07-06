import { NextResponse } from "next/server";

export default function middleware(request) {
  console.log("Middleware");
  return NextResponse.next();
}
