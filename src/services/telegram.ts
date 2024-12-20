import { Telegram } from 'wrappergram'

import config from '@/config.js'

export class TelegramService {
  private static telegram = new Telegram(config.telegram.token)

  public static sendMessage (message: string) {
    return this.telegram.api.sendMessage({
      chat_id: config.telegram.chatId,
      parse_mode: 'HTML',
      text: message,
      link_preview_options: {
        is_disabled: true,
      },
    })
  }
}
