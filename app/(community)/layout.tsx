import {serverClient} from '@/lib/supabase/server';
import {redirect} from 'next/navigation';
import {AppShell} from '@/components/app-shell';
export const dynamic='force-dynamic';
export default async function Layout({children}:{children:React.ReactNode}){const client=await serverClient();const{data:{user}}=await client.auth.getUser();if(!user)redirect('/entrar');const{data}=await client.from('profiles').select('display_name').eq('id',user.id).single();return <AppShell name={data?.display_name||'MR'}>{children}</AppShell>}
