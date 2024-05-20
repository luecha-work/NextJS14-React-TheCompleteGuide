import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`middleware: ${request}`);
  // return NextResponse.redirect(new URL("/home", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/news",
};

// export function middleware(request: NextRequest) {
//   const isLoggedIn = checkIfLoggedIn(request); // สมมติว่ามีฟังก์ชันตรวจสอบการล็อกอิน

//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next(); // อนุญาตให้ request ผ่านไปยัง handler ถัดไป
// }

// function checkIfLoggedIn(request: NextRequest) {
//   // ฟังก์ชันสมมติสำหรับการตรวจสอบการล็อกอิน
//   const token = request.cookies.get('authToken');
//   return token ? true : false;
// }
