package tasks

import (
	"context"
	"fmt"

	"aky/setu/backend/internal/request/state"

	"github.com/amityadav9314/aky-go-common/logger"
	"github.com/amityadav9314/aky-go-common/workflow"
)

type LoggingTask struct{}

func (LoggingTask) IsErrorFatal() bool { return false }

func (LoggingTask) Run(ctx context.Context, s workflow.State) (workflow.State, error) {
	req, reqExists := workflow.GetValue(s, state.KeyRequest)
	resp, respExists := workflow.GetValue(s, state.KeyResponse)

	if reqExists {
		msg := fmt.Sprintf("Executed HTTP request: %s %s", req.Method, req.URL)
		if respExists {
			logger.Info(ctx, fmt.Sprintf("%s | Status: %d", msg, resp.StatusCode), req, resp)
		} else {
			logger.Info(ctx, msg, req, nil)
		}
	}

	return s, nil
}
