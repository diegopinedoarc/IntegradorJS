let stockProducts = [];

let product = class {
  constructor(name, id, price, img, category, info) {
    this.name = name;
    this.id = id;
    this.price = price;
    this.img = img;
    this.category = category;
    this.info = info;
  }
};

let createAddProduct = (name, id, price, img, category, info) => {
  return stockProducts.push(new product(name, id, price, img, category, info));
};
const idRandom = () => {
  let randomId = parseInt(Math.random() * 1000);
  if (stockProducts.some((product) => product.id === randomId)) {
    randomId = parseInt(Math.random() * 1000);
  }
  return randomId;
};

createAddProduct(
  "Jack Daniels",
  idRandom(),
  7500,
  "./assets/images/jackdanielsbotella.jpg",
  "whiskeys"
);
createAddProduct(
  "Jack Daniels Honey",
  idRandom(),
  7500,
  "./assets/images/jackdanielshonybotella.png",
  "whiskeys"
);
createAddProduct(
  "Johnny Walker Black Label",
  idRandom(),
  8000,
  "./assets/images/johnniewalkerblackbotella.jpg",
  "whiskeys"
);
createAddProduct(
  "Johnny Walker Red Label",
  idRandom(),
  6000,
  "../assets/images/johnnywalkerrojobotella.webp",
  "whiskeys"
);
createAddProduct(
  "Johnny Walker Blue Label",
  idRandom(),
  20000,
  "./assets/images/johnnyazulbotella.jpg",
  "whiskeys"
);
createAddProduct(
  "Glenfiddich",
  idRandom(),
  20000,
  "./assets/images/Glenfiddich12.webp",
  "whiskeys"
);
createAddProduct(
  "Baileys",
  idRandom(),
  2000,
  "./assets/images/baileysbotella.png",
  "licores"
);
createAddProduct(
  "Amarula",
  idRandom(),
  2000,
  "./assets/images/amarula.jpeg",
  "licores"
);
createAddProduct(
  "Jagermeifter",
  idRandom(),
  5000,
  "./assets/images/jagermeister-350-ml-licoreria-paradiso-937x1000.jpg",
  "licores"
);
createAddProduct(
  "Bombay Sapphire",
  idRandom(),
  3000,
  "./assets/images/bombaybotella.webp",
  "gin"
);
createAddProduct(
  "Tanqueray",
  idRandom(),
  20000,
  "./assets/images/gin-tanqueray.jpg",
  "gin"
);
createAddProduct(
  "Beefeater",
  idRandom(),
  4000,
  "./assets/images/gin-beefeater-700cc.jpg",
  "gin"
);
createAddProduct(
  "Hesperidina",
  idRandom(),
  2000,
  "./assets/images/hesperidina.jpg",
  "aperitivos"
);
createAddProduct(
  "Fernet Branca",
  idRandom(),
  2000,
  "./assets/images/fernet-branca.jpg",
  "aperitivos"
);
createAddProduct(
  "Cynar",
  idRandom(),
  1000,
  "./assets/images/cynar.webp",
  "aperitivos"
);
createAddProduct(
  "Campari",
  idRandom(),
  1000,
  "./assets/images/campari.jpg",
  "aperitivos"
);

// function splitProducts(size) {
//   let chunk = [];
//   for (let i = 0; i < stockProducts.length; i += size)
//     chunk.push(stockProducts.slice(i, i + size));
//   return chunk;
// }
// const allProducts = {
//   productList: splitProducts(3),
//   next: 1,
//   limit: splitProducts(3).length,
// };
