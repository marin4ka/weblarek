import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  list: HTMLElement[];
  price: number;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );

    this.buttonElement.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set list(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set price(value: number) {
    this.priceElement.textContent = `${String(value)} синапсов`;
  }

  setDisabled(isDisabled: boolean): void {
    this.buttonElement.disabled = isDisabled;
  }
}
