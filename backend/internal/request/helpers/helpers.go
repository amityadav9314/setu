package helpers

import (
	"aky/setu/backend/internal/request/models"
	"encoding/json"

	"github.com/amityadav9314/aky-go-common/httpclient"
)

// BuildOptions constructs RequestOptions from the Request structure.
func BuildOptions(req *models.Request) *httpclient.RequestOptions {
	opts := &httpclient.RequestOptions{
		Method:  req.Method,
		URL:     req.URL,
		Headers: make(map[string]string),
	}

	// Apply headers
	for k, v := range req.Headers {
		if k != "" {
			opts.Headers[k] = v
		}
	}

	// Apply Content-Type header if not custom defined
	if req.BodyType != "" && opts.Headers["Content-Type"] == "" {
		switch req.BodyType {
		case "JSON":
			opts.Headers["Content-Type"] = "application/json"
		case "UrlEncoded":
			opts.Headers["Content-Type"] = "application/x-www-form-urlencoded"
		case "FormData":
			opts.Headers["Content-Type"] = "multipart/form-data"
		case "Raw":
			opts.Headers["Content-Type"] = "text/plain"
		}
	}

	// Unmarshal request body to avoid double encoding in HTTP client, if it's JSON.
	if req.Body != "" {
		if req.BodyType == "JSON" {
			var parsedBody any
			if err := json.Unmarshal([]byte(req.Body), &parsedBody); err == nil {
				opts.Body = parsedBody
			} else {
				// Fallback to raw string if un marshalling fails
				opts.Body = req.Body
			}
		} else {
			opts.Body = req.Body
		}
	}

	return opts
}
