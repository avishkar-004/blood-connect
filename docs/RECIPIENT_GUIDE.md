# 🏥 Recipient User Guide

Complete guide for blood recipients using the Blood Bank Portal.

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Recipient Dashboard](#recipient-dashboard)
- [Creating Blood Requests](#creating-blood-requests)
- [Emergency Requests](#emergency-requests)
- [Features Overview](#features-overview)
- [Detailed Feature Guide](#detailed-feature-guide)
- [Understanding Blood Requests](#understanding-blood-requests)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Tips for Recipients](#tips-for-recipients)

---

## 🎯 Introduction

As a blood recipient (or representative for a patient), this portal helps you:
- Create blood requests quickly and efficiently
- View matched compatible donors in real-time
- Track the status of your blood requests
- Submit emergency requests for urgent needs
- Search for available donors in your area
- Manage multiple requests simultaneously

---

## 🚀 Getting Started

### Creating Your Recipient Account

1. **Visit the portal**: Navigate to `http://localhost:8081`

2. **Click "Login/Register"** in the header

3. **Select "Register" tab**

4. **Fill in your details**:
   - First Name and Last Name
   - Email address (will be your username)
   - Password (secure, at least 8 characters)
   - Phone number
   - Date of birth
   - Gender
   - Location/City
   - Blood Type (if known, optional)

5. **Select "Recipient" as your user type**

6. **Click "Create Account"**

7. **Automatic Login**: You'll be redirected to your recipient dashboard

### Logging In

**Test Credentials** (for demo):
- Email: `recipient@test.com`
- Password: `password123`

**Your Account**:
- Email: Your registered email
- Password: Your chosen password

---

## 📊 Recipient Dashboard

Your dashboard is your central hub for managing blood requests.

### Dashboard Overview

When you log in, you'll see:

#### 1. **Statistics Cards** (Top Row)

**Active Requests**
- Number of currently open blood requests
- Includes pending, matched, and in-process requests
- Quick overview of your ongoing needs

**Total Requests**
- Lifetime total of all blood requests created
- Includes completed and cancelled requests
- Historical record of your activity

**Donors Matched**
- Total compatible donors found for all requests
- Higher number means better chances of fulfillment
- Shows effectiveness of matching algorithm

**Blood Type**
- Your blood group (if specified)
- Used for request creation
- Can be updated in profile

#### 2. **Blood Request Status Section**

Shows all your blood requests with:

**Request Information**:
- Blood type needed
- Units required
- Hospital name
- Request date
- Urgency level (Emergency/Urgent/Normal)

**Status Badge**:
- **Pending**: Awaiting approval
- **Matched**: Donors found
- **In Process**: Being fulfilled
- **Completed**: Request fulfilled
- **Cancelled**: Request cancelled

**Progress Bar**:
- Visual indicator of request progress
- 25% - Pending
- 50% - Matched
- 75% - In Process
- 100% - Completed

**Matched Donors**:
- Shows donor names and blood types
- Click to view donor details
- Contact information (if available)

**Actions**:
- "Cancel Request" button (for pending requests)
- "View Details" button
- "Contact Donor" button

#### 3. **Recent Notifications**

Displays last 5 notifications:
- Request status updates
- New donor matches
- Admin messages
- System notifications
- Click "View All" for complete history

---

## ✨ Features Overview

### Available Features

1. **Dashboard** - Overview of all your requests
2. **Create Request** - Submit new blood requests
3. **Emergency Request** - Fast-track urgent needs
4. **Donor Search** - Find compatible donors
5. **Notifications** - Track all updates
6. **Profile** - Manage your information
7. **Settings** - Configure preferences
8. **Help** - Get assistance

---

## 📝 Creating Blood Requests

### Standard Blood Request

**When to Use**: For planned surgeries, scheduled treatments, or non-urgent needs.

#### Step-by-Step Process:

1. **Navigate**: Click "Request Blood" in dashboard or menu

2. **Fill Patient Information**:
   ```
   - Patient Name: Full legal name
   - Age: Patient's age
   - Contact Number: Reachable phone number
   - Email Address: For updates and confirmations
   ```

3. **Specify Blood Requirements**:
   ```
   - Blood Type Required: Select from dropdown (A+, A-, B+, B-, AB+, AB-, O+, O-)
   - Units Required: Number of blood units needed (typically 1-4)
   - Urgency Level:
     * Normal: For scheduled procedures (within 1 week)
     * Urgent: Within 48 hours
     * Emergency: Immediate need (within 24 hours)
   ```

4. **Hospital/Medical Facility Details**:
   ```
   - Hospital Name: Select from list or choose "Other"
   - Hospital Address: Full address with city and state
   - Doctor's Name: Attending physician
   - Doctor's Contact: Doctor's phone number
   ```

5. **Medical Details**:
   ```
   - Reason for Blood Requirement: Describe medical condition
     Examples:
     - "Surgery - Cardiac procedure"
     - "Accident - Multiple injuries"
     - "Chronic illness - Thalassemia"
     - "Pregnancy complications"

   - Upload Doctor's Prescription: (Optional but recommended)
     Accepted formats: PDF, JPG, PNG
     Max size: 5MB
   ```

6. **Additional Notes**: (Optional)
   ```
   - Any additional information
   - Special requirements
   - Preferred donation time
   - Contact preferences
   ```

7. **Terms & Consent**:
   - Check the consent checkbox
   - Confirms information accuracy
   - Agrees to portal terms

8. **Submit Request**:
   - Click "Submit Request" button
   - Wait for confirmation message
   - Automatically redirected to dashboard

### What Happens After Submission?

**Immediate Actions**:
1. Request saved to system
2. Assigned unique request ID
3. Status set to "Pending"
4. Admin notified for review

**Automatic Matching** (for Urgent/Emergency):
1. System searches for compatible donors
2. Blood type compatibility checked
3. Location proximity considered
4. Available donors notified
5. Matched donors list updated

**Within 24 Hours**:
1. Admin reviews request
2. Verifies hospital details
3. Approves request
4. Status changes to "In Process"

**Donor Notification**:
1. Compatible donors receive alert
2. Notification includes:
   - Blood type needed
   - Hospital location
   - Urgency level
   - Units required

---

## 🚨 Emergency Requests

### When to Use Emergency Request

Use emergency requests for:
- ⚠️ Severe accidents or trauma
- ⚠️ Emergency surgeries
- ⚠️ Critical blood loss situations
- ⚠️ Life-threatening conditions
- ⚠️ When every minute counts

### Emergency Request Process

1. **Quick Access**:
   - Click "Emergency Request" button (red) on dashboard
   - Or navigate to `/emergency` page
   - Prominently displayed for quick access

2. **Simplified Form**:
   ```
   Essential Information Only:
   - Patient Name
   - Blood Type Required
   - Hospital Name
   - Location
   - Contact Number
   - Urgency Level: Automatically set to "Critical"
   - Units Required
   - Brief Description
   ```

3. **Priority Processing**:
   - Request marked with red "Emergency" badge
   - Immediate notification to all compatible donors in area
   - Admin alerted with high priority
   - Moved to top of request queue

4. **24/7 Hotline Information**:
   ```
   Emergency Hotline: 1-800-BLOOD-HELP
   Available 24/7 for immediate assistance
   ```

5. **Fast-Track Approval**:
   - Reviewed within 1 hour
   - Expedited matching process
   - Multiple donors notified simultaneously

### Emergency Request Tips

✅ **Do**:
- Keep information concise but accurate
- Provide reachable contact number
- Specify exact hospital location
- Mention critical nature in description

❌ **Don't**:
- Don't abuse emergency system for non-critical needs
- Don't provide false information
- Don't forget to update when need is fulfilled

---

## 📖 Detailed Feature Guide

### 1. Donor Search

**Purpose**: Find compatible donors in your area proactively.

#### How to Use:

1. **Navigate**: Click "Donor Search" in menu

2. **Set Search Filters**:
   ```
   - Location: Enter city or area
   - Blood Group: Select blood type needed
   - Additional filters (if available)
   ```

3. **View Search Results**:

   Each donor card displays:
   ```
   - Donor name and age
   - Blood type (prominent badge)
   - Location and distance
   - Total donations made
   - Current availability status
   - Contact button
   ```

4. **Contact Donors**:
   - Click "Contact Donor" button
   - Notification sent to donor
   - Donor can choose to respond
   - Their contact info shared if they agree

#### Search Tips:

- **Blood Compatibility**: System shows compatible blood types automatically
  - If you need A+, you'll see A+, A-, O+, O- donors
  - If you need O-, you'll only see O- donors (must match exactly)

- **Location Priority**: Donors closer to your location shown first

- **Availability**: Green "Available" badge means donor is actively accepting requests

#### Blood Compatibility Reference:

```
Can Receive From:

O-  → O-
O+  → O-, O+
B-  → O-, B-
B+  → O-, O+, B-, B+
A-  → O-, A-
A+  → O-, O+, A-, A+
AB- → O-, A-, B-, AB-
AB+ → ALL TYPES (Universal Recipient)
```

---

### 2. Managing Blood Requests

#### Viewing Request Details

**From Dashboard**:
1. Scroll to "My Blood Requests" section
2. Click on any request card
3. View complete request information

**Request Detail View Shows**:
```
Request Information:
- Request ID
- Blood type and units
- Hospital details
- Creation date
- Current status

Patient Information:
- Patient name
- Age and contact
- Medical reason

Matched Donors:
- List of compatible donors
- Their blood types
- Location and contact (if shared)

Status History:
- Timeline of status changes
- Admin actions taken
- Notifications sent
```

#### Cancelling a Request

**When You Can Cancel**:
- Request is in "Pending" status
- Before donors have been contacted
- Before admin approval

**How to Cancel**:
1. Go to dashboard
2. Find request you want to cancel
3. Click "Cancel Request" button
4. Confirm cancellation in popup
5. Status changes to "Cancelled"

**What Happens When Cancelled**:
- Request marked as cancelled
- Matched donors notified (if any)
- No further action taken
- Request remains in history for records

**When You Cannot Cancel**:
- Status is "In Process" or "Completed"
- Donors already committed
- Contact admin for assistance in such cases

---

### 3. Tracking Request Progress

#### Status Definitions

**Pending** (🟡):
```
What it means:
- Request submitted successfully
- Awaiting admin review
- Not yet visible to donors

What you should do:
- Wait for admin approval (usually <24 hours)
- Keep phone accessible
- Prepare hospital paperwork

Timeline: 0-24 hours
```

**Matched** (🔵):
```
What it means:
- Compatible donors found
- Donors notified about request
- Awaiting donor response

What you should do:
- Review matched donor list
- Contact donors if needed
- Coordinate with hospital

Timeline: 24-48 hours
```

**In Process** (🟠):
```
What it means:
- Donors have responded positively
- Blood bank coordinating fulfillment
- Donation scheduled or in progress

What you should do:
- Stay in touch with hospital
- Confirm donation appointments
- Prepare to receive blood

Timeline: 48-72 hours
```

**Completed** (🟢):
```
What it means:
- Blood successfully donated
- Request fulfilled
- Patient received blood

What you should do:
- Thank donors (optional but appreciated)
- Update request if more blood needed
- Close request

Timeline: Final status
```

**Cancelled** (⚫):
```
What it means:
- Request was cancelled by you or admin
- No further action
- Remains in history

Reasons for cancellation:
- Patient condition improved
- Blood arranged from other source
- Request error
- Administrative reasons
```

#### Progress Indicators

**Dashboard Progress Bar**:
- Visual representation of request status
- Color-coded for quick identification
- Percentage shows completion stage

**Status Timeline**:
- Shows date/time of each status change
- Helps track processing speed
- Useful for urgent requests

**Notification Alerts**:
- Real-time updates on status changes
- SMS/Email notifications (if enabled)
- In-app notification badges

---

### 4. Notifications

#### Types of Notifications for Recipients

**Request Status Updates**:
```
- "Request Approved" - Admin approved your request
- "Donors Matched" - Compatible donors found
- "Donor Responded" - A donor agreed to help
- "Request Fulfilled" - Blood collection completed
```

**System Notifications**:
```
- "Document Required" - Additional paperwork needed
- "Update Contact Info" - Hospital needs to reach you
- "Request Expiring" - Pending request auto-cancelling soon
```

**Admin Messages**:
```
- Questions about your request
- Verification requirements
- Important announcements
```

#### Managing Notifications:

1. **View All Notifications**:
   - Click bell icon in header
   - Or navigate to "Notifications" page
   - Sorted by date (newest first)

2. **Unread Count**:
   - Red badge shows unread count
   - Updates in real-time

3. **Mark as Read**:
   - Click "Mark as Read" on individual notification
   - Or use "Mark All as Read" button

4. **Notification Settings**:
   - Configure in Settings page
   - Enable/disable email notifications
   - Enable/disable SMS alerts
   - Choose notification types

---

### 5. Profile Management

#### Personal Information

**Editable Fields**:
```
- Full Name
- Phone Number
- Location/City
- Emergency Contact
- Blood Type (if known)
```

**How to Update**:
1. Navigate to "Profile" page
2. Click "Edit Profile" button
3. Modify fields as needed
4. Click "Save Changes"
5. Confirmation message appears

#### Request History

**View Past Requests**:
```
Shows:
- All requests ever created
- Completion status
- Date of request
- Blood type and units
- Hospital information
- Outcome
```

**Why This Is Useful**:
- Track your medical history
- Reference for future requests
- Share with doctors
- Insurance documentation

---

### 6. Settings

#### Notification Preferences

**Communication Channels**:
```
☐ Email Notifications
☐ SMS Notifications
☐ Push Notifications (browser)
```

**Alert Types**:
```
☐ Request Status Updates
☐ Donor Match Alerts
☐ Admin Messages
☐ System Announcements
```

#### Security Settings

**Password Management**:
```
Steps:
1. Enter current password
2. Enter new password
3. Confirm new password
4. Click "Change Password"

Requirements:
- Minimum 8 characters
- At least one letter
- At least one number
- Must match confirmation
```

#### Privacy Settings

**Profile Visibility**:
- Control who can see your information
- Toggle donor access to your profile
- Share contact information selectively

---

## 📚 Understanding Blood Requests

### Blood Types and Compatibility

#### The 8 Blood Types:
```
1. O- (Universal Donor - can give to all)
2. O+
3. B-
4. B+
5. A-
6. A+
7. AB-
8. AB+ (Universal Recipient - can receive from all)
```

#### Compatibility Chart:

| You Need | Can Receive From |
|----------|-----------------|
| O- | O- only |
| O+ | O-, O+ |
| B- | O-, B- |
| B+ | O-, O+, B-, B+ |
| A- | O-, A- |
| A+ | O-, O+, A-, A+ |
| AB- | O-, A-, B-, AB- |
| AB+ | ALL TYPES |

### Units of Blood

**What is a Unit?**
- One unit = approximately 450-500 ml of blood
- One donation = 1 unit
- Typical request = 1-4 units

**How Many Units Do You Need?**
```
Minor Surgery: 1-2 units
Major Surgery: 2-4 units
Trauma/Accident: 4-8 units
Chronic Conditions: Varies, consult doctor
```

### Urgency Levels Explained

**Normal (Scheduled)**:
```
Timeline: 1 week or more
Examples:
- Planned surgery
- Scheduled blood transfusion
- Routine replacement

Processing: Standard review process
```

**Urgent (Priority)**:
```
Timeline: 24-48 hours
Examples:
- Upcoming surgery (within 2 days)
- Moderate blood loss
- Critical patient condition

Processing: Expedited matching
```

**Emergency (Critical)**:
```
Timeline: Immediate (0-12 hours)
Examples:
- Severe accident
- Emergency surgery
- Life-threatening situation

Processing: Immediate action, all compatible donors notified
```

---

## ❓ Frequently Asked Questions

### Creating Requests

**Q: How long does it take to get blood after requesting?**
A:
- Normal requests: 3-7 days
- Urgent requests: 24-48 hours
- Emergency requests: Same day to 24 hours
- Depends on blood type availability and location

**Q: Can I create multiple requests?**
A: Yes, you can have multiple active requests if needed for different patients or situations.

**Q: What if my blood type is rare?**
A: Rare blood types (like AB-, O-) may take longer to match. Emergency hotline can help locate rare blood sources.

**Q: Do I need doctor's prescription?**
A: While optional for the online form, hospitals will require proper medical documentation for actual blood transfusion.

**Q: Can I request blood for someone else?**
A: Yes, as a representative, you can create requests for family members or patients you're authorized to help.

### Matching and Donors

**Q: How does donor matching work?**
A: System automatically finds compatible blood types in your area, considering:
- Blood type compatibility
- Geographic proximity
- Donor availability
- Recent donation history

**Q: Can I choose specific donors?**
A: You can use donor search to find specific donors, but the automated matching considers all compatible donors.

**Q: What if no donors match my request?**
A:
- System will keep searching
- Expand search radius automatically
- Admin will manually coordinate with blood banks
- Emergency hotline available for urgent cases

**Q: How do I contact matched donors?**
A: Click "Contact Donor" button on their profile. The system sends them a notification with your request details.

### Request Management

**Q: Can I edit a request after submitting?**
A: You cannot edit after submission for record-keeping, but you can:
- Add comments/notes
- Cancel and create new request
- Contact admin for modifications

**Q: What if I need to cancel after donors matched?**
A: Contact admin immediately. They'll coordinate with donors and handle cancellation properly.

**Q: How do I know if my request is fulfilled?**
A:
- Status changes to "Completed"
- You receive notification
- Hospital confirms blood receipt
- Dashboard updated

**Q: Can I see who donated for my request?**
A: Yes, matched donors' names (with their consent) are shown in your request details.

### Costs and Payments

**Q: Is there a charge for using this portal?**
A: The portal is free to use. Actual blood charges (if any) are handled by hospitals/blood banks.

**Q: Do I pay donors directly?**
A: No. Blood donation is voluntary. Do not offer payment to donors.

**Q: Are there hospital charges?**
A: Blood processing, testing, and storage have hospital fees. Check with your hospital.

### Privacy and Security

**Q: Is my medical information private?**
A: Yes. Only necessary information is shared:
- Blood type (to match donors)
- Hospital location (for coordination)
- Contact info (to reach you)
- Medical details are NOT shared with donors

**Q: Can donors see my personal details?**
A: Donors see only:
- Blood type needed
- Hospital location (not your home address)
- Urgency level
Your name and direct contact are shared only with your permission.

### Technical Issues

**Q: My request isn't showing on dashboard. What should I do?**
A:
1. Refresh the page
2. Clear browser cache
3. Log out and log back in
4. Contact support if still not visible

**Q: I forgot my password. How do I reset it?**
A: Click "Forgot Password" on login page, enter your email, and follow reset instructions.

**Q: Notifications aren't working. Why?**
A: Check:
- Notification settings enabled
- Browser permissions granted
- Email not in spam folder
- Contact info correct in profile

---

## 💡 Tips for Recipients

### Before Creating a Request

1. **Gather Information**:
   - Confirm blood type needed (ask doctor)
   - Know how many units required
   - Have hospital details ready
   - Prepare medical reason description

2. **Choose Correct Urgency**:
   - Be honest about timeline
   - Don't mark as emergency if it's scheduled
   - Consider doctor's recommendation

3. **Complete Documentation**:
   - Have prescription ready (if available)
   - Doctor's contact information
   - Hospital admission details

### During Request Process

1. **Stay Accessible**:
   - Keep phone charged and with you
   - Check email regularly
   - Enable notifications
   - Respond to admin queries promptly

2. **Coordinate with Hospital**:
   - Inform hospital about online request
   - Share request ID with hospital
   - Confirm hospital accepts portal donations
   - Coordinate timing with medical procedures

3. **Monitor Progress**:
   - Check dashboard daily
   - Review matched donors
   - Contact donors if needed
   - Update admin on any changes

### After Request Fulfilled

1. **Confirm Receipt**:
   - Verify blood received at hospital
   - Update request status if needed
   - Close request in system

2. **Thank Donors** (Optional):
   - Send thank you message through portal
   - Acknowledge their contribution
   - Share recovery progress if comfortable

3. **Maintain Records**:
   - Save request details
   - Keep for medical history
   - Reference for future needs

### For Better Results

1. **Provide Accurate Information**:
   - Double-check blood type
   - Correct hospital location
   - Working contact number
   - Valid email address

2. **Be Patient but Proactive**:
   - Allow reasonable time for matching
   - Follow up if no response in 24 hours
   - Use emergency channels for urgent needs
   - Don't spam the system

3. **Use Multiple Channels**:
   - Don't rely solely on portal
   - Contact blood banks directly
   - Inform hospital staff
   - Use emergency hotline if critical

4. **Plan Ahead**:
   - For scheduled procedures, request early
   - Allow 3-7 days for normal requests
   - Consider rare blood type availability
   - Have backup plans

---

## 🆘 Emergency Resources

### Immediate Help

**24/7 Emergency Hotline**:
```
📞 1-800-BLOOD-HELP

Available for:
- Critical blood needs
- Rare blood types
- Emergency situation guidance
- Donor coordination assistance
```

### Direct Hospital Contact

**When to Contact Hospital Directly**:
- Life-threatening emergencies
- Already admitted patient
- Surgery within 24 hours
- Portal not accessible

### Admin Support

**Contact admin when**:
- Request not approved after 24 hours
- Need to modify approved request
- Technical issues with portal
- Special circumstances

---

## 📞 Need Help?

### In-App Support
- Click "Help" in menu for FAQs
- Check this documentation
- View tutorials (if available)

### Technical Support
- Report bugs through feedback
- Email: support@bloodbank.com (fictional)
- Response time: 24-48 hours

### Medical Emergencies
- Call emergency hotline: 1-800-BLOOD-HELP
- Contact hospital directly: Emergency numbers provided with hospital
- Call emergency services: 911 (or local emergency number)

---

## 🎯 Quick Reference

### Common Tasks

| Task | Steps |
|------|-------|
| Create request | Dashboard → Request Blood → Fill form → Submit |
| Emergency request | Dashboard → Emergency button → Fill form → Submit |
| View request status | Dashboard → My Requests → Click on request |
| Cancel request | Dashboard → Find request → Cancel button → Confirm |
| Search donors | Donor Search → Set filters → Search |
| Contact donor | Donor profile → Contact Donor button |
| Update profile | Profile → Edit → Save Changes |
| Change password | Settings → Security → Change Password |

### Status Colors

| Status | Color | Meaning |
|--------|-------|---------|
| Pending | Yellow | Awaiting approval |
| Matched | Blue | Donors found |
| In Process | Orange | Being fulfilled |
| Completed | Green | Successfully done |
| Cancelled | Gray | Request cancelled |

---

**Thank you for trusting our platform for your blood needs. We're here to help save lives!** 🩸❤️

---

**Last Updated**: November 2024
**Version**: 1.0.0
**For**: Blood Bank & Donor Matching Portal
