const contentId = 'home-content';

module.exports = {
  contentId,

  index(request, response) {
    response.render('home', { contentId });
  }
};
