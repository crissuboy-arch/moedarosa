-- Disposable fixtures. Everything is rolled back, including auth users.
begin;
insert into auth.users(id,email,raw_user_meta_data) values
('a0000000-0000-4000-8000-000000000001','rls-a@example.invalid','{"display_name":"Teste temporário A","adult_confirmed":true}'),
('b0000000-0000-4000-8000-000000000002','rls-b@example.invalid','{"display_name":"Teste temporário B","adult_confirmed":true}'),
('c0000000-0000-4000-8000-000000000003','rls-c@example.invalid','{"display_name":"Teste temporário C","adult_confirmed":true}');
set local role authenticated;
select set_config('request.jwt.claim.sub','a0000000-0000-4000-8000-000000000001',true);
insert into posts(user_id,body) values(auth.uid(),'Teste temporário: publicação');
DO $$begin
 if (select count(*) from subscriptions)<>1 then raise exception 'FAIL subscription isolation';end if;
 begin update subscriptions set plan_id='business' where user_id=auth.uid();raise exception 'FAIL plan escalation';exception when insufficient_privilege then null;end;
 begin insert into admin_roles values(auth.uid(),'admin');raise exception 'FAIL role escalation';exception when insufficient_privilege then null;end;
 begin insert into business_profiles(id,name,description,category,contact_url) values(auth.uid(),'Teste','Teste','Teste','https://example.invalid');raise exception 'FAIL free business';exception when insufficient_privilege then null;end;
 begin insert into group_members select id,auth.uid(),now() from community_groups where slug='mulheres-da-ia';raise exception 'FAIL free pro group';exception when insufficient_privilege then null;end;
 begin insert into conversations(member_a,member_b) values(auth.uid(),'b0000000-0000-4000-8000-000000000002');raise exception 'FAIL stranger conversation';exception when insufficient_privilege then null;end;
end;$$;
insert into friend_requests(sender_id,recipient_id) values(auth.uid(),'b0000000-0000-4000-8000-000000000002');
select set_config('request.jwt.claim.sub','b0000000-0000-4000-8000-000000000002',true);
update friend_requests set status='accepted' where recipient_id=auth.uid();
insert into conversations(id,member_a,member_b) values('d0000000-0000-4000-8000-000000000004','a0000000-0000-4000-8000-000000000001',auth.uid());
insert into messages(conversation_id,sender_id,body) values('d0000000-0000-4000-8000-000000000004',auth.uid(),'Mensagem temporária');
select set_config('request.jwt.claim.sub','c0000000-0000-4000-8000-000000000003',true);
DO $$begin if (select count(*) from messages)<>0 then raise exception 'FAIL private message leak';end if;end;$$;
select set_config('request.jwt.claim.sub','a0000000-0000-4000-8000-000000000001',true);
DO $$begin if (select count(*) from messages)<>1 then raise exception 'FAIL participant read';end if;end;$$;
insert into user_blocks(user_id,blocked_id) values(auth.uid(),'b0000000-0000-4000-8000-000000000002');
DO $$begin
 if (select count(*) from messages)<>0 then raise exception 'FAIL blocked conversation read';end if;
 begin insert into messages(conversation_id,sender_id,body) values('d0000000-0000-4000-8000-000000000004',auth.uid(),'Bloqueada');raise exception 'FAIL blocked conversation write';exception when insufficient_privilege then null;end;
end;$$;
reset role;
rollback;
select 'PASS: profile creation, plan isolation, privilege escalation, Business restriction, Pro group restriction, stranger message prevention, friend acceptance, participant access, private-message isolation, bidirectional block' as result;
