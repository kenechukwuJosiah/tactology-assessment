# GraphQL Department Management API

This is a GraphQL-based API for managing departments and sub-departments with user authentication.

## Features

- User registration and authentication
- Department and sub-department creation, retrieval, update, and deletion
- JWT-based secured access

## Tech Stack

- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **API**: GraphQL

## Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Configure environment variables**:

Create a `.env` file in the root directory with the following:

```env
DB_HOST=localhost
DB_USERNAME=test
DB_PASSWORD=test
DB_NAME=test

APP_PORT=5500

JWT_SECRET=********LK9289LI********&LKH/****lksjflsk972989289lskjsd****
```

4. **Seed User**:

```bash
pnpm seed:user
```

5. **Start the development server**:

```bash
pnpm run start:dev
```

## Authentication

After registration, log in to receive a JWT token. Use this token in the `Authorization` header for secured endpoints.

```
Authorization: Bearer <your_token>
```

## API Usage Examples

### Create User

```graphql
mutation {
  createUser(
    createUserInput: {
      username: "kenny"
      password: "pass12"
      fullName: "Kenechukwu Josiah Onwe"
    }
  ) {
    id
    username
    fullName
  }
}
```

### Login

```graphql
mutation {
  login(username: "kenny", password: "pass12")
}
```

### Create Department with SubDepartments

```graphql
mutation {
  createDepartment(
    input: {
      name: "Cooking"
      subDepartments: [{ name: "Food stuff" }, { name: "Waiters" }]
    }
  ) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### Create Department without SubDepartments

```graphql
mutation {
  createDepartment(input: { name: "Empty", subDepartments: null }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### List Departments

```graphql
query {
  getDepartments {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### Update Department

```graphql
mutation {
  updateDepartment(id: "<department_id>", name: "Finance") {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### Delete Department

```graphql
mutation {
  deleteDepartment(id: "<department_id>")
}
```

### Create SubDepartment

```graphql
mutation {
  createSubDepartment(
    createSubDepartmentInput: { departmentId: "<department_id>", name: "Test" }
  ) {
    id
    name
  }
}
```

### List SubDepartments

```graphql
query {
  listSubDepartment {
    id
    name
  }
}
```

### Get SubDepartment by ID

```graphql
query {
  findSubDepartment(id: "<sub_department_id>") {
    id
    name
  }
}
```

### Update SubDepartment

```graphql
mutation {
  updateSubDepartment(
    updateSubDepartmentInput: {
      departmentId: "<department_id>"
      name: "Testy"
      id: "<sub_department_id>"
    }
  ) {
    id
    name
  }
}
```

### Delete SubDepartment

```graphql
mutation {
  deleteSubDepartment(id: "<sub_department_id>")
}
```

---

## Author

**Kenechukwu Josiah Onwe**  
Reach me via [kennysuccesskay@gmail.com](mailto:kennysuccesskay@gmail.com)
