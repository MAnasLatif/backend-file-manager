# Backend File Manager

**Backend File Manager** is a TypeScript-based server-side solution for managing file uploads and downloads, with a primary focus on handling images. Designed for flexibility and reliability, this project provides tools to overcome common issues in image handling and file management on the server side. It is open-source, allowing anyone to use, improve, and contribute to the repository.

## Features

- **File Operations:** Upload and download files with optimized handling for images.
- **Cross-Origin Support:** Enables integration with various front-end clients using CORS.
- **Error Management:** Comprehensive error handling powered by `http-errors` .
- **Robust Logging:** Detailed logging with daily rotation using `winston` and `winston-daily-rotate-file` .
- **TypeScript Support:** Ensures type safety and better maintainability.
- **SQLite Database:** Manages file metadata and supports efficient storage.
- **Developer-Friendly Tools:** Includes ESLint, Prettier, and Jest for linting, formatting, and testing.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/backend-file-manager.git
cd backend-file-manager
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:** Create a `.env` file in the project root. Example:Bash

```bash
PORT=5000
DATABASE_URL=./data/db.sqlite
```

4. **Run the application:**
   - For development:

```bash
npm run dev
```

- For production:

```bash
npm start
```

## Scripts

- `npm run dev` : Starts the server in development mode with `nodemon` .
- `npm run start` : Builds the project and runs it in production mode.
- `npm run build` : Compiles TypeScript and resolves path aliases.
- `npm run test` : Runs tests with Jest.
- `npm run lint` : Lints the codebase using ESLint.
- `npm run lint:fix` : Fixes linting issues.
- `npm run format` : Formats the code using Prettier.

## Dependencies

### Production

- `cors` : Enable CORS for cross-origin resource sharing.
- `dotenv` : Load environment variables from a `.env` file.
- `express` : Web framework for Node.js.
- `http-errors` : Simplifies error creation and handling.
- `morgan` : Logs HTTP requests.
- `winston` and `winston-daily-rotate-file` : Logging and log rotation.

### Development

- TypeScript-related: `typescript` , `ts-node` , `tsconfig-paths` , `tsc-alias` .
- Testing: `jest` , `ts-jest` , `supertest` , `superagent` .
- Linting and Formatting: `eslint` , `prettier` , and associated plugins.
- Utilities: `nodemon` , `cross-env` .

## Usage

### Upload Files

Use the API endpoint to upload image files. The server processes and stores the file information in the SQLite database.

### Download Files

Retrieve files using the download API endpoint. The metadata ensures quick and accurate file management.

### Log Analysis

Check the `logs/` directory for detailed logs of server activity, rotated daily.

## Contribution

We welcome contributions to the Backend File Manager. Here's how you can contribute:

### Fork the repository.

### Create a new branch:

```bash
git checkout -b feature-name
```

### Commit your changes:

```bash
git commit -m "Add your descriptive message here"
```

### Push your branch:

```bash
git push origin feature-name
```

**Open a Pull Request:** Explain your changes and improvements.

## Testing Contributions

Ensure all tests pass before submitting your pull request:

```bash
npm run test
```

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Contact

For questions, issues, or suggestions, feel free to reach out to:

- **Website:** [M. Anas latif](https://m.anaslatif.com/contact)
- **Email:** [open.source@anaslatif.com](mailto://open.source@anaslatif.com/)

---

Happy coding!
