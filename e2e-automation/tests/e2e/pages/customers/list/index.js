const { FilterSection } = require('./sections/FilterSection');
const { TableSection } = require('./sections/TableSection');
const { SearchSection } = require('./sections/SearchSection');
const { ActionSection } = require('./sections/ActionSection');

class CustomerListPage {
    constructor(page) {
        this.page = page;
        this.filterSection = new FilterSection(page);
        this.tableSection = new TableSection(page);
        this.searchSection = new SearchSection(page);
        this.actionSection = new ActionSection(page);
    }

    async navigate() {
        await this.page.goto('/customers');
    }

    // Main page actions
    async searchCustomer(keyword) {
        await this.searchSection.search(keyword);
    }

    async filterCustomers(filters) {
        await this.filterSection.applyFilters(filters);
    }

    async exportCustomerList() {
        await this.actionSection.clickExport();
    }
}

module.exports = { CustomerListPage };