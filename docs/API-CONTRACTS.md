# API Contracts (Wails Bindings)

This document describes the Go methods exported to the React TypeScript frontend through Wails.

## 1. App Greet (Sample Verification Method)
*   **Go Signature:** `func (a *App) Greet(name string) string`
*   **JS Signature:** `window.go.app.App.Greet(name: string): Promise<string>`

## 2. Request Service Bindings
*   **Execute Request:**
    *   **Go Signature:** `func (a *App) SendRequest(req request.Request) (request.Response, error)`
    *   **JS Signature:** `window.go.app.App.SendRequest(req: Request): Promise<Response>`

## 3. Collection Service Bindings
*   **Create Collection:**
    *   **Go Signature:** `func (a *App) CreateCollection(name string) (collection.Collection, error)`
    *   **JS Signature:** `window.go.app.App.CreateCollection(name: string): Promise<Collection>`
*   **List Collections:**
    *   **Go Signature:** `func (a *App) GetCollections() ([]collection.Collection, error)`
    *   **JS Signature:** `window.go.app.App.GetCollections(): Promise<Collection[]>`

## 4. History Service Bindings
*   **Get History:**
    *   **Go Signature:** `func (a *App) GetHistory() ([]history.HistoryItem, error)`
    *   **JS Signature:** `window.go.app.App.GetHistory(): Promise<HistoryItem[]>`
*   **Clear History:**
    *   **Go Signature:** `func (a *App) ClearHistory() error`
    *   **JS Signature:** `window.go.app.App.ClearHistory(): Promise<void>`
