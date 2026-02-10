import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );

    this.buttonElement.addEventListener("click", () => {
      this.close();
    });

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
  }

  set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }

  open(): void {
    this.container.classList.add("modal_active");
  }

  close(): void {
    this.container.classList.remove("modal_active");
  }
}
