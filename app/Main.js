import React from 'react';
import Router from 'react-router/BrowserRouter';
import Link from 'react-router/Link';
import Match from 'react-router/Match';
import Home from './pages/home/components/Home';
import Blog from './pages/blog/components/Blog';

export default function Main() {
  return (
    <Router>
      <div>
        <section className="navigation-container">
          <img
            className="navigation-container__jw-logo"
            src="public/assets/images/jwlogo.svg" />
          <nav className="navigation-container__nav">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </section>
        <section className="main-content-container">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/blog" component={Blog} />
        </section>
      </div>
    </Router>
  );
}
