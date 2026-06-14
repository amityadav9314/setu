package shared

import "errors"

// Global shared errors.
var (
	ErrRequestFailed      = errors.New("request execution failed")
	ErrCollectionNotFound = errors.New("collection not found")
)
