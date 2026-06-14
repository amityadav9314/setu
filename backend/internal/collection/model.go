package collection

import "aky/setu/backend/internal/request"

// Collection holds a group of requests, sub-folders, and variables.
type Collection struct {
	ID        string            `json:"id"`
	Name      string            `json:"name"`
	Folders   []Folder          `json:"folders"`
	Requests  []request.Request `json:"requests"`
	Variables map[string]string `json:"variables"`
}

// Folder structures requests inside a Collection.
type Folder struct {
	ID       string            `json:"id"`
	Name     string            `json:"name"`
	Requests []request.Request `json:"requests"`
	Folders  []Folder          `json:"folders"`
}
