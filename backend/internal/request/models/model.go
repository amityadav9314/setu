package models

// Request represents an API request structure.
type Request struct {
	ID       string            `json:"id"`
	Method   string            `json:"method"`
	URL      string            `json:"url"`
	Headers  map[string]string `json:"headers"`
	Body     string            `json:"body"`
	BodyType string            `json:"bodyType"` // JSON, FormData, UrlEncoded, Raw
}

// Response represents the result of the API request execution.
type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
	DurationMs int64             `json:"durationMs"`
	Size       int64             `json:"size"`
}
