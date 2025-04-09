class BaseFrame {
    constructor(frameLocator) {
        if (!frameLocator) {
            throw new Error("FrameLocator không được để trống!");
        }
        this.frame = frameLocator;
    }

    async waitForFrameLoaded() {
        await this.frame.waitForLoadState("domcontentloaded");
    }
}

export { BaseFrame };