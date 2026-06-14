package environment

// Service manages loading, saving, and resolving environment variables.
type Service struct{}

// NewService creates a new Environment Service.
func NewService() *Service {
	return &Service{}
}

// Resolve replaces placeholders in raw text with values from current context.
func (s *Service) Resolve(value string, variables map[string]string) string {
	// TODO: Replace curly brace placeholders e.g., {{baseUrl}}
	return value
}
