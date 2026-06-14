package request

import "context"

// Service handles higher level request logic.
type Service struct {
	executor *Executor
}

// NewService creates a new Request Service.
func NewService(executor *Executor) *Service {
	return &Service{
		executor: executor,
	}
}

// SendRequest sends a request and returns the response.
func (s *Service) SendRequest(ctx context.Context, req *Request) (*Response, error) {
	return s.executor.Execute(ctx, req)
}
