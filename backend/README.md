# EchoVerse Backend

## Overview

The backend of **EchoVerse** is a robust and scalable system designed to handle the core functionalities of the application. It provides APIs, database management, and business logic to support the frontend and other services.

## Features

- RESTful API endpoints for seamless communication  
- Secure authentication and authorization  
- Scalable architecture for handling high traffic  
- Integration with third-party services  
- Comprehensive error handling and logging  

## Technologies Used

- **Programming Language**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Other Tools**: bcrypt, simple-crypto-js, cloudinary, etc.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/echoverse-backend.git
   cd echoverse-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   SIMPLE_CRYPTO_SECRET=your_simple_crypto_secret
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   MONGODB_URI=your_mongodb_uri
   PORT=your_port
   CLOUDINARY_FOLDER=your_cloudinary_folder_name
   JWT_EXPIRES_IN=your_jwt_expiration_time
   CORS_URL=your_cors_url
   ```

4. **Run database migrations** (if applicable):
   ```bash
   npm run migrate
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

## API Documentation

API documentation is available at [`/api-docs`](http://localhost:your_port/api-docs) when the server is running.  
It is built using [Swagger](https://swagger.io/) for easy reference.

## Folder Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## API Endpoints Overview

### User Routes

- **POST /api/user/logout**  
  Log out a user (clears token cookie).
  **Headers**: `Authorization: Bearer <token>`

- **POST /api/user/register**  
  Registers a new user  
  **Body**: `fullName`, `email`, `password`

- **POST /api/user/login**  
  Authenticates a user and returns JWT  
  **Body**: `email`, `password`

- **GET /api/user/profile**  
  Returns authenticated user's profile  
  **Headers**: `Authorization: Bearer <token>`

### Audio Routes

- **POST /api/audio/upload**  
  Upload an audio file  
  **Form Data**: `file`, `title`, `unlocksAt`, `mood`,
  **Headers**: `Authorization: Bearer <token>`

- **GET /api/audio/:audioId**  
  Retrieve audio file by ID
  **Headers**: `Authorization: Bearer <token>`

- **DELETE /api/audio/:audioId**  
  Delete audio file by ID
  **Headers**: `Authorization: Bearer <token>`

- **GET /api/audio/get-all-audio**  
  Get all audio files for the authenticated user  
  **Headers**: `Authorization: Bearer <token>`

## Testing

Run the test suite:

```bash
npm test
```

## Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy** to your preferred hosting service (e.g., AWS, Heroku, Vercel, etc.)

---

## Contact

For inquiries or support, feel free to reach out:

- **Name**: Deepak Kumar Bansal  
- **Email**: [deepakkumarbansal222@gmail.com](mailto:deepakkumarbansal222@gmail.com)  
- **GitHub**: [@deepakkumarbansal](https://github.com/deepakkumarbansal)