# Data-Flow Architecture

A **single source of truth** for how data travels through our frontend — from a user’s click all the way to the backend API and back.

---

## 1. Mental Model

```text
┌───────────────────────┐
│       User UI         │  ← React Components
└───────────────────────┘
           ▲
           │
           ▼
┌───────────────────────┐
│   Custom React Hooks  │  ← React Query wrappers
└───────────────────────┘
           ▲
           │
           ▼
┌───────────────────────┐
│       Services        │  ← Business / domain logic
└───────────────────────┘
           ▲
           │
           ▼
┌───────────────────────┐
│    API Layer (Axios)  │  ← Base instances + interceptors
└───────────────────────┘
           ▲
           │
           ▼
┌───────────────────────┐
│      Backend API      │
└───────────────────────┘
````

* **Unidirectional**: data always flows *down* (UI → API) and *back up* (API → UI).
* **Clear boundaries**: each layer does *one* job—no business logic in components, no React in services.

---

## 2. Layers in Detail

| Layer             | Folder(s)                       | Why it exists                                                       | Never does…                         |
| ----------------- | ------------------------------- | ------------------------------------------------------------------- | ----------------------------------- |
| **API**           | `src/api/`                      | Configure Axios clients, base URLs, interceptors.                   | Business decisions or React imports |
| **Services**      | `src/services/`                 | Translate REST ↔ domain terms, validate with Zod, logics.           | Touch React Query or UI code        |
| **Queries/Hooks** | `src/queries/` + `src/hooks/`   | Wire TanStack Query (`useQuery`, `useMutation`), expose nice hooks. | Talk to Axios directly              |
| **UI**            | `src/components/`, `src/pages/` | Render data, handle user interactions.                              | Call Axios or mutate cache manually |

---

## 3. Directory Patterns

```text
src/
├── api/
│   ├── index.ts          # API client / Axios instance
│   └── types/            # Shared types
├── services/
│   └── facebook/                 # main service domain, can contain subdomains
│       └── accounts/
│           ├── index.ts          # service object with business logic
│           ├── types/            # domain models
│           ├── enums/            # domain enums
│           └── mock/             # mock implementations
├── queries/
│   └── facebook/
│       └── accounts.ts   # custom hooks
└── pages/
    └── facebook/
        └── accounts/
            └── accounts-list.tsx   # UI that uses the data hooks
```

---

## 4. Example: Facebook Accounts Flow

### 1. Service

```ts
// src/services/facebook/accounts/index.ts
import type {
  GetFacebookAccountsResponseRecord,
  GetFacebookAccountsRequestRecord,
} from "./types";

import { callApi } from "@/api";
import { urlQueryManager } from "@/utils/url/query";

/**
 * Service object to interact with Facebook accounts API endpoints.
 */
export type FacebookAccountsServiceType = {
  /**
   * Retrieves pagination of Facebook accounts.
   *
   * @param {GetFacebookAccountsRequestRecord} data - Query parameters for fetching accounts.
   * @returns {Promise<GetFacebookAccountsResponseRecord>} A promise to the pagination of accounts.
   */
  getAccounts(
    data: GetFacebookAccountsRequestRecord
  ): Promise<GetFacebookAccountsResponseRecord>;
};

class FacebookAccountsService implements FacebookAccountsServiceType {
  async getAccounts(
    data: GetFacebookAccountsRequestRecord
  ): Promise<GetFacebookAccountsResponseRecord> {
    return await callApi({
      url: `/facebook/accounts/paginated/${urlQueryManager.getQueryString(data)}`,
    });
  }
}

export const facebookAccountsService: FacebookAccountsServiceType = new FacebookAccountsService();
```

### 2. Query Hook

```ts
// src/queries/facebook/accounts.ts
import { type UseQueryOptions, type UseQueryResult, useQuery } from "@tanstack/react-query";

import { ReactQueryKeys } from "@/queries/keys/queries";
import { facebookAccountsService } from "@/services/facebook/accounts";
import type {
  GetFacebookAccountsPaginatedResponseRecord,
  GetFacebookAccountsRequestRecord,
} from "@/services/facebook/accounts/types";

const { getAccounts } = facebookAccountsService;

export const useFacebookAccounts = (
  data: GetFacebookAccountsRequestRecord,
  options?: UseQueryOptions<
    GetFacebookAccountsPaginatedResponseRecord,
    unknown,
    GetFacebookAccountsPaginatedResponseRecord,
    (number | string | ReactQueryKeys)[]
  >
): UseQueryResult<GetFacebookAccountsPaginatedResponseRecord, unknown> =>
  useQuery({
    queryKey: [
      ReactQueryKeys.FACEBOOK_ACCOUNTS,
    ],
    queryFn: async () => await getAccounts(data),
    refetchOnWindowFocus: false,
    ...options,
  });

```

### 3. Component

```tsx
// src/pages/facebook/accounts/accounts-list.tsx
import { useFacebookAccounts } from '@/queries/facebook/use-facebook-accounts';

export function AccountsList() {
  // If we had some filters here, we would send them as prop to this hook
  const { data, isLoading, error } = useFacebookAccounts({});

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return data?.map(acc => <AccountCard key={acc.id} account={acc} />);
}
```

---

## 5. Custom Hooks ≥ Services ≥ Components

**Why hooks, not direct service calls?**

| Benefit                | What it gives us                             |
| ---------------------- | -------------------------------------------- |
| **Caching**            | Requests deduped, data stays fresh           |
| **Status flags**       | `isLoading`, `error`, `isSuccess` out of box |
| **Optimistic updates** | Easier with `useMutation`                    |
| **Refetch policies**   | Background refresh, stale-while-revalidate   |

> Services are *framework-agnostic*; hooks know about React Query; components stay dumb.

---

## 6. Error & Auth Pipeline

1. **Axios response interceptor** normalizes errors ➜ throws
2. **Service** `try/catch` maps to domain error (e.g., `AuthError`)
3. **Hook** surfaces error to component ➜ component decides toast vs inline

Global 401 handler lives in `api/interceptors.ts` and redirects to `/login`.

---

## 7. Mocking Strategy

* **Service mocks** live beside the real service (`/mock`) and implement the same methods.
* Manually change methods when switching between mock and real services.

---

## 8. Best-Practice Checklist

* [ ] New API → create **axios instance** or reuse existing.
* [ ] New domain logic → **service** under `src/services/<domain>/`.
* [ ] New data-fetching UI → **custom hook** + React Query.
* [ ] New screen → lives in `src/pages/`; never imports Axios or services.
