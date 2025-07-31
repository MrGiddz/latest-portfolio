/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mideolaniyi.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
