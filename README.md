📘 **CourseCampus – LMS Backend API**

A fully functional **back-end Learning Management System (LMS)** built using **Django**, **Django REST Framework**, and **JWT Authentication**.

This project is an MVP that allows **instructors** to create courses and lessons, **students** to enroll and submit assignments, and **admins** to manage the platform. The system is API-only and focuses on backend logic, security, and database design.

---

🚀 **Features**

👤 **User Management**

* JWT authentication (login, refresh)
* User roles: Admin, Instructor, Student
* Secure profile management
* Role-based access control

📚 **Courses & Lessons**

* Instructors create and manage courses
* Lessons added to courses
* Course categorization support

🎓 **Enrollment**

* Students enroll in courses
* Prevents duplicate enrollment
* Tracks course completion status

📝 **Assignments & Submissions**

* Instructors create assignments per lesson
* Students submit assignments
* Grading and submission tracking

🏅 **Certificates**

* Automatic course completion detection
* Certificate generation for completed courses

---

📂 **Project Structure**

```
coursecampus/
│
├── users/          # Authentication & user roles
├── courses/        # Courses & lessons
├── enrollments/    # Enrollment logic
├── assignments/    # Assignments & submissions
├── certificates/   # Course certificates
├── core/           # Permissions & utilities
├── CourseCampus/   # Django settings
└── README.md
```

---

🧩 **Tech Stack**

| Component | Technology                         |
| --------- | ---------------------------------- |
| Backend   | Django 5                           |
| API       | Django REST Framework              |
| Auth      | SimpleJWT                          |
| Database  | SQLite (dev), PostgreSQL supported |
| Tools     | Postman, Git                       |

---

🏗 **Setup Instructions**

1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/coursecampus.git
cd coursecampus
```

2️⃣ Create virtual environment & install dependencies

```bash
pip install -r requirements.txt
```

3️⃣ Run migrations

```bash
python manage.py migrate
```

4️⃣ Start development server

```bash
python manage.py runserver
```

---

🎓 **Academic Context**

CourseCampus was developed as a **Capstone Project** to demonstrate skills in backend development, REST API design, authentication, authorization, and database modeling.
