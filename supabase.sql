-- Run this SQL in the Supabase SQL editor to set up your blog schema and policies.
-- It will create a posts table with RLS policies allowing public read and author-only write.

-- Enable UUID extension if needed (usually enabled by default)
-- create extension if not exists "uuid-ossp";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_id uuid references auth.users(id) on delete set null
);

-- Update trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_timestamp on public.posts;
create trigger set_timestamp
before update on public.posts
for each row execute procedure public.set_updated_at();

-- Enable Row Level Security
alter table public.posts enable row level security;

-- Policies
-- 1) Anyone can read posts
create policy "Public read access" on public.posts
for select using (true);

-- 2) Only authenticated users can insert and they become the author
create policy "Authenticated can insert" on public.posts
for insert
with check (auth.role() = 'authenticated' and (author_id = auth.uid()));

-- 3) Authors can update their own posts
create policy "Authors can update own posts" on public.posts
for update using (author_id = auth.uid())
with check (author_id = auth.uid());

-- 4) Authors can delete their own posts
create policy "Authors can delete own posts" on public.posts
for delete using (author_id = auth.uid());

