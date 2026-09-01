🚀 LinkForge - URL Shortener

LinkForge is a full stack web application that lets users shorten long URLs, manage them easily, and export them in JSON format. It's designed to be intuitive, modern and secure, with OAuth authentication support via Google and GitHub, while also allowing guest usage without an account.

🧹 Main Features
🔗 Shorten links: create custom short URLs.
🛠️ Link management: edit, delete and organize your links from the dashboard.
📂 Export: download all your links in JSON format.
🔐 Secure authentication: sign in with Google or GitHub thanks to Supabase.
👥 Guest mode: users without an account can still shorten links (no later management).
🧱 Automatic redirection: short links redirect to the original URL.
🧐 Clean and minimal interface: built for ease of use.
🛠️ Technologies Used
💻 Frontend
React – Library for building user interfaces.
Vite – Fast bundler for modern development environments.
React Router – Client-side routing.
Supabase Auth – Authentication and session management.
Plain CSS – Custom, accessible styling.
🧪 Backend
Node.js – JavaScript runtime environment.
Express – Minimalist framework for REST APIs.
Supabase – SQL database with built-in authentication.
JWT – Security for authentication and authorization.
dotenv – Environment variable management.
⚙️ Installation and Setup
📋 Prerequisites
Node.js (v16 or higher)
pnpm (recommended)
A Supabase account
📦 Cloning the Project
bash
git clone https://github.com/juanmcodes/link-shortener.git
cd link-shortener
pnpm install
🔐 Environment Variables

Create a .env file in the backend root with the following variables:

env
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
JWT_SECRET=<your_jwt_secret>

In the frontend, if you're using Vite, create a .env with:

env
VITE_SUPABASE_URL=<your_supabase_url>
VITE_SUPABASE_KEY=<your_supabase_anon_key>
🚀 Deployment

You can deploy the frontend on Vercel and the backend on Render. Make sure to:

Properly configure the vercel.json rules to allow redirects.
Point the shortened links to the backend using /:shortUrl so they work correctly.
📁 Project Structure
bash
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── fonts/
│       │   └── logos/
│       ├── components/
│       │   ├── Button/
│       │   ├── ConfirmAlert/
│       │   ├── CrafterModal/
│       │   ├── InputLink/
│       │   ├── InputSearch/
│       │   ├── InputShort/
│       │   ├── LinkElement/
│       │   ├── LogModal/
│       │   ├── Navbar/
│       │   ├── Particles/
│       │   ├── SkeletonLinkElement/
│       │   ├── Toast/
│       │   └── UpdateModal/
│       ├── config/
│       └── pages/
│           ├── Dashboard/
│           │   └── Tabs/
│           │       ├── Links/
│           │       └── Settings/
│           └── Home/
│
└── backend/
    └── src/
        ├── config/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        └── services/
🧑‍💻 Contributing

Got ideas or improvements? PRs are welcome! Feel free to open issues to report bugs or suggest enhancements.

📜 License

This project is licensed under the MIT License.
---

## 🙌 Autor

Desarrollado con ❤️ por [Juan Durango - juanmcodes](https://github.com/juanmcodes)
