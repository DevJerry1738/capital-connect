# Capital Connect

Capital Connect is a modern, location-based service marketplace that helps users discover trusted local service providers across Abuja. The platform focuses on clean UI, excellent UX, and practical features such as search, filtering, maps, reviews, and real-time directions.

## 🚀 Features

* **Browse Local Providers** – Discover verified service providers across multiple service categories such as repairs, cleaning, beauty, logistics, and home services
* **Advanced Search & Filters** – Search by provider name and filter by category, district within Abuja, and availability status
* **Provider Profiles** – Detailed provider pages featuring descriptions, ratings, verification status, reviews, and direct contact actions
* **Customer Reviews & Ratings** – Users can leave ratings and reviews with instant UI feedback (optimistic updates)
* **Interactive Maps** – View providers on an interactive map with location markers and previews
* **GPS-Based Directions** – Get real-time directions from the user’s current location to a selected provider
* **Verified Provider Badges** – Visual verification indicators for providers who have completed KYC (UI-level for now)
* **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices
* **Clean Architecture** – Modular components with page-level and component-level CSS for easy debugging and scalability

## 🧱 Tech Stack

* **Frontend:** React + TypeScript
* **Routing:** React Router
* **Styling:** Plain CSS (scoped per page and component)
* **Icons:** React Icons
* **Maps & Location:** Google Maps (embed & directions), browser GPS APIs
* **State & Hooks:** Custom React hooks for providers, filters, reviews, and directions

## 📂 Project Structure

```
src/
├─ components/
│  ├─ layout/        # Navbar, Footer
│  ├─ providers/     # Provider cards, details, maps, actions
│  ├─ reviews/       # Reviews and rating components
│  ├─ search/        # Search bar and filters
│  ├─ faq/           # FAQ section
│  └─ ui/            # Toasts, buttons, reusable UI elements
├─ pages/
│  ├─ HomePage.tsx
│  ├─ ProvidersPage.tsx
│  ├─ ProviderPage.tsx
│  └─ MapPage.tsx
├─ hooks/            # Custom hooks (providers, directions, reviews)
├─ data/             # Mock provider and FAQ data
├─ types/            # TypeScript types
└─ router.tsx
```

## 🗺️ Location & Directions

Capital Connect supports GPS-based location access. When users grant permission, the app can calculate and display directions from the user’s current location to a service provider using Google Maps integration.

## 🧩 Future Enhancements

* Provider onboarding and KYC submission flow
* Authentication for users and service providers
* Persistent backend (Firebase, Supabase, or REST API)
* Real-time availability and status updates
* In-app messaging between users and providers
* Booking, scheduling, and payments

## 🛠️ Getting Started

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```
3. Start the development server

   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser

## 🌍 Vision

Capital Connect aims to bridge the gap between people and reliable local services in Abuja, making it fast and simple to find trusted professionals nearby.

## 📄 License

This project is built for portfolio and educational purposes.

---

Built with ❤️ to demonstrate modern frontend engineering, UX thinking, and scalable React architecture.
