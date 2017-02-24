import React from 'react';
import {
  Link,
  Route,
} from 'react-router-dom';
import HomePage from './homePage';
import BlogPage from './blogPage';

export default function rootComponent({ Router, location, context }) {
  return (
    <Router location={location} context={context}>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
        <Route exact path="/" component={HomePage} />
        <Route path="/blog" component={BlogPage} />
      </div>
    </Router>
  );
};
