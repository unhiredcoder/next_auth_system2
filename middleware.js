import { NextResponse } from 'next/server';

// Define the middleware function
export function middleware(request) {
    // Extract the path from the request URL
    const path = request.nextUrl.pathname;

    // Check if the path is one of the public paths ('/login' or '/register')
    const isPublicPath = path === "/login" || path === "/register";

    // Get the 'Token' cookie value or an empty string if it doesn't exist
    const token = request.cookies.get('Token')?.value || '';

    // If it's a public path and there's a token, redirect to the current path
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    // If it's not a public path and there's no token, redirect to '/login'
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// Configuration to define matching paths
export const config = {
    matcher: ['/','/profile', '/register', '/login'],
};
