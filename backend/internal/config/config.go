package config

// Config represents global configuration parameters.
type Config struct {
	AppName         string `json:"appName"`
	Version         string `json:"version"`
	StoragePath     string `json:"storagePath"`
	MaxHistoryItems int    `json:"maxHistoryItems"`
}

// LoadConfig fetches config values from environment or config files.
func LoadConfig() Config {
	return Config{
		AppName:         "Setu",
		Version:         "1.0.0",
		StoragePath:     "~/.config/aky_setu",
		MaxHistoryItems: 100,
	}
}
