# StudentAI — AI Learning Assistant

StudentAI is a full-stack learning application built with React and Spring Boot.
It brings AI tutoring, programming practice, quizzes, document tools, and learning
progress into one dashboard. Users can sign in with a password or an email OTP.

## Features

- **Authentication:** account registration, password login, email OTP login, JWT-protected routes, and logout.
- **AI Tutor:** conversational learning assistance through the Groq API, with saved chat history.
- **Programming and DSA:** programming tutor pages, algorithm browsing, and practice workflows.
- **Code Review:** code submission, review results, and review history.
- **Quizzes:** quiz browsing, attempt submission, and result tracking.
- **Progress:** learning dashboards and charts.
- **Profile:** account profile page.
- **Admin:** user management and analytics pages for administrator accounts.
- **Document tools:** store study-document content and query it through the document interface. The current backend response is a placeholder; full retrieval-augmented generation is future work.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 18, TypeScript, React Router, Redux Toolkit, TanStack Query |
| UI | Tailwind CSS, Lucide React, Recharts |
| HTTP client | Axios |
| Backend | Java 17, Spring Boot 3.2.3, Spring Web, Spring Data JPA |
| Authentication | Spring Security, BCrypt, JWT |
| Database | PostgreSQL; H2 available for local development |
| Email | Spring Mail and SMTP |
| AI integration | Groq chat-completions API |
| Build tools | Maven, npm, Create React App |
| API documentation | Springdoc OpenAPI / Swagger UI |

## Project structure

| Path | Purpose |
| --- | --- |
| `backend/pom.xml` | Backend dependencies and build configuration |
| `backend/src/main/java/com/studentai/config/` | Security and JWT configuration |
| `backend/src/main/java/com/studentai/controller/` | REST endpoints |
| `backend/src/main/java/com/studentai/service/` | Application logic and integrations |
| `backend/src/main/java/com/studentai/model/` | Database entities |
| `backend/src/main/java/com/studentai/repository/` | Database access |
| `backend/src/main/resources/application.yml` | Backend configuration |
| `backend/src/test/` | Backend tests |
| `frontend/src/pages/` | Application pages |
| `frontend/src/components/` | Reusable UI, navigation, and authentication components |
| `frontend/src/services/` | API clients |
| `frontend/src/store/` | Redux state |
| `frontend/public/` | Public assets and HTML entry point |

## Prerequisites

Install Java 17 or newer, Maven, Node.js with npm, PostgreSQL, and VS Code.
You also need SMTP credentials for sending login codes and a Groq API key for AI chat.

Check your tools in a terminal:

```powershell
java -version
mvn -version
node -v
npm -v
```

## Run locally in VS Code

Extract the project ZIP, then open the `StudentAI` folder in VS Code.
Run the backend and frontend in separate terminals.

### 1. Create the database

In pgAdmin's Query Tool, run this once if the database does not exist:

```sql
CREATE DATABASE studentai;
```

Start PostgreSQL. The supplied backend defaults to port **5433**; use **5432**
in your database URL if that is the port configured on your computer.

### 2. Configure and start the backend

Open a PowerShell terminal in VS Code:

```powershell
cd backend
$env:DB_URL="jdbc:postgresql://localhost:5433/studentai"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="YOUR_DATABASE_PASSWORD"

# Generate a development JWT secret.
$bytes = New-Object byte[] 64
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
$rng.Dispose()

$env:SMTP_HOST="smtp.gmail.com"
$env:SMTP_PORT="587"
$env:SMTP_USERNAME="YOUR_EMAIL@gmail.com"
$env:SMTP_PASSWORD="YOUR_GOOGLE_APP_PASSWORD"
$env:SMTP_FROM="YOUR_EMAIL@gmail.com"
$env:GROQ_API_KEY="YOUR_GROQ_API_KEY"
```

Replace all placeholders. For Gmail, use an App Password from your Google
Account, with 2-Step Verification enabled. Do not use your normal Gmail password.
For another provider, use its SMTP host, credentials, and verified sender address.

In `backend/src/main/resources/application.yml`, use this Groq block for the
model configuration selected for this project:

```yaml
groq:
  api-key: ${GROQ_API_KEY:}
  model: openai/gpt-oss-120b
  base-url: https://api.groq.com/openai/v1
```

Model availability depends on your Groq account. If the configured model is
unavailable, choose a model available to your account and update `groq.model`.

Start the backend in the **same terminal** where you set the variables:

```powershell
mvn spring-boot:run
```

Backend URL: **http://localhost:8080**.
The current Hibernate `ddl-auto: update` setting creates or updates entity tables
for local development. PowerShell environment settings apply to the current
terminal; configure them again in a new terminal. Keep a stable JWT secret when
you want existing tokens to remain valid across restarts.

### 3. Start the frontend

Open another terminal at the project root:

```powershell
cd frontend
npm ci
npm start
```

If your terminal starts inside `backend`, run `cd ../frontend` instead.

Frontend URL: **http://localhost:3000**.

To change the backend address, create `frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:8080
```

Restart the frontend after changing this file. Backend secrets must never be
placed in frontend environment files.

## Email OTP login

1. Register an account using an email address you can access.
2. Log out and select **Email OTP** on the login page.
3. Enter the registered email and select **Send login code**.
4. Check your inbox and spam folder.
5. Enter the six-digit code and select **Verify code and sign in**.

Codes expire after five minutes. Resending waits 60 seconds and invalidates the
previous code. Five incorrect attempts lock the challenge until it expires.
Successful verification consumes the code and returns the same JWT response as
password login. Codes are stored as BCrypt hashes and are not returned by the API.
Only registered, enabled accounts receive codes; the send message uses generic
wording to avoid revealing whether an email is registered.

The **Logout** button is in the top navigation. It clears the browser's saved
login and application query cache, then returns to the login page. Include the
updated `frontend/src/components/Navbar/Navbar.tsx` supplied with the logout change.
Logout clears the local token; it does not revoke copies of an issued JWT on the server.

## Main API routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register an account |
| POST | `/api/auth/login` | Password login |
| POST | `/api/auth/otp/send` | Send an email login code |
| POST | `/api/auth/otp/verify` | Verify a code and issue a JWT |
| GET | `/api/users/me` | Current account details |
| POST | `/api/chat` | Send an AI tutor message |
| GET | `/api/chat/history` | Chat history |
| GET | `/api/dsa/algorithms` | Browse algorithms |
| POST | `/code-review/review` | Submit code for review |
| GET | `/api/quiz` | Browse quizzes |
| POST | `/api/quiz/submit` | Submit a quiz attempt |
| POST | `/api/rag/upload` | Store document content |
| POST | `/api/rag/query` | Query the document interface |
| GET | `/admin/analytics` | Administrator analytics |

Protected requests use `Authorization: Bearer <token>`.
API documentation is available at **http://localhost:8080/swagger-ui.html**
when the backend is running.

## Build and validation

```powershell
# Run inside backend
mvn test
mvn clean package

# Run inside frontend
npx tsc --noEmit
npm run build
```

Frontend TypeScript checking and production build passed during the OTP update.
The build reported existing lint warnings in other pages. Backend OTP lifecycle
tests are included, but were not executed in the editing environment because
Maven and a Java compiler were unavailable. SMTP delivery requires your credentials;
email OTP was subsequently reported working during local setup.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Port 8080 already in use | Stop the previous backend with Ctrl+C, then restart. |
| Registration fails | Inspect the browser Network tab's register response and backend error; check duplicate username/email and database configuration. |
| OTP does not arrive | Confirm registration succeeded, check spam, verify SMTP settings, and restart in the configured terminal. |
| Groq returns 401 | Check `GROQ_API_KEY` in the terminal running the backend. |
| Groq returns model_not_found | Update `groq.model` to an accessible model, save, and restart the backend. |
| Logout button missing | Replace the active `components/Navbar/Navbar.tsx`, save, and refresh. |
| Database connection fails | Check PostgreSQL service, database name, port, username, and password. |

## Current limitations

Some learning pages include sample fallback data. The document-query backend
currently returns a placeholder answer rather than implementing vector search.
Several API handlers accept client-supplied user IDs; identity and ownership
checks should be completed before using this as a public multi-user service.
The permissive CORS configuration and schema auto-update setting are development
choices that need review for deployment.

Keep credentials out of source control. Use your own environment settings and
rotate any credentials that were previously included in shared configuration.

## Future improvements

- Implement document parsing, embeddings, and retrieval-grounded answers.
- Derive user identity from the authenticated principal throughout the API.
- Add broader integration tests and frontend authentication tests.
- Add server-side token revocation or managed sessions.
- Replace sample dashboard data with validated live data throughout the app.
