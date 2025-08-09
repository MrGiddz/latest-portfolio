/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: "lytL2foUlo52N+aubf8m+3gh1BJbrpEH9aaTZkULOjk=",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "tecdn.b-cdn.net",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "readymadeui.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  transpilePackages: ["next-auth"],
};

export default nextConfig;
