up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose exec ${DOCKER_COMPOSE_OPTIONS} node yarn compile

build-watch:
	docker-compose exec node yarn compile:watch

test:
	docker-compose exec ${DOCKER_COMPOSE_OPTIONS} node yarn test

test-watch:
	docker-compose exec node yarn test:watch

bash:
	docker-compose exec node bash

pre-commit:
	# https://stackoverflow.com/questions/68859202/git-hook-hangs-when-launching-docker-compose
	DOCKER_COMPOSE_OPTIONS="-T" $(MAKE) build
	DOCKER_COMPOSE_OPTIONS="-T" $(MAKE) test


install: install-githooks

install-githooks:
	chmod +x githooks/*
	cp githooks/* .git/hooks/
.PHONY: install-githooks
