# FormStart Project

Полноценное веб-приложение с фронтендом на React/TypeScript и бэкендом на Python.

## Структура проекта

- `clinte/` - Фронтенд приложение (React + TypeScript + Vite)
- `server/` - Бэкенд API (Python + FastAPI)
- `api.yml` - OpenAPI спецификация

## Запуск проекта

### Фронтенд (clinte)

```bash
cd clinte
npm install
npm run dev
```

### Бэкенд (server)

```bash
cd server
pip install -r requirements.txt
python -m uvicorn openapi_server.main:app --reload
```

## Технологии

- **Фронтенд**: React, TypeScript, Vite, ESLint
- **Бэкенд**: Python, FastAPI, OpenAPI
- **Генерация кода**: Orval (для TypeScript клиента)
