import { IBuyer } from "../../types";
import { BUYER_VALIDATION_ERRORS } from "../../utils/constants";

export class Buyer {
  private buyer: IBuyer;

  constructor() {
    this.buyer = {
      payment: undefined,
      email: "",
      phone: "",
      address: "",
    };
  }

  getDate() {
    return this.buyer;
  }

  setData(buyer: Partial<IBuyer>) {
    this.buyer = {
      ...this.buyer,
      ...buyer,
    };
  }

  clear() {
    this.buyer.payment = undefined;
    this.buyer.email = "";
    this.buyer.phone = "";
    this.buyer.address = "";
  }

  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};
    if (!this.buyer.payment) {
      errors.payment = BUYER_VALIDATION_ERRORS.payment;
    }
    if (!this.buyer.email) {
      errors.email = BUYER_VALIDATION_ERRORS.email;
    }
    if (!this.buyer.phone) {
      errors.phone = BUYER_VALIDATION_ERRORS.phone;
    }
    if (!this.buyer.address) {
      errors.address = BUYER_VALIDATION_ERRORS.address;
    }
    return errors;
  }
}
