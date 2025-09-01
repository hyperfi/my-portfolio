# HOWTO: Deploy the Nuclear Physicist Portfolio (Vue 3 + Vite) on Vercel with Supabase

This guide walks you through deploying your Vue 3 + Vite site to Vercel and configuring Supabase (auth + a posts table) so the Blog and Admin pages work in production.

Project snapshot
- Frontend: Vue 3, Vite, Tailwind, Vue Router (history mode)
- Data/auth: Supabase via VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Blog reads from a posts table. Admin signs in (email/password) and inserts posts.
- Newsletter form is demo-only (no backend call yet).

Prerequisites
- GitHub (or GitLab/Bitbucket) account
- Vercel account
- Supabase account
- Node.js 18+ and npm

---

1) Create and configure Supabase

1.1 Create a project
- Go to Supabase > New project.
- Choose a name and region. Wait for provisioning.

1.2 Get your public API values
- In your Supabase project: Settings > API
- Note:
  - Project URL (looks like https://YOUR-PROJECT-REF.supabase.co)
  - anon public key (safe to use in frontend)

1.3 Enable email/password auth
- Settings > Auth > Providers > Email: turn on Email.
- Optionally disable email confirmations during development (Settings > Auth > Policies) so you can sign in immediately.

1.4 Configure Site URLs (for auth emails/password resets)
- Settings > Auth > URL Configuration:
  - Site URL: your production URL (once you deploy, e.g., https://your-domain.vercel.app).
  - Additional redirect URLs: add http://localhost:5173 for local development.

1.5 Create the database schema for posts
- Go to SQL Editor and run this SQL. It creates posts, enables RLS, and adds policies so:
  - Anyone can read posts.
  - Only authenticated users can insert/update/delete their own posts.

```sql
-- Posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text unique not null,
  content text not null,
  tags text[] not null default '{}',
  author_id uuid references auth.users(id)
);

-- Helpful index for ordering by created_at
create index if not exists posts_created_at_idx on public.posts (created_at desc);

-- Enable Row Level Security
alter table public.posts enable row level security;

-- Read: allow anyone (including anon) to read posts
create policy "Allow read for all" on public.posts
for select
using (true);

-- Insert: only authenticated users, and must set author_id to themselves
create policy "Allow insert by author" on public.posts
for insert
with check (auth.role() = 'authenticated' and author_id = auth.uid());

-- Update: only the author can update their posts
create policy "Allow update by author" on public.posts
for update
using (author_id = auth.uid())
with check (author_id = auth.uid());

-- Delete: only the author can delete their posts
create policy "Allow delete by author" on public.posts
for delete
using (author_id = auth.uid());
```

1.6 Create an admin user (to log into /admin)
- Option A (Dashboard): Authentication > Users > Add User. Provide an email and password. If confirmations are enabled, complete the confirmation flow.
- Option B (App sign-up): Temporarily add a “Sign up” form in your app (or use Supabase Auth UI) to create the first user, then remove it later.

---

2) Set up local environment

2.1 Create .env based on .env.example
- Copy .env.example to .env and fill in the Supabase values:

```powershell
# Windows PowerShell
Copy-Item .env.example .env
```

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

2.2 Install and run locally
```bash
npm install
npm run dev
```
- Visit http://localhost:5173
- Test /blog (reads posts; will show empty if none)
- Test /admin login with the user you created; try creating a post

---

3) Prepare for Vercel

3.1 Add SPA routing fallback for Vue Router (history mode)
- Create a vercel.json at the project root to serve index.html for unknown routes (but still serve real files first):

```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

3.2 Commit and push your code to GitHub
```bash
git init
git add .
git commit -m "Initial deploy setup"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

4) Deploy to Vercel (Dashboard method)

4.1 Import your repository
- Go to https://vercel.com/new
- Select your repo
- Framework preset: Vite (auto-detected)
- Build command: npm run build
- Output directory: dist

4.2 Add environment variables (in Vercel Project Settings > Environment Variables)
- VITE_SUPABASE_URL = https://YOUR-PROJECT-REF.supabase.co
- VITE_SUPABASE_ANON_KEY = YOUR_SUPABASE_ANON_PUBLIC_KEY
- Add them to Production (and Preview if you want preview builds to work).
- Trigger a redeploy or Redeploy from Deployments page.

4.3 Test the live site
- Visit your Vercel URL
- Check navigation (refresh deep routes like /research and /blog to verify SPA rewrite works)
- Test /admin login and publish a test post
- Confirm posts appear in /blog

---

5) Deploy to Vercel (CLI method, optional)

- Install CLI:
```bash
npm i -g vercel
```

- From your project directory:
```bash
vercel
# answer the prompts (scope, link project, etc.)
```

- Add environment variables:
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
# Repeat for "preview" if you want PR builds to work
```

- Deploy production:
```bash
vercel --prod
```

---

6) Post-deploy checks and settings
- Supabase Auth > URL configuration: set Site URL to your Vercel production domain and add the Preview domain if needed.
- Try creating a post from /admin and confirm it appears on /blog.
- Optional: add a custom domain in Vercel (Project > Domains), then update Supabase Site URL to that domain.

---

7) Optional enhancements

Newsletter storage (make the newsletter form persist emails):
- Create a subscribers table and allow anonymous insert only:

```sql
create table if not exists public.subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Allow anonymous inserts
create policy "Allow anonymous subscribe" on public.subscribers
for insert
to anon
with check (true);

-- No selects for anon (omit select policy so anon cannot read)
```

Publishing workflow:
- Add a published boolean column and adjust policies so only published posts are publicly readable.

Route guard for /admin:
- Optionally add a navigation guard to redirect to login when unauthenticated.

Backups/Monitoring:
- Enable automatic database backups in Supabase.
- Add Vercel Analytics or third-party monitoring if desired.

---

Troubleshooting
- 404 on page refresh for /research or /blog:
  - Ensure vercel.json is present and deployed as above.
- Blog shows “No posts yet” even after creating:
  - Check the posts table actually has rows (Table Editor).
  - Ensure the RLS policy for select allows anon read.
- Admin login fails:
  - Confirm Email provider is enabled and the user exists.
  - If confirmations are required, complete the confirmation email flow.
  - Check you’re using the same Supabase project URL/anon key in Vercel environment variables.
- CORS/auth redirect errors:
  - Verify Supabase Auth “Site URL” and “Additional Redirect URLs” match your deployed and local URLs.

---

Appendix: Example .env (do not commit this file)
```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
```

