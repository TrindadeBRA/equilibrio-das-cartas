/** @type {import('next').NextConfig} **/
const nextConfig = {
  swcMinify: false, //
  images: {
    domains: ['lucastrindade.dev', 'tailwindui.com', 'equilibriodascartas.thetrinityweb.com.br', 'images.unsplash.com', 'secure.gravatar.com'],
  },
}

module.exports = nextConfig
