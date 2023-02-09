module.exports = {
    port: process.env.PORT || 8080,
    database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/lists-app',
    jwtprivatekey: process.env.JWTPRIVATEKEY || "abcdefg",
    salt: process.env.SALT || 10
}