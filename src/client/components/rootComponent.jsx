import React from 'react';
import { Link, Route } from 'react-router-dom';
import HomePage from './homePage';
import BlogPage from './blogPage';

export default function RootComponent({ Router, location, context }) {
  return (
    <Router location={location} context={context}>
      <div>
        <nav className="navigation-container">
          <img
            className="navigation-container__logo"
            src="/assets/images/jwlogo.svg"
          />
          <ul className="navigation-container__items">
            <li className="navigation-container__item"><Link to="/">Home</Link></li>
            <li className="navigation-container__item"><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
        <Route exact path="/" component={HomePage} />
        <Route path="/blog" component={BlogPage} />
      </div>
    </Router>
  );
}
