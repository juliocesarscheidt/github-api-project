
const NodeCache = require('node-cache');
const RepositoriesService = require('../services/repositoriesService');

class RepositoriesController {

  constructor() {
    console.log('[INFO] RepositoriesController init');
    this.repositoriesService = new RepositoriesService();
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  validateUsernameParams(req, res) {
    const { username } = req.params;
    if (!username || !username.trim()) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'invalid_parameters' });
    }
  }

  async retrieveCachedData(cacheKey, serviceFn, serviceParam) {
    const dataCached = this.cache.get(cacheKey);
    if (dataCached === undefined || dataCached === null) {
      console.log('[INFO] Cache Miss :: Retrieving data from Github API');
      const data = await this.repositoriesService[serviceFn](serviceParam);
      this.cache.set(cacheKey, JSON.stringify(data), 60 * 1000);
      return data

    } else {
      console.log('[INFO] Cache Hit');
      return JSON.parse(dataCached)
    }
  }

  async find(req, res) {
    try {
      this.validateUsernameParams(req, res);
      const { username } = req.params;
      const cacheKey = `/repositories/${username}`;
      console.log('[INFO] Cache Key', cacheKey);
      const data = await this.retrieveCachedData(cacheKey, 'getRepositories', username);
      return res
        .status(200)
        .json({ status: 'OK', data });

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'ERROR', message: 'internal_server_error' });
    }
  }

  async findTopics(req, res) {
    try {
      this.validateUsernameParams(req, res);
      const { username } = req.params;
      const cacheKey = `/repositories/${username}/topics`;
      console.log('[INFO] Cache Key', cacheKey);
      const data = await this.retrieveCachedData(cacheKey, 'getRepositoriesTopics', username);
      return res
        .status(200)
        .json({ status: 'OK', data });

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'ERROR', message: 'internal_server_error' });
    }
  }

  async findLanguages(req, res) {
    try {
      this.validateUsernameParams(req, res);
      const { username } = req.params;
      const cacheKey = `/repositories/${username}/languages`;
      console.log('[INFO] Cache Key', cacheKey);
      const data = await this.retrieveCachedData(cacheKey, 'getRepositoriesLanguages', username);
      return res
        .status(200)
        .json({ status: 'OK', data });

    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ status: 'ERROR', message: 'internal_server_error' });
    }
  }
}

module.exports = RepositoriesController;
