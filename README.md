# 🌾 AgriBloom 2.0

AgriBloom 2.0 is a full-stack agriculture intelligence platform designed to empower farmers with data-driven decisions **before sowing**. This version integrates features from **AgriIntel**, providing advisory support, crop insights, insect management, biofertilizer info, and real-time pricing — all in one dashboard.

---

## 🚀 Features

- ✅ JWT-based authentication with email verification
- 🌱 AgriLens: Detailed info on 100+ crops (sowing season, sunlight, soil, water needs, etc.)
- 🐛 Insect & Pest Management with official solutions
- 💚 Health & Benefits of each crop (vitamins, minerals, shelf life)
- 📈 Farmer Dashboard to submit pre-sowing data and view trends
- 🧪 Biofertilizer and Organic Input Guide
- 🧭 Real-time crop price fetch from official APIs (by State & District)
- 🌳 Forest trees and soil types with educational images
- 🌤️ Beautiful modern UI with animations & Tailwind styling

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 App Router + TailwindCSS + ShadCN UI
- **Backend**: Node.js + MongoDB + Mongoose + JWT
- **Authentication**: Email verification + Role-based auth (Farmer/Admin)
- **Deployment**: Vercel (frontend), MongoDB Atlas (database)
- **Extras**: API routes, middleware, server actions, chart visualizations

---

## 📦 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/waseem-akram-123/agribloom2.0.git

# 2. Install dependencies
npm install

# 3. Add environment variables
Create a `.env` file with:
MONGODB_URL=your_mongo_url  
TOKEN_SECRET=your_jwt_secret

# 4. Start the development server
npm run dev
