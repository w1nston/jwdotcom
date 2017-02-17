const contentId = 'blog-content';

module.exports = {
  contentId,

  index(request, response) {
    response.render('blog', { contentId })
  },
};
