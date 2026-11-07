-- Inserción oficial de la emisión (200 folios x 5 números)
do $$
declare
  v_raffle_id uuid := '20000000-0000-4000-8000-000000000001';
  v_ticket_id uuid;
begin
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 1, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 43)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 187)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 356)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 671)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 928)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 2, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 15)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 208)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 427)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 690)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 953)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 3, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 34)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 166)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 389)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 742)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 990)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 4, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 20)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 145)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 308)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 687)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 901)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 5, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 28)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 37)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 583)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 879)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 947)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 6, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 262)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 313)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 478)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 700)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 892)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 7, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 24)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 185)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 186)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 680)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 948)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 8, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 69)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 260)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 278)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 416)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 713)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 9, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 139)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 169)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 432)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 454)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 919)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 10, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 255)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 332)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 452)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 531)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 675)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 11, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 209)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 465)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 639)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 712)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 733)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 12, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 22)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 709)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 799)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 833)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 993)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 13, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 63)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 117)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 275)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 556)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 904)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 14, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 221)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 528)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 652)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 764)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 890)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 15, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 223)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 341)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 502)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 686)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 807)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 16, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 86)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 107)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 326)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 575)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 804)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 17, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 274)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 306)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 366)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 581)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 979)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 18, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 450)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 476)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 506)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 856)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 972)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 19, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 144)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 234)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 257)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 775)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 985)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 20, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 76)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 109)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 321)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 541)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 751)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 21, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 70)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 158)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 244)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 428)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 900)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 22, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 101)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 370)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 632)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 653)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 873)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 23, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 44)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 305)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 415)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 822)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 908)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 24, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 414)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 425)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 573)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 631)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 852)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 25, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 331)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 796)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 811)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 840)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 959)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 26, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 16)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 171)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 182)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 456)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 759)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 27, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 46)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 211)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 383)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 576)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 913)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 28, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 119)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 268)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 312)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 422)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 431)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 29, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 300)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 436)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 597)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 630)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 685)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 30, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 299)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 406)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 491)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 615)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 758)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 31, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 162)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 254)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 539)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 546)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 569)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 32, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 304)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 533)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 550)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 607)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 795)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 33, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 433)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 654)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 728)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 937)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 939)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 34, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 131)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 487)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 495)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 500)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 808)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 35, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 264)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 360)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 526)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 846)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 861)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 36, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 83)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 177)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 309)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 551)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 750)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 37, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 110)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 150)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 195)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 439)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 523)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 38, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 27)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 731)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 767)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 841)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 889)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 39, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 78)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 249)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 390)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 755)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 999)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 40, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 8)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 65)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 282)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 349)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 353)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 41, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 47)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 220)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 347)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 380)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 787)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 42, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 143)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 199)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 510)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 749)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 850)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 43, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 56)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 82)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 453)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 474)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 596)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 44, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 61)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 196)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 563)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 827)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 920)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 45, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 322)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 438)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 574)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 918)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 975)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 46, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 240)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 449)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 598)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 825)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 903)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 47, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 122)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 544)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 656)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 714)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 788)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 48, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 21)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 132)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 365)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 402)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 492)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 49, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 2)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 41)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 176)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 657)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 893)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 50, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 247)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 285)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 480)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 663)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 721)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 51, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 88)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 636)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 735)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 763)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 848)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 52, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 129)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 473)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 692)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 824)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 988)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 53, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 197)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 357)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 399)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 430)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 867)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 54, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 483)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 520)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 648)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 809)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 876)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 55, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 142)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 157)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 379)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 644)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 754)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 56, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 159)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 401)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 662)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 789)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 957)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 57, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 246)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 314)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 482)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 870)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 969)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 58, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 12)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 343)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 726)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 806)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 909)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 59, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 14)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 238)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 319)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 488)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 729)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 60, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 7)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 463)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 466)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 497)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 626)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 61, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 18)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 228)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 284)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 384)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 429)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 62, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 126)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 245)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 609)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 614)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 853)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 63, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 1)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 58)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 163)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 620)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 996)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 64, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 9)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 79)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 84)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 302)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 834)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 65, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 95)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 174)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 549)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 762)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 844)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 66, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 91)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 263)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 527)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 743)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 872)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 67, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 237)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 248)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 393)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 805)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 929)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 68, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 29)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 218)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 423)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 836)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 998)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 69, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 156)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 280)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 361)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 820)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 845)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 70, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 118)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 127)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 192)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 207)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 440)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 71, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 363)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 499)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 661)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 724)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 863)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 72, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 62)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 342)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 358)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 448)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 524)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 73, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 137)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 498)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 623)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 640)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 711)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 74, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 13)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 71)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 205)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 378)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 958)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 75, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 89)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 446)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 697)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 740)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 770)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 76, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 149)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 181)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 315)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 460)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 496)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 77, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 40)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 49)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 426)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 532)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 940)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 78, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 227)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 338)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 339)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 538)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 887)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 79, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 213)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 292)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 345)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 702)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 944)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 80, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 10)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 397)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 517)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 798)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 934)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 81, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 80)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 334)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 407)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 552)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 580)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 82, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 178)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 252)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 468)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 588)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 761)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 83, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 273)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 535)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 570)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 672)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 708)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 84, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 60)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 168)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 586)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 703)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 882)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 85, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 100)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 371)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 445)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 494)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 682)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 86, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 74)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 204)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 699)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 802)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 823)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 87, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 147)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 239)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 386)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 888)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 923)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 88, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 103)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 261)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 625)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 683)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 741)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 89, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 17)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 77)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 212)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 364)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 842)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 90, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 230)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 279)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 566)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 605)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 936)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 91, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 54)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 96)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 325)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 477)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 974)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 92, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 64)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 66)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 627)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 819)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 960)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 93, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 68)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 377)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 503)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 865)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 997)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 94, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 3)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 112)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 351)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 396)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 555)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 95, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 113)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 387)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 617)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 779)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 902)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 96, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 329)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 424)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 519)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 752)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 772)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 97, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 303)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 355)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 530)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 874)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 964)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 98, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 104)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 333)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 359)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 534)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 578)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 99, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 19)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 490)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 855)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 910)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 942)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 100, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 135)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 152)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 403)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 746)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 813)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 101, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 26)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 515)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 600)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 732)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 933)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 102, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 188)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 266)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 664)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 715)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 768)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 103, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 130)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 411)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 521)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 907)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 927)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 104, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 201)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 216)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 287)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 290)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 593)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 105, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 206)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 233)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 376)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 582)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 780)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 106, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 215)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 225)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 324)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 493)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 849)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 107, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 128)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 562)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 565)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 932)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 962)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 108, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 362)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 646)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 725)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 835)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 915)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 109, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 599)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 817)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 826)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 869)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 896)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 110, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 258)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 293)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 604)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 760)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 781)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 111, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 106)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 222)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 880)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 954)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 966)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 112, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 53)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 388)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 643)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 658)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 989)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 113, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 180)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 235)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 776)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 794)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 851)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 114, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 259)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 267)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 536)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 665)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 914)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 115, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 210)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 214)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 622)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 669)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 899)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 116, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 102)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 154)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 590)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 821)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 847)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 117, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 265)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 316)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 408)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 589)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 748)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 118, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 114)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 170)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 559)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 619)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 704)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 119, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 11)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 52)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 93)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 310)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 790)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 120, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 138)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 558)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 696)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 906)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 931)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 121, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 437)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 472)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 481)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 548)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 765)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 122, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 352)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 560)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 606)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 810)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 951)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 123, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 184)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 485)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 601)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 610)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 679)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 124, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 30)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 385)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 616)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 678)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 924)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 125, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 367)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 629)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 707)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 839)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 866)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 126, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 97)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 161)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 444)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 634)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 987)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 127, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 92)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 311)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 545)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 756)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 871)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 128, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 250)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 253)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 434)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 512)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 898)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 129, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 116)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 337)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 677)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 717)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 730)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 130, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 443)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 635)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 720)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 922)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 941)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 131, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 270)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 542)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 571)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 650)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 744)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 132, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 111)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 269)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 297)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 525)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 814)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 133, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 75)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 125)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 514)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 885)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 983)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 134, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 320)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 420)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 608)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 828)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 978)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 135, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 133)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 774)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 843)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 943)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 986)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 136, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 513)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 613)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 875)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 916)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 930)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 137, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 73)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 108)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 335)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 373)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 815)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 138, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 123)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 226)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 394)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 579)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 992)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 139, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 51)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 115)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 382)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 455)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 883)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 140, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 36)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 374)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 400)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 645)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 862)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 141, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 42)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 200)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 553)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 612)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 739)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 142, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 85)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 146)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 219)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 296)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 982)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 143, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 31)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 277)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 295)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 547)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 734)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 144, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 45)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 317)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 668)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 676)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 946)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 145, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 243)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 537)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 594)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 897)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 994)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 146, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 23)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 404)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 508)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 705)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 736)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 147, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 294)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 451)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 516)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 684)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 949)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 148, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 38)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 318)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 554)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 638)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 837)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 149, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 81)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 340)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 603)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 647)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 745)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 150, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 50)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 236)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 618)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 868)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 945)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 151, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 48)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 369)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 540)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 592)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 628)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 152, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 105)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 457)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 673)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 757)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 935)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 153, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 5)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 120)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 121)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 413)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 917)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 154, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 256)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 766)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 955)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 973)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 977)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 155, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 350)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 372)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 864)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 881)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 950)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 156, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 0)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 291)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 577)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 963)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 980)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 157, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 217)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 229)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 301)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 479)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 693)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 158, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 484)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 543)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 783)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 792)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 970)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 159, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 59)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 87)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 412)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 769)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 785)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 160, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 32)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 189)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 323)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 475)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 505)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 161, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 421)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 773)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 786)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 801)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 968)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 162, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 72)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 529)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 649)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 832)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 860)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 163, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 190)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 286)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 470)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 722)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 877)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 164, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 392)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 522)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 568)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 706)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 727)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 165, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 134)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 442)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 695)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 778)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 812)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 166, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 298)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 511)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 633)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 818)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 886)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 167, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 198)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 469)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 681)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 694)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 984)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 168, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 172)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 202)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 418)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 464)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 961)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 169, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 405)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 447)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 504)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 967)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 971)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 170, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 289)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 462)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 670)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 816)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 858)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 171, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 98)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 141)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 567)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 698)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 965)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 172, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 621)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 641)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 753)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 800)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 830)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 173, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 193)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 307)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 375)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 747)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 912)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 174, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 67)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 391)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 564)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 829)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 905)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 175, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 231)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 283)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 330)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 782)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 859)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 176, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 232)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 348)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 467)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 585)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 854)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 177, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 179)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 667)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 803)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 838)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 884)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 178, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 33)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 410)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 691)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 894)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 895)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 179, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 651)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 666)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 719)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 737)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 925)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 180, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 148)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 281)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 288)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 381)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 701)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 181, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 57)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 136)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 271)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 723)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 991)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 182, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 241)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 344)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 718)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 926)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 956)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 183, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 368)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 461)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 471)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 674)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 710)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 184, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 90)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 435)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 637)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 784)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 831)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 185, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 155)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 160)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 167)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 251)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 738)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 186, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 459)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 557)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 561)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 572)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 891)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 187, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 94)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 354)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 771)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 976)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 995)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 188, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 99)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 194)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 660)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 793)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 921)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 189, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 140)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 242)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 328)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 395)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 642)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 190, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 35)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 183)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 458)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 797)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 911)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 191, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 272)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 419)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 507)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 655)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 952)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 192, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 39)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 124)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 173)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 501)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 587)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 193, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 518)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 611)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 659)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 791)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 981)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 194, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 55)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 336)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 441)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 486)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 591)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 195, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 151)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 398)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 777)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 878)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 938)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 196, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 25)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 165)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 175)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 203)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 688)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 197, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 191)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 327)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 489)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 584)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 602)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 198, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 153)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 276)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 509)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 595)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 624)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 199, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 164)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 224)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 409)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 689)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 857)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.tickets (raffle_id, folio, state)
  values (v_raffle_id, 200, 'available')
  on conflict (raffle_id, folio) do update set state = excluded.state
  returning id into v_ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 4)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 6)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 346)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 417)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
  insert into public.ticket_numbers (raffle_id, ticket_id, number)
  values (v_raffle_id, v_ticket_id, 716)
  on conflict (raffle_id, number) do update set ticket_id = excluded.ticket_id;
end $$;
