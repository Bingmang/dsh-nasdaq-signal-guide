import { Panel } from "./panel.jsx";
import { PanelIcon } from "./icon.jsx";
import { en, NS, zh } from "./locale.js";

/** Panel id shared by the sidebar entry and the central panel seat. */
export const PANEL_ID = "nasdaq-signal-guide";

export const inject = ["slots", "locale"];

export function apply(ctx) {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "nasdaq-signal-guide: dictionaries");
  const t = ctx.locale.bind(NS);

  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    name: "sidebar.panellist",
    id: PANEL_ID,
    order: 55,
    label: () => t("panel"),
    locale: NS,
  }, PanelIcon));

  ctx.slots.inject("main", () => ctx.slots.register({
    name: "main",
    key: PANEL_ID,
    locale: NS,
  }, Panel));
}
