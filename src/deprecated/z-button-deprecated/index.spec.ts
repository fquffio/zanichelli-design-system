import { newSpecPage } from "@stencil/core/testing";

import { ZButton } from "./index";

describe("Suite test ZButton", () => {
  it("Test render ZButton", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated></z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" style="pointer-events: auto;">
        <mock:shadow-root>
          <slot name="element">
            <button type="button" class="big primary">
              <slot></slot>
            </button>
          </slot>
        </mock:shadow-root>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton con contenuto", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated>label</z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" style="pointer-events: auto;">
      <mock:shadow-root>
        <slot name="element">
          <button type="button" class="big primary">
            <slot></slot>
          </button>
        </slot>
      </mock:shadow-root>
      label
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton con icon", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated icon="icon"></z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" icon="icon" style="pointer-events: auto;">
      <mock:shadow-root>
        <slot name="element">
          <button type="button" class="big primary">
            <z-icon name="icon" height="16" width="16"></z-icon>
            <slot></slot>
          </button>
        </slot>
      </mock:shadow-root>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton variant", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated variant="secondary"></z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="secondary" style="pointer-events: auto;">
      <mock:shadow-root>
        <slot name="element">
          <button type="button" class="big secondary">
            <slot></slot>
          </button>
        </slot>
      </mock:shadow-root>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton small", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated issmall></z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated issmall size="big" variant="primary" style="pointer-events: auto;">
      <mock:shadow-root>
        <slot name="element">
          <button type="button" class="big issmall primary">
            <slot></slot>
          </button>
        </slot>
      </mock:shadow-root>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton disabled", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated disabled></z-button-deprecated>`,
    });
    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" disabled style="pointer-events: none;">
      <mock:shadow-root>
        <slot name="element">
          <button type="button" class="big primary" disabled>
            <slot></slot>
          </button>
        </slot>
      </mock:shadow-root>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton with slotted button", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated>
        <button>invio</button>
      </z-button-deprecated>`,
    });

    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" style="pointer-events: auto;">
        <mock:shadow-root>
          <slot name="element">
            <button type="button" class="big primary">
              <slot></slot>
            </button>
          </slot>
        </mock:shadow-root>
        <button>invio</button>
      </z-button-deprecated>
    `);
  });

  it("Test render ZButton with link and variant", async () => {
    const page = await newSpecPage({
      components: [ZButton],
      html: `<z-button-deprecated variant="primary">
        <a href="https://wikipedia.com">Link</button>
      </z-button-deprecated>`,
    });

    expect(page.root).toEqualHtml(`
      <z-button-deprecated size="big" variant="primary" style="pointer-events: auto;">
        <mock:shadow-root>
          <slot name="element">
            <button type="button" class="big primary">
              <slot></slot>
            </button>
          </slot>
        </mock:shadow-root>
        <a href="https://wikipedia.com">Link</button>
      </z-button-deprecated>
    `);
  });
});
