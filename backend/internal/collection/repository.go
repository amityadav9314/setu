package collection

// Repository defines operations on collection storage.
type Repository interface {
	Save(collection *Collection) error
	FindByID(id string) (*Collection, error)
	FindAll() ([]*Collection, error)
	Delete(id string) error
}

// FileRepository implements Repository using local JSON files.
type FileRepository struct {
	storagePath string
}

// NewFileRepository creates a new File Repository.
func NewFileRepository(storagePath string) *FileRepository {
	return &FileRepository{
		storagePath: storagePath,
	}
}

func (r *FileRepository) Save(collection *Collection) error {
	// TODO: Implement file write
	return nil
}

func (r *FileRepository) FindByID(id string) (*Collection, error) {
	// TODO: Implement file read
	return nil, nil
}

func (r *FileRepository) FindAll() ([]*Collection, error) {
	// TODO: Implement directory list & file read
	return nil, nil
}

func (r *FileRepository) Delete(id string) error {
	// TODO: Implement file delete
	return nil
}
