up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose exec --no-TTY node yarn compile

build-watch:
	docker-compose exec node yarn compile:watch

test:
	docker-compose exec --no-TTY node yarn test

test-watch:
	docker-compose exec node yarn test:watch

bash:
	docker-compose exec node bash

pre-commit: build test


install: install-githooks

install-githooks:
	chmod +x githooks/*
	cp githooks/* .git/hooks/
.PHONY: install-githooks
