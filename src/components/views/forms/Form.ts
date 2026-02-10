import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

interface IForm {
  error: string;
}

export abstract class Form<T> extends Component<T & IForm> {
  protected submitButtonElement: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.submitButtonElement = ensureElement<HTMLButtonElement>(
      ".button[type=submit]",
      this.container,
    );
    this.errorElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.submitButtonElement.addEventListener("click", (event) => {
      event.preventDefault();
      this.events.emit(`${this.container.getAttribute("name")}:submit`);
    });
  }

  set error(value: string) {
    this.errorElement.textContent = String(value);
  }

  setDisabled(isDisabled: boolean): void {
    this.submitButtonElement.disabled = isDisabled;
  }
}
