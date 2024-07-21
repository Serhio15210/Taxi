import { NextResponse } from 'next/server'
import {loadToken} from "./utils/storage";

// Beware loops when redirecting to the same directory
export function middleware (request) {

  // // if (request.nextUrl.pathname === '/home')
  // const token=loadToken()
  // console.log('token',token)
  // const { pathname, origin } = request.nextUrl
  // if(pathname==='/home'&&token) {
  //   return NextResponse.redirect(`${origin}/partner`)
  // }
  // if (pathname==='/partner'&&token){
  //   return NextResponse.redirect(`${origin}/home`)
  // }
  return NextResponse.next()
}

