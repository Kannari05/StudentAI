# StudentAI email OTP login

This is your React frontend and Spring Boot backend with email OTP login added.
Existing password login and registration are retained. Register an account first,
then use the Email OTP tab with the account's email address.

## Windows setup

1. Install Java 17 or newer, Maven, Node.js and PostgreSQL.
2. Create the PostgreSQL database `studentai`.
3. Open a PowerShell terminal inside `backend` and configure:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5433/studentai"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="YOUR_DATABASE_PASSWORD"
$env:JWT_SECRET="YOUR_RANDOM_SECRET_OF_AT_LEAST_64_CHARACTERS"
$env:SMTP_HOST="YOUR_SMTP_HOST"
$env:SMTP_PORT="587"
$env:SMTP_USERNAME="YOUR_EMAIL_LOGIN"
$env:SMTP_PASSWORD="YOUR_SMTP_PASSWORD"
$env:SMTP_FROM="YOUR_VERIFIED_SENDER_EMAIL"
$env:GROQ_API_KEY="YOUR_GROQ_KEY"
mvn test
mvn spring-boot:run
```

Use SMTP credentials from your email provider. For providers with app passwords,
use an app password rather than your normal account password. Port 587 uses
STARTTLS. Never put real credentials into files you share. Existing credentials
found in the uploaded configuration were removed from this copy; rotate them.
Spring Boot reads these environment variables directly; it does not automatically
load a `.env` file. Set them in the same terminal used to start the backend.
Hibernate's existing `ddl-auto: update` setting creates the OTP table.

4. Open a second PowerShell terminal inside `frontend`:

```powershell
npm ci
npm start
```

The frontend opens at http://localhost:3000 and uses http://localhost:8080.
For a different backend URL, create `frontend/.env.local` with
`REACT_APP_API_URL=http://YOUR_BACKEND_HOST:8080` and restart the frontend.

## Try the flow

1. Register with an email you can receive messages at.
2. Log out and open Login, then select Email OTP.
3. Enter that email and choose Send login code.
4. Enter the six-digit email code and choose Verify code and sign in.
5. You should reach the dashboard with the existing JWT authentication.

The code expires after 5 minutes. Resend waits 60 seconds and invalidates the old
code. Five incorrect attempts lock the challenge until its expiry; resending
does not reset that lock. A successfully used code cannot be used again.
Unknown and disabled accounts do not receive codes. The send response deliberately
uses the same wording for all accounts. Codes are hashed in the database and are
never printed in logs or returned by the API.

## Changed files

- backend/pom.xml: Spring Mail dependency.
- backend/src/main/resources/application.yml: SMTP and environment settings.
- backend/src/main/java/com/studentai/service/OtpService.java: complete email OTP lifecycle.
- backend/src/main/java/com/studentai/controller/OtpController.java: public send and verify endpoints, JWT response.
- backend/src/main/java/com/studentai/repository/UserRepository.java: locked account lookup, case-insensitive email matching.
- backend/src/main/java/com/studentai/repository/OtpVerificationRepository.java: latest challenge lookup.
- backend/src/main/java/com/studentai/dto/request/OtpRequest.java and OtpVerifyRequest.java: email validation.
- frontend/src/components/auth/OtpLogin.tsx: send, verify, resend and change-email controls.
- frontend/src/pages/Login.tsx: Email OTP and Password tabs.
- frontend/src/services/authService.ts: OTP API calls.
- backend/src/test/java/com/studentai/service/OtpServiceTest.java: lifecycle tests.

## API

POST /api/auth/otp/send: {"identifier":"student@example.com"}
POST /api/auth/otp/verify: {"identifier":"student@example.com","otp":"012345"}

The verify response is the same AuthResponse used by password login. The old
/api/otp endpoints have been replaced. Authentication uses your existing JWT
storage; logout clears the browser's stored token as before.

## Validation performed

Frontend TypeScript checking and the production build passed. The build reported
existing lint warnings in unrelated pages. Backend unit tests are included, but could not run in the editing
environment because Maven and a Java compiler were unavailable. Email delivery
must be tested after you configure real SMTP credentials. No real emails were
sent during editing.
