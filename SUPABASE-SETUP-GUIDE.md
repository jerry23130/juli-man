# Supabase Setup Guide - Step by Step

## 🚨 Current Issue
Your current Supabase project `tncijrfxgdhngufuvszv` doesn't exist or is not accessible, causing `net::ERR_NAME_NOT_RESOLVED` errors.

## 📋 Step-by-Step Solution

### Step 1: Create New Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up/login with GitHub/Google
4. Click **"New Project"**
5. Choose your organization
6. **Project Details:**
   - **Name**: `juli-man-visions` (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
7. Click **"Create new project"**
8. Wait for setup (2-3 minutes)

### Step 2: Get Your Credentials
Once project is ready:
1. Go to **Project Settings** (gear icon ⚙️)
2. Click **"API"** in the sidebar
3. You'll see:
   - **Project URL** (something like `https://xxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIs...`)

### Step 3: Update Your .env File
Replace the contents of your `.env` file with:

```env
VITE_SUPABASE_URL="https://YOUR-PROJECT-ID.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR-ANON-KEY-HERE"
```

**Example:**
```env
VITE_SUPABASE_URL="https://abc123def456.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Step 4: Set Up Database Tables
1. In Supabase dashboard, go to **"SQL Editor"**
2. Click **"New query"**
3. Paste this SQL and run it:

```sql
-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_type TEXT NOT NULL,
  event_date DATE,
  location TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Policies for bookings
CREATE POLICY "Anyone can submit a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read all bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Policies for user_roles
CREATE POLICY "Admins can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
```

### Step 5: Create Admin User
1. Go to **"Authentication"** → **"Users"**
2. Click **"Add user"**
3. Enter:
   - **Email**: `eyerustekto@gmail.com`
   - **Password**: `eyerus1996`
   - **Auto-confirm**: ✅ checked
4. Click **"Save"**
5. Note the user ID (copy it)

6. Go back to **SQL Editor** and run:

```sql
-- Assign admin role to your user
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR-USER-ID-HERE', 'admin');
```

Replace `YOUR-USER-ID-HERE` with the actual user ID from step 5.

### Step 6: Test Everything
1. **Restart your dev server**: `npm run dev`
2. Go to `http://localhost:8080/admin`
3. Login with:
   - Email: `eyerustekto@gmail.com`
   - Password: `eyerus1996`

## 🎯 Expected Result
- ✅ No more `ERR_NAME_NOT_RESOLVED` errors
- ✅ Admin login works
- ✅ Dashboard shows real data
- ✅ Bookings are saved to your database

## 🔧 Troubleshooting

### If you get CORS errors:
1. Go to **Project Settings** → **"API"**
2. Under **"Additional Configuration"**, add your local URL:
   - `http://localhost:8080`
   - `http://localhost:3000`

### If login fails:
1. Check that the user was created in **Authentication** → **"Users"**
2. Verify the admin role was assigned in **Table Editor** → **"user_roles"**

### If database errors:
1. Run the SQL setup again
2. Check **Table Editor** to see if tables exist

## 📞 Need Help?
- Check the Supabase logs: **Project Settings** → **"Logs"**
- Test your API keys in the browser console
- Make sure your `.env` file has no typos

That's it! Your admin dashboard will work with a real Supabase database. 🚀
