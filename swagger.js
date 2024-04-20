const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API for My Application',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express',
    },
  },
  //apis: ['./index.js'], // مسیر فایل روت‌ها

  // مسیر به فایل‌هایی که توضیحات API را دارند
  apis: ['./src/routes/auth/index.js','./src/routes/user/create/index.js','./src/routes/user/search/index.js','./src/routes/user/home/index.js'], // تغییر دهید تا مسیرهای صحیح را نشان دهد

};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec ;