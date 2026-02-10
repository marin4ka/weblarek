import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
  private products: IProduct[];
  private selectedProduct: IProduct | undefined = undefined;

  constructor(
    protected events: IEvents,
    products: IProduct[],
  ) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
    this.events.emit("products:changed");
  }

  getSelectedProduct(): IProduct | undefined {
    return this.selectedProduct;
  }

  setSelectedProduct(selectedProduct: IProduct | undefined) {
    this.selectedProduct = selectedProduct;
    this.events.emit("selectedProduct:changed");
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((el) => el.id === id);
  }
}
