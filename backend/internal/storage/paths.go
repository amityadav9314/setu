package storage

// PathResolver maps OS-specific directories for storing local app data.
type PathResolver struct {
	baseDir string
}

// NewPathResolver creates a new PathResolver instance.
func NewPathResolver(baseDir string) *PathResolver {
	return &PathResolver{
		baseDir: baseDir,
	}
}

// GetCollectionsPath returns directory path for Collections storage.
func (p *PathResolver) GetCollectionsPath() string {
	// TODO: OS specific paths
	return ""
}

// GetHistoryPath returns directory path for history data storage.
func (p *PathResolver) GetHistoryPath() string {
	return ""
}
