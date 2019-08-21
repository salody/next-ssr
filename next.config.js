// next.config.js
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

const path = require('path')

/* Without CSS Modules, with PostCSS */
module.exports = withCSS(withLess({
	webpack: function (config) {
		// return {
		// 	resolve: {
		// 		// Add '.ts' and '.tsx' as resolvable extensions.
		// 		extensions: ['.ts', '.tsx', '.js', '.json'],
		// 		alias:      {
		//
		// 		}
		// 	}
		// }

		console.log(path.resolve(__dirname))



		config.resolve.alias['@'] = path.join(__dirname)

		return config
	}
}))

/* With CSS Modules */
// module.exports = withLess({ cssModules: true })

/* With additional configuration on top of CSS Modules */
/*
module.exports = withLess({
  cssModules: true,
  webpack: function (config) {
    return config;
  }
});

 */
