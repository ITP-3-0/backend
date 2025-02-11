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

## Setup Instructions
1. Install dependencies: `npm install`
2. Set up environment variables in .env file
3. Start the server: `npm start`

## Environment Variables 