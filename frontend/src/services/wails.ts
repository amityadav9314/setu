// Safe wrapper for Wails Go bindings.
// Provides mocks when running in standard browser environments (e.g., Vite dev server).

export interface RequestData {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  bodyType: string;
}

export interface ResponseData {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  durationMs: number;
  size: number;
}

declare global {
  interface Window {
    go: {
      app: {
        App: {
          Greet(name: string): Promise<string>;
          SendRequest(req: RequestData): Promise<ResponseData>;
        };
      };
    };
  }
}

export async function Greet(name: string): Promise<string> {
  if (window.go && window.go.app && window.go.app.App) {
    return window.go.app.App.Greet(name);
  }
  
  // Fallback Mock for local web development
  console.warn("Wails runtime environment not detected. Running mock fallback.");
  return `[Mock SDK] Hello ${name}, welcome to Setu!`;
}

export async function SendRequest(req: RequestData): Promise<ResponseData> {
  if (window.go && window.go.app && window.go.app.App) {
    return window.go.app.App.SendRequest(req);
  }

  // Mock implementation for development environment outside Wails app
  console.warn("Wails runtime environment not detected. Mocking SendRequest.");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message: "Wails dev mock response",
          url: req.url,
          method: req.method,
          bodyType: req.bodyType,
        }, null, 2),
        durationMs: 45,
        size: 104,
      });
    }, 500);
  });
}
