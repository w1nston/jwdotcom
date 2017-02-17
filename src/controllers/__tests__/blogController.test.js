const blogController = require('../blogController');

describe('blogController', () => {
  it('exposes a contentId', () => {
    expect(blogController.contentId).toBe('blog-content');
  });

  describe('GET index', () => {
    it('renders the appropriate view', () => {
      const response = { render: jest.fn() };
      blogController.index(null, response);
      expect(response.render).toHaveBeenCalledWith(
        'blog',
        { contentId: blogController.contentId }
      );
    });
  });
});
