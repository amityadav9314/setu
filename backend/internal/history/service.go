package history

import (
	"aky/setu/backend/internal/config"
	"aky/setu/backend/internal/request/models"
	"encoding/json"
	"fmt"
	"sort"
	"time"

	"github.com/amityadav9314/aky-go-common/file"
	"github.com/google/uuid"
)

// Service handles saving and retrieving historical request logs.
type Service struct {
	maxItems    int
	fileHandler *file.Handler
}

// NewService creates a new History Service with a max limit.
func NewService(config config.Config) *Service {
	baseDir := fmt.Sprintf("%s/%s", config.StoragePath, "history")
	locker := file.NewLockerPerFile()
	fileHandler, err := file.NewFileHandler(baseDir, locker)
	if err != nil {
		panic(err)
	}
	return &Service{
		maxItems:    config.MaxHistoryItems,
		fileHandler: fileHandler,
	}
}

// Add appends a new item and prunes history if max limit is reached.
func (s *Service) Add(item *models.HistoryItem) error {
	uuid.NewString()
	ns := time.Now().UnixNano()
	fileName := fmt.Sprintf("%d.json", ns)
	data, err := json.Marshal(&item)
	if err != nil {
		return err
	}
	return s.fileHandler.Write(fileName, data)
}

// GetAll returns history list sorted by timestamp.
func (s *Service) GetAll() ([]*models.HistoryItem, error) {
	files, err := s.fileHandler.List()
	if err != nil {
		return nil, err
	}

	sort.Strings(files) // timestamp filenames sort naturally

	items := make([]*models.HistoryItem, 0, len(files))

	for _, thisFile := range files {
		data, err := s.fileHandler.Read(thisFile)
		if err != nil {
			return nil, err
		}

		var item models.HistoryItem

		if err := json.Unmarshal(data, &item); err != nil {
			return nil, err
		}

		items = append(items, &item)
	}

	return items, nil
}

// Clear removes all history items.
func (s *Service) Clear() error {
	return s.fileHandler.DeleteAll()
}
