package history

import (
	"net/http"
	"time"

	"aky/setu/backend/internal/request"
)

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
	ID         string          `json:"id"`
	URL        string          `json:"url"`
	HTTPMethod Method          `json:"http_method"`
	Request    request.Request `json:"request"`
	Timestamp  time.Time       `json:"timestamp"`
}
