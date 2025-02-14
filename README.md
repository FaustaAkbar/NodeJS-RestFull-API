# RESTful API with Node.js

## Description

This is a RESTful API built using Node.js, utilizing several modern libraries and frameworks to ensure efficiency, security, and maintainability.

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework for building APIs
- **Prisma** - ORM for database management
- **Joi** - Schema validation
- **Winston** - Logging utility
- **Bcrypt** - Password hashing
- **UUID** - Unique identifier generation
- **Babel** - JavaScript transpiler
- **Jest** - Testing framework
- **Supertest** - API testing utility

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/FaustaAkbar/NodeJS-RestFull-API.git
   ```
2. Navigate to the project directory:
   ```sh
   cd NodeJS-RestFull-API
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary configurations (e.g., database URL, JWT secret)

## Usage

### Running the Server

Start the development server:

```sh
npm run dev
```

Start the production server:

```sh
npm start
```

### Running Tests

To run unit and integration tests:

```sh
npm test
```

## API Documentation

For detailed API endpoints, visit the [API Documentation](https://github.com/FaustaAkbar/NodeJS-RestFull-API/tree/main/docs).

## Project Structure

```
📂 your-repo
├── 📂 src
│   ├── 📂 application
│   ├── 📂 controller
│   ├── 📂 error
│   ├── 📂 middlewares
│   ├── 📂 route
│   ├── 📂 service
│   ├── 📂 validation
│   ├── main.js
├── 📂 test
├── .env
├── .gitignore
├── babel.config.json
├── package-lock.json
├── package.json
├── README.md
```

## License

This project is licensed under the MIT License.
