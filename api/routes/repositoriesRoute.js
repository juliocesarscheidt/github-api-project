const RepositoriesController = require('../controllers/repositoriesController');

module.exports = (router) => {
  const repositoriesController = new RepositoriesController();

  router.get('/repositories/:username', [], function(req, res) {
    return repositoriesController.find(req, res);
  });

  router.get('/repositories/:username/topics', [], function(req, res) {
    return repositoriesController.findTopics(req, res);
  });

  router.get('/repositories/:username/languages', [], function(req, res) {
    return repositoriesController.findLanguages(req, res);
  });
};
