import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

interface IContacts {
  email: string;
  phone: string;
}

export class Contacts extends Form<IContacts> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(events, container);

    this.emailElement = ensureElement<HTMLInputElement>(
      "[name=email]",
      this.container,
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      "[name=phone]",
      this.container,
    );

    this.emailElement.addEventListener("input", () => {
      this.events.emit("formData:changed", { email: this.emailElement?.value });
    });

    this.phoneElement.addEventListener("input", () => {
      this.events.emit("formData:changed", { phone: this.phoneElement?.value });
    });
  }

  set email(value: string) {
    this.emailElement.value = value;
  }

  set phone(value: string) {
    this.phoneElement.value = value;
  }
}
