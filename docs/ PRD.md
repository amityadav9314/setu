# PRD - Setu

## Overview

Setu is a fast, local-first desktop API client built with Go, Wails, and React.

The goal is to provide a lightweight alternative to Postman with a focus on speed, simplicity, low memory usage, and local ownership of data.

Setu is designed for backend engineers, platform engineers, DevOps engineers, and API developers who want a modern API testing tool without cloud dependency.

---

# Problem Statement

Modern API tools have become bloated.

Common complaints include:

* Slow startup times
* High memory usage
* Mandatory cloud accounts
* Excessive collaboration features
* Complex user experience
* Large application size

Developers often need only a simple workflow:

1. Create request
2. Send request
3. View response
4. Organize requests
5. Share through Git

Setu aims to solve this problem.

---

# Vision

Build the fastest desktop API client for developers.

Principles:

* Local-first
* Fast startup
* Low RAM usage
* Git-friendly
* No account required
* Cross-platform

---

# Target Users

## Primary

Backend Engineers

## Secondary

DevOps Engineers

Platform Engineers

QA Engineers

Technical Architects

---

# Success Metrics

Application startup under 2 seconds

Memory usage under 300 MB

Request execution latency comparable to curl

No mandatory sign-up

Collections stored as files

---

# Technology Stack

Frontend:

* React
* TypeScript
* Vite

Desktop Framework:

* Wails

Backend:

* Go

Storage:

* JSON files
* Local filesystem

Packaging:

* Windows MSI
* Linux AppImage
* Linux DEB
* macOS DMG

---

# Core Features (V1)

## Request Builder

Support:

* GET
* POST
* PUT
* PATCH
* DELETE
* HEAD
* OPTIONS

User can configure:

* URL
* Headers
* Query Params
* Request Body

---

## Body Types

Support:

* JSON
* Form Data
* URL Encoded
* Raw Text

---

## Response Viewer

Display:

* Status Code
* Response Headers
* Response Body
* Response Time
* Response Size

JSON responses should be formatted automatically.

---

## Collections

Users can:

* Create collections
* Create folders
* Save requests
* Rename requests
* Delete requests

---

## Environment Variables

Examples:

{{baseUrl}}

{{token}}

{{userId}}

Support:

* Global variables
* Collection variables
* Environment variables

---

## Authentication

Support:

* No Auth
* Basic Auth
* Bearer Token
* API Key

---

## Request History

Automatically store:

* Last 100 requests

User can:

* Reopen previous requests
* Clear history

---

## Import

Support:

* Postman Collection v2.1

---

## Export

Support:

* Setu Collection
* Postman Collection v2.1

---

## Code Generation

Generate snippets for:

* curl
* Go
* Java
* Python
* JavaScript

---

# Storage Model

Everything is stored locally.

Example:

collections/
payments/
create-payment.json
refund-payment.json

No cloud storage.

No mandatory account.

No telemetry by default.

---

# Non Functional Requirements

Startup Time:
< 2 seconds

Memory:
< 300 MB

Request Timeout:
Configurable

Offline Usage:
100% supported

Cross Platform:
Windows
Linux
macOS

---

# Out of Scope (V1)

* Team collaboration
* Cloud sync
* AI assistant
* Mock servers
* Scheduled monitoring
* GraphQL
* WebSockets
* gRPC
* OAuth2
* Plugin marketplace
* Public API documentation hosting

---

# Future Roadmap

## V2

* GraphQL
* WebSockets
* OAuth2
* Request Tests
* Collection Runner

## V3

* gRPC
* OpenAPI Import
* AI Request Generation
* API Discovery

## V4

* Optional Cloud Sync
* Team Workspaces
* Shared Collections

---

# Competitive Positioning

Postman:
Feature-rich but heavy

Bruno:
Local-first and lightweight

Setu:
Fastest local-first desktop API client with native Go backend and modern UI.

---

# Launch Goal

Release a stable MVP capable of replacing Postman for 80% of everyday REST API workflows.
