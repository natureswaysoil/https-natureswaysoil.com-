 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/next-env.d.ts b/next-env.d.ts
index 4f11a03dc6cc37f2b5105c08f2e7b24c603ab2f4..725dd6f245153034160edeb040f0846109714ce3 100644
--- a/next-env.d.ts
+++ b/next-env.d.ts
@@ -1,5 +1,6 @@
 /// <reference types="next" />
 /// <reference types="next/image-types/global" />
+/// <reference types="next/navigation-types/compat/navigation" />
 
 // NOTE: This file should not be edited
-// see https://nextjs.org/docs/basic-features/typescript for more information.
+// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
 
EOF
)
