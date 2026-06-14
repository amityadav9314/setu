package request

import (
	"context"
	"io"
	"net/http"
	"strings"
	"time"
)

// Executor executes HTTP requests.
type Executor struct {
	client *http.Client
}

// NewExecutor creates a new Request Executor.
func NewExecutor() *Executor {
	return &Executor{
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// Execute performs the HTTP request defined in the Request struct.
func (e *Executor) Execute(ctx context.Context, req *Request) (*Response, error) {
	var bodyReader io.Reader
	if req.Body != "" {
		bodyReader = strings.NewReader(req.Body)
	}

	httpReq, err := http.NewRequestWithContext(ctx, req.Method, req.URL, bodyReader)
	if err != nil {
		return nil, err
	}

	// Apply headers
	for k, v := range req.Headers {
		if k != "" {
			httpReq.Header.Set(k, v)
		}
	}

	// Apply Content-Type header if not custom defined
	if req.BodyType != "" && httpReq.Header.Get("Content-Type") == "" {
		switch req.BodyType {
		case "JSON":
			httpReq.Header.Set("Content-Type", "application/json")
		case "UrlEncoded":
			httpReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		case "FormData":
			httpReq.Header.Set("Content-Type", "multipart/form-data")
		case "Raw":
			httpReq.Header.Set("Content-Type", "text/plain")
		}
	}

	startTime := time.Now()
	resp, err := e.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	duration := time.Since(startTime)

	respBodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	respHeaders := make(map[string]string)
	for k, values := range resp.Header {
		if len(values) > 0 {
			respHeaders[k] = values[0]
		}
	}

	return &Response{
		StatusCode: resp.StatusCode,
		Headers:    respHeaders,
		Body:       string(respBodyBytes),
		DurationMs: duration.Milliseconds(),
		Size:       int64(len(respBodyBytes)),
	}, nil
}
