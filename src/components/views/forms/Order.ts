import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IOrder {
  payment: string;
  address: string;
}

export class Order extends Form<IOrder> {
  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(events, container);

    this.cardButtonElement = ensureElement<HTMLButtonElement>(
      "[name=card]",
      this.container,
    );
    this.cashButtonElement = ensureElement<HTMLButtonElement>(
      "[name=cash]",
      this.container,
    );
    this.addressElement = ensureElement<HTMLInputElement>(
      "[name=address]",
      this.container,
    );

    this.cardButtonElement.addEventListener("click", () => {
      this.events.emit("formData:changed", { payment: "online" });
    });

    this.cashButtonElement.addEventListener("click", () => {
      this.events.emit("formData:changed", { payment: "cash" });
    });

    this.addressElement.addEventListener("input", () => {
      this.events.emit("formData:changed", {
        address: this.addressElement?.value,
      });
    });
  }

  set payment(type: string) {
    this.cardButtonElement.classList.toggle(
      "button_alt-active",
      type === "online",
    );
    this.cashButtonElement.classList.toggle(
      "button_alt-active",
      type === "cash",
    );
  }

  set address(value: string) {
    this.addressElement.value = value;
  }
}
