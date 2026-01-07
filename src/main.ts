import "./scss/styles.scss";

import { Products } from "./components/models/Products";
import { ShoppingCart } from "./components/models/ShoppingCart";
import { Buyer } from "./components/models/Buyer";
import { apiProducts } from "./utils/data";
import { WebLarekApi } from "./components/WebLarekApi";
import { IBuyer } from "./types";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

// Каталог
console.log("\n(!) Проверка productsModel:");
const productsModel = new Products(apiProducts.items);
console.log("Массив товаров из катаалог: ", productsModel.products);
console.log(
  "Получение товара по id: ",
  productsModel.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")
);
productsModel.selectedProduct = apiProducts.items[1];
console.log("Выбранный товар ", productsModel.selectedProduct);
// productsModel.products = apiProducts.items.slice(0, 2);
// console.log('Массив товаров из катаалог: ', productsModel.products);
console.log("=".repeat(100));

// Корзина
console.log("\n(!) Проверка shoppingCartModel:");
const shoppingCartModel = new ShoppingCart(apiProducts.items.slice(0, 2));
console.log(
  "Массива товаров, которые находятся в корзине: ",
  shoppingCartModel.products
);
shoppingCartModel.addProduct(apiProducts.items[2]);
console.log(
  "Массива товаров, после добавления товара: ",
  shoppingCartModel.products
);
shoppingCartModel.removeProduct(apiProducts.items[0]);
console.log(
  "Массива товаров, после удаление товара, полученного в параметре из массива корзины: ",
  shoppingCartModel.products
);
console.log(
  "Получение стоимости всех товаров в корзине: ",
  shoppingCartModel.getTotalPrice()
);
console.log(
  "Получение количества товаров в корзине: ",
  shoppingCartModel.getProductCount()
);
console.log(
  "Проверка наличия товара в корзине по его id: ",
  shoppingCartModel.containsProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7")
);
shoppingCartModel.clear();
console.log(
  "Массива товаров, после очистка корзины: ",
  shoppingCartModel.products
);
console.log("=".repeat(100));

// Покупатель
console.log("\n(!) Проверка buyerModel:");
const testBuyerData: IBuyer = {
  payment: "cash",
  email: "qwe@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
};
const buyerModel = new Buyer(testBuyerData);
console.log("Данные в модели: ", buyerModel.getDate());
buyerModel.setData({ payment: "card", email: "test@test.ru" });
console.log(
  "Данные в модели, после изменения способа оплаты и почты: ",
  buyerModel.getDate()
);
buyerModel.clear();
console.log("Данные в модели, после очистки: ", buyerModel.getDate());
console.log("Валидация данных: ", buyerModel.validate());
console.log("=".repeat(100));

// API
console.log("\n(!) Проверка WebLarekApi:");
const client = new WebLarekApi(new Api(API_URL));
(async () => {
  const result = await client.getProduct();
  console.log("Результат запроса к серверу: ", result);
  productsModel.products = result.items;
  console.log("Массив товаров полученный с сервера: ", productsModel.products);
  const data = {
    ...testBuyerData,
    //phone: '',
    total: 2200,
    items: [
      "854cef69-976d-4c2a-a18c-2aa45046c390",
      "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    ],
  };
  const response = client.postOrder(data);
  console.log("Ответ от сервера после отправки: ", response);
})();
console.log("=".repeat(100));
