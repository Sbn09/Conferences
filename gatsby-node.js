const fetch = require('node-fetch');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const response = await fetch('http://localhost:4555/conferences');
  const conferences = await response.json();

  conferences.forEach(conference => {
    createPage({
      path: `/conference/${conference.id}`,
      component: require.resolve(`./src/templates/conference.js`),
      context: {
        conference,
      },
    });
  });
};
