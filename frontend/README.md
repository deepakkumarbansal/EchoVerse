# EchoVerse Frontend

Welcome to the **EchoVerse Frontend** repository! This project serves as the user interface for the EchoVerse application.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)

## Overview

The EchoVerse Frontend is built to provide a seamless and interactive user experience. It connects with the backend services to deliver real-time data and functionality.

## Features

- Responsive design for all devices.
- Intuitive user interface.
- Integration with backend APIs.
- Real-time updates and notifications.

## Technologies Used

- **Framework**: React.js
- **Styling**: Tailwind CSS 
- **State Management**: Context API
- **Routing**: React Router
- **Build Tool**: Vite 

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/echoverse-frontend.git
    cd echoverse-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   VITE_BASE_URL=backendUrl
   ```


4. Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

5. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

```
frontend/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   │   ├── GetStarted.jsx       # Starter of the application
│   │   ├── Home.jsx       # Homepage of the application
│   │   ├── CreateEntry.jsx       # Create audio entry for future you
│   │   ├── Profile.jsx      # Profile page with user details
│   │   ├── Timeline.jsx  # User audios timeline with real-time data
│   │   ├── Login.jsx      # Login page for user authentication
│   │   ├── Signup.jsx      # Signup page for user creation
│   │   └── NotFound.js   # 404 page for unmatched routes
│   ├── Context     # Context API for user
│   └── App.js      # Main app component
├── package.json    # Project metadata
└── README.md       # Project documentation
```