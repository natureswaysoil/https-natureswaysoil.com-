 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.txt b/README.txt
index 7632827d8e687ae4c0a4188621cc22ca498183c9..1549d1acd3f431cb6843316224955b50948533d8 100644
--- a/README.txt
+++ b/README.txt
@@ -1,16 +1,22 @@
 
 Minimal On‑Site Stripe (Elements) — Tiny Bundle
 -----------------------------------------------
 Files:
 - components/CheckoutForm.tsx
 - pages/checkout.tsx
 - pages/api/stripe/create-intent.ts
 - pages/api/stripe/webhook.ts
 - lib/cart.ts
 
 ENV (Vercel):
 - STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 - STRIPE_WEBHOOK_SECRET
 - MAKE_WEBHOOK_URL
 
 Link Buy buttons to: `/checkout?slug=<slug>&qty=1`
+
+CMS (Contentful):
+- CONTENTFUL_SPACE_ID
+- CONTENTFUL_ACCESS_TOKEN
+- CONTENTFUL_ENTRY_ID
+If these are not set, default landing page copy, images, and video are used.
 
EOF
)
