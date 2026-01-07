import {
  IApi,
  IOrderRequest,
  IOrderResponse,
  IProductResponse,
} from "../types";

export class WebLarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProduct(): Promise<IProductResponse> {
    return this.api.get<IProductResponse>("/product/");
  }

  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", data);
  }
}
