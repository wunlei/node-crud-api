## Node.js CRUD API

CRUD API with in-memory database

### Usage

1. Make sure you have installed [Node.js 16 LTS version](https://nodejs.org/en/download/)

2. Clone this repository

   Using SSH:

   ```bash
   git clone git@github.com:wunlei/node-crud-api.git`
   ```

   Using HTTPS:

   ```bash
   git clone https://github.com/wunlei/node-crud-api.git`
   ```

3. Go to project folder and checkout to develop branch:

   ```bash
   cd node-crud-api
   git checkout develop
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start a project:

- Production mode:

  ```bash
  npm run start:prod
  ```

- Development mode:
  ```bash
  npm run start:dev
  ```

---

### Endpoints

- `/api/users`

  - `GET /api/users` - get all users
  - `POST /api/users` - create a record about new user and store it in database

- `/api/users/:id`

  - `GET /api/users/:userId` - get user by id
  - `PUT /api/users/:userId` - update existing user
  - `DELETE /api/users/:userId` - delete existing user from database

---

### User object

Following properties are required:

- `id` - string
- `username` - string
- `age` - number
- `hobbies` - array of strings or empty array

---

### Testing

To run tests:

```bash
npm run test
```
