import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  totalPrice: number;
}

export class Success extends Component<ISuccess> {
  protected totalPriceElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.totalPriceElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.successButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.successButton.addEventListener("click", () => {
      this.events.emit("succes:close");
    });
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `Списано ${value} синапсов`;
  }
}
