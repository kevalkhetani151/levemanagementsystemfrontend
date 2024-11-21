/* import { NextRequest, NextResponse } from 'next/server';

// Middleware function to handle session verification
export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken'); // Fetch the 'sessionToken' cookie
  const url = req.nextUrl;
  
  // Check if the sessionToken is not set and the user is trying to access the /home page
  if (!sessionToken && url.pathname.startsWith('/home')) {
    // Redirect to the login page if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Specify the paths that the middleware should apply to
export const config = {
  matcher: ['/home/:path*'], // Apply middleware only to the /home route and its sub-paths
}; */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken');
  console.log(sessionToken?.value);
  console.log('cookies get here');
  console.log(sessionToken);
  console.log("middleware is called here");
  
  if (sessionToken?.value) {
    console.log("login successfully, welcome to my website");
    return NextResponse.next();
  } else {
    console.log("try again");
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/Home', '/Dashboard'],
};
