/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mideolaniyi.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [],
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://mideolaniyi.com/sitemap.xml"],
  },
};
