export const environments = {
    staging: {
      baseUrl: `https://${process.env.DOMAIN}.sku.vn/admin`,
    //   apiUrl: process.env.API_URL,
    },
    production: {
      baseUrl: `https://${process.env.DOMAIN}.myharavan.com/admin`,
    //   apiUrl: process.env.API_URL,
    },
  };