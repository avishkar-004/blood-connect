# Blood Connect

A comprehensive blood bank management and donor matching portal built with React, TypeScript, and Tailwind CSS. The platform connects blood donors with recipients, manages blood inventory, facilitates donation camps, and provides role-based dashboards for donors, recipients, and administrators.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)

---

## Screenshots

> Screenshots will be added after deployment.

---

## Tech Stack

| Layer           | Technology                           |
|-----------------|--------------------------------------|
| Framework       | React 18 with TypeScript             |
| Build Tool      | Vite 5 (SWC plugin)                 |
| Styling         | Tailwind CSS + shadcn/ui components  |
| State & Data    | TanStack React Query                 |
| Routing         | React Router DOM v6                  |
| Forms           | React Hook Form + Zod validation     |
| Charts          | Recharts                             |
| Icons           | Lucide React                         |
| Notifications   | Sonner toast system                  |
| Storage         | LocalStorage-based service layer     |

---

## Features

### Donor Portal
- Register and manage donor profile
- View donation history and eligibility status
- Browse and book upcoming donation camps
- Track lives saved and total donations
- Receive notifications for matching blood requests

### Recipient Portal
- Create blood requests with urgency levels (Normal, Urgent, Emergency)
- View matched donors for blood requests
- Search for compatible donors by blood type and location
- Emergency blood request workflow
- Real-time request status tracking

### Admin Dashboard
- Monitor platform-wide blood inventory levels
- Manage blood stock with add/remove operations
- View all blood requests and their statuses
- Low stock and critical stock alerts
- User management and system statistics

### Blood Matching System
- Automatic donor-recipient matching based on blood type compatibility
- Compatibility chart: O- (universal donor), AB+ (universal recipient)
- Location-based donor search with distance sorting
- Eligibility checking (3-month cooldown between donations)
- Automated notifications to compatible donors

### Notification System
- Blood request alerts for matching donors
- Donation reminders when eligibility period ends
- Camp booking confirmations and reminders
- Low stock alerts for administrators
- Match notifications for recipients

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/avishkar-004/blood-connect.git

# Navigate to the project directory
cd blood-connect

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Demo Accounts

The application comes with pre-loaded mock data. Use these credentials to explore:

| Role      | Email              | Password   |
|-----------|--------------------|------------|
| Donor     | donor@test.com     | password   |
| Recipient | recipient@test.com | password   |
| Admin     | admin@test.com     | password   |

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
blood-connect/
├── public/                    # Static assets
├── docs/                      # Documentation guides
├── src/
│   ├── assets/                # Images and media
│   ├── components/
│   │   ├── ui/                # Reusable UI components (shadcn/ui)
│   │   ├── Header.tsx         # Navigation header
│   │   ├── NavLink.tsx        # Navigation link component
│   │   └── ProtectedRoute.tsx # Route guard component
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context provider
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── mockData.ts        # Data models and mock data
│   │   ├── storage.ts         # LocalStorage service layer
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Auth.tsx            # Login/Register page
│   │   ├── DonorDashboard.tsx  # Donor dashboard
│   │   ├── RecipientDashboard.tsx
│   │   ├── AdminDashboard.tsx  # Admin dashboard
│   │   ├── BloodRequest.tsx    # Create blood request
│   │   ├── DonorSearch.tsx     # Search donors
│   │   ├── DonationCamps.tsx   # View/book camps
│   │   ├── Emergency.tsx       # Emergency requests
│   │   ├── Notifications.tsx   # Notification center
│   │   ├── Profile.tsx         # User profile
│   │   ├── Settings.tsx        # User settings
│   │   └── Help.tsx            # Help page
│   ├── services/
│   │   ├── auth.service.ts     # Authentication service
│   │   ├── blood.service.ts    # Blood request & inventory service
│   │   ├── donor.service.ts    # Donor management service
│   │   └── notification.service.ts
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Blood Type Compatibility

| Recipient | Compatible Donor Types           |
|-----------|----------------------------------|
| A+        | A+, A-, O+, O-                   |
| A-        | A-, O-                           |
| B+        | B+, B-, O+, O-                   |
| B-        | B-, O-                           |
| AB+       | All types (universal recipient)  |
| AB-       | A-, B-, AB-, O-                  |
| O+        | O+, O-                           |
| O-        | O- (universal donor)             |

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---
Built with React, TypeScript, and Tailwind CSS.
