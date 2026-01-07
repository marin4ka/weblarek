import { IProduct } from "../../types";

export class Products {
  private products: IProduct[];
  private selectedProduct: IProduct | undefined = undefined;

  constructor(products: IProduct[]) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  getSelectedProduct(): IProduct | undefined {
    return this.selectedProduct;
  }

  setSelectedProduct(selectedProduct: IProduct | undefined) {
    this.selectedProduct = selectedProduct;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((el) => el.id === id);
  }
}
