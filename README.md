# MindWell – Mental Wellness Platform

MindWell is a full-stack web application designed to support mental wellness through guided meditation, mood tracking, sleep stories, journaling, and community resources.

## Features

- **User Authentication:** Secure registration and login.
- **Guided Meditation:** Curated meditation videos for mental clarity.
- **Mood Tracker:** PHQ-9 assessment for daily mood and depression severity.
- **Sleep Stories:** Relaxing audio tracks to improve sleep quality.
- **Personal Journal:** Save and manage daily journal entries.
- **Exercises:** Quick stress-relief and wellness exercises.
- **Community Support:** Links to external mental health resources.
- **Testimonials & Benefits:** Real user stories and app benefits.

## Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, DaisyUI, Framer Motion, Chart.js
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/mindwell.git
   cd mindwell
   ```

2. **Install server dependencies:**
   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```sh
   cd ../client
   npm install
   ```

### Running Locally

1. **Start the backend server:**
   ```sh
   cd server
   npm start
   ```
   - Configure your `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT`.

2. **Start the frontend:**
   ```sh
   cd ../client
   npm run dev
   ```

3. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

### Deployment

- Both frontend and backend are configured for Vercel deployment.
- See `vercel.json` files in `client/` and `server/` directories.

## Folder Structure

```
client/      # React frontend
server/      # Node.js/Express backend
.github/     # CI/CD workflows
README.md
```

## License

This project is licensed under the ISC License.

---