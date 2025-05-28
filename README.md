# 💰 FinTrack

FinTrack is a modern personal finance tracker built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to track income and expenses, visualize financial data with interactive charts — all through a beautiful and intuitive interface.


## ✨ Features

- 🔐 **User Authentication** (JWT-based)
- 📥 **Track Incomes** – add, view, delete, and analyze income transactions
- 📤 **Track Expenses** – manage and categorize expenses
- 📊 **Interactive Charts** – visualize income vs. expenses over time
- 📈 **Dynamic Dashboards** with income/expense summaries
- 🧾 **Download & Export** income/expense records
- 📱 **Responsive UI** for both desktop and mobile
- 💾 **Persistent Storage** using MongoDB


## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

If required, create a `.env` file in the `client/` directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```


## ▶️ Running the App

### Start Backend Server

```bash
cd server
npm run dev
```

### Start Frontend Server

```bash
cd ../client
npm start
```

Now open `http://localhost:3000` in your browser to use the app.


## 🌐 Deployment

- **Frontend Deployed on Vercel**  
🌎 [FinTrack Live Demo](https://fin-track-frontend-theta.vercel.app)



## 📁 Folder Structure

```
fintrack/
│
├── client/                # React frontend
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components
│   └── utils/             # Helper functions & API paths
│
├── server/                # Node + Express backend
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   └── middleware/        # Auth & error handling
│
└── README.md
```


## 💡 Planned Features

- 🔁 Recurring transactions
- 📅 Custom date range filters
- 📈 Budget progress tracking
- 🔔 Notification/reminder system


## 🙌 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request


