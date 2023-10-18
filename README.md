# Wrapper REST API for Github GraphQL API

## Up and Running

```bash
docker-compose build api

docker-compose up -d api

docker-compose logs -f --tail 50 api
```

## Try API

> List repositories

```bash
# repositories by owner
curl --silent -X GET \
  --url 'http://localhost:3030/api/v1/repositories/<GITHUB_REPO_OWNER_NAME>'

# topics/tags by owner
curl --silent -X GET \
  --url 'http://localhost:3030/api/v1/repositories/<GITHUB_REPO_OWNER_NAME>/topics'

# languages by owner
curl --silent -X GET \
  --url 'http://localhost:3030/api/v1/repositories/<GITHUB_REPO_OWNER_NAME>/languages'
```
