import { BaseFrame } from '../../../frames/BaseFrame.js';

class CustomersListPage {
    constructor(page) {
        super(page); // Gọi constructor của BaseFrame
        this.frameLocator = '//div[@class="ant-tabs-content ant-tabs-content-no-animated"]//iframe';
        this.btnCreateCustomer = this.frame.locator(`//button[.//span[contains(text(), 'Tạo khách hàng')]]`);
    }

    async clickButtonCreateCustomer() {
        await this.btnCreateCustomer.click();
    }
}

export { CustomersListPage };