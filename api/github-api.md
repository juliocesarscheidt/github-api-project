# GitHub API

```bash
curl "https://api.github.com/users/juliocesarscheidt/repos?per_page=10"


curl --silent \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.mercy-preview+json" \
  'https://api.github.com/users/juliocesarscheidt/repos?per_page=10' | jq -r '.[] |  {"name": .name, "topics": .topics}'
{
  "name": "confd-project",
  "topics": [
    "confd",
    "docker"
  ]
}


curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com

curl -u "juliocesarscheidt:$GITHUB_TOKEN" https://api.github.com


curl --silent -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/users/juliocesarscheidt/repos?per_page=10" | jq -r '.[].private'



# graphql
export GITHUB_TOKEN=''

curl -H "Authorization: bearer $GITHUB_TOKEN" "https://api.github.com/graphql"


curl -H "Authorization: bearer $GITHUB_TOKEN" -X POST --url "https://api.github.com/graphql" -d '{"query": "query { viewer { login } }" }'
# {"data":{"viewer":{"login":"juliocesarscheidt"}}}


curl -H "Authorization: bearer $GITHUB_TOKEN" -X POST --url "https://api.github.com/graphql" -d '{ "query": "query { repositoryOwner(login: juliocesarscheidt) { repositories { totalCount } } }" }'

```
