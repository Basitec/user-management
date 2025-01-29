/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/users',
            permanent: true, // Use true for a 301 redirect (permanent), false for a 302 (temporary)
          },
        ];
      },
    
    // module.exports = {
        images: {
          domains: ['reqres.in'], // Add the domain hosting the images
        },
    //   };
};

export default nextConfig;
