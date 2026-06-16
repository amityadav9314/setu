package models

import (
	"net/http"
	"time"
)

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

type Method string

const (
	MethodGet     Method = http.MethodGet
	MethodPost    Method = http.MethodPost
	MethodPut     Method = http.MethodPut
	MethodPatch   Method = http.MethodPatch
	MethodDelete  Method = http.MethodDelete
	MethodHead    Method = http.MethodHead
	MethodOptions Method = http.MethodOptions
)

type HistoryItem struct {
	ID         string    `json:"id"`
	URL        string    `json:"url"`
	HTTPMethod Method    `json:"http_method"`
	Request    Request   `json:"request"`
	Timestamp  time.Time `json:"timestamp"`
}
