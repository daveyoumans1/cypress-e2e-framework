import InventoryPage from '../pages/InventoryPage'

describe('Inventory', () => {
  beforeEach(() => {
    cy.loginAs('standard')
    cy.visit('/inventory.html')
  })

  it('displays all 6 products', () => {
    InventoryPage.assertLoaded().assertItemCount(6)
  })

  context('Sorting', () => {
    it('sorts by name A → Z', () => {
      InventoryPage.sortBy('az').assertNamesSortedAscending()
    })

    it('sorts by name Z → A', () => {
      InventoryPage.sortBy('za').assertNamesSortedDescending()
    })

    it('sorts by price low → high', () => {
      InventoryPage.sortBy('lohi').assertPricesSorted('asc')
    })

    it('sorts by price high → low', () => {
      InventoryPage.sortBy('hilo').assertPricesSorted('desc')
    })
  })

  context('Cart', () => {
    it('shows no badge when cart is empty', () => {
      InventoryPage.assertCartCount(0)
    })

    it('increments badge when item is added', () => {
      InventoryPage.addToCartByIndex(0).assertCartCount(1)
    })

    it('reflects all items when all are added', () => {
      InventoryPage.addAllToCart().assertCartCount(6)
    })
  })
})
