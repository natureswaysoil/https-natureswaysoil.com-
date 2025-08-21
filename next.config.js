 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/next.config.js b/next.config.js
index 759cce58c76d98f4007ee467caa52fe9935c3806..97d4370e31055a2d87a5be3164fe3a1a33a1fc11 100644
--- a/next.config.js
+++ b/next.config.js
@@ -1,9 +1,11 @@
 /** @type {import('next').NextConfig} */
 const nextConfig = {
   images: {
     remotePatterns: [{ protocol: 'https', hostname: 'm.media-amazon.com' }],
+    // Disable Next.js Image Optimization since we use a static export
+    unoptimized: true,
   },
   output: 'export',
 };
 
 module.exports = nextConfig;
 
EOF
)
