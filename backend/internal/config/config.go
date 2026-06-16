package config

import (
	"os"
	"path/filepath"
)

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
		StoragePath:     resolvePath("~/.config/aky_setu"),
		MaxHistoryItems: 100,
	}
}

func resolvePath(path string) string {
	if len(path) > 0 && path[0] == '~' {
		home, err := os.UserHomeDir()
		if err == nil {
			return filepath.Join(home, path[1:])
		}
	}
	return path
}
