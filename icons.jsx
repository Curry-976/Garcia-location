// icons.jsx — minimalist line icons for Garcia Location
// Exported to window as `Icon` ({name, ...props}).
const { createElement: h } = React;

const ICON_PATHS = {
  pin: <><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></>,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></>,
  car: <><path d="M3 13.5 5 8.2A2.5 2.5 0 0 1 7.3 6.6h9.4A2.5 2.5 0 0 1 19 8.2l2 5.3"/><path d="M3 13.5h18v4.2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><circle cx="7" cy="16" r="0.6"/><circle cx="17" cy="16" r="0.6"/></>,
  suv: <><path d="M2.5 14 4 9.5A2.4 2.4 0 0 1 6.3 8h11.4A2.4 2.4 0 0 1 20 9.5L21.5 14"/><path d="M2.5 14h19v4.4a.9.9 0 0 1-.9.9H19a.9.9 0 0 1-.9-.9v-1.1H5.9v1.1a.9.9 0 0 1-.9.9H3.4a.9.9 0 0 1-.9-.9Z"/><path d="M9 8V5.6A.6.6 0 0 1 9.6 5h4.8a.6.6 0 0 1 .6.6V8"/></>,
  van: <><path d="M3 6.5h11.5v11H3zM14.5 9h4l2.5 3v5.5h-6.5z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></>,
  snow: <><path d="M12 2v20M4.5 7l15 10M19.5 7l-15 10"/><path d="M12 6l-2.2-2.2M12 6l2.2-2.2M12 18l-2.2 2.2M12 18l2.2 2.2"/></>,
  gearbox: <><circle cx="6.5" cy="6.5" r="2"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17.5" cy="6.5" r="2"/><path d="M6.5 8.5v7M6.5 6.5h11M17.5 8.5v0c0 3-3 4.5-6 4.5"/></>,
  door: <><path d="M14 3 6 5v16h8zM6 21h12"/><circle cx="11.5" cy="12.5" r="0.7"/></>,
  seat: <><path d="M7 4a2 2 0 0 1 2 2v6h5a2 2 0 0 1 2 2v6"/><path d="M5 12h2M7 20h9"/><path d="M5 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/></>,
  fuel: <><path d="M5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16M4 21h11"/><path d="M5 12h9M14 8l3 3v6a1.8 1.8 0 0 0 3 0v-8l-2.5-2.5"/></>,
  arrowR: <path d="M5 12h14M13 6l6 6-6 6"/>,
  arrowL: <path d="M19 12H5M11 6l-6 6 6 6"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  phone: <path d="M5 4h3.5l1.6 4-2 1.4a12 12 0 0 0 5 5l1.4-2 4 1.6V21a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1Z"/>,
  whatsapp: <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 5.9 10.8.8.8 0 0 0-.1.7l.5 1.8-1.9-.5a.8.8 0 0 0-.6.1A7 7 0 1 1 12 5Zm-2.6 3.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.8 2.7.7 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2-1.5-.2-.3 0-.5.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.4-.4-.4-.6-.4Z"/>,
  msg: <path d="M4 5h16v11H9l-5 4z"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="M6 6l12 12M18 6 6 18"/>,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6Z"/><path d="M9 12l2 2 4-4"/></>,
  infinity: <path d="M7 9a3 3 0 1 0 0 6c2.5 0 3.5-3 5-3s2.5 3 5 3a3 3 0 1 0 0-6c-2.5 0-3.5 3-5 3s-2.5-3-5-3Z"/>,
  spark: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6Z"/>,
  tag: <><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9Z"/><circle cx="7.5" cy="7.5" r="1.3"/></>,
  check: <path d="M5 12l5 5L19 7"/>,
  chevD: <path d="M6 9l6 6 6-6"/>,
  gps: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
  child: <><circle cx="12" cy="6" r="2.4"/><path d="M8 21v-6l-2-1 1-4a3 3 0 0 1 3-2h4a3 3 0 0 1 3 2l1 4-2 1v6"/></>,
  insurance: <><path d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6Z"/><path d="M12 8v6M9 11h6"/></>,
  clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
  star: <path d="M12 3l2.5 6 6.5.5-5 4.2 1.6 6.3L12 16.8 6.4 20l1.6-6.3-5-4.2 6.5-.5Z"/>,
  route: <><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><path d="M8 16.5c5-1 8-3 9-9M9.5 18H14a3 3 0 0 0 0-6H9"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></>,
  moon: <path d="M20 13.5A8 8 0 0 1 10.5 4a7 7 0 1 0 9.5 9.5Z"/>,
};

function Icon({ name, size = 20, stroke = 2, fill = false, style, className }) {
  const p = ICON_PATHS[name];
  if (!p) return null;
  const filledNames = ["spark", "star"];
  const isFilled = fill || filledNames.includes(name) ? "currentColor" : "none";
  return h("svg", {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: name === "whatsapp" ? "currentColor" : isFilled,
    stroke: name === "whatsapp" ? "none" : "currentColor",
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
    style, className,
  }, p);
}

Object.assign(window, { Icon });
