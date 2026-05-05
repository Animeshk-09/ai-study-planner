# 🚀 AI Study Planner

## 📌 Features
- 📅 Generate AI-based study plans (or Mock fallback)
- ✅ Mark tasks as done
- 🔄 Reschedule incomplete tasks
- 📆 Google Calendar integration

---

## 🛠️ Tech Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Atlas)
- **APIs:** OpenAI, Google Calendar API

---

## ⚙️ Project Setup (Run Locally)

### 1️⃣ Clone the Repository

git clone https://github.com/YOUR_USERNAME/ai-study-planner.git
cd ai-study-planner

🔧 Backend Setup (Server)
cd server
npm install
Create .env file in /server
PORT=5000
MONGO_URI=your_mongodb_connection
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=http://localhost:5000/auth/google/callback
OPENAI_API_KEY=your_openai_key
Run Backend
npm run dev

👉 Server will run at:

http://localhost:5000

👉 Google Auth:

http://localhost:5000/auth/google
💻 Frontend Setup (Client)
cd client
npm install
npm run dev

👉 Frontend runs at:

http://localhost:5173
🔗 API Endpoints
Method	Endpoint	Description
POST	/plan	Create study plan
GET	/plan	Get all plans
PATCH	/plan/:id/task/:taskId	Mark task done
POST	/plan/reschedule	Reschedule tasks


🧪 How to Use
Start backend + frontend
Open frontend in browser
Login with Google
Generate study plan
View tasks in dashboard
Mark tasks as done ✅
⚠️ Notes
If OpenAI quota is exceeded → app uses mock AI
Google login required for calendar sync
Do NOT commit .env file
🌟 Future Improvements
🔐 Proper authentication (JWT)
📊 Progress tracking dashboard
🌐 Deployment (Render / Vercel)
📱 Mobile responsiveness


👨‍💻 Author

Animesh Kerketta


---

# ✅ Next step
Run:

```bash
git add README.md
git commit -m "Added README"
git push
