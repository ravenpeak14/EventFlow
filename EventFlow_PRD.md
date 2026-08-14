# EventFlow --- Product Requirements Document (PRD)

**Version:** 1.0\
**Status:** Draft\
**Project Type:** Portfolio Project\
**Primary Stack:** Ionic + Laravel 12 + MySQL

------------------------------------------------------------------------

## 1. Product Overview

**EventFlow** is an event management and ticketing platform that allows
organizers to create and manage events, configure ticket types, manage
attendees, monitor ticket sales, and perform QR-based event check-in.

On the attendee side, users can discover events, view event details,
purchase tickets, receive digital tickets with QR Codes, and use them
during check-in.

The system is designed as a portfolio project demonstrating full-stack
development, business process analysis, REST API development, relational
database design, role-based access control, transaction processing, QR
Code integration, reporting, analytics, and mobile application
development.

### Core Architecture

``` text
Ionic Application
       |
       | REST API
       v
Laravel 12 Backend
       |
       | Eloquent ORM
       v
MySQL Database
```

------------------------------------------------------------------------

## 2. Design Direction

The UI/UX direction is **inspired by Eventbrite**, with emphasis on
functional modern design rather than an AI-SaaS visual style.

### Visual Principles

-   Clean and professional
-   Strong typography
-   Clear visual hierarchy
-   Strong blocks and sections
-   Moderate border radius
-   Large event imagery
-   Clear CTA buttons
-   Neutral backgrounds
-   Limited accent color
-   Minimal unnecessary shadows
-   Content-first layout

### Explicitly Avoid

-   Excessive gradients
-   Excessive glassmorphism
-   Excessive floating cards
-   Excessive rounded components
-   Neon colors everywhere
-   Heavy AI-dashboard aesthetics
-   Decorative UI that reduces information clarity

### Design Philosophy

> Content first, UI second.

Event name, event image, date, location, ticket type, and price should
be immediately understandable.

------------------------------------------------------------------------

## 3. Problem Statement

Event management for small and medium-sized events is often handled
using multiple disconnected tools such as forms, spreadsheets, messaging
applications, manual bank transfers, and manually maintained attendee
lists.

This creates several problems:

1.  Participant data is scattered across multiple systems.
2.  Ticket capacity is difficult to monitor accurately.
3.  Overselling can occur.
4.  Manual check-in is slow.
5.  Organizers have limited visibility into sales performance.
6.  Transaction history is difficult to manage.
7.  Refund and cancellation processes are difficult to track.
8.  Event staff lack a dedicated mobile check-in workflow.

EventFlow aims to centralize these processes into one integrated
platform.

------------------------------------------------------------------------

## 4. Product Goals

### Primary Goals

1.  Simplify event creation and management.
2.  Allow attendees to discover and purchase event tickets.
3.  Generate unique digital tickets with QR Codes.
4.  Provide fast QR-based event check-in.
5.  Provide organizers with sales and attendance analytics.
6.  Centralize event, ticket, attendee, and transaction data.

### Secondary Goals

-   Reduce manual administrative work.
-   Reduce duplicate or invalid tickets.
-   Prevent ticket overselling.
-   Maintain historical transaction records.
-   Provide useful business information to organizers.

------------------------------------------------------------------------

## 5. Target Users

### 5.1 Attendee

Users who browse events and purchase tickets.

Examples:

-   Students
-   Seminar participants
-   Workshop participants
-   Concert visitors
-   Sports event participants

### 5.2 Organizer

Users responsible for creating and managing events.

Capabilities include:

-   Creating events
-   Managing ticket types
-   Managing attendees
-   Monitoring sales
-   Managing event staff
-   Viewing reports
-   Monitoring check-in

### 5.3 Event Staff

Staff members assigned to an event.

Primary responsibilities:

-   Scan QR Codes
-   Validate tickets
-   Check in attendees
-   View check-in history

### 5.4 System Administrator

Platform administrator responsible for:

-   User management
-   Organizer management
-   Event moderation
-   Category management
-   Platform monitoring
-   Reports

------------------------------------------------------------------------

## 6. User Roles

  Role        Main Responsibility
  ----------- ---------------------------------
  Admin       Manage and monitor the platform
  Organizer   Create and manage events
  Staff       Perform event check-in
  Attendee    Browse and purchase tickets

------------------------------------------------------------------------

## 7. Product Scope

### Attendee

-   Registration
-   Login
-   Browse events
-   Search events
-   Filter events
-   View event details
-   Select tickets
-   Checkout
-   Payment simulation
-   View orders
-   View e-tickets
-   Display QR Code
-   View ticket history
-   Manage profile

### Organizer

-   Organizer profile
-   Event CRUD
-   Event publishing
-   Ticket management
-   Promo code management
-   Staff management
-   Attendee management
-   Order management
-   Check-in monitoring
-   Sales analytics
-   Revenue reports
-   Attendance reports

### Event Staff

-   Login
-   View assigned events
-   QR scanner
-   Ticket validation
-   Check-in attendee
-   Check-in history

### Admin

-   User management
-   Organizer management
-   Event moderation
-   Event category management
-   Platform monitoring
-   System reports

------------------------------------------------------------------------

## 8. Event Lifecycle

Events follow a controlled lifecycle.

``` text
DRAFT
  |
  v
SUBMITTED
  |
  v
APPROVED
  |
  v
PUBLISHED
  |
  v
ONGOING
  |
  v
COMPLETED
```

Cancellation flow:

``` text
PUBLISHED
    |
    v
CANCELLED
```

### Status Definitions

  Status      Description
  ----------- --------------------------------------
  Draft       Event is being created
  Submitted   Organizer submitted event for review
  Approved    Admin approved event
  Published   Event is publicly available
  Ongoing     Event is currently taking place
  Completed   Event has finished
  Cancelled   Event has been cancelled

------------------------------------------------------------------------

## 9. Ticket Lifecycle

``` text
AVAILABLE
    |
    v
RESERVED
    |
    v
PAID
    |
    v
ISSUED
    |
    v
CHECKED-IN
```

Alternative flows:

``` text
RESERVED
    |
    v
EXPIRED
```

``` text
PAID
    |
    v
REFUND REQUEST
    |
    v
REFUNDED
```

### Ticket Status Definitions

  Status       Description
  ------------ ---------------------------------------------
  Available    Ticket can be purchased
  Reserved     Ticket temporarily reserved during checkout
  Paid         Payment has been completed
  Issued       Digital ticket has been generated
  Checked-in   Ticket has been successfully used
  Expired      Reservation period has expired
  Refunded     Ticket payment has been refunded

------------------------------------------------------------------------

## 10. Event Management

Organizers can create events containing:

### Basic Information

-   Event name
-   Event description
-   Category
-   Event banner
-   Organizer
-   Contact information

### Schedule

-   Start date
-   End date
-   Start time
-   End time

### Location

-   Venue
-   Address
-   City
-   Map coordinates or map URL

### Additional Information

-   Event agenda
-   Speakers
-   Terms and conditions
-   FAQ
-   Event capacity

------------------------------------------------------------------------

## 11. Ticket Management

Organizers can create multiple ticket types for one event.

Example:

``` text
Tech Conference 2026

Early Bird
Rp100.000
Quota: 100

Regular
Rp150.000
Quota: 300

VIP
Rp300.000
Quota: 50
```

Each ticket type contains:

-   Ticket name
-   Description
-   Price
-   Quantity/quota
-   Sales start date
-   Sales end date
-   Maximum purchase quantity
-   Status

------------------------------------------------------------------------

## 12. Promo Code

Organizers can create promotional codes.

Example:

``` text
PROMO: EARLY2026

Discount: 20%
Maximum discount: Rp50.000
Usage limit: 100
Valid until: 20 August 2026
```

### Validation Rules

The system validates:

-   Code existence
-   Active status
-   Expiration date
-   Usage limit
-   Event compatibility
-   Minimum purchase requirement
-   Maximum discount

------------------------------------------------------------------------

## 13. Order and Checkout

### Checkout Flow

``` text
Select Event
      |
      v
Select Ticket
      |
      v
Enter Attendee Information
      |
      v
Apply Promo
      |
      v
Review Order
      |
      v
Payment
      |
      v
Payment Success
      |
      v
Generate Ticket
      |
      v
Generate QR Code
```

### Example Order

``` text
REGULAR TICKET
1 × Rp150.000

Promo
- Rp30.000

Service Fee
Rp5.000

-------------------------
TOTAL
Rp125.000
```

For the initial portfolio version, payment can use a simulated payment
flow rather than a real payment gateway.

------------------------------------------------------------------------

## 14. E-Ticket

After successful payment, the system generates a digital ticket.

Example:

``` text
EVENTFLOW

TECH CONFERENCE 2026

Samuel Erlangga

REGULAR TICKET

29 AUGUST 2026
GRAND CITY SURABAYA

+-------------------+
|                   |
|      QR CODE      |
|                   |
+-------------------+

Ticket ID:
TKT-2026-00142
```

The QR Code must contain a unique secure token rather than exposing
personal information directly.

------------------------------------------------------------------------

## 15. QR Check-in

Event staff use the Ionic application to scan attendee tickets.

### Check-in Flow

``` text
Open Check-in
      |
      v
Open QR Scanner
      |
      v
Scan QR Code
      |
      v
Validate Token
      |
      v
Validate Ticket Status
      |
      v
Validate Event
      |
      v
Check Duplicate Check-in
      |
      v
Check-in Success
```

### Successful Check-in

``` text
VALID TICKET

Samuel Erlangga
Tech Conference 2026
Regular Ticket

CHECK-IN SUCCESS
```

### Invalid Ticket

``` text
INVALID TICKET

Reason:
Ticket has already been used.
```

------------------------------------------------------------------------

## 16. Organizer Dashboard

The organizer dashboard follows a functional dashboard structure
inspired by Eventbrite.

### Main Navigation

``` text
Dashboard
Events
Tickets
Orders
Attendees
Check-in
Reports
Settings
```

### Dashboard Overview

``` text
Good morning, Organizer

Your Events

+----------+ +----------+ +----------+
| Events   | | Tickets  | | Revenue  |
|    12    | |  1,284   | | Rp82.4M  |
+----------+ +----------+ +----------+

Sales Overview

Upcoming Events

Tech Conference 2026
29 Aug 2026
1,284 tickets
```

------------------------------------------------------------------------

## 17. Event Analytics

Organizers can monitor event performance.

### Sales Metrics

-   Total tickets sold
-   Total revenue
-   Sales by ticket type
-   Sales by date
-   Promo code usage
-   Remaining ticket quota

### Attendance Metrics

-   Total registered
-   Total checked-in
-   Total not checked-in
-   Attendance percentage

Example:

``` text
ATTENDANCE

Registered       1,284
Checked-in         921
Not checked-in     363

Attendance Rate
71.73%
```

------------------------------------------------------------------------

## 18. Attendee Application

### Main Navigation

``` text
Home
Explore
My Tickets
Notifications
Profile
```

### Home

``` text
Discover Events

[ Search events... ]

Categories

Music
Sport
Workshop
Technology
Business
Conference

Featured Events

[ Event Card ]

Upcoming Events

[ Event Card ]
[ Event Card ]
```

### Event Card

Each event card should prioritize:

-   Event image
-   Event name
-   Date
-   Location
-   Starting ticket price

------------------------------------------------------------------------

## 19. Event Detail Page

The event detail page should prioritize the event content.

``` text
+----------------------------------+
|                                  |
|          EVENT BANNER            |
|                                  |
+----------------------------------+

Tech Conference 2026

29 August 2026
Grand City Surabaya

----------------------------------

About this event

Event description...

----------------------------------

Schedule

09:00  Registration
10:00  Opening
11:00  Keynote
13:00  Workshop

----------------------------------

Tickets

+-------------------------------+
| Early Bird                    |
| Rp100.000                     |
| 34 tickets left               |
+-------------------------------+

+-------------------------------+
| Regular                       |
| Rp150.000                     |
| 120 tickets left              |
+-------------------------------+

[ GET TICKETS ]
```

------------------------------------------------------------------------

## 20. Organizer Event Creation

Event creation should be divided into logical sections.

### Step 1 --- Basic Information

-   Event name
-   Category
-   Description
-   Banner

### Step 2 --- Date & Location

-   Start/end date
-   Start/end time
-   Venue
-   Address

### Step 3 --- Tickets

-   Ticket types
-   Price
-   Quota
-   Sales period
-   Purchase limit

### Step 4 --- Additional Information

-   Agenda
-   Speakers
-   FAQ
-   Terms and conditions

### Step 5 --- Review

Organizer reviews all information before submitting.

------------------------------------------------------------------------

## 21. Mobile Staff Check-in UI

The staff application should prioritize speed.

``` text
EVENTFLOW

CHECK-IN

+----------------------+
|                      |
|                      |
|     SCAN QR CODE     |
|                      |
|          QR          |
|                      |
+----------------------+

Scan attendee ticket
```

After scanning:

``` text
VALID TICKET

Samuel Erlangga
Regular Ticket

Tech Conference 2026

[ CONFIRM CHECK-IN ]
```

The scanner interface should avoid unnecessary animations and
interactions.

------------------------------------------------------------------------

## 22. Responsive Design

### Desktop

Primary users:

-   Admin
-   Organizer

Primary activities:

-   Event management
-   Ticket management
-   Reporting
-   Analytics

### Tablet

Primary users:

-   Organizer
-   Event staff

Primary activities:

-   Event management
-   Monitoring
-   Check-in

### Mobile

Primary users:

-   Attendee
-   Event staff

Primary activities:

-   Event discovery
-   Ticket purchase
-   E-ticket viewing
-   QR check-in

------------------------------------------------------------------------

## 23. Functional Requirement Categories

The full functional requirement document will expand these categories
into approximately 70--100 requirements.

### Authentication

-   User registration
-   User login
-   Logout
-   Password reset
-   Role management
-   Profile management

### Event

-   Create event
-   Edit event
-   Delete event
-   Submit event
-   Approve event
-   Publish event
-   Cancel event
-   Search event
-   Filter event
-   View event detail

### Ticket

-   Create ticket type
-   Edit ticket type
-   Delete ticket type
-   Set ticket quota
-   Set sales period
-   Set purchase limit
-   Monitor sold tickets
-   Mark ticket sold out

### Order

-   Create order
-   Reserve ticket
-   Expire reservation
-   Apply promo code
-   Calculate total
-   Process payment
-   Verify payment
-   View order history
-   Cancel order

### E-ticket

-   Generate e-ticket
-   Generate QR token
-   Display QR Code
-   Validate QR token
-   View ticket
-   View ticket history

### Check-in

-   Scan QR Code
-   Validate ticket
-   Validate event
-   Prevent duplicate check-in
-   Record check-in
-   View check-in history

### Reporting

-   Sales report
-   Revenue report
-   Attendance report
-   Ticket performance report
-   Promo performance report
-   Export report

------------------------------------------------------------------------

## 24. Non-Functional Requirements

### Performance

-   API responses should normally complete within an acceptable response
    time under normal load.
-   Event lists should support pagination.
-   Dashboard queries should avoid unnecessary full-table scans.
-   QR validation should be optimized for fast check-in.

### Security

-   Passwords must be securely hashed.
-   Authentication uses Laravel Sanctum.
-   Role-based authorization must be enforced server-side.
-   API endpoints must validate incoming requests.
-   SQL injection must be prevented through Eloquent/query binding.
-   QR tokens must not expose sensitive user information.
-   Rate limiting should be applied to authentication and QR validation
    endpoints.
-   Critical transactions must use database transactions.
-   Sensitive actions should be recorded in audit logs.

### Availability

-   The application should gracefully handle temporary API failures.
-   The mobile application should display clear error states.
-   Check-in errors must not cause ambiguous ticket states.

### Usability

-   Primary actions should be easy to identify.
-   Ticket price and availability must be clearly visible.
-   Check-in should require minimal interaction.
-   Forms should provide meaningful validation messages.

### Maintainability

-   Backend should follow Laravel conventions.
-   API endpoints should use consistent naming.
-   Business logic should not be duplicated across controllers.
-   Database relationships should be clearly defined.
-   Frontend components should be reusable.

------------------------------------------------------------------------

## 25. Technology Stack

### Frontend

**Ionic + Angular**

Responsibilities:

-   Attendee mobile interface
-   Staff check-in application
-   Organizer responsive interface
-   API integration
-   QR scanner

### Backend

**Laravel 12**

Responsibilities:

-   REST API
-   Authentication
-   Authorization
-   Business logic
-   Order processing
-   Ticket management
-   QR validation
-   Reporting

### Database

**MySQL**

Responsibilities:

-   User data
-   Event data
-   Ticket data
-   Order data
-   Payment data
-   Check-in data
-   Reporting data

### Authentication

**Laravel Sanctum**

### API

**RESTful API**

### QR Code

QR Code generation and scanning integrated with the Ionic application.

------------------------------------------------------------------------

## 26. High-Level Architecture

``` text
+----------------------------+
|       Ionic Frontend       |
|                            |
| Attendee | Organizer       |
| Staff    | Admin           |
+-------------+--------------+
              |
              | HTTPS / REST API
              v
+----------------------------+
|        Laravel 12          |
|                            |
| Authentication             |
| Event Management            |
| Ticket Management           |
| Order Management            |
| Payment Simulation          |
| QR Validation               |
| Check-in                    |
| Reporting                   |
+-------------+--------------+
              |
              | Eloquent ORM
              v
+----------------------------+
|           MySQL            |
+----------------------------+
```

------------------------------------------------------------------------

## 27. Security Requirements

The system must implement:

1.  Password hashing.
2.  Laravel Sanctum authentication.
3.  Role-based access control.
4.  Server-side authorization.
5.  Request validation.
6.  Rate limiting.
7.  CSRF protection where applicable.
8.  SQL injection prevention.
9.  Secure QR tokens.
10. Database transaction integrity.
11. Audit trail for important actions.
12. Secure handling of payment and order states.

------------------------------------------------------------------------

## 28. Portfolio Differentiators

EventFlow should not be presented as a basic CRUD ticketing application.

### 28.1 Event Lifecycle

``` text
Draft
  ↓
Submitted
  ↓
Approved
  ↓
Published
  ↓
Ongoing
  ↓
Completed
```

### 28.2 Ticket Inventory

Supports:

-   Quota
-   Reservation
-   Expiration
-   Purchase limits
-   Sold-out state

### 28.3 QR E-ticket

Each ticket receives a unique secure QR token.

### 28.4 Mobile Check-in

Event staff can use Ionic to scan and validate tickets.

### 28.5 Sales Analytics

Organizers can monitor ticket sales, revenue, and attendance.

### 28.6 Promo Engine

Promo codes include validation and usage rules.

### 28.7 Role-based System

``` text
Admin
Organizer
Staff
Attendee
```

### 28.8 Transaction and Audit History

Important order, payment, refund, and check-in actions are recorded.

------------------------------------------------------------------------

## 29. Suggested Core Database Entities

The detailed database design will be developed separately, but the
initial entity set includes:

``` text
users
roles
organizers
staff
event_categories
events
event_speakers
event_schedules
venues
ticket_types
ticket_inventory
promo_codes
promo_usages
orders
order_items
payments
tickets
check_ins
refunds
notifications
audit_logs
```

The final database design may be adjusted during normalization and API
design.

------------------------------------------------------------------------

## 30. Suggested Project Phases

### Phase 1 --- Foundation

-   Project setup
-   Database setup
-   Authentication
-   User roles
-   API structure
-   Base Ionic layout

### Phase 2 --- Event Management

-   Event CRUD
-   Category
-   Venue
-   Event schedule
-   Event lifecycle

### Phase 3 --- Ticketing

-   Ticket types
-   Quota
-   Sales period
-   Ticket inventory
-   Promo codes

### Phase 4 --- Order

-   Cart/checkout
-   Order
-   Payment simulation
-   Order status
-   Transaction history

### Phase 5 --- E-ticket

-   Ticket generation
-   QR Code
-   Ticket detail
-   Ticket history

### Phase 6 --- Check-in

-   Staff assignment
-   QR scanner
-   Ticket validation
-   Check-in
-   Duplicate prevention

### Phase 7 --- Dashboard & Reports

-   Organizer dashboard
-   Sales analytics
-   Revenue
-   Attendance
-   Reports

### Phase 8 --- Security & Deployment

-   Authorization review
-   API security
-   Validation
-   Rate limiting
-   Audit logs
-   Production deployment

------------------------------------------------------------------------

## 31. MVP Scope

The minimum viable portfolio version should include:

-   Authentication
-   Role-based access
-   Event CRUD
-   Event publishing
-   Ticket type management
-   Ticket quota
-   Order creation
-   Payment simulation
-   E-ticket
-   QR Code
-   QR check-in
-   Organizer dashboard
-   Sales report
-   Attendance report

------------------------------------------------------------------------

## 32. Future Enhancements

Potential Phase 2 features:

-   Real payment gateway
-   Email ticket delivery
-   Push notifications
-   Seat selection
-   Waitlist
-   Recurring events
-   Multiple organizers
-   Advanced analytics
-   Event recommendations
-   Social sharing
-   Offline check-in queue
-   Automatic refund processing
-   Coupon campaigns
-   Multi-language support

------------------------------------------------------------------------

## 33. Product Success Criteria

The portfolio project is considered successful when:

1.  An attendee can register and log in.
2.  An organizer can create an event.
3.  An organizer can configure ticket types.
4.  An organizer can publish an event.
5.  An attendee can purchase a ticket.
6.  The system prevents ticket overselling.
7.  A unique e-ticket is generated after successful payment.
8.  The ticket contains a secure QR Code.
9.  Event staff can scan the QR Code using Ionic.
10. The system prevents duplicate check-in.
11. Organizer can see ticket sales.
12. Organizer can see attendance statistics.
13. Role-based access is enforced.
14. Important transactions are recorded.
15. The application works responsively across mobile, tablet, and
    desktop layouts.

------------------------------------------------------------------------

## 34. Portfolio Positioning

### Project Name

**EventFlow --- Event Management & Ticketing Platform**

### Short Description

> A full-stack event management and ticketing platform built with Ionic,
> Laravel REST API, and MySQL. The system supports event creation,
> ticket inventory, order management, QR-based e-ticketing, mobile
> check-in, promo codes, attendee management, and organizer analytics.

### Portfolio Skills Demonstrated

-   Laravel 12
-   Ionic
-   Angular
-   MySQL
-   REST API
-   Authentication
-   Authorization
-   Role-based access control
-   Relational database design
-   Transaction processing
-   QR Code
-   Mobile development
-   Dashboard design
-   Reporting
-   Business process analysis

------------------------------------------------------------------------

## 35. Design Reference

The primary visual and interaction reference is **Eventbrite**,
especially for:

-   Organizer dashboard structure
-   Event management workflow
-   Ticket management
-   Attendee management
-   Reporting
-   Clear information hierarchy

Secondary references may include:

-   Luma --- event discovery and event page simplicity
-   Humanitix --- ticketing and checkout
-   DICE --- mobile event discovery and ticketing

The project should take inspiration from these products without directly
copying their branding, assets, or proprietary interface.

------------------------------------------------------------------------

## 36. Recommended Product Structure

``` text
EventFlow
|
+-- Attendee App
|   +-- Home
|   +-- Explore
|   +-- Event Detail
|   +-- Checkout
|   +-- My Tickets
|   +-- QR Ticket
|   +-- Notifications
|   +-- Profile
|
+-- Organizer
|   +-- Dashboard
|   +-- Events
|   +-- Event Builder
|   +-- Tickets
|   +-- Orders
|   +-- Attendees
|   +-- Check-in
|   +-- Reports
|   +-- Settings
|
+-- Staff
|   +-- Assigned Events
|   +-- QR Scanner
|   +-- Check-in Result
|   +-- Check-in History
|
+-- Admin
    +-- Users
    +-- Organizers
    +-- Events
    +-- Categories
    +-- Reports
    +-- System Monitoring
```

------------------------------------------------------------------------

## 37. Final Product Vision

EventFlow is intended to demonstrate that a portfolio project can go
beyond basic CRUD operations.

The system combines:

``` text
Event Management
        +
Ticket Inventory
        +
Order & Payment
        +
QR E-ticket
        +
Mobile Check-in
        +
Analytics
        +
Role-based Workflow
```

This makes EventFlow a strong second portfolio project alongside
StockFlow, with StockFlow demonstrating **inventory/warehouse business
processes** and EventFlow demonstrating **event, ticketing, transaction,
and mobile operational workflows**.
