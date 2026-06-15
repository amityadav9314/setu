.PHONY: build dev clean install frontend-build backend-build sort_imports cleanup_wails_artifacts

WAILS_VERSION = v2.12.0
WAILS ?= go run github.com/wailsapp/wails/v2/cmd/wails@$(WAILS_VERSION)
WAILS_OUTPUT = setu

build: install frontend-build backend-build sort_imports cleanup_wails_artifacts

install:
	cd frontend && npm install
	cd backend && go mod tidy

frontend-build:
	cd frontend && npm run build

backend-build:
	@echo "Copying frontend assets for backend embed..."
	@mkdir -p backend/cmd/setu/frontend
	@cp -r frontend/dist backend/cmd/setu/frontend/
	cd backend/cmd/setu && $(WAILS) build -tags webkit2_41 -o $(WAILS_OUTPUT)
	@mkdir -p build/bin
	@cp -R backend/cmd/setu/build/bin/* build/bin/
	@rm -rf backend/cmd/setu/build
	@rm -rf backend/cmd/setu/frontend

dev:
	@echo "Preparing frontend asset placeholder for dev startup..."
	@mkdir -p backend/cmd/setu/frontend/dist
	@touch backend/cmd/setu/frontend/dist/placeholder
	cd backend/cmd/setu && $(WAILS) dev -tags webkit2_41
	@rm -rf backend/cmd/setu/frontend

clean:
	rm -rf frontend/dist
	rm -rf build/bin
	rm -rf backend/cmd/setu/frontend
	rm -rf backend/cmd/setu/build

sort_imports:
	@echo "Sorting imports..."
	go run golang.org/x/tools/cmd/goimports@latest -w .

cleanup_wails_artifacts:
	@rm -rf backend/cmd/setu/build
	@rm -rf backend/cmd/setu/frontend
