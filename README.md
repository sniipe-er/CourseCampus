📘 **CourseCampus – LMS Backend API**

A fully functional **back-end Learning Management System (LMS)** built using **Django**, **Django REST Framework**, and **JWT Authentication**.

CourseCampus is an API-only backend that allows **instructors** to create and manage courses and lessons, **students** to enroll and access content, and **admins** to manage the platform through Django Admin.  
The project focuses on backend architecture, security, role-based permissions, and clean RESTful design.

---

🚀 **Features**

👤 **User Management**
- Custom User model
- JWT authentication (login & refresh)
- User roles: **Instructor** and **Student**
- Role-based access control
- Secure profile access

📚 **Courses & Lessons**
- Instructors create, update, and delete their own courses
- Lessons added to courses by instructors
- Public course listing
- Students can view lessons only if enrolled

🎓 **Enrollments**
- Students enroll in courses
- Prevents duplicate enrollments
- Enrollment-based access to lessons

🛡 **Permissions & Security**
- Instructor-only course & lesson management
- Student-only enrollment
- JWT-protected endpoints
- Django Admin for superusers

---

📂 **Project Structure**

CourseCampus/
│
├── users/ # Custom user model & authentication
├── courses/ # Courses & lessons logic
├── enrollments/ # Enrollment system
├── assignments/ # Assignments (future expansion)
├── certificates/ # Certificates (future expansion)
├── CourseCampus/ # Project settings & URLs
├── db.sqlite3 # SQLite database (development)
├── manage.py
└── README.md

---

🧩 **Tech Stack**

| Component | Technology |
|---------|-----------|
| Backend | Django 5 |
| API | Django REST Framework |
| Authentication | SimpleJWT + Djoser |
| Database | SQLite (development) |
| Tools | Postman, Git |

---

🏗 **Setup Instructions**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sniipe-er/CourseCampus.git
cd CourseCampus
2️⃣ Create virtual environment & install dependencies
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows

pip install django djangorestframework djoser djangorestframework-simplejwt

3️⃣ Run migrations
python manage.py makemigrations
python manage.py migrate

4️⃣ Create superuser (Admin)
python manage.py createsuperuser


Admin panel:

http://127.0.0.1:8000/admin/

5️⃣ Start development server
python manage.py runserver


API base URL:

http://127.0.0.1:8000/api/


🔑 Authentication Endpoints

Method	Endpoint	Description
POST	/api/auth/users/	Register
POST	/api/auth/jwt/create/	Login
POST	/api/auth/jwt/refresh/	Refresh token
GET	/api/auth/users/me/	Current user

📚 Courses Endpoints

Method	Endpoint	Access
GET	/api/courses/	Public
GET	/api/courses/me/	Instructor
POST	/api/courses/me/	Instructor
GET / PUT / DELETE	/api/courses/<id>/	Instructor (owner)

📖 Lessons Endpoints

Method	Endpoint	Access
GET	/api/courses/<course_id>/lessons/	Enrolled students / Instructor
POST	/api/courses/<course_id>/lessons/	Instructor only

📝 Enrollments Endpoints

Method	Endpoint	Description
POST	/api/enrollments/enroll/<course_id>/	Enroll in course
GET	/api/enrollments/my/	My enrollments

🧪 API Testing

Login and get access token

Add header to requests:

Authorization: Bearer <ACCESS_TOKEN>


Test instructor & student permissions using Postman

🎓 Academic Context

CourseCampus was developed as a backend-focused academic project to demonstrate:

REST API design

Authentication & authorization

Role-based permissions

Django best practices

Clean project structure

📍 Repository

https://github.com/sniipe-er/CourseCampus