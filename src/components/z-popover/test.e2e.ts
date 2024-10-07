import {E2EElement, E2EPage, newE2EPage} from "@stencil/core/testing";

describe("z-popover test end2end", () => {
  let page: E2EPage;
  let iconTrigger: E2EElement;
  let popover: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
        <div class="popover-container" style="height: 100vh;">
          <z-popover
            bind-to="#trigger"
            style="--z-popover-theme--surface: var(--color-surface01); --z-popover-theme--text: var(--color-default-text)"
            position="top_right"
          >
            <div class="container">
              <z-button icon="gear">Impostazioni</z-button>
            </div>
          </z-popover>
          <z-icon
            id="trigger"
            name="plus-square-filled"
            onclick="this.parentNode.querySelector('z-popover').open = !this.parentNode.querySelector('z-popover').open"
          ></z-icon>
        </div>
      `,
    });

    iconTrigger = await page.find("#trigger");
    popover = await page.find("z-popover");
  });

  it("toggle popover on click", async () => {
    const openChange = await page.spyOnEvent("openChange");
    expect(await popover.isVisible()).toEqual(false);
    await iconTrigger.click();
    expect(openChange).toHaveReceivedEventDetail({open: true});
    await page.waitForChanges();
    expect(await popover.isVisible()).toEqual(true);
    await iconTrigger.click();
    expect(openChange).toHaveReceivedEventDetail({open: false});
    await page.waitForChanges();
  });

  it("change position popover", async () => {
    const positionChange = await page.spyOnEvent("positionChange");
    await iconTrigger.click();
    await page.waitForChanges();
    popover.setAttribute("position", "top_left");
    await page.waitForChanges();
    expect(positionChange).toHaveReceivedEventDetail({position: "top_left"});
  });
});
