/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
    env:{
        NEXT_APP_API_URL:process.env.NEXT_APP_API_URL,
    },
    async redirects() {
        return [
          {
            source: "/",
            destination: "/auth/login",
            permanent: true,
          },]}
};

export default nextConfig;
