/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            },
        ];
    },
    reactStrictMode: false
};

export default nextConfig;
