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
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/51r5Y8XozrL._SX425_.jpg',
    brandId: 1, //update
    productCategoryId: 2,
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
    image_url:
      'https://media.karousell.com/media/photos/products/2018/04/22/old_motherboard_1524363280_5aeb172f.jpg',
    brandId: 1, //update,
    productCategoryId: 1,
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
    image_url:
      'https://cdn.shopify.com/s/files/1/0557/2745/products/QWS_Store_Black_1_1_1600x.png?v=1549488087',
    brandId: 1, //update
    productCategoryId: 3,
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
    image_url:
      'https://technabob.com/blog/wp-content/uploads/2014/10/hemingwrite-by-adam-leeb-and-patrick-paul.jpg',
    brandId: 1, //update
    productCategoryId: 4,
  },
  {
    sku: '3456',
    name: 'Handheld Calculator',
    category: 'Data Devices',
    parent_category_1: 3,
    parent_category_2: 31,
    parent_category_3: 31,
    description: 'TI-86 graphing calculator to meet all your mathing needs',
    price: 99.99,
    image_url: 'http://www.vintagecalculators.com/assets/images/TI2500_1.jpg',
    brandId: 1, //update
    productCategoryId: 5,
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
    image_url:
      'https://www.picclickimg.com/d/l400/pict/223453646779_/Craig-M100-Handheld-Translator-English-French-German-Capsules.jpg',
    brandId: 1, //update
    productCategoryId: 6,
  },
];

module.exports = products;
