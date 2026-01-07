import { IProduct } from "../../types";

export class ShoppingCart {
  private _products: IProduct[];

  constructor(products: IProduct[]) {
    this._products = products;
  }

  get products(): IProduct[] {
    return this._products;
  }

  addProduct(product: IProduct) {
    this._products.push(product);
  }

  removeProduct(product: IProduct) {
    this._products = this._products.filter((el) => el.id !== product.id);
  }

  clear() {
    this._products = [];
  }

  getTotalPrice(): number {
    return this._products.reduce((sum, el) => sum + (el.price || 0), 0);
  }

  getProductCount() {
    return this._products.length;
  }

  containsProduct(id: string): boolean {
    return this._products.some((el) => el.id === id);
  }
}
