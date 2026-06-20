src/
│
├── app/                        # Redux store setup lives here
│   ├── store.ts                # The Redux store
│   └── hooks.ts                # Typed useDispatch / useSelector
│
├── features/                   # Feature-based modules (core of Redux Toolkit)
│   └── counter/                # One folder per feature
│       ├── counterSlice.ts     # Slice (actions + reducers)
│       ├── Counter.tsx         # Component that uses this feature
│       └── counterTypes.ts     # Types for this feature
│
├── components/                 # Shared/reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.types.ts
│   └── ...
│
├── pages/                      # Page-level components (route targets)
│   ├── HomePage.tsx
│   └── ...
│
├── hooks/                      # Shared custom hooks
│   └── useDebounce.ts
│
├── services/                   # API call functions
│   └── api.ts
│
├── types/                      # Global TypeScript types & interfaces
│   └── index.ts
│
├── utils/                      # Pure helper functions
│   └── formatDate.ts
│
├── constants/                  # App-wide constants
│   └── routes.ts
│
├── assets/                     # Images, fonts, SVGs
│
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── vite-env.d.ts              # Vite type declarations