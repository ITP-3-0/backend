# Ticketing System Documentation

## Overview
This ticketing system provides a platform for managing support tickets with multiple user roles and automated notifications.

## User Roles
1. Client
   - Can create tickets
   - Can view their own tickets
   - Can respond to their tickets

2. Level 1 Agent (L1)
   - Can view all tickets
   - Can respond to tickets
   - Can escalate tickets to L2
   - Receives notifications for new tickets

3. Level 2 Agent (L2)
   - Can view all tickets
   - Can respond to tickets
   - Receives notifications for escalated tickets

4. System Admin
   - Full system access
   - Can manage users
   - Can view all tickets
   - Can perform all actions

## Key Features

### Ticket Management
- Create new tickets
- Add responses
- Escalate tickets
- Filter tickets by status, priority, and category
- Automatic assignment to L1 agents

### Notification System
- Email notifications
- In-app notifications
- Notification triggers:
  - New ticket creation
  - New responses
  - Ticket escalation

### User Management
- User registration
- Role assignment
- Password management

## API Endpoints

### Tickets
- POST /api/tickets - Create new ticket
- GET /api/tickets - Get tickets list
- POST /api/tickets/:ticketId/respond - Add response
- POST /api/tickets/:ticketId/escalate - Escalate ticket

### Users
- POST /api/users - Create user
- GET /api/users - Get users list
- GET /api/users/:id - Get user details
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Forum Endpoints
- GET /api/forum - Get all forum posts (with filtering and pagination)
- GET /api/forum/:postId - Get single forum post with comments
- POST /api/forum - Create new forum post
- POST /api/forum/:postId/comments - Add comment to post
- POST /api/forum/:postId/like - Toggle like on post
- POST /api/forum/:postId/sticky - Toggle sticky status (admin only)
- POST /api/forum/:postId/lock - Toggle lock status (admin only)

#### Forum Query Parameters
- category: Filter posts by category
- tag: Filter posts by tag
- page: Page number for pagination
- limit: Number of posts per page

#### Forum Categories
- general
- technical
- feature-request
- bug-report
- announcement

### Notification Endpoints
- GET /api/notifications - Get user's notifications (with filtering)
- POST /api/notifications - Create new notification (admin only)
- POST /api/notifications/:notificationId/read - Mark notification as read
- POST /api/notifications/read-all - Mark all notifications as read
- DELETE /api/notifications/:notificationId - Delete notification (admin only)
- GET /api/notifications/stats - Get notification statistics (admin only)

#### Notification Query Parameters
- page: Page number for pagination
- limit: Number of notifications per page
- type: Filter by notification type (ticket, forum, system, alert)
- read: Filter by read status (true/false)

#### Notification Types
- ticket: Ticket-related notifications
- forum: Forum-related notifications
- system: System notifications
- alert: Important alerts

#### Notification Priorities
- low
- medium
- high
- urgent

## Setup Instructions
1. Install dependencies: `npm install`