import "./scss/styles.scss";

import { IBuyer, IProduct } from "./types";

import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { WebLarekApi } from "./components/WebLarekApi";

import { EventEmitter } from "./components/base/Events";
import { cloneTemplate, ensureElement } from "./utils/utils";

import { Products } from "./components/models/Products";
import { ShoppingCart } from "./components/models/ShoppingCart";
import { Buyer } from "./components/models/Buyer";

import { Gallery } from "./components/views/Gallery";
import { CardCatalog } from "./components/views/cards/CardCatalog";
import { CardPreview } from "./components/views/cards/CardPreview";
import { Modal } from "./components/views/Modal";
import { Header } from "./components/views/Header";
import { Basket } from "./components/views/Basket";
import { CardBascket } from "./components/views/cards/CardBasket";
import { Order } from "./components/views/forms/Order";
import { Contacts } from "./components/views/forms/Contacts";
import { Success } from "./components/views/Success";

const webLarekApi = new WebLarekApi(new Api(API_URL));
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

const productsModel = new Products(events, []);
const shoppingCartModel = new ShoppingCart(events, []);
const buyerModel = new Buyer(events);

const gallery = new Gallery(ensureElement(".page"));
const modal = new Modal(ensureElement("#modal-container"));
const header = new Header(events, ensureElement(".header"));
const basket = new Basket(events, cloneTemplate(basketTemplate));
const orderForm = new Order(events, cloneTemplate(orderTemplate));
const contactsForm = new Contacts(events, cloneTemplate(contactsTemplate));

events.on("products:changed", () => {
  const itemCards = productsModel.getProducts().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });

  gallery.render({ catalog: itemCards });
});

events.on("selectedProduct:changed", () => {
  const selectedProduct = productsModel.getSelectedProduct();
  if (!selectedProduct) return;
  const isInBasket = shoppingCartModel.containsProduct(selectedProduct.id);
  const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      const action = isInBasket ? "basket:delete" : "basket:add";
      events.emit(action, selectedProduct);
      modal.close();
    },
  });

  if (!selectedProduct.price) {
    cardPreview.setDisabled(true);
    cardPreview.buttonText = "Недоступно";
  } else {
    cardPreview.buttonText = isInBasket ? "Удалить из корзины" : "Купить";
  }
  const selectedCard = cardPreview.render({ ...selectedProduct });
  modal.render({ content: selectedCard });
  modal.open();
});

events.on("basket:changed", () => {
  header.counter = shoppingCartModel.getProductCount();
  header.render();
  const itemProducts = shoppingCartModel.getProducts().map((product, index) => {
    const card = new CardBascket(cloneTemplate(cardBasketTemplate), {
      onClick: () => {
        events.emit("basket:delete", product);
      },
    });
    return card.render({ ...product, index: index + 1 });
  });
  basket.render({
    list: itemProducts,
    price: shoppingCartModel.getTotalPrice(),
  });
  const isEmpty = shoppingCartModel.getProductCount() === 0;
  basket.setDisabled(isEmpty);
});

events.on("buyer:changed", () => {
  const errors = buyerModel.validate();
  const data = buyerModel.getData();

  const isErrorOrder = Boolean(errors.address) || Boolean(errors.payment);
  orderForm.setDisabled(isErrorOrder);

  const isErrorContacts = Boolean(errors.email) || Boolean(errors.phone);
  contactsForm.setDisabled(isErrorContacts);

  orderForm.render({
    error: [errors.address, errors.payment].filter(Boolean).join("; ") || '',
    payment: data.payment,
    address: data.address,
  });

  contactsForm.render({
    error: [errors.email, errors.phone].filter(Boolean).join("; ") || '',
    email: data.email,
    phone: data.phone,
  });
});

events.on("card:select", (card: IProduct) => {
  productsModel.setSelectedProduct(card);
});

events.on("basket:add", (product: IProduct) => {
  shoppingCartModel.addProduct(product);
});

events.on("basket:delete", (product: IProduct) => {
  shoppingCartModel.removeProduct(product);
});

events.on("basket:open", () => {
  const isEmpty = shoppingCartModel.getProductCount() === 0;
  basket.setDisabled(isEmpty);
  const basketContent = basket.render();
  modal.render({ content: basketContent });
  modal.open();
});

events.on("order:open", () => {
  const orderContent = orderForm.render(buyerModel.getData());
  modal.render({ content: orderContent });
});

events.on("order:submit", () => {
  const contactsContent = contactsForm.render(buyerModel.getData());
  modal.render({ content: contactsContent });
});

events.on("contacts:submit", () => {
  const data = {
    ...buyerModel.getData(),
    total: shoppingCartModel.getTotalPrice(),
    items: shoppingCartModel.getProducts().map((product) => product.id),
  };
  webLarekApi
    .postOrder(data)
    .then((result) => {
      const success = new Success(events, cloneTemplate(successTemplate));
      const successContent = success.render({ totalPrice: result.total });
      modal.render({ content: successContent });
      shoppingCartModel.clear();
      buyerModel.clear();
    })
    .catch((error) => console.log(error));
});

events.on("formData:changed", (dataBuyer: IBuyer) => {
  buyerModel.setData(dataBuyer);
});

events.on("succes:close", () => {
  modal.close();
});

webLarekApi
  .getProduct()
  .then((data) => {
    productsModel.setProducts(data.items);
  })
  .catch((error) => {
    console.log(error);
  });
