PATH := ./node_modules/.bin:${PATH}

.PHONY: bootstrap dev build build/docker

bootstrap:
	yarn install

.ONESHELL:
dev:
	@echo starting dev server of table-reservation-service, admin-portal and custom portal
	export SERVICE_BASE_URL=http://localhost:3000; \
	export ADMIN_PORTAL_PORT=3001; \
	export CUSTOMER_PORTAL_PORT=3002; \
	lerna run dev

build:
	@ cat << EOF
	set environment variables as following(custom the values as they should be) before performing the build
	export SERVICE_BASE_URL=http://localhost:3000
	EOF
	lerna run build

build/docker:
	@echo "No available at Root. Please go to each package folder."
	
