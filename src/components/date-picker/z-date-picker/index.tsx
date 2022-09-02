import {
  Component,
  Prop,
  Element,
  h,
  EventEmitter,
  Event,
  Listen,
  State,
  Watch,
} from "@stencil/core";

import flatpickr from "flatpickr";
import { Italian } from "flatpickr/dist/l10n/it.js";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import classNames from "classnames";

import {
  InputTypeEnum,
  ZDatePickerMode,
  ZDatePickerPosition,
} from "../../../beans";
import { setAriaOptions, setFlatpickrPosition, validateDate } from "../utils";

@Component({
  tag: "z-date-picker",
  styleUrl: "../styles.css",
  shadow: false,
})
export class ZDatePicker {
  @Element() element: HTMLElement;

  /** unique id */
  @Prop() datePickerId: string;

  /** z-input aria label */
  @Prop() ariaLabel?: string;
  /** z-input label */
  @Prop() label?: string;
  /** [Optional] datepicker mode: date, datetime, only months */
  @Prop() mode: ZDatePickerMode = ZDatePickerMode.date;

  @State() flatpickrPosition: ZDatePickerPosition = ZDatePickerPosition.bottom;
  @State() inputError = false;

  private picker;
  private hasChildren: boolean;

  @Watch("mode")
  watchMode() {
    this.setupPickers();
  }

  /** emitted when date changes, returns selected date */
  @Event() dateSelect: EventEmitter;
  emitDateSelect(date) {
    this.dateSelect.emit(date);
  }

  @Listen("keydown", { target: "body", capture: true })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      this.picker?.close();
    }

    if (ev.key === "Enter" || ev.key === " ") {
      !this.hasChildren && this.picker?.open();

      let isCrossIconEntered =
        document.activeElement.classList.contains("resetIcon");

      if (isCrossIconEntered) {
        this.inputError = false;
        this.picker?.setDate([]);
        this.dateSelect.emit(null);
      }

      let flatpickrDayPressed =
        document.activeElement.classList.contains("flatpickr-day");
      if (flatpickrDayPressed) {
        //Sistemare il toggle
      }
      let isPrevArrowEntered = document.activeElement.classList.contains(
        "flatpickr-prev-month"
      );
      let isNextArrowEntered = document.activeElement.classList.contains(
        "flatpickr-next-month"
      );
      let arrowPressed = isPrevArrowEntered || isNextArrowEntered;

      arrowPressed && ev.key === " " && ev.preventDefault();

      if (this.mode === ZDatePickerMode.months) {
        isPrevArrowEntered &&
          this.picker?.changeYear(this.picker.currentYear - 1);

        isNextArrowEntered &&
          this.picker?.changeYear(this.picker.currentYear + 1);

        if (arrowPressed) {
          let calendar =
            this.element.getElementsByClassName("flatpickr-calendar")[0];
          let months = calendar?.querySelectorAll(
            ".flatpickr-monthSelect-month"
          );
          months?.forEach((element) => {
            element.setAttribute(
              "aria-label",
              `${element.innerHTML} ${this.picker?.currentYear}`
            );
          });

          //Force check of the current day
          months &&
            Array.from(months).forEach((element, index) => {
              let curMonth = new Date().getMonth();
              let curYear = new Date().getFullYear();

              if (index === curMonth) {
                if (this.picker?.currentYear === curYear) {
                  element.setAttribute(
                    "class",
                    "flatpickr-monthSelect-month today"
                  );
                } else {
                  element.setAttribute("class", "flatpickr-monthSelect-month");
                }
              }
            });
        }
      } else {
        isPrevArrowEntered && this.picker?.changeMonth(-1);
        isNextArrowEntered && this.picker?.changeMonth(1);
      }
    }
  }

  componentWillLoad() {
    let customToggle = this.element.querySelector("[slot=toggle]");
    this.hasChildren = !!customToggle;
    this.hasChildren && customToggle.setAttribute("data-toggle", "data-toggle");
  }

  componentDidLoad() {
    this.setupPickers();
  }

  setupPickers() {
    const classToAppend = this.hasChildren
      ? `${this.datePickerId}-hidden`
      : this.datePickerId;

    this.picker = flatpickr(`.${classToAppend}`, {
      appendTo: this.element.children[0] as HTMLElement,
      enableTime: this.mode === ZDatePickerMode.dateTime,
      locale: Italian,
      allowInput: true,
      dateFormat:
        this.mode === ZDatePickerMode.dateTime ? "d-m-Y - H:i" : "d-m-Y",
      ariaDateFormat: this.mode === ZDatePickerMode.months ? "F Y" : "d F Y",
      minuteIncrement: 1,
      time_24hr: true,
      onChange: (_selectedDates, dateStr) => {
        this.emitDateSelect(dateStr);
      },
      onOpen: () => {
        setAriaOptions(this.element, this.mode);
        this.flatpickrPosition = setFlatpickrPosition(this.element, this.mode);
      },
      onKeyDown: () => {
        setAriaOptions(this.element, this.mode);
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

  formatDate(date) {
    if (this.mode === ZDatePickerMode.date) {
      return `${flatpickr.formatDate(date, "d-m-Y")}`;
    } else {
      return `${flatpickr.formatDate(date, "d-m-Y - H:i")}`;
    }
  }

  onStopTyping(value) {
    let text = value.detail.value;
    let englishData = text.split("-");
    let time =
      this.mode === ZDatePickerMode.dateTime ? `T${englishData[3]}:00` : "";
    let englishParsedData =
      `${englishData[2]}-${englishData[1]}-${englishData[0]}${time}`
        .split(" ")
        .join("");

    let isValidDate = validateDate(
      englishParsedData,
      this.mode === ZDatePickerMode.dateTime
    );

    if (text === "") {
      this.inputError = false;
      this.picker.setDate([]);
      this.dateSelect.emit(null);
    } else if (!isValidDate) {
      this.inputError = true;
      this.dateSelect.emit(null);
    } else if (isValidDate) {
      this.inputError = false;
      this.picker.setDate([text]);
      this.dateSelect.emit(this.formatDate(new Date(englishParsedData)));
    }
  }

  renderSlottedContent() {
    return (
      <div class={`${this.datePickerId}-hidden`}>
        <input class="hidden-input" data-input></input>
        <slot name="toggle"></slot>
      </div>
    );
  }

  renderZInput() {
    return (
      <div class={classNames("flatpickr-toggle-container")}>
        <z-input
          ariaLabel={this.ariaLabel}
          label={this.label}
          class={classNames(this.datePickerId)}
          type={InputTypeEnum.text}
          icon="event"
          message={false}
          tabindex="0"
          value=""
          onStopTyping={(value) => {
            this.onStopTyping(value);
          }}
          onStartTyping={() => {
            this.inputError = false;
          }}
        ></z-input>
      </div>
    );
  }

  render() {
    return (
      <div
        class={classNames(
          "flatpickr-toggle-container",
          this.flatpickrPosition,
          this.mode
        )}
      >
        {this.hasChildren ? this.renderSlottedContent() : this.renderZInput()}
      </div>
    );
  }
}
