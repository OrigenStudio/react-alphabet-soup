module.exports = {
  siteMetadata: {
    title: `React Alphabet Soup`,
    description: `Create super cool text animations based on an alphabet soup concept`,
    author: `@origenstudio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `react-alphabet-soup`,
        short_name: `RAS`,
        start_url: `/`,
        background_color: `#42f4cb`,
        theme_color: `#42f4cb`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
