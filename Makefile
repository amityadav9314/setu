.PHONY: build dev clean install frontend-build backend-build

build: install frontend-build backend-build

install:
	cd frontend && npm install
	cd backend && go mod tidy

frontend-build:
	cd frontend && npm run build

backend-build:
	@echo "Configuring temporary wails.json and copying frontend assets..."
	@mkdir -p backend/cmd/setu/frontend
	@cp -r frontend/dist backend/cmd/setu/frontend/
	@cp wails.json backend/cmd/setu/wails.json
	@sed -i 's|"frontend:dir": "frontend"|"frontend:dir": "../../../frontend"|g' backend/cmd/setu/wails.json
	@sed -i 's|"wailsjsdir": "./frontend/src/wailsjs"|"wailsjsdir": "../../../frontend/src/wailsjs"|g' backend/cmd/setu/wails.json
	cd backend/cmd/setu && ~/go/bin/wails build -tags webkit2_41 -o ../../../build/bin/setu
	@rm -rf backend/cmd/setu/frontend
	@rm -f backend/cmd/setu/wails.json

dev:
	@echo "Configuring temporary wails.json and copying frontend assets for dev startup..."
	@mkdir -p backend/cmd/setu/frontend/dist
	@touch backend/cmd/setu/frontend/dist/placeholder
	@cp wails.json backend/cmd/setu/wails.json
	@sed -i 's|"frontend:dir": "frontend"|"frontend:dir": "../../../frontend"|g' backend/cmd/setu/wails.json
	@sed -i 's|"wailsjsdir": "./frontend/src/wailsjs"|"wailsjsdir": "../../../frontend/src/wailsjs"|g' backend/cmd/setu/wails.json
	cd backend/cmd/setu && ~/go/bin/wails dev -tags webkit2_41
	@rm -rf backend/cmd/setu/frontend
	@rm -f backend/cmd/setu/wails.json

clean:
	rm -rf frontend/dist
	rm -rf build/bin
	rm -rf backend/cmd/setu/frontend
	rm -f backend/cmd/setu/wails.json
