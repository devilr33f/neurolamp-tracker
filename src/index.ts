import { oneLine } from 'common-tags'
import { schedule } from 'node-cron'

import { NeurosamaShopService } from './services/neurosama-shop.js'
import { TelegramService } from './services/telegram.js'

let CACHE = 0

const init = async () => {
  schedule('* * * * *', async () => {
    const soldUnits = await NeurosamaShopService.getSoldUnits()
    if (!soldUnits) {
      console.warn('[!] Failed to fetch sold units')
      return
    }

    if (soldUnits.sold !== CACHE) {
      CACHE = soldUnits.sold

      const message = oneLine`
      <a href="https://neurosama.shop/p/8020222902463">Neuro-Sama's Lava Lamp</a> sold <b>${soldUnits.sold}</b> units <i>(${soldUnits.fundingPercent}% of ${soldUnits.fundingGoal} units)</i>
    `

      TelegramService.sendMessage(message)
    }
  })
}

init()
