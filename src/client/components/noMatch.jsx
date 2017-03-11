import React from 'react';
import DocumentTitle from 'react-document-title';

export default function NoMatch({ location }) {
  return (
    <DocumentTitle title="Page not found">
      <section className="main-content">
        <h1>The page you were looking for was not found!</h1>
        <p>There's no page for {location.pathname}</p>
      </section>
    </DocumentTitle>
  );
}
