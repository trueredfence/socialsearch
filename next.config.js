/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir: true,
      // serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com', 'api.seon.io'],
      
    },
    // async rewrites() {
    //   return [
    //     {
    //       source: "/api/getemail",
    //       destination: "https://api.seon.io/SeonRestService/email-api/v2.2/asha.baliyan@gmail.com",
    //     },
    //     {
    //       source: "/api/mobile/:path*",
    //       destination: "https://api.seon.io/SeonRestService/phone-api/v1.4/:path*",
    //     },
    //   ];
    // },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig