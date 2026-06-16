package request

import (
	"aky/setu/backend/internal/config"
	"aky/setu/backend/internal/history"
	"aky/setu/backend/internal/request/models"
	"context"

	"aky/setu/backend/internal/request/state"
	"aky/setu/backend/internal/request/tasks"

	"github.com/amityadav9314/aky-go-common/workflow"
)

// Request Type aliases to preserve API compatibility and prevent circular dependencies.
type Request = models.Request
type Response = models.Response

type Service struct {
	sysConfig      config.Config
	historyService *history.Service
}

// NewService creates a new Request Service.
func NewService(sysConfig config.Config) *Service {
	hs := history.NewService(sysConfig)
	return &Service{
		sysConfig:      sysConfig,
		historyService: hs,
	}
}

// SendRequest sends a request and returns the response.
func (s *Service) SendRequest(ctx context.Context, req *Request) (*Response, error) {
	b := workflow.NewBuilder()
	workflow.SetValue(b, state.KeyRequest, req)
	workflow.SetValue(b, state.KeyHistoryService, s.historyService)

	// Define the execution chain using tasks from the tasks subpackage.
	chain := workflow.Define(b.Build(), tasks.PrepareRequestTask{}).
		Next(tasks.HTTPExecutionTask{}).
		Next(tasks.LoggingTask{}).
		Next(tasks.SaveHistoryTask{})

	finalState, err := chain.Execute(ctx)
	if err != nil {
		return nil, err
	}

	return workflow.GetRequiredValue(finalState, state.KeyResponse)
}
