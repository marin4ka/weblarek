import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShoppingCart {
  private products: IProduct[];

  constructor(
    protected events: IEvents,
    products: IProduct[],
  ) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct) {
    this.products.push(product);
    this.events.emit("basket:changed");
  }

  removeProduct(product: IProduct) {
    this.products = this.products.filter((el) => el.id !== product.id);
    this.events.emit("basket:changed");
  }

  clear() {
    this.products = [];
    this.events.emit("basket:changed");
  }

  getTotalPrice(): number {
    return this.products.reduce((sum, el) => sum + (el.price || 0), 0);
  }

  getProductCount(): number {
    return this.products.length;
  }

  containsProduct(id: string): boolean {
    return this.products.some((el) => el.id === id);
  }
}
