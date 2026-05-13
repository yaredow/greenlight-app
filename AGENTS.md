# Greenlight App — Agent Instructions

## Quick Start

- **Package manager**: bun (see `bun.lock`)
- **Framework**: Expo 54 with Expo Router (file-based routing)
- **Language**: TypeScript with strict mode
- **React version**: 19.1.0, React Native 0.81.5
- **Path alias**: `@/*` resolves to repo root (see `tsconfig.json`)
- **Naming convention**: kebab-case for filenames (e.g., `use-online-manager.ts`)

## Key Commands

```bash
bun start                 # Start dev server
bun run android          # Open on Android emulator
bun run ios              # Open on iOS simulator
bun run web              # Start web version
bun run lint             # Run ESLint
bun run reset-project    # Clear starter code, create blank app directory
```

## Architecture

### Entry Point
- **Root layout**: `app/_layout.tsx` — wraps entire app with `QueryProvider` and initializes `useOnlineManager`
- **Router**: Expo Router with file-based routing in `app/` directory
- **New Architecture enabled**: See `app.json` (`"newArchEnabled": true`)

### Data Layer
- **TanStack Query 5.100.10** is integrated:
  - `lib/query-provider.tsx` — wraps app with `QueryClientProvider`
  - `hooks/use-online-manager.ts` — sets up automatic network state tracking via `expo-network`
  - Queries auto-refetch when network reconnects (no manual setup needed)

### Styling & UI
- Vector icons: `@expo/vector-icons` (15.0.3)
- Navigation: React Navigation bottom tabs
- No CSS framework; React Native native components

## Development Quirks

### Android Emulator Connection
- Emulator uses special alias `10.0.2.2` to reach host machine
- On Arch Linux: if dev server won't connect, verify it's listening on port 8081:
  ```bash
  lsof -i :8081
  ```
- Network detection relies on `expo-network` module; ensure it's available at runtime

### TypeScript
- Strict mode enabled; all `any` will fail CI
- Path alias `@/*` resolves to repo root for cleaner imports

### New Architecture
- App has React Native New Architecture enabled (`newArchEnabled: true` in `app.json`)
- May affect native module compatibility; check module docs before adding dependencies

## File Structure

```
app/                      # Expo Router entrypoint (file-based routing)
  _layout.tsx            # Root layout with QueryProvider & online manager
  index.tsx              # Default home screen
lib/
  query-provider.tsx     # TanStack Query wrapper
hooks/
  use-online-manager.ts  # Network state listener setup
assets/                  # Icons, images, fonts
components/              # Reusable React components
```

## When Adding Features

- **Data fetching**: Use `useQuery` from TanStack Query (automatically handles network state)
- **New screens**: Add `.tsx` files to `app/` following Expo Router conventions
- **New hooks**: Place in `hooks/` with kebab-case names
- **Utilities**: Place in `lib/`

## Testing & Linting

- **Lint**: `bun run lint` (ESLint with Expo config)
- **No test framework configured** — add one if needed
- **No pre-commit hooks** — no `.git/hooks` automation currently

## Environment

- **OS**: Linux (Arch)
- **Dev server port**: 8081 (default, no firewall)
- **Network**: No ngrok; uses LAN mode for emulator testing
