const fs = require('fs');
const { GraphQLClient, gql } = require('graphql-request');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com/graphql'

const getGraphqlClient = () => {
  const headers = { Authorization: `bearer ${GITHUB_TOKEN}` };
  return new GraphQLClient(GITHUB_API_URL, { headers });
}

const getRepositories = async (repoOwnerName, maxRepos = 50) => {
  const client = await getGraphqlClient();

  const variables = {};
  const query = gql`{
    repositoryOwner(login: "${repoOwnerName}") {
      repositories(first: ${maxRepos}) {
        edges { cursor }
        nodes {
          name
          description
          isPrivate
          isArchived
          isFork
          isLocked
          forks {
            totalCount
          }
          issues {
            totalCount
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
          pullRequests {
            totalCount
          }
          repositoryTopics(first: 50) {
            nodes { topic { name } }
          }
          labels(first: 50) {
            nodes { name color description }
          }
          languages(first: 50) {
            nodes { name color }
          }
          collaborators {
            nodes { email bio company name }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        totalCount
      }
    }
  }`;
  // console.log(query);

  // const data = await client.request(query, variables);
  // try {
  //   fs.writeFileSync('./response.json', JSON.stringify(data));
  // } catch (err) {
  //   console.error(err);
  // }

  let data = null;
  try {
    data = fs.readFileSync('response.json');
  } catch (err) {
    console.error(err);
  }
  data = JSON.parse(data);

  const repositories = data.repositoryOwner.repositories;
  const { edges, nodes, pageInfo, totalCount } = repositories;

  let allTopics = [];
  let allLanguages = [];
  let allCollaborators = [];

  const responseRepos = [];

  nodes.map((node) => {
    const { name, description } = node;

    const topics = node.repositoryTopics.nodes;
    const languages = node.languages.nodes;
    const collaborators = node.collaborators.nodes;

    responseRepos.push({
      name,
      description,
      topics,
      languages,
      collaborators,
    });

    topics.forEach(it => {
      if (it.name) allTopics[it.name] = !!allTopics[it.name] ? allTopics[it.name] + 1 : 1;
    });
    languages.forEach(it => {
      if (it.name) allLanguages[it.name] = !!allLanguages[it.name] ? allLanguages[it.name] + 1 : 1;
    });
    collaborators.forEach(it => {
      if (it.name) allCollaborators[it.name] = !!allCollaborators[it.name] ? allCollaborators[it.name] + 1 : 1;
    });
  });

  console.log('allTopics', allTopics);
  console.log('allLanguages', allLanguages);
  console.log('allCollaborators', allCollaborators);

  return responseRepos;
}

(async () => {
  const responseRepos = await getRepositories('juliocesarscheidt');
  console.log('responseRepos', responseRepos);
})();
