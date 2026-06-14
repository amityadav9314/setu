package history

// Service handles saving and retrieving historical request logs.
type Service struct {
	maxItems int
}

// NewService creates a new History Service with a max limit.
func NewService(maxItems int) *Service {
	return &Service{
		maxItems: maxItems,
	}
}

// Add appends a new item and prunes history if max limit is reached.
func (s *Service) Add(item *HistoryItem) error {
	// TODO: Save history log locally
	return nil
}

// GetAll returns history list sorted by timestamp.
func (s *Service) GetAll() ([]*HistoryItem, error) {
	// TODO: Retrieve history logs
	return nil, nil
}

// Clear removes all history items.
func (s *Service) Clear() error {
	// TODO: Delete history logs
	return nil
}
