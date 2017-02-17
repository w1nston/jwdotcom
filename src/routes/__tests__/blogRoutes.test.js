const express = require('express');
const blogController = require('../../controllers/blogController');

describe('blogRoutes', () => {
  it('maps / to blogController index action', () => {
    const get = jest.fn();
    spyOn(express, 'Router').and.returnValue({ get });
    const router = require('../blogRoutes');
    expect(get).toHaveBeenCalledWith('/', blogController.index);
  });
});