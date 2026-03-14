# Book Management System

A full-stack application for managing a collection of books, featuring an Angular frontend and an ASP.NET Core Web API backend.

## 🚀 Features

- **CRUD Operations**: Add, view, edit, and delete books.
- **Data Model**: Track books with details like Title, Author, ISBN, and Publication Date.
- **API Documentation**: Integrated Swagger UI for testing the backend API.
- **Cross-Origin Support**: Pre-configured CORS to allow seamless communication between the frontend and backend.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: Vanilla CSS
- **Tools**: Angular CLI, Vitest (Testing)

### Backend
- **Framework**: ASP.NET Core Web API
- **Language**: C#
- **Documentation**: Swagger / OpenAPI

## 📂 Project Structure

```text
BookManagement/
├── BookApp/          # Angular Frontend
│   ├── src/          # Source code
│   └── package.json  # Dependencies and scripts
└── BookAPI/          # ASP.NET Backend
    ├── Controllers/  # API endpoints
    ├── Models/       # Data models
    └── Program.cs    # Application entry point
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS)
- [.NET SDK](https://dotnet.microsoft.com/download) (Recommended: .NET 8 or later)
- [Angular CLI](https://angular.dev/tools/cli)

### Running the Backend (BookAPI)
1. Navigate to the API directory:
   ```bash
   cd BookAPI
   ```
2. Run the application:
   ```bash
   dotnet run
   ```
3. The API will be available at `https://localhost:7198` (or similar, check console output). Access Swagger UI at `https://localhost:7198/swagger`.

### Running the Frontend (BookApp)
1. Navigate to the App directory:
   ```bash
   cd BookApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and go to `http://localhost:4200`.

## 🧪 Testing

- **Frontend**: Run `npm test` in the `BookApp` directory.
- **Backend**: (Add backend test instructions if applicable)
