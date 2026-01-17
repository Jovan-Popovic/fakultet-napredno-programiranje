# Development Setup

This guide gets you from zero to a running frontend locally.

---

## 1. Prerequisites

- **[Node.js](https://nodejs.org) 22+**
  - Check: `node -v`
  - **Recommended:** manage versions with **[nvm](https://github.com/nvm-sh/nvm)**
- **[pnpm](https://pnpm.io) 10+**
  - Install: `npm install -g pnpm`
  - (Project uses a `pnpm-lock.yaml`, so stick to pnpm.)
- (Optional) **[Docker](https://www.docker.com)** + **[Docker Compose](https://docs.docker.com/compose)**
  - `docker-compose.yaml` is in the project root.

---

## 2. Clone the Repo

```bash
git clone <repo-url>
cd frontend
````

---

## 3. Install Dependencies

```bash
pnpm install
```

> Using npm/yarn is possible but **unsupported**—stick to pnpm to avoid lockfile drift.

---

## 4. Configure Environment Variables

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Fill in values.

> **Vite Rule:** Only variables prefixed with `VITE_` are exposed to the client. See the Vite docs.

---

## 5. Run the Dev Server

```bash
pnpm dev
```

* Default port: **5173** (Vite).
* Open: [http://localhost:5173](http://localhost:5173)

If the port is busy:

```bash
pnpm dev --port 3000
```

---

## 6. Typechecking, Linting & Formatting

* **Typechecking:** `pnpm typecheck` (TypeScript)
* **Lint & auto-fix:** `pnpm lint` (ESLint)
* **Format:** `pnpm format:check` (Prettier)

---

## 7. Build & Preview Production Bundle

```bash
pnpm build
pnpm preview
```

* Output: `dist/`
* `pnpm preview` serves the built bundle locally.

---

## 8. Editor Setup

* VS Code + these extensions:

  * **ESLint**
  * **Prettier**
  * **TypeScript ESLint Plugin** (bundled in ESLint ext)
* Enable “Format on Save” if it’s not already.

---

## 9. (Optional) Dockerized Dev

```bash
docker compose up --build
```

* Vite will bind to `0.0.0.0`; access via `http://localhost:5173`.
* Hot reload works via bind mounts in `docker-compose.yaml`.

---

## 10. Troubleshooting

| Symptom                             | Fix                                                                 |
| ----------------------------------- | ------------------------------------------------------------------- |
| `Command 'pnpm' not found`          | `npm i -g pnpm`                                                     |
| Env var not picked up               | Ensure it’s in `.env`, starts with `VITE_`, then restart dev server |
| CORS / API errors                   | Check `VITE_API_BASE_URL`, mock server, or Vite proxy config        |
| Port already in use                 | `pnpm dev --port 3001` or free the port                             |
| Wrong Node version / build fails    | `nvm use 22` (or run `nvm install 22`)                              |
| Git hooks not running (if expected) | Run `pnpm prepare` to install hooks                                 |
