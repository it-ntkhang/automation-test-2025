class CustomerRow {
    constructor(rowElement) {
        this.row = rowElement;
    }

    async getName() {
        return await this.row.locator('.customer-name').textContent();
    }

    async clickEdit() {
        await this.row.locator('.edit-button').click();
    }

    async clickDelete() {
        await this.row.locator('.delete-button').click();
    }
}

module.exports = { CustomerRow };