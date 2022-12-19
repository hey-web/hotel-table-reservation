PATH := ./node_modules/.bin:${PATH}

.PHONY: build/docker

build/docker:
	docker build -t table-reservation-service -f ./Dockerfile .