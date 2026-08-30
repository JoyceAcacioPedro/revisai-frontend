# RevisAI — Frontend

**AI-powered study platform frontend**  
Built with React · Vite · JavaScript · CSS

Live: [revisai-iota.vercel.app](https://revisai-iota.vercel.app)  
Backend repository: [revisai-backend](https://github.com/JoyceAcacioPedro/revisai-backend)


## What It Does

RevisAI is a productivity platform that uses AI to help 
students organise and optimise their study schedules.

This repository contains the full frontend — routing, 
authentication flow, dashboard, and all user-facing features.


## Architecture

React (Vite) → REST API (Django Backend on Render)
↓
JWT Authentication — token stored and managed client-side
↓
Axios — all API calls with baseURL from environment variable



## Tech Stack

Framework: React · Vite
Routing: React Router DOM
HTTP Client: Axios
Auth: JWT — stored and sent on every request
Styling: CSS Modules
Deployment: Vercel



## Key Features

- Email-based login and registration
- JWT authentication — token management client-side
- Protected routes — dashboard only accessible when logged in
- Subject and topic management
- Revision scheduling interface
- Progress tracking dashboard
- Responsive UI


## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Login with email and password |
| `/signup` | Register new account |
| `/dashboard` | Main user dashboard |
| `/revisions` | Manage revisions |
| `/progress` | Track study progress |
| `/addrevisions` | Add new revision |
| `/addsubject` | Add new subject |
| `/addtopic` | Add new topic |
| `/profile` | User profile |

---

## Environment Variables

```env
VITE_API_URL=https://revisai-backend-ifh7.onrender.com/api
```

> Important: always use the environment variable for the API URL.
> Never hardcode localhost in production.


## Local Setup

```bash
# Clone the repository
git clone https://github.com/JoyceAcacioPedro/revisai-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env

# Start development server
npm run dev
```


## Deployment

Frontend deployed on **Vercel**.

`vercel.json` configured to handle client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

> Without this configuration, direct URL access to any 
> route returns 404 on Vercel.


## Engineering Notes

This project was built solo — from requirements to production.

Key challenges solved:

- Frontend calling `http://127.0.0.1:8000` in production —
  solved by setting `VITE_API_URL` as a Vercel 
  environment variable pointing to the Render backend
- Client-side routing returning 404 on direct URL access —
  solved with `vercel.json` rewrite rules
- CORS errors caused by backend crashing —
  root cause was SMTP blocking on Render, 
  not a frontend issue


*Software Engineer — Applied AI & Full Stack*  
[LinkedIn](https://www.linkedin.com/in/joyceacaciopedro) ·
[Twitter/X](https://x.com/Joyceap2005)