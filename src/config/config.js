module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'libraryDevelopment',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'libraryDevelopment',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'libraryDevelopment',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}
