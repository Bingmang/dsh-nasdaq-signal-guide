/**
 * GENERATED FILE - edit client-src/*.jsx and run `node build-client.mjs`.
 * Registers the panel and the left-rail entry into the Harness Web UI.
 */
window.__ModuleLoader__.load({
  id: "dsh-nasdaq-signal-guide",
  factory: (require) => {
    const module = { exports: {} };
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // client-src/client.jsx
    var client_exports = {};
    __export(client_exports, {
      PANEL_ID: () => PANEL_ID,
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(client_exports);

    // client-src/panel.jsx
    var import_react3 = __toESM(require("react"), 1);

    // client-src/styles.js
    var CSS = `
    .nsg-page{
      --nsg-bg:var(--dsw-alias-bg-base,#f7f8fa);
      --nsg-surface:var(--dsw-alias-bg-layer-1,#ffffff);
      --nsg-surface-2:var(--dsw-alias-bg-layer-2,#f0f2f6);
      --nsg-overlay:var(--dsw-alias-bg-overlay,#ffffff);
      --nsg-border:var(--dsw-alias-border-l1,rgba(16,24,40,.09));
      --nsg-border-strong:var(--dsw-alias-border-l2,rgba(16,24,40,.16));
      --nsg-text:var(--dsw-alias-label-primary,#1f2329);
      --nsg-muted:var(--dsw-alias-label-secondary,#5c626b);
      --nsg-brand:var(--dsw-alias-brand-primary,#4d6bfe);
      --nsg-success:var(--dsw-alias-state-success-primary,#1f9d55);
      --nsg-warn:var(--dsw-alias-state-warn-primary,#c98a00);
      --nsg-error:var(--dsw-alias-state-error-primary,#d93026);
      --nsg-idle:var(--dsw-alias-state-idle-primary,#8a919c);
      --nsg-accent:var(--nsg-brand);
      --nsg-radius:14px;
      position:relative;
      height:100%;
      min-height:0;
      overflow-y:auto;
      overflow-x:hidden;
      padding:22px 26px 30px;
      color:var(--nsg-text);
      background:var(--nsg-bg);
      font-size:13px;
      line-height:1.55;
      box-sizing:border-box;
    }
    .nsg-page[data-accent="green"]{--nsg-accent:var(--nsg-success);}
    .nsg-page[data-accent="blue"]{--nsg-accent:var(--nsg-brand);}
    .nsg-page[data-accent="amber"]{--nsg-accent:var(--nsg-warn);}
    .nsg-page[data-accent="red"]{--nsg-accent:var(--nsg-error);}
    .nsg-page *,.nsg-page *::before,.nsg-page *::after{box-sizing:border-box;}
    .nsg-shell{width:100%;max-width:1160px;margin:0 auto;display:flex;flex-direction:column;gap:16px;}

    .nsg-topbar{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;flex-wrap:wrap;}
    .nsg-brand{display:flex;align-items:center;gap:12px;min-width:0;}
    .nsg-brand-mark{
      display:grid;place-items:center;width:38px;height:38px;flex:0 0 auto;border-radius:12px;
      color:#fff;font-weight:700;font-size:13px;letter-spacing:-.03em;
      background:linear-gradient(145deg,var(--nsg-brand),var(--nsg-success));
      box-shadow:0 6px 18px color-mix(in srgb,var(--nsg-brand) 28%,transparent);
    }
    .nsg-brand h1{margin:0;font-size:20px;line-height:1.25;font-weight:650;letter-spacing:-.02em;}
    .nsg-brand p{margin:2px 0 0;color:var(--nsg-muted);font-size:12px;}
    .nsg-topbar-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end;}
    .nsg-pill{
      display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:999px;
      border:.5px solid var(--nsg-border-strong);color:var(--nsg-muted);font-size:11px;white-space:nowrap;
      background:var(--nsg-surface);
    }
    .nsg-pill i{width:6px;height:6px;border-radius:50%;background:var(--nsg-success);box-shadow:0 0 8px var(--nsg-success);}
    .nsg-pill.stale i{background:var(--nsg-warn);box-shadow:0 0 8px var(--nsg-warn);}
    .nsg-pill.bad i{background:var(--nsg-error);box-shadow:0 0 8px var(--nsg-error);}

    .nsg-btn{
      display:inline-flex;align-items:center;gap:6px;min-height:30px;padding:5px 11px;
      border:.5px solid var(--nsg-border-strong);border-radius:9px;background:var(--nsg-surface);
      color:var(--nsg-text);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap;
      transition:background .15s ease,border-color .15s ease,opacity .15s ease;
    }
    .nsg-btn:hover{background:var(--nsg-surface-2);border-color:var(--nsg-accent);}
    .nsg-btn:disabled{opacity:.55;cursor:default;}
    .nsg-btn.primary{color:#fff;border-color:transparent;background:var(--nsg-brand);}
    .nsg-btn.primary:hover{background:color-mix(in srgb,var(--nsg-brand) 86%,#000);}
    .nsg-btn.ghost{border-color:transparent;background:transparent;color:var(--nsg-muted);}
    .nsg-btn.ghost:hover{color:var(--nsg-text);background:var(--nsg-surface-2);}
    .nsg-spin{display:inline-block;width:12px;height:12px;border-radius:50%;border:1.5px solid currentColor;border-top-color:transparent;animation:nsg-spin .8s linear infinite;}
    @keyframes nsg-spin{to{transform:rotate(360deg);}}

    .nsg-banner{
      display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:10px;
      border:.5px solid color-mix(in srgb,var(--nsg-error) 45%,transparent);
      background:color-mix(in srgb,var(--nsg-error) 8%,var(--nsg-surface));
      color:var(--nsg-text);font-size:12px;
    }
    .nsg-banner strong{color:var(--nsg-error);font-weight:600;margin-right:4px;}
    .nsg-banner .nsg-btn{margin-left:auto;flex:0 0 auto;}
    .nsg-banner.info{border-color:color-mix(in srgb,var(--nsg-brand) 40%,transparent);background:color-mix(in srgb,var(--nsg-brand) 7%,var(--nsg-surface));}

    .nsg-hero{
      position:relative;overflow:hidden;border:.5px solid var(--nsg-border-strong);
      border-radius:18px;background:var(--nsg-surface);padding:22px 24px;
      display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:24px;
      transition:opacity .2s ease;
    }
    .nsg-hero::after{
      content:"";position:absolute;inset:auto -80px -160px auto;width:360px;height:360px;border-radius:50%;
      background:radial-gradient(circle,color-mix(in srgb,var(--nsg-accent) 20%,transparent),transparent 68%);
      pointer-events:none;
    }
    .nsg-hero.loading{opacity:.62;}
    .nsg-hero-main{position:relative;z-index:1;min-width:0;}
    .nsg-meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;color:var(--nsg-muted);font-size:11px;}
    .nsg-live{color:var(--nsg-text);font-size:11px;}
    .nsg-live i,.nsg-accent-dot{display:inline-block;width:6px;height:6px;margin-right:6px;border-radius:50%;background:var(--nsg-accent);box-shadow:0 0 8px var(--nsg-accent);}
    .nsg-kicker{margin:18px 0 6px;color:var(--nsg-muted);font-size:10px;font-weight:650;letter-spacing:.14em;text-transform:uppercase;}
    .nsg-headline{display:flex;align-items:center;gap:18px;}
    .nsg-headline>strong{
      flex:0 0 auto;color:var(--nsg-accent);font-size:clamp(38px,4.4vw,54px);line-height:1;
      font-weight:560;letter-spacing:-.06em;
    }
    .nsg-headline>div{min-width:0;padding-left:18px;border-left:1px solid color-mix(in srgb,var(--nsg-accent) 32%,transparent);}
    .nsg-headline h2{margin:0;font-size:clamp(19px,2.2vw,25px);line-height:1.25;font-weight:620;letter-spacing:-.02em;}
    .nsg-headline p{margin:5px 0 0;color:var(--nsg-muted);font-size:12px;line-height:1.55;}
    .nsg-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:20px;}
    .nsg-actions article{
      min-width:0;padding:12px 14px;border:.5px solid var(--nsg-border);border-radius:12px;
      background:var(--nsg-surface-2);display:grid;align-content:start;gap:5px;
    }
    .nsg-actions span{display:flex;align-items:center;gap:7px;color:var(--nsg-muted);font-size:10px;}
    .nsg-actions span i{
      display:grid;place-items:center;width:18px;height:18px;border-radius:6px;
      border:.5px solid color-mix(in srgb,var(--nsg-accent) 35%,transparent);
      color:var(--nsg-accent);font-style:normal;font-size:9px;font-weight:650;
    }
    .nsg-actions strong{font-size:14px;font-weight:600;line-height:1.4;}
    .nsg-actions small{color:var(--nsg-muted);font-size:11px;line-height:1.5;}
    .nsg-score{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;}
    .nsg-orb{
      width:158px;aspect-ratio:1;display:grid;place-items:center;align-content:center;border-radius:50%;
      border:1px solid color-mix(in srgb,var(--nsg-accent) 40%,transparent);
      background:radial-gradient(circle at 40% 35%,color-mix(in srgb,var(--nsg-accent) 20%,transparent),var(--nsg-surface-2) 66%);
      box-shadow:inset 0 0 32px color-mix(in srgb,var(--nsg-accent) 12%,transparent);
    }
    .nsg-orb span,.nsg-orb em{color:var(--nsg-muted);font-size:10px;font-style:normal;letter-spacing:.06em;}
    .nsg-orb strong{margin:2px 0;font-size:48px;line-height:1;font-weight:560;letter-spacing:-.05em;}
    .nsg-orb small{font-size:19px;color:var(--nsg-muted);}
    .nsg-score p{margin:0;color:var(--nsg-muted);font-size:11px;text-align:center;}

    .nsg-section{display:flex;flex-direction:column;gap:12px;margin-top:6px;}
    .nsg-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;}
    .nsg-section-head h2{margin:0;font-size:17px;font-weight:620;letter-spacing:-.02em;}
    .nsg-section-head p{margin:2px 0 0;color:var(--nsg-muted);font-size:11.5px;line-height:1.6;max-width:640px;}
    .nsg-eyebrow{margin:0 0 5px;color:var(--nsg-muted);font-size:10px;font-weight:650;letter-spacing:.16em;text-transform:uppercase;}

    .nsg-signal-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}
    .nsg-signal{
      min-width:0;padding:18px;border:.5px solid var(--nsg-border);border-radius:var(--nsg-radius);
      background:var(--nsg-surface);display:flex;flex-direction:column;gap:6px;
    }
    .nsg-signal-top{display:flex;align-items:center;justify-content:space-between;color:var(--nsg-muted);font-size:10px;font-weight:600;letter-spacing:.08em;}
    .nsg-signal-top i{width:7px;height:7px;border-radius:50%;background:var(--nsg-idle);}
    .nsg-signal.on .nsg-signal-top i{background:var(--nsg-success);box-shadow:0 0 10px var(--nsg-success);}
    .nsg-signal.warn .nsg-signal-top i{background:var(--nsg-warn);box-shadow:0 0 10px var(--nsg-warn);}
    .nsg-signal-name{margin:14px 0 0;color:var(--nsg-muted);font-size:11.5px;}
    .nsg-signal>strong{font-size:32px;line-height:1.1;font-weight:600;letter-spacing:-.045em;font-variant-numeric:tabular-nums;}
    .nsg-signal h3{margin:0;color:var(--nsg-muted);font-size:12px;font-weight:500;}
    .nsg-meter{height:3px;margin-top:10px;border-radius:99px;background:var(--nsg-surface-2);overflow:hidden;}
    .nsg-meter span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--nsg-brand),var(--nsg-success));transition:width .35s ease;}
    .nsg-signal.warn .nsg-meter span{background:linear-gradient(90deg,var(--nsg-warn),color-mix(in srgb,var(--nsg-warn) 55%,#fff));}
    .nsg-signal.on .nsg-meter span{background:linear-gradient(90deg,var(--nsg-success),color-mix(in srgb,var(--nsg-success) 55%,#fff));}
    .nsg-signal small{color:var(--nsg-muted);font-size:10.5px;}
    .nsg-signal-source{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:10px;border-top:.5px solid var(--nsg-border);}
    .nsg-signal-source span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--nsg-muted);font-size:10px;}
    .nsg-mode{flex:0 0 auto;padding:2px 7px;border-radius:999px;border:.5px solid var(--nsg-border-strong);color:var(--nsg-muted);font-size:9.5px;font-style:normal;}
    .nsg-mode.live{color:var(--nsg-success);border-color:color-mix(in srgb,var(--nsg-success) 45%,transparent);background:color-mix(in srgb,var(--nsg-success) 8%,transparent);}
    .nsg-secondary{
      display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;padding:14px 4px;
      border:.5px solid var(--nsg-border);border-radius:var(--nsg-radius);background:var(--nsg-surface);
    }
    .nsg-secondary>div{display:grid;gap:3px;padding:0 16px;border-right:.5px solid var(--nsg-border);min-width:0;}
    .nsg-secondary>div:last-child{border-right:0;}
    .nsg-secondary span{color:var(--nsg-muted);font-size:10.5px;}
    .nsg-secondary strong{font-size:15px;font-weight:600;font-variant-numeric:tabular-nums;}
    .nsg-secondary small{color:var(--nsg-muted);font-size:10px;line-height:1.4;}

    .nsg-history{border:.5px solid var(--nsg-border);border-radius:var(--nsg-radius);background:var(--nsg-surface);padding:16px;}
    .nsg-history-ranges{display:inline-flex;gap:3px;padding:3px;border:.5px solid var(--nsg-border);border-radius:9px;background:var(--nsg-surface-2);}
    .nsg-history-ranges button{padding:4px 10px;border:0;border-radius:6px;background:transparent;color:var(--nsg-muted);font:inherit;font-size:11px;cursor:pointer;}
    .nsg-history-ranges button.active{background:var(--nsg-surface);color:var(--nsg-text);box-shadow:0 1px 2px rgba(0,0,0,.08);}
    .nsg-chart-meta{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:0 4px 4px;flex-wrap:wrap;}
    .nsg-chart-meta span{font-size:12px;font-weight:600;}
    .nsg-chart-meta small{color:var(--nsg-muted);font-size:10.5px;}
    .nsg-chart{display:block;width:100%;height:auto;overflow:visible;touch-action:pan-y;}
    .nsg-chart line{stroke:var(--nsg-border);stroke-width:1;}
    .nsg-chart text{fill:var(--nsg-muted);font:11px var(--font-geist-sans,inherit);}
    .nsg-chart .nsg-y-label text{fill:var(--nsg-text);font-size:11px;font-weight:520;}
    .nsg-area{fill:color-mix(in srgb,var(--nsg-brand) 14%,transparent);}
    .nsg-qqq-line{fill:none;stroke:var(--nsg-idle);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round;opacity:.55;stroke-dasharray:4 4;}
    .nsg-line{fill:none;stroke:var(--nsg-brand);stroke-width:2;stroke-linejoin:round;stroke-linecap:round;}
    .nsg-dot{transition:r .12s ease,opacity .12s ease;}
    .nsg-dot.big-bottom{fill:var(--nsg-success);}
    .nsg-dot.small-bottom{fill:var(--nsg-brand);}
    .nsg-dot.normal{fill:var(--nsg-idle);}
    .nsg-dot.high-near-high{fill:var(--nsg-warn);}
    .nsg-dot.prolonged-hot{fill:color-mix(in srgb,var(--nsg-warn) 70%,var(--nsg-error));}
    .nsg-dot.quick-crash{fill:var(--nsg-error);}
    .nsg-chart .nsg-focus-line{stroke:var(--nsg-border-strong);stroke-dasharray:3 4;}
    .nsg-focus-halo{stroke-width:1.5;opacity:.5;}
    .nsg-chart .nsg-x-label{fill:var(--nsg-muted);font-size:10.5px;font-weight:520;}
    .nsg-chart .nsg-qqq-axis{fill:var(--nsg-muted);font-size:10px;font-weight:540;}
    .nsg-hit-area{fill:transparent;cursor:crosshair;}
    .nsg-legend{display:flex;flex-wrap:wrap;gap:6px 16px;padding:6px 4px 0;color:var(--nsg-muted);font-size:10.5px;}
    .nsg-legend span{display:inline-flex;align-items:center;gap:5px;}
    .nsg-legend i{width:6px;height:6px;border-radius:50%;background:currentColor;}
    .nsg-legend .qqq b{display:inline-block;width:12px;height:2px;border-radius:99px;background:var(--nsg-idle);}
    .nsg-history-detail{margin-top:12px;padding:14px;border:.5px solid var(--nsg-border);border-radius:12px;background:var(--nsg-surface-2);}
    .nsg-history-head{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-bottom:12px;border-bottom:.5px solid var(--nsg-border);}
    .nsg-history-summary{display:flex;align-items:center;gap:16px;min-width:0;flex-wrap:wrap;}
    .nsg-history-date{display:grid;gap:5px;font-size:11px;color:var(--nsg-muted);}
    .nsg-history-date em{width:fit-content;padding:2px 7px;border:.5px solid var(--nsg-border-strong);border-radius:999px;font-size:9.5px;font-style:normal;}
    .nsg-history-action{min-width:0;padding-left:16px;border-left:.5px solid var(--nsg-border);}
    .nsg-history-action strong{display:block;font-size:18px;line-height:1.2;font-weight:620;letter-spacing:-.02em;}
    .nsg-history-action h3{margin:4px 0 0;font-size:12px;font-weight:500;line-height:1.55;color:var(--nsg-muted);}
    .nsg-history-body{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(220px,.55fr);gap:10px;margin-top:12px;}
    .nsg-exec{padding:12px;border:.5px solid var(--nsg-border);border-radius:10px;background:var(--nsg-surface);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;}
    .nsg-exec>span{grid-column:1/-1;color:var(--nsg-muted);font-size:10px;letter-spacing:.06em;}
    .nsg-exec b{min-width:0;padding:8px;border:.5px solid var(--nsg-border);border-radius:8px;font-size:10px;font-weight:500;line-height:1.5;color:var(--nsg-text);}
    .nsg-exec b i{display:block;margin-bottom:3px;color:var(--nsg-brand);font-style:normal;font-size:9px;font-weight:650;}
    .nsg-ammo{padding:12px;border:.5px solid color-mix(in srgb,var(--nsg-brand) 32%,transparent);border-radius:10px;background:color-mix(in srgb,var(--nsg-brand) 5%,var(--nsg-surface));display:grid;align-content:start;gap:5px;}
    .nsg-ammo span{color:var(--nsg-muted);font-size:10px;letter-spacing:.06em;}
    .nsg-ammo b{color:var(--nsg-brand);font-size:12.5px;font-weight:600;line-height:1.45;}
    .nsg-ammo small{color:var(--nsg-muted);font-size:10px;line-height:1.55;}
    .nsg-history-values{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:10px;}
    .nsg-history-values>div{min-width:0;padding:9px 11px;border:.5px solid var(--nsg-border);border-radius:9px;background:var(--nsg-surface);display:grid;grid-template-columns:1fr auto;align-items:center;gap:2px 8px;}
    .nsg-history-values span{color:var(--nsg-muted);font-size:10px;}
    .nsg-history-values b{font-size:12.5px;font-weight:600;font-variant-numeric:tabular-nums;}
    .nsg-history-values small{grid-column:1/-1;color:var(--nsg-muted);font-size:9.5px;}
    .nsg-note{margin:8px 0 0;color:var(--nsg-muted);font-size:10px;line-height:1.6;}

    .nsg-rule{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;padding:20px;border:.5px solid var(--nsg-border);border-radius:var(--nsg-radius);background:var(--nsg-surface);}
    .nsg-rule h2{margin:0;font-size:16px;font-weight:620;}
    .nsg-rule-note{margin:8px 0 0;color:var(--nsg-muted);font-size:11.5px;line-height:1.65;}
    .nsg-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;}
    .nsg-steps li{display:flex;gap:12px;padding:0 0 14px;position:relative;}
    .nsg-steps li::after{content:"";position:absolute;left:13px;top:28px;bottom:2px;width:1px;background:var(--nsg-border);}
    .nsg-steps li:last-child{padding-bottom:0;}
    .nsg-steps li:last-child::after{display:none;}
    .nsg-steps b{flex:0 0 27px;height:27px;display:grid;place-items:center;border:.5px solid var(--nsg-border-strong);border-radius:50%;font-size:10px;font-weight:600;color:var(--nsg-muted);}
    .nsg-steps li.hit b{color:#fff;background:var(--nsg-accent);border-color:var(--nsg-accent);}
    .nsg-steps li div{min-width:0;display:grid;gap:2px;}
    .nsg-steps strong{font-size:12.5px;font-weight:600;}
    .nsg-steps span{color:var(--nsg-muted);font-size:11px;line-height:1.5;}

    .nsg-method{border:.5px solid var(--nsg-border);border-radius:var(--nsg-radius);background:var(--nsg-surface);padding:0 16px;}
    .nsg-method summary{cursor:pointer;padding:12px 0;font-size:12.5px;font-weight:600;list-style:none;display:flex;align-items:center;gap:8px;}
    .nsg-method summary::-webkit-details-marker{display:none;}
    .nsg-method summary::before{content:"\u25B8";color:var(--nsg-muted);font-size:10px;transition:transform .15s ease;}
    .nsg-method[open] summary::before{transform:rotate(90deg);}
    .nsg-method-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 24px;padding:2px 0 16px;}
    .nsg-method-grid p{margin:0;color:var(--nsg-muted);font-size:11.5px;line-height:1.7;}
    .nsg-method-grid span{display:block;margin-bottom:2px;color:var(--nsg-text);font-weight:600;}

    .nsg-sources{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;}
    .nsg-sources a{
      min-width:0;padding:10px 12px;border:.5px solid var(--nsg-border);border-radius:10px;
      background:var(--nsg-surface);display:grid;gap:2px;text-decoration:none;color:inherit;position:relative;
      transition:border-color .15s ease,background .15s ease;
    }
    .nsg-sources a:hover{border-color:var(--nsg-border-strong);background:var(--nsg-surface-2);}
    .nsg-sources span{color:var(--nsg-muted);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;padding-right:34px;}
    .nsg-sources strong{font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .nsg-sources small{color:var(--nsg-muted);font-size:9.5px;}
    .nsg-sources em{position:absolute;right:8px;top:8px;}
    .nsg-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:4px;color:var(--nsg-muted);font-size:10.5px;}
    .nsg-footer a{color:var(--nsg-brand);text-decoration:none;}
    .nsg-credit{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px 14px;border:.5px solid var(--nsg-border);border-radius:10px;background:var(--nsg-surface);color:var(--nsg-muted);font-size:10.5px;}
    .nsg-credit-links{display:flex;gap:12px;flex-wrap:wrap;}
    .nsg-empty{padding:36px 16px;text-align:center;color:var(--nsg-muted);font-size:12px;}

    .nsg-sync-note{color:var(--nsg-muted);font-size:10.5px;}

    .nsg-date{position:relative;display:flex;flex-direction:column;gap:1px;min-width:178px;}
    .nsg-date>span{color:var(--nsg-muted);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;}
    .nsg-date-trigger{
      display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:27px;padding:2px 0;
      border:0;background:transparent;color:var(--nsg-text);font:inherit;font-size:14px;font-weight:600;cursor:pointer;text-align:left;
    }
    .nsg-date-trigger:hover strong{color:var(--nsg-accent);}
    .nsg-date-trigger i{color:var(--nsg-muted);font-style:normal;font-size:10px;}
    .nsg-date small{min-height:13px;max-width:236px;color:var(--nsg-muted);font-size:9.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .nsg-date small.loading{color:var(--nsg-accent);}
    .nsg-cal-scrim{position:fixed;inset:0;z-index:30;border:0;background:rgba(10,14,24,.18);cursor:default;}
    .nsg-cal{
      position:absolute;z-index:31;top:calc(100% + 8px);right:0;width:300px;padding:12px;
      border:.5px solid var(--nsg-border-strong);border-radius:14px;background:var(--nsg-overlay);
      box-shadow:0 18px 48px rgba(0,0,0,.18);
    }
    .nsg-cal-toolbar{display:grid;grid-template-columns:28px 1fr 28px;align-items:center;gap:6px;}
    .nsg-cal-toolbar>button{width:28px;height:28px;padding:0;border:.5px solid var(--nsg-border);border-radius:8px;background:var(--nsg-surface);color:var(--nsg-text);font-size:18px;line-height:1;cursor:pointer;}
    .nsg-cal-toolbar>button:disabled{opacity:.3;cursor:default;}
    .nsg-cal-toolbar>div{display:flex;justify-content:center;gap:4px;}
    .nsg-cal-toolbar select{padding:4px 6px;border:.5px solid transparent;border-radius:7px;background:var(--nsg-surface-2);color:var(--nsg-text);font:inherit;font-size:11.5px;cursor:pointer;}
    .nsg-cal-toolbar select:focus-visible{outline:1px solid var(--nsg-accent);}
    .nsg-cal-weekdays,.nsg-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
    .nsg-cal-weekdays{margin:10px 0 4px;}
    .nsg-cal-weekdays span{display:grid;place-items:center;height:22px;color:var(--nsg-muted);font-size:9.5px;}
    .nsg-cal-grid button,.nsg-cal-grid>span{aspect-ratio:1;min-width:0;}
    .nsg-cal-grid button{border:.5px solid transparent;border-radius:8px;background:transparent;color:var(--nsg-text);font:inherit;font-size:11px;cursor:pointer;}
    .nsg-cal-grid button:hover{background:var(--nsg-surface-2);}
    .nsg-cal-grid button.today{border-color:color-mix(in srgb,var(--nsg-accent) 50%,transparent);color:var(--nsg-accent);}
    .nsg-cal-grid button.selected{background:var(--nsg-accent);border-color:var(--nsg-accent);color:#fff;}
    .nsg-cal-grid button:disabled{opacity:.25;cursor:default;}
    .nsg-cal-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px;padding-top:8px;border-top:.5px solid var(--nsg-border);}
    .nsg-cal-footer span{color:var(--nsg-muted);font-size:9px;line-height:1.4;}
    .nsg-cal-footer button{padding:4px 8px;border:.5px solid color-mix(in srgb,var(--nsg-accent) 40%,transparent);border-radius:7px;background:color-mix(in srgb,var(--nsg-accent) 8%,transparent);color:var(--nsg-accent);font:inherit;font-size:10px;cursor:pointer;white-space:nowrap;}

    @media (max-width:960px){
      .nsg-hero{grid-template-columns:minmax(0,1fr);}
      .nsg-score{flex-direction:row;justify-content:flex-start;gap:18px;}
      .nsg-orb{width:120px;}
      .nsg-orb strong{font-size:36px;}
      .nsg-signal-grid{grid-template-columns:1fr;}
      .nsg-secondary{grid-template-columns:1fr 1fr;gap:10px 0;}
      .nsg-secondary>div:nth-child(2){border-right:0;}
      .nsg-rule{grid-template-columns:1fr;}
      .nsg-method-grid{grid-template-columns:1fr;}
      .nsg-sources{grid-template-columns:repeat(2,minmax(0,1fr));}
      .nsg-history-body{grid-template-columns:1fr;}
      .nsg-history-values,.nsg-exec{grid-template-columns:repeat(2,minmax(0,1fr));}
    }
    @media (max-width:640px){
      .nsg-page{padding:14px 12px 24px;}
      .nsg-headline{align-items:flex-start;gap:12px;}
      .nsg-headline>div{padding-left:12px;}
      .nsg-actions{grid-template-columns:1fr;}
      .nsg-secondary{grid-template-columns:1fr;}
      .nsg-secondary>div{border-right:0;border-bottom:.5px solid var(--nsg-border);padding:8px 12px;}
      .nsg-secondary>div:last-child{border-bottom:0;}
      .nsg-history-values,.nsg-exec{grid-template-columns:1fr;}
      .nsg-sources{grid-template-columns:1fr;}
      .nsg-brand h1{font-size:17px;}
    }
    @media (prefers-reduced-motion:reduce){
      .nsg-page *{transition:none !important;animation:none !important;}
    }
    `;

    // client-src/calendar.jsx
    var import_react = __toESM(require("react"), 1);

    // client-src/util.js
    var EARLIEST_DATE = "2000-01-03";
    var TIME_ZONE = "Asia/Shanghai";
    function fmt(template, params) {
      if (typeof template !== "string") return "";
      if (params === void 0) return template;
      return template.replace(/\{(\w+)\}/g, (match, key) => params[key] === void 0 || params[key] === null ? match : String(params[key]));
    }
    function shanghaiToday(now = /* @__PURE__ */ new Date()) {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(now);
      const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
      return `${value.year}-${value.month}-${value.day}`;
    }
    function dateLabel(value) {
      if (typeof value !== "string") return "";
      const [year, month, day] = value.split("-");
      if (!year || !month) return "";
      return day ? `${year}.${month}.${day}` : `${year}.${month}`;
    }
    function dateTimeLabel(iso) {
      if (typeof iso !== "string") return "";
      const time = Date.parse(iso);
      if (!Number.isFinite(time)) return "";
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: TIME_ZONE,
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).formatToParts(new Date(time));
      const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
      return `${value.month}-${value.day} ${value.hour}:${value.minute}`;
    }
    function daysBetween(fromDate, toDate) {
      if (!fromDate || !toDate) return 0;
      const from = Date.parse(`${fromDate}T00:00:00Z`);
      const to = Date.parse(`${toDate}T00:00:00Z`);
      if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
      return Math.round((to - from) / 864e5);
    }
    function pct(value, digits = 1) {
      const number = Number(value);
      if (!Number.isFinite(number)) return "\u2014";
      return `${number > 0 ? "+" : ""}${number.toFixed(digits)}%`;
    }
    function endpointUrl(endpoint) {
      const base = typeof document !== "undefined" && typeof document.baseURI === "string" ? document.baseURI : "http://localhost/";
      return new URL(`nasdaq-signal-guide/${endpoint}`, base).toString();
    }
    async function callApi(endpoint, payload) {
      const response = await fetch(endpointUrl(endpoint), {
        method: "POST",
        headers: { "content-type": "application/json", "x-dsh-nasdaq-signal-guide": "1" },
        body: JSON.stringify(payload === void 0 ? {} : payload),
        credentials: "same-origin",
        cache: "no-store"
      });
      let body;
      try {
        body = await response.json();
      } catch {
        throw new Error(`HTTP ${response.status}`);
      }
      if (!response.ok || body === null || typeof body !== "object" || body.ok !== true) {
        const message = body?.error?.message;
        throw new Error(typeof message === "string" && message !== "" ? message : `HTTP ${response.status}`);
      }
      return body.value;
    }

    // client-src/calendar.jsx
    function monthParts(value) {
      const [year, month] = value.split("-").map(Number);
      return { year, month };
    }
    function shiftMonth(value, delta) {
      const { year, month } = monthParts(value);
      const date = new Date(Date.UTC(year, month - 1 + delta, 1));
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    function calendarDays(value) {
      const { year, month } = monthParts(value);
      const firstWeekday = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
      const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
      return Array.from({ length: 42 }, (_, index) => {
        const day = index - firstWeekday + 1;
        if (day < 1 || day > daysInMonth) return null;
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      });
    }
    function DateControl({ t, selectedDate, loading, notice, onSelect }) {
      const today = shanghaiToday();
      const currentMonth = today.slice(0, 7);
      const [open, setOpen] = (0, import_react.useState)(false);
      const [viewMonth, setViewMonth] = (0, import_react.useState)(selectedDate.slice(0, 7));
      (0, import_react.useEffect)(() => {
        if (open) setViewMonth(selectedDate.slice(0, 7));
      }, [open, selectedDate]);
      (0, import_react.useEffect)(() => {
        if (!open) return void 0;
        const closeOnEscape = (event) => {
          if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
      }, [open]);
      const years = (0, import_react.useMemo)(() => {
        const last = Number(today.slice(0, 4));
        return Array.from({ length: Math.max(1, last - 1999) }, (_, index) => 2e3 + index);
      }, [today]);
      const weekdays = t("weekdays").split(",");
      const days = calendarDays(viewMonth);
      const view = monthParts(viewMonth);
      const choose = (date) => {
        if (date < EARLIEST_DATE || date > today) return;
        setOpen(false);
        onSelect(date);
      };
      return /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-date" + (open ? " is-open" : "") }, /* @__PURE__ */ import_react.default.createElement("span", null, t("viewMonth")), /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          type: "button",
          className: "nsg-date-trigger",
          "aria-label": t("openCalendar"),
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          onClick: () => {
            setViewMonth(selectedDate.slice(0, 7));
            setOpen((value) => !value);
          }
        },
        /* @__PURE__ */ import_react.default.createElement("strong", null, dateLabel(selectedDate)),
        /* @__PURE__ */ import_react.default.createElement("i", { "aria-hidden": "true" }, "\u25BE")
      ), /* @__PURE__ */ import_react.default.createElement("small", { className: loading ? "loading" : "" }, loading ? t("loading") : notice), open ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: "nsg-cal-scrim", "aria-label": t("closeCalendar"), onClick: () => setOpen(false) }), /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-cal", role: "dialog", "aria-label": t("selectDate") }, /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-cal-toolbar" }, /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          type: "button",
          "aria-label": t("prevMonth"),
          disabled: viewMonth <= "2000-01",
          onClick: () => setViewMonth((value) => shiftMonth(value, -1))
        },
        "\u2039"
      ), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(
        "select",
        {
          "aria-label": t("yearUnit") || "year",
          value: view.year,
          onChange: (event) => setViewMonth(`${event.target.value}-${String(view.month).padStart(2, "0")}`)
        },
        years.map((year) => /* @__PURE__ */ import_react.default.createElement("option", { value: year, key: year }, year, t("yearUnit")))
      ), /* @__PURE__ */ import_react.default.createElement(
        "select",
        {
          "aria-label": t("monthUnit") || "month",
          value: view.month,
          onChange: (event) => setViewMonth(`${view.year}-${String(event.target.value).padStart(2, "0")}`)
        },
        Array.from({ length: 12 }, (_, index) => index + 1).map((month) => /* @__PURE__ */ import_react.default.createElement("option", { value: month, key: month }, month, t("monthUnit")))
      )), /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          type: "button",
          "aria-label": t("nextMonth"),
          disabled: viewMonth >= currentMonth,
          onClick: () => setViewMonth((value) => shiftMonth(value, 1))
        },
        "\u203A"
      )), /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-cal-weekdays", "aria-hidden": "true" }, weekdays.map((weekday, index) => /* @__PURE__ */ import_react.default.createElement("span", { key: `${weekday}-${index}` }, weekday))), /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-cal-grid" }, days.map((date, index) => date ? /* @__PURE__ */ import_react.default.createElement(
        "button",
        {
          type: "button",
          key: date,
          className: date === selectedDate ? "selected" : date === today ? "today" : "",
          disabled: date < EARLIEST_DATE || date > today,
          "aria-label": dateLabel(date),
          "aria-pressed": date === selectedDate,
          onClick: () => choose(date)
        },
        Number(date.slice(-2))
      ) : /* @__PURE__ */ import_react.default.createElement("span", { key: `empty-${index}` }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "nsg-cal-footer" }, /* @__PURE__ */ import_react.default.createElement("span", null, t("calendarHint")), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", onClick: () => choose(today) }, t("backToToday"))))) : null);
    }

    // client-src/history-chart.jsx
    var import_react2 = __toESM(require("react"), 1);
    var RANGE_MONTHS = { "5y": 60, "10y": 120, all: Number.POSITIVE_INFINITY };
    var RANGE_KEYS = ["5y", "10y", "all"];
    var COLOR_VAR = {
      "big-bottom": "var(--nsg-success)",
      "small-bottom": "var(--nsg-brand)",
      normal: "var(--nsg-idle)",
      "high-near-high": "var(--nsg-warn)",
      "prolonged-hot": "color-mix(in srgb, var(--nsg-warn) 65%, var(--nsg-error))",
      "quick-crash": "var(--nsg-error)"
    };
    var chart = { width: 1e3, height: 340, left: 96, right: 96, top: 24, bottom: 44 };
    var plotWidth = chart.width - chart.left - chart.right;
    var plotHeight = chart.height - chart.top - chart.bottom;
    var yFor = (score) => chart.top + (3 - score) / 3 * plotHeight;
    var priceLabel = (value) => `$${Number(value).toFixed(2)}`;
    function HistoryChart({ t, points, selectedDate, onSelectDate }) {
      const [range, setRange] = (0, import_react2.useState)("5y");
      const [focusedDate, setFocusedDate] = (0, import_react2.useState)("");
      const visible = (0, import_react2.useMemo)(() => {
        const list = Array.isArray(points) ? points : [];
        const limit = RANGE_MONTHS[range];
        return limit === Number.POSITIVE_INFINITY ? list : list.slice(-limit);
      }, [points, range]);
      const legendLabels = {
        "big-bottom": t("legendBig"),
        "small-bottom": t("legendSmall"),
        normal: t("legendNormal"),
        "high-near-high": t("legendHigh"),
        "prolonged-hot": t("legendProlonged"),
        "quick-crash": t("legendCrash")
      };
      const levels = [
        { score: 3, label: "3\xD7 TQQQ" },
        { score: 2, label: "2\xD7 QQQ" },
        { score: 1, label: "1\xD7 QQQ" },
        { score: 0, label: t("pause") }
      ];
      if (visible.length < 2) {
        return /* @__PURE__ */ import_react2.default.createElement("section", { className: "nsg-section" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-section-head" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("p", { className: "nsg-eyebrow" }, t("historyEyebrow")), /* @__PURE__ */ import_react2.default.createElement("h2", null, t("historyTitle")))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-empty" }, t("historyFailed")));
      }
      const storedFocusIndex = visible.findIndex((point) => point.date === focusedDate);
      const selectedMonthIndex = visible.findIndex((point) => point.month === selectedDate.slice(0, 7));
      const focusedIndex = storedFocusIndex >= 0 ? storedFocusIndex : selectedMonthIndex >= 0 ? selectedMonthIndex : visible.length - 1;
      const focused = visible[focusedIndex] ?? visible[visible.length - 1];
      const xFor = (index) => chart.left + index / Math.max(1, visible.length - 1) * plotWidth;
      const linePath = visible.map((point, index) => `${index ? "L" : "M"}${xFor(index).toFixed(2)},${yFor(point.score).toFixed(2)}`).join(" ");
      const areaPath = `${linePath} L${xFor(visible.length - 1).toFixed(2)},${chart.height - chart.bottom} L${chart.left},${chart.height - chart.bottom} Z`;
      const logs = visible.map((point) => Math.log(Number(point.qqq) || 1));
      const minLog = Math.min(...logs);
      const maxLog = Math.max(...logs);
      const logSpan = Math.max(1e-4, maxLog - minLog);
      const qqqY = (value) => chart.top + (1 - (Math.log(Number(value) || 1) - minLog) / logSpan) * plotHeight;
      const qqqPath = visible.map((point, index) => `${index ? "L" : "M"}${xFor(index).toFixed(2)},${qqqY(point.qqq).toFixed(2)}`).join(" ");
      const qqqMin = Math.min(...visible.map((point) => Number(point.qqq) || 0));
      const qqqMax = Math.max(...visible.map((point) => Number(point.qqq) || 0));
      const tickIndexes = Array.from(new Set([0, 0.25, 0.5, 0.75, 1].map((ratio) => Math.round((visible.length - 1) * ratio))));
      const codes = Array.from(new Set(visible.map((point) => point.code)));
      const moveFocus = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (bounds.width <= 0) return;
        const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const index = Math.round(ratio * (visible.length - 1));
        const point = visible[index];
        if (point !== void 0) setFocusedDate(point.date);
      };
      return /* @__PURE__ */ import_react2.default.createElement("section", { className: "nsg-section" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-section-head" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("p", { className: "nsg-eyebrow" }, t("historyEyebrow")), /* @__PURE__ */ import_react2.default.createElement("h2", null, t("historyTitle"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-ranges", role: "group", "aria-label": t("historyTitle") }, RANGE_KEYS.map((key) => /* @__PURE__ */ import_react2.default.createElement(
        "button",
        {
          type: "button",
          key,
          className: range === key ? "active" : "",
          "aria-pressed": range === key,
          onClick: () => {
            setRange(key);
            setFocusedDate("");
          }
        },
        t(key === "5y" ? "range5y" : key === "10y" ? "range10y" : "rangeAll")
      )))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-chart-meta" }, /* @__PURE__ */ import_react2.default.createElement("span", null, t("chartTier")), /* @__PURE__ */ import_react2.default.createElement("small", null, fmt(t("chartPoints"), { n: visible.length }))), /* @__PURE__ */ import_react2.default.createElement("svg", { className: "nsg-chart", viewBox: `0 0 ${chart.width} ${chart.height}`, role: "img", "aria-label": t("chartAria") }, levels.map((level) => /* @__PURE__ */ import_react2.default.createElement("g", { className: "nsg-y-label", key: level.score }, /* @__PURE__ */ import_react2.default.createElement("line", { x1: chart.left, x2: chart.width - chart.right, y1: yFor(level.score), y2: yFor(level.score) }), /* @__PURE__ */ import_react2.default.createElement("text", { x: chart.left - 12, y: yFor(level.score) + 4, textAnchor: "end" }, level.label))), /* @__PURE__ */ import_react2.default.createElement("path", { className: "nsg-qqq-line", d: qqqPath }), /* @__PURE__ */ import_react2.default.createElement("text", { className: "nsg-qqq-axis", x: chart.width - chart.right + 10, y: chart.top + 4 }, "QQQ ", priceLabel(qqqMax)), /* @__PURE__ */ import_react2.default.createElement("text", { className: "nsg-qqq-axis", x: chart.width - chart.right + 10, y: chart.height - chart.bottom }, "QQQ ", priceLabel(qqqMin)), /* @__PURE__ */ import_react2.default.createElement("path", { className: "nsg-area", d: areaPath }), /* @__PURE__ */ import_react2.default.createElement("path", { className: "nsg-line", d: linePath }), visible.map((point, index) => /* @__PURE__ */ import_react2.default.createElement(
        "circle",
        {
          className: `nsg-dot ${point.code}`,
          key: point.date,
          cx: xFor(index),
          cy: yFor(point.score),
          r: point.date === focused.date ? 5 : visible.length > 150 ? 1.6 : 2.4,
          opacity: point.date === focused.date ? 1 : 0.75
        }
      )), /* @__PURE__ */ import_react2.default.createElement("line", { className: "nsg-focus-line", x1: xFor(focusedIndex), x2: xFor(focusedIndex), y1: chart.top, y2: chart.height - chart.bottom }), /* @__PURE__ */ import_react2.default.createElement("circle", { className: "nsg-focus-halo", cx: xFor(focusedIndex), cy: yFor(focused.score), r: "10", fill: "none", stroke: COLOR_VAR[focused.code] ?? "var(--nsg-brand)" }), tickIndexes.map((index) => /* @__PURE__ */ import_react2.default.createElement(
        "text",
        {
          className: "nsg-x-label",
          x: xFor(index),
          y: chart.height - 14,
          textAnchor: index === 0 ? "start" : index === visible.length - 1 ? "end" : "middle",
          key: index
        },
        visible[index].month.replace("-", ".")
      )), /* @__PURE__ */ import_react2.default.createElement("rect", { className: "nsg-hit-area", x: chart.left, y: chart.top, width: plotWidth, height: plotHeight, onPointerMove: moveFocus, onPointerDown: moveFocus })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-legend" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "qqq" }, /* @__PURE__ */ import_react2.default.createElement("b", null), t("legendQQQ")), codes.map((code) => /* @__PURE__ */ import_react2.default.createElement("span", { key: code }, /* @__PURE__ */ import_react2.default.createElement("i", { style: { background: COLOR_VAR[code] } }), legendLabels[code] ?? code))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-detail" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-head" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-summary" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-date" }, /* @__PURE__ */ import_react2.default.createElement("span", null, dateLabel(focused.date)), /* @__PURE__ */ import_react2.default.createElement("em", null, fmt(t("lowSignals"), { n: focused.lowCount }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-action" }, /* @__PURE__ */ import_react2.default.createElement("strong", { style: { color: COLOR_VAR[focused.code] } }, focused.label), /* @__PURE__ */ import_react2.default.createElement("h3", null, focused.title))), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "nsg-btn", onClick: () => onSelectDate(focused.date) }, t("viewDecision"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-body" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-exec" }, /* @__PURE__ */ import_react2.default.createElement("span", null, t("executionOrder")), /* @__PURE__ */ import_react2.default.createElement("b", null, /* @__PURE__ */ import_react2.default.createElement("i", null, "1"), focused.rampTitle), /* @__PURE__ */ import_react2.default.createElement("b", null, /* @__PURE__ */ import_react2.default.createElement("i", null, "2"), focused.riskTitle), /* @__PURE__ */ import_react2.default.createElement("b", null, /* @__PURE__ */ import_react2.default.createElement("i", null, "3"), focused.ammoTitle), /* @__PURE__ */ import_react2.default.createElement("b", null, /* @__PURE__ */ import_react2.default.createElement("i", null, "4"), focused.contribution)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-ammo" }, /* @__PURE__ */ import_react2.default.createElement("span", null, t("ammoAction")), /* @__PURE__ */ import_react2.default.createElement("b", null, focused.ammoTitle), /* @__PURE__ */ import_react2.default.createElement("small", null, focused.ammoDetail))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "nsg-history-values" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("span", null, t("qqqActual")), /* @__PURE__ */ import_react2.default.createElement("b", null, priceLabel(focused.qqq)), /* @__PURE__ */ import_react2.default.createElement("small", null, t("qqqActualNote"))), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("span", null, t("capePercentileShort")), /* @__PURE__ */ import_react2.default.createElement("b", null, Number(focused.cape).toFixed(1), "%"), /* @__PURE__ */ import_react2.default.createElement("small", null, focused.cape > 85 ? t("bubble") : focused.cape > 70 ? t("overvalued") : focused.cape < 20 ? t("cheap") : t("neutral"))), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("span", null, t("drawdownShort")), /* @__PURE__ */ import_react2.default.createElement("b", null, pct(focused.drawdownFromPeak)), /* @__PURE__ */ import_react2.default.createElement("small", null, focused.drawdownFromPeak <= -20 ? t("deepDrop") : dateLabel(focused.peakDate))), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("span", null, t("vixMonthStart")), /* @__PURE__ */ import_react2.default.createElement("b", null, Number(focused.vix).toFixed(1)), /* @__PURE__ */ import_react2.default.createElement("small", null, focused.vix >= 40 ? t("extremeFear") : focused.vix < 12 ? t("tooCalm") : t("calm"))))), /* @__PURE__ */ import_react2.default.createElement("p", { className: "nsg-note" }, t("historyNote"))));
    }

    // client-src/panel.jsx
    function stateClass(active, warning = false) {
      if (active) return "on";
      if (warning) return "warn";
      return "calm";
    }
    function Panel(props) {
      const t = props.t;
      const today = (0, import_react3.useMemo)(() => shanghaiToday(), []);
      const currentMonth = today.slice(0, 7);
      const [selectedDate, setSelectedDate] = (0, import_react3.useState)(today);
      const [signals, setSignals] = (0, import_react3.useState)(null);
      const [history, setHistory] = (0, import_react3.useState)(null);
      const [status, setStatus] = (0, import_react3.useState)(null);
      const [loading, setLoading] = (0, import_react3.useState)(true);
      const [error, setError] = (0, import_react3.useState)(null);
      const [syncing, setSyncing] = (0, import_react3.useState)(false);
      const [refreshToken, setRefreshToken] = (0, import_react3.useState)(0);
      const rootRef = (0, import_react3.useRef)(null);
      const requestRef = (0, import_react3.useRef)(0);
      const lastSuccessRef = (0, import_react3.useRef)(void 0);
      const historyFallbackRef = (0, import_react3.useRef)(null);
      const fallbackTriedRef = (0, import_react3.useRef)(false);
      const syncStartedAtRef = (0, import_react3.useRef)(0);
      const loadSignals = (0, import_react3.useCallback)((date) => {
        const requestId = requestRef.current + 1;
        requestRef.current = requestId;
        setLoading(true);
        setError(null);
        return callApi("signals", { date }).then((value) => {
          if (requestRef.current !== requestId) return false;
          setSignals(value);
          return true;
        }).catch((cause) => {
          if (requestRef.current !== requestId) return false;
          const message = cause instanceof Error ? cause.message : String(cause);
          const fallback = historyFallbackRef.current;
          if (date.slice(0, 7) === currentMonth && fallback !== null && fallback !== date && !fallbackTriedRef.current) {
            fallbackTriedRef.current = true;
            setSelectedDate(fallback);
            return false;
          }
          setError(message);
          return false;
        }).finally(() => {
          if (requestRef.current === requestId) setLoading(false);
        });
      }, [currentMonth]);
      (0, import_react3.useEffect)(() => {
        loadSignals(selectedDate);
      }, [loadSignals, selectedDate, refreshToken]);
      (0, import_react3.useEffect)(() => {
        let cancelled = false;
        callApi("history").then((value) => {
          if (cancelled) return;
          setHistory(value);
          const last = Array.isArray(value?.points) && value.points.length > 0 ? value.points[value.points.length - 1] : null;
          historyFallbackRef.current = last === null ? null : last.date;
        }).catch(() => {
          if (!cancelled) setHistory(null);
        });
        return () => {
          cancelled = true;
        };
      }, [refreshToken]);
      (0, import_react3.useEffect)(() => {
        let cancelled = false;
        let timer = null;
        const tick = () => {
          callApi("status").then((next) => {
            if (cancelled) return;
            setStatus(next);
            const previous = lastSuccessRef.current;
            lastSuccessRef.current = next.lastSuccessAt ?? null;
            if (previous !== void 0 && previous !== null && next.lastSuccessAt !== null && next.lastSuccessAt !== previous) {
              if (fallbackTriedRef.current) {
                fallbackTriedRef.current = false;
                setSelectedDate(today);
              }
              setRefreshToken((value) => value + 1);
            }
            timer = setTimeout(tick, next.running ? 1500 : 6e4);
          }).catch(() => {
            if (!cancelled) timer = setTimeout(tick, 6e4);
          });
        };
        tick();
        return () => {
          cancelled = true;
          if (timer !== null) clearTimeout(timer);
        };
      }, [today]);
      (0, import_react3.useEffect)(() => {
        if (!syncing) return void 0;
        let cancelled = false;
        let timer = null;
        const deadline = Date.now() + 12e4;
        const startedAt = syncStartedAtRef.current;
        const tick = async () => {
          try {
            const next = await callApi("status");
            if (cancelled) return;
            setStatus(next);
            const attempted = typeof next.lastAttemptAt === "string" && Date.parse(next.lastAttemptAt) >= startedAt - 1500;
            if (next.running || !attempted && Date.now() < deadline) {
              timer = setTimeout(tick, 1200);
              return;
            }
            if (attempted) {
              lastSuccessRef.current = next.lastSuccessAt ?? lastSuccessRef.current;
              setRefreshToken((value) => value + 1);
            }
            setSyncing(false);
          } catch {
            if (!cancelled) timer = setTimeout(tick, 2e3);
          }
        };
        timer = setTimeout(tick, 800);
        return () => {
          cancelled = true;
          if (timer !== null) clearTimeout(timer);
        };
      }, [syncing]);
      const syncNow = (0, import_react3.useCallback)(() => {
        syncStartedAtRef.current = Date.now();
        setSyncing(true);
        setError(null);
        callApi("update").then((result) => {
          if (result?.status) setStatus(result.status);
        }).catch((cause) => {
          setError(cause instanceof Error ? cause.message : String(cause));
          setSyncing(false);
        });
      }, []);
      const selectDate = (0, import_react3.useCallback)((date) => {
        if (typeof date !== "string" || date < EARLIEST_DATE || date > today) return;
        if (date === selectedDate) return;
        fallbackTriedRef.current = false;
        setSelectedDate(date);
        if (rootRef.current !== null) rootRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }, [selectedDate, today]);
      return /* @__PURE__ */ import_react3.default.createElement(
        PanelView,
        {
          t,
          signals,
          history,
          status,
          selectedDate,
          loading,
          error,
          syncing,
          today,
          rootRef,
          onSelectDate: selectDate,
          onSync: syncNow,
          onRefresh: () => setRefreshToken((value) => value + 1)
        }
      );
    }
    function PanelView(props) {
      const { t, signals, history, status, selectedDate, loading, error, syncing, today, rootRef, onSelectDate, onSync, onRefresh } = props;
      const currentMonth = today.slice(0, 7);
      const observation = signals?.observation ?? null;
      const accent = observation?.decision?.accent ?? "blue";
      const dataThrough = signals?.dataUpdatedThrough ?? status?.dataUpdatedThrough ?? null;
      const staleDays = dataThrough === null ? 0 : Math.max(0, daysBetween(dataThrough, today));
      const running = syncing || status?.running === true;
      const syncLabel = running ? t("syncing") : status?.lastError ? t("syncFailed") : status?.lastSuccessAt ? fmt(t("lastSync"), { when: dateTimeLabel(status.lastSuccessAt) }) : t("neverSynced");
      const nextLabel = status?.nextRunAt && !running ? fmt(t("nextSync"), { when: dateTimeLabel(status.nextRunAt) }) : "";
      const notice = signals === null ? "" : signals.month === currentMonth ? fmt(t("liveSources"), {
        n: [signals.sources?.ndx, signals.sources?.vix, signals.sources?.cape].filter((source) => source?.mode === "live").length,
        date: dateLabel(signals.executionDate)
      }) : fmt(t("snapshotNotice"), { date: dateLabel(signals.executionDate) });
      const headline = (contribution) => contribution === "0\xD7" ? t("pause") : contribution === "1\xD7" ? t("oneX") : contribution === "2\xD7" ? t("twoX") : t("threeX");
      const zoneLabel = (next) => {
        if (next.lowCount === 3) return t("zone3");
        if (next.lowCount === 2) return t("zone2");
        if (next.lowCount === 1) return t("zone1");
        if (next.cape.high && next.trend.nearHigh) return t("zoneHigh");
        return t("zoneNormal");
      };
      const signalCards = (0, import_react3.useMemo)(() => {
        if (observation === null || signals === null) return [];
        const cape = observation.cape;
        const trend = observation.trend;
        const vix = observation.vix;
        return [
          {
            code: "01",
            label: t("valuation"),
            name: t("capePercentile"),
            value: `${Number(cape.percentile).toFixed(1)}%`,
            detail: cape.cheap ? t("cheap") : cape.bubble ? t("bubble") : cape.high ? t("overvalued") : t("neutral"),
            state: stateClass(cape.cheap, cape.high),
            threshold: t("thresholdCape"),
            meter: Math.min(100, Math.max(0, Number(cape.percentile))),
            source: signals.sources.cape,
            sourceDate: cape.date
          },
          {
            code: "02",
            label: t("trend"),
            name: t("drawdownFromPeak"),
            value: pct(trend.drawdownPct),
            detail: trend.deep ? t("deepDrop") : trend.nearHigh ? t("nearHigh") : t("normalDrop"),
            state: stateClass(trend.deep),
            threshold: t("thresholdDrawdown"),
            meter: Math.min(100, Math.abs(Number(trend.drawdownPct)) * 3),
            source: signals.sources.ndx,
            sourceDate: observation.asOfDate
          },
          {
            code: "03",
            label: t("panic"),
            name: t("vixValue"),
            value: Number(vix.value5).toFixed(1),
            detail: vix.panic ? t("extremeFear") : vix.quiet ? t("tooCalm") : t("calm"),
            state: stateClass(vix.panic, vix.quiet),
            threshold: t("thresholdVix"),
            meter: Math.min(100, Number(vix.value5) * 2),
            source: signals.sources.vix,
            sourceDate: vix.date
          }
        ];
      }, [observation, signals, t]);
      const trace = (0, import_react3.useMemo)(() => {
        if (signals === null) return [];
        const decision = signals.decision;
        return [
          { title: t("step1"), text: decision.rampTitle, hit: typeof decision.rampTitle === "string" && decision.rampTitle.startsWith("\u5148\u6309") },
          { title: t("step2"), text: decision.riskTitle, hit: decision.riskTriggered === true },
          { title: t("step3"), text: decision.ammoDetail, hit: signals.lowCount > 0 || String(decision.ammo ?? "").includes("1/6") },
          { title: t("step4"), text: `${decision.contribution} \xB7 ${decision.contributionDetail}`, hit: true }
        ];
      }, [signals, t]);
      const methodItems = [
        ["method1Title", "method1"],
        ["method2Title", "method2"],
        ["method3Title", "method3"],
        ["method4Title", "method4"],
        ["method5Title", "method5"],
        ["method6Title", "method6"]
      ];
      const syncErrorRecent = status?.lastError && status?.lastAttemptAt && Date.now() - Date.parse(status.lastAttemptAt) < 864e5;
      return /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-page", "data-accent": accent, ref: rootRef }, /* @__PURE__ */ import_react3.default.createElement("style", null, CSS), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-shell" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-topbar" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-brand" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "nsg-brand-mark", "aria-hidden": "true" }, "N\xB3"), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h1", null, t("title")), /* @__PURE__ */ import_react3.default.createElement("p", null, t("subtitle")))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-topbar-actions" }, dataThrough !== null ? /* @__PURE__ */ import_react3.default.createElement("span", { className: "nsg-pill" + (staleDays >= 3 ? " stale" : ""), title: status?.lastError ?? void 0 }, /* @__PURE__ */ import_react3.default.createElement("i", null), fmt(t("dataThrough"), { date: dateLabel(dataThrough) }), staleDays > 0 ? ` \xB7 ${fmt(t("daysAgo"), { n: staleDays })}` : "") : null, /* @__PURE__ */ import_react3.default.createElement(DateControl, { t, selectedDate, loading, notice, onSelect: onSelectDate }), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "nsg-btn primary", onClick: onSync, disabled: running }, running ? /* @__PURE__ */ import_react3.default.createElement("span", { className: "nsg-spin", "aria-hidden": "true" }) : null, running ? t("syncing") : t("syncNow")), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "nsg-btn", onClick: () => onRefresh(), title: t("refresh") }, "\u21BB"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-sync-note", role: "status" }, syncLabel, nextLabel === "" ? "" : ` \xB7 ${nextLabel}`, status?.lastSuccessAt ? "" : ` \xB7 ${fmt(t("autoSync"), { time: `${String(status?.schedule?.hour ?? 9).padStart(2, "0")}:${String(status?.schedule?.minute ?? 10).padStart(2, "0")}` })}`), signals !== null && signals.month !== currentMonth ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-banner info" }, /* @__PURE__ */ import_react3.default.createElement("div", null, fmt(t("beforeMonthNotice"), { month: dateLabel(signals.executionDate) }))) : null, error !== null ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-banner", role: "alert" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("strong", null, t("loadFailed")), error), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "nsg-btn", onClick: () => onRefresh() }, t("retry"))) : null, syncErrorRecent ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-banner", role: "alert" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("strong", null, t("syncFailed")), status.lastError), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "nsg-btn", onClick: onSync, disabled: running }, t("retry"))) : null, signals === null || observation === null ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-empty" }, loading ? t("loading") : t("loadFailed")) : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-hero" + (loading ? " loading" : ""), "aria-live": "polite" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-hero-main" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-meta" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "nsg-live" }, /* @__PURE__ */ import_react3.default.createElement("i", null), t("daySignal"), " \xB7 ", dateLabel(observation.asOfDate)), /* @__PURE__ */ import_react3.default.createElement("span", null, fmt(t("monthExecution"), { date: dateLabel(signals.executionDate) }))), /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-kicker" }, t("dayReference")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-headline" }, /* @__PURE__ */ import_react3.default.createElement("strong", null, observation.decision.contribution), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h2", null, headline(observation.decision.contribution)), /* @__PURE__ */ import_react3.default.createElement("p", null, observation.decision.contributionDetail))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-actions" }, /* @__PURE__ */ import_react3.default.createElement("article", null, /* @__PURE__ */ import_react3.default.createElement("span", null, /* @__PURE__ */ import_react3.default.createElement("i", null, "01"), t("todayReference")), /* @__PURE__ */ import_react3.default.createElement("strong", null, observation.decision.target), /* @__PURE__ */ import_react3.default.createElement("small", null, observation.decision.targetDetail)), /* @__PURE__ */ import_react3.default.createElement("article", null, /* @__PURE__ */ import_react3.default.createElement("span", null, /* @__PURE__ */ import_react3.default.createElement("i", null, "02"), t("executedThisMonth")), /* @__PURE__ */ import_react3.default.createElement("strong", null, signals.decision.target), /* @__PURE__ */ import_react3.default.createElement("small", null, dateLabel(signals.executionDate), " \xB7 ", signals.decision.targetDetail)))), /* @__PURE__ */ import_react3.default.createElement("aside", { className: "nsg-score" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-orb" }, /* @__PURE__ */ import_react3.default.createElement("span", null, t("lowResonance")), /* @__PURE__ */ import_react3.default.createElement("strong", null, observation.lowCount, /* @__PURE__ */ import_react3.default.createElement("small", null, "/3")), /* @__PURE__ */ import_react3.default.createElement("em", null, t("signalsOn"))), /* @__PURE__ */ import_react3.default.createElement("p", null, /* @__PURE__ */ import_react3.default.createElement("i", { className: "nsg-accent-dot" }), zoneLabel(observation)))), /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-section" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-section-head" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-eyebrow" }, t("signalEyebrow")), /* @__PURE__ */ import_react3.default.createElement("h2", null, t("signalTitle"))), /* @__PURE__ */ import_react3.default.createElement("p", null, t("signalNote"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-signal-grid" }, signalCards.map((card) => /* @__PURE__ */ import_react3.default.createElement("article", { className: "nsg-signal " + card.state, key: card.code }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-signal-top" }, /* @__PURE__ */ import_react3.default.createElement("span", null, card.code, " / ", card.label), /* @__PURE__ */ import_react3.default.createElement("i", null)), /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-signal-name" }, card.name), /* @__PURE__ */ import_react3.default.createElement("strong", null, card.value), /* @__PURE__ */ import_react3.default.createElement("h3", null, card.detail), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-meter" }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: `${card.meter}%` } })), /* @__PURE__ */ import_react3.default.createElement("small", null, card.threshold), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-signal-source" }, /* @__PURE__ */ import_react3.default.createElement("span", null, card.source.provider, " \xB7 ", dateLabel(card.sourceDate)), /* @__PURE__ */ import_react3.default.createElement("em", { className: "nsg-mode " + card.source.mode }, card.source.mode === "live" ? t("live") : t("snapshot")))))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-secondary" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", null, t("distance52w")), /* @__PURE__ */ import_react3.default.createElement("strong", null, pct(observation.trend.distance52WeekPct ?? observation.trend.drawdownPct)), /* @__PURE__ */ import_react3.default.createElement("small", null, t("backgroundOnly"))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", null, t("quickDrop25")), /* @__PURE__ */ import_react3.default.createElement("strong", null, pct(observation.trend.quickDropPct)), /* @__PURE__ */ import_react3.default.createElement("small", null, observation.trend.quickCrash ? t("quickCrashTriggered") : t("threshold12"))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", null, t("cooldown")), /* @__PURE__ */ import_react3.default.createElement("strong", null, signals.hotMonths >= 6 ? fmt(t("cooldownFull"), { n: signals.hotMonths }) : fmt(t("cooldownProgress"), { n: signals.hotMonths })), /* @__PURE__ */ import_react3.default.createElement("small", null, t("cooldownRule"))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("span", null, t("capeMonth")), /* @__PURE__ */ import_react3.default.createElement("strong", null, dateLabel(observation.cape.date)), /* @__PURE__ */ import_react3.default.createElement("small", null, t("monthlyDataNote"))))), /* @__PURE__ */ import_react3.default.createElement(HistoryChart, { t, points: history?.points ?? [], selectedDate, onSelectDate }), /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-rule" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-eyebrow" }, t("traceEyebrow")), /* @__PURE__ */ import_react3.default.createElement("h2", null, t("traceTitle")), /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-rule-note" }, t("traceNote"))), /* @__PURE__ */ import_react3.default.createElement("ol", { className: "nsg-steps" }, trace.map((item, index) => /* @__PURE__ */ import_react3.default.createElement("li", { className: item.hit ? "hit" : "", key: item.title }, /* @__PURE__ */ import_react3.default.createElement("b", null, index + 1), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("strong", null, item.title), /* @__PURE__ */ import_react3.default.createElement("span", null, item.text)))))), /* @__PURE__ */ import_react3.default.createElement("details", { className: "nsg-method" }, /* @__PURE__ */ import_react3.default.createElement("summary", null, t("methodTitle")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-method-grid" }, methodItems.map(([titleKey, bodyKey]) => /* @__PURE__ */ import_react3.default.createElement("p", { key: titleKey }, /* @__PURE__ */ import_react3.default.createElement("span", null, t(titleKey)), t(bodyKey))))), /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-section" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-section-head" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("p", { className: "nsg-eyebrow" }, t("sourcesTitle")), /* @__PURE__ */ import_react3.default.createElement("h2", null, fmt(t("generatedAt"), { when: dateTimeLabel(signals.sources.snapshotGeneratedAt) }))), /* @__PURE__ */ import_react3.default.createElement("p", null, t("sourcesNote"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-sources" }, [signals.sources.ndx, signals.sources.vix, signals.sources.cape].map((source) => /* @__PURE__ */ import_react3.default.createElement("a", { href: source.url, target: "_blank", rel: "noreferrer", key: source.label }, /* @__PURE__ */ import_react3.default.createElement("span", null, source.label), /* @__PURE__ */ import_react3.default.createElement("strong", null, source.provider), /* @__PURE__ */ import_react3.default.createElement("small", null, fmt(t("dataThrough"), { date: dateLabel(source.asOf) })), /* @__PURE__ */ import_react3.default.createElement("em", { className: "nsg-mode " + source.mode }, source.mode === "live" ? t("live") : t("snapshot")))), /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://finance.yahoo.com/quote/QQQ/history/", target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ import_react3.default.createElement("span", null, t("sourceQQQ")), /* @__PURE__ */ import_react3.default.createElement("strong", null, "Yahoo Finance"), /* @__PURE__ */ import_react3.default.createElement("small", null, t("sourceQQQNote")), /* @__PURE__ */ import_react3.default.createElement("em", { className: "nsg-mode" }, t("daily"))))), /* @__PURE__ */ import_react3.default.createElement("section", { className: "nsg-credit" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("strong", null, t("credit")), " \xB7 ", t("creditOriginal")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "nsg-credit-links" }, /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://x.com/app_sail/status/2070037504674173060", target: "_blank", rel: "noreferrer" }, t("creditRead"), " \u2197"), /* @__PURE__ */ import_react3.default.createElement("a", { href: "https://x.com/app_sail", target: "_blank", rel: "noreferrer" }, t("creditAuthor"), " \u2197"))), /* @__PURE__ */ import_react3.default.createElement("footer", { className: "nsg-footer" }, /* @__PURE__ */ import_react3.default.createElement("span", null, t("footer")), /* @__PURE__ */ import_react3.default.createElement("a", { href: "#top", onClick: (event) => {
        event.preventDefault();
        if (rootRef.current !== null) rootRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } }, t("backToTop"), " \u2191")))));
    }

    // client-src/icon.jsx
    var import_react4 = __toESM(require("react"), 1);
    function PanelIcon(props) {
      const size = props?.size ?? 16;
      return /* @__PURE__ */ import_react4.default.createElement("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ import_react4.default.createElement("path", { d: "M2.4 11.6 5.6 8.6l2 1.9 3.8-4.2 2.2 2.1", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "2.6", cy: "11.6", r: "1.15", fill: "currentColor" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "7.6", cy: "10.5", r: "0.95", fill: "currentColor", opacity: "0.75" }), /* @__PURE__ */ import_react4.default.createElement("circle", { cx: "13.4", cy: "6.3", r: "1.15", fill: "currentColor" }));
    }

    // client-src/locale.js
    var NS = "nasdaq-signal-guide";
    var zh = {
      panel: "\u7EB3\u6307\u4E09\u4FE1\u53F7",
      title: "\u7EB3\u6307\u4E09\u4FE1\u53F7\u51B3\u7B56\u4EEA",
      subtitle: "\u628A\u4F30\u503C\u3001\u56DE\u64A4\u4E0E\u6050\u614C\u538B\u7F29\u6210\u4E00\u6B21\u53EF\u6267\u884C\u7684\u6708\u5EA6\u51B3\u7B56",
      dataThrough: "\u6570\u636E\u81F3 {date}",
      liveSources: "{n}/3 \u4E2A\u6765\u6E90\u5B9E\u65F6 \xB7 \u6700\u8FD1\u4EA4\u6613\u65E5 {date}",
      beforeMonthNotice: "\u672C\u6708\u7B56\u7565\u5C1A\u672A\u751F\u6210\uFF0C\u5F53\u524D\u663E\u793A {month} \u7684\u5FEB\u7167\uFF1B\u6BCF\u65E5\u81EA\u52A8\u540C\u6B65\u5C31\u7EEA\u540E\u4F1A\u81EA\u52A8\u56DE\u5230\u672C\u6708\u3002",
      snapshotNotice: "\u5386\u53F2\u5FEB\u7167 \xB7 \u6700\u8FD1\u4EA4\u6613\u65E5 {date}",
      daysAgo: "{n} \u5929\u524D",
      syncing: "\u6B63\u5728\u540C\u6B65\u884C\u60C5\u6570\u636E\u2026",
      syncNow: "\u7ACB\u5373\u540C\u6B65",
      refresh: "\u5237\u65B0",
      lastSync: "\u4E0A\u6B21\u540C\u6B65 {when}",
      nextSync: "\u4E0B\u6B21 {when}",
      neverSynced: "\u5C1A\u672A\u540C\u6B65",
      syncFailed: "\u540C\u6B65\u5931\u8D25",
      autoSync: "\u6BCF\u65E5 {time} \u81EA\u52A8\u540C\u6B65",
      loadFailed: "\u65E0\u6CD5\u8BFB\u53D6\u4FE1\u53F7\u6570\u636E",
      retry: "\u91CD\u8BD5",
      loading: "\u8BA1\u7B97\u4E2D\u2026",
      daySignal: "\u5F53\u5929\u4FE1\u53F7",
      monthExecution: "\u672C\u6708\u6267\u884C\u65E5 {date}",
      dayReference: "\u5F53\u5929\u4FE1\u53F7\u53C2\u8003",
      todayReference: "01 \xB7 \u5F53\u5929\u53C2\u8003",
      executedThisMonth: "02 \xB7 \u672C\u6708\u5DF2\u6267\u884C",
      pause: "\u6682\u505C\u672C\u6708\u65B0\u589E\u6295\u5165",
      oneX: "\u6309\u57FA\u7840\u6708\u4F9B\u6295\u5165",
      twoX: "\u6295\u5165\u4E24\u500D\u6708\u4F9B",
      threeX: "\u6295\u5165\u4E09\u500D\u6708\u4F9B",
      lowResonance: "\u4F4E\u4F4D\u5171\u632F",
      signalsOn: "\u4FE1\u53F7\u4EAE\u8D77",
      zone3: "\u4E09\u4FE1\u53F7\u5171\u632F\u533A",
      zone2: "\u53CC\u4F4E\u5171\u632F\u533A",
      zone1: "\u5355\u4E00\u4F4E\u4F4D\u4FE1\u53F7",
      zoneHigh: "\u9AD8\u4F30\u8FD1\u9876\u533A",
      zoneNormal: "\u5E38\u6001\u89C2\u5BDF\u533A",
      valuation: "\u4F30\u503C",
      capePercentile: "CAPE \u5386\u53F2\u5206\u4F4D",
      trend: "\u8D8B\u52BF",
      drawdownFromPeak: "\u8DDD\u8FD0\u884C\u6700\u9AD8\u70B9",
      panic: "\u6050\u614C",
      vixValue: "VIX \xB7 \u5F53\u65E5\u503C",
      thresholdCape: "\u4F4E\u4F4D\u4FE1\u53F7 < 20%",
      thresholdDrawdown: "\u4F4E\u4F4D\u4FE1\u53F7 \u2264 \u221220%",
      thresholdVix: "\u4F4E\u4F4D\u4FE1\u53F7 \u2265 40",
      cheap: "\u6781\u5EA6\u4FBF\u5B9C",
      bubble: "\u6CE1\u6CAB\u8B66\u6212\u533A",
      overvalued: "\u9AD8\u4F30",
      neutral: "\u4E2D\u6027\u533A",
      deepDrop: "\u957F\u671F\u6DF1\u5EA6\u8D85\u8DCC",
      nearHigh: "\u8D34\u8FD1\u8FD0\u884C\u65B0\u9AD8",
      normalDrop: "\u666E\u901A\u56DE\u64A4\u533A",
      extremeFear: "\u6781\u5EA6\u6050\u614C",
      tooCalm: "\u8FC7\u5EA6\u5E73\u9759",
      calm: "\u60C5\u7EEA\u5904\u4E8E\u5E38\u6001\u533A",
      live: "\u5B9E\u65F6",
      snapshot: "\u5FEB\u7167",
      distance52w: "\u8DDD 52 \u5468\u9AD8\u70B9",
      backgroundOnly: "\u4EC5\u4F5C\u8FD1\u671F\u8D70\u52BF\u80CC\u666F",
      quickDrop25: "25 \u65E5\u6025\u8DCC",
      quickCrashTriggered: "\u5DF2\u89E6\u53D1\u5FEB\u5D29\u9884\u8B66",
      threshold12: "\u9608\u503C \u221212%",
      cooldown: "\u51B7\u5374\u8BA1\u6570",
      cooldownFull: "{n} \u6708\uFF08\u5DF2\u6EE1\uFF09",
      cooldownProgress: "{n}/6",
      cooldownRule: "VIX < 12 \u6216 CAPE > 85%\uFF0C\u4E24\u8005\u53EF\u4EA4\u66FF\u7D2F\u8BA1",
      capeMonth: "CAPE \u6570\u636E\u6708\u4EFD",
      monthlyDataNote: "\u6708\u5EA6\u6570\u636E\u4E0D\u4F2A\u88C5\u6210\u65E5\u9891",
      signalEyebrow: "\u4FE1\u53F7\u62C6\u89E3",
      signalTitle: "\u4E3A\u4EC0\u4E48\u662F\u8FD9\u4E2A\u5F53\u5929\u4FE1\u53F7",
      signalNote: "\u4E09\u9879\u4FE1\u53F7\u6309\u6240\u9009\u5F53\u5929\u8BA1\u7B97\uFF1B\u4F11\u5E02\u65E5\u81EA\u52A8\u53D6\u6B64\u524D\u6700\u8FD1\u4EA4\u6613\u65E5\u3002\u6708\u5EA6\u7B56\u7565\u4ECD\u53EA\u5728\u6BCF\u6708\u9996\u4E2A\u4EA4\u6613\u65E5\u6267\u884C\u4E00\u6B21\u3002",
      historyEyebrow: "\u6708\u5EA6\u4FE1\u53F7\u5386\u53F2",
      historyTitle: "\u6BCF\u6708\uFF0C\u89C4\u5219\u505A\u4E86\u4EC0\u4E48",
      range5y: "\u8FD1 5 \u5E74",
      range10y: "\u8FD1 10 \u5E74",
      rangeAll: "\u5168\u90E8",
      chartTier: "\u65B0\u73B0\u91D1\u6295\u5165\u6863\u4F4D",
      chartPoints: "\u6BCF\u6708\u7B2C\u4E00\u4E2A\u4EA4\u6613\u65E5 \xB7 \u5171 {n} \u4E2A\u6267\u884C\u70B9",
      chartAria: "\u6BCF\u6708\u7B2C\u4E00\u4E2A\u4EA4\u6613\u65E5\u7684\u5386\u53F2\u884C\u52A8\u5EFA\u8BAE\u66F2\u7EBF",
      legendQQQ: "QQQ \u5B9E\u9645\u6536\u76D8\u4EF7\uFF08\u533A\u95F4\u5F52\u4E00\u5316\uFF09",
      legendBig: "\u53CC\u4F4E / \u4E09\u4FE1\u53F7\u5171\u632F\uFF1A3\xD7 TQQQ",
      legendSmall: "\u5355\u4F4E\uFF1A2\xD7 QQQ",
      legendNormal: "\u6B63\u5E38\u5B9A\u6295 QQQ",
      legendHigh: "\u9AD8\u4F30\u533A\u8DF3\u8FC7",
      legendProlonged: "\u8FDE\u7EED\u6761\u4EF6\u964D\u6760\u6746",
      legendCrash: "\u5FEB\u5D29\u964D\u6760\u6746",
      lowSignals: "{n}/3 \u4F4E\u4F4D\u4FE1\u53F7",
      viewDecision: "\u67E5\u770B\u5B8C\u6574\u51B3\u7B56",
      executionOrder: "\u6267\u884C\u987A\u5E8F",
      ammoAction: "\u5F39\u836F\u4ED3\u52A8\u4F5C",
      qqqActual: "QQQ \u5B9E\u9645\u4EF7\u683C",
      qqqActualNote: "\u5F53\u6708\u9996\u4E2A\u4EA4\u6613\u65E5\u672A\u590D\u6743\u6536\u76D8\u4EF7",
      capePercentileShort: "CAPE \u5206\u4F4D",
      drawdownShort: "\u8DDD\u8FD0\u884C\u6700\u9AD8\u70B9",
      vixMonthStart: "VIX \xB7 \u6708\u521D\u503C",
      historyNote: "\u66F2\u7EBF\u4EE5\u5F53\u6708\u7B2C\u4E00\u4E2A\u5B9E\u9645\u4EA4\u6613\u65E5\u4E3A\u6267\u884C\u70B9\uFF1B\u84DD\u7EBF\u8868\u8FBE\u4E3B\u7B56\u7565\u7684\u65B0\u73B0\u91D1\u6295\u5165\u6863\u4F4D\uFF0C\u964D\u6760\u6746\u4E0E\u5F39\u836F\u4ED3\u52A8\u4F5C\u5728\u4E0B\u65B9\u6309\u6267\u884C\u987A\u5E8F\u5355\u5217\u3002\u7070\u8272\u865A\u7EBF\u4F7F\u7528 Yahoo Finance \u53D1\u5E03\u7684 QQQ \u672A\u590D\u6743\u5B9E\u9645\u6536\u76D8\u4EF7\uFF0C\u5E76\u5728\u6240\u9009\u533A\u95F4\u5185\u6309\u5BF9\u6570\u5C3A\u5EA6\u5F52\u4E00\u5316\u3002",
      traceEyebrow: "\u51B3\u7B56\u8DEF\u5F84",
      traceTitle: "\u672C\u6708\u52A8\u4F5C\u987A\u5E8F",
      traceNote: "\u8FD9\u4E9B\u52A8\u4F5C\u4E0D\u662F\u4E92\u65A5\u9009\u62E9\uFF1A\u8F6C\u6362\u5761\u9053\u3001\u964D\u6760\u6746\u3001\u5F39\u836F\u4ED3\u4E0E\u5F53\u6708\u65B0\u73B0\u91D1\u4F1A\u6309\u7B56\u7565\u987A\u5E8F\u7EC4\u5408\u6267\u884C\u3002",
      step1: "QQQ \u2192 TQQQ \u8F6C\u6362\u5761\u9053",
      step2: "\u5FEB\u5D29 / \u51B7\u5374\u964D\u6760\u6746",
      step3: "\u5F39\u836F\u4ED3",
      step4: "\u5F53\u6708\u65B0\u73B0\u91D1",
      methodTitle: "\u53E3\u5F84\u4E0E\u89C4\u5219",
      method1Title: "\u6267\u884C\u65E5\u671F",
      method1: "\u9009\u62E9\u4EFB\u610F\u6708\u5185\u65E5\u671F\u540E\uFF0C\u7EDF\u4E00\u6620\u5C04\u5230\u8BE5\u6708\u7B2C\u4E00\u4E2A\u4EA4\u6613\u65E5\uFF1B\u7B56\u7565\u6BCF\u6708\u53EA\u6267\u884C\u4E00\u6B21\u3002",
      method2Title: "\u65F6\u95F4\u53E3\u5F84",
      method2: "\u201C\u4ECA\u5929\u201D\u3001\u5F53\u524D\u6708\u4EFD\u548C\u5B9A\u65F6\u5237\u65B0\u5747\u4EE5 Asia/Shanghai \u4E3A\u51C6\uFF0C\u4E0D\u4F9D\u8D56\u8BBF\u95EE\u8005\u6D4F\u89C8\u5668\u6240\u5728\u65F6\u533A\u3002",
      method3Title: "\u4F30\u503C\u5206\u4F4D",
      method3: "CAPE \u5148\u5411\u524D\u586B\u5145\u5230\u4EA4\u6613\u65E5\uFF0C\u518D\u6309\u622A\u81F3\u5F53\u65F6\u7684\u5168\u90E8\u5386\u53F2\u65E5\u6837\u672C\u8BA1\u7B97 expanding \u5206\u4F4D\uFF1B\u540C\u503C\u4F7F\u7528\u5E73\u5747\u540D\u6B21\uFF0C\u4E0D\u4F7F\u7528\u56FA\u5B9A\u6EDA\u52A8\u7A97\u53E3\u3002",
      method4Title: "\u8D8B\u52BF\u4E0E\u6025\u8DCC",
      method4: "\u5148\u7528 NDX \u6536\u76CA\u3001QQQ \u4E0A\u5E02\u540E\u6539\u63A5\u590D\u6743 QQQ \u6536\u76CA\uFF1B\u56DE\u64A4\u76F8\u5BF9 1990 \u5E74\u4EE5\u6765\u8FD0\u884C\u5CF0\u503C\u8BA1\u7B97\u300225 \u65E5\u6025\u8DCC\u8FBE\u5230 \u221212% \u89E6\u53D1\u5FEB\u5D29\u5904\u7406\u3002",
      method5Title: "\u65B0\u73B0\u91D1\u6863\u4F4D",
      method5: "\u9AD8\u4F30\u4E14\u8FD1\u65B0\u9AD8\u4E3A 0\xD7\uFF0C\u6B63\u5E38\u4E3A 1\xD7\uFF0C\u4E00\u4E2A\u4F4E\u4F4D\u4FE1\u53F7\u4E3A 2\xD7\uFF0C\u4E24\u4E2A\u4EE5\u4E0A\u4E3A 3\xD7\uFF1B\u989D\u5916\u6295\u5165\u4E0D\u4ECE\u5F39\u836F\u4ED3\u5212\u51FA\u3002",
      method6Title: "\u5F39\u836F\u6EF4\u704C",
      method6: "\u5F39\u836F\u4ED3\u53EA\u63A5\u6536 CAPE > 85% \u65F6\u51CF\u6301 TQQQ \u7684\u6240\u5F97\uFF1B\u65E0\u4F4E\u4F4D\u4FE1\u53F7\u65F6\u6309\u5F53\u6708\u66F4\u65B0\u540E\u4F59\u989D\u7684 1/6 \u4E70\u5165 QQQ\uFF0C\u4EFB\u4E00\u4F4E\u4F4D\u4FE1\u53F7\u51FA\u73B0\u65F6\u5168\u90E8\u6253\u51FA\u3002",
      sourcesTitle: "\u6570\u636E\u6765\u6E90",
      sourcesNote: "\u9762\u677F\u8BFB\u53D6\u540C\u4E00\u4EFD\u5FEB\u7167\uFF1B\u5F53\u524D\u6708\u4EFD\u4F1A\u4F18\u5148\u5408\u5E76\u4E0A\u6E38\u5B9E\u65F6\u6570\u636E\uFF0C\u5355\u6E90\u5931\u8D25\u81EA\u52A8\u56DE\u9000\u3002",
      sourceQQQ: "QQQ \u5386\u53F2\u4EF7\u683C",
      sourceQQQNote: "\u7B56\u7565\u7528\u590D\u6743\u4EF7 \xB7 \u56FE\u8868\u663E\u793A\u672A\u590D\u6743\u4EF7",
      daily: "\u65E5\u7EBF",
      generatedAt: "\u5FEB\u7167\u751F\u6210 {when}",
      credit: "\u7B56\u7565\u51FA\u5904",
      creditOriginal: "\u539F\u6587\u884C\u52A8\u6307\u5357\u4E0E\u56DE\u6D4B\u8BF4\u660E",
      creditRead: "\u9605\u8BFB X \u539F\u6587",
      creditAuthor: "\u4F5C\u8005 @app_sail",
      footer: "\u7814\u7A76\u5DE5\u5177 \xB7 \u4E0D\u6784\u6210\u6295\u8D44\u5EFA\u8BAE\u3002\u6760\u6746 ETF \u53EF\u80FD\u51FA\u73B0\u8D85\u8FC7 50% \u7684\u6DF1\u5EA6\u56DE\u64A4\u3002",
      backToTop: "\u56DE\u5230\u9876\u90E8",
      viewMonth: "\u56DE\u770B\u4EFB\u610F\u6708\u4EFD",
      openCalendar: "\u6253\u5F00\u65E5\u671F\u9009\u62E9\u5668",
      closeCalendar: "\u5173\u95ED\u65E5\u671F\u9009\u62E9\u5668",
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      yearUnit: " \u5E74",
      monthUnit: " \u6708",
      weekdays: "\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D,\u65E5",
      calendarHint: "Asia/Shanghai \xB7 \u53EF\u56DE\u770B 2000 \u5E74\u9996\u4E2A\u4EA4\u6613\u65E5\u8D77\u7684\u4FE1\u53F7",
      backToToday: "\u56DE\u5230\u4ECA\u5929",
      selectDate: "\u9009\u62E9\u56DE\u770B\u65E5\u671F",
      historyFailed: "\u5386\u53F2\u66F2\u7EBF\u6682\u4E0D\u53EF\u7528"
    };
    var en = {
      panel: "Nasdaq signals",
      title: "Nasdaq three-signal dashboard",
      subtitle: "Valuation, drawdown, and panic compressed into one monthly decision",
      dataThrough: "Data through {date}",
      liveSources: "{n}/3 sources live \xB7 last trading day {date}",
      beforeMonthNotice: "This month's strategy is not ready yet; showing the {month} snapshot. The daily sync returns here automatically.",
      snapshotNotice: "Historical snapshot \xB7 last trading day {date}",
      daysAgo: "{n}d ago",
      syncing: "Syncing market data\u2026",
      syncNow: "Sync now",
      refresh: "Refresh",
      lastSync: "Last sync {when}",
      nextSync: "Next {when}",
      neverSynced: "Not synced yet",
      syncFailed: "Sync failed",
      autoSync: "Daily sync at {time}",
      loadFailed: "Cannot load signal data",
      retry: "Retry",
      loading: "Calculating\u2026",
      daySignal: "Signal today",
      monthExecution: "Month execution {date}",
      dayReference: "Signal reference for the selected day",
      todayReference: "01 \xB7 Reference today",
      executedThisMonth: "02 \xB7 Executed this month",
      pause: "Skip this month's contribution",
      oneX: "Invest the base monthly amount",
      twoX: "Invest two monthly amounts",
      threeX: "Invest three monthly amounts",
      lowResonance: "Low signals",
      signalsOn: "lit",
      zone3: "Three-signal resonance",
      zone2: "Double-low resonance",
      zone1: "Single low signal",
      zoneHigh: "Overvalued near high",
      zoneNormal: "Normal watch zone",
      valuation: "Valuation",
      capePercentile: "CAPE historical percentile",
      trend: "Trend",
      drawdownFromPeak: "Distance from running peak",
      panic: "Panic",
      vixValue: "VIX \xB7 current value",
      thresholdCape: "Low signal < 20%",
      thresholdDrawdown: "Low signal \u2264 \u221220%",
      thresholdVix: "Low signal \u2265 40",
      cheap: "Extremely cheap",
      bubble: "Bubble warning zone",
      overvalued: "Overvalued",
      neutral: "Neutral zone",
      deepDrop: "Deep long-term drawdown",
      nearHigh: "Near running high",
      normalDrop: "Normal drawdown zone",
      extremeFear: "Extreme fear",
      tooCalm: "Unusually calm",
      calm: "Sentiment in normal range",
      live: "Live",
      snapshot: "Snapshot",
      distance52w: "Distance from 52-week high",
      backgroundOnly: "Recent trend context only",
      quickDrop25: "25-day quick drop",
      quickCrashTriggered: "Quick-crash warning triggered",
      threshold12: "Threshold \u221212%",
      cooldown: "Cooldown count",
      cooldownFull: "{n} months (full)",
      cooldownProgress: "{n}/6",
      cooldownRule: "VIX < 12 or CAPE > 85%, counted alternately",
      capeMonth: "CAPE data month",
      monthlyDataNote: "Monthly data is not presented as daily",
      signalEyebrow: "Signal breakdown",
      signalTitle: "Why this signal for the selected day",
      signalNote: "Signals use the selected day; market holidays fall back to the previous trading day. The monthly strategy still executes only on the month's first trading day.",
      historyEyebrow: "Monthly signal history",
      historyTitle: "What the rules did each month",
      range5y: "5Y",
      range10y: "10Y",
      rangeAll: "All",
      chartTier: "New-cash tier",
      chartPoints: "First trading day of each month \xB7 {n} executions",
      chartAria: "Historical monthly action curve",
      legendQQQ: "QQQ unadjusted close (normalized)",
      legendBig: "Double or triple low: 3\xD7 TQQQ",
      legendSmall: "Single low: 2\xD7 QQQ",
      legendNormal: "Normal QQQ contribution",
      legendHigh: "Overvalued, skipped",
      legendProlonged: "Prolonged-condition deleveraging",
      legendCrash: "Quick-crash deleveraging",
      lowSignals: "{n}/3 low signals",
      viewDecision: "View decision",
      executionOrder: "Execution order",
      ammoAction: "Ammo action",
      qqqActual: "QQQ actual price",
      qqqActualNote: "Unadjusted close of the first trading day",
      capePercentileShort: "CAPE percentile",
      drawdownShort: "From running peak",
      vixMonthStart: "VIX \xB7 month start",
      historyNote: "Each point is the month's first trading day. The blue line is the new-cash tier; deleveraging and ammo actions are listed in execution order below. The dashed gray line is Yahoo Finance's unadjusted QQQ close, normalized on a log scale within the selected range.",
      traceEyebrow: "Decision trace",
      traceTitle: "This month's action order",
      traceNote: "These actions combine rather than exclude each other: ramp, deleveraging, ammo, and new cash run in strategy order.",
      step1: "QQQ \u2192 TQQQ conversion ramp",
      step2: "Quick-crash / cooldown deleveraging",
      step3: "Ammo reserve",
      step4: "New cash this month",
      methodTitle: "Method and rules",
      method1Title: "Execution date",
      method1: "Any date in a month maps to that month's first trading day; the strategy executes once a month.",
      method2Title: "Time zone",
      method2: "\u201CToday\u201D, the current month, and scheduled refreshes use Asia/Shanghai regardless of the viewer's time zone.",
      method3Title: "Valuation percentile",
      method3: "CAPE is forward-filled to trading days, then ranked with an expanding history-wide percentile; ties take the average rank.",
      method4Title: "Trend and quick drop",
      method4: "NDX returns run before QQQ, adjusted QQQ returns after; drawdown is measured from the running peak since 1990. A 25-day drop of \u221212% triggers quick-crash handling.",
      method5Title: "New-cash tiers",
      method5: "Overvalued and near the high is 0\xD7, normal is 1\xD7, one low signal is 2\xD7, two or more is 3\xD7. Extra cash never comes from the ammo reserve.",
      method6Title: "Ammo drip",
      method6: "The ammo reserve only receives TQQQ sales made while CAPE > 85%. Without a low signal it drips 1/6 of the updated balance into QQQ; any low signal releases all of it.",
      sourcesTitle: "Data sources",
      sourcesNote: "The panel reads the same snapshot; the current month first merges live upstream data and falls back per source.",
      sourceQQQ: "QQQ price history",
      sourceQQQNote: "Adjusted for strategy \xB7 unadjusted in the chart",
      daily: "Daily",
      generatedAt: "Snapshot generated {when}",
      credit: "Strategy credit",
      creditOriginal: "Original action guide and backtest notes",
      creditRead: "Read the original on X",
      creditAuthor: "Author @app_sail",
      footer: "Research tool only \xB7 not investment advice. Leveraged ETFs can draw down more than 50%.",
      backToTop: "Back to top",
      viewMonth: "Review any month",
      openCalendar: "Open date picker",
      closeCalendar: "Close date picker",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      yearUnit: "",
      monthUnit: "",
      weekdays: "M,T,W,T,F,S,S",
      calendarHint: "Asia/Shanghai \xB7 signals since the first trading day of 2000",
      backToToday: "Back to today",
      selectDate: "Choose a review date",
      historyFailed: "History chart unavailable"
    };

    // client-src/client.jsx
    var PANEL_ID = "nasdaq-signal-guide";
    var inject = ["slots", "locale"];
    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "nasdaq-signal-guide: dictionaries");
      const t = ctx.locale.bind(NS);
      ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
        name: "sidebar.panellist",
        id: PANEL_ID,
        order: 55,
        label: () => t("panel"),
        locale: NS
      }, PanelIcon));
      ctx.slots.inject("main", () => ctx.slots.register({
        name: "main",
        key: PANEL_ID,
        locale: NS
      }, Panel));
    }

    return module.exports;
  },
});
