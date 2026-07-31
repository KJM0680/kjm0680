-- COG Booster shared data schema. Apply with Supabase SQL editor or migration tooling.
create table if not exists public.equipment (id text primary key, name text not null, status text not null default 'Normal', vibration numeric not null default 0, temperature numeric not null default 0, updated_at timestamptz not null default now());
create table if not exists public.alerts (id text primary key, equipment_id text not null, severity text not null, message text not null, acknowledged_at timestamptz null, created_at timestamptz not null default now());
create table if not exists public.inspections (id text primary key, equipment_id text not null, note text not null, created_at timestamptz not null default now());
create table if not exists public.materials (id text primary key, name text not null, quantity integer not null default 0 check (quantity >= 0), due_date date null, status text not null default 'purchasing', updated_at timestamptz not null default now());
create table if not exists public.spares (id text primary key, name text not null, quantity integer not null default 0 check (quantity >= 0), repair_status text not null default '수리 필요', start_date date null, completed_date date null, memo text not null default '', updated_at timestamptz not null default now());
create table if not exists public.spare_monitor (key text primary key, value integer not null default 0 check (value >= 0), updated_at timestamptz not null default now());

do $$ declare t text; begin
  foreach t in array array['equipment','alerts','inspections','materials','spares','spare_monitor'] loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

-- The current site has no login screen, so these policies intentionally allow the public app to edit shared rows.
-- Add Supabase Auth and replace these policies before exposing the app outside the trusted team.
do $$ declare t text; begin
  foreach t in array array['equipment','alerts','inspections','materials','spares','spare_monitor'] loop
    execute format('drop policy if exists %I_public_all on public.%I', t, t);
    execute format('create policy %I_public_all on public.%I for all to anon, authenticated using (true) with check (true)', t, t);
    execute format('grant select, insert, update, delete on public.%I to anon, authenticated', t);
  end loop;
end $$;

insert into public.equipment (id,name,status,vibration,temperature) values
('1A','설비 1A','Warning',8.4,72),('1B','설비 1B','Normal',2.1,45),('1C','설비 1C','Normal',1.8,42),('2A','설비 2A','Normal',1.7,42),('2B','설비 2B','Warning',3.1,41),('2C','설비 2C','Normal',1.9,44),('3A','설비 3A','Normal',1.4,82),('3B','설비 3B','Normal',1.6,86),('3C','설비 3C','Normal',2,45),('4A','설비 4A','Normal',1.7,41),('4B','설비 4B','Normal',2.4,49),('4C','설비 4C','Normal',2.1,45),('5A','설비 5A','Normal',2.2,46),('5B','설비 5B','Normal',1.9,43),('5C','설비 5C','Normal',2,44)
on conflict (id) do nothing;
insert into public.alerts (id,equipment_id,severity,message) values ('alert-1','1A','Critical','진동 수치가 임계값을 초과했습니다.'),('alert-2','3B','Warning','온도 추세를 점검해야 합니다.'),('alert-3','2C','Info','정기 점검 예정 시간이 다가옵니다.') on conflict (id) do nothing;
insert into public.spare_monitor (key,value) values ('completed',0),('progress',0),('needed',0) on conflict (key) do nothing;
