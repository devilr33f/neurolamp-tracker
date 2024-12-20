export class NeurosamaShopService {
  private static LAVA_LAMP_PRODUCT_ID = '8020222902463'
  private static TARGET_QUANTITY = 4000 // @note: can be got from graphql, but who cares?

  static getSoldUnits () {
    return fetch(`https://prod.orders.junipercreates.com/orders/sum?&productIds=${this.LAVA_LAMP_PRODUCT_ID}&startTime=2024-12-19T17:00:00.000Z&endTime=2025-02-10T07:59:00.000Z`, {
      headers: {
        Referer: 'https://neurosama.shop/',
      },
    }).then(r => r.json())
      .then(r => {
        return {
          sold: r.products_details[this.LAVA_LAMP_PRODUCT_ID].units_sold,
          fundingGoal: this.TARGET_QUANTITY,
          fundingPercent: Math.round((r.products_details[this.LAVA_LAMP_PRODUCT_ID].units_sold / this.TARGET_QUANTITY) * 100),
        }
      })
      .catch(() => null)
  }
}
