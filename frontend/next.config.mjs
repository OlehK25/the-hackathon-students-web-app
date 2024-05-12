/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        minimumCacheTTL: 3600,
    },
    env: {
        NEXT_PUBLIC_BACKEND_URL: "http://localhost:5000",
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "qQJIr7QKBPs8mkkcsFbwl4eQCHNcQTg091vvSJYd5qI=",
        GOOGLE_CLIENT_ID:
            "1015110027832-afcp53r2s9f2e1j86dks2bh2jr1oeqb1.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
    },
};


export default nextConfig;