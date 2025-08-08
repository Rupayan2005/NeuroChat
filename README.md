# 🚀 NeuroChat - Modern Real-Time Chat Application

<div align="center">
  <img src="https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=NeuroChat" alt="NeuroChat Logo" width="200" height="200" style="border-radius: 20px;">
  
  **A beautiful, modern, and feature-rich real-time chat application built with React and Node.js**
  
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![DaisyUI](https://img.shields.io/badge/DaisyUI-4.x-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)
</div>

## ✨ Features

### 🎨 **Modern UI/UX Design**

- **35+ Beautiful Themes** - Choose from a wide variety of stunning themes including light, dark, and colorful options
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Engaging micro-interactions and transitions throughout the app
- **Professional Welcome Page** - Showcase features with interactive elements and live previews

### 💬 **Real-Time Messaging**

- **Instant Messaging** - Real-time message delivery with Socket.io
- **Online Status** - See who's online with live presence indicators
- **Message History** - Persistent message storage with MongoDB
- **Smooth Scrolling** - Auto-scroll to new messages with smooth animations

### 🖼️ **Rich Media Support**

- **Image Sharing** - Upload and share images with preview functionality
- **Image Optimization** - Automatic image processing with ImageKit integration
- **Drag & Drop** - Easy file upload with modern drag-and-drop interface

### 🔐 **Security & Authentication**

- **JWT Authentication** - Secure token-based authentication
- **Password Strength Validation** - Enforced strong password requirements with real-time feedback
- **Secure File Upload** - Safe image handling with validation
- **HTTP-Only Cookies** - Secure session management

### ⚙️ **Advanced Settings**

- **Theme Customization** - Live preview and easy theme switching
- **Profile Management** - Update profile picture and personal information
- **Real-Time Settings** - Changes apply instantly without page refresh

## 🛠️ Tech Stack

### **Frontend**

- **React 19** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **React Hot Toast** - Elegant notifications
- **Lucide React** - Beautiful icon library

### **Backend**

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **ImageKit** - Image optimization and CDN
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/neurochat.git
   cd neurochat
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/neurochat
   PORT=5001
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development

   # ImageKit Configuration (Optional - for image uploads)
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

5. **Start the development servers**

   Backend server:

   ```bash
   cd backend
   npm run dev
   ```

   Frontend server (in a new terminal):

   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
neurochat/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Utilities (DB, Socket, ImageKit)
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── lib/             # Utilities
│   │   ├── constants/       # App constants
│   │   └── App.jsx          # Main app component
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Key Features in Detail

### **Welcome Page**

- Interactive feature showcase with auto-rotating highlights
- Live chat interface preview
- Gradient backgrounds and smooth animations
- Call-to-action buttons with hover effects

### **Authentication System**

- Modern login/signup forms with validation
- Password strength meter with real-time feedback
- Secure JWT token management
- Automatic redirect after authentication

### **Chat Interface**

- Real-time message synchronization
- Smooth scrolling with auto-scroll to new messages
- Image upload with drag-and-drop support
- Online/offline user status indicators
- Message timestamps and delivery status

### **Settings & Customization**

- 35+ themes with live preview
- Theme categorization (Light, Dark, Colorful)
- Search and filter functionality
- Real-time theme switching
- Profile picture upload and management

## 🔧 API Endpoints

### **Authentication**

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Verify authentication
- `PUT /api/auth/update-profile` - Update user profile

### **Messages**

- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user

### **Real-time Events**

- `connection` - User connects to socket
- `newMessage` - New message broadcast
- `getOnlineUsers` - Online users list update
- `disconnect` - User disconnects

## 🎨 Customization

### **Adding New Themes**

1. Add theme name to `frontend/src/constants/index.js`
2. Theme will automatically appear in settings
3. DaisyUI handles theme styling automatically

### **Custom Components**

All components are built with TailwindCSS and DaisyUI classes, making them highly customizable and maintainable.

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### **Backend (Railway/Render/Heroku)**

1. Set up environment variables
2. Deploy from the `backend` directory
3. Ensure MongoDB connection is configured

### **Database (MongoDB Atlas)**

1. Create a MongoDB Atlas cluster
2. Update `MONGODB_URI` in environment variables
3. Configure network access and database users

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**

- Follow the existing code style
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Tailwind Labs** - For TailwindCSS and the ecosystem
- **DaisyUI** - For beautiful, accessible components
- **Socket.io** - For real-time communication
- **MongoDB** - For the flexible database solution
- **Lucide** - For the beautiful icon set


<div align="center">
  <p>Made with ❤️ by the Shadow</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
