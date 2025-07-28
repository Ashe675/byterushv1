# ByteRush – Food Ordering & Management System

A full-featured food ordering platform built with React, TypeScript, and Tailwind CSS, designed for a seamless user and admin experience. Users can browse menu items by category, add products to their order, and manage their cart in real time. The admin panel allows staff to track incoming orders, mark them as ready, and manage product availability dynamically.

## This project leverages modern React patterns and tools to ensure performance, type safety, and a delightful user interface:

- State Management: Context API for global state (user, orders, products) without external libraries.
- Data Fetching: useSWR for efficient API calls with caching, revalidation, and error handling.
- Styling: Tailwind CSS with Headless UI components for accessible, fully customizable UIs.
- Validation: Zod for runtime validation of API responses and form data.
- Animations: Framer Motion for smooth transitions and engaging micro-interactions.
- Feedback: React Toastify for user-friendly notifications on order updates and errors.
- HTTP Client: Axios for structured API communication with interceptors and error handling.
- The frontend is optimized for SEO, responsive on all devices, and deployed on Vercel with proper meta tags and routing setup.

## ✅ Backend Integration (Laravel API)
The frontend is powered by a robust Laravel-based RESTful API that handles authentication, product management, order processing, and real-time status updates. Laravel provides secure user authentication, data validation, and scalable database structure using Eloquent ORM. The API is designed to work seamlessly with the React frontend, ensuring fast, reliable communication with consistent data formatting and error responses.

This full-stack approach showcases a clean separation of concerns, where Laravel manages business logic and data integrity, while React delivers a dynamic and interactive user experience.

- ✅ Key Features
- 🔐 User authentication and role-based access (customer vs. admin)
- 🛒 Real-time order management with persistent cart
- 📱 Responsive design for mobile and desktop
- 🎨 Fully animated UI with Framer Motion
- ✅ Form validation with Zod and user feedback via React Toastify
- 🧩 Accessible modals and components using Headless UI
- 📦 Type-safe API responses and frontend state with TypeScript
- 🔄 Auto-refreshing data with useSWR for live order updates
- ✅ Technologies Used

## Frontend:
React • TypeScript • Vite • Tailwind CSS • Headless UI • Framer Motion • React Router • useSWR • React Toastify • Axios • Context API • Zod

## Backend:
Laravel • PHP • MySQL • REST API • Authentication (Sanctum) • CORS • Eloquent ORM

## Deployment:
Vercel (Frontend) • Railway (Backend)