import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if user is signed in, check role, whether has Admin access
  if (user && req.nextUrl.pathname.startsWith("/admin")) {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id);
    if (!data) return NextResponse.redirect(new URL("/", req.url));
    if (data[0].role !== "Admin")
      return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*"],
};
