import { newSpecPage } from "@stencil/core/testing";

import { ZList } from "./index";

describe("Suite test ZList", () => {
  it("Test render ZList", async () => {
    const page = await newSpecPage({
      components: [ZList],
      html: `<z-list><z-list-element></z-list-element></z-list>`,
    });

    expect(page.root).toEqualHtml(`
      <z-list role="list" size="medium">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <z-list-element></z-list-element>
      </z-list>
    `);
  });

  it("Test render ZList size prop", async () => {
    const page = await newSpecPage({
      components: [ZList],
      html: `<z-list size="large"><z-list-element></z-list-element></z-list>`,
    });

    expect(page.root).toEqualHtml(`
      <z-list role="list" size="large">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <z-list-element></z-list-element>
      </z-list>
    `);
  });
});
