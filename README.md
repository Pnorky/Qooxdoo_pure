# Qooxdoo Pure - Student Registration System

A student registration and management system built with **pure Qooxdoo framework** components. This application provides a desktop-like web interface for managing student information, including personal details, contact information, and academic records.

## Features

- **User Authentication**: Login and registration system
- **Student Management**: 
  - Personal information (Student ID, Name, Date of Birth, Gender, Address)
  - Contact information (Email, Phone, Emergency Contact)
  - Academic information (Program, Year Level, Previous Schools)
- **Student Database**: View, add, edit, and delete student records
- **Pure Qooxdoo UI**: Built entirely with native Qooxdoo components (no custom UI wrappers)
- **RESTful API**: Backend server with Express.js and SQLite database

## Technology Stack

- **Frontend**: Qooxdoo Framework 6.0.4
- **Backend**: Node.js with Express.js
- **Database**: SQLite3
- **Components**: Pure Qooxdoo UI components (no custom wrappers or theming)

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Qooxdoo Compiler (installed via npm)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Pnorky/Qooxdoo_pure.git
cd qooxdoo_pure
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database (if needed):
```bash
# The database will be created automatically when you start the server
```

## Running the Application

### Start the Backend Server

```bash
npm run server
# or
npm run dev
```

The backend server will run on `http://localhost:3000`

### Compile and Serve the Frontend

In a separate terminal:

```bash
# For development (with watch mode)
npm run watch

# For one-time compilation
npm run compile

# To serve the compiled application
npm run serve
```

The application will be available at the URL shown in the terminal (typically `http://localhost:8080`)

## Project Structure

```
qooxdoo_pure/
├── backend/              # Backend server code
│   ├── routes/          # API routes (auth, students)
│   ├── database.js      # Database setup and queries
│   └── server.js        # Express server
├── source/
│   ├── boot/            # HTML entry points
│   ├── class/           # Qooxdoo application classes
│   │   └── qooxdo_proj/
│   │       ├── Application.js      # Main application
│   │       ├── pages/              # Page components (Login)
│   │       ├── components/         # Reusable components
│   │       │   ├── Buttons/       # Button components
│   │       │   ├── Tabs/          # Tab components
│   │       │   ├── Windows/       # Window components
│   │       │   └── MenuBar.js     # Menu bar
│   │       └── util/              # Utility classes
│   └── resource/        # Static resources (images, etc.)
├── compile.json         # Qooxdoo compiler configuration
├── package.json         # Node.js dependencies
└── README.md           # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Usage

1. **Login**: Use the login page to authenticate with your credentials
2. **Register**: Click "Sign up" to create a new account
3. **Add Student**: Fill out the Personal Info, Contact Info, and Academic Info windows, then click "Submit"
4. **View Students**: Open the "Student Table" window to see all registered students
5. **Edit/Delete**: Click on a student row in the table to edit or delete

## Development

### Compiling

```bash
# Compile the application
npm run compile

# Watch for changes and auto-compile
npm run watch
```

### Code Structure

The application uses pure Qooxdoo components:
- `qx.ui.form.Button` - Buttons
- `qx.ui.form.TextField` - Text inputs
- `qx.ui.form.PasswordField` - Password inputs
- `qx.ui.form.SelectBox` - Dropdown selects
- `qx.ui.form.DateField` - Date pickers
- `qx.ui.form.TextArea` - Multi-line text inputs
- `qx.ui.basic.Label` - Labels
- `qx.ui.table.Table` - Data tables
- `qx.ui.window.Window` - Windows

## License

ISC

## Repository

https://github.com/Pnorky/Qooxdoo_pure.git
