# Role-Based Dashboard (React + Clerk + API)

Single-page dashboard with:

- Clerk authentication (login/logout)
- Role-based protected routes (`admin` and `user`)
- CRUD for products and users
- Search + pagination on tables
- Reusable components + reusable CRUD hook
- Context API state management
- Ready for GitHub + Vercel deployment

## Tech Stack

- React (Vite)
- React Router
- Clerk (`@clerk/clerk-react`)
- Context API
- Mock REST-style API using `localStorage` (no backend required)

## Complete UI Included

The project includes a full responsive UI:

- Dashboard overview (metrics + quick actions)
- Products management page (CRUD + search + pagination)
- Admin users page (CRUD + search + pagination, admin only)
- Styled sign-in page and unauthorized page
- Mobile + desktop layouts

## 1. Start From Scratch (Local)

### Prerequisites

- Node.js 18+ installed
- Clerk account
- GitHub account
- Vercel account

### Install and run

```bash
npm install
cp .env.example .env
```

Update `.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
VITE_ADMIN_EMAILS=admin@example.com,owner@example.com
```

Run:

```bash
npm run dev
```

## 2. Clerk Setup (Auth + Roles)

1. Create a Clerk application at `https://dashboard.clerk.com`.
2. Copy your **Publishable Key** and place it in `.env`.
3. Open **Users** in Clerk and create at least:
   - one admin user
   - one normal user
4. Set role in user `publicMetadata`:

```json
{
  "role": "admin"
}
```

If metadata is not set, this app falls back to checking emails in `VITE_ADMIN_EMAILS`.

## 3. How Role Routing Works

- Any signed-in user can access:
  - `/` (Dashboard)
  - `/products`
- Admin only:
  - `/admin/users`
- Unauthorized role access redirects to `/unauthorized`.

## 4. CRUD + API Behavior

- Data is stored in browser `localStorage`.
- APIs are in:
  - `src/api/productsApi.js`
  - `src/api/usersApi.js`
- Each API supports:
  - `fetch` (search + pagination)
  - `create`
  - `update`
  - `delete`

## 5. Build for Production

```bash
npm run build
npm run preview
```

## 6. Push to GitHub

```bash
git init
git add .
git commit -m "Role-based dashboard with Clerk auth and CRUD"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If the repo already exists, just commit and push to your active branch.

## 7. Deploy to Vercel

1. Go to `https://vercel.com/new`.
2. Import your GitHub repository.
3. Vercel will detect Vite automatically.
4. Confirm settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_ADMIN_EMAILS` (optional but recommended)
6. Click **Deploy**.

## 8. Clerk Production Checklist

After deployment, in Clerk:

1. Add your Vercel domain to allowed origins/redirect URLs.
2. Ensure sign-in route is `/sign-in`.
3. Test both admin and user accounts in production.

## 9. Project Structure

```txt
src/
  api/
  components/
    forms/
    tables/
  context/
  hooks/
  pages/
  utils/
```

## 10. Notes

- `vercel.json` already contains SPA rewrites for route refresh support.
- If `VITE_CLERK_PUBLISHABLE_KEY` is missing, the app shows a configuration screen.
