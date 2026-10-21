import {NextResponse,type NextRequest} from 'next/server';
import {serverClient} from '@/lib/supabase/server';
import {safeRedirect} from '@/lib/plans';
export async function GET(req:NextRequest){const code=req.nextUrl.searchParams.get('code');if(code){const client=await serverClient();const{error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(safeRedirect(req.nextUrl.searchParams.get('next')),req.url))}return NextResponse.redirect(new URL('/entrar',req.url))}
