module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '06331bd72dab937c6f1a7240bc19214d'),
  },
});
