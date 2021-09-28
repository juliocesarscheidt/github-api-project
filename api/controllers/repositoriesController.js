const RepositoriesService = require('../services/repositoriesService');

class RepositoriesController {

  constructor() {
    console.log('[INFO] RepositoriesController init');
    this.repositoriesService = new RepositoriesService();
  }

  validateUsernameParams(req, res) {
    const { username } = req.params;
    if (!username || !username.trim()) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'invalid_parameters' });
    }
  }

  async find(req, res) {
    try {
      this.validateUsernameParams(req, res);
      const { username } = req.params;
      const data = await this.repositoriesService.getRepositories(username);
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
      const data = await this.repositoriesService.getRepositoriesTopics(username);
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
      const data = await this.repositoriesService.getRepositoriesLanguages(username);
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
