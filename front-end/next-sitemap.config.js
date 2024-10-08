module.exports = {
  siteUrl: 'https://blog.tldrlw.com/',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  additionalPaths: async (config) => {
    const result = [];
    result.push({
      loc: '/blogs/1',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    result.push({
      loc: '/blogs/2',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    result.push({
      loc: '/blogs/3',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    result.push({
      loc: '/blogs/4',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    });
    return result;
  },
};

// https://www.npmjs.com/package/next-sitemap
