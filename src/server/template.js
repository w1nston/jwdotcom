module.exports = function template({ body, state }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link 
          href="https://fonts.googleapis.com/css?family=Fira+Sans|Montserrat"
          rel="stylesheet"
        >
        <link rel="stylesheet" href="/assets/css/index.css" />
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <footer>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
        <script src="/assets/javascript/bundle.js"></script>
      </footer>
    </html>
  `;
};
