# 👨‍💼 Employee Management System

A full-stack Employee Management System built using **Angular 21**, **AG Grid Community**, **ASP.NET Core Web API (.NET 10)**, and **SQL Server**.

This application allows users to manage employee records through a modern dashboard interface with employee creation, editing, deletion, searching, sorting, validation, notifications, and export functionality.

---

## ✨ Features

### 👥 Employee Management
- ➕ Add Employee
- ✏️ Update Employee
- 🗑️ Delete Employee
- ❌ Cancel Edit Workflow
- 🔄 Real-Time Grid Refresh

### ✅ Validation
- Name Validation
- Email Validation
- Department Validation
- Duplicate Email Validation
- Client-side & Server-side Validation

### 📊 AG Grid Features
- 🔍 Quick Filter Search
- ↕️ Column Sorting
- 📏 Column Resizing
- 🔢 Dynamic Employee Count
- ⚡ Custom Action Renderer
- 🎨 Dark Themed Grid

### 📁 Export
- CSV Export
- Export Dropdown Menu
- Excel Export (Coming Soon 🚀)

### 🎯 User Experience
- 🔔 Toast Notifications
- 🪟 Delete Confirmation Modal
- 🌫️ Background Blur Effect
- 📱 Responsive Layout
- 🌙 Modern Dark Theme

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 21 | Frontend |
| AG Grid Community | Data Grid |
| ASP.NET Core Web API (.NET 10) | Backend |
| SQL Server | Database |
| Angular Signals | State Management |
| Git & GitHub | Version Control |

---

## 🏗️ Architecture

```text
Angular UI
    │
    ▼
Employee Service
    │
    ▼
ASP.NET Core Web API
    │
    ▼
SQL Server
```

---

## 📂 Project Structure

```text
EmployeeCRUD
│
├── employee-ui
│   ├── components
│   ├── services
│   ├── models
│   └── environments
│
├── EmployeeAPI
│   ├── Controllers
│   ├── Models
│   ├── Data
│   └── Services
│
└── README.md
```

---

## 🌐 API Endpoints

### Employee APIs

```http
GET    /api/employees
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
```

### Search Employees

```http
GET /api/employees?search=value
```

### Sort Employees

```http
GET /api/employees?sortBy=name&sortOrder=asc
```

---

## 🚀 Getting Started

### Backend Setup

```bash
cd EmployeeAPI
dotnet restore
dotnet run
```

### Frontend Setup

```bash
cd employee-ui
npm install
ng serve
```

Application runs at:

```text
http://localhost:4200
```

---

## 📋 Validation Rules

### Name
- Required
- Minimum 2 characters
- Maximum 100 characters
- Letters and spaces only

### Email
- Required
- Valid email format
- Maximum 150 characters
- Must be unique

### Department
- Required
- Minimum 2 characters
- Maximum 100 characters
- Letters and spaces only

---

## 🔥 Highlights

- ⚡ Angular Signals for state management
- 🎯 Custom AG Grid Cell Renderer
- 🔄 Dynamic grid updates after CRUD operations
- 🔔 Reusable Toast Notification System
- 🌫️ Confirmation Modal with Blur Background
- 📁 CSV Export excluding Action columns
- 📊 Employee Count synchronized with filters and search
- 🎨 Fully customized dark-themed dashboard UI

---

## 🚧 Future Enhancements

- 📈 Dashboard Statistics Cards
- 🥧 Department Analytics & Charts
- 📄 Excel Export
- 📚 Pagination
- ☑️ Bulk Employee Selection
- 🗑️ Bulk Delete
- 🔐 Authentication & Authorization
- 👥 Role-Based Access Control

---

## 📚 Learning Outcomes

Through this project, I gained hands-on experience with:

- Angular Components & Forms
- Angular Signals
- AG Grid Integration
- REST API Development
- SQL Server Integration
- CRUD Architecture
- State Management
- Frontend Validation
- UI/UX Design Principles
- Git & GitHub Workflow

---

⭐ If you found this project useful, consider giving it a star!
