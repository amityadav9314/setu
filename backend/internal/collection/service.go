package collection

// Service handles collection business rules.
type Service struct {
	repo Repository
}

// NewService creates a new Collection Service.
func NewService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

// CreateCollection creates and saves a new collection.
func (s *Service) CreateCollection(name string) (*Collection, error) {
	// TODO: Generate ID and initialize Collection
	return nil, nil
}
