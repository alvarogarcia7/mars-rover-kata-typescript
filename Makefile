up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose exec node yarn compile

build-watch:
	docker-compose exec node yarn compile:watch

test:
	docker-compose exec node yarn test

test-watch:
	docker-compose exec node yarn test:watch

bash:
	docker-compose exec node bash
