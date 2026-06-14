package storage

import (
	"github.com/amityadav9314/aky-go-common/file"
)

// FileSystem abstraction for file read/write operations.
type FileSystem struct {
	handler *file.Handler
}

// NewFileSystem creates a new FileSystem utility instance.
func NewFileSystem(baseDir string) (*FileSystem, error) {
	locker := file.NewLockerPerFile()
	handler, err := file.NewFileHandler(baseDir, locker)
	if err != nil {
		return nil, err
	}
	return &FileSystem{
		handler: handler,
	}, nil
}

// WriteFile writes bytes to path.
func (fs *FileSystem) WriteFile(fileName string, data []byte) error {
	return fs.handler.Write(fileName, data)
}

// ReadFile reads bytes from path.
func (fs *FileSystem) ReadFile(fileName string) ([]byte, error) {
	return fs.handler.Read(fileName)
}

// DeleteFile deletes the file.
func (fs *FileSystem) DeleteFile(fileName string) error {
	return fs.handler.Delete(fileName)
}

// Exists checks if the file exists.
func (fs *FileSystem) Exists(fileName string) bool {
	return fs.handler.Exists(fileName)
}
