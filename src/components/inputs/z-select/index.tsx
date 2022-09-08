import {Component, Prop, State, h, Event, EventEmitter, Watch, Element, Method} from "@stencil/core";
import {InputStatusBean, SelectItemBean, ListDividerType, KeyboardCodeEnum} from "../../../beans";
import {randomId, handleKeyboardSubmit, getClickedElement, getElementTree, boolean} from "../../../utils/utils";

@Component({
  tag: "z-select",
  styleUrl: "styles.css",
  shadow: false,
  scoped: true,
})
export class ZSelect {
  @Element() element: HTMLElement;

  /** the id of the input element */
  @Prop() htmlid = `id-${randomId()}`;
  /** the input select options */
  @Prop() items: SelectItemBean[] | string;
  /** the input name */
  @Prop() name?: string;
  /** the input label */
  @Prop() label?: string;
  /** the input aria-label */
  @Prop() ariaLabel?: string;
  /** the input is disabled */
  @Prop() disabled?: boolean = false;
  /** the input is readonly */
  @Prop() readonly?: boolean = false;
  /** the input placeholder (optional) */
  @Prop() placeholder?: string;
  /** the input html title (optional) */
  @Prop() htmltitle?: string;
  /** the input status (optional) */
  @Prop() status?: InputStatusBean;
  /** input helper message (optional) - if set to `false` message won't be displayed */
  @Prop() message?: string | boolean = true;
  /** the input has autocomplete option */
  @Prop() autocomplete?: boolean = false;
  /** no result text message */
  @Prop() noresultslabel?: string = "Nessun risultato";

  @State() isOpen = false;
  @State() selectedItem: null | SelectItemBean = null;
  @State() searchString: null | string;

  private itemsList: SelectItemBean[] = [];

  constructor() {
    this.toggleSelectUl = this.toggleSelectUl.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleSelectFocus = this.handleSelectFocus.bind(this);
  }

  @Watch("items")
  watchItems() {
    this.itemsList = this.getInitialItemsArray();
    this.selectedItem = this.itemsList.find((item: SelectItemBean) => item.selected);
  }

  /** get the input selected options */
  @Method()
  async getSelectedItem(): Promise<SelectItemBean> {
    return this.selectedItem;
  }

  /** get the input value */
  @Method()
  async getValue(): Promise<string> {
    return this.getSelectedValue();
  }

  /** set the input value */
  @Method()
  async setValue(value: string | string[]): Promise<void> {
    let values: string[] = [];
    if (typeof value === "string") {
      values.push(value);
    } else {
      values = value;
    }

    this.selectedItem = this.itemsList.find((item: SelectItemBean) => values.includes(item.id));
  }

  /** Emitted on select option selection, returns select id, selected item id */
  @Event() optionSelect: EventEmitter;
  emitOptionSelect() {
    this.optionSelect.emit({
      id: this.htmlid,
      selected: this.getSelectedValue(),
    });
  }

  componentWillLoad() {
    this.watchItems();
  }

  componentWillRender() {
    this.filterItems(this.searchString);
  }

  getInitialItemsArray() {
    return typeof this.items === "string" ? JSON.parse(this.items) : this.items;
  }

  mapSelectedItemToItemsArray() {
    const initialItemsList = this.getInitialItemsArray();
    return initialItemsList.map((item: SelectItemBean) => {
      item.selected = item.id === this.selectedItem?.id;
      return item;
    });
  }

  getSelectedValue() {
    return this.selectedItem?.id;
  }

  filterItems(searchString: string) {
    const prevList = this.mapSelectedItemToItemsArray();
    if (!searchString?.length) {
      this.itemsList = prevList;
    } else {
      this.itemsList = prevList
        .filter((item: SelectItemBean) => {
          return item.name.toUpperCase().includes(searchString.toUpperCase());
        })
        .map((item: SelectItemBean) => {
          const start = item.name.toUpperCase().indexOf(searchString.toUpperCase());
          const end = start + searchString.length;
          const newName =
            item.name.substring(0, start) +
            `<strong>${item.name.substring(start, end)}</strong>` +
            item.name.substring(end, item.name.length);
          item.name = newName;
          return item;
        });
    }
  }

  hasAutocomplete() {
    return boolean(this.autocomplete) === true;
  }

  handleInputChange(e: CustomEvent) {
    this.searchString = e.detail.value;
    if (!this.isOpen) this.toggleSelectUl();
  }

  selectItem(item: null | SelectItemBean, selected: boolean) {
    if (item && item.disabled) return;

    this.itemsList = this.mapSelectedItemToItemsArray();
    this.itemsList = this.itemsList.map((i: SelectItemBean) => {
      i.selected = false;
      if (i.id === (item ? item.id : null)) i.selected = selected;
      return i;
    });

    this.selectedItem = this.itemsList.find((item: SelectItemBean) => item.selected);

    this.emitOptionSelect();

    if (this.searchString) this.searchString = null;
  }

  arrowsSelectNav(e: KeyboardEvent, key: number) {
    const arrows = [KeyboardCodeEnum.ARROW_DOWN, KeyboardCodeEnum.ARROW_UP];
    if (!arrows.includes(e.key as KeyboardCodeEnum)) return;

    e.preventDefault();
    e.stopPropagation();

    if (!this.isOpen) this.toggleSelectUl();

    let index: number;
    if (e.key === KeyboardCodeEnum.ARROW_DOWN) {
      index = key + 1 === this.itemsList.length ? 0 : key + 1;
    } else if (e.key === KeyboardCodeEnum.ARROW_UP) {
      index = key <= 0 ? this.itemsList.length - 1 : key - 1;
    }

    this.focusSelectItem(index);
  }

  focusSelectItem(index: number) {
    const focusElem: HTMLLIElement = this.element.querySelector(`#${this.htmlid}_${index}`);
    if (focusElem) focusElem.focus();
  }

  toggleSelectUl(selfFocusOnClose = false) {
    if (this.disabled || this.readonly) return;

    if (!this.isOpen) {
      document.addEventListener("click", this.handleSelectFocus);
      document.addEventListener("keyup", this.handleSelectFocus);
    } else {
      document.removeEventListener("click", this.handleSelectFocus);
      document.removeEventListener("keyup", this.handleSelectFocus);
      if (selfFocusOnClose) {
        (this.element.querySelector(`#${this.htmlid}_input`) as HTMLInputElement).focus();
      }
    }

    this.isOpen = !this.isOpen;
  }

  handleInputClick(e: MouseEvent | KeyboardEvent) {
    const cp = e.composedPath();
    const clearIcon = cp.find((item: any) => item.classList && item.classList.contains("resetIcon"));
    if (clearIcon) {
      e.stopPropagation();
      return;
    }

    this.toggleSelectUl();
  }

  handleSelectFocus(e: MouseEvent | KeyboardEvent) {
    if (e instanceof KeyboardEvent && e.key === KeyboardCodeEnum.ESC) {
      e.stopPropagation();
      return this.toggleSelectUl(true);
    }

    if (e instanceof KeyboardEvent && e.key !== KeyboardCodeEnum.TAB && e.key !== KeyboardCodeEnum.ENTER) {
      return;
    }

    const tree = getElementTree(getClickedElement());
    const parent = tree.find((elem: any) => {
      return elem.nodeName.toLowerCase() === "z-input" && elem.id === `${this.htmlid}_input`;
    });

    if (!parent) {
      this.toggleSelectUl(e instanceof MouseEvent ? true : false);
    }
  }

  scrollToLetter(letter: string) {
    const foundItem = this.itemsList.find((item: SelectItemBean) => item.name.charAt(0) === letter);
    if (foundItem) this.focusSelectItem(this.itemsList.indexOf(foundItem));
  }

  renderInput() {
    return (
      <z-input
        id={`${this.htmlid}_input`}
        htmlid={`${this.htmlid}_input`}
        placeholder={this.placeholder}
        value={!this.isOpen && this.selectedItem ? this.selectedItem.name.replace(/<[^>]+>/g, "") : null}
        label={this.label}
        aria-label={this.ariaLabel}
        icon={this.isOpen ? "caret-up" : "caret-down"}
        hasclearicon={this.hasAutocomplete()}
        message={false}
        disabled={this.disabled}
        readonly={this.readonly || (!this.hasAutocomplete() && this.isOpen)}
        status={this.isOpen ? undefined : this.status}
        onClick={(e: MouseEvent) => {
          this.handleInputClick(e);
        }}
        onKeyUp={(e: KeyboardEvent) => {
          if (e.keyCode !== 13) e.preventDefault();
          handleKeyboardSubmit(e, this.toggleSelectUl);
        }}
        onKeyDown={(e: KeyboardEvent) => {
          return this.arrowsSelectNav(e, this.selectedItem ? this.itemsList.indexOf(this.selectedItem) : -1);
        }}
        onInputChange={(e: CustomEvent) => {
          this.handleInputChange(e);
        }}
        onKeyPress={(e: KeyboardEvent) => {
          if (!this.hasAutocomplete()) {
            e.preventDefault();
            this.scrollToLetter(String.fromCharCode(e.keyCode));
          }
        }}
      />
    );
  }

  renderSelectUl() {
    return (
      <div
        class={this.isOpen ? "open" : "closed"}
        tabindex="-1"
      >
        <div
          class="ulScrollWrapper"
          tabindex="-1"
        >
          <z-list
            role="listbox"
            tabindex={this.disabled || this.readonly || !this.isOpen ? -1 : 0}
            id={this.htmlid}
            aria-activedescendant={this.selectedItem?.id}
            aria-multiselectable={false}
            class={{
              disabled: this.disabled,
              readonly: this.readonly,
              filled: !!this.selectedItem,
              [`input_${this.status}`]: !this.isOpen && !!this.status,
              input_default: this.isOpen || !this.status,
            }}
          >
            {this.renderSelectUlItems()}
          </z-list>
        </div>
      </div>
    );
  }

  renderSelectUlItems() {
    if (!this.itemsList.length) return this.renderNoSearchResults();

    return this.itemsList.map((item: SelectItemBean, key) => {
      return (
        <z-list-element
          clickable={!item.disabled}
          disabled={item.disabled}
          dividerType={ListDividerType.element}
          role="option"
          tabindex={item.disabled || !this.isOpen ? -1 : 0}
          aria-selected={!!item.selected}
          id={`${this.htmlid}_${key}`}
          onClickItem={() => this.selectItem(item, true)}
          onKeyDown={(e: KeyboardEvent) => this.arrowsSelectNav(e, key)}
        >
          <span
            class={{selected: !!item.selected}}
            innerHTML={item.name}
          />
        </z-list-element>
      );
    });
  }

  renderNoSearchResults() {
    return (
      <z-list-element
        color="blue500"
        class="noResults"
      >
        <z-icon
          name="multiply-circle"
          fill="blue500"
        />
        {this.noresultslabel}
      </z-list-element>
    );
  }

  renderMessage() {
    if (boolean(this.message) === false) return;

    return (
      <z-input-message
        message={boolean(this.message) === true ? undefined : (this.message as string)}
        status={this.status}
      />
    );
  }

  render() {
    return (
      <div class="selectWrapper">
        {this.renderInput()}
        {this.renderSelectUl()}
        {this.renderMessage()}
      </div>
    );
  }
}
