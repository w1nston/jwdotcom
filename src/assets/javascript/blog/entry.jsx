import React from 'react';
import { render } from 'react-dom';
import { contentId } from '../../../controllers/blogController';
import Blog from './components/blog';

render(<Blog/>, document.getElementById(contentId));
