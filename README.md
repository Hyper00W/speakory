<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/89eef119-e795-4f9f-9203-3be6bcec8e4e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Configure `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Set up the Database:
   - In your Supabase dashboard, go to the **SQL Editor**.
   - Copy and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   - This creates the `leads` table and Row Level Security (RLS) policies.
4. Create an Admin User:
   - In Supabase, go to **Authentication** -> **Users** -> **Add user** -> **Create user**.
   - Enter your admin email and password.
5. Run the app:
   `npm run dev`
6. Access the Admin Panel:
   - Navigate to `/admin` (or `/admin/login`).
   - Sign in with your Supabase admin credentials.
