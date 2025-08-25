import { NextRequest, NextResponse } from "next/server";
import * as jwwt from "jose";
import { cookies } from "next/headers";

// Token check
// middleware function
export default async function middleware(req: NextRequest, res: NextResponse) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/tokenuse"],
};
