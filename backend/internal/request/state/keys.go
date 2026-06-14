package state

import (
	"aky/setu/backend/internal/request/models"
	"time"

	"github.com/amityadav9314/aky-go-common/httpclient"
	"github.com/amityadav9314/aky-go-common/workflow"
)

// Declare typed workflow state keys.
var (
	KeyRequest   = workflow.NewKey[*models.Request]("request")
	KeyOptions   = workflow.NewKey[*httpclient.RequestOptions]("http_options")
	KeyResponse  = workflow.NewKey[*models.Response]("response")
	KeyStartTime = workflow.NewKey[time.Time]("start_time")
)
