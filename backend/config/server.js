module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', process.env.PORT || 3002),
});
