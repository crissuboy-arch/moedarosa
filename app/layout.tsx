import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Pwa } from '@/components/pwa';
export const metadata:Metadata={title:{default:'Moeda Rosa — Você nunca está sozinha.',template:'%s | Moeda Rosa'},description:'Uma comunidade global para mulheres se conectarem, aprenderem e crescerem juntas.',manifest:'/manifest.webmanifest',icons:{icon:'/lotus.svg',apple:'/icon-192.png'}};
export const viewport:Viewport={themeColor:'#17131D',width:'device-width',initialScale:1};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt"><body><a className="skip" href="#conteudo">Saltar para o conteúdo</a>{children}<Pwa/></body></html>}
