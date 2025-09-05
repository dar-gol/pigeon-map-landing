const createNextIntlPlugin = require("next-intl/plugin");

const withPWA = require("next-pwa")({
  dest: "public",
  register: false, // We'll handle registration manually
  skipWaiting: true, // Wymusza natychmiastową aktualizację
  disable: process.env.NODE_ENV === "development",
  scope: "/",
  sw: "dashboard-sw.js",
  // Disable precaching to avoid 404 errors
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  // Exclude all build files to prevent 404 errors
  buildExcludes: [/.*$/],
  // Only include essential PWA files
  publicExcludes: [
    "**/*",
    "!dashboard-manifest.json",
    "!dashboard-pwa.js",
    "!dashboard-icon-*.png",
  ],
  runtimeCaching: [
    // Cache dashboard routes
    {
      urlPattern: /^https:\/\/pigeon-map\.digging\.pl\/dashboard/,
      handler: "NetworkFirst",
      options: {
        cacheName: "dashboard-pages-v0.2.6",
        networkTimeoutSeconds: 5,
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
    // Cache static assets
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-images-v0.2.6",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    // Cache CSS and JS files
    {
      urlPattern: /\.(?:js|css)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources-v0.2.6",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
});

const nextConfig = {
  output: "standalone",
  typescript: {
    // Disable type checking during build due to next-pwa compatibility issues
    ignoreBuildErrors: true,
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },

  // Redirects for SEO and PWA
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      // PWA start_url redirects
      {
        source: "/dashboard",
        destination: "/dashboard/map",
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(withPWA(nextConfig));
