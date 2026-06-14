package history

import (
	"time"

	"aky/setu/backend/internal/request"
)

// HistoryItem represents a previously executed request record.
type HistoryItem struct {
	ID        string           `json:"id"`
	Request   request.Request  `json:"request"`
	Response  request.Response `json:"response"`
	Timestamp time.Time        `json:"timestamp"`
}
