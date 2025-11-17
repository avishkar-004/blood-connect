# 📚 API Reference

Complete API reference for all service methods in the Blood Bank Portal.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication Service](#authentication-service)
- [Blood Service](#blood-service)
- [Donor Service](#donor-service)
- [Notification Service](#notification-service)
- [Storage Service](#storage-service)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## 🎯 Overview

This document provides complete API reference for all service methods. Currently using mock data with localStorage, but the API is designed to be easily swapped with real backend endpoints.

### Service Architecture

```
Components → Services → Storage → localStorage
```

### Common Patterns

All service methods follow these patterns:

```typescript
// Async operation with delay (simulates network)
async methodName(params): Promise<ReturnType> {
  await delay(milliseconds); // Simulate API latency
  // Business logic
  return result;
}

// Consistent return types
{
  success: boolean;
  data?: any;
  error?: string;
}
```

---

## 🔐 Authentication Service

**Location**: `src/services/auth.service.ts`

### Methods

#### `login(credentials: LoginCredentials): Promise<AuthResponse>`

Authenticates user with email and password.

**Parameters**:
```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

**Returns**:
```typescript
interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}
```

**Example**:
```typescript
const response = await authService.login({
  email: 'donor@test.com',
  password: 'password123'
});

if (response.success) {
  console.log('Logged in as:', response.user.name);
  console.log('Token:', response.token);
}
```

**Errors**:
- Invalid email or password
- Account not found
- Account disabled

---

#### `register(data: RegisterData): Promise<AuthResponse>`

Registers new user account.

**Parameters**:
```typescript
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole; // 'donor' | 'recipient' | 'admin'
  phone: string;
  bloodGroup?: BloodType;
  location: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
}
```

**Returns**:
```typescript
interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}
```

**Example**:
```typescript
const response = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepass123',
  role: 'donor',
  phone: '+1234567890',
  bloodGroup: 'O+',
  location: 'New York',
  age: 28,
  gender: 'Male'
});
```

**Errors**:
- Email already registered
- Invalid email format
- Password too short

---

#### `logout(): Promise<void>`

Logs out current user.

**Example**:
```typescript
await authService.logout();
// User token and session cleared
```

---

#### `getCurrentUser(): User | null`

Returns currently logged-in user.

**Returns**: `User` object or `null`

**Example**:
```typescript
const user = authService.getCurrentUser();
if (user) {
  console.log('Current user:', user.name);
  console.log('Role:', user.role);
}
```

---

#### `isAuthenticated(): boolean`

Checks if user is currently authenticated.

**Returns**: `boolean`

**Example**:
```typescript
if (authService.isAuthenticated()) {
  // User is logged in
  loadDashboard();
} else {
  // Redirect to login
  navigateToLogin();
}
```

---

#### `updateProfile(userId: string, updates: Partial<User>): Promise<{ success: boolean; error?: string }>`

Updates user profile information.

**Parameters**:
- `userId`: User ID to update
- `updates`: Partial user object with fields to update

**Example**:
```typescript
const result = await authService.updateProfile('U001', {
  name: 'John Updated',
  phone: '+0987654321',
  location: 'Los Angeles'
});

if (result.success) {
  toast.success('Profile updated!');
}
```

---

#### `changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }>`

Changes user password.

**Example**:
```typescript
const result = await authService.changePassword(
  'U001',
  'oldpass123',
  'newpass456'
);

if (result.success) {
  toast.success('Password changed successfully!');
} else {
  toast.error(result.error);
}
```

**Errors**:
- Current password incorrect
- New password too short
- User not found

---

## 🩸 Blood Service

**Location**: `src/services/blood.service.ts`

### Methods

#### `createBloodRequest(data: CreateBloodRequestData): Promise<{ success: boolean; request?: BloodRequest; error?: string }>`

Creates new blood request.

**Parameters**:
```typescript
interface CreateBloodRequestData {
  recipientId: string;
  recipientName: string;
  bloodGroup: BloodType;
  quantity: number;
  urgency: 'Normal' | 'Urgent' | 'Emergency';
  hospital: string;
  doctorNote?: string;
}
```

**Returns**:
```typescript
{
  success: boolean;
  request?: BloodRequest;
  error?: string;
}
```

**Example**:
```typescript
const result = await bloodService.createBloodRequest({
  recipientId: 'U002',
  recipientName: 'Jane Doe',
  bloodGroup: 'A+',
  quantity: 2,
  urgency: 'Urgent',
  hospital: 'City Hospital',
  doctorNote: 'Required for surgery'
});

if (result.success) {
  console.log('Request ID:', result.request.id);

  // Auto-matching for urgent/emergency requests
  if (result.request.urgency !== 'Normal') {
    await bloodService.matchDonorsForRequest(result.request.id);
  }
}
```

**Side Effects**:
- Request saved to storage
- Status set to 'Pending'
- Admin notified
- Automatic matching for Urgent/Emergency

---

#### `getBloodInventory(): Promise<BloodInventory[]>`

Retrieves current blood inventory.

**Returns**: Array of `BloodInventory` objects

**Example**:
```typescript
const inventory = await bloodService.getBloodInventory();

inventory.forEach(item => {
  console.log(`${item.bloodGroup}: ${item.units} units (${item.status})`);
});

// Output:
// O+: 25 units (Available)
// O-: 8 units (Critical)
// A+: 30 units (Available)
// ...
```

---

#### `updateInventory(itemId: string, updates: Partial<BloodInventory>): Promise<void>`

Updates blood inventory item.

**Parameters**:
- `itemId`: Inventory item ID
- `updates`: Fields to update (units, status, etc.)

**Example**:
```typescript
// Admin adds 5 units of O+ blood
await bloodService.updateInventory('INV001', {
  units: 30, // increased from 25
  status: 'Available'
});

// Status automatically calculated based on units:
// units >= 20: 'Available'
// units 10-20: 'Low Stock'
// units < 10: 'Critical'
```

---

#### `getBloodRequests(): Promise<BloodRequest[]>`

Gets all blood requests.

**Returns**: Array of `BloodRequest` objects

**Example**:
```typescript
const requests = await bloodService.getBloodRequests();

// Filter by status
const pending = requests.filter(r => r.status === 'Pending');
const urgent = requests.filter(r => r.urgency === 'Emergency');
```

---

#### `getBloodRequestsByRecipient(recipientId: string): Promise<BloodRequest[]>`

Gets blood requests for specific recipient.

**Example**:
```typescript
const userRequests = await bloodService.getBloodRequestsByRecipient('U002');

console.log(`You have ${userRequests.length} requests`);
userRequests.forEach(req => {
  console.log(`${req.bloodGroup} - ${req.status}`);
});
```

---

#### `matchDonorsForRequest(requestId: string): Promise<{ success: boolean; matchedDonors: Donor[] }>`

Finds compatible donors for a blood request.

**Returns**:
```typescript
{
  success: boolean;
  matchedDonors: Donor[];
}
```

**Example**:
```typescript
const result = await bloodService.matchDonorsForRequest('R001');

if (result.success) {
  console.log(`Found ${result.matchedDonors.length} compatible donors`);

  result.matchedDonors.forEach(donor => {
    console.log(`${donor.name} (${donor.bloodGroup}) - ${donor.location}`);
    // Notify donor
  });
}
```

**Matching Logic**:
```typescript
// 1. Find compatible blood types
const compatibleTypes = getCompatibleBloodTypes(request.bloodGroup);

// 2. Filter donors
const matches = allDonors.filter(donor =>
  compatibleTypes.includes(donor.bloodGroup) &&
  donor.available &&
  isEligibleToDonate(donor)
);

// 3. Sort by proximity (if location data available)

// 4. Notify matched donors

// 5. Update request status to 'Matched'
```

---

#### `searchCompatibleDonors(bloodGroup: BloodType, location?: string): Promise<Donor[]>`

Searches for compatible donors by blood type.

**Example**:
```typescript
// Find all O- donors (universal donors)
const universalDonors = await bloodService.searchCompatibleDonors('O-');

// Find A+ compatible donors in New York
const matches = await bloodService.searchCompatibleDonors('A+', 'New York');
```

---

#### `updateBloodRequestStatus(requestId: string, status: RequestStatus): Promise<void>`

Updates blood request status.

**Parameters**:
- `requestId`: Request ID
- `status`: New status ('Pending' | 'Matched' | 'In Process' | 'Completed' | 'Cancelled')

**Example**:
```typescript
// Admin approves request
await bloodService.updateBloodRequestStatus('R001', 'In Process');

// Mark as completed
await bloodService.updateBloodRequestStatus('R001', 'Completed');
```

---

#### `cancelBloodRequest(requestId: string): Promise<void>`

Cancels a blood request.

**Example**:
```typescript
await bloodService.cancelBloodRequest('R001');
// Status changed to 'Cancelled'
// Matched donors notified (if any)
```

---

#### `getStatistics(): Promise<BloodStatistics>`

Gets blood bank statistics.

**Returns**:
```typescript
interface BloodStatistics {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalDonors: number;
  totalInventoryUnits: number;
}
```

**Example**:
```typescript
const stats = await bloodService.getStatistics();

console.log(`Total Requests: ${stats.totalRequests}`);
console.log(`Pending: ${stats.pendingRequests}`);
console.log(`Completed: ${stats.completedRequests}`);
```

---

## 👥 Donor Service

**Location**: `src/services/donor.service.ts`

### Methods

#### `getDonors(): Promise<Donor[]>`

Gets all registered donors.

**Example**:
```typescript
const donors = await donorService.getDonors();

// Filter available donors
const available = donors.filter(d => d.available);

// Group by blood type
const byBloodType = donors.reduce((acc, donor) => {
  acc[donor.bloodGroup] = acc[donor.bloodGroup] || [];
  acc[donor.bloodGroup].push(donor);
  return acc;
}, {});
```

---

#### `searchDonors(filters: DonorSearchFilters): Promise<Donor[]>`

Searches donors with filters.

**Parameters**:
```typescript
interface DonorSearchFilters {
  bloodGroup?: BloodType;
  location?: string;
  available?: boolean;
}
```

**Example**:
```typescript
// Search O+ donors in Delhi
const results = await donorService.searchDonors({
  bloodGroup: 'O+',
  location: 'Delhi',
  available: true
});

console.log(`Found ${results.length} available O+ donors in Delhi`);
```

---

#### `getDonorById(donorId: string): Promise<Donor | null>`

Gets specific donor by ID.

**Example**:
```typescript
const donor = await donorService.getDonorById('U001');
if (donor) {
  console.log(`${donor.name} - ${donor.bloodGroup}`);
  console.log(`Total donations: ${donor.totalDonations}`);
}
```

---

#### `getDonorStats(donorId: string): Promise<DonorStats>`

Gets donor statistics.

**Returns**:
```typescript
interface DonorStats {
  totalDonations: number;
  lastDonation: string | null;
  nextEligibleDate: string | null;
  liveSaved: number; // totalDonations * 3
  upcomingCamps: number;
}
```

**Example**:
```typescript
const stats = await donorService.getDonorStats('U001');

console.log(`Total Donations: ${stats.totalDonations}`);
console.log(`Lives Saved: ${stats.liveSaved}`);
console.log(`Next eligible: ${stats.nextEligibleDate}`);
```

---

#### `bookCampSlot(userId: string, campId: string): Promise<{ success: boolean; booking?: CampBooking; error?: string }>`

Books donation camp slot.

**Example**:
```typescript
const result = await donorService.bookCampSlot('U001', 'C001');

if (result.success) {
  toast.success('Camp booked successfully!');
  console.log('Booking ID:', result.booking.id);
} else {
  toast.error(result.error); // e.g., "No slots available"
}
```

**Side Effects**:
- Slot count decreases
- Booking record created
- User notified
- Calendar reminder (future feature)

---

#### `getUpcomingCamps(): Promise<DonationCamp[]>`

Gets upcoming donation camps.

**Example**:
```typescript
const camps = await donorService.getUpcomingCamps();

// Show camps with available slots
const available = camps.filter(c => c.slotsAvailable > 0);

available.forEach(camp => {
  console.log(`${camp.name} - ${camp.date}`);
  console.log(`${camp.slotsAvailable}/${camp.totalSlots} slots available`);
});
```

---

#### `getCampById(campId: string): Promise<DonationCamp | null>`

Gets specific camp details.

**Example**:
```typescript
const camp = await donorService.getCampById('C001');
if (camp) {
  console.log(camp.name);
  console.log(`Location: ${camp.location}`);
  console.log(`Date: ${camp.date}`);
}
```

---

#### `recordDonation(donorId: string, campId: string): Promise<void>`

Records completed donation.

**Example**:
```typescript
// After donor completes donation at camp
await donorService.recordDonation('U001', 'C001');

// Side effects:
// - totalDonations incremented
// - lastDonation updated
// - nextEligibleDate calculated (+ 90 days)
// - Inventory updated (+ units)
```

---

## 🔔 Notification Service

**Location**: `src/services/notification.service.ts`

### Methods

#### `getUserNotifications(userId: string): Promise<Notification[]>`

Gets notifications for user.

**Example**:
```typescript
const notifications = await notificationService.getUserNotifications('U001');

// Sort by date (newest first)
const sorted = notifications.sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Filter unread
const unread = notifications.filter(n => !n.read);
```

---

#### `createNotification(notification: Omit<Notification, 'id'>): Promise<void>`

Creates new notification.

**Example**:
```typescript
await notificationService.createNotification({
  userId: 'U001',
  type: 'request',
  title: 'Blood Request Match',
  message: 'Your blood type (O+) is needed at City Hospital',
  date: new Date().toISOString(),
  read: false
});
```

**Notification Types**:
- `'request'` - Blood request alerts
- `'reminder'` - Camp/eligibility reminders
- `'alert'` - Important system alerts
- `'info'` - General information

---

#### `markAsRead(notificationId: string): Promise<void>`

Marks notification as read.

**Example**:
```typescript
await notificationService.markAsRead('N001');
```

---

#### `markAllAsRead(userId: string): Promise<void>`

Marks all user notifications as read.

**Example**:
```typescript
await notificationService.markAllAsRead('U001');
toast.success('All notifications marked as read');
```

---

#### `getUnreadCount(userId: string): Promise<number>`

Gets count of unread notifications.

**Example**:
```typescript
const count = await notificationService.getUnreadCount('U001');
// Display in badge
setBadgeCount(count);
```

---

#### `notifyCompatibleDonors(bloodGroup: BloodType, hospital: string): Promise<void>`

Notifies all compatible donors about blood need.

**Example**:
```typescript
// When urgent blood request created
await notificationService.notifyCompatibleDonors('O+', 'City Hospital');

// All O+ donors receive notification
```

---

## 💾 Storage Service

**Location**: `src/lib/storage.ts`

### Core Methods

#### `initializeStorage(): void`

Initializes localStorage with mock data if empty.

**Example**:
```typescript
// Call once on app load
useEffect(() => {
  initializeStorage();
}, []);
```

---

#### User Operations

```typescript
// Get all users
const users = storage.getUsers();

// Add user
storage.addUser(newUser);

// Update user
storage.updateUser('U001', { name: 'Updated Name' });

// Find user by email
const user = storage.getUserByEmail('test@example.com');
```

---

#### Blood Request Operations

```typescript
// Get all requests
const requests = storage.getBloodRequests();

// Add request
storage.addBloodRequest(newRequest);

// Update request
storage.updateBloodRequest('R001', { status: 'Completed' });
```

---

#### Inventory Operations

```typescript
// Get inventory
const inventory = storage.getBloodInventory();

// Update inventory item
storage.updateInventoryItem('INV001', {
  units: 30,
  status: 'Available'
});
```

---

#### Camp Operations

```typescript
// Get camps
const camps = storage.getDonationCamps();

// Update camp
storage.updateDonationCamp('C001', {
  slotsAvailable: 45
});

// Get bookings
const bookings = storage.getCampBookings();

// Add booking
storage.addCampBooking(newBooking);
```

---

#### Notification Operations

```typescript
// Get notifications
const notifications = storage.getNotifications();

// Add notification
storage.addNotification(newNotification);

// Mark as read
storage.markNotificationAsRead('N001');
```

---

## 🛠️ Utility Functions

### Blood Type Compatibility

**Location**: `src/services/blood.service.ts`

```typescript
// Get compatible donor types for recipient
export const getCompatibleBloodTypes = (
  recipientBloodGroup: BloodType
): BloodType[] => {
  // Returns array of compatible types
};

// Example:
const compatible = getCompatibleBloodTypes('A+');
// Returns: ['A+', 'A-', 'O+', 'O-']
```

### Eligibility Calculation

```typescript
// Calculate next eligible donation date
export const calculateNextEligibleDate = (
  lastDonation: string
): string => {
  const lastDate = new Date(lastDonation);
  lastDate.setDate(lastDate.getDate() + 90);
  return lastDate.toISOString();
};

// Check if eligible now
export const isEligibleToDonate = (donor: Donor): boolean => {
  if (!donor.lastDonation) return true;
  return new Date() >= new Date(donor.nextEligibleDate);
};
```

### ID Generation

```typescript
// Generate unique IDs
export const generateId = (prefix: string): string => {
  return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

// Examples:
const userId = generateId('U');     // U1699876543abc123
const requestId = generateId('R');  // R1699876543xyz789
```

### Delay Simulation

```typescript
// Simulate network latency
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Usage in service methods
await delay(500); // Simulate 500ms API call
```

---

## 📘 Type Definitions

### Core Types

```typescript
type UserRole = 'donor' | 'recipient' | 'admin';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

type RequestStatus = 'Pending' | 'Matched' | 'In Process' | 'Completed' | 'Cancelled';

type Urgency = 'Normal' | 'Urgent' | 'Emergency';

type InventoryStatus = 'Available' | 'Low Stock' | 'Critical';

type NotificationType = 'request' | 'reminder' | 'alert' | 'info';
```

### Interfaces

**User**:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  bloodGroup?: BloodType;
  location: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  avatar?: string;
  createdAt: string;
  lastDonation?: string;
  nextEligibleDate?: string;
  totalDonations?: number;
  available?: boolean;
  isActive: boolean;
  emailVerified: boolean;
}
```

**BloodRequest**:
```typescript
interface BloodRequest {
  id: string;
  recipientId: string;
  recipientName: string;
  bloodGroup: BloodType;
  quantity: number;
  urgency: Urgency;
  hospital: string;
  status: RequestStatus;
  requestDate: string;
  doctorNote?: string;
  matchedDonors?: string[];
}
```

**BloodInventory**:
```typescript
interface BloodInventory {
  id: string;
  bloodGroup: BloodType;
  units: number;
  status: InventoryStatus;
  lastUpdated: string;
}
```

**DonationCamp**:
```typescript
interface DonationCamp {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  totalSlots: number;
  slotsAvailable: number;
}
```

**Notification**:
```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
```

---

## ⚠️ Error Handling

### Error Response Format

All service methods return errors in consistent format:

```typescript
{
  success: false,
  error: 'Error message here'
}
```

### Common Errors

**Authentication Errors**:
```
- 'Invalid email or password'
- 'Email already registered'
- 'User not found'
- 'Current password incorrect'
```

**Blood Request Errors**:
```
- 'Invalid blood type'
- 'Quantity must be between 1 and 10'
- 'Request not found'
- 'Cannot cancel completed request'
```

**Donation Camp Errors**:
```
- 'No slots available'
- 'Camp not found'
- 'Already booked this camp'
- 'User not eligible to donate'
```

### Error Handling Pattern

```typescript
try {
  const result = await service.method();

  if (result.success) {
    // Handle success
    toast.success('Operation successful!');
  } else {
    // Handle error
    toast.error(result.error);
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
  toast.error('An unexpected error occurred');
}
```

---

## 💡 Examples

### Complete Workflow Examples

**Create Blood Request Workflow**:
```typescript
// 1. User submits form
const formData = {
  recipientId: user.id,
  recipientName: user.name,
  bloodGroup: 'A+',
  quantity: 2,
  urgency: 'Urgent',
  hospital: 'City Hospital',
  doctorNote: 'Surgery required'
};

// 2. Create request
const requestResult = await bloodService.createBloodRequest(formData);

if (!requestResult.success) {
  toast.error(requestResult.error);
  return;
}

// 3. Match donors (automatic for urgent/emergency)
const matchResult = await bloodService.matchDonorsForRequest(
  requestResult.request.id
);

// 4. Notify matched donors
if (matchResult.matchedDonors.length > 0) {
  await notificationService.notifyCompatibleDonors(
    formData.bloodGroup,
    formData.hospital
  );

  toast.success(
    `Request created! ${matchResult.matchedDonors.length} donors matched.`
  );
} else {
  toast.warning('Request created, but no donors matched yet.');
}

// 5. Redirect to dashboard
navigate('/recipient-dashboard');
```

**Book Donation Camp Workflow**:
```typescript
// 1. Load available camps
const camps = await donorService.getUpcomingCamps();
const availableCamps = camps.filter(c => c.slotsAvailable > 0);

// 2. User selects camp
const selectedCamp = availableCamps[0];

// 3. Check eligibility
const donor = await donorService.getDonorById(user.id);
if (!isEligibleToDonate(donor)) {
  toast.error(
    `You can donate again on ${donor.nextEligibleDate}`
  );
  return;
}

// 4. Book slot
const bookingResult = await donorService.bookCampSlot(
  user.id,
  selectedCamp.id
);

if (bookingResult.success) {
  // 5. Create notification
  await notificationService.createNotification({
    userId: user.id,
    type: 'reminder',
    title: 'Camp Booking Confirmed',
    message: `You're registered for ${selectedCamp.name} on ${selectedCamp.date}`,
    date: new Date().toISOString(),
    read: false
  });

  toast.success('Camp booked successfully!');

  // 6. Refresh camp list
  refreshCamps();
}
```

**Admin Approve Request Workflow**:
```typescript
// 1. Load pending requests
const allRequests = await bloodService.getBloodRequests();
const pending = allRequests.filter(r => r.status === 'Pending');

// 2. Admin reviews request
const request = pending[0];

// 3. Check inventory availability
const inventory = await bloodService.getBloodInventory();
const bloodItem = inventory.find(i => i.bloodGroup === request.bloodGroup);

if (!bloodItem || bloodItem.units < request.quantity) {
  toast.warning('Insufficient inventory for this request');
  return;
}

// 4. Approve request
await bloodService.updateBloodRequestStatus(request.id, 'In Process');

// 5. Match donors
const matchResult = await bloodService.matchDonorsForRequest(request.id);

// 6. Notify recipient
await notificationService.createNotification({
  userId: request.recipientId,
  type: 'info',
  title: 'Request Approved',
  message: `Your blood request has been approved. ${matchResult.matchedDonors.length} donors matched.`,
  date: new Date().toISOString(),
  read: false
});

toast.success('Request approved and donors notified!');
```

---

**Last Updated**: November 2024
**Version**: 1.0.0
**For**: Blood Bank & Donor Matching Portal
