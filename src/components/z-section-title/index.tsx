import { Component, Element, h, Prop } from "@stencil/core";
import {
  DividerSize,
  ZSectionTitleDividerPosition,
  ZSectionTitleDividerPositions,
} from "../../beans";

/**
 * Section title component.
 * An optional secondary title can be put over the primary one.
 *
 * @slot secondary-title - Slot for the secondary title. When present, the divider is always displayed under it,
 * following its width and removing the one for the primary title.
 * @slot primary-title - Slot for the primary title.
 */
@Component({
  tag: "z-section-title",
  styleUrl: "styles.css",
  shadow: true
})
export class ZSectionTitle {
  /**
   * Divider position for the primary title.
   * This prop becomes useless when the secondary title is present,
   * because the divider is always displayed under it.
   */
  @Prop({ reflect: true }) dividerPosition: ZSectionTitleDividerPosition =
    ZSectionTitleDividerPositions.before;

  /**
   * Whether the primary title text is uppercase.
   */
  @Prop({ reflect: true }) uppercase: Boolean = true;

  @Element() host: HTMLElement;

  private hasSecondaryTitle: boolean;

  componentWillRender() {
    this.hasSecondaryTitle = !!this.host.querySelector("[slot=secondary-title]");
  }

  render() {
    return [
      <slot name="secondary-title" />,

      !this.hasSecondaryTitle &&
      this.dividerPosition == ZSectionTitleDividerPositions.before &&
      <z-divider size={DividerSize.large} color="z-section-title--divider-color" />,

      <slot name="primary-title" />,

      !this.hasSecondaryTitle &&
      this.dividerPosition == ZSectionTitleDividerPositions.after &&
        <z-divider size={DividerSize.large} color="z-section-title--divider-color" />,
    ];
  }
}
