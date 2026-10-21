import type {Database} from '@/lib/database.types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
export async function serverClient(){const store=await cookies();return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{cookies:{getAll(){return store.getAll()},setAll(items){try{items.forEach(({name,value,options})=>store.set(name,value,options))}catch{/* Server components cannot set cookies. */}}}})}
