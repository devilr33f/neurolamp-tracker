import { existsSync } from 'fs'

import dotenv from 'dotenv'
import env from 'env-var'

// @note: this is required mostly for development purposes or non-docker environment
dotenv.config({
  path: (process.env.NODE_ENV === 'development' && existsSync('.env.development')) ? '.env.development' : '.env',
})

export default {
  package: {
    name: env.get('npm_package_name').default('unknown').asString(),
    version: env.get('npm_package_version').default('unknown').asString(),
    mode: env.get('NODE_ENV').default('production').asString(),
  },
  telegram: {
    token: env.get('TELEGRAM_TOKEN').required().asString(),
    chatId: env.get('TELEGRAM_CHAT_ID').required().asInt(),
  },
}
