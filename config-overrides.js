/* config-overrides.js */

module.exports = function override(config, env) {
  // do stuff with the webpack config
  require('react-app-rewire-postcss')(config, {
    ident: 'postcss',
    plugins: [require('tailwindcss'), require('autoprefixer')],
  });
  return config;
};
