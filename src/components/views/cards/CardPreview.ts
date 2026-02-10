import { ensureElement } from "../../../utils/utils";
import { Card, ICardActions } from "./Card";
import { categoryMap } from "../../../utils/constants";
import { IProduct } from "../../../types";
import { CDN_URL } from "../../../utils/constants";

type CategoryKey = keyof typeof categoryMap;

export type TCardCatalog = Pick<
  IProduct,
  "image" | "category" | "description"
> & {
  button?: string;
};

export class CardPreview extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value,
      );
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buttonElement.textContent = value;
  }

  setDisabled(isDisabled: boolean): void {
    this.buttonElement.disabled = isDisabled;
  }
}
