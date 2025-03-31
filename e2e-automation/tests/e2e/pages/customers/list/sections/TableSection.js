const { CustomerRow } = require('../components/CustomerRow');

class TableSection {
    constructor(page) {
        this.page = page;
        this.tableLocator = page.locator('.customer-table');
        this.rowsLocator = this.tableLocator.locator('tr');
    }

    async getCustomerRow(index) {
        const row = this.rowsLocator.nth(index);
        return new CustomerRow(row);
    }

    async sortBy(column) {
        await this.tableLocator.locator(`th[data-column="${column}"]`).click();
    }
}

module.exports = { TableSection };