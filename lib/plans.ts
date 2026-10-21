export const plans = [
 {id:'free',name:'Free',price:0,description:'O seu lugar na comunidade.',features:['Perfil e moeda simbólica','Feed, amizades e grupos públicos','Mensagens com proteção anti-spam']},
 {id:'global',name:'Global',price:2.99,description:'Conexões sem fronteiras.',features:['Tudo do Free','Tradução com IA — 100/mês','Grupos internacionais exclusivos']},
 {id:'pro',name:'Pro',price:5.99,description:'Aprenda. Crie. Vá mais longe.',features:['Tudo do Global','Comunidades de IA e design','Tradução com IA — 500/mês']},
 {id:'business',name:'Business',price:19.90,description:'O seu talento encontra o mundo.',features:['Tudo do Pro','Perfil profissional e catálogo','Divulgação comercial','Tradução com IA — 1.000/mês']}
] as const;
export type PlanId = typeof plans[number]['id'];
export function canAdvertise(plan:string,status:string,expiresAt:string|null){return plan==='business' && status==='active' && !!expiresAt && Date.parse(expiresAt)>Date.now()}
export function safeRedirect(value:string|null){return value?.startsWith('/')&&!value.startsWith('//')&&!value.includes('\\') ? value : '/comunidade'}
