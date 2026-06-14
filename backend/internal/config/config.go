package config

// Config represents global configuration parameters.
type Config struct {
	AppName     string `json:"appName"`
	Version     string `json:"version"`
	StoragePath string `json:"storagePath"`
}

// LoadConfig fetches config values from environment or config files.
func LoadConfig() (*Config, error) {
	return &Config{
		AppName: "Setu",
		Version: "1.0.0",
	}, nil
}
