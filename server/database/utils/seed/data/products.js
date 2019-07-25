const products = [
  {
    sku: '1123',
    name: 'Intel CPU',
    category: 'Computers',
    parent_category_1: 'Computers',
    parent_category_2: 'Parts',
    parent_category_3: 'CPU',
    description: 'An Intel CPU, fresh off the presses',
    price: 199.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '1234',
    name: 'Asus',
    category: 'Computers',
    parent_category_1: 'Computers',
    parent_category_2: 'Parts',
    parent_category_3: 'Motherboards',
    description: 'Asus Motherboard for Intel CPU',
    price: 59.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '2234',
    name: 'Mechanical Typewriter',
    category: 'Typerwriters',
    parent_category_1: 'Typerriters',
    parent_category_2: 'Mechanical',
    parent_category_3: 'Screen',
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
    parent_category_1: 'Typewriters',
    parent_category_2: 'Electronic',
    parent_category_3: 'No Screen',
    description: 'A new and improved typewriter with all the fixins',
    price: 1000.0,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '3456',
    name: 'Handheld Calculator',
    category: 'Data Devices',
    parent_category_1: 'Data Devices',
    parent_category_2: 'Hand Held',
    parent_category_3: 'Calculator',
    description: 'TI-86 graphing calculator to meet all your mathing needs',
    price: 99.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
  {
    sku: '3555',
    name: 'Electronic Translator',
    category: 'Data Devices',
    parent_category_1: 'Data Devices',
    parent_category_2: 'Hand Held',
    parent_category_3: 'Translator',
    description:
      'Translate up to 50 foreign languages in the palm of your hand!',
    price: 59.99,
    image_url: 'https://picsum.photos/200',
    brand_id: 1, //update
  },
];

module.exports = products;
