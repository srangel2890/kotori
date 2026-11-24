# 🐦 Kotori

Kotori is a lightweight, stateless notification service built
with Node.js and Express.

It provides a centralized REST API that allows external
applications to send notifications without implementing
their own delivery mechanisms.

The service currently supports email notifications and is
designed to support additional notification channels.

## Features

- REST API for notification delivery.
- Email delivery through SMTP using Nodemailer.
- Notification parameter validation.
- Error handling.
- Reusable SMTP transporter.
- Extensible notification provider architecture.
- Stateless processing with no database dependencies.

## Tech Stack

- Node.js
- Express
- Nodemailer
- Gmail SMTP
- dotenv
- Nodemon

## Project Structure

```text
kotori/
├── src/
│   ├── controllers/
│   │   └── notificationController.js
│   ├── providers/
│   │   └── emailProvider.js
│   ├── routes/
│   │   └── notificationRoutes.js
│   ├── services/
│   │   └── notificationService.js
│   └── app.js
├── .gitignore
├── package.json
└── README.md
```

## Architecture

Kotori separates HTTP request handling, notification
processing, and delivery mechanisms into independent layers.

- **Controllers:** Handle incoming HTTP requests and responses.
- **Services:** Select and execute the appropriate notification
  provider.
- **Providers:** Implement channel-specific delivery logic.
- **Routes:** Define the available API endpoints.

### Design Patterns

#### Strategy Pattern

Notification providers implement a common delivery contract.
The notification service selects the appropriate provider
based on the requested notification channel.

This approach allows new notification channels to be added
without modifying the core notification processing logic.

#### Lazy Initialization

The SMTP transporter is initialized only when the first
email notification is requested and is reused for subsequent
requests within the same process.

## Getting Started

### Installation

Install the project dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

Gmail SMTP requires an application-specific password for
this authentication method.

Never commit your credentials to version control.

### Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Reference

### Health Check

```http
GET /health
```

### Send a Notification

```http
POST /notifications
Content-Type: application/json
```

Request body:

```json
{
  "channel": "email",
  "recipient": "user@example.com",
  "subject": "Welcome",
  "message": "Welcome to our application!"
}
```

Successful response:

```json
{
  "status": "success",
  "channel": "email"
}
```

Validation error example:

```json
{
  "error": "Recipient is missing or is not a valid email."
}
```

## TODO

- [x] Implement EmailProvider.
- [x] Implement notification parameter validation.
- [x] Implement reusable SMTP transporter.
- [ ] Implement SmsProvider.
- [ ] Implement PushProvider.
- [ ] Add automated unit and integration tests.

## About the Name

Kotori (小鳥) means "little bird" in Japanese, representing
a small messenger that delivers notifications between
applications.
