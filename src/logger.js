const IS_DEV = process.env.NODE_ENV === "development";
const HAS_CONSOLE = typeof console !== "undefined";
const INFO_C = "color: #2db7f5;";
const TIP_C = "color: #ff9900;";

export default {
  info(...args) {
    HAS_CONSOLE && IS_DEV && console.log.apply(null, ["%c[Auto Storage]:", INFO_C, ...args]);
  },

  tip(...args) {
    HAS_CONSOLE && IS_DEV && console.log.apply(null, ["%c[Auto Storage]:", TIP_C, ...args]);
  },

  warn(...args) {
    HAS_CONSOLE && IS_DEV && console.error.apply(null, ["[Auto Storage error]:", ...args]);
  }
};
