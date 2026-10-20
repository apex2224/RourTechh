/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "img-src 'self' data: blob: https: http:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "connect-src 'self' https://*.firebaseio.com https://*.firebaseapp.com https://*.googleapis.com https://*.gstatic.com",
              "frame-src 'self' https://*.firebaseapp.com",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/src/assets/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
