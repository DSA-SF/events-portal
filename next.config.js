/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },

};
const withImages = require("next-images");
const { withGlobalCss } = require("next-global-css");

const withConfig = withGlobalCss();

module.exports = withConfig(withImages(nextConfig));