import { withAuth } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (!token?.role) {
      return Response.redirect(new URL("/sign-in", req.url));
    }

    const role = token.role;
    console.log("role", role);

    // حماية صفحة /admin
    if (pathname.startsWith("/admin")) {
      if (role !== "admin") {
        return Response.redirect(new URL("/", req.url));
      }
    }

    // حماية صفحة /dashboard
    if (pathname.startsWith("/dashboard")) {
      if (role === "ghost") {
        return Response.redirect(new URL("/", req.url));
      }
    }

    return null; // اسمح بالمرور
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // يسمح فقط للمسجلين
    },
  }
);

// تطابق الصفحات المطلوب حمايتها
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
