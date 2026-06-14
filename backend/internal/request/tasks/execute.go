package tasks

import (
	"aky/setu/backend/internal/request/models"
	"context"
	"errors"
	"time"

	"aky/setu/backend/internal/request/state"

	"github.com/amityadav9314/aky-go-common/httpclient"
	"github.com/amityadav9314/aky-go-common/workflow"
)

type HTTPExecutionTask struct{}

func (HTTPExecutionTask) IsErrorFatal() bool { return true }

func (HTTPExecutionTask) Run(ctx context.Context, s workflow.State) (workflow.State, error) {
	opts, err := workflow.GetRequiredValue(s, state.KeyOptions)
	if err != nil {
		return s, err
	}

	startTime, _ := workflow.GetValue(s, state.KeyStartTime)

	client := httpclient.GetClient()
	httpResp, err := client.Do(ctx, opts)

	var resp *models.Response
	if err != nil {
		var statusErr *httpclient.StatusError
		if errors.As(err, &statusErr) {
			resp = &models.Response{
				StatusCode: statusErr.StatusCode,
				Headers:    make(map[string]string),
				Body:       statusErr.Body,
				DurationMs: time.Since(startTime).Milliseconds(),
				Size:       int64(len(statusErr.Body)),
			}
		}
	} else {
		respHeaders := make(map[string]string)
		for k, values := range httpResp.Header {
			if len(values) > 0 {
				respHeaders[k] = values[0]
			}
		}
		resp = &models.Response{
			StatusCode: httpResp.StatusCode,
			Headers:    respHeaders,
			Body:       string(httpResp.Body),
			DurationMs: time.Since(startTime).Milliseconds(),
			Size:       int64(len(httpResp.Body)),
		}
	}

	b := s.ToBuilder()
	workflow.SetValue(b, state.KeyResponse, resp)
	return b.Build(), nil
}
