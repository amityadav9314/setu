package app

import (
	"aky/setu/backend/internal/config"
	"aky/setu/backend/internal/history"
	"context"
	"fmt"

	"aky/setu/backend/internal/request"
)

// App struct represents the Wails application controller.
type App struct {
	ctx            context.Context
	requestService *request.Service
	historyService *history.Service
	config         config.Config
}

// NewApp creates a new App struct instance.
func NewApp() *App {
	sysConfig := config.LoadConfig()
	reqService := request.NewService()
	historyService := history.NewService(sysConfig)

	return &App{
		requestService: reqService,
		config:         sysConfig,
		historyService: historyService,
	}
}

// Startup is called when the app starts. The context is saved
// so we can call runtime methods.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name (sample endpoint for verification).
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, welcome to Setu!", name)
}

// SendRequest executes an API request natively through the Go HTTP client.
func (a *App) SendRequest(req request.Request) (*request.Response, error) {
	return a.requestService.SendRequest(a.ctx, &req)
}
