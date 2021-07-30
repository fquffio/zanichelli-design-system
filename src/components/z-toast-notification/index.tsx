import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";
import { ToastNotificationEnum, ToastNotificationTypes } from "../../beans";
import { mobileBreakpoint } from "../../constants/breakpoints";

@Component({
  tag: "z-toast-notification",
  styleUrl: "styles.css",
  shadow: true,
})
export class ZToastNotification {
  @Element() hostElement: HTMLElement;

  @Prop() titolo?: string;
  @Prop() message: string;
  @Prop() closebutton: boolean;
  @Prop() autoclose?: number;
  @Prop() type?: ToastNotificationTypes;

  private toastText: HTMLElement;
  private toastButton: HTMLElement;
  private toastIcon: HTMLElement;
  private toastContainer: HTMLElement;

  /** notification close event */
  @Event() toastClose: EventEmitter;
  emitToastClose() {
    this.toastClose.emit();
    console.log("toast closed!");
  }

  /** notification action event */
  @Event() toastAction: EventEmitter;
  emitToastAction() {
    this.toastAction.emit();
    console.log("toast action!");
  }

  componentDidLoad() {
    this.setCorrectPaddingAndMargin();

    if (this.autoclose && typeof this.autoclose === "number") {
      this.startClosingTimeout(this.autoclose);
    }

    if (window.innerWidth <= mobileBreakpoint) {
      this.setMobileView();
    }
  }

  setCorrectPaddingAndMargin() {
    if (this.closebutton) this.toastButton.style.marginRight = "16px";

    if (this.toastText.offsetHeight > 20) {
      this.toastContainer.style.padding = "16px";
    } else {
      this.toastContainer.style.padding = "8px 16px";
    }
  }

  setMobileView() {
    const container = this.hostElement.shadowRoot.getElementById("external-container");
    if (this.toastText.offsetHeight > 20) {
      this.toastIcon.style.alignSelf = "flex-start";
      container.append(this.toastButton);
      this.toastButton.style.marginTop = "16px";
    }
  }

  startClosingTimeout(time: number) {
    setTimeout(() => this.emitToastClose(), time);
  }

  render() {
    return (
      <div id="external-container" ref={(el) => (this.toastContainer = el as HTMLElement)} class={this.type ? this.type : ToastNotificationEnum.dark}>
        <div id="flex-container">
          <div id="text" ref={(el) => (this.toastText = el as HTMLElement)}>
            <span class="title">{this.titolo}</span>
            <span class="message">{this.message}</span>
          </div>
          <div
            id="button"
            onClick={() => this.emitToastAction()}
            ref={(el) => (this.toastButton = el as HTMLElement)}
          >
            <slot name="button" />
          </div>
          <div id="icon" ref={(el) => (this.toastIcon = el as HTMLElement)}>
            {this.closebutton && (
              <z-icon
                name="multiply-circled"
                width={15}
                height={15}
                onClick={() => this.emitToastClose()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
