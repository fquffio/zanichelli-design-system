import {
  Component,
  Prop,
  Element,
  h,
  EventEmitter,
  Event,
  Listen,
  State,
} from "@stencil/core";

import flatpickr from "flatpickr";
import { Italian } from "flatpickr/dist/l10n/it.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import classNames from "classnames";

import {
  ZDatePickerMode,
  ZDatePickerModeValues,
  ZDatePickerPosition,
} from "../../beans";

@Component({
  tag: "z-date-picker",
  styleUrl: "styles.css",
  shadow: false,
})
export class ZDatePicker {
  @Element() element: HTMLElement;

  /** unique id */
  @Prop() datepickerid: string;
  /** [Optional] datepicker mode: date, datetime, only months */
  @Prop() mode: ZDatePickerMode = ZDatePickerMode.date;

  @State() flatpickrPosition: ZDatePickerPosition = ZDatePickerPosition.bottom;

  private flatpickrInstance;
  private hasChildren: boolean;

  /** emitted when date changes, returns selected date */
  @Event() dateSelect: EventEmitter;
  emitDateSelect(date) {
    this.dateSelect.emit(date);
  }

  @Listen("keydown", { target: "body", capture: true })
  handleKeyDown(ev: KeyboardEvent) {
    let activeElement = document.activeElement;
    console.log("activeElement", activeElement);

    if (ev.key === "Enter") {
      let isPrevArrowEntered = document.activeElement.classList.contains(
        "flatpickr-prev-month"
      );
      let isNextArrowEntered = document.activeElement.classList.contains(
        "flatpickr-next-month"
      );
      let prevArrow = this.element.querySelector(`.flatpickr-prev-month`);
      let nextArrow = this.element.querySelector(`.flatpickr-next-month`);

      if (this.mode === ZDatePickerMode.months) {
        isPrevArrowEntered &&
          this.flatpickrInstance.changeYear(
            this.flatpickrInstance.currentYear - 1
          );

        isNextArrowEntered &&
          this.flatpickrInstance.changeYear(
            this.flatpickrInstance.currentYear + 1
          );
        isPrevArrowEntered && (prevArrow as HTMLElement).focus();
        isNextArrowEntered && (nextArrow as HTMLElement).focus();
      } else {
        isPrevArrowEntered && this.flatpickrInstance.changeMonth(-1);
        isNextArrowEntered && this.flatpickrInstance.changeMonth(1);
      }
    }
    console.log(document.activeElement);
  }

  componentWillLoad() {
    let customToggle = this.element.querySelector("[slot=toggle]");
    this.hasChildren = !!customToggle;
    this.hasChildren && customToggle.setAttribute("data-toggle", "data-toggle");
  }

  componentDidLoad() {
    this.flatpickrInstance = flatpickr(`.${this.datepickerid}`, {
      appendTo: this.element.children[0] as HTMLElement,
      enableTime: this.mode === ZDatePickerMode.dateTime,
      locale: Italian,
      dateFormat:
        this.mode === ZDatePickerMode.dateTime ? "d-m-Y - H:i" : "d-m-Y",
      ariaDateFormat: this.mode === ZDatePickerMode.months ? "F Y" : "d F Y",
      minuteIncrement: 1,
      time_24hr: true,
      onChange: (_selectedDates, dateStr) => {
        this.emitDateSelect(dateStr);
      },
      onOpen: () => {
        this.setFlatpickrPosition();
      },
      onKeyDown: (_selectedDates, _dateStr, _instance, _event) => {
        this.setTabindex();
      },
      wrap: this.hasChildren,
      plugins: this.mode === ZDatePickerMode.months && [
        monthSelectPlugin({
          dateFormat: "m-Y",
          altFormat: "m-Y",
        }),
      ],
    });

    this.element.querySelectorAll(".flatpickr-weekday").forEach((element) => {
      element.innerHTML = element.innerHTML.trim().charAt(0);
    });
  }

  setTabindex() {
    let calendars = this.element.getElementsByClassName("flatpickr-calendar");
    let calendar = calendars[0];

    //Set all flatpickr elements with tabindex=-1 to tabindex=0
    let tabindexElements = calendar.querySelectorAll('[tabindex = "-1"]');
    tabindexElements.forEach((element) =>
      element.setAttribute("tabindex", "0")
    );

    //Set tabindex=0 to prev-month arrow and next-month arrow
    calendar
      .getElementsByClassName("flatpickr-prev-month")[0]
      .setAttribute("tabindex", "0");
    calendar
      .getElementsByClassName("flatpickr-next-month")[0]
      .setAttribute("tabindex", "0");

    Array.from(calendar.getElementsByClassName("flatpickr-days")).forEach(
      (element) => element.setAttribute("tabindex", "-1")
    );

    this.mode === ZDatePickerMode.months &&
      Array.from(
        calendar.getElementsByClassName("flatpickr-monthSelect-months")
      ).forEach((element) => element.setAttribute("tabindex", "-1"));
  }

  setFlatpickrPosition() {
    const toggleHeight = this.element.children[0].clientHeight;
    this.element.style.setProperty("--toggle-height", `${toggleHeight}px`);

    const flatpickrHeight =
      this.mode === ZDatePickerMode.dateTime
        ? ZDatePickerModeValues.DATETIME
        : this.mode === ZDatePickerMode.months
        ? ZDatePickerModeValues.MONTHS
        : ZDatePickerModeValues.DATE;

    const bottom = this.element.getBoundingClientRect().bottom;
    const overflowBottom = bottom + flatpickrHeight > window.innerHeight;
    const overflowTop = bottom - flatpickrHeight - toggleHeight < 0;

    if (!overflowTop && overflowBottom) {
      this.flatpickrPosition = ZDatePickerPosition.top;
    } else {
      this.flatpickrPosition = ZDatePickerPosition.bottom;
    }
  }

  renderSlottedContent() {
    return (
      <div>
        <input class="hidden-input" data-input></input>
        <slot name="toggle"></slot>
      </div>
    );
  }

  renderZInput() {
    return (
      <z-input
        class={classNames(this.datepickerid)}
        type="text"
        name="datepicker"
        icon="event"
        hasmessage={false}
        tabindex="0"
      ></z-input>
    );
  }

  render() {
    return (
      <div
        class={classNames(
          "flatpickr-toggle-container",
          this.hasChildren && this.datepickerid,
          this.flatpickrPosition,
          this.mode
        )}
      >
        {this.hasChildren ? this.renderSlottedContent() : this.renderZInput()}
      </div>
    );
  }
}
