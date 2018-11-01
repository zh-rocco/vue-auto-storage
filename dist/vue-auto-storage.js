 /*!
  * vue-auto-storage.js v1.8.1
  * (c) 2018 Rocco Mormont
  * @license MIT
  */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueAutoStorage=e()}(this,function(){"use strict";function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t){return t.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"")}function a(t,e,n){if("string"==typeof e){for(var o=c(e).split("."),r=o.pop(),i=0,a=o.length;i<a;i++){if("object"!==u(t))return;t=t[o[i]]}t[r]=n}}var i="__AUTO_STORAGE__",n=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._vm=t,this._unwatchFns=Object.create(null),this._storage=t.__AUTO_STORAGE_OPTIONS__.storage,this._debounce=t.__AUTO_STORAGE_OPTIONS__.debounce,this._prefix=i+t.$options.name.toUpperCase()+"__"}var t,n,o;return t=e,(n=[{key:"getName",value:function(t){return this._prefix+t.toUpperCase()}},{key:"getItem",value:function(t){return this._storage.getItem(this.getName(t))}},{key:"watch",value:function(e){var n=this;"string"==typeof e&&(e=c(e),this._unwatchFns[e]||void 0===function(t,e){if("string"==typeof e)return c(e).split(".").reduce(function(t,e){return"object"===u(t)&&t.hasOwnProperty(e)?t[e]:void 0},t)}(this._vm,e)||(this._unwatchFns[e]=this._vm.$watch(e,function(r){var i,a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var t=this,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];i&&clearTimeout(i),i=setTimeout(function(){r.apply(t,n)},a)}}(function(t){n._storage.setItem(n.getName(e),t)},this._debounce),{deep:!0})))}},{key:"unwatch",value:function(t){if(void 0===t){for(var e in this._unwatchFns)this._unwatchFns[e]();delete this._unwatchFns,this._unwatchFns=Object.create(null)}else t in this._unwatchFns&&(this._unwatchFns[t](),delete this._unwatchFns[t])}},{key:"clear",value:function(t){void 0===t?this._storage.clear(i):this._storage.removeItem(this.getName(t))}},{key:"destroy",value:function(){this.unwatch(),delete this._vm,delete this._prefix,delete this._storage,delete this._debounce}}])&&r(t.prototype,n),o&&r(t,o),e}();function t(t){var e;e=t.$options.autoStorage,"[object Array]"===Object.prototype.toString.call(e)&&t.$options.name&&!t.$autoStorage&&(t.$autoStorage=new n(t),function(t){for(var e,n,o=t.$options.autoStorage,r=0,i=o.length;r<i;r++)e=o[r],void 0!==(n=t.$autoStorage.getItem(e))&&a(t,e,n)}(t),function(t){for(var e=t.$options.autoStorage,n=0,o=e.length;n<o;n++)t.$autoStorage.watch(e[n])}(t))}var s={created:function(){try{t(this)}catch(t){}},beforeDestroy:function(){var t;(t=this).$autoStorage&&(t.$autoStorage.destroy(),delete t.$autoStorage)}};var f={debounce:300,storage:window.localStorage},e={install:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};for(var n in e)f[n]=e[n];var o,r=f.storage;if(!function(t){try{return"function"==typeof t.clear&&"function"==typeof t.getItem&&"function"==typeof t.setItem&&"function"==typeof t.removeItem}catch(t){return!1}}(r))throw new Error("Invalid storage instance given");f.storage=(o=r,{setItem:function(t,e){o.setItem(t,JSON.stringify(void 0===e?null:e))},getItem:function(t){var e=o[t];return void 0===e?void 0:JSON.parse(e)},removeItem:function(t){o.removeItem(t)},clear:function(t){if(t)for(var e in o)o.hasOwnProperty(e)&&e.includes(t)&&o.removeItem(e);else o.clear()}}),Object.defineProperty(t.prototype,"__AUTO_STORAGE_OPTIONS__",{value:f}),t.mixin(s)}};return"undefined"!=typeof window&&window.Vue&&window.Vue.use(e),e});
