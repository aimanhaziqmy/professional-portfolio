# Professional Portfolio & Admin CMS

A professional, minimalist portfolio website built with **React**, **Tailwind CSS**, and **Firebase**. It features a "sharp" aesthetic design, full dark mode support, and a secure Admin Dashboard for managing content (Experience, Projects, Education, etc.).

![Portfolio Preview](./public/portfolio_icon.png)

## 🚀 Features

### Public Portfolio
- **"Sharp" Design System:** Minimalist aesthetic with thin borders and monospaced typography (`JetBrains Mono` headers, `Inter` body).
- **Dark Mode:** System-wide dark theme with a toggle switch, persisting user preference.
- **Responsive Layout:** Fully optimized for desktop, tablet, and mobile devices.
- **Dynamic Sections:**
  - **Hero:** Interactive introduction with a terminal-style vibe.
  - **Experience:** Timeline view with expandable details.
  - **Projects:** Grid layout showcasing tech stacks and links.
  - **Skills:** Categorized skill sets.
  - **Education & Publications:** Clean list views with sorting capabilities.

### Admin Dashboard (CMS)
- **Secure Authentication:** Protected admin routes using Firebase Auth.
- **Content Management:**
  - **CRUD Operations:** Create, Read, Update, and Delete for all sections.
  - **Ordering:** Custom ordering for Education and Publications to control display sequence.
  - **Live Previews:** Instant updates to the public site upon saving.
 
Example of Portfolio CMS : 
![CMS](https://i.postimg.cc/htZ0169X/content-management.png)
![Skills](https://i.postimg.cc/0yXC0Fpb/content-management-skills-example.png)

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion
- **Backend/Database:** Firebase (Authentication, Firestore)
- **Icons:** Lucide-React
- **Containerization:** Docker, Docker Compose

## ⚡ Quick Start

### Prerequisites
- Node.js (v18+)
- Firebase Project (configured with Auth and Firestore)
- Add email-based auth in your Firebase and register a user.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/professional_portfolio.git
cd professional_portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

### 4. Run Locally
```bash
npm run dev
```
Access the site at `http://localhost:5173`.

## 🐳 Docker Support

You can run the entire application using Docker.

### Using Docker Compose
```bash
docker-compose up -d --build
```
The application will be available at `http://localhost:8080`.

## 🔒 Security

- **Admin Routes:** Protected by `ProtectedRoute` component, checking for authenticated Firebase user.
- **Firestore Rules:** Ensure you configure your Firestore security rules to only allow writes from authenticated users.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developed by aimanhaziq.my**
