import { IBuyer } from "../../types";
import { BUYER_VALIDATION_ERRORS } from "../../utils/constants";

export class Buyer {
  private _buyer: IBuyer;

  constructor(buyer: IBuyer) {
    this._buyer = {
      payment: buyer.payment ?? undefined,
      email: buyer.email ?? "",
      phone: buyer.phone ?? "",
      address: buyer.address ?? "",
    };
  }

  getDate() {
    return this._buyer;
  }

  setData(buyer: Partial<IBuyer>) {
    this._buyer = {
      ...this._buyer,
      ...buyer,
    };
  }

  clear() {
    this._buyer.payment = undefined;
    this._buyer.email = "";
    this._buyer.phone = "";
    this._buyer.address = "";
  }

  validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!this._buyer.payment) {
      errors.payment = BUYER_VALIDATION_ERRORS.payment;
    }
    if (!this._buyer.email) {
      errors.email = BUYER_VALIDATION_ERRORS.email;
    }
    if (!this._buyer.phone) {
      errors.phone = BUYER_VALIDATION_ERRORS.phone;
    }
    if (!this._buyer.address) {
      errors.address = BUYER_VALIDATION_ERRORS.address;
    }
    return errors;
  }
}
