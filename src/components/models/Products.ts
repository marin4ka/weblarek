import { IProduct } from "../../types";

export class Products {
  private _products: IProduct[];
  private _selectedProduct: IProduct | undefined = undefined;

  constructor(products: IProduct[]) {
    this._products = products;
  }

  get products(): IProduct[] {
    return this._products;
  }

  set products(products: IProduct[]) {
    this._products = products;
  }

  get selectedProduct(): IProduct | undefined {
    return this._selectedProduct;
  }

  set selectedProduct(selectedProduct: IProduct | undefined) {
    this._selectedProduct = selectedProduct;
  }

  getProductById(id: string): IProduct | undefined {
    return this._products.find((el) => el.id === id);
  }
}
