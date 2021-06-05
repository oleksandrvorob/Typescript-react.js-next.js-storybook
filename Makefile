CURRENT_VERSION = $(shell git rev-parse HEAD | cut -c1-7)

APP_NAME = quanta-platform
DOCKER_IMAGE = quanta/platform
DOCKER_URL = 511779901106.dkr.ecr.us-west-2.amazonaws.com
DOCKER_DEPLOY_IMAGE = $(DOCKER_URL)/$(APP_NAME)

# cnf ?= config.env
# include $(cnf)
# export $(shell sed 's/=.*//' $(cnf))

docker/build:
	docker build -t $(DOCKER_IMAGE) .

docker/run:
	docker run -p 3000:3000 \
	--volume //Users/andrewbrown/src/github.com/quantafinance/quanta-platform/:/opt/app \
	$(DOCKER_IMAGE) npm run start

# Login with ecr
docker/login:
	$ aws ecr get-login-password --region us-west-2 --profile=quanta \
	 | docker login --username AWS --password-stdin $(DOCKER_URL)

# Tag docker image
docker/tag:
	docker tag $(DOCKER_IMAGE) $(DOCKER_DEPLOY_IMAGE):$(CURRENT_VERSION)

# Push to registry
docker/push:
	docker push $(DOCKER_DEPLOY_IMAGE):$(CURRENT_VERSION)

# Build docker image and push to AWS registry
docker/build-and-push: docker/login docker/build docker/tag docker/push
