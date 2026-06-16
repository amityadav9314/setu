# Setu Architecture

This document describes the high-level architecture of Setu, a local-first API client built using Go, Wails, and React.

## System Overview

Setu consists of two main components:
1. **Frontend**: React-based user interface.
2. **Backend**: Go-based backend powering request execution, environments, collection management, and local storage.

The backend leverages a shared library `aky-go-common` for core utilities:
- **Logger**: Structured JSON logs.
- **HTTP Client**: Singleton client wrapper with custom options.
- **Workflow**: A functional state-based task execution chain.
- **File**: Thread-safe filesystem utility providing concurrent read/write locks.

---

## Backend Component Architecture

```
                 +-----------------------+
                 |       Wails App       |
                 +-----------+-----------+
                             |
                             v
                 +-----------+-----------+
                 |    request.Service    |
                 +-----------+-----------+
                             |
                             v
             +---------------+---------------+
             |   workflow.ExecutionChain     |
             +---------------+---------------+
                              |
        +---------------------+---------------------+---------------------+
        |                     |                     |                     |
        v                     v                     v                     v
 [PrepareRequestTask]  [HTTPExecutionTask]    [LoggingTask]       [SaveHistoryTask]
        |                     |                     |                     |
        v                     v                     v                     v
    (Standard)          (httpclient)            (logger)              (history)
```

### Request Package Directory Structure

To keep components clean and maintainable, request handling is divided into specialized subpackages:
- **`request/state`**: Holds structural models (`Request`, `Response`) and workflow execution state keys (`KeyRequest`, `KeyOptions`, etc.). This package has zero dependencies on other request subpackages, preventing circular imports.
- **`request/helpers`**: Contains utility logic for mapping state types to HTTP request options.
- **`request/tasks`**: Declares discrete workflow execution tasks (`PrepareRequestTask`, `HTTPExecutionTask`, `LoggingTask`, `SaveHistoryTask`).
- **`request/service.go`**: Orchestrates tasks via `workflow.ExecutionChain`. It declares type aliases for `state.Request` and `state.Response` to remain fully backwards compatible.

### Request Execution Workflow

To satisfy SOLID principles (single responsibility, open-closed design) and maintain a clean codebase, request execution is modeled as a workflow chain from the `workflow` package.

1. **PrepareRequestTask**:
   - Takes raw `request.Request` and resolves headers and content types.
   - Normalizes and unmarshals request body to prevent double JSON encoding.
   - Populates `httpclient.RequestOptions` in the state.

2. **HTTPExecutionTask**:
   - Calls `httpclient.GetClient().Do(ctx, opts)` to execute the request natively.
   - Map response back to `request.Response` objects. Handles HTTP status codes >= 400 gracefully (e.g. mapping `StatusError` details back to the response model).

3. **LoggingTask**:
   - Non-fatal logging step executing after the request completes.
   - Logs request metadata and status code using the shared `logger` package.

4. **SaveHistoryTask**:
   - Non-fatal history saving step executing after logging.
   - Saves the executed request history item using the history service.

---

## Storage Component

The backend's local storage subsystem handles collections, variables, history logs, and environment configurations.

To ensure data integrity during concurrent operations (e.g. executing background queries while modifying variables/environments):
- `storage.FileSystem` delegates file read/write operations to the common library `file.Handler`.
- Concurrent file operations are guarded via `file.LockerPerFile`, ensuring thread-safe reads (`RLock`) and writes (`Lock`) per resource filename.

---

## Design and Coding Principles

- **SOLID Principles**: Each method/struct performs exactly one function. Workflows isolate request processing into discrete, testable steps.
- **DRY (Don't Repeat Yourself)**: Avoid custom HTTP/logging wrapper duplication; delegate logic to `aky-go-common`.
- **ARCH.md Maintenance**: This architecture documentation must be kept up-to-date with any structural backend/frontend changes.
