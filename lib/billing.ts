import Stripe from 'stripe';
import {createClient} from '@supabase/supabase-js';
export function stripeClient(){if(!process.env.STRIPE_SECRET_KEY)throw new Error('As assinaturas ainda não estão disponíveis. A configuração comercial está pendente.');return new Stripe(process.env.STRIPE_SECRET_KEY)}
export function adminClient(){if(!process.env.SUPABASE_SECRET_KEY)throw new Error('Configuração segura do servidor pendente.');return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SECRET_KEY,{auth:{persistSession:false,autoRefreshToken:false}})}
export function priceIds(){return {global:process.env.STRIPE_GLOBAL_PRICE_ID,pro:process.env.STRIPE_PRO_PRICE_ID,business:process.env.STRIPE_BUSINESS_PRICE_ID}}
export function siteOrigin(){const value=process.env.NEXT_PUBLIC_SITE_URL;if(!value)throw new Error('URL pública não configurada.');return new URL(value).origin}
export function validOrigin(request:Request){return request.headers.get('origin')===siteOrigin()}
