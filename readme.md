# Project Structure

```text
TodoApp/
├─ todoFrontend/      # React
├─ TodoAPI/           # .NET backend project
```

# Todo App Installation

After cloning the repo, you can get both frontend and backend running with just a few commands.

## Backend

1. Navigate to the backend folder and restore packages:

```bash
cd TodoAPI
dotnet restore
```

2. Install EF Core CLI tools (first time only)

```bash
dotnet tool install --global dotnet-ef
```

3. Apply database migrations:

```bash
cd TodoAPI
dotnet ef database update
```

4. Run the backend:

```bash
dotnet run --project TodoAPI.csproj
```

### Frontend

1. Navigate to the frontend folder:

```bash
cd ../..
cd todoFrontend
```

2. Install the dependecies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

### Troubleshooting

### ❌ <span style="color:red">Network Error: Failed to fetch todos!</span>

This error in the frontend usually indicates that the frontend is pointing to the wrong backend URL or **the backend is not running.**

Navigate to `frontendTodo/src/api/axios.ts` update the base URL to match your backend

For Example

```
const api = axios.create({
  baseURL: "https://localhost:7253/api",
  headers: {
    "Content-Type": "application/json",
  },
});
```

Also, open `TodoAPI\TodoAPI\Program.cs` and verify that the frontend URL is correctly configured

```
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp",
        policy => policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});
```
