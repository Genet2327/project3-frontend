module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/schedule-frontend-vue2/',
  transpileDependencies: ['vuetify'],
}

