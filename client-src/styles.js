/**
 * Panel stylesheet.
 *
 * Container colors, borders, and text come from Harness theme tokens so light
 * and dark both work; the four signal accents reuse the host state colors.
 * The whole sheet is scoped under `nsg-` and rendered as a React <style>, so it
 * disappears with the panel.
 */
export const CSS = `
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
.nsg-method summary::before{content:"▸";color:var(--nsg-muted);font-size:10px;transition:transform .15s ease;}
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
