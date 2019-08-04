const { db, Product } = require('../../../server/database/index.js');

beforeAll(async () => {
  await db.sync({ force: true });
});
afterAll(async () => {
  await db.close();
});

describe('adding a product', () => {
  const prodObj = {
    sku: '1123',
    name: 'Intel CPU',
    product_line_id: 1,
    category: 'Computers',
    parent_category_1: 'Computers',
    parent_category_2: 'Parts',
    parent_category_3: 'CPU',
    description: 'An Intel CPU, fresh off the presses',
    price: 199.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  };

  const invalidProd = {
    sku: '',
    name: '',
    product_line_id: 1,
    category: '',
    parent_category_1: '',
    parent_category_2: '',
    parent_category_3: '',
    description: '',
    price: 0,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  };
  test('it should create a user when all fields are valid', async () => {
    const prod = await Product.create(prodObj);
    expect(prod.name).toEqual('Intel CPU');
    expect(prod.price).toBeDefined();
  });
  test('should not allow missing required values', async () => {
    return expect(Product.create(invalidProd)).rejects.toThrow();
  });
});
