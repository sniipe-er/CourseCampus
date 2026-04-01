# CourseCampus

CourseCampus is a learning platform built with Django, Django REST Framework, JWT authentication, and a React frontend.

The project supports two main roles:
- Students can browse courses, enroll, view their learning space, and access lessons for courses they joined.
- Instructors can create, update, and delete their own courses and add lessons and assignments.

The repository now contains both:
- a Django backend API
- a React frontend in `coursecampus-frontend/`

## Main features

### Authentication and users
- Custom user model with email-based login
- JWT authentication with SimpleJWT and Djoser
- Roles: `student` and `instructor`
- Profile endpoint for the logged-in user

### Courses and lessons
- Public course listing
- Instructor-only course creation and management
- Instructor-only access to manage their own courses
- Lesson access for enrolled students and course owners

### Enrollments
- Students can enroll in available courses
- Duplicate enrollments are blocked
- Student dashboard can show enrolled courses and suggestions

### Assignments and certificates
- Instructors can create assignments for lessons
- Students can submit assignments
- Student certificate endpoint is available

### Frontend
- React + Vite single-page application
- Role-aware courses page
- Student dashboard and instructor dashboard
- Login, register, profile, and courses pages
- Light and dark mode UI

## Tech stack

| Area | Technology |
| --- | --- |
| Backend | Django 5 |
| API | Django REST Framework |
| Auth | SimpleJWT, Djoser |
| Frontend | React 19, Vite, React Router |
| HTTP client | Axios |
| Database | SQLite for development |

## Project structure

```text
CourseCampus/
|-- CourseCampus/              Django project settings and URLs
|-- users/                     Custom user model and auth serializers/views
|-- courses/                   Courses and lessons
|-- enrollments/               Enrollment flow
|-- assignments/               Assignments and submissions
|-- certificates/              Certificates
|-- coursecampus-frontend/     React frontend
|-- manage.py
|-- requirements.txt
`-- README.md
```

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/sniipe-er/CourseCampus.git
cd CourseCampus
```

### 2. Create and activate a virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

Linux or macOS:

```bash
python -m venv venv
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create an admin user

```bash
python manage.py createsuperuser
```

### 6. Start the Django backend

```bash
python manage.py runserver
```

Backend base URL:

```text
http://127.0.0.1:8000/api/
```

Admin panel:

```text
http://127.0.0.1:8000/admin/
```

### 7. Start the React frontend

In a new terminal:

```bash
cd coursecampus-frontend
npm install
```

Create a `.env` file in `coursecampus-frontend/` with:

```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

Then run:

```bash
npm run dev
```

Frontend dev URL:

```text
http://127.0.0.1:5173/
```

## Frontend build for Django

The Django project is already configured to serve the built frontend from `coursecampus-frontend/dist`.

To build the frontend:

```bash
cd coursecampus-frontend
npm run build
```

After that, Django can serve:
- frontend pages at `/`
- API routes at `/api/...`

This is the setup used for single-domain deployment.

## API overview

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/users/` | Register |
| POST | `/api/auth/jwt/create/` | Login |
| POST | `/api/auth/jwt/refresh/` | Refresh access token |
| GET | `/api/auth/users/me/` | Current user |

### Courses

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/courses/` | Public |
| GET | `/api/courses/me/` | Instructor |
| POST | `/api/courses/me/` | Instructor |
| GET | `/api/courses/<id>/` | Instructor owner |
| PUT | `/api/courses/<id>/` | Instructor owner |
| DELETE | `/api/courses/<id>/` | Instructor owner |

### Lessons

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/courses/<course_id>/lessons/` | Enrolled student or instructor |
| POST | `/api/courses/<course_id>/lessons/` | Instructor |

### Enrollments

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | `/api/enrollments/enroll/<course_id>/` | Student |
| GET | `/api/enrollments/my/` | Student |

### Assignments

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/assignments/lesson/<lesson_id>/assignments/` | Instructor |
| POST | `/api/assignments/lesson/<lesson_id>/assignments/` | Instructor |
| POST | `/api/assignments/submit/<assignment_id>/` | Student |

### Certificates

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/certificates/me/` | Student |

## Deployment notes

- The frontend API client reads `VITE_API_URL` first.
- If `VITE_API_URL` is not set, the frontend falls back to:

```text
https://sniper.pythonanywhere.com/api
```

- For local development, set `VITE_API_URL` explicitly so the frontend talks to your local Django server.
- For single-domain deployment, build the frontend and let Django serve `coursecampus-frontend/dist`.

## Current status

CourseCampus is no longer backend-only. The repository now includes:
- a working REST API
- a React frontend
- instructor course management
- student enrollment flow
- dashboard and profile pages

## Repository

```text
https://github.com/sniipe-er/CourseCampus
```
