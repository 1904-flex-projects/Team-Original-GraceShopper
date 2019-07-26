const products = [
  {
    sku: '1123',
    name: 'Intel CPU',
    category: 'Computers',
    parent_category_1: 1,
    parent_category_2: 11,
    parent_category_3: 112,
    description: 'An Intel CPU, fresh off the presses',
    price: 199.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '1234',
    name: 'Asus',
    category: 'Computers',
    parent_category_1: 1,
    parent_category_2: 11,
    parent_category_3: 111,
    description: 'Asus Motherboard for Intel CPU',
    price: 59.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '2234',
    name: 'Mechanical Typewriter',
    category: 'Typerwriters',
    parent_category_1: 2,
    parent_category_2: 21,
    parent_category_3: 211,
    description:
      'Brand new typewriter with a visual screen to view what you are typing, the future',
    price: 599.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '2456',
    name: 'Electronic Typewriter',
    category: 'Typerwriters',
    parent_category_1: 2,
    parent_category_2: 22,
    parent_category_3: 212,
    description: 'A new and improved typewriter with all the fixins',
    price: 1000.0,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '3456',
    name: 'Handheld Calculator',
    category: 'Data Devices',
    parent_category_1: 3,
    parent_category_2: 31,
    parent_category_3: 311,
    description: 'TI-86 graphing calculator to meet all your mathing needs',
    price: 99.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '3555',
    name: 'Electronic Translator',
    category: 'Data Devices',
    parent_category_1: 3,
    parent_category_2: 31,
    parent_category_3: 312,
    description:
      'Translate up to 50 foreign languages in the palm of your hand!',
    price: 59.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
];

module.exports = products;
