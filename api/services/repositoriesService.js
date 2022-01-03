const { gql } = require('graphql-request');
const { getGraphqlClient } = require('../common/graphqlClient');

class RepositoriesService {

  constructor() {
    console.log('[INFO] RepositoriesService init');
    this.graphqlClient = getGraphqlClient();
  }

  async getRepositories(repoOwnerName, maxRepos = 50) {
    const variables = {};
    const query = gql`{
      repositoryOwner(login: "${repoOwnerName}") {
        repositories(first: ${maxRepos}) {
          edges { cursor }
          nodes {
            name
            description
            repositoryTopics(first: ${maxRepos}) {
              nodes { topic { name } }
            }
            languages(first: ${maxRepos}) {
              nodes { name color }
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
    const data = await this.graphqlClient.request(query, variables);
    const { nodes } = data.repositoryOwner.repositories;
    let response = [];
    nodes.map((node) => {
      const { name, description, repositoryTopics, languages } = node;
      response.push({
        name,
        description,
        topics: repositoryTopics.nodes.map(it => it.topic.name.toString().trim().toLowerCase()),
        languages: languages.nodes.map(it => it.name.toString().trim().toLowerCase()),
      });
    });
    return response;
  }

  async getRepositoriesTopics(repoOwnerName, maxRepos = 50) {
    const variables = {};
    const query = gql`{
      repositoryOwner(login: "${repoOwnerName}") {
        repositories(first: ${maxRepos}) {
          edges { cursor }
          nodes {
            repositoryTopics(first: ${maxRepos}) {
              nodes { topic { name } }
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
    const data = await this.graphqlClient.request(query, variables);
    const { nodes } = data.repositoryOwner.repositories;
    let response = [];
    nodes.map((node) => {
      response.push(node.repositoryTopics.nodes
        .map(it => it.topic.name.toString().trim().toLowerCase()));
    });
    return [...new Set(response.flat())];
  }

  async getRepositoriesLanguages(repoOwnerName, maxRepos = 50) {
    const variables = {};
    const query = gql`{
      repositoryOwner(login: "${repoOwnerName}") {
        repositories(first: ${maxRepos}) {
          edges { cursor }
          nodes {
            languages(first: ${maxRepos}) {
              nodes { name color }
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
    const data = await this.graphqlClient.request(query, variables);
    const { nodes } = data.repositoryOwner.repositories;
    let response = [];
    nodes.map((node) => {
      response.push(node.languages.nodes
        .map(it => it.name.toString().trim().toLowerCase()));
    });
    return [...new Set(response.flat())];
  }
}

module.exports = RepositoriesService;
