# NotesApp

NotesApp is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, login, and manage their notes efficiently.

## Features

- User authentication: Users can register and login securely using JSON Web Tokens (JWT).
- Note management: Users can add, view, update, and delete notes.
- Timestamps: Notes are automatically timestamped with creation and last update times.
- Responsive UI: The application UI is designed to work seamlessly across various devices and screen sizes.

## Technologies Used

- **Frontend:** React.js, React Router, Axios, Saas
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render (backend), vercel (frontend)

## Setup Instructions

1. Clone the repository:

    git clone https://github.com/kamal-singh819/notes-app.git


2. Navigate to the project directory:

cd notes-app


3. Install dependencies for both frontend and backend:
    cd frontend
    npm install
    cd ../backend
    npm install


4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Define the following environment variables in the `.env` file:
     - `MONGODB_CONNECTION_URI`: MongoDB connection URI
     - `JWT_SECRET_KEY`: Secret key for JWT authentication
     - `PORT`: port number for backend server


5. Run the development server:
   - For the backend: `npm start` (with nodemon)
   - For the frontend: `npm run dev`


6. Access the application in your web browser at `http://localhost:${PORT}`.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
