# ChainTale Backend

FastAPI + MongoDB service powering the ChainTale collaborative storytelling platform.

## Getting Started

```bash
uv venv  # or python -m venv .venv
source .venv/bin/activate
pip install -e .
```

Create a `.env` file based on the following keys:

```
MONGO_URI=<connection string>
MONGO_DB_NAME=chaintale
JWT_SECRET_KEY=super-secret
JWT_REFRESH_SECRET_KEY=super-secret-refresh
CORS_ORIGINS=http://localhost:3000
REDIS_URL=redis://localhost:6379/0
```

Run the development server:

```bash
uvicorn app.main:app --reload
```

Visit `http://localhost:8000/docs` for the interactive API explorer.

