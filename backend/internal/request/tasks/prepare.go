package tasks

import (
	"context"
	"time"

	"aky/setu/backend/internal/request/helpers"
	"aky/setu/backend/internal/request/state"

	"github.com/amityadav9314/aky-go-common/workflow"
)

type PrepareRequestTask struct{}

func (PrepareRequestTask) IsErrorFatal() bool { return true }

func (PrepareRequestTask) Run(ctx context.Context, s workflow.State) (workflow.State, error) {
	req, err := workflow.GetRequiredValue(s, state.KeyRequest)
	if err != nil {
		return s, err
	}

	opts := helpers.BuildOptions(req)

	b := s.ToBuilder()
	workflow.SetValue(b, state.KeyOptions, opts)
	workflow.SetValue(b, state.KeyStartTime, time.Now())
	return b.Build(), nil
}
