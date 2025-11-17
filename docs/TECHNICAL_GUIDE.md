# 🔧 Technical Guide

Complete technical documentation for developers and system administrators.

---

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Core Modules](#core-modules)
- [Authentication System](#authentication-system)
- [Service Layer](#service-layer)
- [Data Management](#data-management)
- [State Management](#state-management)
- [Routing and Navigation](#routing-and-navigation)
- [UI Components](#ui-components)
- [Business Logic](#business-logic)
- [API Integration Guide](#api-integration-guide)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Security](#security)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Presentation Layer                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Pages     │  │ Components  │  │   Contexts  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                   Business Logic Layer               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Auth      │  │    Blood    │  │    Donor    │ │
│  │  Service    │  │   Service   │  │   Service   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│  ┌─────────────────────────────────────────────┐   │
│  │          Notification Service               │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                    Data Access Layer                 │
│  ┌──────────────────────────────────────────────┐  │
│  │           Storage Service (localStorage)      │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Architecture Patterns

**1. Layered Architecture**
- **Presentation Layer**: React components, pages, UI
- **Business Logic Layer**: Services, utilities, algorithms
- **Data Access Layer**: Storage abstraction, data persistence

**2. Service-Oriented Design**
- Modular services for different domains
- Single Responsibility Principle
- Easy to test and maintain
- API-ready architecture

**3. Context-Based State Management**
- React Context API for global state
- Hooks for local state
- Centralized auth management
- Efficient re-renders

---

## 🛠️ Technology Stack

### Frontend Framework

**React 18.3.1**
```javascript
// Features Used:
- Functional Components
- React Hooks (useState, useEffect, useContext)
- Context API
- React.memo for optimization
- Suspense and lazy loading (if implemented)
```

**TypeScript**
```typescript
// Benefits:
- Type safety
- Better IDE support
- Early error detection
- Self-documenting code
- Interfaces and type definitions
```

### Build Tool

**Vite 5.4.19**
```
Advantages:
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds
- Native ES modules
- Plugin ecosystem
- Better development experience
```

### Styling

**Tailwind CSS 3.4.17**
```css
/* Utility-first approach */
/* Responsive design built-in */
/* Customizable theme */
/* Production optimization */
```

**shadcn/ui + Radix UI**
```
- Accessible components
- Unstyled primitives
- Full customization
- TypeScript support
```

### Routing

**React Router DOM 6.30.1**
```javascript
// Features:
- Client-side routing
- Nested routes
- Protected routes
- Navigation hooks
- Route parameters
```

### Form Management

**React Hook Form 7.61.1**
```javascript
// Benefits:
- Performance-optimized
- Minimal re-renders
- Built-in validation
- Easy integration
```

**Zod**
```typescript
// Schema validation
// Type inference
// Error messages
// Runtime safety
```

### Notifications

**Sonner**
```javascript
// Toast notifications
// Promise handling
// Stacking
// Animations
```

### State Management

**React Context API**
```javascript
// Global state
// No external library needed
// Type-safe
// Easy to understand
```

---

## 📁 Project Structure

```
blood-connect/
├── public/                          # Static assets
│   ├── images/
│   └── favicon.ico
│
├── src/
│   ├── components/                  # Reusable components
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (other UI components)
│   │   ├── Header.tsx              # Navigation header
│   │   └── ProtectedRoute.tsx      # Route protection
│   │
│   ├── contexts/                    # React Context providers
│   │   └── AuthContext.tsx         # Authentication context
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── use-toast.ts           # Toast notification hook
│   │
│   ├── lib/                        # Utilities and helpers
│   │   ├── mockData.ts            # Mock data and types
│   │   ├── storage.ts             # localStorage wrapper
│   │   └── utils.ts               # Utility functions
│   │
│   ├── pages/                      # Page components
│   │   ├── Index.tsx              # Landing page
│   │   ├── Auth.tsx               # Login/Register
│   │   ├── DonorDashboard.tsx     # Donor dashboard
│   │   ├── RecipientDashboard.tsx # Recipient dashboard
│   │   ├── AdminDashboard.tsx     # Admin dashboard
│   │   ├── BloodRequest.tsx       # Create blood request
│   │   ├── DonorSearch.tsx        # Search donors
│   │   ├── DonationCamps.tsx      # View/book camps
│   │   ├── Notifications.tsx      # User notifications
│   │   ├── Profile.tsx            # User profile
│   │   ├── Settings.tsx           # User settings
│   │   ├── Emergency.tsx          # Emergency requests
│   │   └── Help.tsx               # Help/FAQ
│   │
│   ├── services/                   # Business logic layer
│   │   ├── auth.service.ts        # Authentication
│   │   ├── blood.service.ts       # Blood management
│   │   ├── donor.service.ts       # Donor operations
│   │   └── notification.service.ts # Notifications
│   │
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
│
├── docs/                           # Documentation
│   ├── DONOR_GUIDE.md
│   ├── RECIPIENT_GUIDE.md
│   ├── ADMIN_GUIDE.md
│   ├── TECHNICAL_GUIDE.md
│   └── API_REFERENCE.md
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite configuration
├── tailwind.config.ts              # Tailwind config
├── components.json                 # shadcn/ui config
└── README.md                       # Main documentation
```

---

## 🔐 Authentication System

### Architecture

```typescript
┌─────────────────┐
│  Login/Register │
│      Page       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Auth Service   │ ← Validates credentials
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Storage Layer  │ ← Persists token + user
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Auth Context   │ ← Provides global state
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Protected Route │ ← Guards routes
└─────────────────┘
```

### Implementation

**AuthContext** (`src/contexts/AuthContext.tsx`)

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  hasRole: (role: UserRole) => boolean;
}

// Usage in components:
const { user, login, logout, isAuthenticated } = useAuth();
```

**Protected Route** (`src/components/ProtectedRoute.tsx`)

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

// Checks authentication and role
// Redirects to login if unauthenticated
// Redirects to dashboard if unauthorized role
```

### Token Management

```typescript
// Mock JWT Token Structure
const generateToken = (userId: string): string => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

// Storage
localStorage.setItem('blood_connect_auth_token', token);

// Validation
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('blood_connect_auth_token');
  const user = localStorage.getItem('blood_connect_current_user');
  return !!(token && user);
};
```

### Session Management

```typescript
// Session persistence
// On app load:
1. Check for existing token
2. Retrieve current user
3. Validate session
4. Restore auth state

// Session cleanup
// On logout:
1. Clear token
2. Remove current user
3. Reset auth state
4. Redirect to login
```

---

## 🔄 Service Layer

### Design Pattern

All services follow the same pattern:

```typescript
// Service Structure
export const serviceName = {
  // Create operations
  create: async (data) => { },

  // Read operations
  get: async (id) => { },
  getAll: async () => { },
  search: async (filters) => { },

  // Update operations
  update: async (id, data) => { },

  // Delete operations
  delete: async (id) => { },

  // Utility delays (simulate network)
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
};
```

### Service Details

**Auth Service** (`src/services/auth.service.ts`)

```typescript
export const authService = {
  // Login with credentials
  login: async (credentials: LoginCredentials): Promise<AuthResponse>

  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse>

  // Logout user
  logout: async (): Promise<void>

  // Get current user
  getCurrentUser: (): User | null

  // Check if authenticated
  isAuthenticated: (): boolean

  // Update profile
  updateProfile: async (userId: string, updates: Partial<User>)

  // Change password
  changePassword: async (userId: string, currentPassword: string, newPassword: string)
};
```

**Blood Service** (`src/services/blood.service.ts`)

```typescript
export const bloodService = {
  // Create blood request
  createBloodRequest: async (data: CreateBloodRequestData)

  // Get blood inventory
  getBloodInventory: async (): Promise<BloodInventory[]>

  // Update inventory
  updateInventory: async (itemId: string, updates: Partial<BloodInventory>)

  // Get blood requests
  getBloodRequests: async (): Promise<BloodRequest[]>

  // Get requests by recipient
  getBloodRequestsByRecipient: async (recipientId: string)

  // Match donors for request
  matchDonorsForRequest: async (requestId: string)

  // Search compatible donors
  searchCompatibleDonors: async (bloodGroup: BloodType)

  // Update request status
  updateBloodRequestStatus: async (requestId: string, status: RequestStatus)

  // Cancel request
  cancelBloodRequest: async (requestId: string)

  // Get statistics
  getStatistics: async ()
};
```

**Donor Service** (`src/services/donor.service.ts`)

```typescript
export const donorService = {
  // Get all donors
  getDonors: async (): Promise<Donor[]>

  // Search donors
  searchDonors: async (filters: DonorSearchFilters)

  // Get donor stats
  getDonorStats: async (donorId: string)

  // Book camp slot
  bookCampSlot: async (userId: string, campId: string)

  // Get upcoming camps
  getUpcomingCamps: async (): Promise<DonationCamp[]>

  // Record donation
  recordDonation: async (donorId: string, campId: string)
};
```

**Notification Service** (`src/services/notification.service.ts`)

```typescript
export const notificationService = {
  // Get user notifications
  getUserNotifications: async (userId: string): Promise<Notification[]>

  // Create notification
  createNotification: async (notification: Omit<Notification, 'id'>)

  // Mark as read
  markAsRead: async (notificationId: string)

  // Mark all as read
  markAllAsRead: async (userId: string)

  // Get unread count
  getUnreadCount: async (userId: string): Promise<number>

  // Notify compatible donors
  notifyCompatibleDonors: async (bloodGroup: string, hospital: string)
};
```

---

## 💾 Data Management

### Storage Layer

**Storage Service** (`src/lib/storage.ts`)

```typescript
// localStorage wrapper for CRUD operations

const STORAGE_KEYS = {
  AUTH_TOKEN: 'blood_connect_auth_token',
  CURRENT_USER: 'blood_connect_current_user',
  USERS: 'blood_connect_users',
  BLOOD_REQUESTS: 'blood_connect_blood_requests',
  BLOOD_INVENTORY: 'blood_connect_blood_inventory',
  DONATION_CAMPS: 'blood_connect_donation_camps',
  NOTIFICATIONS: 'blood_connect_notifications',
  CAMP_BOOKINGS: 'blood_connect_camp_bookings',
};

export const storage = {
  // Initialize storage with mock data
  initialize: () => void

  // User operations
  getUsers: (): User[]
  saveUsers: (users: User[]): void
  addUser: (user: User): void
  updateUser: (userId: string, updates: Partial<User>): void

  // Blood request operations
  getBloodRequests: (): BloodRequest[]
  addBloodRequest: (request: BloodRequest): void
  updateBloodRequest: (requestId: string, updates: Partial<BloodRequest>): void

  // Blood inventory operations
  getBloodInventory: (): BloodInventory[]
  updateInventoryItem: (itemId: string, updates: Partial<BloodInventory>): void

  // Donation camp operations
  getDonationCamps: (): DonationCamp[]
  updateDonationCamp: (campId: string, updates: Partial<DonationCamp>): void

  // Notification operations
  getNotifications: (): Notification[]
  addNotification: (notification: Notification): void
  markNotificationAsRead: (notificationId: string): void

  // Camp booking operations
  getCampBookings: (): CampBooking[]
  addCampBooking: (booking: CampBooking): void
};
```

### Data Initialization

```typescript
// On first load, initialize with mock data
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOOD_INVENTORY)) {
    localStorage.setItem(STORAGE_KEYS.BLOOD_INVENTORY, JSON.stringify(mockBloodInventory));
  }
  // ... initialize all other data
};

// Called in App.tsx on mount
useEffect(() => {
  initializeStorage();
}, []);
```

### Data Persistence

```typescript
// All data changes persist immediately to localStorage
// Example flow:

// 1. User creates blood request
const result = await bloodService.createBloodRequest(data);

// 2. Service processes request
const newRequest = { ...data, id: generateId(), status: 'Pending' };

// 3. Storage saves to localStorage
storage.addBloodRequest(newRequest);

// 4. Data persists across page refreshes
// Next visit: Data automatically loaded from localStorage
```

---

## 🎨 UI Components

### Component Library

Using **shadcn/ui** components:

```
Installed Components:
- button
- card
- input
- label
- select
- textarea
- badge
- table
- tabs
- separator
- switch
- dropdown-menu
- toast/sonner
```

### Custom Components

**Header** (`src/components/Header.tsx`)
```typescript
// Navigation header with:
- Logo and app name
- User dropdown menu
- Notification bell with count
- Role-based navigation links
- Logout functionality
```

**ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
```typescript
// Route guard with:
- Authentication check
- Role-based access control
- Automatic redirects
- Loading states
```

---

## 🧬 Business Logic

### Blood Matching Algorithm

```typescript
// Blood type compatibility matrix
const bloodCompatibility: Record<BloodType, BloodType[]> = {
  'O-': ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+'], // Universal donor
  'O+': ['O+', 'B+', 'A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'], // Can receive from all
};

// Get compatible blood types for a recipient
export const getCompatibleBloodTypes = (recipientBloodGroup: BloodType): BloodType[] => {
  // Returns array of compatible donor blood types
};

// Match donors for a blood request
const matchDonors = async (request: BloodRequest) => {
  const compatibleTypes = getCompatibleBloodTypes(request.bloodGroup);
  const allDonors = await storage.getDonors();

  const matchedDonors = allDonors.filter(donor =>
    compatibleTypes.includes(donor.bloodGroup) &&
    donor.available &&
    isEligibleToDonate(donor)
  );

  return matchedDonors;
};
```

### Eligibility Calculation

```typescript
// Calculate next eligible donation date
const calculateNextEligibleDate = (lastDonation: string): string => {
  const lastDate = new Date(lastDonation);
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + 90); // 90 days gap
  return nextDate.toISOString();
};

// Check if donor is eligible now
const isEligibleToDonate = (donor: Donor): boolean => {
  if (!donor.lastDonation) return true;

  const nextEligibleDate = new Date(donor.nextEligibleDate || '');
  const today = new Date();

  return today >= nextEligibleDate;
};
```

### Inventory Status Calculation

```typescript
// Calculate inventory status based on units
const calculateInventoryStatus = (units: number): InventoryStatus => {
  if (units >= 20) return 'Available';
  if (units >= 10) return 'Low Stock';
  return 'Critical';
};

// Auto-update status when units change
const updateInventory = async (itemId: string, newUnits: number) => {
  const newStatus = calculateInventoryStatus(newUnits);
  await storage.updateInventoryItem(itemId, {
    units: newUnits,
    status: newStatus
  });
};
```

---

## 🔌 API Integration Guide

### Converting to Real API

The application is architected for easy API integration. Only service layer needs changes.

**Current (Mock)**:
```typescript
// src/services/blood.service.ts
export const bloodService = {
  getBloodInventory: async (): Promise<BloodInventory[]> => {
    await delay(500);
    return storage.getBloodInventory();
  }
};
```

**With Real API**:
```typescript
// src/services/blood.service.ts
export const bloodService = {
  getBloodInventory: async (): Promise<BloodInventory[]> => {
    const response = await fetch('/api/blood/inventory', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }

    return response.json();
  }
};
```

### API Endpoints

**Recommended API Structure**:

```
Authentication:
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile
POST   /api/auth/change-password

Blood Requests:
GET    /api/blood/requests
POST   /api/blood/requests
GET    /api/blood/requests/:id
PUT    /api/blood/requests/:id
DELETE /api/blood/requests/:id
POST   /api/blood/requests/:id/match

Blood Inventory:
GET    /api/blood/inventory
PUT    /api/blood/inventory/:id
GET    /api/blood/statistics

Donors:
GET    /api/donors
GET    /api/donors/:id
POST   /api/donors/search
GET    /api/donors/:id/stats
POST   /api/donors/:id/donations

Donation Camps:
GET    /api/camps
POST   /api/camps
GET    /api/camps/:id
POST   /api/camps/:id/book

Notifications:
GET    /api/notifications
PUT    /api/notifications/:id/read
POST   /api/notifications/mark-all-read
GET    /api/notifications/unread-count
```

### Error Handling

```typescript
// Centralized error handling
const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 401:
        toast.error('Unauthorized. Please login again.');
        // Redirect to login
        break;
      case 403:
        toast.error('Access denied.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(error.response.data.message || 'An error occurred.');
    }
  } else if (error.request) {
    // Request made but no response
    toast.error('Network error. Please check your connection.');
  } else {
    // Something else happened
    toast.error('An unexpected error occurred.');
  }
};
```

---

## 🚀 Deployment

### Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output in dist/ folder
```

### Environment Variables

Create `.env` file:

```bash
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=Blood Bank Portal
VITE_ENABLE_ANALYTICS=true
```

### Static Hosting

**Vercel**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Netlify**:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## ⚡ Performance Optimization

### Code Splitting

```typescript
// Lazy load pages
import { lazy, Suspense } from 'react';

const DonorDashboard = lazy(() => import('./pages/DonorDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Use with Suspense
<Suspense fallback={<Loading />}>
  <DonorDashboard />
</Suspense>
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memo component
const DonorCard = memo(({ donor }) => {
  // Component only re-renders if donor changes
});

// Memo value
const filteredDonors = useMemo(() => {
  return donors.filter(d => d.available);
}, [donors]);

// Memo callback
const handleSearch = useCallback(() => {
  searchDonors(query);
}, [query]);
```

### Bundle Size

```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Optimization tips:
- Use dynamic imports
- Remove unused dependencies
- Minimize vendor bundles
- Enable tree shaking
```

---

## 🔒 Security

### Best Practices

**1. Input Validation**
```typescript
// Validate on both client and server
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Validate
const result = loginSchema.safeParse(formData);
```

**2. XSS Prevention**
```typescript
// React automatically escapes content
// Be careful with dangerouslySetInnerHTML

// Safe
<div>{userInput}</div>

// Dangerous - avoid
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**3. CSRF Protection**
```typescript
// Use CSRF tokens with API calls
headers: {
  'X-CSRF-Token': getCsrfToken()
}
```

**4. Secure Storage**
```typescript
// Never store sensitive data in localStorage
// Use httpOnly cookies for tokens in production
// Current mock implementation uses localStorage for demo only
```

---

## 🧪 Testing

### Unit Testing

```typescript
// Example with Vitest
import { describe, it, expect } from 'vitest';
import { getCompatibleBloodTypes } from './bloodService';

describe('Blood Matching', () => {
  it('should return correct compatible types for O-', () => {
    const compatible = getCompatibleBloodTypes('O-');
    expect(compatible).toContain('O-');
    expect(compatible).toHaveLength(8); // Universal donor
  });

  it('should handle AB+ correctly', () => {
    const compatible = getCompatibleBloodTypes('AB+');
    expect(compatible).toContain('O-');
    expect(compatible).toContain('AB+');
  });
});
```

### Integration Testing

```typescript
// Example with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { BloodRequest } from './BloodRequest';

describe('BloodRequest Component', () => {
  it('should submit form successfully', async () => {
    render(<BloodRequest />);

    fireEvent.change(screen.getByLabelText('Blood Type'), {
      target: { value: 'O+' }
    });

    fireEvent.click(screen.getByText('Submit Request'));

    expect(await screen.findByText('Request submitted')).toBeInTheDocument();
  });
});
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**2. TypeScript Errors**
```bash
# Check TypeScript version
npm list typescript

# Update if needed
npm install -D typescript@latest
```

**3. localStorage Issues**
```javascript
// Clear storage if corrupted
localStorage.clear();
// Refresh page to reinitialize
```

**4. Route Not Found**
```typescript
// Ensure all routes defined in App.tsx
// Check for typos in route paths
// Verify ProtectedRoute setup
```

---

**Last Updated**: November 2024
**Version**: 1.0.0
**For**: Blood Bank & Donor Matching Portal
