class InventoryPage {
  get title()         { return cy.get('.title') }
  get items()         { return cy.get('.inventory_item') }
  get itemNames()     { return cy.get('.inventory_item_name') }
  get itemPrices()    { return cy.get('.inventory_item_price') }
  get sortDropdown()  { return cy.get('.product_sort_container') }
  get cartBadge()     { return cy.get('.shopping_cart_badge') }
  get cartLink()      { return cy.get('.shopping_cart_link') }

  assertLoaded() {
    this.title.should('be.visible').and('contain.text', 'Products')
    return this
  }

  assertItemCount(count) {
    this.items.should('have.length', count)
    return this
  }

  sortBy(value) {
    this.sortDropdown.select(value)
    return this
  }

  addToCartByIndex(index = 0) {
    cy.get('[data-test^="add-to-cart"]').eq(index).click()
    return this
  }

  addAllToCart() {
    cy.get('[data-test^="add-to-cart"]').each(($btn) => cy.wrap($btn).click())
    return this
  }

  assertCartCount(count) {
    if (count === 0) {
      this.cartBadge.should('not.exist')
    } else {
      this.cartBadge.should('have.text', String(count))
    }
    return this
  }

  assertNamesSortedAscending() {
    this.itemNames.then(($els) => {
      const names = [...$els].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort())
    })
    return this
  }

  assertNamesSortedDescending() {
    this.itemNames.then(($els) => {
      const names = [...$els].map((el) => el.innerText)
      expect(names).to.deep.equal([...names].sort().reverse())
    })
    return this
  }

  assertPricesSorted(direction = 'asc') {
    this.itemPrices.then(($els) => {
      const prices = [...$els].map((el) => parseFloat(el.innerText.replace('$', '')))
      const sorted = [...prices].sort((a, b) => direction === 'asc' ? a - b : b - a)
      expect(prices).to.deep.equal(sorted)
    })
    return this
  }

  goToCart() {
    this.cartLink.click()
  }
}

export default new InventoryPage()
