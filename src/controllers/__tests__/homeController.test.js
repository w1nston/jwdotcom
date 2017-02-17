const homeController = require('../homeController');

describe('homeController', () => {
  it('exposes a contentId', () => {
    expect(homeController.contentId).toBe('home-content');
  });

  describe('GET index', () => {
    it('renders the appropriate view', () => {
      const response = { render: jest.fn() };
      homeController.index(null, response);
      expect(response.render).toHaveBeenCalledWith(
        'home',
        { contentId: homeController.contentId }
      );
    });
  });
});
