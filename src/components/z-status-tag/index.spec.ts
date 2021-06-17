import { newSpecPage } from "@stencil/core/testing";

import { ZStatusTag } from "./index";

describe("Suite test ZStatusTag", () => {
  it("Test render z-status-tag default", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue default"></z-status-tag>`
    );
  });

  it("Test render icon", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag icon="gear"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue default" icon="gear"><z-icon name="gear" /></z-status-tag>`
    );
  });

  it("Test render text", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag text="in progress"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue default" text="in progress"><span class="body-5-sb">in progress</span></z-status-tag>`
    );
  });

  it("Test render both icon and text", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag icon="gear" text="in progress"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue default" icon="gear" text="in progress">
        <z-icon name="gear"></z-icon>
        <span class="body-5-sb">in progress</span>
      </z-status-tag>`
    );
  });

  it("Test expandable prop", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag expandable="true"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue default" expandable="true"></z-status-tag>`
    );
  });

  it("Test type prop", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag type="yellow"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="yellow default" type="yellow"></z-status-tag>`
    );
  });

  it("Test variant prop", async () => {
    const page = await newSpecPage({
      components: [ZStatusTag],
      html: `<z-status-tag variant="dark"></z-status-tag>`,
    });

    expect(page.root).toEqualHtml(
      `<z-status-tag class="blue dark" variant="dark"></z-status-tag>`
    );
  });
});
