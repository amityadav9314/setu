package tasks

import (
	"aky/setu/backend/internal/request/models"
	"aky/setu/backend/internal/request/state"
	"context"
	"fmt"
	"time"

	"github.com/amityadav9314/aky-go-common/logger"
	"github.com/amityadav9314/aky-go-common/workflow"
	"github.com/google/uuid"
)

type SaveHistoryTask struct {
}

func (h SaveHistoryTask) IsErrorFatal() bool {
	// This is not fatal
	return false
}

func (h SaveHistoryTask) Run(ctx context.Context, prevState workflow.State) (workflow.State, error) {
	historyService, err := workflow.GetRequiredValue(prevState, state.KeyHistoryService)
	if err != nil {
		return prevState, err
	}
	req, err := workflow.GetRequiredValue(prevState, state.KeyRequest)
	if err != nil {
		return prevState, err
	}

	historyItem := &models.HistoryItem{
		ID:         uuid.NewString(),
		URL:        req.URL,
		HTTPMethod: models.Method(req.Method),
		Request:    *req,
		Timestamp:  time.Now(),
	}
	err = historyService.Add(historyItem)
	if err != nil {
		logger.Error(ctx, fmt.Sprintf("Failed to save request history: %v", err), "save_history_failure", req, nil)
	}
	return prevState, nil
}
