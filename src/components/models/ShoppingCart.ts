import { IProduct } from "../../types";

export class ShoppingCart {
  private products: IProduct[];

  constructor(products: IProduct[]) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct) {
    this.products.push(product);
  }

  removeProduct(product: IProduct) {
    this.products = this.products.filter((el) => el.id !== product.id);
  }

  clear() {
    this.products = [];
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
