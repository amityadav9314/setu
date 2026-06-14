# Setu Project Architecture

This document describes the high-level architecture, module design, and directory layout of the Setu desktop client.

## Directory Structure

```
setu/
├── frontend/                     # React + TypeScript + Vite UI Client
│   ├── public/                   # Public static assets
│   └── src/
│       ├── pages/                # Page components (Home, HTTP Client, Settings)
│       ├── components/           # UI sub-components (request, response, sidebar, common)
│       ├── services/             # Frontend services (wails.ts API wrapper)
│       ├── hooks/                # Custom React hooks
│       ├── types/                # TypeScript type definitions
│       └── utils/                # Utility helper functions
│
├── backend/                      # Go Modules Backend
│   ├── cmd/
│   │   └── setu/
│   │       └── main.go           # Application entrypoint running Wails
│   └── internal/                 # Internal business logic packages
│       ├── app/                  # Application lifecycles & binding controllers
│       ├── request/              # HTTP Request executors & model states
│       ├── collection/           # Request collections storage & serialization
│       ├── environment/          # Active environment variable resolution
│       ├── history/              # Request logging history limits (last 100)
│       ├── storage/              # OS-specific paths and local disk filesystem
│       ├── config/               # Settings configuration parameters
│       └── shared/               # Globally shared types and custom error constants
│
├── docs/                         # Specifications & design markdown files
├── schemas/                      # JSON schemas for validating request and collections storage
├── build/                        # Compiled native binaries destination (Linux, Windows, macOS)
├── wails.json                    # Project configuration for Wails CLI builds
└── Makefile                      # Build automation tasks helper
```

## System Workflow

1. **User Interaction:** The user interacts with the React UI (e.g. clicks the 'Send' button on [RequestPage.tsx](file:///home/aky/Coding/go/setu/frontend/src/pages/RequestPage.tsx)).
2. **IPC Bindings:** The UI invokes the JavaScript methods exported by [wails.ts](file:///home/aky/Coding/go/setu/frontend/src/services/wails.ts) service. These communicate with the Wails bound controller [app.go](file:///home/aky/Coding/go/setu/backend/internal/app/app.go) in Go.
3. **Backend Logic:** The controller delegates functions to specific internal backend packages (e.g., executing the request via `executor.go` or loading files via `filesystem.go`).
4. **Data Ownership:** All data is read and written locally to user folders via JSON formats following the JSON schemas defined under `/schemas/`.
