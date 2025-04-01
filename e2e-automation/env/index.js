// Thay đổi từ CommonJS sang ES modules
import stagingConfig from './staging.js';
import productionConfig from './production.js';

const ENV = process.env.TEST_ENV || "staging"; // Mặc định là staging

const config = ENV === "production"
    ? productionConfig
    : stagingConfig;

export default config;