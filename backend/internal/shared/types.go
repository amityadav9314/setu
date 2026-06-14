package shared

// KeyValue represents a general string-to-string dictionary-friendly row.
type KeyValue struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}
