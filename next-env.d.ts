cat > next-env.d.ts <<'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
EOF

# sanity check
wc -l next-env.d.ts   # should be 2
tail -n +1 next-env.d.ts

