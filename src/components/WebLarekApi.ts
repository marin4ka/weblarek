import {
  IApi,
  IOrderRequest,
  IOrderResponse,
  IProductResponse,
} from "../types";

export class WebLarekApi {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  getProduct(): Promise<IProductResponse> {
    return this._api.get<IProductResponse>("/product/");
  }

  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this._api.post<IOrderResponse>("/order/", data);
  }
}
