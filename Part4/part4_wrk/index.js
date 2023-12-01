const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
// const PASSWORD = 'dKZWcXGVgx8KUf6c'
// const url = `mongodb+srv://fullstack:${PASSWORD}@cluster0.h59eklu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=AtlasApp`

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})