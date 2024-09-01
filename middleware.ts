import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'

])

export default clerkMiddleware((auth, req) => {
    if (protectedRoutes(req)) auth().protect();
    publicRoutes: ["/", "forget-password", "/api/webhooks/clerk"]

});



export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};