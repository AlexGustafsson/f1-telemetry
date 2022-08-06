const p$5 = function polyfill2() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link2 of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link2);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link2) {
    if (link2.ep)
      return;
    link2.ep = true;
    const fetchOpts = getFetchOpts(link2);
    fetch(link2.href, fetchOpts);
  }
};
p$5();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$4 = Symbol.for("react.fragment"), q$3 = Symbol.for("react.strict_mode"), r$2 = Symbol.for("react.profiler"), t$2 = Symbol.for("react.provider"), u$2 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w$1 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$2(a2) {
  if (a2 === null || typeof a2 !== "object")
    return null;
  a2 = z$1 && a2[z$1] || a2["@@iterator"];
  return typeof a2 === "function" ? a2 : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$2(a2, b, e3) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e3 || B$2;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a2, b) {
  if (typeof a2 !== "object" && typeof a2 !== "function" && a2 != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b, "setState");
};
E$2.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F() {
}
F.prototype = E$2.prototype;
function G$1(a2, b, e3) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e3 || B$2;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$2(H$1, E$2.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a2, b, e3) {
  var d, c2 = {}, k2 = null, h2 = null;
  if (b != null)
    for (d in b.ref !== void 0 && (h2 = b.ref), b.key !== void 0 && (k2 = "" + b.key), b)
      J.call(b, d) && !L$1.hasOwnProperty(d) && (c2[d] = b[d]);
  var g = arguments.length - 2;
  if (g === 1)
    c2.children = e3;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps)
    for (d in g = a2.defaultProps, g)
      c2[d] === void 0 && (c2[d] = g[d]);
  return { $$typeof: l$2, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$1(a2, b) {
  return { $$typeof: l$2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$1(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === l$2;
}
function escape(a2) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b[a3];
  });
}
var P$1 = /\/+/g;
function Q$1(a2, b) {
  return typeof a2 === "object" && a2 !== null && a2.key != null ? escape("" + a2.key) : b.toString(36);
}
function R$1(a2, b, e3, d, c2) {
  var k2 = typeof a2;
  if (k2 === "undefined" || k2 === "boolean")
    a2 = null;
  var h2 = false;
  if (a2 === null)
    h2 = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$2:
          case n$3:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a2, c2 = c2(h2), a2 = d === "" ? "." + Q$1(h2, 0) : d, I$1(c2) ? (e3 = "", a2 != null && (e3 = a2.replace(P$1, "$&/") + "/"), R$1(c2, b, e3, "", function(a3) {
      return a3;
    })) : c2 != null && (O$1(c2) && (c2 = N$1(c2, e3 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a2)), b.push(c2)), 1;
  h2 = 0;
  d = d === "" ? "." : d + ":";
  if (I$1(a2))
    for (var g = 0; g < a2.length; g++) {
      k2 = a2[g];
      var f2 = d + Q$1(k2, g);
      h2 += R$1(k2, b, e3, f2, c2);
    }
  else if (f2 = A$2(a2), typeof f2 === "function")
    for (a2 = f2.call(a2), g = 0; !(k2 = a2.next()).done; )
      k2 = k2.value, f2 = d + Q$1(k2, g++), h2 += R$1(k2, b, e3, f2, c2);
  else if (k2 === "object")
    throw b = String(a2), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$1(a2, b, e3) {
  if (a2 == null)
    return a2;
  var d = [], c2 = 0;
  R$1(a2, d, "", "", function(a3) {
    return b.call(e3, a3, c2++);
  });
  return d;
}
function T$1(a2) {
  if (a2._status === -1) {
    var b = a2._result;
    b = b();
    b.then(function(b2) {
      if (a2._status === 0 || a2._status === -1)
        a2._status = 1, a2._result = b2;
    }, function(b2) {
      if (a2._status === 0 || a2._status === -1)
        a2._status = 2, a2._result = b2;
    });
    a2._status === -1 && (a2._status = 0, a2._result = b);
  }
  if (a2._status === 1)
    return a2._result.default;
  throw a2._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$1, forEach: function(a2, b, e3) {
  S$1(a2, function() {
    b.apply(this, arguments);
  }, e3);
}, count: function(a2) {
  var b = 0;
  S$1(a2, function() {
    b++;
  });
  return b;
}, toArray: function(a2) {
  return S$1(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$1(a2))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$4;
react_production_min.Profiler = r$2;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$3;
react_production_min.Suspense = w$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.cloneElement = function(a2, b, e3) {
  if (a2 === null || a2 === void 0)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (b != null) {
    b.ref !== void 0 && (k2 = b.ref, h2 = K$1.current);
    b.key !== void 0 && (c2 = "" + b.key);
    if (a2.type && a2.type.defaultProps)
      var g = a2.type.defaultProps;
    for (f2 in b)
      J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = b[f2] === void 0 && g !== void 0 ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (f2 === 1)
    d.children = e3;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$2, type: a2.type, key: c2, ref: k2, props: d, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$2, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$2, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a2) {
  var b = M$1.bind(null, a2);
  b.type = a2;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$2, render: a2 };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T$1 };
};
react_production_min.memo = function(a2, b) {
  return { $$typeof: x$2, type: a2, compare: b === void 0 ? null : b };
};
react_production_min.startTransition = function(a2) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a2();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a2, b) {
  return U$1.current.useCallback(a2, b);
};
react_production_min.useContext = function(a2) {
  return U$1.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$1.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b) {
  return U$1.current.useEffect(a2, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b, e3) {
  return U$1.current.useImperativeHandle(a2, b, e3);
};
react_production_min.useInsertionEffect = function(a2, b) {
  return U$1.current.useInsertionEffect(a2, b);
};
react_production_min.useLayoutEffect = function(a2, b) {
  return U$1.current.useLayoutEffect(a2, b);
};
react_production_min.useMemo = function(a2, b) {
  return U$1.current.useMemo(a2, b);
};
react_production_min.useReducer = function(a2, b, e3) {
  return U$1.current.useReducer(a2, b, e3);
};
react_production_min.useRef = function(a2) {
  return U$1.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$1.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b, e3) {
  return U$1.current.useSyncExternalStore(a2, b, e3);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.2.0";
{
  react.exports = react_production_min;
}
var React = react.exports;
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b) {
    var c2 = a2.length;
    a2.push(b);
    a:
      for (; 0 < c2; ) {
        var d = c2 - 1 >>> 1, e3 = a2[d];
        if (0 < g(e3, b))
          a2[d] = b, a2[c2] = e3, c2 = d;
        else
          break a;
      }
  }
  function h2(a2) {
    return a2.length === 0 ? null : a2[0];
  }
  function k2(a2) {
    if (a2.length === 0)
      return null;
    var b = a2[0], c2 = a2.pop();
    if (c2 !== b) {
      a2[0] = c2;
      a:
        for (var d = 0, e3 = a2.length, w2 = e3 >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g(C2, c2))
            n2 < e3 && 0 > g(x2, C2) ? (a2[d] = x2, a2[n2] = c2, d = n2) : (a2[d] = C2, a2[m2] = c2, d = m2);
          else if (n2 < e3 && 0 > g(x2, c2))
            a2[d] = x2, a2[n2] = c2, d = n2;
          else
            break a;
        }
    }
    return b;
  }
  function g(a2, b) {
    var c2 = a2.sortIndex - b.sortIndex;
    return c2 !== 0 ? c2 : a2.id - b.id;
  }
  if (typeof performance === "object" && typeof performance.now === "function") {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = typeof setTimeout === "function" ? setTimeout : null, E2 = typeof clearTimeout === "function" ? clearTimeout : null, F2 = typeof setImmediate !== "undefined" ? setImmediate : null;
  typeof navigator !== "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b = h2(t2); b !== null; ) {
      if (b.callback === null)
        k2(t2);
      else if (b.startTime <= a2)
        k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else
        break;
      b = h2(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2)
      if (h2(r2) !== null)
        A2 = true, I2(J2);
      else {
        var b = h2(t2);
        b !== null && K2(H2, b.startTime - a2);
      }
  }
  function J2(a2, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b);
      for (v2 = h2(r2); v2 !== null && (!(v2.expirationTime > b) || a2 && !M2()); ) {
        var d = v2.callback;
        if (typeof d === "function") {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e3 = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          typeof e3 === "function" ? v2.callback = e3 : v2 === h2(r2) && k2(r2);
          G2(b);
        } else
          k2(r2);
        v2 = h2(r2);
      }
      if (v2 !== null)
        var w2 = true;
      else {
        var m2 = h2(t2);
        m2 !== null && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (O2 !== null) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b = true;
      try {
        b = O2(true, a2);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if (typeof F2 === "function")
    S2 = function() {
      F2(R2);
    };
  else if (typeof MessageChannel !== "undefined") {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c2 = y2;
    y2 = b;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b, c2) {
    var d = exports.unstable_now();
    typeof c2 === "object" && c2 !== null ? (c2 = c2.delay, c2 = typeof c2 === "number" && 0 < c2 ? d + c2 : d) : c2 = d;
    switch (a2) {
      case 1:
        var e3 = -1;
        break;
      case 2:
        e3 = 250;
        break;
      case 5:
        e3 = 1073741823;
        break;
      case 4:
        e3 = 1e4;
        break;
      default:
        e3 = 5e3;
    }
    e3 = c2 + e3;
    a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e3, sortIndex: -1 };
    c2 > d ? (a2.sortIndex = c2, f2(t2, a2), h2(r2) === null && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d))) : (a2.sortIndex = e3, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b = y2;
    return function() {
      var c2 = y2;
      y2 = b;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = react.exports, ca = scheduler.exports;
function p$3(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b) {
  ha(a2, b);
  ha(a2 + "Capture", b);
}
function ha(a2, b) {
  ea[a2] = b;
  for (a2 = 0; a2 < b.length; a2++)
    da.add(b[a2]);
}
var ia = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined"), ja = Object.prototype.hasOwnProperty, ka$1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2))
    return true;
  if (ja.call(la, a2))
    return false;
  if (ka$1.test(a2))
    return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b, c2, d) {
  if (c2 !== null && c2.type === 0)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (c2 !== null)
        return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return a2 !== "data-" && a2 !== "aria-";
    default:
      return false;
  }
}
function qa(a2, b, c2, d) {
  if (b === null || typeof b === "undefined" || pa(a2, b, c2, d))
    return true;
  if (d)
    return false;
  if (c2 !== null)
    switch (c2.type) {
      case 3:
        return !b;
      case 4:
        return b === false;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function v$1(a2, b, c2, d, e3, f2, g) {
  this.acceptsBooleans = b === 2 || b === 3 || b === 4;
  this.attributeName = d;
  this.attributeNamespace = e3;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  z[b] = new v$1(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new v$1(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new v$1(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new v$1(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new v$1(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v$1(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b, c2, d) {
  var e3 = z.hasOwnProperty(b) ? z[b] : null;
  if (e3 !== null ? e3.type !== 0 : d || !(2 < b.length) || b[0] !== "o" && b[0] !== "O" || b[1] !== "n" && b[1] !== "N")
    qa(b, c2, e3, d) && (c2 = null), d || e3 === null ? oa(b) && (c2 === null ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e3.mustUseProperty ? a2[e3.propertyName] = c2 === null ? e3.type === 3 ? false : "" : c2 : (b = e3.attributeName, d = e3.attributeNamespace, c2 === null ? a2.removeAttribute(b) : (e3 = e3.type, c2 = e3 === 3 || e3 === 4 && c2 === true ? "" : "" + c2, d ? a2.setAttributeNS(d, b, c2) : a2.setAttribute(b, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (a2 === null || typeof a2 !== "object")
    return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return typeof a2 === "function" ? a2 : null;
}
var A$1 = Object.assign, La;
function Ma(a2) {
  if (La === void 0)
    try {
      throw Error();
    } catch (c2) {
      var b = c2.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b) {
  if (!a2 || Na)
    return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect === "object" && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a2, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a2.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d && typeof l2.stack === "string") {
      for (var e3 = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e3.length - 1, h2 = f2.length - 1; 1 <= g && 0 <= h2 && e3[g] !== f2[h2]; )
        h2--;
      for (; 1 <= g && 0 <= h2; g--, h2--)
        if (e3[g] !== f2[h2]) {
          if (g !== 1 || h2 !== 1) {
            do
              if (g--, h2--, 0 > h2 || e3[g] !== f2[h2]) {
                var k2 = "\n" + e3[g].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (a2 == null)
    return null;
  if (typeof a2 === "function")
    return a2.displayName || a2.name || null;
  if (typeof a2 === "string")
    return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if (typeof a2 === "object")
    switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b.displayName || b.name || "", a2 = a2 !== "" ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b = a2.displayName || null, b !== null ? b : Qa(a2.type) || "Memo";
      case Ha:
        b = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b));
        } catch (c2) {
        }
    }
  return null;
}
function Ra(a2) {
  var b = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || (a2 !== "" ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof b === "function")
        return b.displayName || b.name || null;
      if (typeof b === "string")
        return b;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b = a2.type;
  return (a2 = a2.nodeName) && a2.toLowerCase() === "input" && (b === "checkbox" || b === "radio");
}
function Ua(a2) {
  var b = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d = "" + a2[b];
  if (!a2.hasOwnProperty(b) && typeof c2 !== "undefined" && typeof c2.get === "function" && typeof c2.set === "function") {
    var e3 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b, { configurable: true, get: function() {
      return e3.call(this);
    }, set: function(a3) {
      d = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a3) {
      d = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2)
    return false;
  var b = a2._valueTracker;
  if (!b)
    return true;
  var c2 = b.getValue();
  var d = "";
  a2 && (d = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d;
  return a2 !== c2 ? (b.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || (typeof document !== "undefined" ? document : void 0);
  if (typeof a2 === "undefined")
    return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b) {
    return a2.body;
  }
}
function Ya(a2, b) {
  var c2 = b.checked;
  return A$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c2 != null ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b) {
  var c2 = b.defaultValue == null ? "" : b.defaultValue, d = b.checked != null ? b.checked : b.defaultChecked;
  c2 = Sa(b.value != null ? b.value : c2);
  a2._wrapperState = { initialChecked: d, initialValue: c2, controlled: b.type === "checkbox" || b.type === "radio" ? b.checked != null : b.value != null };
}
function ab(a2, b) {
  b = b.checked;
  b != null && ta(a2, "checked", b, false);
}
function bb(a2, b) {
  ab(a2, b);
  var c2 = Sa(b.value), d = b.type;
  if (c2 != null)
    if (d === "number") {
      if (c2 === 0 && a2.value === "" || a2.value != c2)
        a2.value = "" + c2;
    } else
      a2.value !== "" + c2 && (a2.value = "" + c2);
  else if (d === "submit" || d === "reset") {
    a2.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
  b.checked == null && b.defaultChecked != null && (a2.defaultChecked = !!b.defaultChecked);
}
function db(a2, b, c2) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!(d !== "submit" && d !== "reset" || b.value !== void 0 && b.value !== null))
      return;
    b = "" + a2._wrapperState.initialValue;
    c2 || b === a2.value || (a2.value = b);
    a2.defaultValue = b;
  }
  c2 = a2.name;
  c2 !== "" && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  c2 !== "" && (a2.name = c2);
}
function cb(a2, b, c2) {
  if (b !== "number" || Xa(a2.ownerDocument) !== a2)
    c2 == null ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b, c2, d) {
  a2 = a2.options;
  if (b) {
    b = {};
    for (var e3 = 0; e3 < c2.length; e3++)
      b["$" + c2[e3]] = true;
    for (c2 = 0; c2 < a2.length; c2++)
      e3 = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e3 && (a2[c2].selected = e3), e3 && d && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b = null;
    for (e3 = 0; e3 < a2.length; e3++) {
      if (a2[e3].value === c2) {
        a2[e3].selected = true;
        d && (a2[e3].defaultSelected = true);
        return;
      }
      b !== null || a2[e3].disabled || (b = a2[e3]);
    }
    b !== null && (b.selected = true);
  }
}
function gb(a2, b) {
  if (b.dangerouslySetInnerHTML != null)
    throw Error(p$3(91));
  return A$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b) {
  var c2 = b.value;
  if (c2 == null) {
    c2 = b.children;
    b = b.defaultValue;
    if (c2 != null) {
      if (b != null)
        throw Error(p$3(92));
      if (eb(c2)) {
        if (1 < c2.length)
          throw Error(p$3(93));
        c2 = c2[0];
      }
      b = c2;
    }
    b == null && (b = "");
    c2 = b;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b) {
  var c2 = Sa(b.value), d = Sa(b.defaultValue);
  c2 != null && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), b.defaultValue == null && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  d != null && (a2.defaultValue = "" + d);
}
function jb(a2) {
  var b = a2.textContent;
  b === a2._wrapperState.initialValue && b !== "" && b !== null && (a2.value = b);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b) {
  return a2 == null || a2 === "http://www.w3.org/1999/xhtml" ? kb(b) : a2 === "http://www.w3.org/2000/svg" && b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b, c2, d, e3) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b, c2, d, e3);
    });
  } : a2;
}(function(a2, b) {
  if (a2.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in a2)
    a2.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a2.firstChild; )
      a2.removeChild(a2.firstChild);
    for (; b.firstChild; )
      a2.appendChild(b.firstChild);
  }
});
function ob(a2, b) {
  if (b) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && c2.nodeType === 3) {
      c2.nodeValue = b;
      return;
    }
  }
  a2.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b] = pb[a2];
  });
});
function rb(a2, b, c2) {
  return b == null || typeof b === "boolean" || b === "" ? "" : c2 || typeof b !== "number" || b === 0 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
}
function sb(a2, b) {
  a2 = a2.style;
  for (var c2 in b)
    if (b.hasOwnProperty(c2)) {
      var d = c2.indexOf("--") === 0, e3 = rb(c2, b[c2], d);
      c2 === "float" && (c2 = "cssFloat");
      d ? a2.setProperty(c2, e3) : a2[c2] = e3;
    }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b) {
  if (b) {
    if (tb[a2] && (b.children != null || b.dangerouslySetInnerHTML != null))
      throw Error(p$3(137, a2));
    if (b.dangerouslySetInnerHTML != null) {
      if (b.children != null)
        throw Error(p$3(60));
      if (typeof b.dangerouslySetInnerHTML !== "object" || !("__html" in b.dangerouslySetInnerHTML))
        throw Error(p$3(61));
    }
    if (b.style != null && typeof b.style !== "object")
      throw Error(p$3(62));
  }
}
function vb(a2, b) {
  if (a2.indexOf("-") === -1)
    return typeof b.is === "string";
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return a2.nodeType === 3 ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if (typeof yb !== "function")
      throw Error(p$3(280));
    var b = a2.stateNode;
    b && (b = Db(b), yb(a2.stateNode, a2.type, b));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b)
      for (a2 = 0; a2 < b.length; a2++)
        Bb(b[a2]);
  }
}
function Gb(a2, b) {
  return a2(b);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b, c2) {
  if (Ib)
    return a2(b, c2);
  Ib = true;
  try {
    return Gb(a2, b, c2);
  } finally {
    if (Ib = false, zb !== null || Ab !== null)
      Hb(), Fb();
  }
}
function Kb(a2, b) {
  var c2 = a2.stateNode;
  if (c2 === null)
    return null;
  var d = Db(c2);
  if (d === null)
    return null;
  c2 = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a2 = a2.type, d = !(a2 === "button" || a2 === "input" || a2 === "select" || a2 === "textarea"));
        a2 = !d;
        break a;
      default:
        a2 = false;
    }
  if (a2)
    return null;
  if (c2 && typeof c2 !== "function")
    throw Error(p$3(231, b, typeof c2));
  return c2;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
function Nb(a2, b, c2, d, e3, f2, g, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b, c2, d, e3, f2, g, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b, c2, d, e3, f2, g, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p$3(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b = a2, c2 = a2;
  if (a2.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a2 = b;
    do
      b = a2, (b.flags & 4098) !== 0 && (c2 = b.return), a2 = b.return;
    while (a2);
  }
  return b.tag === 3 ? c2 : null;
}
function Wb(a2) {
  if (a2.tag === 13) {
    var b = a2.memoizedState;
    b === null && (a2 = a2.alternate, a2 !== null && (b = a2.memoizedState));
    if (b !== null)
      return b.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2)
    throw Error(p$3(188));
}
function Yb(a2) {
  var b = a2.alternate;
  if (!b) {
    b = Vb(a2);
    if (b === null)
      throw Error(p$3(188));
    return b !== a2 ? null : a2;
  }
  for (var c2 = a2, d = b; ; ) {
    var e3 = c2.return;
    if (e3 === null)
      break;
    var f2 = e3.alternate;
    if (f2 === null) {
      d = e3.return;
      if (d !== null) {
        c2 = d;
        continue;
      }
      break;
    }
    if (e3.child === f2.child) {
      for (f2 = e3.child; f2; ) {
        if (f2 === c2)
          return Xb(e3), a2;
        if (f2 === d)
          return Xb(e3), b;
        f2 = f2.sibling;
      }
      throw Error(p$3(188));
    }
    if (c2.return !== d.return)
      c2 = e3, d = f2;
    else {
      for (var g = false, h2 = e3.child; h2; ) {
        if (h2 === c2) {
          g = true;
          c2 = e3;
          d = f2;
          break;
        }
        if (h2 === d) {
          g = true;
          d = e3;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g = true;
            c2 = f2;
            d = e3;
            break;
          }
          if (h2 === d) {
            g = true;
            d = f2;
            c2 = e3;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g)
          throw Error(p$3(189));
      }
    }
    if (c2.alternate !== d)
      throw Error(p$3(190));
  }
  if (c2.tag !== 3)
    throw Error(p$3(188));
  return c2.stateNode.current === c2 ? a2 : b;
}
function Zb(a2) {
  a2 = Yb(a2);
  return a2 !== null ? $b(a2) : null;
}
function $b(a2) {
  if (a2.tag === 5 || a2.tag === 6)
    return a2;
  for (a2 = a2.child; a2 !== null; ) {
    var b = $b(a2);
    if (b !== null)
      return b;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && typeof lc.onCommitFiberRoot === "function")
    try {
      lc.onCommitFiberRoot(kc, a2, void 0, (a2.current.flags & 128) === 128);
    } catch (b) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return a2 === 0 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b) {
  var c2 = a2.pendingLanes;
  if (c2 === 0)
    return 0;
  var d = 0, e3 = a2.suspendedLanes, f2 = a2.pingedLanes, g = c2 & 268435455;
  if (g !== 0) {
    var h2 = g & ~e3;
    h2 !== 0 ? d = tc(h2) : (f2 &= g, f2 !== 0 && (d = tc(f2)));
  } else
    g = c2 & ~e3, g !== 0 ? d = tc(g) : f2 !== 0 && (d = tc(f2));
  if (d === 0)
    return 0;
  if (b !== 0 && b !== d && (b & e3) === 0 && (e3 = d & -d, f2 = b & -b, e3 >= f2 || e3 === 16 && (f2 & 4194240) !== 0))
    return b;
  (d & 4) !== 0 && (d |= c2 & 16);
  b = a2.entangledLanes;
  if (b !== 0)
    for (a2 = a2.entanglements, b &= d; 0 < b; )
      c2 = 31 - oc(b), e3 = 1 << c2, d |= a2[c2], b &= ~e3;
  return d;
}
function vc(a2, b) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b) {
  for (var c2 = a2.suspendedLanes, d = a2.pingedLanes, e3 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h2 = 1 << g, k2 = e3[g];
    if (k2 === -1) {
      if ((h2 & c2) === 0 || (h2 & d) !== 0)
        e3[g] = vc(h2, b);
    } else
      k2 <= b && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return a2 !== 0 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  (rc & 4194240) === 0 && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b = [], c2 = 0; 31 > c2; c2++)
    b.push(a2);
  return b;
}
function Ac(a2, b, c2) {
  a2.pendingLanes |= b;
  b !== 536870912 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b = 31 - oc(b);
  a2[b] = c2;
}
function Bc(a2, b) {
  var c2 = a2.pendingLanes & ~b;
  a2.pendingLanes = b;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b;
  a2.mutableReadLanes &= b;
  a2.entangledLanes &= b;
  b = a2.entanglements;
  var d = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e3 = 31 - oc(c2), f2 = 1 << e3;
    b[e3] = 0;
    d[e3] = -1;
    a2[e3] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b) {
  var c2 = a2.entangledLanes |= b;
  for (a2 = a2.entanglements; c2; ) {
    var d = 31 - oc(c2), e3 = 1 << d;
    e3 & b | a2[d] & b && (a2[d] |= b);
    c2 &= ~e3;
  }
}
var C$1 = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? (a2 & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a2, b, c2, d, e3, f2) {
  if (a2 === null || a2.nativeEvent !== f2)
    return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e3] }, b !== null && (b = Cb(b), b !== null && Fc(b)), a2;
  a2.eventSystemFlags |= d;
  b = a2.targetContainers;
  e3 !== null && b.indexOf(e3) === -1 && b.push(e3);
  return a2;
}
function Uc(a2, b, c2, d, e3) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a2, b, c2, d, e3), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b, c2, d, e3), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b, c2, d, e3), true;
    case "pointerover":
      var f2 = e3.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c2, d, e3));
      return true;
    case "gotpointercapture":
      return f2 = e3.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c2, d, e3)), true;
  }
  return false;
}
function Vc(a2) {
  var b = Wc(a2.target);
  if (b !== null) {
    var c2 = Vb(b);
    if (c2 !== null) {
      if (b = c2.tag, b === 13) {
        if (b = Wb(c2), b !== null) {
          a2.blockedOn = b;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (b === 3 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = c2.tag === 3 ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (a2.blockedOn !== null)
    return false;
  for (var b = a2.targetContainers; 0 < b.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
    if (c2 === null) {
      c2 = a2.nativeEvent;
      var d = new c2.constructor(c2.type, c2);
      wb = d;
      c2.target.dispatchEvent(d);
      wb = null;
    } else
      return b = Cb(c2), b !== null && Fc(b), a2.blockedOn = c2, false;
    b.shift();
  }
  return true;
}
function Zc(a2, b, c2) {
  Xc(a2) && c2.delete(b);
}
function $c() {
  Jc = false;
  Lc !== null && Xc(Lc) && (Lc = null);
  Mc !== null && Xc(Mc) && (Mc = null);
  Nc !== null && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b) {
  a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b(b2) {
    return ad(b2, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d = Kc[c2];
      d.blockedOn === a2 && (d.blockedOn = null);
    }
  }
  Lc !== null && ad(Lc, a2);
  Mc !== null && ad(Mc, a2);
  Nc !== null && ad(Nc, a2);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c2 = 0; c2 < Qc.length; c2++)
    d = Qc[c2], d.blockedOn === a2 && (d.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], c2.blockedOn === null); )
    Vc(c2), c2.blockedOn === null && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b, c2, d) {
  var e3 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a2, b, c2, d);
  } finally {
    C$1 = e3, cd.transition = f2;
  }
}
function gd(a2, b, c2, d) {
  var e3 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a2, b, c2, d);
  } finally {
    C$1 = e3, cd.transition = f2;
  }
}
function fd(a2, b, c2, d) {
  if (dd) {
    var e3 = Yc(a2, b, c2, d);
    if (e3 === null)
      hd(a2, b, d, id$1, c2), Sc(a2, d);
    else if (Uc(e3, a2, b, c2, d))
      d.stopPropagation();
    else if (Sc(a2, d), b & 4 && -1 < Rc.indexOf(a2)) {
      for (; e3 !== null; ) {
        var f2 = Cb(e3);
        f2 !== null && Ec(f2);
        f2 = Yc(a2, b, c2, d);
        f2 === null && hd(a2, b, d, id$1, c2);
        if (f2 === e3)
          break;
        e3 = f2;
      }
      e3 !== null && d.stopPropagation();
    } else
      hd(a2, b, d, null, c2);
  }
}
var id$1 = null;
function Yc(a2, b, c2, d) {
  id$1 = null;
  a2 = xb(d);
  a2 = Wc(a2);
  if (a2 !== null)
    if (b = Vb(a2), b === null)
      a2 = null;
    else if (c2 = b.tag, c2 === 13) {
      a2 = Wb(b);
      if (a2 !== null)
        return a2;
      a2 = null;
    } else if (c2 === 3) {
      if (b.stateNode.current.memoizedState.isDehydrated)
        return b.tag === 3 ? b.stateNode.containerInfo : null;
      a2 = null;
    } else
      b !== a2 && (a2 = null);
  id$1 = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a2, b = ld, c2 = b.length, d, e3 = "value" in kd ? kd.value : kd.textContent, f2 = e3.length;
  for (a2 = 0; a2 < c2 && b[a2] === e3[a2]; a2++)
    ;
  var g = c2 - a2;
  for (d = 1; d <= g && b[c2 - d] === e3[f2 - d]; d++)
    ;
  return md = e3.slice(a2, 1 < d ? 1 - d : void 0);
}
function od(a2) {
  var b = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, a2 === 0 && b === 13 && (a2 = 13)) : a2 = b;
  a2 === 10 && (a2 = 13);
  return 32 <= a2 || a2 === 13 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b(b2, d, e3, f2, g) {
    this._reactName = b2;
    this._targetInst = e3;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c2 in a2)
      a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
    this.isDefaultPrevented = (f2.defaultPrevented != null ? f2.defaultPrevented : f2.returnValue === false) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : typeof a3.returnValue !== "unknown" && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : typeof a3.cancelBubble !== "unknown" && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return a2.relatedTarget === void 0 ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2)
    return a2.movementX;
  a2 !== yd && (yd && a2.type === "mousemove" ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a2) {
  if (a2.key) {
    var b = Md[a2.key] || a2.key;
    if (b !== "Unidentified")
      return b;
  }
  return a2.type === "keypress" ? (a2 = od(a2), a2 === 13 ? "Enter" : String.fromCharCode(a2)) : a2.type === "keydown" || a2.type === "keyup" ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return a2.type === "keypress" ? od(a2) : 0;
}, keyCode: function(a2) {
  return a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
}, which: function(a2) {
  return a2.type === "keypress" ? od(a2) : a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a2, b) {
  switch (a2) {
    case "keyup":
      return $d.indexOf(b.keyCode) !== -1;
    case "keydown":
      return b.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return typeof a2 === "object" && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b) {
  switch (a2) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (b.which !== 32)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b) {
  if (ie)
    return a2 === "compositionend" || !ae && ge(a2, b) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && b.locale !== "ko" ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b === "input" ? !!le[a2.type] : b === "textarea" ? true : false;
}
function ne(a2, b, c2, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({ event: c2, listeners: b }));
}
var pe = null, qe = null;
function re$1(a2) {
  se(a2, 0);
}
function te(a2) {
  var b = ue(a2);
  if (Wa(b))
    return a2;
}
function ve(a2, b) {
  if (a2 === "change")
    return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = typeof ze.oninput === "function";
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if (a2.propertyName === "value" && te(qe)) {
    var b = [];
    ne(b, qe, a2, xb(a2));
    Jb(re$1, b);
  }
}
function Ce(a2, b, c2) {
  a2 === "focusin" ? (Ae(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : a2 === "focusout" && Ae();
}
function De(a2) {
  if (a2 === "selectionchange" || a2 === "keyup" || a2 === "keydown")
    return te(qe);
}
function Ee(a2, b) {
  if (a2 === "click")
    return te(b);
}
function Fe(a2, b) {
  if (a2 === "input" || a2 === "change")
    return te(b);
}
function Ge(a2, b) {
  return a2 === b && (a2 !== 0 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var He = typeof Object.is === "function" ? Object.is : Ge;
function Ie(a2, b) {
  if (He(a2, b))
    return true;
  if (typeof a2 !== "object" || a2 === null || typeof b !== "object" || b === null)
    return false;
  var c2 = Object.keys(a2), d = Object.keys(b);
  if (c2.length !== d.length)
    return false;
  for (d = 0; d < c2.length; d++) {
    var e3 = c2[d];
    if (!ja.call(b, e3) || !He(a2[e3], b[e3]))
      return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; )
    a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d; c2; ) {
    if (c2.nodeType === 3) {
      d = a2 + c2.textContent.length;
      if (a2 <= b && d >= b)
        return { node: c2, offset: b - a2 };
      a2 = d;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b) {
  return a2 && b ? a2 === b ? true : a2 && a2.nodeType === 3 ? false : b && b.nodeType === 3 ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = typeof b.contentWindow.location.href === "string";
    } catch (d) {
      c2 = false;
    }
    if (c2)
      a2 = b.contentWindow;
    else
      break;
    b = Xa(a2.document);
  }
  return b;
}
function Ne(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b && (b === "input" && (a2.type === "text" || a2.type === "search" || a2.type === "tel" || a2.type === "url" || a2.type === "password") || b === "textarea" || a2.contentEditable === "true");
}
function Oe(a2) {
  var b = Me(), c2 = a2.focusedElem, d = a2.selectionRange;
  if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (d !== null && Ne(c2)) {
      if (b = d.start, a2 = d.end, a2 === void 0 && (a2 = b), "selectionStart" in c2)
        c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e3 = c2.textContent.length, f2 = Math.min(d.start, e3);
        d = d.end === void 0 ? f2 : Math.min(d.end, e3);
        !a2.extend && f2 > d && (e3 = d, d = f2, f2 = e3);
        e3 = Ke(c2, f2);
        var g = Ke(c2, d);
        e3 && g && (a2.rangeCount !== 1 || a2.anchorNode !== e3.node || a2.anchorOffset !== e3.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e3.node, e3.offset), a2.removeAllRanges(), f2 > d ? (a2.addRange(b), a2.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a2.addRange(b)));
      }
    }
    b = [];
    for (a2 = c2; a2 = a2.parentNode; )
      a2.nodeType === 1 && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    typeof c2.focus === "function" && c2.focus();
    for (c2 = 0; c2 < b.length; c2++)
      a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a2, b, c2) {
  var d = c2.window === c2 ? c2.document : c2.nodeType === 9 ? c2 : c2.ownerDocument;
  Te || Qe == null || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a2, b) {
  var c2 = {};
  c2[a2.toLowerCase()] = b.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b;
  c2["Moz" + a2] = "moz" + b;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2])
    return Xe[a2];
  if (!We[a2])
    return a2;
  var b = We[a2], c2;
  for (c2 in b)
    if (b.hasOwnProperty(c2) && c2 in Ye)
      return Xe[a2] = b[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b) {
  df.set(a2, b);
  fa(b, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b, c2) {
  var d = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d, b, void 0, a2);
  a2.currentTarget = null;
}
function se(a2, b) {
  b = (b & 4) !== 0;
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d = a2[c2], e3 = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b)
        for (var g = d.length - 1; 0 <= g; g--) {
          var h2 = d[g], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e3.isPropagationStopped())
            break a;
          nf(e3, h2, l2);
          f2 = k2;
        }
      else
        for (g = 0; g < d.length; g++) {
          h2 = d[g];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e3.isPropagationStopped())
            break a;
          nf(e3, h2, l2);
          f2 = k2;
        }
    }
  }
  if (Qb)
    throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D$1(a2, b) {
  var c2 = b[of];
  c2 === void 0 && (c2 = b[of] = /* @__PURE__ */ new Set());
  var d = a2 + "__bubble";
  c2.has(d) || (pf(b, a2, 2, false), c2.add(d));
}
function qf(a2, b, c2) {
  var d = 0;
  b && (d |= 4);
  pf(c2, a2, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b2) {
      b2 !== "selectionchange" && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
    });
    var b = a2.nodeType === 9 ? a2 : a2.ownerDocument;
    b === null || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a2, b, c2, d) {
  switch (jd(b)) {
    case 1:
      var e3 = ed;
      break;
    case 4:
      e3 = gd;
      break;
    default:
      e3 = fd;
  }
  c2 = e3.bind(null, b, c2, a2);
  e3 = void 0;
  !Lb || b !== "touchstart" && b !== "touchmove" && b !== "wheel" || (e3 = true);
  d ? e3 !== void 0 ? a2.addEventListener(b, c2, { capture: true, passive: e3 }) : a2.addEventListener(b, c2, true) : e3 !== void 0 ? a2.addEventListener(b, c2, { passive: e3 }) : a2.addEventListener(b, c2, false);
}
function hd(a2, b, c2, d, e3) {
  var f2 = d;
  if ((b & 1) === 0 && (b & 2) === 0 && d !== null)
    a:
      for (; ; ) {
        if (d === null)
          return;
        var g = d.tag;
        if (g === 3 || g === 4) {
          var h2 = d.stateNode.containerInfo;
          if (h2 === e3 || h2.nodeType === 8 && h2.parentNode === e3)
            break;
          if (g === 4)
            for (g = d.return; g !== null; ) {
              var k2 = g.tag;
              if (k2 === 3 || k2 === 4) {
                if (k2 = g.stateNode.containerInfo, k2 === e3 || k2.nodeType === 8 && k2.parentNode === e3)
                  return;
              }
              g = g.return;
            }
          for (; h2 !== null; ) {
            g = Wc(h2);
            if (g === null)
              return;
            k2 = g.tag;
            if (k2 === 5 || k2 === 6) {
              d = f2 = g;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d = d.return;
      }
  Jb(function() {
    var d2 = f2, e4 = xb(c2), g2 = [];
    a: {
      var h3 = df.get(a2);
      if (h3 !== void 0) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (od(c2) === 0)
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (c2.button === 2)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = (b & 4) !== 0, J2 = !t2 && a2 === "scroll", x2 = t2 ? h3 !== null ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d2, u2; w2 !== null; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          u2.tag === 5 && F2 !== null && (u2 = F2, x2 !== null && (F2 = Kb(w2, x2), F2 != null && t2.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c2, e4), g2.push({ event: h3, listeners: t2 }));
      }
    }
    if ((b & 7) === 0) {
      a: {
        h3 = a2 === "mouseover" || a2 === "pointerover";
        k3 = a2 === "mouseout" || a2 === "pointerout";
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k3 || h3) {
          h3 = e4.window === e4 ? e4 : (h3 = e4.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, n2 !== null && (J2 = Vb(n2), n2 !== J2 || n2.tag !== 5 && n2.tag !== 6))
              n2 = null;
          } else
            k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if (a2 === "pointerout" || a2 === "pointerover")
              t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = k3 == null ? h3 : ue(k3);
            u2 = n2 == null ? h3 : ue(n2);
            h3 = new t2(F2, w2 + "leave", k3, c2, e4);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e4) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c2, e4), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2)
              b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || x2 !== null && t2 === x2.alternate)
                    break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
            else
              t2 = null;
            k3 !== null && wf(g2, h3, k3, t2, false);
            n2 !== null && J2 !== null && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d2 ? ue(d2) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if (k3 === "select" || k3 === "input" && h3.type === "file")
          var na = ve;
        else if (me(h3))
          if (we)
            na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
        else
          (k3 = h3.nodeName) && k3.toLowerCase() === "input" && (h3.type === "checkbox" || h3.type === "radio") && (na = Ee);
        if (na && (na = na(a2, d2))) {
          ne(g2, na, c2, e4);
          break a;
        }
        xa && xa(a2, h3, d2);
        a2 === "focusout" && (xa = h3._wrapperState) && xa.controlled && h3.type === "number" && cb(h3, "number", h3.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a2) {
        case "focusin":
          if (me(xa) || xa.contentEditable === "true")
            Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c2, e4);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g2, c2, e4);
      }
      var $a;
      if (ae)
        b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a2, c2) && (ba = "onCompositionEnd") : a2 === "keydown" && c2.keyCode === 229 && (ba = "onCompositionStart");
      ba && (de && c2.locale !== "ko" && (ie || ba !== "onCompositionStart" ? ba === "onCompositionEnd" && ie && ($a = nd()) : (kd = e4, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e4), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), $a !== null && (ba.data = $a))));
      if ($a = ce ? je(a2, c2) : ke(a2, c2))
        d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e4 = new Ld("onBeforeInput", "beforeinput", null, c2, e4), g2.push({ event: e4, listeners: d2 }), e4.data = $a);
    }
    se(g2, b);
  });
}
function tf(a2, b, c2) {
  return { instance: a2, listener: b, currentTarget: c2 };
}
function oe(a2, b) {
  for (var c2 = b + "Capture", d = []; a2 !== null; ) {
    var e3 = a2, f2 = e3.stateNode;
    e3.tag === 5 && f2 !== null && (e3 = f2, f2 = Kb(a2, c2), f2 != null && d.unshift(tf(a2, f2, e3)), f2 = Kb(a2, b), f2 != null && d.push(tf(a2, f2, e3)));
    a2 = a2.return;
  }
  return d;
}
function vf(a2) {
  if (a2 === null)
    return null;
  do
    a2 = a2.return;
  while (a2 && a2.tag !== 5);
  return a2 ? a2 : null;
}
function wf(a2, b, c2, d, e3) {
  for (var f2 = b._reactName, g = []; c2 !== null && c2 !== d; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (k2 !== null && k2 === d)
      break;
    h2.tag === 5 && l2 !== null && (h2 = l2, e3 ? (k2 = Kb(c2, f2), k2 != null && g.unshift(tf(c2, k2, h2))) : e3 || (k2 = Kb(c2, f2), k2 != null && g.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  g.length !== 0 && a2.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return (typeof a2 === "string" ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b, c2) {
  b = zf(b);
  if (zf(a2) !== b && c2)
    throw Error(p$3(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b) {
  return a2 === "textarea" || a2 === "noscript" || typeof b.children === "string" || typeof b.children === "number" || typeof b.dangerouslySetInnerHTML === "object" && b.dangerouslySetInnerHTML !== null && b.dangerouslySetInnerHTML.__html != null;
}
var Ff = typeof setTimeout === "function" ? setTimeout : void 0, Gf = typeof clearTimeout === "function" ? clearTimeout : void 0, Hf = typeof Promise === "function" ? Promise : void 0, Jf = typeof queueMicrotask === "function" ? queueMicrotask : typeof Hf !== "undefined" ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b) {
  var c2 = b, d = 0;
  do {
    var e3 = c2.nextSibling;
    a2.removeChild(c2);
    if (e3 && e3.nodeType === 8)
      if (c2 = e3.data, c2 === "/$") {
        if (d === 0) {
          a2.removeChild(e3);
          bd(b);
          return;
        }
        d--;
      } else
        c2 !== "$" && c2 !== "$?" && c2 !== "$!" || d++;
    c2 = e3;
  } while (c2);
  bd(b);
}
function Lf(a2) {
  for (; a2 != null; a2 = a2.nextSibling) {
    var b = a2.nodeType;
    if (b === 1 || b === 3)
      break;
    if (b === 8) {
      b = a2.data;
      if (b === "$" || b === "$!" || b === "$?")
        break;
      if (b === "/$")
        return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b = 0; a2; ) {
    if (a2.nodeType === 8) {
      var c2 = a2.data;
      if (c2 === "$" || c2 === "$!" || c2 === "$?") {
        if (b === 0)
          return a2;
        b--;
      } else
        c2 === "/$" && b++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b = a2[Of];
  if (b)
    return b;
  for (var c2 = a2.parentNode; c2; ) {
    if (b = c2[uf] || c2[Of]) {
      c2 = b.alternate;
      if (b.child !== null || c2 !== null && c2.child !== null)
        for (a2 = Mf(a2); a2 !== null; ) {
          if (c2 = a2[Of])
            return c2;
          a2 = Mf(a2);
        }
      return b;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || a2.tag !== 5 && a2.tag !== 6 && a2.tag !== 13 && a2.tag !== 3 ? null : a2;
}
function ue(a2) {
  if (a2.tag === 5 || a2.tag === 6)
    return a2.stateNode;
  throw Error(p$3(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$1(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a2, b) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b) {
  var c2 = a2.type.contextTypes;
  if (!c2)
    return Vf;
  var d = a2.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e3 = {}, f2;
  for (f2 in c2)
    e3[f2] = b[f2];
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e3);
  return e3;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return a2 !== null && a2 !== void 0;
}
function $f() {
  E$1(Wf);
  E$1(H);
}
function ag(a2, b, c2) {
  if (H.current !== Vf)
    throw Error(p$3(168));
  G(H, b);
  G(Wf, c2);
}
function bg(a2, b, c2) {
  var d = a2.stateNode;
  b = b.childContextTypes;
  if (typeof d.getChildContext !== "function")
    return c2;
  d = d.getChildContext();
  for (var e3 in d)
    if (!(e3 in b))
      throw Error(p$3(108, Ra(a2) || "Unknown", e3));
  return A$1({}, c2, d);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a2);
  G(Wf, Wf.current);
  return true;
}
function dg(a2, b, c2) {
  var d = a2.stateNode;
  if (!d)
    throw Error(p$3(169));
  c2 ? (a2 = bg(a2, b, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E$1(Wf), E$1(H), G(H, a2)) : E$1(Wf);
  G(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  eg === null ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && eg !== null) {
    gg = true;
    var a2 = 0, b = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a2 < c2.length; a2++) {
        var d = c2[a2];
        do
          d = d(true);
        while (d !== null);
      }
      eg = null;
      fg = false;
    } catch (e3) {
      throw eg !== null && (eg = eg.slice(a2 + 1)), ac(fc, jg), e3;
    } finally {
      C$1 = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b;
}
function ug(a2, b, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d = rg;
  a2 = sg;
  var e3 = 32 - oc(d) - 1;
  d &= ~(1 << e3);
  c2 += 1;
  var f2 = 32 - oc(b) + e3;
  if (30 < f2) {
    var g = e3 - e3 % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e3 -= g;
    rg = 1 << 32 - oc(b) + e3 | c2 << e3 | d;
    sg = f2 + a2;
  } else
    rg = 1 << f2 | c2 << e3 | d, sg = a2;
}
function vg(a2) {
  a2.return !== null && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a2, b) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b;
  c2.return = a2;
  b = a2.deletions;
  b === null ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
}
function Cg(a2, b) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b = b.nodeType !== 1 || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return b !== null ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = a2.pendingProps === "" || b.nodeType !== 3 ? null : b, b !== null ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
    case 13:
      return b = b.nodeType !== 8 ? null : b, b !== null ? (c2 = qg !== null ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return (a2.mode & 1) !== 0 && (a2.flags & 128) === 0;
}
function Eg(a2) {
  if (I) {
    var b = yg;
    if (b) {
      var c2 = b;
      if (!Cg(a2, b)) {
        if (Dg(a2))
          throw Error(p$3(418));
        b = Lf(c2.nextSibling);
        var d = xg;
        b && Cg(a2, b) ? Ag(d, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
      }
    } else {
      if (Dg(a2))
        throw Error(p$3(418));
      a2.flags = a2.flags & -4097 | 2;
      I = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; a2 !== null && a2.tag !== 5 && a2.tag !== 3 && a2.tag !== 13; )
    a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg)
    return false;
  if (!I)
    return Fg(a2), I = true, false;
  var b;
  (b = a2.tag !== 3) && !(b = a2.tag !== 5) && (b = a2.type, b = b !== "head" && b !== "body" && !Ef(a2.type, a2.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a2))
      throw Hg(), Error(p$3(418));
    for (; b; )
      Ag(a2, b), b = Lf(b.nextSibling);
  }
  Fg(a2);
  if (a2.tag === 13) {
    a2 = a2.memoizedState;
    a2 = a2 !== null ? a2.dehydrated : null;
    if (!a2)
      throw Error(p$3(317));
    a: {
      a2 = a2.nextSibling;
      for (b = 0; a2; ) {
        if (a2.nodeType === 8) {
          var c2 = a2.data;
          if (c2 === "/$") {
            if (b === 0) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b--;
          } else
            c2 !== "$" && c2 !== "$!" && c2 !== "$?" || b++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; )
    a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a2) {
  zg === null ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b) {
  if (a2 && a2.defaultProps) {
    b = A$1({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      b[c2] === void 0 && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a2) {
  var b = Mg.current;
  E$1(Mg);
  a2._currentValue = b;
}
function Sg(a2, b, c2) {
  for (; a2 !== null; ) {
    var d = a2.alternate;
    (a2.childLanes & b) !== b ? (a2.childLanes |= b, d !== null && (d.childLanes |= b)) : d !== null && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a2 === c2)
      break;
    a2 = a2.return;
  }
}
function Tg(a2, b) {
  Ng = a2;
  Pg = Og = null;
  a2 = a2.dependencies;
  a2 !== null && a2.firstContext !== null && ((a2.lanes & b) !== 0 && (Ug = true), a2.firstContext = null);
}
function Vg(a2) {
  var b = a2._currentValue;
  if (Pg !== a2)
    if (a2 = { context: a2, memoizedValue: b, next: null }, Og === null) {
      if (Ng === null)
        throw Error(p$3(308));
      Og = a2;
      Ng.dependencies = { lanes: 0, firstContext: a2 };
    } else
      Og = Og.next = a2;
  return b;
}
var Wg = null;
function Xg(a2) {
  Wg === null ? Wg = [a2] : Wg.push(a2);
}
function Yg(a2, b, c2, d) {
  var e3 = b.interleaved;
  e3 === null ? (c2.next = c2, Xg(b)) : (c2.next = e3.next, e3.next = c2);
  b.interleaved = c2;
  return Zg(a2, d);
}
function Zg(a2, b) {
  a2.lanes |= b;
  var c2 = a2.alternate;
  c2 !== null && (c2.lanes |= b);
  c2 = a2;
  for (a2 = a2.return; a2 !== null; )
    a2.childLanes |= b, c2 = a2.alternate, c2 !== null && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
  return c2.tag === 3 ? c2.stateNode : null;
}
var $g = false;
function ah(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a2, b) {
  a2 = a2.updateQueue;
  b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function ch(a2, b) {
  return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function dh(a2, b, c2) {
  var d = a2.updateQueue;
  if (d === null)
    return null;
  d = d.shared;
  if ((K & 2) !== 0) {
    var e3 = d.pending;
    e3 === null ? b.next = b : (b.next = e3.next, e3.next = b);
    d.pending = b;
    return Zg(a2, c2);
  }
  e3 = d.interleaved;
  e3 === null ? (b.next = b, Xg(d)) : (b.next = e3.next, e3.next = b);
  d.interleaved = b;
  return Zg(a2, c2);
}
function eh(a2, b, c2) {
  b = b.updateQueue;
  if (b !== null && (b = b.shared, (c2 & 4194240) !== 0)) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
function fh(a2, b) {
  var c2 = a2.updateQueue, d = a2.alternate;
  if (d !== null && (d = d.updateQueue, c2 === d)) {
    var e3 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (c2 !== null) {
      do {
        var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        f2 === null ? e3 = f2 = g : f2 = f2.next = g;
        c2 = c2.next;
      } while (c2 !== null);
      f2 === null ? e3 = f2 = b : f2 = f2.next = b;
    } else
      e3 = f2 = b;
    c2 = { baseState: d.baseState, firstBaseUpdate: e3, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  a2 === null ? c2.firstBaseUpdate = b : a2.next = b;
  c2.lastBaseUpdate = b;
}
function gh(a2, b, c2, d) {
  var e3 = a2.updateQueue;
  $g = false;
  var f2 = e3.firstBaseUpdate, g = e3.lastBaseUpdate, h2 = e3.shared.pending;
  if (h2 !== null) {
    e3.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    g === null ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a2.alternate;
    m2 !== null && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g && (h2 === null ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (f2 !== null) {
    var q2 = e3.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d & r2) === r2) {
        m2 !== null && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h2;
          r2 = b;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if (typeof n2 === "function") {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = typeof n2 === "function" ? n2.call(y2, q2, r2) : n2;
              if (r2 === null || r2 === void 0)
                break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              $g = true;
          }
        }
        h2.callback !== null && h2.lane !== 0 && (a2.flags |= 64, r2 = e3.effects, r2 === null ? e3.effects = [h2] : r2.push(h2));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, m2 === null ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h2 = h2.next;
      if (h2 === null)
        if (h2 = e3.shared.pending, h2 === null)
          break;
        else
          r2 = h2, h2 = r2.next, r2.next = null, e3.lastBaseUpdate = r2, e3.shared.pending = null;
    } while (1);
    m2 === null && (k2 = q2);
    e3.baseState = k2;
    e3.firstBaseUpdate = l2;
    e3.lastBaseUpdate = m2;
    b = e3.shared.interleaved;
    if (b !== null) {
      e3 = b;
      do
        g |= e3.lane, e3 = e3.next;
      while (e3 !== b);
    } else
      f2 === null && (e3.shared.lanes = 0);
    hh |= g;
    a2.lanes = g;
    a2.memoizedState = q2;
  }
}
function ih(a2, b, c2) {
  a2 = b.effects;
  b.effects = null;
  if (a2 !== null)
    for (b = 0; b < a2.length; b++) {
      var d = a2[b], e3 = d.callback;
      if (e3 !== null) {
        d.callback = null;
        d = c2;
        if (typeof e3 !== "function")
          throw Error(p$3(191, e3));
        e3.call(d);
      }
    }
}
var jh = new aa.Component().refs;
function kh(a2, b, c2, d) {
  b = a2.memoizedState;
  c2 = c2(d, b);
  c2 = c2 === null || c2 === void 0 ? b : A$1({}, b, c2);
  a2.memoizedState = c2;
  a2.lanes === 0 && (a2.updateQueue.baseState = c2);
}
var nh = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = L(), e3 = lh(a2), f2 = ch(d, e3);
  f2.payload = b;
  c2 !== void 0 && c2 !== null && (f2.callback = c2);
  b = dh(a2, f2, e3);
  b !== null && (mh(b, a2, e3, d), eh(b, a2, e3));
}, enqueueReplaceState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = L(), e3 = lh(a2), f2 = ch(d, e3);
  f2.tag = 1;
  f2.payload = b;
  c2 !== void 0 && c2 !== null && (f2.callback = c2);
  b = dh(a2, f2, e3);
  b !== null && (mh(b, a2, e3, d), eh(b, a2, e3));
}, enqueueForceUpdate: function(a2, b) {
  a2 = a2._reactInternals;
  var c2 = L(), d = lh(a2), e3 = ch(c2, d);
  e3.tag = 2;
  b !== void 0 && b !== null && (e3.callback = b);
  b = dh(a2, e3, d);
  b !== null && (mh(b, a2, d, c2), eh(b, a2, d));
} };
function oh(a2, b, c2, d, e3, f2, g) {
  a2 = a2.stateNode;
  return typeof a2.shouldComponentUpdate === "function" ? a2.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c2, d) || !Ie(e3, f2) : true;
}
function ph(a2, b, c2) {
  var d = false, e3 = Vf;
  var f2 = b.contextType;
  typeof f2 === "object" && f2 !== null ? f2 = Vg(f2) : (e3 = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = d !== null && d !== void 0) ? Yf(a2, e3) : Vf);
  b = new b(c2, f2);
  a2.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
  b.updater = nh;
  a2.stateNode = b;
  b._reactInternals = a2;
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e3, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function qh(a2, b, c2, d) {
  a2 = b.state;
  typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c2, d);
  typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c2, d);
  b.state !== a2 && nh.enqueueReplaceState(b, b.state, null);
}
function rh(a2, b, c2, d) {
  var e3 = a2.stateNode;
  e3.props = c2;
  e3.state = a2.memoizedState;
  e3.refs = jh;
  ah(a2);
  var f2 = b.contextType;
  typeof f2 === "object" && f2 !== null ? e3.context = Vg(f2) : (f2 = Zf(b) ? Xf : H.current, e3.context = Yf(a2, f2));
  e3.state = a2.memoizedState;
  f2 = b.getDerivedStateFromProps;
  typeof f2 === "function" && (kh(a2, b, f2, c2), e3.state = a2.memoizedState);
  typeof b.getDerivedStateFromProps === "function" || typeof e3.getSnapshotBeforeUpdate === "function" || typeof e3.UNSAFE_componentWillMount !== "function" && typeof e3.componentWillMount !== "function" || (b = e3.state, typeof e3.componentWillMount === "function" && e3.componentWillMount(), typeof e3.UNSAFE_componentWillMount === "function" && e3.UNSAFE_componentWillMount(), b !== e3.state && nh.enqueueReplaceState(e3, e3.state, null), gh(a2, c2, e3, d), e3.state = a2.memoizedState);
  typeof e3.componentDidMount === "function" && (a2.flags |= 4194308);
}
function sh(a2, b, c2) {
  a2 = c2.ref;
  if (a2 !== null && typeof a2 !== "function" && typeof a2 !== "object") {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (c2.tag !== 1)
          throw Error(p$3(309));
        var d = c2.stateNode;
      }
      if (!d)
        throw Error(p$3(147, a2));
      var e3 = d, f2 = "" + a2;
      if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === f2)
        return b.ref;
      b = function(a3) {
        var b2 = e3.refs;
        b2 === jh && (b2 = e3.refs = {});
        a3 === null ? delete b2[f2] : b2[f2] = a3;
      };
      b._stringRef = f2;
      return b;
    }
    if (typeof a2 !== "string")
      throw Error(p$3(284));
    if (!c2._owner)
      throw Error(p$3(290, a2));
  }
  return a2;
}
function th(a2, b) {
  a2 = Object.prototype.toString.call(b);
  throw Error(p$3(31, a2 === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
}
function uh(a2) {
  var b = a2._init;
  return b(a2._payload);
}
function vh(a2) {
  function b(b2, c3) {
    if (a2) {
      var d2 = b2.deletions;
      d2 === null ? (b2.deletions = [c3], b2.flags |= 16) : d2.push(c3);
    }
  }
  function c2(c3, d2) {
    if (!a2)
      return null;
    for (; d2 !== null; )
      b(c3, d2), d2 = d2.sibling;
    return null;
  }
  function d(a3, b2) {
    for (a3 = /* @__PURE__ */ new Map(); b2 !== null; )
      b2.key !== null ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
    return a3;
  }
  function e3(a3, b2) {
    a3 = wh(a3, b2);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b2, c3, d2) {
    b2.index = d2;
    if (!a2)
      return b2.flags |= 1048576, c3;
    d2 = b2.alternate;
    if (d2 !== null)
      return d2 = d2.index, d2 < c3 ? (b2.flags |= 2, c3) : d2;
    b2.flags |= 2;
    return c3;
  }
  function g(b2) {
    a2 && b2.alternate === null && (b2.flags |= 2);
    return b2;
  }
  function h2(a3, b2, c3, d2) {
    if (b2 === null || b2.tag !== 6)
      return b2 = xh(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e3(b2, c3);
    b2.return = a3;
    return b2;
  }
  function k2(a3, b2, c3, d2) {
    var f3 = c3.type;
    if (f3 === ya)
      return m2(a3, b2, c3.props.children, d2, c3.key);
    if (b2 !== null && (b2.elementType === f3 || typeof f3 === "object" && f3 !== null && f3.$$typeof === Ha && uh(f3) === b2.type))
      return d2 = e3(b2, c3.props), d2.ref = sh(a3, b2, c3), d2.return = a3, d2;
    d2 = yh(c3.type, c3.key, c3.props, null, a3.mode, d2);
    d2.ref = sh(a3, b2, c3);
    d2.return = a3;
    return d2;
  }
  function l2(a3, b2, c3, d2) {
    if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation)
      return b2 = zh(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e3(b2, c3.children || []);
    b2.return = a3;
    return b2;
  }
  function m2(a3, b2, c3, d2, f3) {
    if (b2 === null || b2.tag !== 7)
      return b2 = Ah(c3, a3.mode, d2, f3), b2.return = a3, b2;
    b2 = e3(b2, c3);
    b2.return = a3;
    return b2;
  }
  function q2(a3, b2, c3) {
    if (typeof b2 === "string" && b2 !== "" || typeof b2 === "number")
      return b2 = xh("" + b2, a3.mode, c3), b2.return = a3, b2;
    if (typeof b2 === "object" && b2 !== null) {
      switch (b2.$$typeof) {
        case va:
          return c3 = yh(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = sh(a3, null, b2), c3.return = a3, c3;
        case wa:
          return b2 = zh(b2, a3.mode, c3), b2.return = a3, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a3, d2(b2._payload), c3);
      }
      if (eb(b2) || Ka(b2))
        return b2 = Ah(b2, a3.mode, c3, null), b2.return = a3, b2;
      th(a3, b2);
    }
    return null;
  }
  function r2(a3, b2, c3, d2) {
    var e4 = b2 !== null ? b2.key : null;
    if (typeof c3 === "string" && c3 !== "" || typeof c3 === "number")
      return e4 !== null ? null : h2(a3, b2, "" + c3, d2);
    if (typeof c3 === "object" && c3 !== null) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e4 ? k2(a3, b2, c3, d2) : null;
        case wa:
          return c3.key === e4 ? l2(a3, b2, c3, d2) : null;
        case Ha:
          return e4 = c3._init, r2(a3, b2, e4(c3._payload), d2);
      }
      if (eb(c3) || Ka(c3))
        return e4 !== null ? null : m2(a3, b2, c3, d2, null);
      th(a3, c3);
    }
    return null;
  }
  function y2(a3, b2, c3, d2, e4) {
    if (typeof d2 === "string" && d2 !== "" || typeof d2 === "number")
      return a3 = a3.get(c3) || null, h2(b2, a3, "" + d2, e4);
    if (typeof d2 === "object" && d2 !== null) {
      switch (d2.$$typeof) {
        case va:
          return a3 = a3.get(d2.key === null ? c3 : d2.key) || null, k2(b2, a3, d2, e4);
        case wa:
          return a3 = a3.get(d2.key === null ? c3 : d2.key) || null, l2(b2, a3, d2, e4);
        case Ha:
          var f3 = d2._init;
          return y2(a3, b2, c3, f3(d2._payload), e4);
      }
      if (eb(d2) || Ka(d2))
        return a3 = a3.get(c3) || null, m2(b2, a3, d2, e4, null);
      th(b2, d2);
    }
    return null;
  }
  function n2(e4, g2, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; u2 !== null && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e4, u2, h3[w2], k3);
      if (n3 === null) {
        u2 === null && (u2 = x2);
        break;
      }
      a2 && u2 && n3.alternate === null && b(e4, u2);
      g2 = f2(n3, g2, w2);
      m3 === null ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length)
      return c2(e4, u2), I && tg(e4, w2), l3;
    if (u2 === null) {
      for (; w2 < h3.length; w2++)
        u2 = q2(e4, h3[w2], k3), u2 !== null && (g2 = f2(u2, g2, w2), m3 === null ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e4, w2);
      return l3;
    }
    for (u2 = d(e4, u2); w2 < h3.length; w2++)
      x2 = y2(u2, e4, w2, h3[w2], k3), x2 !== null && (a2 && x2.alternate !== null && u2.delete(x2.key === null ? w2 : x2.key), g2 = f2(x2, g2, w2), m3 === null ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b(e4, a3);
    });
    I && tg(e4, w2);
    return l3;
  }
  function t2(e4, g2, h3, k3) {
    var l3 = Ka(h3);
    if (typeof l3 !== "function")
      throw Error(p$3(150));
    h3 = l3.call(h3);
    if (h3 == null)
      throw Error(p$3(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h3.next(); m3 !== null && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e4, m3, n3.value, k3);
      if (t3 === null) {
        m3 === null && (m3 = x2);
        break;
      }
      a2 && m3 && t3.alternate === null && b(e4, m3);
      g2 = f2(t3, g2, w2);
      u2 === null ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done)
      return c2(e4, m3), I && tg(e4, w2), l3;
    if (m3 === null) {
      for (; !n3.done; w2++, n3 = h3.next())
        n3 = q2(e4, n3.value, k3), n3 !== null && (g2 = f2(n3, g2, w2), u2 === null ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e4, w2);
      return l3;
    }
    for (m3 = d(e4, m3); !n3.done; w2++, n3 = h3.next())
      n3 = y2(m3, e4, w2, n3.value, k3), n3 !== null && (a2 && n3.alternate !== null && m3.delete(n3.key === null ? w2 : n3.key), g2 = f2(n3, g2, w2), u2 === null ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b(e4, a3);
    });
    I && tg(e4, w2);
    return l3;
  }
  function J2(a3, d2, f3, h3) {
    typeof f3 === "object" && f3 !== null && f3.type === ya && f3.key === null && (f3 = f3.props.children);
    if (typeof f3 === "object" && f3 !== null) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; l3 !== null; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (l3.tag === 7) {
                    c2(a3, l3.sibling);
                    d2 = e3(l3, f3.props.children);
                    d2.return = a3;
                    a3 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || typeof k3 === "object" && k3 !== null && k3.$$typeof === Ha && uh(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d2 = e3(l3, f3.props);
                  d2.ref = sh(a3, l3, f3);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                }
                c2(a3, l3);
                break;
              } else
                b(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Ah(f3.props.children, a3.mode, h3, f3.key), d2.return = a3, a3 = d2) : (h3 = yh(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = sh(a3, d2, f3), h3.return = a3, a3 = h3);
          }
          return g(a3);
        case wa:
          a: {
            for (l3 = f3.key; d2 !== null; ) {
              if (d2.key === l3)
                if (d2.tag === 4 && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c2(a3, d2.sibling);
                  d2 = e3(d2, f3.children || []);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                } else {
                  c2(a3, d2);
                  break;
                }
              else
                b(a3, d2);
              d2 = d2.sibling;
            }
            d2 = zh(f3, a3.mode, h3);
            d2.return = a3;
            a3 = d2;
          }
          return g(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d2, l3(f3._payload), h3);
      }
      if (eb(f3))
        return n2(a3, d2, f3, h3);
      if (Ka(f3))
        return t2(a3, d2, f3, h3);
      th(a3, f3);
    }
    return typeof f3 === "string" && f3 !== "" || typeof f3 === "number" ? (f3 = "" + f3, d2 !== null && d2.tag === 6 ? (c2(a3, d2.sibling), d2 = e3(d2, f3), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = xh(f3, a3.mode, h3), d2.return = a3, a3 = d2), g(a3)) : c2(a3, d2);
  }
  return J2;
}
var Bh = vh(true), Ch = vh(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a2) {
  if (a2 === Dh)
    throw Error(p$3(174));
  return a2;
}
function Ih(a2, b) {
  G(Gh, b);
  G(Fh, a2);
  G(Eh, Dh);
  a2 = b.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a2 = a2 === 8 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
  }
  E$1(Eh);
  G(Eh, b);
}
function Jh() {
  E$1(Eh);
  E$1(Fh);
  E$1(Gh);
}
function Kh(a2) {
  Hh(Gh.current);
  var b = Hh(Eh.current);
  var c2 = lb(b, a2.type);
  b !== c2 && (G(Fh, a2), G(Eh, c2));
}
function Lh(a2) {
  Fh.current === a2 && (E$1(Eh), E$1(Fh));
}
var M = Uf(0);
function Mh(a2) {
  for (var b = a2; b !== null; ) {
    if (b.tag === 13) {
      var c2 = b.memoizedState;
      if (c2 !== null && (c2 = c2.dehydrated, c2 === null || c2.data === "$?" || c2.data === "$!"))
        return b;
    } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
      if ((b.flags & 128) !== 0)
        return b;
    } else if (b.child !== null) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a2)
      break;
    for (; b.sibling === null; ) {
      if (b.return === null || b.return === a2)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a2 = 0; a2 < Nh.length; a2++)
    Nh[a2]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N = null, O = null, P = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q() {
  throw Error(p$3(321));
}
function Wh(a2, b) {
  if (b === null)
    return false;
  for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++)
    if (!He(a2[c2], b[c2]))
      return false;
  return true;
}
function Xh(a2, b, c2, d, e3, f2) {
  Rh = f2;
  N = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Ph.current = a2 === null || a2.memoizedState === null ? Yh : Zh;
  a2 = c2(d, e3);
  if (Th) {
    f2 = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f2)
        throw Error(p$3(301));
      f2 += 1;
      P = O = null;
      b.updateQueue = null;
      Ph.current = $h;
      a2 = c2(d, e3);
    } while (Th);
  }
  Ph.current = ai;
  b = O !== null && O.next !== null;
  Rh = 0;
  P = O = N = null;
  Sh = false;
  if (b)
    throw Error(p$3(300));
  return a2;
}
function bi() {
  var a2 = Uh !== 0;
  Uh = 0;
  return a2;
}
function ci() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  P === null ? N.memoizedState = P = a2 : P = P.next = a2;
  return P;
}
function di() {
  if (O === null) {
    var a2 = N.alternate;
    a2 = a2 !== null ? a2.memoizedState : null;
  } else
    a2 = O.next;
  var b = P === null ? N.memoizedState : P.next;
  if (b !== null)
    P = b, O = a2;
  else {
    if (a2 === null)
      throw Error(p$3(310));
    O = a2;
    a2 = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
    P === null ? N.memoizedState = P = a2 : P = P.next = a2;
  }
  return P;
}
function ei(a2, b) {
  return typeof b === "function" ? b(a2) : b;
}
function fi(a2) {
  var b = di(), c2 = b.queue;
  if (c2 === null)
    throw Error(p$3(311));
  c2.lastRenderedReducer = a2;
  var d = O, e3 = d.baseQueue, f2 = c2.pending;
  if (f2 !== null) {
    if (e3 !== null) {
      var g = e3.next;
      e3.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e3 = f2;
    c2.pending = null;
  }
  if (e3 !== null) {
    f2 = e3.next;
    d = d.baseState;
    var h2 = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Rh & m2) === m2)
        k2 !== null && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a2(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        k2 === null ? (h2 = k2 = q2, g = d) : k2 = k2.next = q2;
        N.lanes |= m2;
        hh |= m2;
      }
      l2 = l2.next;
    } while (l2 !== null && l2 !== f2);
    k2 === null ? g = d : k2.next = h2;
    He(d, b.memoizedState) || (Ug = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c2.lastRenderedState = d;
  }
  a2 = c2.interleaved;
  if (a2 !== null) {
    e3 = a2;
    do
      f2 = e3.lane, N.lanes |= f2, hh |= f2, e3 = e3.next;
    while (e3 !== a2);
  } else
    e3 === null && (c2.lanes = 0);
  return [b.memoizedState, c2.dispatch];
}
function gi(a2) {
  var b = di(), c2 = b.queue;
  if (c2 === null)
    throw Error(p$3(311));
  c2.lastRenderedReducer = a2;
  var d = c2.dispatch, e3 = c2.pending, f2 = b.memoizedState;
  if (e3 !== null) {
    c2.pending = null;
    var g = e3 = e3.next;
    do
      f2 = a2(f2, g.action), g = g.next;
    while (g !== e3);
    He(f2, b.memoizedState) || (Ug = true);
    b.memoizedState = f2;
    b.baseQueue === null && (b.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d];
}
function hi() {
}
function ii(a2, b) {
  var c2 = N, d = di(), e3 = b(), f2 = !He(d.memoizedState, e3);
  f2 && (d.memoizedState = e3, Ug = true);
  d = d.queue;
  ji(ki.bind(null, c2, d, a2), [a2]);
  if (d.getSnapshot !== b || f2 || P !== null && P.memoizedState.tag & 1) {
    c2.flags |= 2048;
    li(9, mi.bind(null, c2, d, e3, b), void 0, null);
    if (R === null)
      throw Error(p$3(349));
    (Rh & 30) !== 0 || ni(c2, b, e3);
  }
  return e3;
}
function ni(a2, b, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b, value: c2 };
  b = N.updateQueue;
  b === null ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, c2 === null ? b.stores = [a2] : c2.push(a2));
}
function mi(a2, b, c2, d) {
  b.value = c2;
  b.getSnapshot = d;
  oi(b) && pi$3(a2);
}
function ki(a2, b, c2) {
  return c2(function() {
    oi(b) && pi$3(a2);
  });
}
function oi(a2) {
  var b = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b();
    return !He(a2, c2);
  } catch (d) {
    return true;
  }
}
function pi$3(a2) {
  var b = Zg(a2, 1);
  b !== null && mh(b, a2, 1, -1);
}
function qi(a2) {
  var b = ci();
  typeof a2 === "function" && (a2 = a2());
  b.memoizedState = b.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a2 };
  b.queue = a2;
  a2 = a2.dispatch = ri.bind(null, N, a2);
  return [b.memoizedState, a2];
}
function li(a2, b, c2, d) {
  a2 = { tag: a2, create: b, destroy: c2, deps: d, next: null };
  b = N.updateQueue;
  b === null ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, c2 === null ? b.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b.lastEffect = a2));
  return a2;
}
function si() {
  return di().memoizedState;
}
function ti(a2, b, c2, d) {
  var e3 = ci();
  N.flags |= a2;
  e3.memoizedState = li(1 | b, c2, void 0, d === void 0 ? null : d);
}
function ui(a2, b, c2, d) {
  var e3 = di();
  d = d === void 0 ? null : d;
  var f2 = void 0;
  if (O !== null) {
    var g = O.memoizedState;
    f2 = g.destroy;
    if (d !== null && Wh(d, g.deps)) {
      e3.memoizedState = li(b, c2, f2, d);
      return;
    }
  }
  N.flags |= a2;
  e3.memoizedState = li(1 | b, c2, f2, d);
}
function vi(a2, b) {
  return ti(8390656, 8, a2, b);
}
function ji(a2, b) {
  return ui(2048, 8, a2, b);
}
function wi(a2, b) {
  return ui(4, 2, a2, b);
}
function xi(a2, b) {
  return ui(4, 4, a2, b);
}
function yi(a2, b) {
  if (typeof b === "function")
    return a2 = a2(), b(a2), function() {
      b(null);
    };
  if (b !== null && b !== void 0)
    return a2 = a2(), b.current = a2, function() {
      b.current = null;
    };
}
function zi(a2, b, c2) {
  c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
  return ui(4, 4, yi.bind(null, b, a2), c2);
}
function Ai() {
}
function Bi(a2, b) {
  var c2 = di();
  b = b === void 0 ? null : b;
  var d = c2.memoizedState;
  if (d !== null && b !== null && Wh(b, d[1]))
    return d[0];
  c2.memoizedState = [a2, b];
  return a2;
}
function Ci(a2, b) {
  var c2 = di();
  b = b === void 0 ? null : b;
  var d = c2.memoizedState;
  if (d !== null && b !== null && Wh(b, d[1]))
    return d[0];
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}
function Di(a2, b, c2) {
  if ((Rh & 21) === 0)
    return a2.baseState && (a2.baseState = false, Ug = true), a2.memoizedState = c2;
  He(c2, b) || (c2 = yc(), N.lanes |= c2, hh |= c2, a2.baseState = true);
  return b;
}
function Ei(a2, b) {
  var c2 = C$1;
  C$1 = c2 !== 0 && 4 > c2 ? c2 : 4;
  a2(true);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a2(false), b();
  } finally {
    C$1 = c2, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a2, b, c2) {
  var d = lh(a2);
  c2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b, c2);
  else if (c2 = Yg(a2, b, c2, d), c2 !== null) {
    var e3 = L();
    mh(c2, a2, d, e3);
    Ji(c2, b, d);
  }
}
function ri(a2, b, c2) {
  var d = lh(a2), e3 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a2))
    Ii(b, e3);
  else {
    var f2 = a2.alternate;
    if (a2.lanes === 0 && (f2 === null || f2.lanes === 0) && (f2 = b.lastRenderedReducer, f2 !== null))
      try {
        var g = b.lastRenderedState, h2 = f2(g, c2);
        e3.hasEagerState = true;
        e3.eagerState = h2;
        if (He(h2, g)) {
          var k2 = b.interleaved;
          k2 === null ? (e3.next = e3, Xg(b)) : (e3.next = k2.next, k2.next = e3);
          b.interleaved = e3;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c2 = Yg(a2, b, e3, d);
    c2 !== null && (e3 = L(), mh(c2, a2, d, e3), Ji(c2, b, d));
  }
}
function Hi(a2) {
  var b = a2.alternate;
  return a2 === N || b !== null && b === N;
}
function Ii(a2, b) {
  Th = Sh = true;
  var c2 = a2.pending;
  c2 === null ? b.next = b : (b.next = c2.next, c2.next = b);
  a2.pending = b;
}
function Ji(a2, b, c2) {
  if ((c2 & 4194240) !== 0) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a2, b) {
  ci().memoizedState = [a2, b === void 0 ? null : b];
  return a2;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a2, b, c2) {
  c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
  return ti(4194308, 4, yi.bind(null, b, a2), c2);
}, useLayoutEffect: function(a2, b) {
  return ti(4194308, 4, a2, b);
}, useInsertionEffect: function(a2, b) {
  return ti(4, 2, a2, b);
}, useMemo: function(a2, b) {
  var c2 = ci();
  b = b === void 0 ? null : b;
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}, useReducer: function(a2, b, c2) {
  var d = ci();
  b = c2 !== void 0 ? c2(b) : b;
  d.memoizedState = d.baseState = b;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
  d.queue = a2;
  a2 = a2.dispatch = Gi.bind(null, N, a2);
  return [d.memoizedState, a2];
}, useRef: function(a2) {
  var b = ci();
  a2 = { current: a2 };
  return b.memoizedState = a2;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a2) {
  return ci().memoizedState = a2;
}, useTransition: function() {
  var a2 = qi(false), b = a2[0];
  a2 = Ei.bind(null, a2[1]);
  ci().memoizedState = a2;
  return [b, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b, c2) {
  var d = N, e3 = ci();
  if (I) {
    if (c2 === void 0)
      throw Error(p$3(407));
    c2 = c2();
  } else {
    c2 = b();
    if (R === null)
      throw Error(p$3(349));
    (Rh & 30) !== 0 || ni(d, b, c2);
  }
  e3.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b };
  e3.queue = f2;
  vi(ki.bind(null, d, f2, a2), [a2]);
  d.flags |= 2048;
  li(9, mi.bind(null, d, f2, c2, b), void 0, null);
  return c2;
}, useId: function() {
  var a2 = ci(), b = R.identifierPrefix;
  if (I) {
    var c2 = sg;
    var d = rg;
    c2 = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c2;
    b = ":" + b + "R" + c2;
    c2 = Uh++;
    0 < c2 && (b += "H" + c2.toString(32));
    b += ":";
  } else
    c2 = Vh++, b = ":" + b + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a2) {
    var b = di();
    return Di(b, O.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = fi(ei)[0], b = di().memoizedState;
    return [a2, b];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a2) {
  var b = di();
  return O === null ? b.memoizedState = a2 : Di(b, O.memoizedState, a2);
}, useTransition: function() {
  var a2 = gi(ei)[0], b = di().memoizedState;
  return [a2, b];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a2, b) {
  try {
    var c2 = "", d = b;
    do
      c2 += Pa(d), d = d.return;
    while (d);
    var e3 = c2;
  } catch (f2) {
    e3 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b, stack: e3, digest: null };
}
function Li(a2, b, c2) {
  return { value: a2, source: null, stack: c2 != null ? c2 : null, digest: b != null ? b : null };
}
function Mi(a2, b) {
  try {
    console.error(b.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Ni = typeof WeakMap === "function" ? WeakMap : Map;
function Oi(a2, b, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d = b.value;
  c2.callback = function() {
    Pi || (Pi = true, Qi = d);
    Mi(a2, b);
  };
  return c2;
}
function Ri(a2, b, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  var d = a2.type.getDerivedStateFromError;
  if (typeof d === "function") {
    var e3 = b.value;
    c2.payload = function() {
      return d(e3);
    };
    c2.callback = function() {
      Mi(a2, b);
    };
  }
  var f2 = a2.stateNode;
  f2 !== null && typeof f2.componentDidCatch === "function" && (c2.callback = function() {
    Mi(a2, b);
    typeof d !== "function" && (Si === null ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c3 = b.stack;
    this.componentDidCatch(b.value, { componentStack: c3 !== null ? c3 : "" });
  });
  return c2;
}
function Ti(a2, b, c2) {
  var d = a2.pingCache;
  if (d === null) {
    d = a2.pingCache = new Ni();
    var e3 = /* @__PURE__ */ new Set();
    d.set(b, e3);
  } else
    e3 = d.get(b), e3 === void 0 && (e3 = /* @__PURE__ */ new Set(), d.set(b, e3));
  e3.has(c2) || (e3.add(c2), a2 = Ui.bind(null, a2, b, c2), b.then(a2, a2));
}
function Vi(a2) {
  do {
    var b;
    if (b = a2.tag === 13)
      b = a2.memoizedState, b = b !== null ? b.dehydrated !== null ? true : false : true;
    if (b)
      return a2;
    a2 = a2.return;
  } while (a2 !== null);
  return null;
}
function Wi(a2, b, c2, d, e3) {
  if ((a2.mode & 1) === 0)
    return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, c2.tag === 1 && (c2.alternate === null ? c2.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c2, b, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e3;
  return a2;
}
var Xi = ua.ReactCurrentOwner, Ug = false;
function Yi(a2, b, c2, d) {
  b.child = a2 === null ? Ch(b, null, c2, d) : Bh(b, a2.child, c2, d);
}
function Zi(a2, b, c2, d, e3) {
  c2 = c2.render;
  var f2 = b.ref;
  Tg(b, e3);
  d = Xh(a2, b, c2, d, f2, e3);
  c2 = bi();
  if (a2 !== null && !Ug)
    return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e3, $i(a2, b, e3);
  I && c2 && vg(b);
  b.flags |= 1;
  Yi(a2, b, d, e3);
  return b.child;
}
function aj(a2, b, c2, d, e3) {
  if (a2 === null) {
    var f2 = c2.type;
    if (typeof f2 === "function" && !bj(f2) && f2.defaultProps === void 0 && c2.compare === null && c2.defaultProps === void 0)
      return b.tag = 15, b.type = f2, cj(a2, b, f2, d, e3);
    a2 = yh(c2.type, null, d, b, b.mode, e3);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  f2 = a2.child;
  if ((a2.lanes & e3) === 0) {
    var g = f2.memoizedProps;
    c2 = c2.compare;
    c2 = c2 !== null ? c2 : Ie;
    if (c2(g, d) && a2.ref === b.ref)
      return $i(a2, b, e3);
  }
  b.flags |= 1;
  a2 = wh(f2, d);
  a2.ref = b.ref;
  a2.return = b;
  return b.child = a2;
}
function cj(a2, b, c2, d, e3) {
  if (a2 !== null) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d) && a2.ref === b.ref)
      if (Ug = false, b.pendingProps = d = f2, (a2.lanes & e3) !== 0)
        (a2.flags & 131072) !== 0 && (Ug = true);
      else
        return b.lanes = a2.lanes, $i(a2, b, e3);
  }
  return dj(a2, b, c2, d, e3);
}
function ej(a2, b, c2) {
  var d = b.pendingProps, e3 = d.children, f2 = a2 !== null ? a2.memoizedState : null;
  if (d.mode === "hidden")
    if ((b.mode & 1) === 0)
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c2;
    else {
      if ((c2 & 1073741824) === 0)
        return a2 = f2 !== null ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(fj, gj), gj |= a2, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = f2 !== null ? f2.baseLanes : c2;
      G(fj, gj);
      gj |= d;
    }
  else
    f2 !== null ? (d = f2.baseLanes | c2, b.memoizedState = null) : d = c2, G(fj, gj), gj |= d;
  Yi(a2, b, e3, c2);
  return b.child;
}
function hj(a2, b) {
  var c2 = b.ref;
  if (a2 === null && c2 !== null || a2 !== null && a2.ref !== c2)
    b.flags |= 512, b.flags |= 2097152;
}
function dj(a2, b, c2, d, e3) {
  var f2 = Zf(c2) ? Xf : H.current;
  f2 = Yf(b, f2);
  Tg(b, e3);
  c2 = Xh(a2, b, c2, d, f2, e3);
  d = bi();
  if (a2 !== null && !Ug)
    return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e3, $i(a2, b, e3);
  I && d && vg(b);
  b.flags |= 1;
  Yi(a2, b, c2, e3);
  return b.child;
}
function ij(a2, b, c2, d, e3) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b);
  } else
    f2 = false;
  Tg(b, e3);
  if (b.stateNode === null)
    jj(a2, b), ph(b, c2, d), rh(b, c2, d, e3), d = true;
  else if (a2 === null) {
    var g = b.stateNode, h2 = b.memoizedProps;
    g.props = h2;
    var k2 = g.context, l2 = c2.contextType;
    typeof l2 === "object" && l2 !== null ? l2 = Vg(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = typeof m2 === "function" || typeof g.getSnapshotBeforeUpdate === "function";
    q2 || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h2 !== d || k2 !== l2) && qh(b, g, d, l2);
    $g = false;
    var r2 = b.memoizedState;
    g.state = r2;
    gh(b, d, g, e3);
    k2 = b.memoizedState;
    h2 !== d || r2 !== k2 || Wf.current || $g ? (typeof m2 === "function" && (kh(b, c2, m2, d), k2 = b.memoizedState), (h2 = $g || oh(b, c2, h2, d, r2, k2, l2)) ? (q2 || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b.flags |= 4194308)) : (typeof g.componentDidMount === "function" && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h2) : (typeof g.componentDidMount === "function" && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    bh(a2, b);
    h2 = b.memoizedProps;
    l2 = b.type === b.elementType ? h2 : Lg(b.type, h2);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c2.contextType;
    typeof k2 === "object" && k2 !== null ? k2 = Vg(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = typeof y2 === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h2 !== q2 || r2 !== k2) && qh(b, g, d, k2);
    $g = false;
    r2 = b.memoizedState;
    g.state = r2;
    gh(b, d, g, e3);
    var n2 = b.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || $g ? (typeof y2 === "function" && (kh(b, c2, y2, d), n2 = b.memoizedState), (l2 = $g || oh(b, c2, l2, d, r2, n2, k2) || false) ? (m2 || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, n2, k2), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, n2, k2)), typeof g.componentDidUpdate === "function" && (b.flags |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b.flags |= 1024)) : (typeof g.componentDidUpdate !== "function" || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : (typeof g.componentDidUpdate !== "function" || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d = false);
  }
  return kj(a2, b, c2, d, f2, e3);
}
function kj(a2, b, c2, d, e3, f2) {
  hj(a2, b);
  var g = (b.flags & 128) !== 0;
  if (!d && !g)
    return e3 && dg(b, c2, false), $i(a2, b, f2);
  d = b.stateNode;
  Xi.current = b;
  var h2 = g && typeof c2.getDerivedStateFromError !== "function" ? null : d.render();
  b.flags |= 1;
  a2 !== null && g ? (b.child = Bh(b, a2.child, null, f2), b.child = Bh(b, null, h2, f2)) : Yi(a2, b, h2, f2);
  b.memoizedState = d.state;
  e3 && dg(b, c2, true);
  return b.child;
}
function lj(a2) {
  var b = a2.stateNode;
  b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
  Ih(a2, b.containerInfo);
}
function mj(a2, b, c2, d, e3) {
  Ig();
  Jg(e3);
  b.flags |= 256;
  Yi(a2, b, c2, d);
  return b.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function pj(a2, b, c2) {
  var d = b.pendingProps, e3 = M.current, f2 = false, g = (b.flags & 128) !== 0, h2;
  (h2 = g) || (h2 = a2 !== null && a2.memoizedState === null ? false : (e3 & 2) !== 0);
  if (h2)
    f2 = true, b.flags &= -129;
  else if (a2 === null || a2.memoizedState !== null)
    e3 |= 1;
  G(M, e3 & 1);
  if (a2 === null) {
    Eg(b);
    a2 = b.memoizedState;
    if (a2 !== null && (a2 = a2.dehydrated, a2 !== null))
      return (b.mode & 1) === 0 ? b.lanes = 1 : a2.data === "$!" ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a2 = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, (d & 1) === 0 && f2 !== null ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = qj(g, d, 0, null), a2 = Ah(a2, d, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = oj(c2), b.memoizedState = nj, a2) : rj(b, g);
  }
  e3 = a2.memoizedState;
  if (e3 !== null && (h2 = e3.dehydrated, h2 !== null))
    return sj(a2, b, g, d, h2, e3, c2);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e3 = a2.child;
    h2 = e3.sibling;
    var k2 = { mode: "hidden", children: d.children };
    (g & 1) === 0 && b.child !== e3 ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = wh(e3, k2), d.subtreeFlags = e3.subtreeFlags & 14680064);
    h2 !== null ? f2 = wh(h2, f2) : (f2 = Ah(f2, g, c2, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a2.child.memoizedState;
    g = g === null ? oj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a2.childLanes & ~c2;
    b.memoizedState = nj;
    return d;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d = wh(f2, { mode: "visible", children: d.children });
  (b.mode & 1) === 0 && (d.lanes = c2);
  d.return = b;
  d.sibling = null;
  a2 !== null && (c2 = b.deletions, c2 === null ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function rj(a2, b) {
  b = qj({ mode: "visible", children: b }, a2.mode, 0, null);
  b.return = a2;
  return a2.child = b;
}
function tj(a2, b, c2, d) {
  d !== null && Jg(d);
  Bh(b, a2.child, null, c2);
  a2 = rj(b, b.pendingProps.children);
  a2.flags |= 2;
  b.memoizedState = null;
  return a2;
}
function sj(a2, b, c2, d, e3, f2, g) {
  if (c2) {
    if (b.flags & 256)
      return b.flags &= -257, d = Li(Error(p$3(422))), tj(a2, b, g, d);
    if (b.memoizedState !== null)
      return b.child = a2.child, b.flags |= 128, null;
    f2 = d.fallback;
    e3 = b.mode;
    d = qj({ mode: "visible", children: d.children }, e3, 0, null);
    f2 = Ah(f2, e3, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    (b.mode & 1) !== 0 && Bh(b, a2.child, null, g);
    b.child.memoizedState = oj(g);
    b.memoizedState = nj;
    return f2;
  }
  if ((b.mode & 1) === 0)
    return tj(a2, b, g, null);
  if (e3.data === "$!") {
    d = e3.nextSibling && e3.nextSibling.dataset;
    if (d)
      var h2 = d.dgst;
    d = h2;
    f2 = Error(p$3(419));
    d = Li(f2, d, void 0);
    return tj(a2, b, g, d);
  }
  h2 = (g & a2.childLanes) !== 0;
  if (Ug || h2) {
    d = R;
    if (d !== null) {
      switch (g & -g) {
        case 4:
          e3 = 2;
          break;
        case 16:
          e3 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e3 = 32;
          break;
        case 536870912:
          e3 = 268435456;
          break;
        default:
          e3 = 0;
      }
      e3 = (e3 & (d.suspendedLanes | g)) !== 0 ? 0 : e3;
      e3 !== 0 && e3 !== f2.retryLane && (f2.retryLane = e3, Zg(a2, e3), mh(d, a2, e3, -1));
    }
    uj();
    d = Li(Error(p$3(421)));
    return tj(a2, b, g, d);
  }
  if (e3.data === "$?")
    return b.flags |= 128, b.child = a2.child, b = vj.bind(null, a2), e3._reactRetry = b, null;
  a2 = f2.treeContext;
  yg = Lf(e3.nextSibling);
  xg = b;
  I = true;
  zg = null;
  a2 !== null && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
  b = rj(b, d.children);
  b.flags |= 4096;
  return b;
}
function wj(a2, b, c2) {
  a2.lanes |= b;
  var d = a2.alternate;
  d !== null && (d.lanes |= b);
  Sg(a2.return, b, c2);
}
function xj(a2, b, c2, d, e3) {
  var f2 = a2.memoizedState;
  f2 === null ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e3 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c2, f2.tailMode = e3);
}
function yj(a2, b, c2) {
  var d = b.pendingProps, e3 = d.revealOrder, f2 = d.tail;
  Yi(a2, b, d.children, c2);
  d = M.current;
  if ((d & 2) !== 0)
    d = d & 1 | 2, b.flags |= 128;
  else {
    if (a2 !== null && (a2.flags & 128) !== 0)
      a:
        for (a2 = b.child; a2 !== null; ) {
          if (a2.tag === 13)
            a2.memoizedState !== null && wj(a2, c2, b);
          else if (a2.tag === 19)
            wj(a2, c2, b);
          else if (a2.child !== null) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b)
            break a;
          for (; a2.sibling === null; ) {
            if (a2.return === null || a2.return === b)
              break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
    d &= 1;
  }
  G(M, d);
  if ((b.mode & 1) === 0)
    b.memoizedState = null;
  else
    switch (e3) {
      case "forwards":
        c2 = b.child;
        for (e3 = null; c2 !== null; )
          a2 = c2.alternate, a2 !== null && Mh(a2) === null && (e3 = c2), c2 = c2.sibling;
        c2 = e3;
        c2 === null ? (e3 = b.child, b.child = null) : (e3 = c2.sibling, c2.sibling = null);
        xj(b, false, e3, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e3 = b.child;
        for (b.child = null; e3 !== null; ) {
          a2 = e3.alternate;
          if (a2 !== null && Mh(a2) === null) {
            b.child = e3;
            break;
          }
          a2 = e3.sibling;
          e3.sibling = c2;
          c2 = e3;
          e3 = a2;
        }
        xj(b, true, c2, null, f2);
        break;
      case "together":
        xj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function jj(a2, b) {
  (b.mode & 1) === 0 && a2 !== null && (a2.alternate = null, b.alternate = null, b.flags |= 2);
}
function $i(a2, b, c2) {
  a2 !== null && (b.dependencies = a2.dependencies);
  hh |= b.lanes;
  if ((c2 & b.childLanes) === 0)
    return null;
  if (a2 !== null && b.child !== a2.child)
    throw Error(p$3(153));
  if (b.child !== null) {
    a2 = b.child;
    c2 = wh(a2, a2.pendingProps);
    b.child = c2;
    for (c2.return = b; a2.sibling !== null; )
      a2 = a2.sibling, c2 = c2.sibling = wh(a2, a2.pendingProps), c2.return = b;
    c2.sibling = null;
  }
  return b.child;
}
function zj(a2, b, c2) {
  switch (b.tag) {
    case 3:
      lj(b);
      Ig();
      break;
    case 5:
      Kh(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      Ih(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e3 = b.memoizedProps.value;
      G(Mg, d._currentValue);
      d._currentValue = e3;
      break;
    case 13:
      d = b.memoizedState;
      if (d !== null) {
        if (d.dehydrated !== null)
          return G(M, M.current & 1), b.flags |= 128, null;
        if ((c2 & b.child.childLanes) !== 0)
          return pj(a2, b, c2);
        G(M, M.current & 1);
        a2 = $i(a2, b, c2);
        return a2 !== null ? a2.sibling : null;
      }
      G(M, M.current & 1);
      break;
    case 19:
      d = (c2 & b.childLanes) !== 0;
      if ((a2.flags & 128) !== 0) {
        if (d)
          return yj(a2, b, c2);
        b.flags |= 128;
      }
      e3 = b.memoizedState;
      e3 !== null && (e3.rendering = null, e3.tail = null, e3.lastEffect = null);
      G(M, M.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b.lanes = 0, ej(a2, b, c2);
  }
  return $i(a2, b, c2);
}
var Aj, Bj, Cj, Dj;
Aj = function(a2, b) {
  for (var c2 = b.child; c2 !== null; ) {
    if (c2.tag === 5 || c2.tag === 6)
      a2.appendChild(c2.stateNode);
    else if (c2.tag !== 4 && c2.child !== null) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b)
      break;
    for (; c2.sibling === null; ) {
      if (c2.return === null || c2.return === b)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Bj = function() {
};
Cj = function(a2, b, c2, d) {
  var e3 = a2.memoizedProps;
  if (e3 !== d) {
    a2 = b.stateNode;
    Hh(Eh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e3 = Ya(a2, e3);
        d = Ya(a2, d);
        f2 = [];
        break;
      case "select":
        e3 = A$1({}, e3, { value: void 0 });
        d = A$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e3 = gb(a2, e3);
        d = gb(a2, d);
        f2 = [];
        break;
      default:
        typeof e3.onClick !== "function" && typeof d.onClick === "function" && (a2.onclick = Bf);
    }
    ub(c2, d);
    var g;
    c2 = null;
    for (l2 in e3)
      if (!d.hasOwnProperty(l2) && e3.hasOwnProperty(l2) && e3[l2] != null)
        if (l2 === "style") {
          var h2 = e3[l2];
          for (g in h2)
            h2.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
        } else
          l2 !== "dangerouslySetInnerHTML" && l2 !== "children" && l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && l2 !== "autoFocus" && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h2 = e3 != null ? e3[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h2 && (k2 != null || h2 != null))
        if (l2 === "style")
          if (h2) {
            for (g in h2)
              !h2.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
            for (g in k2)
              k2.hasOwnProperty(g) && h2[g] !== k2[g] && (c2 || (c2 = {}), c2[g] = k2[g]);
          } else
            c2 || (f2 || (f2 = []), f2.push(l2, c2)), c2 = k2;
        else
          l2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, k2 != null && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : l2 === "children" ? typeof k2 !== "string" && typeof k2 !== "number" || (f2 = f2 || []).push(l2, "" + k2) : l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && (ea.hasOwnProperty(l2) ? (k2 != null && l2 === "onScroll" && D$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b.updateQueue = l2)
      b.flags |= 4;
  }
};
Dj = function(a2, b, c2, d) {
  c2 !== d && (b.flags |= 4);
};
function Ej(a2, b) {
  if (!I)
    switch (a2.tailMode) {
      case "hidden":
        b = a2.tail;
        for (var c2 = null; b !== null; )
          b.alternate !== null && (c2 = b), b = b.sibling;
        c2 === null ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d = null; c2 !== null; )
          c2.alternate !== null && (d = c2), c2 = c2.sibling;
        d === null ? b || a2.tail === null ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
    }
}
function S(a2) {
  var b = a2.alternate !== null && a2.alternate.child === a2.child, c2 = 0, d = 0;
  if (b)
    for (var e3 = a2.child; e3 !== null; )
      c2 |= e3.lanes | e3.childLanes, d |= e3.subtreeFlags & 14680064, d |= e3.flags & 14680064, e3.return = a2, e3 = e3.sibling;
  else
    for (e3 = a2.child; e3 !== null; )
      c2 |= e3.lanes | e3.childLanes, d |= e3.subtreeFlags, d |= e3.flags, e3.return = a2, e3 = e3.sibling;
  a2.subtreeFlags |= d;
  a2.childLanes = c2;
  return b;
}
function Fj(a2, b, c2) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      Jh();
      E$1(Wf);
      E$1(H);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (a2 === null || a2.child === null)
        Gg(b) ? b.flags |= 4 : a2 === null || a2.memoizedState.isDehydrated && (b.flags & 256) === 0 || (b.flags |= 1024, zg !== null && (Gj(zg), zg = null));
      Bj(a2, b);
      S(b);
      return null;
    case 5:
      Lh(b);
      var e3 = Hh(Gh.current);
      c2 = b.type;
      if (a2 !== null && b.stateNode != null)
        Cj(a2, b, c2, d, e3), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (b.stateNode === null)
            throw Error(p$3(166));
          S(b);
          return null;
        }
        a2 = Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a2 = (b.mode & 1) !== 0;
          switch (c2) {
            case "dialog":
              D$1("cancel", d);
              D$1("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d);
              break;
            case "video":
            case "audio":
              for (e3 = 0; e3 < lf.length; e3++)
                D$1(lf[e3], d);
              break;
            case "source":
              D$1("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$1("error", d);
              D$1("load", d);
              break;
            case "details":
              D$1("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D$1("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D$1("invalid", d);
          }
          ub(c2, f2);
          e3 = null;
          for (var g in f2)
            if (f2.hasOwnProperty(g)) {
              var h2 = f2[g];
              g === "children" ? typeof h2 === "string" ? d.textContent !== h2 && (f2.suppressHydrationWarning !== true && Af(d.textContent, h2, a2), e3 = ["children", h2]) : typeof h2 === "number" && d.textContent !== "" + h2 && (f2.suppressHydrationWarning !== true && Af(d.textContent, h2, a2), e3 = ["children", "" + h2]) : ea.hasOwnProperty(g) && h2 != null && g === "onScroll" && D$1("scroll", d);
            }
          switch (c2) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof f2.onClick === "function" && (d.onclick = Bf);
          }
          d = e3;
          b.updateQueue = d;
          d !== null && (b.flags |= 4);
        } else {
          g = e3.nodeType === 9 ? e3 : e3.ownerDocument;
          a2 === "http://www.w3.org/1999/xhtml" && (a2 = kb(c2));
          a2 === "http://www.w3.org/1999/xhtml" ? c2 === "script" ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : typeof d.is === "string" ? a2 = g.createElement(c2, { is: d.is }) : (a2 = g.createElement(c2), c2 === "select" && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
          a2[Of] = b;
          a2[Pf] = d;
          Aj(a2, b, false, false);
          b.stateNode = a2;
          a: {
            g = vb(c2, d);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e3 = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e3 = d;
                break;
              case "video":
              case "audio":
                for (e3 = 0; e3 < lf.length; e3++)
                  D$1(lf[e3], a2);
                e3 = d;
                break;
              case "source":
                D$1("error", a2);
                e3 = d;
                break;
              case "img":
              case "image":
              case "link":
                D$1("error", a2);
                D$1("load", a2);
                e3 = d;
                break;
              case "details":
                D$1("toggle", a2);
                e3 = d;
                break;
              case "input":
                Za(a2, d);
                e3 = Ya(a2, d);
                D$1("invalid", a2);
                break;
              case "option":
                e3 = d;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d.multiple };
                e3 = A$1({}, d, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb(a2, d);
                e3 = gb(a2, d);
                D$1("invalid", a2);
                break;
              default:
                e3 = d;
            }
            ub(c2, e3);
            h2 = e3;
            for (f2 in h2)
              if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                f2 === "style" ? sb(a2, k2) : f2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, k2 != null && nb(a2, k2)) : f2 === "children" ? typeof k2 === "string" ? (c2 !== "textarea" || k2 !== "") && ob(a2, k2) : typeof k2 === "number" && ob(a2, "" + k2) : f2 !== "suppressContentEditableWarning" && f2 !== "suppressHydrationWarning" && f2 !== "autoFocus" && (ea.hasOwnProperty(f2) ? k2 != null && f2 === "onScroll" && D$1("scroll", a2) : k2 != null && ta(a2, f2, k2, g));
              }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                d.value != null && a2.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a2.multiple = !!d.multiple;
                f2 = d.value;
                f2 != null ? fb(a2, !!d.multiple, f2, false) : d.defaultValue != null && fb(a2, !!d.multiple, d.defaultValue, true);
                break;
              default:
                typeof e3.onClick === "function" && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        b.ref !== null && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a2 && b.stateNode != null)
        Dj(a2, b, a2.memoizedProps, d);
      else {
        if (typeof d !== "string" && b.stateNode === null)
          throw Error(p$3(166));
        c2 = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c2) {
            if (a2 = xg, a2 !== null)
              switch (a2.tag) {
                case 3:
                  Af(d.nodeValue, c2, (a2.mode & 1) !== 0);
                  break;
                case 5:
                  a2.memoizedProps.suppressHydrationWarning !== true && Af(d.nodeValue, c2, (a2.mode & 1) !== 0);
              }
          }
          f2 && (b.flags |= 4);
        } else
          d = (c2.nodeType === 9 ? c2 : c2.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E$1(M);
      d = b.memoizedState;
      if (a2 === null || a2.memoizedState !== null && a2.memoizedState.dehydrated !== null) {
        if (I && yg !== null && (b.mode & 1) !== 0 && (b.flags & 128) === 0)
          Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), d !== null && d.dehydrated !== null) {
          if (a2 === null) {
            if (!f2)
              throw Error(p$3(318));
            f2 = b.memoizedState;
            f2 = f2 !== null ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$3(317));
            f2[Of] = b;
          } else
            Ig(), (b.flags & 128) === 0 && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else
          zg !== null && (Gj(zg), zg = null), f2 = true;
        if (!f2)
          return b.flags & 65536 ? b : null;
      }
      if ((b.flags & 128) !== 0)
        return b.lanes = c2, b;
      d = d !== null;
      d !== (a2 !== null && a2.memoizedState !== null) && d && (b.child.flags |= 8192, (b.mode & 1) !== 0 && (a2 === null || (M.current & 1) !== 0 ? T === 0 && (T = 3) : uj()));
      b.updateQueue !== null && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return Jh(), Bj(a2, b), a2 === null && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return Rg(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E$1(M);
      f2 = b.memoizedState;
      if (f2 === null)
        return S(b), null;
      d = (b.flags & 128) !== 0;
      g = f2.rendering;
      if (g === null)
        if (d)
          Ej(f2, false);
        else {
          if (T !== 0 || a2 !== null && (a2.flags & 128) !== 0)
            for (a2 = b.child; a2 !== null; ) {
              g = Mh(a2);
              if (g !== null) {
                b.flags |= 128;
                Ej(f2, false);
                d = g.updateQueue;
                d !== null && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c2;
                for (c2 = b.child; c2 !== null; )
                  f2 = c2, a2 = d, f2.flags &= 14680066, g = f2.alternate, g === null ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = a2 === null ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                G(M, M.current & 1 | 2);
                return b.child;
              }
              a2 = a2.sibling;
            }
          f2.tail !== null && B$1() > Hj && (b.flags |= 128, d = true, Ej(f2, false), b.lanes = 4194304);
        }
      else {
        if (!d)
          if (a2 = Mh(g), a2 !== null) {
            if (b.flags |= 128, d = true, c2 = a2.updateQueue, c2 !== null && (b.updateQueue = c2, b.flags |= 4), Ej(f2, true), f2.tail === null && f2.tailMode === "hidden" && !g.alternate && !I)
              return S(b), null;
          } else
            2 * B$1() - f2.renderingStartTime > Hj && c2 !== 1073741824 && (b.flags |= 128, d = true, Ej(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c2 = f2.last, c2 !== null ? c2.sibling = g : b.child = g, f2.last = g);
      }
      if (f2.tail !== null)
        return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B$1(), b.sibling = null, c2 = M.current, G(M, d ? c2 & 1 | 2 : c2 & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Ij(), d = b.memoizedState !== null, a2 !== null && a2.memoizedState !== null !== d && (b.flags |= 8192), d && (b.mode & 1) !== 0 ? (gj & 1073741824) !== 0 && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$3(156, b.tag));
}
function Jj(a2, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 3:
      return Jh(), E$1(Wf), E$1(H), Oh(), a2 = b.flags, (a2 & 65536) !== 0 && (a2 & 128) === 0 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 5:
      return Lh(b), null;
    case 13:
      E$1(M);
      a2 = b.memoizedState;
      if (a2 !== null && a2.dehydrated !== null) {
        if (b.alternate === null)
          throw Error(p$3(340));
        Ig();
      }
      a2 = b.flags;
      return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 19:
      return E$1(M), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U = false, Lj = typeof WeakSet === "function" ? WeakSet : Set, V = null;
function Mj(a2, b) {
  var c2 = a2.ref;
  if (c2 !== null)
    if (typeof c2 === "function")
      try {
        c2(null);
      } catch (d) {
        W(a2, b, d);
      }
    else
      c2.current = null;
}
function Nj(a2, b, c2) {
  try {
    c2();
  } catch (d) {
    W(a2, b, d);
  }
}
var Oj = false;
function Pj(a2, b) {
  Cf = dd;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2)
      var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else
      a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d = c2.getSelection && c2.getSelection();
        if (d && d.rangeCount !== 0) {
          c2 = d.anchorNode;
          var e3 = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || e3 !== 0 && q2.nodeType !== 3 || (h2 = g + e3);
                q2 !== f2 || d !== 0 && q2.nodeType !== 3 || (k2 = g + d);
                q2.nodeType === 3 && (g += q2.nodeValue.length);
                if ((y2 = q2.firstChild) === null)
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a2)
                  break b;
                r2 === c2 && ++l2 === e3 && (h2 = g);
                r2 === f2 && ++m2 === d && (k2 = g);
                if ((y2 = q2.nextSibling) !== null)
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c2 = h2 === -1 || k2 === -1 ? null : { start: h2, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V = b; V !== null; )
    if (b = V, a2 = b.child, (b.subtreeFlags & 1028) !== 0 && a2 !== null)
      a2.return = b, V = a2;
    else
      for (; V !== null; ) {
        b = V;
        try {
          var n2 = b.alternate;
          if ((b.flags & 1024) !== 0)
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (n2 !== null) {
                  var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Lg(b.type, t2), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b.stateNode.containerInfo;
                u2.nodeType === 1 ? u2.textContent = "" : u2.nodeType === 9 && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$3(163));
            }
        } catch (F2) {
          W(b, b.return, F2);
        }
        a2 = b.sibling;
        if (a2 !== null) {
          a2.return = b.return;
          V = a2;
          break;
        }
        V = b.return;
      }
  n2 = Oj;
  Oj = false;
  return n2;
}
function Qj(a2, b, c2) {
  var d = b.updateQueue;
  d = d !== null ? d.lastEffect : null;
  if (d !== null) {
    var e3 = d = d.next;
    do {
      if ((e3.tag & a2) === a2) {
        var f2 = e3.destroy;
        e3.destroy = void 0;
        f2 !== void 0 && Nj(b, c2, f2);
      }
      e3 = e3.next;
    } while (e3 !== d);
  }
}
function Rj(a2, b) {
  b = b.updateQueue;
  b = b !== null ? b.lastEffect : null;
  if (b !== null) {
    var c2 = b = b.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d = c2.create;
        c2.destroy = d();
      }
      c2 = c2.next;
    } while (c2 !== b);
  }
}
function Sj(a2) {
  var b = a2.ref;
  if (b !== null) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    typeof b === "function" ? b(a2) : b.current = a2;
  }
}
function Tj(a2) {
  var b = a2.alternate;
  b !== null && (a2.alternate = null, Tj(b));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  a2.tag === 5 && (b = a2.stateNode, b !== null && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Uj(a2) {
  return a2.tag === 5 || a2.tag === 3 || a2.tag === 4;
}
function Vj(a2) {
  a:
    for (; ; ) {
      for (; a2.sibling === null; ) {
        if (a2.return === null || Uj(a2.return))
          return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; a2.tag !== 5 && a2.tag !== 6 && a2.tag !== 18; ) {
        if (a2.flags & 2)
          continue a;
        if (a2.child === null || a2.tag === 4)
          continue a;
        else
          a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2))
        return a2.stateNode;
    }
}
function Wj(a2, b, c2) {
  var d = a2.tag;
  if (d === 5 || d === 6)
    a2 = a2.stateNode, b ? c2.nodeType === 8 ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (c2.nodeType === 8 ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, c2 !== null && c2 !== void 0 || b.onclick !== null || (b.onclick = Bf));
  else if (d !== 4 && (a2 = a2.child, a2 !== null))
    for (Wj(a2, b, c2), a2 = a2.sibling; a2 !== null; )
      Wj(a2, b, c2), a2 = a2.sibling;
}
function Xj(a2, b, c2) {
  var d = a2.tag;
  if (d === 5 || d === 6)
    a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
  else if (d !== 4 && (a2 = a2.child, a2 !== null))
    for (Xj(a2, b, c2), a2 = a2.sibling; a2 !== null; )
      Xj(a2, b, c2), a2 = a2.sibling;
}
var X = null, Yj = false;
function Zj(a2, b, c2) {
  for (c2 = c2.child; c2 !== null; )
    ak(a2, b, c2), c2 = c2.sibling;
}
function ak(a2, b, c2) {
  if (lc && typeof lc.onCommitFiberUnmount === "function")
    try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
  switch (c2.tag) {
    case 5:
      U || Mj(c2, b);
    case 6:
      var d = X, e3 = Yj;
      X = null;
      Zj(a2, b, c2);
      X = d;
      Yj = e3;
      X !== null && (Yj ? (a2 = X, c2 = c2.stateNode, a2.nodeType === 8 ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
      break;
    case 18:
      X !== null && (Yj ? (a2 = X, c2 = c2.stateNode, a2.nodeType === 8 ? Kf(a2.parentNode, c2) : a2.nodeType === 1 && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
      break;
    case 4:
      d = X;
      e3 = Yj;
      X = c2.stateNode.containerInfo;
      Yj = true;
      Zj(a2, b, c2);
      X = d;
      Yj = e3;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c2.updateQueue, d !== null && (d = d.lastEffect, d !== null))) {
        e3 = d = d.next;
        do {
          var f2 = e3, g = f2.destroy;
          f2 = f2.tag;
          g !== void 0 && ((f2 & 2) !== 0 ? Nj(c2, b, g) : (f2 & 4) !== 0 && Nj(c2, b, g));
          e3 = e3.next;
        } while (e3 !== d);
      }
      Zj(a2, b, c2);
      break;
    case 1:
      if (!U && (Mj(c2, b), d = c2.stateNode, typeof d.componentWillUnmount === "function"))
        try {
          d.props = c2.memoizedProps, d.state = c2.memoizedState, d.componentWillUnmount();
        } catch (h2) {
          W(c2, b, h2);
        }
      Zj(a2, b, c2);
      break;
    case 21:
      Zj(a2, b, c2);
      break;
    case 22:
      c2.mode & 1 ? (U = (d = U) || c2.memoizedState !== null, Zj(a2, b, c2), U = d) : Zj(a2, b, c2);
      break;
    default:
      Zj(a2, b, c2);
  }
}
function bk(a2) {
  var b = a2.updateQueue;
  if (b !== null) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    c2 === null && (c2 = a2.stateNode = new Lj());
    b.forEach(function(b2) {
      var d = ck.bind(null, a2, b2);
      c2.has(b2) || (c2.add(b2), b2.then(d, d));
    });
  }
}
function dk(a2, b) {
  var c2 = b.deletions;
  if (c2 !== null)
    for (var d = 0; d < c2.length; d++) {
      var e3 = c2[d];
      try {
        var f2 = a2, g = b, h2 = g;
        a:
          for (; h2 !== null; ) {
            switch (h2.tag) {
              case 5:
                X = h2.stateNode;
                Yj = false;
                break a;
              case 3:
                X = h2.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X = h2.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h2 = h2.return;
          }
        if (X === null)
          throw Error(p$3(160));
        ak(f2, g, e3);
        X = null;
        Yj = false;
        var k2 = e3.alternate;
        k2 !== null && (k2.return = null);
        e3.return = null;
      } catch (l2) {
        W(e3, b, l2);
      }
    }
  if (b.subtreeFlags & 12854)
    for (b = b.child; b !== null; )
      ek(b, a2), b = b.sibling;
}
function ek(a2, b) {
  var c2 = a2.alternate, d = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b, a2);
      fk(a2);
      if (d & 4) {
        try {
          Qj(3, a2, a2.return), Rj(3, a2);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
        try {
          Qj(5, a2, a2.return);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      dk(b, a2);
      fk(a2);
      d & 512 && c2 !== null && Mj(c2, c2.return);
      break;
    case 5:
      dk(b, a2);
      fk(a2);
      d & 512 && c2 !== null && Mj(c2, c2.return);
      if (a2.flags & 32) {
        var e3 = a2.stateNode;
        try {
          ob(e3, "");
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      if (d & 4 && (e3 = a2.stateNode, e3 != null)) {
        var f2 = a2.memoizedProps, g = c2 !== null ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (k2 !== null)
          try {
            h2 === "input" && f2.type === "radio" && f2.name != null && ab(e3, f2);
            vb(h2, g);
            var l2 = vb(h2, f2);
            for (g = 0; g < k2.length; g += 2) {
              var m2 = k2[g], q2 = k2[g + 1];
              m2 === "style" ? sb(e3, q2) : m2 === "dangerouslySetInnerHTML" ? nb(e3, q2) : m2 === "children" ? ob(e3, q2) : ta(e3, m2, q2, l2);
            }
            switch (h2) {
              case "input":
                bb(e3, f2);
                break;
              case "textarea":
                ib(e3, f2);
                break;
              case "select":
                var r2 = e3._wrapperState.wasMultiple;
                e3._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                y2 != null ? fb(e3, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (f2.defaultValue != null ? fb(e3, !!f2.multiple, f2.defaultValue, true) : fb(e3, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e3[Pf] = f2;
          } catch (t2) {
            W(a2, a2.return, t2);
          }
      }
      break;
    case 6:
      dk(b, a2);
      fk(a2);
      if (d & 4) {
        if (a2.stateNode === null)
          throw Error(p$3(162));
        e3 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e3.nodeValue = f2;
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      dk(b, a2);
      fk(a2);
      if (d & 4 && c2 !== null && c2.memoizedState.isDehydrated)
        try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
      break;
    case 4:
      dk(b, a2);
      fk(a2);
      break;
    case 13:
      dk(b, a2);
      fk(a2);
      e3 = a2.child;
      e3.flags & 8192 && (f2 = e3.memoizedState !== null, e3.stateNode.isHidden = f2, !f2 || e3.alternate !== null && e3.alternate.memoizedState !== null || (gk = B$1()));
      d & 4 && bk(a2);
      break;
    case 22:
      m2 = c2 !== null && c2.memoizedState !== null;
      a2.mode & 1 ? (U = (l2 = U) || m2, dk(b, a2), U = l2) : dk(b, a2);
      fk(a2);
      if (d & 8192) {
        l2 = a2.memoizedState !== null;
        if ((a2.stateNode.isHidden = l2) && !m2 && (a2.mode & 1) !== 0)
          for (V = a2, m2 = a2.child; m2 !== null; ) {
            for (q2 = V = m2; V !== null; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r2, r2.return);
                  break;
                case 1:
                  Mj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if (typeof n2.componentWillUnmount === "function") {
                    d = r2;
                    c2 = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d, c2, t2);
                    }
                  }
                  break;
                case 5:
                  Mj(r2, r2.return);
                  break;
                case 22:
                  if (r2.memoizedState !== null) {
                    hk(q2);
                    continue;
                  }
              }
              y2 !== null ? (y2.return = r2, V = y2) : hk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a2; ; ) {
            if (q2.tag === 5) {
              if (m2 === null) {
                m2 = q2;
                try {
                  e3 = q2.stateNode, l2 ? (f2 = e3.style, typeof f2.setProperty === "function" ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g = k2 !== void 0 && k2 !== null && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g));
                } catch (t2) {
                  W(a2, a2.return, t2);
                }
              }
            } else if (q2.tag === 6) {
              if (m2 === null)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W(a2, a2.return, t2);
                }
            } else if ((q2.tag !== 22 && q2.tag !== 23 || q2.memoizedState === null || q2 === a2) && q2.child !== null) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2)
              break a;
            for (; q2.sibling === null; ) {
              if (q2.return === null || q2.return === a2)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      dk(b, a2);
      fk(a2);
      d & 4 && bk(a2);
      break;
    case 21:
      break;
    default:
      dk(b, a2), fk(a2);
  }
}
function fk(a2) {
  var b = a2.flags;
  if (b & 2) {
    try {
      a: {
        for (var c2 = a2.return; c2 !== null; ) {
          if (Uj(c2)) {
            var d = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$3(160));
      }
      switch (d.tag) {
        case 5:
          var e3 = d.stateNode;
          d.flags & 32 && (ob(e3, ""), d.flags &= -33);
          var f2 = Vj(a2);
          Xj(a2, f2, e3);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h2 = Vj(a2);
          Wj(a2, h2, g);
          break;
        default:
          throw Error(p$3(161));
      }
    } catch (k2) {
      W(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b & 4096 && (a2.flags &= -4097);
}
function ik(a2, b, c2) {
  V = a2;
  jk(a2);
}
function jk(a2, b, c2) {
  for (var d = (a2.mode & 1) !== 0; V !== null; ) {
    var e3 = V, f2 = e3.child;
    if (e3.tag === 22 && d) {
      var g = e3.memoizedState !== null || Kj;
      if (!g) {
        var h2 = e3.alternate, k2 = h2 !== null && h2.memoizedState !== null || U;
        h2 = Kj;
        var l2 = U;
        Kj = g;
        if ((U = k2) && !l2)
          for (V = e3; V !== null; )
            g = V, k2 = g.child, g.tag === 22 && g.memoizedState !== null ? kk(e3) : k2 !== null ? (k2.return = g, V = k2) : kk(e3);
        for (; f2 !== null; )
          V = f2, jk(f2), f2 = f2.sibling;
        V = e3;
        Kj = h2;
        U = l2;
      }
      lk(a2);
    } else
      (e3.subtreeFlags & 8772) !== 0 && f2 !== null ? (f2.return = e3, V = f2) : lk(a2);
  }
}
function lk(a2) {
  for (; V !== null; ) {
    var b = V;
    if ((b.flags & 8772) !== 0) {
      var c2 = b.alternate;
      try {
        if ((b.flags & 8772) !== 0)
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Rj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U)
                if (c2 === null)
                  d.componentDidMount();
                else {
                  var e3 = b.elementType === b.type ? c2.memoizedProps : Lg(b.type, c2.memoizedProps);
                  d.componentDidUpdate(e3, c2.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b.updateQueue;
              f2 !== null && ih(b, f2, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (g !== null) {
                c2 = null;
                if (b.child !== null)
                  switch (b.child.tag) {
                    case 5:
                      c2 = b.child.stateNode;
                      break;
                    case 1:
                      c2 = b.child.stateNode;
                  }
                ih(b, g, c2);
              }
              break;
            case 5:
              var h2 = b.stateNode;
              if (c2 === null && b.flags & 4) {
                c2 = h2;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (b.memoizedState === null) {
                var l2 = b.alternate;
                if (l2 !== null) {
                  var m2 = l2.memoizedState;
                  if (m2 !== null) {
                    var q2 = m2.dehydrated;
                    q2 !== null && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$3(163));
          }
        U || b.flags & 512 && Sj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a2) {
      V = null;
      break;
    }
    c2 = b.sibling;
    if (c2 !== null) {
      c2.return = b.return;
      V = c2;
      break;
    }
    V = b.return;
  }
}
function hk(a2) {
  for (; V !== null; ) {
    var b = V;
    if (b === a2) {
      V = null;
      break;
    }
    var c2 = b.sibling;
    if (c2 !== null) {
      c2.return = b.return;
      V = c2;
      break;
    }
    V = b.return;
  }
}
function kk(a2) {
  for (; V !== null; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b.return;
          try {
            Rj(4, b);
          } catch (k2) {
            W(b, c2, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if (typeof d.componentDidMount === "function") {
            var e3 = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e3, k2);
            }
          }
          var f2 = b.return;
          try {
            Sj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Sj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a2) {
      V = null;
      break;
    }
    var h2 = b.sibling;
    if (h2 !== null) {
      h2.return = b.return;
      V = h2;
      break;
    }
    V = b.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R = null, Y = null, Z = 0, gj = 0, fj = Uf(0), T = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L() {
  return (K & 6) !== 0 ? B$1() : Bk !== -1 ? Bk : Bk = B$1();
}
function lh(a2) {
  if ((a2.mode & 1) === 0)
    return 1;
  if ((K & 2) !== 0 && Z !== 0)
    return Z & -Z;
  if (Kg.transition !== null)
    return Ck === 0 && (Ck = yc()), Ck;
  a2 = C$1;
  if (a2 !== 0)
    return a2;
  a2 = window.event;
  a2 = a2 === void 0 ? 16 : jd(a2.type);
  return a2;
}
function mh(a2, b, c2, d) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p$3(185));
  Ac(a2, c2, d);
  if ((K & 2) === 0 || a2 !== R)
    a2 === R && ((K & 2) === 0 && (rk |= c2), T === 4 && Dk(a2, Z)), Ek(a2, d), c2 === 1 && K === 0 && (b.mode & 1) === 0 && (Hj = B$1() + 500, fg && jg());
}
function Ek(a2, b) {
  var c2 = a2.callbackNode;
  wc(a2, b);
  var d = uc(a2, a2 === R ? Z : 0);
  if (d === 0)
    c2 !== null && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b = d & -d, a2.callbackPriority !== b) {
    c2 != null && bc(c2);
    if (b === 1)
      a2.tag === 0 ? ig(Fk.bind(null, a2)) : hg(Fk.bind(null, a2)), Jf(function() {
        (K & 6) === 0 && jg();
      }), c2 = null;
    else {
      switch (Dc(d)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Gk(c2, Hk.bind(null, a2));
    }
    a2.callbackPriority = b;
    a2.callbackNode = c2;
  }
}
function Hk(a2, b) {
  Bk = -1;
  Ck = 0;
  if ((K & 6) !== 0)
    throw Error(p$3(327));
  var c2 = a2.callbackNode;
  if (Ik() && a2.callbackNode !== c2)
    return null;
  var d = uc(a2, a2 === R ? Z : 0);
  if (d === 0)
    return null;
  if ((d & 30) !== 0 || (d & a2.expiredLanes) !== 0 || b)
    b = Jk(a2, d);
  else {
    b = d;
    var e3 = K;
    K |= 2;
    var f2 = Kk();
    if (R !== a2 || Z !== b)
      vk = null, Hj = B$1() + 500, Lk(a2, b);
    do
      try {
        Mk();
        break;
      } catch (h2) {
        Nk(a2, h2);
      }
    while (1);
    Qg();
    nk.current = f2;
    K = e3;
    Y !== null ? b = 0 : (R = null, Z = 0, b = T);
  }
  if (b !== 0) {
    b === 2 && (e3 = xc(a2), e3 !== 0 && (d = e3, b = Ok(a2, e3)));
    if (b === 1)
      throw c2 = qk, Lk(a2, 0), Dk(a2, d), Ek(a2, B$1()), c2;
    if (b === 6)
      Dk(a2, d);
    else {
      e3 = a2.current.alternate;
      if ((d & 30) === 0 && !Pk(e3) && (b = Jk(a2, d), b === 2 && (f2 = xc(a2), f2 !== 0 && (d = f2, b = Ok(a2, f2))), b === 1))
        throw c2 = qk, Lk(a2, 0), Dk(a2, d), Ek(a2, B$1()), c2;
      a2.finishedWork = e3;
      a2.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$3(345));
        case 2:
          Qk(a2, uk, vk);
          break;
        case 3:
          Dk(a2, d);
          if ((d & 130023424) === d && (b = gk + 500 - B$1(), 10 < b)) {
            if (uc(a2, 0) !== 0)
              break;
            e3 = a2.suspendedLanes;
            if ((e3 & d) !== d) {
              L();
              a2.pingedLanes |= a2.suspendedLanes & e3;
              break;
            }
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), b);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 4:
          Dk(a2, d);
          if ((d & 4194240) === d)
            break;
          b = a2.eventTimes;
          for (e3 = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e3 && (e3 = g);
            d &= ~f2;
          }
          d = e3;
          d = B$1() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a2.timeoutHandle = Ff(Qk.bind(null, a2, uk, vk), d);
            break;
          }
          Qk(a2, uk, vk);
          break;
        case 5:
          Qk(a2, uk, vk);
          break;
        default:
          throw Error(p$3(329));
      }
    }
  }
  Ek(a2, B$1());
  return a2.callbackNode === c2 ? Hk.bind(null, a2) : null;
}
function Ok(a2, b) {
  var c2 = tk;
  a2.current.memoizedState.isDehydrated && (Lk(a2, b).flags |= 256);
  a2 = Jk(a2, b);
  a2 !== 2 && (b = uk, uk = c2, b !== null && Gj(b));
  return a2;
}
function Gj(a2) {
  uk === null ? uk = a2 : uk.push.apply(uk, a2);
}
function Pk(a2) {
  for (var b = a2; ; ) {
    if (b.flags & 16384) {
      var c2 = b.updateQueue;
      if (c2 !== null && (c2 = c2.stores, c2 !== null))
        for (var d = 0; d < c2.length; d++) {
          var e3 = c2[d], f2 = e3.getSnapshot;
          e3 = e3.value;
          try {
            if (!He(f2(), e3))
              return false;
          } catch (g) {
            return false;
          }
        }
    }
    c2 = b.child;
    if (b.subtreeFlags & 16384 && c2 !== null)
      c2.return = b, b = c2;
    else {
      if (b === a2)
        break;
      for (; b.sibling === null; ) {
        if (b.return === null || b.return === a2)
          return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Dk(a2, b) {
  b &= ~sk;
  b &= ~rk;
  a2.suspendedLanes |= b;
  a2.pingedLanes &= ~b;
  for (a2 = a2.expirationTimes; 0 < b; ) {
    var c2 = 31 - oc(b), d = 1 << c2;
    a2[c2] = -1;
    b &= ~d;
  }
}
function Fk(a2) {
  if ((K & 6) !== 0)
    throw Error(p$3(327));
  Ik();
  var b = uc(a2, 0);
  if ((b & 1) === 0)
    return Ek(a2, B$1()), null;
  var c2 = Jk(a2, b);
  if (a2.tag !== 0 && c2 === 2) {
    var d = xc(a2);
    d !== 0 && (b = d, c2 = Ok(a2, d));
  }
  if (c2 === 1)
    throw c2 = qk, Lk(a2, 0), Dk(a2, b), Ek(a2, B$1()), c2;
  if (c2 === 6)
    throw Error(p$3(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b;
  Qk(a2, uk, vk);
  Ek(a2, B$1());
  return null;
}
function Rk(a2, b) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b);
  } finally {
    K = c2, K === 0 && (Hj = B$1() + 500, fg && jg());
  }
}
function Sk(a2) {
  xk !== null && xk.tag === 0 && (K & 6) === 0 && Ik();
  var b = K;
  K |= 1;
  var c2 = pk.transition, d = C$1;
  try {
    if (pk.transition = null, C$1 = 1, a2)
      return a2();
  } finally {
    C$1 = d, pk.transition = c2, K = b, (K & 6) === 0 && jg();
  }
}
function Ij() {
  gj = fj.current;
  E$1(fj);
}
function Lk(a2, b) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  c2 !== -1 && (a2.timeoutHandle = -1, Gf(c2));
  if (Y !== null)
    for (c2 = Y.return; c2 !== null; ) {
      var d = c2;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          d !== null && d !== void 0 && $f();
          break;
        case 3:
          Jh();
          E$1(Wf);
          E$1(H);
          Oh();
          break;
        case 5:
          Lh(d);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E$1(M);
          break;
        case 19:
          E$1(M);
          break;
        case 10:
          Rg(d.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c2 = c2.return;
    }
  R = a2;
  Y = a2 = wh(a2.current, null);
  Z = gj = b;
  T = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (Wg !== null) {
    for (b = 0; b < Wg.length; b++)
      if (c2 = Wg[b], d = c2.interleaved, d !== null) {
        c2.interleaved = null;
        var e3 = d.next, f2 = c2.pending;
        if (f2 !== null) {
          var g = f2.next;
          f2.next = e3;
          d.next = g;
        }
        c2.pending = d;
      }
    Wg = null;
  }
  return a2;
}
function Nk(a2, b) {
  do {
    var c2 = Y;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N.memoizedState; d !== null; ) {
          var e3 = d.queue;
          e3 !== null && (e3.pending = null);
          d = d.next;
        }
        Sh = false;
      }
      Rh = 0;
      P = O = N = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (c2 === null || c2.return === null) {
        T = 1;
        qk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a2, g = c2.return, h2 = c2, k2 = b;
        b = Z;
        h2.flags |= 32768;
        if (k2 !== null && typeof k2 === "object" && typeof k2.then === "function") {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if ((m2.mode & 1) === 0 && (q2 === 0 || q2 === 11 || q2 === 15)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Vi(g);
          if (y2 !== null) {
            y2.flags &= -257;
            Wi(y2, g, h2, f2, b);
            y2.mode & 1 && Ti(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (n2 === null) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else
              n2.add(k2);
            break a;
          } else {
            if ((b & 1) === 0) {
              Ti(f2, l2, b);
              uj();
              break a;
            }
            k2 = Error(p$3(426));
          }
        } else if (I && h2.mode & 1) {
          var J2 = Vi(g);
          if (J2 !== null) {
            (J2.flags & 65536) === 0 && (J2.flags |= 256);
            Wi(J2, g, h2, f2, b);
            Jg(Ki(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ki(k2, h2);
        T !== 4 && (T = 2);
        tk === null ? tk = [f2] : tk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Oi(f2, k2, b);
              fh(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if ((f2.flags & 128) === 0 && (typeof w2.getDerivedStateFromError === "function" || u2 !== null && typeof u2.componentDidCatch === "function" && (Si === null || !Si.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Ri(f2, h2, b);
                fh(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (f2 !== null);
      }
      Tk(c2);
    } catch (na) {
      b = na;
      Y === c2 && c2 !== null && (Y = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a2 = nk.current;
  nk.current = ai;
  return a2 === null ? ai : a2;
}
function uj() {
  if (T === 0 || T === 3 || T === 2)
    T = 4;
  R === null || (hh & 268435455) === 0 && (rk & 268435455) === 0 || Dk(R, Z);
}
function Jk(a2, b) {
  var c2 = K;
  K |= 2;
  var d = Kk();
  if (R !== a2 || Z !== b)
    vk = null, Lk(a2, b);
  do
    try {
      Uk();
      break;
    } catch (e3) {
      Nk(a2, e3);
    }
  while (1);
  Qg();
  K = c2;
  nk.current = d;
  if (Y !== null)
    throw Error(p$3(261));
  R = null;
  Z = 0;
  return T;
}
function Uk() {
  for (; Y !== null; )
    Vk(Y);
}
function Mk() {
  for (; Y !== null && !cc(); )
    Vk(Y);
}
function Vk(a2) {
  var b = Wk(a2.alternate, a2, gj);
  a2.memoizedProps = a2.pendingProps;
  b === null ? Tk(a2) : Y = b;
  ok.current = null;
}
function Tk(a2) {
  var b = a2;
  do {
    var c2 = b.alternate;
    a2 = b.return;
    if ((b.flags & 32768) === 0) {
      if (c2 = Fj(c2, b, gj), c2 !== null) {
        Y = c2;
        return;
      }
    } else {
      c2 = Jj(c2, b);
      if (c2 !== null) {
        c2.flags &= 32767;
        Y = c2;
        return;
      }
      if (a2 !== null)
        a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (b !== null) {
      Y = b;
      return;
    }
    Y = b = a2;
  } while (b !== null);
  T === 0 && (T = 5);
}
function Qk(a2, b, c2) {
  var d = C$1, e3 = pk.transition;
  try {
    pk.transition = null, C$1 = 1, Xk(a2, b, c2, d);
  } finally {
    pk.transition = e3, C$1 = d;
  }
  return null;
}
function Xk(a2, b, c2, d) {
  do
    Ik();
  while (xk !== null);
  if ((K & 6) !== 0)
    throw Error(p$3(327));
  c2 = a2.finishedWork;
  var e3 = a2.finishedLanes;
  if (c2 === null)
    return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current)
    throw Error(p$3(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === R && (Y = R = null, Z = 0);
  (c2.subtreeFlags & 2064) === 0 && (c2.flags & 2064) === 0 || wk || (wk = true, Gk(hc, function() {
    Ik();
    return null;
  }));
  f2 = (c2.flags & 15990) !== 0;
  if ((c2.subtreeFlags & 15990) !== 0 || f2) {
    f2 = pk.transition;
    pk.transition = null;
    var g = C$1;
    C$1 = 1;
    var h2 = K;
    K |= 4;
    ok.current = null;
    Pj(a2, c2);
    ek(c2, a2);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    ik(c2);
    dc();
    K = h2;
    C$1 = g;
    pk.transition = f2;
  } else
    a2.current = c2;
  wk && (wk = false, xk = a2, yk = e3);
  f2 = a2.pendingLanes;
  f2 === 0 && (Si = null);
  mc(c2.stateNode);
  Ek(a2, B$1());
  if (b !== null)
    for (d = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++)
      e3 = b[c2], d(e3.value, { componentStack: e3.stack, digest: e3.digest });
  if (Pi)
    throw Pi = false, a2 = Qi, Qi = null, a2;
  (yk & 1) !== 0 && a2.tag !== 0 && Ik();
  f2 = a2.pendingLanes;
  (f2 & 1) !== 0 ? a2 === Ak ? zk++ : (zk = 0, Ak = a2) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (xk !== null) {
    var a2 = Dc(yk), b = pk.transition, c2 = C$1;
    try {
      pk.transition = null;
      C$1 = 16 > a2 ? 16 : a2;
      if (xk === null)
        var d = false;
      else {
        a2 = xk;
        xk = null;
        yk = 0;
        if ((K & 6) !== 0)
          throw Error(p$3(331));
        var e3 = K;
        K |= 4;
        for (V = a2.current; V !== null; ) {
          var f2 = V, g = f2.child;
          if ((V.flags & 16) !== 0) {
            var h2 = f2.deletions;
            if (h2 !== null) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V = l2; V !== null; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (q2 !== null)
                    q2.return = m2, V = q2;
                  else
                    for (; V !== null; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Tj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (r2 !== null) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (n2 !== null) {
                var t2 = n2.child;
                if (t2 !== null) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (t2 !== null);
                }
              }
              V = f2;
            }
          }
          if ((f2.subtreeFlags & 2064) !== 0 && g !== null)
            g.return = f2, V = g;
          else
            b:
              for (; V !== null; ) {
                f2 = V;
                if ((f2.flags & 2048) !== 0)
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (x2 !== null) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
        }
        var w2 = a2.current;
        for (V = w2; V !== null; ) {
          g = V;
          var u2 = g.child;
          if ((g.subtreeFlags & 2064) !== 0 && u2 !== null)
            u2.return = g, V = u2;
          else
            b:
              for (g = w2; V !== null; ) {
                h2 = V;
                if ((h2.flags & 2048) !== 0)
                  try {
                    switch (h2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h2);
                    }
                  } catch (na) {
                    W(h2, h2.return, na);
                  }
                if (h2 === g) {
                  V = null;
                  break b;
                }
                var F2 = h2.sibling;
                if (F2 !== null) {
                  F2.return = h2.return;
                  V = F2;
                  break b;
                }
                V = h2.return;
              }
        }
        K = e3;
        jg();
        if (lc && typeof lc.onPostCommitFiberRoot === "function")
          try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
        d = true;
      }
      return d;
    } finally {
      C$1 = c2, pk.transition = b;
    }
  }
  return false;
}
function Yk(a2, b, c2) {
  b = Ki(c2, b);
  b = Oi(a2, b, 1);
  a2 = dh(a2, b, 1);
  b = L();
  a2 !== null && (Ac(a2, 1, b), Ek(a2, b));
}
function W(a2, b, c2) {
  if (a2.tag === 3)
    Yk(a2, a2, c2);
  else
    for (; b !== null; ) {
      if (b.tag === 3) {
        Yk(b, a2, c2);
        break;
      } else if (b.tag === 1) {
        var d = b.stateNode;
        if (typeof b.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (Si === null || !Si.has(d))) {
          a2 = Ki(c2, a2);
          a2 = Ri(b, a2, 1);
          b = dh(b, a2, 1);
          a2 = L();
          b !== null && (Ac(b, 1, a2), Ek(b, a2));
          break;
        }
      }
      b = b.return;
    }
}
function Ui(a2, b, c2) {
  var d = a2.pingCache;
  d !== null && d.delete(b);
  b = L();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  R === a2 && (Z & c2) === c2 && (T === 4 || T === 3 && (Z & 130023424) === Z && 500 > B$1() - gk ? Lk(a2, 0) : sk |= c2);
  Ek(a2, b);
}
function Zk(a2, b) {
  b === 0 && ((a2.mode & 1) === 0 ? b = 1 : (b = sc, sc <<= 1, (sc & 130023424) === 0 && (sc = 4194304)));
  var c2 = L();
  a2 = Zg(a2, b);
  a2 !== null && (Ac(a2, b, c2), Ek(a2, c2));
}
function vj(a2) {
  var b = a2.memoizedState, c2 = 0;
  b !== null && (c2 = b.retryLane);
  Zk(a2, c2);
}
function ck(a2, b) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d = a2.stateNode;
      var e3 = a2.memoizedState;
      e3 !== null && (c2 = e3.retryLane);
      break;
    case 19:
      d = a2.stateNode;
      break;
    default:
      throw Error(p$3(314));
  }
  d !== null && d.delete(b);
  Zk(a2, c2);
}
var Wk;
Wk = function(a2, b, c2) {
  if (a2 !== null)
    if (a2.memoizedProps !== b.pendingProps || Wf.current)
      Ug = true;
    else {
      if ((a2.lanes & c2) === 0 && (b.flags & 128) === 0)
        return Ug = false, zj(a2, b, c2);
      Ug = (a2.flags & 131072) !== 0 ? true : false;
    }
  else
    Ug = false, I && (b.flags & 1048576) !== 0 && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      jj(a2, b);
      a2 = b.pendingProps;
      var e3 = Yf(b, H.current);
      Tg(b, c2);
      e3 = Xh(null, b, d, a2, e3, c2);
      var f2 = bi();
      b.flags |= 1;
      typeof e3 === "object" && e3 !== null && typeof e3.render === "function" && e3.$$typeof === void 0 ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = e3.state !== null && e3.state !== void 0 ? e3.state : null, ah(b), e3.updater = nh, b.stateNode = e3, e3._reactInternals = b, rh(b, d, a2, c2), b = kj(null, b, d, true, f2, c2)) : (b.tag = 0, I && f2 && vg(b), Yi(null, b, e3, c2), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        jj(a2, b);
        a2 = b.pendingProps;
        e3 = d._init;
        d = e3(d._payload);
        b.type = d;
        e3 = b.tag = $k(d);
        a2 = Lg(d, a2);
        switch (e3) {
          case 0:
            b = dj(null, b, d, a2, c2);
            break a;
          case 1:
            b = ij(null, b, d, a2, c2);
            break a;
          case 11:
            b = Zi(null, b, d, a2, c2);
            break a;
          case 14:
            b = aj(null, b, d, Lg(d.type, a2), c2);
            break a;
        }
        throw Error(p$3(306, d, ""));
      }
      return b;
    case 0:
      return d = b.type, e3 = b.pendingProps, e3 = b.elementType === d ? e3 : Lg(d, e3), dj(a2, b, d, e3, c2);
    case 1:
      return d = b.type, e3 = b.pendingProps, e3 = b.elementType === d ? e3 : Lg(d, e3), ij(a2, b, d, e3, c2);
    case 3:
      a: {
        lj(b);
        if (a2 === null)
          throw Error(p$3(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e3 = f2.element;
        bh(a2, b);
        gh(b, d, null, c2);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated)
          if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e3 = Ki(Error(p$3(423)), b);
            b = mj(a2, b, d, c2, e3);
            break a;
          } else if (d !== e3) {
            e3 = Ki(Error(p$3(424)), b);
            b = mj(a2, b, d, c2, e3);
            break a;
          } else
            for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c2 = Ch(b, null, d, c2), b.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d === e3) {
            b = $i(a2, b, c2);
            break a;
          }
          Yi(a2, b, d, c2);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Kh(b), a2 === null && Eg(b), d = b.type, e3 = b.pendingProps, f2 = a2 !== null ? a2.memoizedProps : null, g = e3.children, Ef(d, e3) ? g = null : f2 !== null && Ef(d, f2) && (b.flags |= 32), hj(a2, b), Yi(a2, b, g, c2), b.child;
    case 6:
      return a2 === null && Eg(b), null;
    case 13:
      return pj(a2, b, c2);
    case 4:
      return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, a2 === null ? b.child = Bh(b, null, d, c2) : Yi(a2, b, d, c2), b.child;
    case 11:
      return d = b.type, e3 = b.pendingProps, e3 = b.elementType === d ? e3 : Lg(d, e3), Zi(a2, b, d, e3, c2);
    case 7:
      return Yi(a2, b, b.pendingProps, c2), b.child;
    case 8:
      return Yi(a2, b, b.pendingProps.children, c2), b.child;
    case 12:
      return Yi(a2, b, b.pendingProps.children, c2), b.child;
    case 10:
      a: {
        d = b.type._context;
        e3 = b.pendingProps;
        f2 = b.memoizedProps;
        g = e3.value;
        G(Mg, d._currentValue);
        d._currentValue = g;
        if (f2 !== null)
          if (He(f2.value, g)) {
            if (f2.children === e3.children && !Wf.current) {
              b = $i(a2, b, c2);
              break a;
            }
          } else
            for (f2 = b.child, f2 !== null && (f2.return = b); f2 !== null; ) {
              var h2 = f2.dependencies;
              if (h2 !== null) {
                g = f2.child;
                for (var k2 = h2.firstContext; k2 !== null; ) {
                  if (k2.context === d) {
                    if (f2.tag === 1) {
                      k2 = ch(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (l2 !== null) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        m2 === null ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    k2 !== null && (k2.lanes |= c2);
                    Sg(f2.return, c2, b);
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (f2.tag === 10)
                g = f2.type === b.type ? null : f2.child;
              else if (f2.tag === 18) {
                g = f2.return;
                if (g === null)
                  throw Error(p$3(341));
                g.lanes |= c2;
                h2 = g.alternate;
                h2 !== null && (h2.lanes |= c2);
                Sg(g, c2, b);
                g = f2.sibling;
              } else
                g = f2.child;
              if (g !== null)
                g.return = f2;
              else
                for (g = f2; g !== null; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f2 = g.sibling;
                  if (f2 !== null) {
                    f2.return = g.return;
                    g = f2;
                    break;
                  }
                  g = g.return;
                }
              f2 = g;
            }
        Yi(a2, b, e3.children, c2);
        b = b.child;
      }
      return b;
    case 9:
      return e3 = b.type, d = b.pendingProps.children, Tg(b, c2), e3 = Vg(e3), d = d(e3), b.flags |= 1, Yi(a2, b, d, c2), b.child;
    case 14:
      return d = b.type, e3 = Lg(d, b.pendingProps), e3 = Lg(d.type, e3), aj(a2, b, d, e3, c2);
    case 15:
      return cj(a2, b, b.type, b.pendingProps, c2);
    case 17:
      return d = b.type, e3 = b.pendingProps, e3 = b.elementType === d ? e3 : Lg(d, e3), jj(a2, b), b.tag = 1, Zf(d) ? (a2 = true, cg(b)) : a2 = false, Tg(b, c2), ph(b, d, e3), rh(b, d, e3, c2), kj(null, b, d, true, a2, c2);
    case 19:
      return yj(a2, b, c2);
    case 22:
      return ej(a2, b, c2);
  }
  throw Error(p$3(156, b.tag));
};
function Gk(a2, b) {
  return ac(a2, b);
}
function al(a2, b, c2, d) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b, c2, d) {
  return new al(a2, b, c2, d);
}
function bj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function $k(a2) {
  if (typeof a2 === "function")
    return bj(a2) ? 1 : 0;
  if (a2 !== void 0 && a2 !== null) {
    a2 = a2.$$typeof;
    if (a2 === Da)
      return 11;
    if (a2 === Ga)
      return 14;
  }
  return 2;
}
function wh(a2, b) {
  var c2 = a2.alternate;
  c2 === null ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b = a2.dependencies;
  c2.dependencies = b === null ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function yh(a2, b, c2, d, e3, f2) {
  var g = 2;
  d = a2;
  if (typeof a2 === "function")
    bj(a2) && (g = 1);
  else if (typeof a2 === "string")
    g = 5;
  else
    a:
      switch (a2) {
        case ya:
          return Ah(c2.children, e3, f2, b);
        case za:
          g = 8;
          e3 |= 8;
          break;
        case Aa:
          return a2 = Bg(12, c2, b, e3 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
        case Ea:
          return a2 = Bg(13, c2, b, e3), a2.elementType = Ea, a2.lanes = f2, a2;
        case Fa:
          return a2 = Bg(19, c2, b, e3), a2.elementType = Fa, a2.lanes = f2, a2;
        case Ia:
          return qj(c2, e3, f2, b);
        default:
          if (typeof a2 === "object" && a2 !== null)
            switch (a2.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
          throw Error(p$3(130, a2 == null ? a2 : typeof a2, ""));
      }
  b = Bg(g, c2, b, e3);
  b.elementType = a2;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Ah(a2, b, c2, d) {
  a2 = Bg(7, a2, d, b);
  a2.lanes = c2;
  return a2;
}
function qj(a2, b, c2, d) {
  a2 = Bg(22, a2, d, b);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function xh(a2, b, c2) {
  a2 = Bg(6, a2, null, b);
  a2.lanes = c2;
  return a2;
}
function zh(a2, b, c2) {
  b = Bg(4, a2.children !== null ? a2.children : [], a2.key, b);
  b.lanes = c2;
  b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b;
}
function bl(a2, b, c2, d, e3) {
  this.tag = b;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e3;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a2, b, c2, d, e3, f2, g, h2, k2) {
  a2 = new bl(a2, b, c2, h2, k2);
  b === 1 ? (b = 1, f2 === true && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f2);
  return a2;
}
function dl(a2, b, c2) {
  var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: wa, key: d == null ? null : "" + d, children: a2, containerInfo: b, implementation: c2 };
}
function el(a2) {
  if (!a2)
    return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || a2.tag !== 1)
      throw Error(p$3(170));
    var b = a2;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (b !== null);
    throw Error(p$3(171));
  }
  if (a2.tag === 1) {
    var c2 = a2.type;
    if (Zf(c2))
      return bg(a2, c2, b);
  }
  return b;
}
function fl(a2, b, c2, d, e3, f2, g, h2, k2) {
  a2 = cl(c2, d, true, a2, e3, f2, g, h2, k2);
  a2.context = el(null);
  c2 = a2.current;
  d = L();
  e3 = lh(c2);
  f2 = ch(d, e3);
  f2.callback = b !== void 0 && b !== null ? b : null;
  dh(c2, f2, e3);
  a2.current.lanes = e3;
  Ac(a2, e3, d);
  Ek(a2, d);
  return a2;
}
function gl(a2, b, c2, d) {
  var e3 = b.current, f2 = L(), g = lh(e3);
  c2 = el(c2);
  b.context === null ? b.context = c2 : b.pendingContext = c2;
  b = ch(f2, g);
  b.payload = { element: a2 };
  d = d === void 0 ? null : d;
  d !== null && (b.callback = d);
  a2 = dh(e3, b, g);
  a2 !== null && (mh(a2, e3, g, f2), eh(a2, e3, g));
  return g;
}
function hl(a2) {
  a2 = a2.current;
  if (!a2.child)
    return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function il(a2, b) {
  a2 = a2.memoizedState;
  if (a2 !== null && a2.dehydrated !== null) {
    var c2 = a2.retryLane;
    a2.retryLane = c2 !== 0 && c2 < b ? c2 : b;
  }
}
function jl(a2, b) {
  il(a2, b);
  (a2 = a2.alternate) && il(a2, b);
}
function kl() {
  return null;
}
var ll = typeof reportError === "function" ? reportError : function(a2) {
  console.error(a2);
};
function ml(a2) {
  this._internalRoot = a2;
}
nl.prototype.render = ml.prototype.render = function(a2) {
  var b = this._internalRoot;
  if (b === null)
    throw Error(p$3(409));
  gl(a2, b, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (a2 !== null) {
    this._internalRoot = null;
    var b = a2.containerInfo;
    Sk(function() {
      gl(null, a2, null, null);
    });
    b[uf] = null;
  }
};
function nl(a2) {
  this._internalRoot = a2;
}
nl.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b = Hc();
    a2 = { blockedOn: null, target: a2, priority: b };
    for (var c2 = 0; c2 < Qc.length && b !== 0 && b < Qc[c2].priority; c2++)
      ;
    Qc.splice(c2, 0, a2);
    c2 === 0 && Vc(a2);
  }
};
function ol(a2) {
  return !(!a2 || a2.nodeType !== 1 && a2.nodeType !== 9 && a2.nodeType !== 11);
}
function pl(a2) {
  return !(!a2 || a2.nodeType !== 1 && a2.nodeType !== 9 && a2.nodeType !== 11 && (a2.nodeType !== 8 || a2.nodeValue !== " react-mount-point-unstable "));
}
function ql() {
}
function rl(a2, b, c2, d, e3) {
  if (e3) {
    if (typeof d === "function") {
      var f2 = d;
      d = function() {
        var a3 = hl(g);
        f2.call(a3);
      };
    }
    var g = fl(b, d, a2, 0, null, false, false, "", ql);
    a2._reactRootContainer = g;
    a2[uf] = g.current;
    sf(a2.nodeType === 8 ? a2.parentNode : a2);
    Sk();
    return g;
  }
  for (; e3 = a2.lastChild; )
    a2.removeChild(e3);
  if (typeof d === "function") {
    var h2 = d;
    d = function() {
      var a3 = hl(k2);
      h2.call(a3);
    };
  }
  var k2 = cl(a2, 0, false, null, null, false, false, "", ql);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(a2.nodeType === 8 ? a2.parentNode : a2);
  Sk(function() {
    gl(b, k2, c2, d);
  });
  return k2;
}
function sl(a2, b, c2, d, e3) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g = f2;
    if (typeof e3 === "function") {
      var h2 = e3;
      e3 = function() {
        var a3 = hl(g);
        h2.call(a3);
      };
    }
    gl(b, g, a2, e3);
  } else
    g = rl(c2, b, a2, e3, d);
  return hl(g);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b = a2.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c2 = tc(b.pendingLanes);
        c2 !== 0 && (Cc(b, c2 | 1), Ek(b, B$1()), (K & 6) === 0 && (Hj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b2 = Zg(a2, 1);
        if (b2 !== null) {
          var c3 = L();
          mh(b2, a2, 1, c3);
        }
      }), jl(a2, 1);
  }
};
Fc = function(a2) {
  if (a2.tag === 13) {
    var b = Zg(a2, 134217728);
    if (b !== null) {
      var c2 = L();
      mh(b, a2, 134217728, c2);
    }
    jl(a2, 134217728);
  }
};
Gc = function(a2) {
  if (a2.tag === 13) {
    var b = lh(a2), c2 = Zg(a2, b);
    if (c2 !== null) {
      var d = L();
      mh(c2, a2, b, d);
    }
    jl(a2, b);
  }
};
Hc = function() {
  return C$1;
};
Ic = function(a2, b) {
  var c2 = C$1;
  try {
    return C$1 = a2, b();
  } finally {
    C$1 = c2;
  }
};
yb = function(a2, b, c2) {
  switch (b) {
    case "input":
      bb(a2, c2);
      b = c2.name;
      if (c2.type === "radio" && b != null) {
        for (c2 = a2; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c2.length; b++) {
          var d = c2[b];
          if (d !== a2 && d.form === a2.form) {
            var e3 = Db(d);
            if (!e3)
              throw Error(p$3(90));
            Wa(d);
            bb(d, e3);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b = c2.value, b != null && fb(a2, !!c2.multiple, b, false);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return a2 === null ? null : a2.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch (a2) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(a2, b) {
  var c2 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ol(b))
    throw Error(p$3(200));
  return dl(a2, b, null, c2);
};
reactDom_production_min.createRoot = function(a2, b) {
  if (!ol(a2))
    throw Error(p$3(299));
  var c2 = false, d = "", e3 = ll;
  b !== null && b !== void 0 && (b.unstable_strictMode === true && (c2 = true), b.identifierPrefix !== void 0 && (d = b.identifierPrefix), b.onRecoverableError !== void 0 && (e3 = b.onRecoverableError));
  b = cl(a2, 1, false, null, null, c2, false, d, e3);
  a2[uf] = b.current;
  sf(a2.nodeType === 8 ? a2.parentNode : a2);
  return new ml(b);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (a2 == null)
    return null;
  if (a2.nodeType === 1)
    return a2;
  var b = a2._reactInternals;
  if (b === void 0) {
    if (typeof a2.render === "function")
      throw Error(p$3(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$3(268, a2));
  }
  a2 = Zb(b);
  a2 = a2 === null ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Sk(a2);
};
reactDom_production_min.hydrate = function(a2, b, c2) {
  if (!pl(b))
    throw Error(p$3(200));
  return sl(null, a2, b, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b, c2) {
  if (!ol(a2))
    throw Error(p$3(405));
  var d = c2 != null && c2.hydratedSources || null, e3 = false, f2 = "", g = ll;
  c2 !== null && c2 !== void 0 && (c2.unstable_strictMode === true && (e3 = true), c2.identifierPrefix !== void 0 && (f2 = c2.identifierPrefix), c2.onRecoverableError !== void 0 && (g = c2.onRecoverableError));
  b = fl(b, null, a2, 1, c2 != null ? c2 : null, e3, false, f2, g);
  a2[uf] = b.current;
  sf(a2);
  if (d)
    for (a2 = 0; a2 < d.length; a2++)
      c2 = d[a2], e3 = c2._getVersion, e3 = e3(c2._source), b.mutableSourceEagerHydrationData == null ? b.mutableSourceEagerHydrationData = [c2, e3] : b.mutableSourceEagerHydrationData.push(c2, e3);
  return new nl(b);
};
reactDom_production_min.render = function(a2, b, c2) {
  if (!pl(b))
    throw Error(p$3(200));
  return sl(null, a2, b, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!pl(a2))
    throw Error(p$3(40));
  return a2._reactRootContainer ? (Sk(function() {
    sl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d) {
  if (!pl(c2))
    throw Error(p$3(200));
  if (a2 == null || a2._reactInternals === void 0)
    throw Error(p$3(38));
  return sl(a2, b, c2, false, d);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var createRoot;
var m$2 = reactDom.exports;
{
  createRoot = m$2.createRoot;
  m$2.hydrateRoot;
}
function _extends$X() {
  _extends$X = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$X.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var readOnly = function(obj) {
  return obj;
};
var BeforeUnloadEventType = "beforeunload";
var PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$window = _options.window, window2 = _options$window === void 0 ? document.defaultView : _options$window;
  var globalHistory = window2.history;
  function getIndexAndLocation() {
    var _window$location = window2.location, pathname = _window$location.pathname, search = _window$location.search, hash = _window$location.hash;
    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname,
      search,
      hash,
      state: state.usr || null,
      key: state.key || "default"
    })];
  }
  var blockedPopTx = null;
  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;
      var _getIndexAndLocation = getIndexAndLocation(), nextIndex = _getIndexAndLocation[0], nextLocation = _getIndexAndLocation[1];
      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;
          if (delta) {
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        }
      } else {
        applyTx(nextAction);
      }
    }
  }
  window2.addEventListener(PopStateEventType, handlePop);
  var action = Action.Pop;
  var _getIndexAndLocation2 = getIndexAndLocation(), index = _getIndexAndLocation2[0], location = _getIndexAndLocation2[1];
  var listeners = createEvents();
  var blockers = createEvents();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends$X({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }
    return readOnly(_extends$X({
      pathname: location.pathname,
      hash: "",
      search: ""
    }, typeof to === "string" ? parsePath(to) : to, {
      state,
      key: createKey()
    }));
  }
  function getHistoryStateAndUrl(nextLocation, index2) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index2
    }, createHref(nextLocation)];
  }
  function allowTx(action2, location2, retry) {
    return !blockers.length || (blockers.call({
      action: action2,
      location: location2,
      retry
    }), false);
  }
  function applyTx(nextAction) {
    action = nextAction;
    var _getIndexAndLocation3 = getIndexAndLocation();
    index = _getIndexAndLocation3[0];
    location = _getIndexAndLocation3[1];
    listeners.call({
      action,
      location
    });
  }
  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1), historyState = _getHistoryStateAndUr[0], url = _getHistoryStateAndUr[1];
      try {
        globalHistory.pushState(historyState, "", url);
      } catch (error) {
        window2.location.assign(url);
      }
      applyTx(nextAction);
    }
  }
  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }
    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index), historyState = _getHistoryStateAndUr2[0], url = _getHistoryStateAndUr2[1];
      globalHistory.replaceState(historyState, "", url);
      applyTx(nextAction);
    }
  }
  function go(delta) {
    globalHistory.go(delta);
  }
  var history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref,
    push,
    replace,
    go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);
      if (blockers.length === 1) {
        window2.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }
      return function() {
        unblock();
        if (!blockers.length) {
          window2.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
function promptBeforeUnload(event) {
  event.preventDefault();
  event.returnValue = "";
}
function createEvents() {
  var handlers = [];
  return {
    get length() {
      return handlers.length;
    },
    push: function push(fn) {
      handlers.push(fn);
      return function() {
        handlers = handlers.filter(function(handler) {
          return handler !== fn;
        });
      };
    },
    call: function call(arg) {
      handlers.forEach(function(fn) {
        return fn && fn(arg);
      });
    }
  };
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function createPath(_ref) {
  var _ref$pathname = _ref.pathname, pathname = _ref$pathname === void 0 ? "/" : _ref$pathname, _ref$search = _ref.search, search = _ref$search === void 0 ? "" : _ref$search, _ref$hash = _ref.hash, hash = _ref$hash === void 0 ? "" : _ref$hash;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path2) {
  var parsedPath = {};
  if (path2) {
    var hashIndex = path2.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path2.substr(hashIndex);
      path2 = path2.substr(0, hashIndex);
    }
    var searchIndex = path2.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path2.substr(searchIndex);
      path2 = path2.substr(0, searchIndex);
    }
    if (path2) {
      parsedPath.pathname = path2;
    }
  }
  return parsedPath;
}
/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const NavigationContext = /* @__PURE__ */ react.exports.createContext(null);
const LocationContext = /* @__PURE__ */ react.exports.createContext(null);
const RouteContext = /* @__PURE__ */ react.exports.createContext({
  outlet: null,
  matches: []
});
function invariant(cond, message) {
  if (!cond)
    throw new Error(message);
}
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    matches = matchRouteBranch(branches[i2], pathname);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  routes.forEach((route, index) => {
    let meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      !meta.relativePath.startsWith(parentPath) ? invariant(false) : void 0;
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path2 = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      !(route.index !== true) ? invariant(false) : void 0;
      flattenRoutes(route.children, branches, routesMeta, path2);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path: path2,
      score: computeScore(path2, route.index),
      routesMeta
    });
  });
  return branches;
}
function rankRouteBranches(branches) {
  branches.sort((a2, b) => a2.score !== b.score ? b.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path2, index) {
  let segments = path2.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score2, segment) => score2 + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b) {
  let siblings = a2.length === b.length && a2.slice(0, -1).every((n2, i2) => n2 === b[i2]);
  return siblings ? a2[a2.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "");
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path2, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  let paramNames = [];
  let regexpSource = "^" + path2.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });
  if (path2.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path2 === "*" || path2 === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else {
    regexpSource += end ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)";
  }
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function resolveTo(toArg, routePathnames, locationPathname) {
  let to = typeof toArg === "string" ? parsePath(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path2 = resolvePath(to, from);
  if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path2.pathname.endsWith("/")) {
    path2.pathname += "/";
  }
  return path2;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let nextChar = pathname.charAt(basename.length);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(basename.length) || "/";
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function useHref(to) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to);
  let joinedPathname = pathname;
  if (basename !== "/") {
    let toPathname = getToPathname(to);
    let endsWithSlash = toPathname != null && toPathname.endsWith("/");
    joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return react.exports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return react.exports.useContext(LocationContext).location;
}
function useNavigate() {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = react.exports.useContext(NavigationContext);
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  let activeRef = react.exports.useRef(false);
  react.exports.useEffect(() => {
    activeRef.current = true;
  });
  let navigate = react.exports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path2 = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
    if (basename !== "/") {
      path2.pathname = joinPaths([basename, path2.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path2, options.state);
  }, [basename, navigator2, routePathnamesJson, locationPathname]);
  return navigate;
}
function useResolvedPath(to) {
  let {
    matches
  } = react.exports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  return react.exports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
}
function useRoutes(routes, locationArg) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    matches: parentMatches
  } = react.exports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
  })), parentMatches);
}
function _renderMatches(matches, parentMatches) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (matches == null)
    return null;
  return matches.reduceRight((outlet, match, index) => {
    return /* @__PURE__ */ react.exports.createElement(RouteContext.Provider, {
      children: match.route.element !== void 0 ? match.route.element : outlet,
      value: {
        outlet,
        matches: parentMatches.concat(matches.slice(0, index + 1))
      }
    });
  }, null);
}
function Route(_props) {
  invariant(false);
}
function Router(_ref3) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false
  } = _ref3;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = normalizePathname(basenameProp);
  let navigationContext = react.exports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let location = react.exports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  if (location == null) {
    return null;
  }
  return /* @__PURE__ */ react.exports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ react.exports.createElement(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
function Routes(_ref4) {
  let {
    children,
    location
  } = _ref4;
  return useRoutes(createRoutesFromChildren(children), location);
}
function createRoutesFromChildren(children) {
  let routes = [];
  react.exports.Children.forEach(children, (element) => {
    if (!/* @__PURE__ */ react.exports.isValidElement(element)) {
      return;
    }
    if (element.type === react.exports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    let route = {
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$W() {
  _extends$W = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$W.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
const _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window: window2
  } = _ref;
  let historyRef = react.exports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2
    });
  }
  let history = historyRef.current;
  let [state, setState] = react.exports.useState({
    action: history.action,
    location: history.location
  });
  react.exports.useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ react.exports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
const Link = /* @__PURE__ */ react.exports.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    reloadDocument,
    replace = false,
    state,
    target,
    to
  } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let href = useHref(to);
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented && !reloadDocument) {
      internalOnClick(event);
    }
  }
  return /* @__PURE__ */ react.exports.createElement("a", _extends$W({}, rest, {
    href,
    onClick: handleClick,
    ref,
    target
  }));
});
const NavLink = /* @__PURE__ */ react.exports.forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    children
  } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  let location = useLocation();
  let path2 = useResolvedPath(to);
  let locationPathname = location.pathname;
  let toPathname = path2.pathname;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive
    });
  } else {
    className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp({
    isActive
  }) : styleProp;
  return /* @__PURE__ */ react.exports.createElement(Link, _extends$W({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to
  }), typeof children === "function" ? children({
    isActive
  }) : children);
});
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path2 = useResolvedPath(to);
  return react.exports.useCallback((event) => {
    if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || createPath(location) === createPath(path2);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path2, replaceProp, state, target, to]);
}
var main = /* @__PURE__ */ (() => '@import url(\'https://rsms.me/inter/inter.css\');\n\n/*\n! tailwindcss v3.1.3 | MIT License | https://tailwindcss.com\n*/\n\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: \'\';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user\'s configured `sans` font-family by default.\n*/\n\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user\'s configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\n[type=\'button\'],\n[type=\'reset\'],\n[type=\'submit\'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type=\'search\'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user\'s configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role="button"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don\'t get the pointer cursor.\n*/\n\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\nhtml{\n  --tw-bg-opacity: 1;\n  background-color: rgb(30 41 59 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n    -webkit-tap-highlight-color: transparent;\n    padding-bottom: env(safe-area-inset-bottom);\n}\n\nbody {\n    touch-actions: none;\n    -ms-scroll-chaining: none;\n        overscroll-behavior: none;\n  }\n\ninput:focus,\n  select:focus,\n  textarea:focus,\n  button:focus {\n    outline: none;\n  }\n\nh1{\n  margin-bottom: 1.25rem;\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n\nh2{\n  margin-bottom: 0.5rem;\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\nbutton{\n  box-sizing: content-box;\n  height: 1.5rem;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 68 68 / var(--tw-bg-opacity));\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\nbutton:hover{\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\nbutton:active{\n  --tw-scale-x: .95;\n  --tw-scale-y: .95;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\nbutton:disabled{\n  cursor: default;\n  --tw-bg-opacity: 1;\n  background-color: rgb(148 163 184 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(100 116 139 / var(--tw-text-opacity));\n}\n\nform{\n  width: 24rem;\n}\n\nlabel{\n  display: flex;\n  flex-direction: column;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\ninput[type="text"],  input[type="number"]{\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  box-sizing: content-box;\n  height: 1.5rem;\n  border-radius: 0.375rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n/* Chrome, Safari, Edge, Opera */\n\ninput::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n/* Firefox */\n\ninput[type=number] {\n    -moz-appearance: textfield;\n  }\n\ntable{\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  display: block;\n  border-radius: 0.375rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n  padding: 0.5rem;\n  text-align: left;\n}\n\nth{\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n\ntd{\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n\na{\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n*, ::before, ::after{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::-webkit-backdrop{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n::backdrop{\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n\n.card{\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  border-radius: 0.5rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n  padding: 1rem;\n}\n\n.card > .card{\n  margin-top: 1rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.block-code{\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  box-sizing: content-box;\n  display: block;\n  white-space: pre;\n  border-radius: 0.375rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n  padding: 0.5rem;\n}\n\n.fixed{\n  position: fixed;\n}\n\n.relative{\n  position: relative;\n}\n\n.m-2{\n  margin: 0.5rem;\n}\n\n.mt-2{\n  margin-top: 0.5rem;\n}\n\n.mb-4{\n  margin-bottom: 1rem;\n}\n\n.flex{\n  display: flex;\n}\n\n.table{\n  display: table;\n}\n\n.grid{\n  display: grid;\n}\n\n.h-full{\n  height: 100%;\n}\n\n.h-8{\n  height: 2rem;\n}\n\n.w-20{\n  width: 5rem;\n}\n\n.w-8{\n  width: 2rem;\n}\n\n.w-4{\n  width: 1rem;\n}\n\n.cursor-pointer{\n  cursor: pointer;\n}\n\n.grid-rows-2{\n  grid-template-rows: repeat(2, minmax(0, 1fr));\n}\n\n.flex-row{\n  flex-direction: row;\n}\n\n.flex-col{\n  flex-direction: column;\n}\n\n.flex-wrap{\n  flex-wrap: wrap;\n}\n\n.items-center{\n  align-items: center;\n}\n\n.justify-center{\n  justify-content: center;\n}\n\n.gap-y-5{\n  row-gap: 1.25rem;\n}\n\n.rounded-md{\n  border-radius: 0.375rem;\n}\n\n.bg-slate-700{\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n\n.bg-slate-600{\n  --tw-bg-opacity: 1;\n  background-color: rgb(71 85 105 / var(--tw-bg-opacity));\n}\n\n.p-2{\n  padding: 0.5rem;\n}\n\n.py-5{\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n}\n\n.pl-24{\n  padding-left: 6rem;\n}\n\n.pr-4{\n  padding-right: 1rem;\n}\n\n.text-sm{\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-red-500{\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity));\n}\n\n.text-slate-400{\n  --tw-text-opacity: 1;\n  color: rgb(148 163 184 / var(--tw-text-opacity));\n}\n\n.filter{\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n\n.transition-transform{\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.hover\\:scale-105:hover{\n  --tw-scale-x: 1.05;\n  --tw-scale-y: 1.05;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n\n.active\\:scale-95:active{\n  --tw-scale-x: .95;\n  --tw-scale-y: .95;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n')();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react.exports, k$2 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n$2 = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
function q$2(c2, a2, g) {
  var b, d = {}, e3 = null, h2 = null;
  g !== void 0 && (e3 = "" + g);
  a2.key !== void 0 && (e3 = "" + a2.key);
  a2.ref !== void 0 && (h2 = a2.ref);
  for (b in a2)
    m$1.call(a2, b) && !p$2.hasOwnProperty(b) && (d[b] = a2[b]);
  if (c2 && c2.defaultProps)
    for (b in a2 = c2.defaultProps, a2)
      d[b] === void 0 && (d[b] = a2[b]);
  return { $$typeof: k$2, type: c2, key: e3, ref: h2, props: d, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q$2;
reactJsxRuntime_production_min.jsxs = q$2;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
function HomeIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9z"
    })
  });
}
function ChartIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M11 2.05V13h10.95c-.501 5.053-4.765 9-9.95 9c-5.523 0-10-4.477-10-10c0-5.185 3.947-9.449 9-9.95zm2-1.507C18.553 1.02 22.979 5.447 23.457 11H13V.543z"
    })
  });
}
function LeftArrowIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414z"
    })
  });
}
function CodeIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M4 18v-3.7a1.5 1.5 0 0 0-1.5-1.5H2v-1.6h.5A1.5 1.5 0 0 0 4 9.7V6a3 3 0 0 1 3-3h1v2H7a1 1 0 0 0-1 1v4.1A2 2 0 0 1 4.626 12A2 2 0 0 1 6 13.9V18a1 1 0 0 0 1 1h1v2H7a3 3 0 0 1-3-3zm16-3.7V18a3 3 0 0 1-3 3h-1v-2h1a1 1 0 0 0 1-1v-4.1a2 2 0 0 1 1.374-1.9A2 2 0 0 1 18 10.1V6a1 1 0 0 0-1-1h-1V3h1a3 3 0 0 1 3 3v3.7a1.5 1.5 0 0 0 1.5 1.5h.5v1.6h-.5a1.5 1.5 0 0 0-1.5 1.5z"
    })
  });
}
function MapIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"
    })
  });
}
function SettingsIcon(props) {
  return /* @__PURE__ */ jsx("svg", {
    "aria-hidden": "true",
    role: "img",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876A3.993 3.993 0 0 0 20 12a3.99 3.99 0 0 0 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543a3.993 3.993 0 0 0-3.456.261a3.993 3.993 0 0 0-1.954 2.86a9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121A3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124a10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"
    })
  });
}
var propTypes$b = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim2(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim2.isRequired = shim2;
  function getShim() {
    return shim2;
  }
  var ReactPropTypes = {
    array: shim2,
    bigint: shim2,
    bool: shim2,
    func: shim2,
    number: shim2,
    object: shim2,
    string: shim2,
    symbol: shim2,
    any: shim2,
    arrayOf: getShim,
    element: shim2,
    elementType: shim2,
    instanceOf: getShim,
    node: shim2,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes$b.exports = factoryWithThrowingShims();
}
var PropTypes = propTypes$b.exports;
function constant$5(x2) {
  return function() {
    return x2;
  };
}
function x$1(d) {
  return d[0];
}
function y$1(d) {
  return d[1];
}
function RedBlackTree() {
  this._ = null;
}
function RedBlackNode(node) {
  node.U = node.C = node.L = node.R = node.P = node.N = null;
}
RedBlackTree.prototype = {
  constructor: RedBlackTree,
  insert: function(after, node) {
    var parent, grandpa, uncle;
    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N)
        after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L)
          after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;
    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },
  remove: function(node) {
    if (node.N)
      node.N.P = node.P;
    if (node.P)
      node.P.N = node.N;
    node.N = node.P = null;
    var parent = node.U, sibling, left = node.L, right = node.R, next, red;
    if (!left)
      next = right;
    else if (!right)
      next = left;
    else
      next = RedBlackFirst(right);
    if (parent) {
      if (parent.L === node)
        parent.L = next;
      else
        parent.R = next;
    } else {
      this._ = next;
    }
    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }
    if (node)
      node.U = parent;
    if (red)
      return;
    if (node && node.C) {
      node.C = false;
      return;
    }
    do {
      if (node === this._)
        break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);
    if (node)
      node.C = false;
  }
};
function RedBlackRotateLeft(tree, node) {
  var p2 = node, q2 = node.R, parent = p2.U;
  if (parent) {
    if (parent.L === p2)
      parent.L = q2;
    else
      parent.R = q2;
  } else {
    tree._ = q2;
  }
  q2.U = parent;
  p2.U = q2;
  p2.R = q2.L;
  if (p2.R)
    p2.R.U = p2;
  q2.L = p2;
}
function RedBlackRotateRight(tree, node) {
  var p2 = node, q2 = node.L, parent = p2.U;
  if (parent) {
    if (parent.L === p2)
      parent.L = q2;
    else
      parent.R = q2;
  } else {
    tree._ = q2;
  }
  q2.U = parent;
  p2.U = q2;
  p2.L = q2.R;
  if (p2.L)
    p2.L.U = p2;
  q2.R = p2;
}
function RedBlackFirst(node) {
  while (node.L)
    node = node.L;
  return node;
}
function createEdge(left, right, v0, v1) {
  var edge = [null, null], index = edges.push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0)
    setEdgeEnd(edge, left, right, v0);
  if (v1)
    setEdgeEnd(edge, right, left, v1);
  cells[left.index].halfedges.push(index);
  cells[right.index].halfedges.push(index);
  return edge;
}
function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}
function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}
function clipEdge(edge, x02, y02, x12, y12) {
  var a2 = edge[0], b = edge[1], ax = a2[0], ay = a2[1], bx = b[0], by = b[1], t02 = 0, t12 = 1, dx = bx - ax, dy = by - ay, r2;
  r2 = x02 - ax;
  if (!dx && r2 > 0)
    return;
  r2 /= dx;
  if (dx < 0) {
    if (r2 < t02)
      return;
    if (r2 < t12)
      t12 = r2;
  } else if (dx > 0) {
    if (r2 > t12)
      return;
    if (r2 > t02)
      t02 = r2;
  }
  r2 = x12 - ax;
  if (!dx && r2 < 0)
    return;
  r2 /= dx;
  if (dx < 0) {
    if (r2 > t12)
      return;
    if (r2 > t02)
      t02 = r2;
  } else if (dx > 0) {
    if (r2 < t02)
      return;
    if (r2 < t12)
      t12 = r2;
  }
  r2 = y02 - ay;
  if (!dy && r2 > 0)
    return;
  r2 /= dy;
  if (dy < 0) {
    if (r2 < t02)
      return;
    if (r2 < t12)
      t12 = r2;
  } else if (dy > 0) {
    if (r2 > t12)
      return;
    if (r2 > t02)
      t02 = r2;
  }
  r2 = y12 - ay;
  if (!dy && r2 < 0)
    return;
  r2 /= dy;
  if (dy < 0) {
    if (r2 > t12)
      return;
    if (r2 > t02)
      t02 = r2;
  } else if (dy > 0) {
    if (r2 < t02)
      return;
    if (r2 < t12)
      t12 = r2;
  }
  if (!(t02 > 0) && !(t12 < 1))
    return true;
  if (t02 > 0)
    edge[0] = [ax + t02 * dx, ay + t02 * dy];
  if (t12 < 1)
    edge[1] = [ax + t12 * dx, ay + t12 * dy];
  return true;
}
function connectEdge(edge, x02, y02, x12, y12) {
  var v1 = edge[1];
  if (v1)
    return true;
  var v0 = edge[0], left = edge.left, right = edge.right, lx = left[0], ly = left[1], rx = right[0], ry = right[1], fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb2;
  if (ry === ly) {
    if (fx < x02 || fx >= x12)
      return;
    if (lx > rx) {
      if (!v0)
        v0 = [fx, y02];
      else if (v0[1] >= y12)
        return;
      v1 = [fx, y12];
    } else {
      if (!v0)
        v0 = [fx, y12];
      else if (v0[1] < y02)
        return;
      v1 = [fx, y02];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb2 = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0)
          v0 = [(y02 - fb2) / fm, y02];
        else if (v0[1] >= y12)
          return;
        v1 = [(y12 - fb2) / fm, y12];
      } else {
        if (!v0)
          v0 = [(y12 - fb2) / fm, y12];
        else if (v0[1] < y02)
          return;
        v1 = [(y02 - fb2) / fm, y02];
      }
    } else {
      if (ly < ry) {
        if (!v0)
          v0 = [x02, fm * x02 + fb2];
        else if (v0[0] >= x12)
          return;
        v1 = [x12, fm * x12 + fb2];
      } else {
        if (!v0)
          v0 = [x12, fm * x12 + fb2];
        else if (v0[0] < x02)
          return;
        v1 = [x02, fm * x02 + fb2];
      }
    }
  }
  edge[0] = v0;
  edge[1] = v1;
  return true;
}
function clipEdges(x02, y02, x12, y12) {
  var i2 = edges.length, edge;
  while (i2--) {
    if (!connectEdge(edge = edges[i2], x02, y02, x12, y12) || !clipEdge(edge, x02, y02, x12, y12) || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$2 || Math.abs(edge[0][1] - edge[1][1]) > epsilon$2)) {
      delete edges[i2];
    }
  }
}
function createCell(site) {
  return cells[site.index] = {
    site,
    halfedges: []
  };
}
function cellHalfedgeAngle(cell, edge) {
  var site = cell.site, va2 = edge.left, vb2 = edge.right;
  if (site === vb2)
    vb2 = va2, va2 = site;
  if (vb2)
    return Math.atan2(vb2[1] - va2[1], vb2[0] - va2[0]);
  if (site === va2)
    va2 = edge[1], vb2 = edge[0];
  else
    va2 = edge[0], vb2 = edge[1];
  return Math.atan2(va2[0] - vb2[0], vb2[1] - va2[1]);
}
function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}
function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}
function sortCellHalfedges() {
  for (var i2 = 0, n2 = cells.length, cell, halfedges, j, m2; i2 < n2; ++i2) {
    if ((cell = cells[i2]) && (m2 = (halfedges = cell.halfedges).length)) {
      var index = new Array(m2), array2 = new Array(m2);
      for (j = 0; j < m2; ++j)
        index[j] = j, array2[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      index.sort(function(i3, j2) {
        return array2[j2] - array2[i3];
      });
      for (j = 0; j < m2; ++j)
        array2[j] = halfedges[index[j]];
      for (j = 0; j < m2; ++j)
        halfedges[j] = array2[j];
    }
  }
}
function clipCells(x02, y02, x12, y12) {
  var nCells = cells.length, iCell, cell, site, iHalfedge, halfedges, nHalfedges, start, startX, startY, end, endX, endY, cover = true;
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;
      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > epsilon$2 || Math.abs(endY - startY) > epsilon$2) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end, Math.abs(endX - x02) < epsilon$2 && y12 - endY > epsilon$2 ? [x02, Math.abs(startX - x02) < epsilon$2 ? startY : y12] : Math.abs(endY - y12) < epsilon$2 && x12 - endX > epsilon$2 ? [Math.abs(startY - y12) < epsilon$2 ? startX : x12, y12] : Math.abs(endX - x12) < epsilon$2 && endY - y02 > epsilon$2 ? [x12, Math.abs(startX - x12) < epsilon$2 ? startY : y02] : Math.abs(endY - y02) < epsilon$2 && endX - x02 > epsilon$2 ? [Math.abs(startY - y02) < epsilon$2 ? startX : x02, y02] : null)) - 1);
          ++nHalfedges;
        }
      }
      if (nHalfedges)
        cover = false;
    }
  }
  if (cover) {
    var dx, dy, d2, dc2 = Infinity;
    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x02;
        dy = site[1] - y02;
        d2 = dx * dx + dy * dy;
        if (d2 < dc2)
          dc2 = d2, cover = cell;
      }
    }
    if (cover) {
      var v00 = [x02, y02], v01 = [x02, y12], v11 = [x12, y12], v10 = [x12, y02];
      cover.halfedges.push(edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1, edges.push(createBorderEdge(site, v01, v11)) - 1, edges.push(createBorderEdge(site, v11, v10)) - 1, edges.push(createBorderEdge(site, v10, v00)) - 1);
    }
  }
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}
var circlePool = [];
var firstCircle;
function Circle() {
  RedBlackNode(this);
  this.x = this.y = this.arc = this.site = this.cy = null;
}
function attachCircle(arc) {
  var lArc = arc.P, rArc = arc.N;
  if (!lArc || !rArc)
    return;
  var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
  if (lSite === rSite)
    return;
  var bx = cSite[0], by = cSite[1], ax = lSite[0] - bx, ay = lSite[1] - by, cx = rSite[0] - bx, cy = rSite[1] - by;
  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon2)
    return;
  var ha2 = ax * ax + ay * ay, hc2 = cx * cx + cy * cy, x2 = (cy * ha2 - ay * hc2) / d, y2 = (ax * hc2 - cx * ha2) / d;
  var circle2 = circlePool.pop() || new Circle();
  circle2.arc = arc;
  circle2.site = cSite;
  circle2.x = x2 + bx;
  circle2.y = (circle2.cy = y2 + by) + Math.sqrt(x2 * x2 + y2 * y2);
  arc.circle = circle2;
  var before = null, node = circles._;
  while (node) {
    if (circle2.y < node.y || circle2.y === node.y && circle2.x <= node.x) {
      if (node.L)
        node = node.L;
      else {
        before = node.P;
        break;
      }
    } else {
      if (node.R)
        node = node.R;
      else {
        before = node;
        break;
      }
    }
  }
  circles.insert(before, circle2);
  if (!before)
    firstCircle = circle2;
}
function detachCircle(arc) {
  var circle2 = arc.circle;
  if (circle2) {
    if (!circle2.P)
      firstCircle = circle2.N;
    circles.remove(circle2);
    circlePool.push(circle2);
    RedBlackNode(circle2);
    arc.circle = null;
  }
}
var beachPool = [];
function Beach() {
  RedBlackNode(this);
  this.edge = this.site = this.circle = null;
}
function createBeach(site) {
  var beach = beachPool.pop() || new Beach();
  beach.site = site;
  return beach;
}
function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}
function removeBeach(beach) {
  var circle2 = beach.circle, x2 = circle2.x, y2 = circle2.cy, vertex = [x2, y2], previous = beach.P, next = beach.N, disappearing = [beach];
  detachBeach(beach);
  var lArc = previous;
  while (lArc.circle && Math.abs(x2 - lArc.circle.x) < epsilon$2 && Math.abs(y2 - lArc.circle.cy) < epsilon$2) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }
  disappearing.unshift(lArc);
  detachCircle(lArc);
  var rArc = next;
  while (rArc.circle && Math.abs(x2 - rArc.circle.x) < epsilon$2 && Math.abs(y2 - rArc.circle.cy) < epsilon$2) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }
  disappearing.push(rArc);
  detachCircle(rArc);
  var nArcs = disappearing.length, iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }
  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}
function addBeach(site) {
  var x2 = site[0], directrix = site[1], lArc, rArc, dxl, dxr, node = beaches._;
  while (node) {
    dxl = leftBreakPoint(node, directrix) - x2;
    if (dxl > epsilon$2)
      node = node.L;
    else {
      dxr = x2 - rightBreakPoint(node, directrix);
      if (dxr > epsilon$2) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -epsilon$2) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon$2) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }
  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);
  if (!lArc && !rArc)
    return;
  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }
  if (!rArc) {
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  }
  detachCircle(lArc);
  detachCircle(rArc);
  var lSite = lArc.site, ax = lSite[0], ay = lSite[1], bx = site[0] - ax, by = site[1] - ay, rSite = rArc.site, cx = rSite[0] - ax, cy = rSite[1] - ay, d = 2 * (bx * cy - by * cx), hb2 = bx * bx + by * by, hc2 = cx * cx + cy * cy, vertex = [(cy * hb2 - by * hc2) / d + ax, (bx * hc2 - cx * hb2) / d + ay];
  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}
function leftBreakPoint(arc, directrix) {
  var site = arc.site, rfocx = site[0], rfocy = site[1], pby2 = rfocy - directrix;
  if (!pby2)
    return rfocx;
  var lArc = arc.P;
  if (!lArc)
    return -Infinity;
  site = lArc.site;
  var lfocx = site[0], lfocy = site[1], plby2 = lfocy - directrix;
  if (!plby2)
    return lfocx;
  var hl2 = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl2 / plby2;
  if (aby2)
    return (-b + Math.sqrt(b * b - 2 * aby2 * (hl2 * hl2 / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
  return (rfocx + lfocx) / 2;
}
function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc)
    return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}
var epsilon$2 = 1e-6;
var epsilon2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;
function triangleArea(a2, b, c2) {
  return (a2[0] - c2[0]) * (b[1] - a2[1]) - (a2[0] - b[0]) * (c2[1] - a2[1]);
}
function lexicographic(a2, b) {
  return b[1] - a2[1] || b[0] - a2[0];
}
function Diagram(sites, extent2) {
  var site = sites.sort(lexicographic).pop(), x2, y2, circle2;
  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree();
  circles = new RedBlackTree();
  while (true) {
    circle2 = firstCircle;
    if (site && (!circle2 || site[1] < circle2.y || site[1] === circle2.y && site[0] < circle2.x)) {
      if (site[0] !== x2 || site[1] !== y2) {
        addBeach(site);
        x2 = site[0], y2 = site[1];
      }
      site = sites.pop();
    } else if (circle2) {
      removeBeach(circle2.arc);
    } else {
      break;
    }
  }
  sortCellHalfedges();
  if (extent2) {
    var x02 = +extent2[0][0], y02 = +extent2[0][1], x12 = +extent2[1][0], y12 = +extent2[1][1];
    clipEdges(x02, y02, x12, y12);
    clipCells(x02, y02, x12, y12);
  }
  this.edges = edges;
  this.cells = cells;
  beaches = circles = edges = cells = null;
}
Diagram.prototype = {
  constructor: Diagram,
  polygons: function() {
    var edges2 = this.edges;
    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i2) {
        return cellHalfedgeStart(cell, edges2[i2]);
      });
      polygon.data = cell.site.data;
      return polygon;
    });
  },
  triangles: function() {
    var triangles = [], edges2 = this.edges;
    this.cells.forEach(function(cell, i2) {
      if (!(m2 = (halfedges = cell.halfedges).length))
        return;
      var site = cell.site, halfedges, j = -1, m2, s0, e1 = edges2[halfedges[m2 - 1]], s1 = e1.left === site ? e1.right : e1.left;
      while (++j < m2) {
        s0 = s1;
        e1 = edges2[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i2 < s0.index && i2 < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });
    return triangles;
  },
  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },
  find: function(x2, y2, radius) {
    var that = this, i0, i1 = that._found || 0, n2 = that.cells.length, cell;
    while (!(cell = that.cells[i1]))
      if (++i1 >= n2)
        return null;
    var dx = x2 - cell.site[0], dy = y2 - cell.site[1], d2 = dx * dx + dy * dy;
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e3) {
        var edge = that.edges[e3], v2 = edge.left;
        if ((v2 === cell.site || !v2) && !(v2 = edge.right))
          return;
        var vx = x2 - v2[0], vy = y2 - v2[1], v22 = vx * vx + vy * vy;
        if (v22 < d2)
          d2 = v22, i1 = v2.index;
      });
    } while (i1 !== null);
    that._found = i0;
    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};
function voronoi() {
  var x2 = x$1, y2 = y$1, extent2 = null;
  function voronoi2(data) {
    return new Diagram(data.map(function(d, i2) {
      var s2 = [Math.round(x2(d, i2, data) / epsilon$2) * epsilon$2, Math.round(y2(d, i2, data) / epsilon$2) * epsilon$2];
      s2.index = i2;
      s2.data = d;
      return s2;
    }), extent2);
  }
  voronoi2.polygons = function(data) {
    return voronoi2(data).polygons();
  };
  voronoi2.links = function(data) {
    return voronoi2(data).links();
  };
  voronoi2.triangles = function(data) {
    return voronoi2(data).triangles();
  };
  voronoi2.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant$5(+_), voronoi2) : x2;
  };
  voronoi2.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant$5(+_), voronoi2) : y2;
  };
  voronoi2.extent = function(_) {
    return arguments.length ? (extent2 = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi2) : extent2 && [[extent2[0][0], extent2[0][1]], [extent2[1][0], extent2[1][1]]];
  };
  voronoi2.size = function(_) {
    return arguments.length ? (extent2 = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi2) : extent2 && [extent2[1][0] - extent2[0][0], extent2[1][1] - extent2[0][1]];
  };
  return voronoi2;
}
function define$3(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define$3(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m2, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m2 = reHex.exec(format2)) ? (l2 = m2[1].length, m2 = parseInt(m2[1], 16), l2 === 6 ? rgbn(m2) : l2 === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l2 === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l2 === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r2, g, b, a2) {
  if (a2 <= 0)
    r2 = g = b = NaN;
  return new Rgb(r2, g, b, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r2, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r2, g, b, opacity) {
  this.r = +r2;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define$3(Rgb, rgb$1, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a2 = this.opacity;
  a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
  return (a2 === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a2 === 1 ? ")" : ", " + a2 + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s2, l2, a2) {
  if (a2 <= 0)
    h2 = s2 = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1)
    h2 = s2 = NaN;
  else if (s2 <= 0)
    h2 = NaN;
  return new Hsl(h2, s2, l2, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r2, g, b), max2 = Math.max(r2, g, b), h2 = NaN, s2 = max2 - min2, l2 = (max2 + min2) / 2;
  if (s2) {
    if (r2 === max2)
      h2 = (g - b) / s2 + (g < b) * 6;
    else if (g === max2)
      h2 = (b - r2) / s2 + 2;
    else
      h2 = (r2 - g) / s2 + 4;
    s2 /= l2 < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h2 *= 60;
  } else {
    s2 = l2 > 0 && l2 < 1 ? 0 : h2;
  }
  return new Hsl(h2, s2, l2, o.opacity);
}
function hsl(h2, s2, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s2, l2, opacity == null ? 1 : opacity);
}
function Hsl(h2, s2, l2, opacity) {
  this.h = +h2;
  this.s = +s2;
  this.l = +l2;
  this.opacity = +opacity;
}
define$3(Hsl, hsl, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb: function() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s2, m1 = 2 * l2 - m2;
    return new Rgb(hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2), hsl2rgb(h2, m1, m2), hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2), this.opacity);
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a2 = this.opacity;
    a2 = isNaN(a2) ? 1 : Math.max(0, Math.min(1, a2));
    return (a2 === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a2 === 1 ? ")" : ", " + a2 + ")");
  }
}));
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;
var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix)
    return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb))
    o = rgbConvert(o);
  var r2 = o.r / 255, g = o.g / 255, b = o.b / 255, l2 = (BC_DA * b + ED * r2 - EB * g) / (BC_DA + ED - EB), bl2 = b - l2, k2 = (E * (g - l2) - C * bl2) / D, s2 = Math.sqrt(k2 * k2 + bl2 * bl2) / (E * l2 * (1 - l2)), h2 = s2 ? Math.atan2(k2, bl2) * rad2deg - 120 : NaN;
  return new Cubehelix(h2 < 0 ? h2 + 360 : h2, s2, l2, o.opacity);
}
function cubehelix$1(h2, s2, l2, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h2) : new Cubehelix(h2, s2, l2, opacity == null ? 1 : opacity);
}
function Cubehelix(h2, s2, l2, opacity) {
  this.h = +h2;
  this.s = +s2;
  this.l = +l2;
  this.opacity = +opacity;
}
define$3(Cubehelix, cubehelix$1, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Cubehelix(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb: function() {
    var h2 = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad, l2 = +this.l, a2 = isNaN(this.s) ? 0 : this.s * l2 * (1 - l2), cosh = Math.cos(h2), sinh = Math.sin(h2);
    return new Rgb(255 * (l2 + a2 * (A * cosh + B * sinh)), 255 * (l2 + a2 * (C * cosh + D * sinh)), 255 * (l2 + a2 * (E * cosh)), this.opacity);
  }
}));
function constant$4(x2) {
  return function() {
    return x2;
  };
}
function linear$1(a2, d) {
  return function(t2) {
    return a2 + t2 * d;
  };
}
function exponential(a2, b, y2) {
  return a2 = Math.pow(a2, y2), b = Math.pow(b, y2) - a2, y2 = 1 / y2, function(t2) {
    return Math.pow(a2 + t2 * b, y2);
  };
}
function hue(a2, b) {
  var d = b - a2;
  return d ? linear$1(a2, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$4(isNaN(a2) ? b : a2);
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b) {
    return b - a2 ? exponential(a2, b, y2) : constant$4(isNaN(a2) ? b : a2);
  };
}
function nogamma(a2, b) {
  var d = b - a2;
  return d ? linear$1(a2, d) : constant$4(isNaN(a2) ? b : a2);
}
var rgb = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r2 = color2((start = rgb$1(start)).r, (end = rgb$1(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t2) {
      start.r = r2(t2);
      start.g = g(t2);
      start.b = b(t2);
      start.opacity = opacity(t2);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function numberArray(a2, b) {
  if (!b)
    b = [];
  var n2 = a2 ? Math.min(b.length, a2.length) : 0, c2 = b.slice(), i2;
  return function(t2) {
    for (i2 = 0; i2 < n2; ++i2)
      c2[i2] = a2[i2] * (1 - t2) + b[i2] * t2;
    return c2;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function genericArray(a2, b) {
  var nb2 = b ? b.length : 0, na = a2 ? Math.min(nb2, a2.length) : 0, x2 = new Array(na), c2 = new Array(nb2), i2;
  for (i2 = 0; i2 < na; ++i2)
    x2[i2] = interpolate(a2[i2], b[i2]);
  for (; i2 < nb2; ++i2)
    c2[i2] = b[i2];
  return function(t2) {
    for (i2 = 0; i2 < na; ++i2)
      c2[i2] = x2[i2](t2);
    return c2;
  };
}
function date$1(a2, b) {
  var d = new Date();
  return a2 = +a2, b = +b, function(t2) {
    return d.setTime(a2 * (1 - t2) + b * t2), d;
  };
}
function reinterpolate$1(a2, b) {
  return a2 = +a2, b = +b, function(t2) {
    return a2 * (1 - t2) + b * t2;
  };
}
function object(a2, b) {
  var i2 = {}, c2 = {}, k2;
  if (a2 === null || typeof a2 !== "object")
    a2 = {};
  if (b === null || typeof b !== "object")
    b = {};
  for (k2 in b) {
    if (k2 in a2) {
      i2[k2] = interpolate(a2[k2], b[k2]);
    } else {
      c2[k2] = b[k2];
    }
  }
  return function(t2) {
    for (k2 in i2)
      c2[k2] = i2[k2](t2);
    return c2;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t2) {
    return b(t2) + "";
  };
}
function string(a2, b) {
  var bi2 = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i2 = -1, s2 = [], q2 = [];
  a2 = a2 + "", b = b + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi2) {
      bs = b.slice(bi2, bs);
      if (s2[i2])
        s2[i2] += bs;
      else
        s2[++i2] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i2])
        s2[i2] += bm;
      else
        s2[++i2] = bm;
    } else {
      s2[++i2] = null;
      q2.push({ i: i2, x: reinterpolate$1(am, bm) });
    }
    bi2 = reB.lastIndex;
  }
  if (bi2 < b.length) {
    bs = b.slice(bi2);
    if (s2[i2])
      s2[i2] += bs;
    else
      s2[++i2] = bs;
  }
  return s2.length < 2 ? q2[0] ? one(q2[0].x) : zero(b) : (b = q2.length, function(t2) {
    for (var i3 = 0, o; i3 < b; ++i3)
      s2[(o = q2[i3]).i] = o.x(t2);
    return s2.join("");
  });
}
function interpolate(a2, b) {
  var t2 = typeof b, c2;
  return b == null || t2 === "boolean" ? constant$4(b) : (t2 === "number" ? reinterpolate$1 : t2 === "string" ? (c2 = color(b)) ? (b = c2, rgb) : string : b instanceof color ? rgb : b instanceof Date ? date$1 : isNumberArray(b) ? numberArray : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : reinterpolate$1)(a2, b);
}
function interpolateRound(a2, b) {
  return a2 = +a2, b = +b, function(t2) {
    return Math.round(a2 * (1 - t2) + b * t2);
  };
}
function cubehelix(hue2) {
  return function cubehelixGamma(y2) {
    y2 = +y2;
    function cubehelix2(start, end) {
      var h2 = hue2((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h), s2 = nogamma(start.s, end.s), l2 = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
      return function(t2) {
        start.h = h2(t2);
        start.s = s2(t2);
        start.l = l2(Math.pow(t2, y2));
        start.opacity = opacity(t2);
        return start + "";
      };
    }
    cubehelix2.gamma = cubehelixGamma;
    return cubehelix2;
  }(1);
}
cubehelix(hue);
var cubehelixLong = cubehelix(nogamma);
var Motion$1 = { exports: {} };
var mapToZero = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = mapToZero2;
  function mapToZero2(obj) {
    var ret = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        ret[key] = 0;
      }
    }
    return ret;
  }
  module.exports = exports["default"];
})(mapToZero, mapToZero.exports);
var stripStyle = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = stripStyle2;
  function stripStyle2(style) {
    var ret = {};
    for (var key in style) {
      if (!Object.prototype.hasOwnProperty.call(style, key)) {
        continue;
      }
      ret[key] = typeof style[key] === "number" ? style[key] : style[key].val;
    }
    return ret;
  }
  module.exports = exports["default"];
})(stripStyle, stripStyle.exports);
var stepper = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = stepper2;
  var reusedTuple = [0, 0];
  function stepper2(secondPerFrame, x2, v2, destX, k2, b, precision) {
    var Fspring = -k2 * (x2 - destX);
    var Fdamper = -b * v2;
    var a2 = Fspring + Fdamper;
    var newV = v2 + a2 * secondPerFrame;
    var newX = x2 + newV * secondPerFrame;
    if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
      reusedTuple[0] = destX;
      reusedTuple[1] = 0;
      return reusedTuple;
    }
    reusedTuple[0] = newX;
    reusedTuple[1] = newV;
    return reusedTuple;
  }
  module.exports = exports["default"];
})(stepper, stepper.exports);
var performanceNow$1 = { exports: {} };
(function() {
  var getNanoSeconds, hrtime, loadTime;
  if (typeof performance !== "undefined" && performance !== null && performance.now) {
    performanceNow$1.exports = function() {
      return performance.now();
    };
  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
    performanceNow$1.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    performanceNow$1.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    performanceNow$1.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }
}).call(commonjsGlobal);
var raf$1 = { exports: {} };
var performanceNow = { exports: {} };
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
  if (typeof performance !== "undefined" && performance !== null && performance.now) {
    performanceNow.exports = function() {
      return performance.now();
    };
  } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
    performanceNow.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    performanceNow.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    performanceNow.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }
}).call(commonjsGlobal);
var now = performanceNow.exports, root$1 = typeof window === "undefined" ? commonjsGlobal : window, vendors = ["moz", "webkit"], suffix = "AnimationFrame", raf = root$1["request" + suffix], caf = root$1["cancel" + suffix] || root$1["cancelRequest" + suffix];
for (var i = 0; !raf && i < vendors.length; i++) {
  raf = root$1[vendors[i] + "Request" + suffix];
  caf = root$1[vendors[i] + "Cancel" + suffix] || root$1[vendors[i] + "CancelRequest" + suffix];
}
if (!raf || !caf) {
  var last = 0, id = 0, queue = [], frameDuration = 1e3 / 60;
  raf = function(callback) {
    if (queue.length === 0) {
      var _now = now(), next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function() {
        var cp = queue.slice(0);
        queue.length = 0;
        for (var i2 = 0; i2 < cp.length; i2++) {
          if (!cp[i2].cancelled) {
            try {
              cp[i2].callback(last);
            } catch (e3) {
              setTimeout(function() {
                throw e3;
              }, 0);
            }
          }
        }
      }, Math.round(next));
    }
    queue.push({
      handle: ++id,
      callback,
      cancelled: false
    });
    return id;
  };
  caf = function(handle) {
    for (var i2 = 0; i2 < queue.length; i2++) {
      if (queue[i2].handle === handle) {
        queue[i2].cancelled = true;
      }
    }
  };
}
raf$1.exports = function(fn) {
  return raf.call(root$1, fn);
};
raf$1.exports.cancel = function() {
  caf.apply(root$1, arguments);
};
raf$1.exports.polyfill = function(object2) {
  if (!object2) {
    object2 = root$1;
  }
  object2.requestAnimationFrame = raf;
  object2.cancelAnimationFrame = caf;
};
var shouldStopAnimation = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = shouldStopAnimation2;
  function shouldStopAnimation2(currentStyle, style, currentVelocity) {
    for (var key in style) {
      if (!Object.prototype.hasOwnProperty.call(style, key)) {
        continue;
      }
      if (currentVelocity[key] !== 0) {
        return false;
      }
      var styleValue = typeof style[key] === "number" ? style[key] : style[key].val;
      if (currentStyle[key] !== styleValue) {
        return false;
      }
    }
    return true;
  }
  module.exports = exports["default"];
})(shouldStopAnimation, shouldStopAnimation.exports);
(function(module, exports) {
  exports.__esModule = true;
  var _extends2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass2 = function() {
    function defineProperties2(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties2(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _mapToZero = mapToZero.exports;
  var _mapToZero2 = _interopRequireDefault(_mapToZero);
  var _stripStyle2 = stripStyle.exports;
  var _stripStyle22 = _interopRequireDefault(_stripStyle2);
  var _stepper3 = stepper.exports;
  var _stepper4 = _interopRequireDefault(_stepper3);
  var _performanceNow = performanceNow$1.exports;
  var _performanceNow2 = _interopRequireDefault(_performanceNow);
  var _raf = raf$1.exports;
  var _raf2 = _interopRequireDefault(_raf);
  var _shouldStopAnimation = shouldStopAnimation.exports;
  var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
  var _react = react.exports;
  var _react2 = _interopRequireDefault(_react);
  var _propTypes = propTypes$b.exports;
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var msPerFrame = 1e3 / 60;
  var Motion2 = function(_React$Component) {
    _inherits2(Motion3, _React$Component);
    _createClass2(Motion3, null, [{
      key: "propTypes",
      value: {
        defaultStyle: _propTypes2["default"].objectOf(_propTypes2["default"].number),
        style: _propTypes2["default"].objectOf(_propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].object])).isRequired,
        children: _propTypes2["default"].func.isRequired,
        onRest: _propTypes2["default"].func
      },
      enumerable: true
    }]);
    function Motion3(props) {
      var _this = this;
      _classCallCheck2(this, Motion3);
      _React$Component.call(this, props);
      this.wasAnimating = false;
      this.animationID = null;
      this.prevTime = 0;
      this.accumulatedTime = 0;
      this.unreadPropStyle = null;
      this.clearUnreadPropStyle = function(destStyle) {
        var dirty = false;
        var _state = _this.state;
        var currentStyle = _state.currentStyle;
        var currentVelocity = _state.currentVelocity;
        var lastIdealStyle = _state.lastIdealStyle;
        var lastIdealVelocity = _state.lastIdealVelocity;
        for (var key in destStyle) {
          if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
            continue;
          }
          var styleValue = destStyle[key];
          if (typeof styleValue === "number") {
            if (!dirty) {
              dirty = true;
              currentStyle = _extends2({}, currentStyle);
              currentVelocity = _extends2({}, currentVelocity);
              lastIdealStyle = _extends2({}, lastIdealStyle);
              lastIdealVelocity = _extends2({}, lastIdealVelocity);
            }
            currentStyle[key] = styleValue;
            currentVelocity[key] = 0;
            lastIdealStyle[key] = styleValue;
            lastIdealVelocity[key] = 0;
          }
        }
        if (dirty) {
          _this.setState({ currentStyle, currentVelocity, lastIdealStyle, lastIdealVelocity });
        }
      };
      this.startAnimationIfNecessary = function() {
        _this.animationID = _raf2["default"](function(timestamp) {
          var propsStyle = _this.props.style;
          if (_shouldStopAnimation2["default"](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
            if (_this.wasAnimating && _this.props.onRest) {
              _this.props.onRest();
            }
            _this.animationID = null;
            _this.wasAnimating = false;
            _this.accumulatedTime = 0;
            return;
          }
          _this.wasAnimating = true;
          var currentTime = timestamp || _performanceNow2["default"]();
          var timeDelta = currentTime - _this.prevTime;
          _this.prevTime = currentTime;
          _this.accumulatedTime = _this.accumulatedTime + timeDelta;
          if (_this.accumulatedTime > msPerFrame * 10) {
            _this.accumulatedTime = 0;
          }
          if (_this.accumulatedTime === 0) {
            _this.animationID = null;
            _this.startAnimationIfNecessary();
            return;
          }
          var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
          var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
          var newLastIdealStyle = {};
          var newLastIdealVelocity = {};
          var newCurrentStyle = {};
          var newCurrentVelocity = {};
          for (var key in propsStyle) {
            if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
              continue;
            }
            var styleValue = propsStyle[key];
            if (typeof styleValue === "number") {
              newCurrentStyle[key] = styleValue;
              newCurrentVelocity[key] = 0;
              newLastIdealStyle[key] = styleValue;
              newLastIdealVelocity[key] = 0;
            } else {
              var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
              var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
              for (var i2 = 0; i2 < framesToCatchUp; i2++) {
                var _stepper = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
                newLastIdealStyleValue = _stepper[0];
                newLastIdealVelocityValue = _stepper[1];
              }
              var _stepper2 = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
              var nextIdealX = _stepper2[0];
              var nextIdealV = _stepper2[1];
              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
              newLastIdealStyle[key] = newLastIdealStyleValue;
              newLastIdealVelocity[key] = newLastIdealVelocityValue;
            }
          }
          _this.animationID = null;
          _this.accumulatedTime -= framesToCatchUp * msPerFrame;
          _this.setState({
            currentStyle: newCurrentStyle,
            currentVelocity: newCurrentVelocity,
            lastIdealStyle: newLastIdealStyle,
            lastIdealVelocity: newLastIdealVelocity
          });
          _this.unreadPropStyle = null;
          _this.startAnimationIfNecessary();
        });
      };
      this.state = this.defaultState();
    }
    Motion3.prototype.defaultState = function defaultState() {
      var _props = this.props;
      var defaultStyle = _props.defaultStyle;
      var style = _props.style;
      var currentStyle = defaultStyle || _stripStyle22["default"](style);
      var currentVelocity = _mapToZero2["default"](currentStyle);
      return {
        currentStyle,
        currentVelocity,
        lastIdealStyle: currentStyle,
        lastIdealVelocity: currentVelocity
      };
    };
    Motion3.prototype.componentDidMount = function componentDidMount() {
      this.prevTime = _performanceNow2["default"]();
      this.startAnimationIfNecessary();
    };
    Motion3.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
      if (this.unreadPropStyle != null) {
        this.clearUnreadPropStyle(this.unreadPropStyle);
      }
      this.unreadPropStyle = props.style;
      if (this.animationID == null) {
        this.prevTime = _performanceNow2["default"]();
        this.startAnimationIfNecessary();
      }
    };
    Motion3.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.animationID != null) {
        _raf2["default"].cancel(this.animationID);
        this.animationID = null;
      }
    };
    Motion3.prototype.render = function render() {
      var renderedChildren = this.props.children(this.state.currentStyle);
      return renderedChildren && _react2["default"].Children.only(renderedChildren);
    };
    return Motion3;
  }(_react2["default"].Component);
  exports["default"] = Motion2;
  module.exports = exports["default"];
})(Motion$1, Motion$1.exports);
var StaggeredMotion = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var _extends2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass2 = function() {
    function defineProperties2(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties2(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _mapToZero = mapToZero.exports;
  var _mapToZero2 = _interopRequireDefault(_mapToZero);
  var _stripStyle2 = stripStyle.exports;
  var _stripStyle22 = _interopRequireDefault(_stripStyle2);
  var _stepper3 = stepper.exports;
  var _stepper4 = _interopRequireDefault(_stepper3);
  var _performanceNow = performanceNow$1.exports;
  var _performanceNow2 = _interopRequireDefault(_performanceNow);
  var _raf = raf$1.exports;
  var _raf2 = _interopRequireDefault(_raf);
  var _shouldStopAnimation = shouldStopAnimation.exports;
  var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
  var _react = react.exports;
  var _react2 = _interopRequireDefault(_react);
  var _propTypes = propTypes$b.exports;
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var msPerFrame = 1e3 / 60;
  function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
    for (var i2 = 0; i2 < currentStyles.length; i2++) {
      if (!_shouldStopAnimation2["default"](currentStyles[i2], styles[i2], currentVelocities[i2])) {
        return false;
      }
    }
    return true;
  }
  var StaggeredMotion2 = function(_React$Component) {
    _inherits2(StaggeredMotion3, _React$Component);
    _createClass2(StaggeredMotion3, null, [{
      key: "propTypes",
      value: {
        defaultStyles: _propTypes2["default"].arrayOf(_propTypes2["default"].objectOf(_propTypes2["default"].number)),
        styles: _propTypes2["default"].func.isRequired,
        children: _propTypes2["default"].func.isRequired
      },
      enumerable: true
    }]);
    function StaggeredMotion3(props) {
      var _this = this;
      _classCallCheck2(this, StaggeredMotion3);
      _React$Component.call(this, props);
      this.animationID = null;
      this.prevTime = 0;
      this.accumulatedTime = 0;
      this.unreadPropStyles = null;
      this.clearUnreadPropStyle = function(unreadPropStyles) {
        var _state = _this.state;
        var currentStyles = _state.currentStyles;
        var currentVelocities = _state.currentVelocities;
        var lastIdealStyles = _state.lastIdealStyles;
        var lastIdealVelocities = _state.lastIdealVelocities;
        var someDirty = false;
        for (var i2 = 0; i2 < unreadPropStyles.length; i2++) {
          var unreadPropStyle = unreadPropStyles[i2];
          var dirty = false;
          for (var key in unreadPropStyle) {
            if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
              continue;
            }
            var styleValue = unreadPropStyle[key];
            if (typeof styleValue === "number") {
              if (!dirty) {
                dirty = true;
                someDirty = true;
                currentStyles[i2] = _extends2({}, currentStyles[i2]);
                currentVelocities[i2] = _extends2({}, currentVelocities[i2]);
                lastIdealStyles[i2] = _extends2({}, lastIdealStyles[i2]);
                lastIdealVelocities[i2] = _extends2({}, lastIdealVelocities[i2]);
              }
              currentStyles[i2][key] = styleValue;
              currentVelocities[i2][key] = 0;
              lastIdealStyles[i2][key] = styleValue;
              lastIdealVelocities[i2][key] = 0;
            }
          }
        }
        if (someDirty) {
          _this.setState({ currentStyles, currentVelocities, lastIdealStyles, lastIdealVelocities });
        }
      };
      this.startAnimationIfNecessary = function() {
        _this.animationID = _raf2["default"](function(timestamp) {
          var destStyles = _this.props.styles(_this.state.lastIdealStyles);
          if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
            _this.animationID = null;
            _this.accumulatedTime = 0;
            return;
          }
          var currentTime = timestamp || _performanceNow2["default"]();
          var timeDelta = currentTime - _this.prevTime;
          _this.prevTime = currentTime;
          _this.accumulatedTime = _this.accumulatedTime + timeDelta;
          if (_this.accumulatedTime > msPerFrame * 10) {
            _this.accumulatedTime = 0;
          }
          if (_this.accumulatedTime === 0) {
            _this.animationID = null;
            _this.startAnimationIfNecessary();
            return;
          }
          var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
          var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
          var newLastIdealStyles = [];
          var newLastIdealVelocities = [];
          var newCurrentStyles = [];
          var newCurrentVelocities = [];
          for (var i2 = 0; i2 < destStyles.length; i2++) {
            var destStyle = destStyles[i2];
            var newCurrentStyle = {};
            var newCurrentVelocity = {};
            var newLastIdealStyle = {};
            var newLastIdealVelocity = {};
            for (var key in destStyle) {
              if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
                continue;
              }
              var styleValue = destStyle[key];
              if (typeof styleValue === "number") {
                newCurrentStyle[key] = styleValue;
                newCurrentVelocity[key] = 0;
                newLastIdealStyle[key] = styleValue;
                newLastIdealVelocity[key] = 0;
              } else {
                var newLastIdealStyleValue = _this.state.lastIdealStyles[i2][key];
                var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i2][key];
                for (var j = 0; j < framesToCatchUp; j++) {
                  var _stepper = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
                  newLastIdealStyleValue = _stepper[0];
                  newLastIdealVelocityValue = _stepper[1];
                }
                var _stepper2 = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
                var nextIdealX = _stepper2[0];
                var nextIdealV = _stepper2[1];
                newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
                newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
                newLastIdealStyle[key] = newLastIdealStyleValue;
                newLastIdealVelocity[key] = newLastIdealVelocityValue;
              }
            }
            newCurrentStyles[i2] = newCurrentStyle;
            newCurrentVelocities[i2] = newCurrentVelocity;
            newLastIdealStyles[i2] = newLastIdealStyle;
            newLastIdealVelocities[i2] = newLastIdealVelocity;
          }
          _this.animationID = null;
          _this.accumulatedTime -= framesToCatchUp * msPerFrame;
          _this.setState({
            currentStyles: newCurrentStyles,
            currentVelocities: newCurrentVelocities,
            lastIdealStyles: newLastIdealStyles,
            lastIdealVelocities: newLastIdealVelocities
          });
          _this.unreadPropStyles = null;
          _this.startAnimationIfNecessary();
        });
      };
      this.state = this.defaultState();
    }
    StaggeredMotion3.prototype.defaultState = function defaultState() {
      var _props = this.props;
      var defaultStyles = _props.defaultStyles;
      var styles = _props.styles;
      var currentStyles = defaultStyles || styles().map(_stripStyle22["default"]);
      var currentVelocities = currentStyles.map(function(currentStyle) {
        return _mapToZero2["default"](currentStyle);
      });
      return {
        currentStyles,
        currentVelocities,
        lastIdealStyles: currentStyles,
        lastIdealVelocities: currentVelocities
      };
    };
    StaggeredMotion3.prototype.componentDidMount = function componentDidMount() {
      this.prevTime = _performanceNow2["default"]();
      this.startAnimationIfNecessary();
    };
    StaggeredMotion3.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
      if (this.unreadPropStyles != null) {
        this.clearUnreadPropStyle(this.unreadPropStyles);
      }
      this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
      if (this.animationID == null) {
        this.prevTime = _performanceNow2["default"]();
        this.startAnimationIfNecessary();
      }
    };
    StaggeredMotion3.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.animationID != null) {
        _raf2["default"].cancel(this.animationID);
        this.animationID = null;
      }
    };
    StaggeredMotion3.prototype.render = function render() {
      var renderedChildren = this.props.children(this.state.currentStyles);
      return renderedChildren && _react2["default"].Children.only(renderedChildren);
    };
    return StaggeredMotion3;
  }(_react2["default"].Component);
  exports["default"] = StaggeredMotion2;
  module.exports = exports["default"];
})(StaggeredMotion, StaggeredMotion.exports);
var TransitionMotion = { exports: {} };
var mergeDiff = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = mergeDiff2;
  function mergeDiff2(prev, next, onRemove) {
    var prevKeyIndex = {};
    for (var i2 = 0; i2 < prev.length; i2++) {
      prevKeyIndex[prev[i2].key] = i2;
    }
    var nextKeyIndex = {};
    for (var i2 = 0; i2 < next.length; i2++) {
      nextKeyIndex[next[i2].key] = i2;
    }
    var ret = [];
    for (var i2 = 0; i2 < next.length; i2++) {
      ret[i2] = next[i2];
    }
    for (var i2 = 0; i2 < prev.length; i2++) {
      if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i2].key)) {
        var fill = onRemove(i2, prev[i2]);
        if (fill != null) {
          ret.push(fill);
        }
      }
    }
    return ret.sort(function(a2, b) {
      var nextOrderA = nextKeyIndex[a2.key];
      var nextOrderB = nextKeyIndex[b.key];
      var prevOrderA = prevKeyIndex[a2.key];
      var prevOrderB = prevKeyIndex[b.key];
      if (nextOrderA != null && nextOrderB != null) {
        return nextKeyIndex[a2.key] - nextKeyIndex[b.key];
      } else if (prevOrderA != null && prevOrderB != null) {
        return prevKeyIndex[a2.key] - prevKeyIndex[b.key];
      } else if (nextOrderA != null) {
        for (var i3 = 0; i3 < next.length; i3++) {
          var pivot = next[i3].key;
          if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
            continue;
          }
          if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
            return -1;
          } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
            return 1;
          }
        }
        return 1;
      }
      for (var i3 = 0; i3 < next.length; i3++) {
        var pivot = next[i3].key;
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue;
        }
        if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
          return 1;
        } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
          return -1;
        }
      }
      return -1;
    });
  }
  module.exports = exports["default"];
})(mergeDiff, mergeDiff.exports);
(function(module, exports) {
  exports.__esModule = true;
  var _extends2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass2 = function() {
    function defineProperties2(target, props) {
      for (var i2 = 0; i2 < props.length; i2++) {
        var descriptor = props[i2];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties2(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _mapToZero = mapToZero.exports;
  var _mapToZero2 = _interopRequireDefault(_mapToZero);
  var _stripStyle2 = stripStyle.exports;
  var _stripStyle22 = _interopRequireDefault(_stripStyle2);
  var _stepper3 = stepper.exports;
  var _stepper4 = _interopRequireDefault(_stepper3);
  var _mergeDiff = mergeDiff.exports;
  var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
  var _performanceNow = performanceNow$1.exports;
  var _performanceNow2 = _interopRequireDefault(_performanceNow);
  var _raf = raf$1.exports;
  var _raf2 = _interopRequireDefault(_raf);
  var _shouldStopAnimation = shouldStopAnimation.exports;
  var _shouldStopAnimation2 = _interopRequireDefault(_shouldStopAnimation);
  var _react = react.exports;
  var _react2 = _interopRequireDefault(_react);
  var _propTypes = propTypes$b.exports;
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var msPerFrame = 1e3 / 60;
  function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
    var cUnreadPropStyles = unreadPropStyles;
    if (cUnreadPropStyles == null) {
      return mergedPropsStyles.map(function(mergedPropsStyle, i2) {
        return {
          key: mergedPropsStyle.key,
          data: mergedPropsStyle.data,
          style: plainStyles[i2]
        };
      });
    }
    return mergedPropsStyles.map(function(mergedPropsStyle, i2) {
      for (var j = 0; j < cUnreadPropStyles.length; j++) {
        if (cUnreadPropStyles[j].key === mergedPropsStyle.key) {
          return {
            key: cUnreadPropStyles[j].key,
            data: cUnreadPropStyles[j].data,
            style: plainStyles[i2]
          };
        }
      }
      return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i2] };
    });
  }
  function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
    if (mergedPropsStyles.length !== destStyles.length) {
      return false;
    }
    for (var i2 = 0; i2 < mergedPropsStyles.length; i2++) {
      if (mergedPropsStyles[i2].key !== destStyles[i2].key) {
        return false;
      }
    }
    for (var i2 = 0; i2 < mergedPropsStyles.length; i2++) {
      if (!_shouldStopAnimation2["default"](currentStyles[i2], destStyles[i2].style, currentVelocities[i2])) {
        return false;
      }
    }
    return true;
  }
  function mergeAndSync(willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
    var newMergedPropsStyles = _mergeDiff2["default"](oldMergedPropsStyles, destStyles, function(oldIndex, oldMergedPropsStyle) {
      var leavingStyle = willLeave(oldMergedPropsStyle);
      if (leavingStyle == null) {
        didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
        return null;
      }
      if (_shouldStopAnimation2["default"](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
        didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
        return null;
      }
      return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
    });
    var newCurrentStyles = [];
    var newCurrentVelocities = [];
    var newLastIdealStyles = [];
    var newLastIdealVelocities = [];
    for (var i2 = 0; i2 < newMergedPropsStyles.length; i2++) {
      var newMergedPropsStyleCell = newMergedPropsStyles[i2];
      var foundOldIndex = null;
      for (var j = 0; j < oldMergedPropsStyles.length; j++) {
        if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
          foundOldIndex = j;
          break;
        }
      }
      if (foundOldIndex == null) {
        var plainStyle = willEnter(newMergedPropsStyleCell);
        newCurrentStyles[i2] = plainStyle;
        newLastIdealStyles[i2] = plainStyle;
        var velocity = _mapToZero2["default"](newMergedPropsStyleCell.style);
        newCurrentVelocities[i2] = velocity;
        newLastIdealVelocities[i2] = velocity;
      } else {
        newCurrentStyles[i2] = oldCurrentStyles[foundOldIndex];
        newLastIdealStyles[i2] = oldLastIdealStyles[foundOldIndex];
        newCurrentVelocities[i2] = oldCurrentVelocities[foundOldIndex];
        newLastIdealVelocities[i2] = oldLastIdealVelocities[foundOldIndex];
      }
    }
    return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
  }
  var TransitionMotion2 = function(_React$Component) {
    _inherits2(TransitionMotion3, _React$Component);
    _createClass2(TransitionMotion3, null, [{
      key: "propTypes",
      value: {
        defaultStyles: _propTypes2["default"].arrayOf(_propTypes2["default"].shape({
          key: _propTypes2["default"].string.isRequired,
          data: _propTypes2["default"].any,
          style: _propTypes2["default"].objectOf(_propTypes2["default"].number).isRequired
        })),
        styles: _propTypes2["default"].oneOfType([_propTypes2["default"].func, _propTypes2["default"].arrayOf(_propTypes2["default"].shape({
          key: _propTypes2["default"].string.isRequired,
          data: _propTypes2["default"].any,
          style: _propTypes2["default"].objectOf(_propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].object])).isRequired
        }))]).isRequired,
        children: _propTypes2["default"].func.isRequired,
        willEnter: _propTypes2["default"].func,
        willLeave: _propTypes2["default"].func,
        didLeave: _propTypes2["default"].func
      },
      enumerable: true
    }, {
      key: "defaultProps",
      value: {
        willEnter: function willEnter(styleThatEntered) {
          return _stripStyle22["default"](styleThatEntered.style);
        },
        willLeave: function willLeave() {
          return null;
        },
        didLeave: function didLeave() {
        }
      },
      enumerable: true
    }]);
    function TransitionMotion3(props) {
      var _this = this;
      _classCallCheck2(this, TransitionMotion3);
      _React$Component.call(this, props);
      this.unmounting = false;
      this.animationID = null;
      this.prevTime = 0;
      this.accumulatedTime = 0;
      this.unreadPropStyles = null;
      this.clearUnreadPropStyle = function(unreadPropStyles) {
        var _mergeAndSync = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, unreadPropStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);
        var mergedPropsStyles = _mergeAndSync[0];
        var currentStyles = _mergeAndSync[1];
        var currentVelocities = _mergeAndSync[2];
        var lastIdealStyles = _mergeAndSync[3];
        var lastIdealVelocities = _mergeAndSync[4];
        for (var i2 = 0; i2 < unreadPropStyles.length; i2++) {
          var unreadPropStyle = unreadPropStyles[i2].style;
          var dirty = false;
          for (var key in unreadPropStyle) {
            if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
              continue;
            }
            var styleValue = unreadPropStyle[key];
            if (typeof styleValue === "number") {
              if (!dirty) {
                dirty = true;
                currentStyles[i2] = _extends2({}, currentStyles[i2]);
                currentVelocities[i2] = _extends2({}, currentVelocities[i2]);
                lastIdealStyles[i2] = _extends2({}, lastIdealStyles[i2]);
                lastIdealVelocities[i2] = _extends2({}, lastIdealVelocities[i2]);
                mergedPropsStyles[i2] = {
                  key: mergedPropsStyles[i2].key,
                  data: mergedPropsStyles[i2].data,
                  style: _extends2({}, mergedPropsStyles[i2].style)
                };
              }
              currentStyles[i2][key] = styleValue;
              currentVelocities[i2][key] = 0;
              lastIdealStyles[i2][key] = styleValue;
              lastIdealVelocities[i2][key] = 0;
              mergedPropsStyles[i2].style[key] = styleValue;
            }
          }
        }
        _this.setState({
          currentStyles,
          currentVelocities,
          mergedPropsStyles,
          lastIdealStyles,
          lastIdealVelocities
        });
      };
      this.startAnimationIfNecessary = function() {
        if (_this.unmounting) {
          return;
        }
        _this.animationID = _raf2["default"](function(timestamp) {
          if (_this.unmounting) {
            return;
          }
          var propStyles = _this.props.styles;
          var destStyles = typeof propStyles === "function" ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;
          if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
            _this.animationID = null;
            _this.accumulatedTime = 0;
            return;
          }
          var currentTime = timestamp || _performanceNow2["default"]();
          var timeDelta = currentTime - _this.prevTime;
          _this.prevTime = currentTime;
          _this.accumulatedTime = _this.accumulatedTime + timeDelta;
          if (_this.accumulatedTime > msPerFrame * 10) {
            _this.accumulatedTime = 0;
          }
          if (_this.accumulatedTime === 0) {
            _this.animationID = null;
            _this.startAnimationIfNecessary();
            return;
          }
          var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
          var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);
          var _mergeAndSync2 = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);
          var newMergedPropsStyles = _mergeAndSync2[0];
          var newCurrentStyles = _mergeAndSync2[1];
          var newCurrentVelocities = _mergeAndSync2[2];
          var newLastIdealStyles = _mergeAndSync2[3];
          var newLastIdealVelocities = _mergeAndSync2[4];
          for (var i2 = 0; i2 < newMergedPropsStyles.length; i2++) {
            var newMergedPropsStyle = newMergedPropsStyles[i2].style;
            var newCurrentStyle = {};
            var newCurrentVelocity = {};
            var newLastIdealStyle = {};
            var newLastIdealVelocity = {};
            for (var key in newMergedPropsStyle) {
              if (!Object.prototype.hasOwnProperty.call(newMergedPropsStyle, key)) {
                continue;
              }
              var styleValue = newMergedPropsStyle[key];
              if (typeof styleValue === "number") {
                newCurrentStyle[key] = styleValue;
                newCurrentVelocity[key] = 0;
                newLastIdealStyle[key] = styleValue;
                newLastIdealVelocity[key] = 0;
              } else {
                var newLastIdealStyleValue = newLastIdealStyles[i2][key];
                var newLastIdealVelocityValue = newLastIdealVelocities[i2][key];
                for (var j = 0; j < framesToCatchUp; j++) {
                  var _stepper = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
                  newLastIdealStyleValue = _stepper[0];
                  newLastIdealVelocityValue = _stepper[1];
                }
                var _stepper2 = _stepper4["default"](msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);
                var nextIdealX = _stepper2[0];
                var nextIdealV = _stepper2[1];
                newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
                newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
                newLastIdealStyle[key] = newLastIdealStyleValue;
                newLastIdealVelocity[key] = newLastIdealVelocityValue;
              }
            }
            newLastIdealStyles[i2] = newLastIdealStyle;
            newLastIdealVelocities[i2] = newLastIdealVelocity;
            newCurrentStyles[i2] = newCurrentStyle;
            newCurrentVelocities[i2] = newCurrentVelocity;
          }
          _this.animationID = null;
          _this.accumulatedTime -= framesToCatchUp * msPerFrame;
          _this.setState({
            currentStyles: newCurrentStyles,
            currentVelocities: newCurrentVelocities,
            lastIdealStyles: newLastIdealStyles,
            lastIdealVelocities: newLastIdealVelocities,
            mergedPropsStyles: newMergedPropsStyles
          });
          _this.unreadPropStyles = null;
          _this.startAnimationIfNecessary();
        });
      };
      this.state = this.defaultState();
    }
    TransitionMotion3.prototype.defaultState = function defaultState() {
      var _props = this.props;
      var defaultStyles = _props.defaultStyles;
      var styles = _props.styles;
      var willEnter = _props.willEnter;
      var willLeave = _props.willLeave;
      var didLeave = _props.didLeave;
      var destStyles = typeof styles === "function" ? styles(defaultStyles) : styles;
      var oldMergedPropsStyles = void 0;
      if (defaultStyles == null) {
        oldMergedPropsStyles = destStyles;
      } else {
        oldMergedPropsStyles = defaultStyles.map(function(defaultStyleCell) {
          for (var i2 = 0; i2 < destStyles.length; i2++) {
            if (destStyles[i2].key === defaultStyleCell.key) {
              return destStyles[i2];
            }
          }
          return defaultStyleCell;
        });
      }
      var oldCurrentStyles = defaultStyles == null ? destStyles.map(function(s2) {
        return _stripStyle22["default"](s2.style);
      }) : defaultStyles.map(function(s2) {
        return _stripStyle22["default"](s2.style);
      });
      var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function(s2) {
        return _mapToZero2["default"](s2.style);
      }) : defaultStyles.map(function(s2) {
        return _mapToZero2["default"](s2.style);
      });
      var _mergeAndSync3 = mergeAndSync(willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, oldCurrentVelocities);
      var mergedPropsStyles = _mergeAndSync3[0];
      var currentStyles = _mergeAndSync3[1];
      var currentVelocities = _mergeAndSync3[2];
      var lastIdealStyles = _mergeAndSync3[3];
      var lastIdealVelocities = _mergeAndSync3[4];
      return {
        currentStyles,
        currentVelocities,
        lastIdealStyles,
        lastIdealVelocities,
        mergedPropsStyles
      };
    };
    TransitionMotion3.prototype.componentDidMount = function componentDidMount() {
      this.prevTime = _performanceNow2["default"]();
      this.startAnimationIfNecessary();
    };
    TransitionMotion3.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
      if (this.unreadPropStyles) {
        this.clearUnreadPropStyle(this.unreadPropStyles);
      }
      var styles = props.styles;
      if (typeof styles === "function") {
        this.unreadPropStyles = styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
      } else {
        this.unreadPropStyles = styles;
      }
      if (this.animationID == null) {
        this.prevTime = _performanceNow2["default"]();
        this.startAnimationIfNecessary();
      }
    };
    TransitionMotion3.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unmounting = true;
      if (this.animationID != null) {
        _raf2["default"].cancel(this.animationID);
        this.animationID = null;
      }
    };
    TransitionMotion3.prototype.render = function render() {
      var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
      var renderedChildren = this.props.children(hydratedStyles);
      return renderedChildren && _react2["default"].Children.only(renderedChildren);
    };
    return TransitionMotion3;
  }(_react2["default"].Component);
  exports["default"] = TransitionMotion2;
  module.exports = exports["default"];
})(TransitionMotion, TransitionMotion.exports);
var spring$1 = { exports: {} };
var presets$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = {
    noWobble: { stiffness: 170, damping: 26 },
    gentle: { stiffness: 120, damping: 14 },
    wobbly: { stiffness: 180, damping: 12 },
    stiff: { stiffness: 210, damping: 20 }
  };
  module.exports = exports["default"];
})(presets$1, presets$1.exports);
(function(module, exports) {
  exports.__esModule = true;
  var _extends2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports["default"] = spring2;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _presets2 = presets$1.exports;
  var _presets22 = _interopRequireDefault(_presets2);
  var defaultConfig = _extends2({}, _presets22["default"].noWobble, {
    precision: 0.01
  });
  function spring2(val, config) {
    return _extends2({}, defaultConfig, config, { val });
  }
  module.exports = exports["default"];
})(spring$1, spring$1.exports);
var reorderKeys = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = reorderKeys2;
  function reorderKeys2() {
  }
  module.exports = exports["default"];
})(reorderKeys, reorderKeys.exports);
function _interopRequire(obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
}
var _Motion = Motion$1.exports;
var Motion = _interopRequire(_Motion);
var _StaggeredMotion = StaggeredMotion.exports;
_interopRequire(_StaggeredMotion);
var _TransitionMotion = TransitionMotion.exports;
_interopRequire(_TransitionMotion);
var _spring = spring$1.exports;
var spring = _interopRequire(_spring);
var _presets = presets$1.exports;
var presets = _interopRequire(_presets);
var _stripStyle = stripStyle.exports;
_interopRequire(_stripStyle);
var _reorderKeys = reorderKeys.exports;
_interopRequire(_reorderKeys);
var _createClass$H = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$V = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$H(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$H(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$H(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _objectWithoutProperties$1(obj, keys3) {
  var target = {};
  for (var i2 in obj) {
    if (keys3.indexOf(i2) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i2))
      continue;
    target[i2] = obj[i2];
  }
  return target;
}
var ANIMATION_PROPTYPES = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  stiffness: PropTypes.number,
  nonAnimatedProps: PropTypes.arrayOf(PropTypes.string),
  damping: PropTypes.number
}), PropTypes.bool]);
var propTypes$a = {
  animatedProps: PropTypes.arrayOf(PropTypes.string).isRequired,
  animation: ANIMATION_PROPTYPES,
  onStart: PropTypes.func,
  onEnd: PropTypes.func
};
function getAnimationStyle() {
  var animationStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : presets.noWobble;
  if (typeof animationStyle === "string") {
    return presets[animationStyle] || presets.noWobble;
  }
  var damping = animationStyle.damping, stiffness = animationStyle.stiffness;
  return _extends$V({
    damping: damping || presets.noWobble.damping,
    stiffness: stiffness || presets.noWobble.stiffness
  }, animationStyle);
}
function extractAnimatedPropValues(props) {
  var animatedProps2 = props.animatedProps, otherProps = _objectWithoutProperties$1(props, ["animatedProps"]);
  return animatedProps2.reduce(function(result, animatedPropName) {
    if (otherProps.hasOwnProperty(animatedPropName)) {
      result[animatedPropName] = otherProps[animatedPropName];
    }
    return result;
  }, {});
}
var Animation = function(_PureComponent) {
  _inherits$H(Animation2, _PureComponent);
  function Animation2(props) {
    _classCallCheck$H(this, Animation2);
    var _this = _possibleConstructorReturn$H(this, (Animation2.__proto__ || Object.getPrototypeOf(Animation2)).call(this, props));
    _this._motionEndHandler = function() {
      if (_this.props.onEnd) {
        _this.props.onEnd();
      }
    };
    _this._renderChildren = function(_ref) {
      var i2 = _ref.i;
      var children = _this.props.children;
      var interpolator = _this._interpolator;
      var child = React.Children.only(children);
      var interpolatedProps = interpolator ? interpolator(i2) : interpolator;
      var data = interpolatedProps && interpolatedProps.data || null;
      if (data && child.props._data) {
        data = data.map(function(row, index) {
          var correspondingCell = child.props._data[index];
          return _extends$V({}, row, {
            parent: correspondingCell.parent,
            children: correspondingCell.children
          });
        });
      }
      return React.cloneElement(child, _extends$V({}, child.props, interpolatedProps, {
        data: data || child.props.data || null,
        _animation: Math.random()
      }));
    };
    _this._updateInterpolator(props);
    return _this;
  }
  _createClass$H(Animation2, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(props) {
      this._updateInterpolator(this.props, props);
      if (props.onStart) {
        props.onStart();
      }
    }
  }, {
    key: "_updateInterpolator",
    value: function _updateInterpolator(oldProps, newProps) {
      this._interpolator = interpolate(extractAnimatedPropValues(oldProps), newProps ? extractAnimatedPropValues(newProps) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var animationStyle = getAnimationStyle(this.props.animation);
      var defaultStyle = {
        i: 0
      };
      var style = {
        i: spring(1, animationStyle)
      };
      var key = Math.random();
      return /* @__PURE__ */ jsx(Motion, {
        defaultStyle,
        style,
        onRest: this._motionEndHandler,
        children: this._renderChildren
      }, key);
    }
  }]);
  return Animation2;
}(react.exports.PureComponent);
Animation.propTypes = propTypes$a;
Animation.displayName = "Animation";
var AnimationPropType = ANIMATION_PROPTYPES;
function ascending$2(a2, b) {
  return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
}
function bisector(compare) {
  if (compare.length === 1)
    compare = ascendingComparator(compare);
  return {
    left: function(a2, x2, lo, hi2) {
      if (lo == null)
        lo = 0;
      if (hi2 == null)
        hi2 = a2.length;
      while (lo < hi2) {
        var mid = lo + hi2 >>> 1;
        if (compare(a2[mid], x2) < 0)
          lo = mid + 1;
        else
          hi2 = mid;
      }
      return lo;
    },
    right: function(a2, x2, lo, hi2) {
      if (lo == null)
        lo = 0;
      if (hi2 == null)
        hi2 = a2.length;
      while (lo < hi2) {
        var mid = lo + hi2 >>> 1;
        if (compare(a2[mid], x2) > 0)
          hi2 = mid;
        else
          lo = mid + 1;
      }
      return lo;
    }
  };
}
function ascendingComparator(f2) {
  return function(d, x2) {
    return ascending$2(f2(d), x2);
  };
}
var ascendingBisect = bisector(ascending$2);
var bisectRight = ascendingBisect.right;
function extent(values, valueof) {
  var n2 = values.length, i2 = -1, value, min2, max2;
  if (valueof == null) {
    while (++i2 < n2) {
      if ((value = values[i2]) != null && value >= value) {
        min2 = max2 = value;
        while (++i2 < n2) {
          if ((value = values[i2]) != null) {
            if (min2 > value)
              min2 = value;
            if (max2 < value)
              max2 = value;
          }
        }
      }
    }
  } else {
    while (++i2 < n2) {
      if ((value = valueof(values[i2], i2, values)) != null && value >= value) {
        min2 = max2 = value;
        while (++i2 < n2) {
          if ((value = valueof(values[i2], i2, values)) != null) {
            if (min2 > value)
              min2 = value;
            if (max2 < value)
              max2 = value;
          }
        }
      }
    }
  }
  return [min2, max2];
}
function range(start, stop, step2) {
  start = +start, stop = +stop, step2 = (n2 = arguments.length) < 2 ? (stop = start, start = 0, 1) : n2 < 3 ? 1 : +step2;
  var i2 = -1, n2 = Math.max(0, Math.ceil((stop - start) / step2)) | 0, range2 = new Array(n2);
  while (++i2 < n2) {
    range2[i2] = start + i2 * step2;
  }
  return range2;
}
var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function ticks(start, stop, count2) {
  var reverse2, i2 = -1, n2, ticks2, step2;
  stop = +stop, start = +start, count2 = +count2;
  if (start === stop && count2 > 0)
    return [start];
  if (reverse2 = stop < start)
    n2 = start, start = stop, stop = n2;
  if ((step2 = tickIncrement(start, stop, count2)) === 0 || !isFinite(step2))
    return [];
  if (step2 > 0) {
    start = Math.ceil(start / step2);
    stop = Math.floor(stop / step2);
    ticks2 = new Array(n2 = Math.ceil(stop - start + 1));
    while (++i2 < n2)
      ticks2[i2] = (start + i2) * step2;
  } else {
    start = Math.floor(start * step2);
    stop = Math.ceil(stop * step2);
    ticks2 = new Array(n2 = Math.ceil(start - stop + 1));
    while (++i2 < n2)
      ticks2[i2] = (start - i2) / step2;
  }
  if (reverse2)
    ticks2.reverse();
  return ticks2;
}
function tickIncrement(start, stop, count2) {
  var step2 = (stop - start) / Math.max(0, count2), power = Math.floor(Math.log(step2) / Math.LN10), error = step2 / Math.pow(10, power);
  return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count2) {
  var step0 = Math.abs(stop - start) / Math.max(0, count2), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
  if (error >= e10)
    step1 *= 10;
  else if (error >= e5)
    step1 *= 5;
  else if (error >= e2)
    step1 *= 2;
  return stop < start ? -step1 : step1;
}
function thresholdSturges(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
}
function max$1(values, valueof) {
  var n2 = values.length, i2 = -1, value, max2;
  if (valueof == null) {
    while (++i2 < n2) {
      if ((value = values[i2]) != null && value >= value) {
        max2 = value;
        while (++i2 < n2) {
          if ((value = values[i2]) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  } else {
    while (++i2 < n2) {
      if ((value = valueof(values[i2], i2, values)) != null && value >= value) {
        max2 = value;
        while (++i2 < n2) {
          if ((value = valueof(values[i2], i2, values)) != null && value > max2) {
            max2 = value;
          }
        }
      }
    }
  }
  return max2;
}
var prefix = "$";
function Map$1() {
}
Map$1.prototype = map$2.prototype = {
  constructor: Map$1,
  has: function(key) {
    return prefix + key in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this)
      if (property[0] === prefix)
        delete this[property];
  },
  keys: function() {
    var keys3 = [];
    for (var property in this)
      if (property[0] === prefix)
        keys3.push(property.slice(1));
    return keys3;
  },
  values: function() {
    var values = [];
    for (var property in this)
      if (property[0] === prefix)
        values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this)
      if (property[0] === prefix)
        entries.push({ key: property.slice(1), value: this[property] });
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this)
      if (property[0] === prefix)
        ++size;
    return size;
  },
  empty: function() {
    for (var property in this)
      if (property[0] === prefix)
        return false;
    return true;
  },
  each: function(f2) {
    for (var property in this)
      if (property[0] === prefix)
        f2(this[property], property.slice(1), this);
  }
};
function map$2(object2, f2) {
  var map2 = new Map$1();
  if (object2 instanceof Map$1)
    object2.each(function(value, key2) {
      map2.set(key2, value);
    });
  else if (Array.isArray(object2)) {
    var i2 = -1, n2 = object2.length, o;
    if (f2 == null)
      while (++i2 < n2)
        map2.set(i2, object2[i2]);
    else
      while (++i2 < n2)
        map2.set(f2(o = object2[i2], i2, object2), o);
  } else if (object2)
    for (var key in object2)
      map2.set(key, object2[key]);
  return map2;
}
function Set$1() {
}
var proto = map$2.prototype;
Set$1.prototype = set.prototype = {
  constructor: Set$1,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};
function set(object2, f2) {
  var set2 = new Set$1();
  if (object2 instanceof Set$1)
    object2.each(function(value) {
      set2.add(value);
    });
  else if (object2) {
    var i2 = -1, n2 = object2.length;
    if (f2 == null)
      while (++i2 < n2)
        set2.add(object2[i2]);
    else
      while (++i2 < n2)
        set2.add(f2(object2[i2], i2, object2));
  }
  return set2;
}
var array$1 = Array.prototype;
var map$1 = array$1.map;
var slice$5 = array$1.slice;
var implicit = { name: "implicit" };
function ordinal(range2) {
  var index = map$2(), domain = [], unknown = implicit;
  range2 = range2 == null ? [] : slice$5.call(range2);
  function scale(d) {
    var key = d + "", i2 = index.get(key);
    if (!i2) {
      if (unknown !== implicit)
        return unknown;
      index.set(key, i2 = domain.push(d));
    }
    return range2[(i2 - 1) % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length)
      return domain.slice();
    domain = [], index = map$2();
    var i2 = -1, n2 = _.length, d, key;
    while (++i2 < n2)
      if (!index.has(key = (d = _[i2]) + ""))
        index.set(key, domain.push(d));
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice$5.call(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal().domain(domain).range(range2).unknown(unknown);
  };
  return scale;
}
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, range$1 = [0, 1], step2, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n2 = domain().length, reverse2 = range$1[1] < range$1[0], start = range$1[reverse2 - 0], stop = range$1[1 - reverse2];
    step2 = (stop - start) / Math.max(1, n2 - paddingInner + paddingOuter * 2);
    if (round)
      step2 = Math.floor(step2);
    start += (stop - start - step2 * (n2 - paddingInner)) * align;
    bandwidth = step2 * (1 - paddingInner);
    if (round)
      start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n2).map(function(i2) {
      return start + step2 * i2;
    });
    return ordinalRange(reverse2 ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? (range$1 = [+_[0], +_[1]], rescale()) : range$1.slice();
  };
  scale.rangeRound = function(_) {
    return range$1 = [+_[0], +_[1]], round = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step2;
  };
  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band().domain(domain()).range(range$1).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return rescale();
}
function pointish(scale) {
  var copy2 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy2());
  };
  return scale;
}
function point$4() {
  return pointish(band().paddingInner(1));
}
function constant$3(x2) {
  return function() {
    return x2;
  };
}
function number$1(x2) {
  return +x2;
}
var unit = [0, 1];
function deinterpolateLinear(a2, b) {
  return (b -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b;
  } : constant$3(b);
}
function deinterpolateClamp(deinterpolate2) {
  return function(a2, b) {
    var d = deinterpolate2(a2 = +a2, b = +b);
    return function(x2) {
      return x2 <= a2 ? 0 : x2 >= b ? 1 : d(x2);
    };
  };
}
function reinterpolateClamp(reinterpolate2) {
  return function(a2, b) {
    var r2 = reinterpolate2(a2 = +a2, b = +b);
    return function(t2) {
      return t2 <= 0 ? a2 : t2 >= 1 ? b : r2(t2);
    };
  };
}
function bimap(domain, range2, deinterpolate2, reinterpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0)
    d0 = deinterpolate2(d1, d0), r0 = reinterpolate2(r1, r0);
  else
    d0 = deinterpolate2(d0, d1), r0 = reinterpolate2(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, deinterpolate2, reinterpolate2) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r2 = new Array(j), i2 = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i2 < j) {
    d[i2] = deinterpolate2(domain[i2], domain[i2 + 1]);
    r2[i2] = reinterpolate2(range2[i2], range2[i2 + 1]);
  }
  return function(x2) {
    var i3 = bisectRight(domain, x2, 1, j) - 1;
    return r2[i3](d[i3](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp());
}
function continuous(deinterpolate2, reinterpolate2) {
  var domain = unit, range2 = unit, interpolate$1 = interpolate, clamp = false, piecewise, output, input;
  function rescale() {
    piecewise = Math.min(domain.length, range2.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return (output || (output = piecewise(domain, range2, clamp ? deinterpolateClamp(deinterpolate2) : deinterpolate2, interpolate$1)))(+x2);
  }
  scale.invert = function(y2) {
    return (input || (input = piecewise(range2, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate2) : reinterpolate2)))(+y2);
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = map$1.call(_, number$1), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = slice$5.call(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = slice$5.call(_), interpolate$1 = interpolateRound, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };
  return rescale();
}
function formatDecimal(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p2) {
  if ((i2 = (x2 = p2 ? x2.toExponential(p2 - 1) : x2.toExponential()).indexOf("e")) < 0)
    return null;
  var i2, coefficient = x2.slice(0, i2);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i2 + 1)
  ];
}
function exponent(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}
function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i2 = value.length, t2 = [], j = 0, g = grouping[0], length = 0;
    while (i2 > 0 && g > 0) {
      if (length + g + 1 > width)
        g = Math.max(1, width - length);
      t2.push(value.substring(i2 -= g, i2 + g));
      if ((length += g + 1) > width)
        break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t2.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i2) {
      return numerals[+i2];
    });
  };
}
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier)))
    throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function formatTrim(s2) {
  out:
    for (var n2 = s2.length, i2 = 1, i0 = -1, i1; i2 < n2; ++i2) {
      switch (s2[i2]) {
        case ".":
          i0 = i1 = i2;
          break;
        case "0":
          if (i0 === 0)
            i0 = i2;
          i1 = i2;
          break;
        default:
          if (!+s2[i2])
            break out;
          if (i0 > 0)
            i0 = 0;
          break;
      }
    }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}
var prefixExponent;
function formatPrefixAuto(x2, p2) {
  var d = formatDecimalParts(x2, p2);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent2 = d[1], i2 = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n2 = coefficient.length;
  return i2 === n2 ? coefficient : i2 > n2 ? coefficient + new Array(i2 - n2 + 1).join("0") : i2 > 0 ? coefficient.slice(0, i2) + "." + coefficient.slice(i2) : "0." + new Array(1 - i2).join("0") + formatDecimalParts(x2, Math.max(0, p2 + i2 - 1))[0];
}
function formatRounded(x2, p2) {
  var d = formatDecimalParts(x2, p2);
  if (!d)
    return x2 + "";
  var coefficient = d[0], exponent2 = d[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}
var formatTypes = {
  "%": function(x2, p2) {
    return (x2 * 100).toFixed(p2);
  },
  "b": function(x2) {
    return Math.round(x2).toString(2);
  },
  "c": function(x2) {
    return x2 + "";
  },
  "d": formatDecimal,
  "e": function(x2, p2) {
    return x2.toExponential(p2);
  },
  "f": function(x2, p2) {
    return x2.toFixed(p2);
  },
  "g": function(x2, p2) {
    return x2.toPrecision(p2);
  },
  "o": function(x2) {
    return Math.round(x2).toString(8);
  },
  "p": function(x2, p2) {
    return formatRounded(x2 * 100, p2);
  },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x2) {
    return Math.round(x2).toString(16).toUpperCase();
  },
  "x": function(x2) {
    return Math.round(x2).toString(16);
  }
};
function identity$2(x2) {
  return x2;
}
var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale$1(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity$2 : formatGroup(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity$2 : formatNumerals(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "-" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol2 = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n")
      comma = true, type = "g";
    else if (!formatTypes[type])
      precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=")
      zero2 = true, fill = "0", align = "=";
    var prefix2 = symbol2 === "$" ? currencyPrefix : symbol2 === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix2 = symbol2 === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix2, i2, n2, c2;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim)
          value = formatTrim(value);
        if (valueNegative && +value === 0 && sign2 !== "+")
          valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i2 = -1, n2 = value.length;
          while (++i2 < n2) {
            if (c2 = value.charCodeAt(i2), 48 > c2 || c2 > 57) {
              valueSuffix = (c2 === 46 ? decimal + value.slice(i2 + 1) : value.slice(i2)) + valueSuffix;
              value = value.slice(0, i2);
              break;
            }
          }
        }
      }
      if (comma && !zero2)
        value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2)
        value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f2 = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e3 = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k2 = Math.pow(10, -e3), prefix2 = prefixes[8 + e3 / 3];
    return function(value2) {
      return f2(k2 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var locale$1;
var format;
var formatPrefix;
defaultLocale$1({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}
function precisionFixed(step2) {
  return Math.max(0, -exponent(Math.abs(step2)));
}
function precisionPrefix(step2, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step2)));
}
function precisionRound(step2, max2) {
  step2 = Math.abs(step2), max2 = Math.abs(max2) - step2;
  return Math.max(0, exponent(max2) - exponent(step2)) + 1;
}
function tickFormat(domain, count2, specifier) {
  var start = domain[0], stop = domain[domain.length - 1], step2 = tickStep(start, stop, count2 == null ? 10 : count2), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step2, value)))
        specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step2, Math.max(Math.abs(start), Math.abs(stop)))))
        specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step2)))
        specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count2) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count2 == null ? 10 : count2);
  };
  scale.tickFormat = function(count2, specifier) {
    return tickFormat(domain(), count2, specifier);
  };
  scale.nice = function(count2) {
    if (count2 == null)
      count2 = 10;
    var d = domain(), i0 = 0, i1 = d.length - 1, start = d[i0], stop = d[i1], step2;
    if (stop < start) {
      step2 = start, start = stop, stop = step2;
      step2 = i0, i0 = i1, i1 = step2;
    }
    step2 = tickIncrement(start, stop, count2);
    if (step2 > 0) {
      start = Math.floor(start / step2) * step2;
      stop = Math.ceil(stop / step2) * step2;
      step2 = tickIncrement(start, stop, count2);
    } else if (step2 < 0) {
      start = Math.ceil(start * step2) / step2;
      stop = Math.floor(stop * step2) / step2;
      step2 = tickIncrement(start, stop, count2);
    }
    if (step2 > 0) {
      d[i0] = Math.floor(start / step2) * step2;
      d[i1] = Math.ceil(stop / step2) * step2;
      domain(d);
    } else if (step2 < 0) {
      d[i0] = Math.ceil(start * step2) / step2;
      d[i1] = Math.floor(stop * step2) / step2;
      domain(d);
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous(deinterpolateLinear, reinterpolate$1);
  scale.copy = function() {
    return copy(scale, linear());
  };
  return linearish(scale);
}
function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x02 = domain[i0], x12 = domain[i1], t2;
  if (x12 < x02) {
    t2 = i0, i0 = i1, i1 = t2;
    t2 = x02, x02 = x12, x12 = t2;
  }
  domain[i0] = interval.floor(x02);
  domain[i1] = interval.ceil(x12);
  return domain;
}
function deinterpolate(a2, b) {
  return (b = Math.log(b / a2)) ? function(x2) {
    return Math.log(x2 / a2) / b;
  } : constant$3(b);
}
function reinterpolate(a2, b) {
  return a2 < 0 ? function(t2) {
    return -Math.pow(-b, t2) * Math.pow(-a2, 1 - t2);
  } : function(t2) {
    return Math.pow(b, t2) * Math.pow(a2, 1 - t2);
  };
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x2) {
    return Math.pow(base, x2);
  };
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x2) {
    return Math.log(x2) / base;
  });
}
function reflect(f2) {
  return function(x2) {
    return -f2(-x2);
  };
}
function log() {
  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]), domain = scale.domain, base = 10, logs = logp(10), pows = powp(10);
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0)
      logs = reflect(logs), pows = reflect(pows);
    return scale;
  }
  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = function(count2) {
    var d = domain(), u2 = d[0], v2 = d[d.length - 1], r2;
    if (r2 = v2 < u2)
      i2 = u2, u2 = v2, v2 = i2;
    var i2 = logs(u2), j = logs(v2), p2, k2, t2, n2 = count2 == null ? 10 : +count2, z2 = [];
    if (!(base % 1) && j - i2 < n2) {
      i2 = Math.round(i2) - 1, j = Math.round(j) + 1;
      if (u2 > 0)
        for (; i2 < j; ++i2) {
          for (k2 = 1, p2 = pows(i2); k2 < base; ++k2) {
            t2 = p2 * k2;
            if (t2 < u2)
              continue;
            if (t2 > v2)
              break;
            z2.push(t2);
          }
        }
      else
        for (; i2 < j; ++i2) {
          for (k2 = base - 1, p2 = pows(i2); k2 >= 1; --k2) {
            t2 = p2 * k2;
            if (t2 < u2)
              continue;
            if (t2 > v2)
              break;
            z2.push(t2);
          }
        }
    } else {
      z2 = ticks(i2, j, Math.min(j - i2, n2)).map(pows);
    }
    return r2 ? z2.reverse() : z2;
  };
  scale.tickFormat = function(count2, specifier) {
    if (specifier == null)
      specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function")
      specifier = format(specifier);
    if (count2 === Infinity)
      return specifier;
    if (count2 == null)
      count2 = 10;
    var k2 = Math.max(1, base * count2 / scale.ticks().length);
    return function(d) {
      var i2 = d / pows(Math.round(logs(d)));
      if (i2 * base < base - 0.5)
        i2 *= base;
      return i2 <= k2 ? specifier(d) : "";
    };
  };
  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x2) {
        return pows(Math.floor(logs(x2)));
      },
      ceil: function(x2) {
        return pows(Math.ceil(logs(x2)));
      }
    }));
  };
  scale.copy = function() {
    return copy(scale, log().base(base));
  };
  return scale;
}
var t0 = new Date(), t1 = new Date();
function newInterval(floori, offseti, count2, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? new Date() : new Date(+date2)), date2;
  }
  interval.floor = function(date2) {
    return floori(date2 = new Date(+date2)), date2;
  };
  interval.ceil = function(date2) {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = function(date2) {
    var d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = function(date2, step2) {
    return offseti(date2 = new Date(+date2), step2 == null ? 1 : Math.floor(step2)), date2;
  };
  interval.range = function(start, stop, step2) {
    var range2 = [], previous;
    start = interval.ceil(start);
    step2 = step2 == null ? 1 : Math.floor(step2);
    if (!(start < stop) || !(step2 > 0))
      return range2;
    do
      range2.push(previous = new Date(+start)), offseti(start, step2), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval.filter = function(test) {
    return newInterval(function(date2) {
      if (date2 >= date2)
        while (floori(date2), !test(date2))
          date2.setTime(date2 - 1);
    }, function(date2, step2) {
      if (date2 >= date2) {
        if (step2 < 0)
          while (++step2 <= 0) {
            while (offseti(date2, -1), !test(date2)) {
            }
          }
        else
          while (--step2 >= 0) {
            while (offseti(date2, 1), !test(date2)) {
            }
          }
      }
    });
  };
  if (count2) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count2(t0, t1));
    };
    interval.every = function(step2) {
      step2 = Math.floor(step2);
      return !isFinite(step2) || !(step2 > 0) ? null : !(step2 > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step2 === 0;
      } : function(d) {
        return interval.count(0, d) % step2 === 0;
      });
    };
  }
  return interval;
}
var millisecond = newInterval(function() {
}, function(date2, step2) {
  date2.setTime(+date2 + step2);
}, function(start, end) {
  return end - start;
});
millisecond.every = function(k2) {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0))
    return null;
  if (!(k2 > 1))
    return millisecond;
  return newInterval(function(date2) {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, function(date2, step2) {
    date2.setTime(+date2 + step2 * k2);
  }, function(start, end) {
    return (end - start) / k2;
  });
};
var utcMillisecond = millisecond;
millisecond.range;
var durationSecond$1 = 1e3;
var durationMinute$1 = 6e4;
var durationHour$1 = 36e5;
var durationDay$1 = 864e5;
var durationWeek$1 = 6048e5;
var second = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds());
}, function(date2, step2) {
  date2.setTime(+date2 + step2 * durationSecond$1);
}, function(start, end) {
  return (end - start) / durationSecond$1;
}, function(date2) {
  return date2.getUTCSeconds();
});
var utcSecond = second;
second.range;
var minute = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond$1);
}, function(date2, step2) {
  date2.setTime(+date2 + step2 * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date2) {
  return date2.getMinutes();
});
var timeMinute = minute;
minute.range;
var hour = newInterval(function(date2) {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond$1 - date2.getMinutes() * durationMinute$1);
}, function(date2, step2) {
  date2.setTime(+date2 + step2 * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date2) {
  return date2.getHours();
});
var timeHour = hour;
hour.range;
var day = newInterval(function(date2) {
  date2.setHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setDate(date2.getDate() + step2);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationDay$1;
}, function(date2) {
  return date2.getDate() - 1;
});
var timeDay = day;
day.range;
function weekday(i2) {
  return newInterval(function(date2) {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i2) % 7);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step2) {
    date2.setDate(date2.getDate() + step2 * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationWeek$1;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
sunday.range;
monday.range;
tuesday.range;
wednesday.range;
thursday.range;
friday.range;
saturday.range;
var month = newInterval(function(date2) {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setMonth(date2.getMonth() + step2);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date2) {
  return date2.getMonth();
});
var timeMonth = month;
month.range;
var year = newInterval(function(date2) {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setFullYear(date2.getFullYear() + step2);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date2) {
  return date2.getFullYear();
});
year.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, function(date2, step2) {
    date2.setFullYear(date2.getFullYear() + step2 * k2);
  });
};
var timeYear = year;
year.range;
var utcMinute = newInterval(function(date2) {
  date2.setUTCSeconds(0, 0);
}, function(date2, step2) {
  date2.setTime(+date2 + step2 * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date2) {
  return date2.getUTCMinutes();
});
var utcMinute$1 = utcMinute;
utcMinute.range;
var utcHour = newInterval(function(date2) {
  date2.setUTCMinutes(0, 0, 0);
}, function(date2, step2) {
  date2.setTime(+date2 + step2 * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date2) {
  return date2.getUTCHours();
});
var utcHour$1 = utcHour;
utcHour.range;
var utcDay = newInterval(function(date2) {
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setUTCDate(date2.getUTCDate() + step2);
}, function(start, end) {
  return (end - start) / durationDay$1;
}, function(date2) {
  return date2.getUTCDate() - 1;
});
var utcDay$1 = utcDay;
utcDay.range;
function utcWeekday(i2) {
  return newInterval(function(date2) {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i2) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step2) {
    date2.setUTCDate(date2.getUTCDate() + step2 * 7);
  }, function(start, end) {
    return (end - start) / durationWeek$1;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;
var utcMonth = newInterval(function(date2) {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setUTCMonth(date2.getUTCMonth() + step2);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date2) {
  return date2.getUTCMonth();
});
var utcMonth$1 = utcMonth;
utcMonth.range;
var utcYear = newInterval(function(date2) {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, function(date2, step2) {
  date2.setUTCFullYear(date2.getUTCFullYear() + step2);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date2) {
  return date2.getUTCFullYear();
});
utcYear.every = function(k2) {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : newInterval(function(date2) {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, function(date2, step2) {
    date2.setUTCFullYear(date2.getUTCFullYear() + step2 * k2);
  });
};
var utcYear$1 = utcYear;
utcYear.range;
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date2.setFullYear(d.y);
    return date2;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date2 = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date2.setUTCFullYear(d.y);
    return date2;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y2, m2, d) {
  return { y: y2, m: m2, d, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale2) {
  var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string2 = [], i2 = -1, j = 0, n2 = specifier.length, c2, pad2, format2;
      if (!(date2 instanceof Date))
        date2 = new Date(+date2);
      while (++i2 < n2) {
        if (specifier.charCodeAt(i2) === 37) {
          string2.push(specifier.slice(j, i2));
          if ((pad2 = pads[c2 = specifier.charAt(++i2)]) != null)
            c2 = specifier.charAt(++i2);
          else
            pad2 = c2 === "e" ? " " : "0";
          if (format2 = formats2[c2])
            c2 = format2(date2, pad2);
          string2.push(c2);
          j = i2 + 1;
        }
      }
      string2.push(specifier.slice(j, i2));
      return string2.join("");
    };
  }
  function newParse(specifier, Z3) {
    return function(string2) {
      var d = newDate(1900, void 0, 1), i2 = parseSpecifier(d, specifier, string2 += "", 0), week, day2;
      if (i2 != string2.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("s" in d)
        return new Date(d.s * 1e3 + ("L" in d ? d.L : 0));
      if (Z3 && !("Z" in d))
        d.Z = 0;
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if (d.m === void 0)
        d.m = "q" in d ? d.q : 0;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day2 = week.getUTCDay();
          week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay$1.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day2 = week.getDay();
          week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day2 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return localDate(d);
    };
  }
  function parseSpecifier(d, specifier, string2, j) {
    var i2 = 0, n2 = specifier.length, m2 = string2.length, c2, parse;
    while (i2 < n2) {
      if (j >= m2)
        return -1;
      c2 = specifier.charCodeAt(i2++);
      if (c2 === 37) {
        c2 = specifier.charAt(i2++);
        parse = parses[c2 in pads ? specifier.charAt(i2++) : c2];
        if (!parse || (j = parse(d, string2, j)) < 0)
          return -1;
      } else if (c2 != string2.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string2, i2) {
    var n2 = periodRe.exec(string2.slice(i2));
    return n2 ? (d.p = periodLookup[n2[0].toLowerCase()], i2 + n2[0].length) : -1;
  }
  function parseShortWeekday(d, string2, i2) {
    var n2 = shortWeekdayRe.exec(string2.slice(i2));
    return n2 ? (d.w = shortWeekdayLookup[n2[0].toLowerCase()], i2 + n2[0].length) : -1;
  }
  function parseWeekday(d, string2, i2) {
    var n2 = weekdayRe.exec(string2.slice(i2));
    return n2 ? (d.w = weekdayLookup[n2[0].toLowerCase()], i2 + n2[0].length) : -1;
  }
  function parseShortMonth(d, string2, i2) {
    var n2 = shortMonthRe.exec(string2.slice(i2));
    return n2 ? (d.m = shortMonthLookup[n2[0].toLowerCase()], i2 + n2[0].length) : -1;
  }
  function parseMonth(d, string2, i2) {
    var n2 = monthRe.exec(string2.slice(i2));
    return n2 ? (d.m = monthLookup[n2[0].toLowerCase()], i2 + n2[0].length) : -1;
  }
  function parseLocaleDateTime(d, string2, i2) {
    return parseSpecifier(d, locale_dateTime, string2, i2);
  }
  function parseLocaleDate(d, string2, i2) {
    return parseSpecifier(d, locale_date, string2, i2);
  }
  function parseLocaleTime(d, string2, i2) {
    return parseSpecifier(d, locale_time, string2, i2);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f2 = newFormat(specifier += "", formats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    parse: function(specifier) {
      var p2 = newParse(specifier += "", false);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    },
    utcFormat: function(specifier) {
      var f2 = newFormat(specifier += "", utcFormats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    utcParse: function(specifier) {
      var p2 = newParse(specifier += "", true);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string2 = (sign2 ? -value : value) + "", length = string2.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string2 : string2);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  var map2 = {}, i2 = -1, n2 = names.length;
  while (++i2 < n2)
    map2[names[i2].toLowerCase()] = i2;
  return map2;
}
function parseWeekdayNumberSunday(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 1));
  return n2 ? (d.w = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 1));
  return n2 ? (d.u = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberSunday(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.U = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberISO(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.V = +n2[0], i2 + n2[0].length) : -1;
}
function parseWeekNumberMonday(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.W = +n2[0], i2 + n2[0].length) : -1;
}
function parseFullYear(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 4));
  return n2 ? (d.y = +n2[0], i2 + n2[0].length) : -1;
}
function parseYear(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.y = +n2[0] + (+n2[0] > 68 ? 1900 : 2e3), i2 + n2[0].length) : -1;
}
function parseZone(d, string2, i2) {
  var n2 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string2.slice(i2, i2 + 6));
  return n2 ? (d.Z = n2[1] ? 0 : -(n2[2] + (n2[3] || "00")), i2 + n2[0].length) : -1;
}
function parseQuarter(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 1));
  return n2 ? (d.q = n2[0] * 3 - 3, i2 + n2[0].length) : -1;
}
function parseMonthNumber(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.m = n2[0] - 1, i2 + n2[0].length) : -1;
}
function parseDayOfMonth(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.d = +n2[0], i2 + n2[0].length) : -1;
}
function parseDayOfYear(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 3));
  return n2 ? (d.m = 0, d.d = +n2[0], i2 + n2[0].length) : -1;
}
function parseHour24(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.H = +n2[0], i2 + n2[0].length) : -1;
}
function parseMinutes(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.M = +n2[0], i2 + n2[0].length) : -1;
}
function parseSeconds(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 2));
  return n2 ? (d.S = +n2[0], i2 + n2[0].length) : -1;
}
function parseMilliseconds(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 3));
  return n2 ? (d.L = +n2[0], i2 + n2[0].length) : -1;
}
function parseMicroseconds(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2, i2 + 6));
  return n2 ? (d.L = Math.floor(n2[0] / 1e3), i2 + n2[0].length) : -1;
}
function parseLiteralPercent(d, string2, i2) {
  var n2 = percentRe.exec(string2.slice(i2, i2 + 1));
  return n2 ? i2 + n2[0].length : -1;
}
function parseUnixTimestamp(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2));
  return n2 ? (d.Q = +n2[0], i2 + n2[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string2, i2) {
  var n2 = numberRe.exec(string2.slice(i2));
  return n2 ? (d.s = +n2[0], i2 + n2[0].length) : -1;
}
function formatDayOfMonth(d, p2) {
  return pad(d.getDate(), p2, 2);
}
function formatHour24(d, p2) {
  return pad(d.getHours(), p2, 2);
}
function formatHour12(d, p2) {
  return pad(d.getHours() % 12 || 12, p2, 2);
}
function formatDayOfYear(d, p2) {
  return pad(1 + timeDay.count(timeYear(d), d), p2, 3);
}
function formatMilliseconds(d, p2) {
  return pad(d.getMilliseconds(), p2, 3);
}
function formatMicroseconds(d, p2) {
  return formatMilliseconds(d, p2) + "000";
}
function formatMonthNumber(d, p2) {
  return pad(d.getMonth() + 1, p2, 2);
}
function formatMinutes(d, p2) {
  return pad(d.getMinutes(), p2, 2);
}
function formatSeconds(d, p2) {
  return pad(d.getSeconds(), p2, 2);
}
function formatWeekdayNumberMonday(d) {
  var day2 = d.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d, p2) {
  return pad(sunday.count(timeYear(d) - 1, d), p2, 2);
}
function dISO(d) {
  var day2 = d.getDay();
  return day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
}
function formatWeekNumberISO(d, p2) {
  d = dISO(d);
  return pad(thursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p2, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p2) {
  return pad(monday.count(timeYear(d) - 1, d), p2, 2);
}
function formatYear(d, p2) {
  return pad(d.getFullYear() % 100, p2, 2);
}
function formatYearISO(d, p2) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p2, 2);
}
function formatFullYear(d, p2) {
  return pad(d.getFullYear() % 1e4, p2, 4);
}
function formatFullYearISO(d, p2) {
  var day2 = d.getDay();
  d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 1e4, p2, 4);
}
function formatZone(d) {
  var z2 = d.getTimezoneOffset();
  return (z2 > 0 ? "-" : (z2 *= -1, "+")) + pad(z2 / 60 | 0, "0", 2) + pad(z2 % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p2) {
  return pad(d.getUTCDate(), p2, 2);
}
function formatUTCHour24(d, p2) {
  return pad(d.getUTCHours(), p2, 2);
}
function formatUTCHour12(d, p2) {
  return pad(d.getUTCHours() % 12 || 12, p2, 2);
}
function formatUTCDayOfYear(d, p2) {
  return pad(1 + utcDay$1.count(utcYear$1(d), d), p2, 3);
}
function formatUTCMilliseconds(d, p2) {
  return pad(d.getUTCMilliseconds(), p2, 3);
}
function formatUTCMicroseconds(d, p2) {
  return formatUTCMilliseconds(d, p2) + "000";
}
function formatUTCMonthNumber(d, p2) {
  return pad(d.getUTCMonth() + 1, p2, 2);
}
function formatUTCMinutes(d, p2) {
  return pad(d.getUTCMinutes(), p2, 2);
}
function formatUTCSeconds(d, p2) {
  return pad(d.getUTCSeconds(), p2, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p2) {
  return pad(utcSunday.count(utcYear$1(d) - 1, d), p2, 2);
}
function UTCdISO(d) {
  var day2 = d.getUTCDay();
  return day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
}
function formatUTCWeekNumberISO(d, p2) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear$1(d), d) + (utcYear$1(d).getUTCDay() === 4), p2, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p2) {
  return pad(utcMonday.count(utcYear$1(d) - 1, d), p2, 2);
}
function formatUTCYear(d, p2) {
  return pad(d.getUTCFullYear() % 100, p2, 2);
}
function formatUTCYearISO(d, p2) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p2, 2);
}
function formatUTCFullYear(d, p2) {
  return pad(d.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCFullYearISO(d, p2) {
  var day2 = d.getUTCDay();
  d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}
var locale;
var timeFormat;
var utcFormat;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  locale.utcParse;
  return locale;
}
var durationSecond = 1e3, durationMinute = durationSecond * 60, durationHour = durationMinute * 60, durationDay = durationHour * 24, durationWeek = durationDay * 7, durationMonth = durationDay * 30, durationYear = durationDay * 365;
function date(t2) {
  return new Date(t2);
}
function number(t2) {
  return t2 instanceof Date ? +t2 : +new Date(+t2);
}
function calendar(year2, month2, week, day2, hour2, minute2, second2, millisecond2, format2) {
  var scale = continuous(deinterpolateLinear, reinterpolate$1), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  var tickIntervals = [
    [second2, 1, durationSecond],
    [second2, 5, 5 * durationSecond],
    [second2, 15, 15 * durationSecond],
    [second2, 30, 30 * durationSecond],
    [minute2, 1, durationMinute],
    [minute2, 5, 5 * durationMinute],
    [minute2, 15, 15 * durationMinute],
    [minute2, 30, 30 * durationMinute],
    [hour2, 1, durationHour],
    [hour2, 3, 3 * durationHour],
    [hour2, 6, 6 * durationHour],
    [hour2, 12, 12 * durationHour],
    [day2, 1, durationDay],
    [day2, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month2, 1, durationMonth],
    [month2, 3, 3 * durationMonth],
    [year2, 1, durationYear]
  ];
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute2(date2) < date2 ? formatSecond : hour2(date2) < date2 ? formatMinute : day2(date2) < date2 ? formatHour : month2(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year2(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  function tickInterval(interval, start, stop, step2) {
    if (interval == null)
      interval = 10;
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval, i2 = bisector(function(i3) {
        return i3[2];
      }).right(tickIntervals, target);
      if (i2 === tickIntervals.length) {
        step2 = tickStep(start / durationYear, stop / durationYear, interval);
        interval = year2;
      } else if (i2) {
        i2 = tickIntervals[target / tickIntervals[i2 - 1][2] < tickIntervals[i2][2] / target ? i2 - 1 : i2];
        step2 = i2[1];
        interval = i2[0];
      } else {
        step2 = Math.max(tickStep(start, stop, interval), 1);
        interval = millisecond2;
      }
    }
    return step2 == null ? interval : interval.every(step2);
  }
  scale.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? domain(map$1.call(_, number)) : domain().map(date);
  };
  scale.ticks = function(interval, step2) {
    var d = domain(), t02 = d[0], t12 = d[d.length - 1], r2 = t12 < t02, t2;
    if (r2)
      t2 = t02, t02 = t12, t12 = t2;
    t2 = tickInterval(interval, t02, t12, step2);
    t2 = t2 ? t2.range(t02, t12 + 1) : [];
    return r2 ? t2.reverse() : t2;
  };
  scale.tickFormat = function(count2, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval, step2) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step2)) ? domain(nice(d, interval)) : scale;
  };
  scale.copy = function() {
    return copy(scale, calendar(year2, month2, week, day2, hour2, minute2, second2, millisecond2, format2));
  };
  return scale;
}
function scaleTime() {
  return calendar(timeYear, timeMonth, sunday, timeDay, timeHour, timeMinute, utcSecond, utcMillisecond, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]);
}
function scaleUtc() {
  return calendar(utcYear$1, utcMonth$1, utcSunday, utcDay$1, utcHour$1, utcMinute$1, utcSecond, utcMillisecond, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]);
}
function colors(s2) {
  return s2.match(/.{6}/g).map(function(x2) {
    return "#" + x2;
  });
}
colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");
colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");
colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");
cubehelixLong(cubehelix$1(300, 0.5, 0), cubehelix$1(-240, 0.5, 1));
cubehelixLong(cubehelix$1(-100, 0.75, 0.35), cubehelix$1(80, 1.5, 0.8));
cubehelixLong(cubehelix$1(260, 0.75, 0.35), cubehelix$1(80, 1.5, 0.8));
cubehelix$1();
function ramp(range2) {
  var n2 = range2.length;
  return function(t2) {
    return range2[Math.max(0, Math.min(n2 - 1, Math.floor(t2 * n2)))];
  };
}
ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
var _slicedToArray$1 = function() {
  function sliceIterator(arr, i2) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"])
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i2) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i2);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
var _React$version$split = React.version.split("."), _React$version$split2 = _slicedToArray$1(_React$version$split, 2), major = _React$version$split2[0], minor = _React$version$split2[1];
var versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;
var isReactDOMSupported = function isReactDOMSupported2() {
  return versionHigherThanThirteen;
};
var getDOMNode = function getDOMNode2(ref) {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }
  return ref;
};
var USED_MESSAGES = {};
var HIDDEN_PROCESSES = {
  test: true,
  production: true
};
function warning(message) {
  var onlyShowMessageOnce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (global.process && HIDDEN_PROCESSES["production"]) {
    return;
  }
  if (!onlyShowMessageOnce || !USED_MESSAGES[message]) {
    console.warn(message);
    USED_MESSAGES[message] = true;
  }
}
function getUniquePropertyValues(arr, accessor) {
  var setOfValues = new Set(arr.map(accessor));
  return Array.from(setOfValues);
}
function addValueToArray(arr, value) {
  var result = [].concat(arr);
  if (result[0] > value) {
    result[0] = value;
  }
  if (result[result.length - 1] < value) {
    result[result.length - 1] = value;
  }
  return result;
}
function transformValueToString(value) {
  return Object.prototype.toString.call(value) === "[object Date]" ? value.toDateString() : value;
}
var _extends$U = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _slicedToArray = function() {
  function sliceIterator(arr, i2) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i2 && _arr.length === i2)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"])
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i2) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i2);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
var _SCALE_FUNCTIONS;
function _toConsumableArray$3(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LINEAR_SCALE_TYPE = "linear";
var ORDINAL_SCALE_TYPE = "ordinal";
var CATEGORY_SCALE_TYPE = "category";
var LITERAL_SCALE_TYPE = "literal";
var LOG_SCALE_TYPE = "log";
var TIME_SCALE_TYPE = "time";
var TIME_UTC_SCALE_TYPE = "time-utc";
var SCALE_FUNCTIONS = (_SCALE_FUNCTIONS = {}, _defineProperty$8(_SCALE_FUNCTIONS, LINEAR_SCALE_TYPE, linear), _defineProperty$8(_SCALE_FUNCTIONS, ORDINAL_SCALE_TYPE, point$4), _defineProperty$8(_SCALE_FUNCTIONS, CATEGORY_SCALE_TYPE, ordinal), _defineProperty$8(_SCALE_FUNCTIONS, LITERAL_SCALE_TYPE, literalScale), _defineProperty$8(_SCALE_FUNCTIONS, LOG_SCALE_TYPE, log), _defineProperty$8(_SCALE_FUNCTIONS, TIME_SCALE_TYPE, scaleTime), _defineProperty$8(_SCALE_FUNCTIONS, TIME_UTC_SCALE_TYPE, scaleUtc), _SCALE_FUNCTIONS);
var XYPLOT_ATTR = ["color", "fill", "opacity", "stroke"];
function toTitleCase(str) {
  return "" + str[0].toUpperCase() + str.slice(1);
}
function _getSmallestDistanceIndex(values, scaleObject) {
  var scaleFn = getScaleFnFromScaleObject(scaleObject);
  var result = 0;
  if (scaleFn) {
    var nextValue = void 0;
    var currentValue = scaleFn(values[0]);
    var distance = Infinity;
    var nextDistance = void 0;
    for (var i2 = 1; i2 < values.length; i2++) {
      nextValue = scaleFn(values[i2]);
      nextDistance = Math.abs(nextValue - currentValue);
      if (nextDistance < distance) {
        distance = nextDistance;
        result = i2;
      }
      currentValue = nextValue;
    }
  }
  return result;
}
function addInvertFunctionToOrdinalScaleObject(scale) {
  if (scale.invert) {
    return;
  }
  scale.invert = function invert(value) {
    var _scale$range = scale.range(), _scale$range2 = _slicedToArray(_scale$range, 2), lower = _scale$range2[0], upper = _scale$range2[1];
    var start = Math.min(lower, upper);
    var stop = Math.max(lower, upper);
    if (value < start + scale.padding() * scale.step()) {
      return scale.domain()[0];
    }
    if (value > stop - scale.padding() * scale.step()) {
      return scale.domain()[scale.domain().length - 1];
    }
    var index = Math.floor((value - start - scale.padding() * scale.step()) / scale.step());
    return scale.domain()[index];
  };
}
function getScaleFnFromScaleObject(scaleObject) {
  if (!scaleObject) {
    return null;
  }
  var type = scaleObject.type, domain = scaleObject.domain, range2 = scaleObject.range;
  var modDomain = domain[0] === domain[1] ? domain[0] === 0 ? [-1, 0] : [-domain[0], domain[0]] : domain;
  if (type === LITERAL_SCALE_TYPE) {
    return literalScale(range2[0]);
  }
  var scale = SCALE_FUNCTIONS[type]().domain(modDomain).range(range2);
  if (type === ORDINAL_SCALE_TYPE) {
    scale.padding(0.5);
    addInvertFunctionToOrdinalScaleObject(scale);
  }
  return scale;
}
function getDomainByAccessor(allData, accessor, accessor0, type) {
  var domain = void 0;
  var values = allData.reduce(function(data, d) {
    var value = accessor(d);
    var value0 = accessor0(d);
    if (_isDefined(value)) {
      data.push(value);
    }
    if (_isDefined(value0)) {
      data.push(value0);
    }
    return data;
  }, []);
  if (!values.length) {
    return [];
  }
  if (type !== ORDINAL_SCALE_TYPE && type !== CATEGORY_SCALE_TYPE) {
    domain = extent(values);
  } else {
    domain = set(values).values();
  }
  return domain;
}
function _createScaleObjectForValue(attr, value, type, accessor, accessor0) {
  if (type === LITERAL_SCALE_TYPE) {
    return {
      type: LITERAL_SCALE_TYPE,
      domain: [],
      range: [value],
      distance: 0,
      attr,
      baseValue: void 0,
      isValue: true,
      accessor,
      accessor0
    };
  }
  if (typeof value === "undefined") {
    return null;
  }
  return {
    type: CATEGORY_SCALE_TYPE,
    range: [value],
    domain: [],
    distance: 0,
    attr,
    baseValue: void 0,
    isValue: true,
    accessor,
    accessor0
  };
}
function _createScaleObjectForFunction(_ref) {
  var domain = _ref.domain, range2 = _ref.range, type = _ref.type, distance = _ref.distance, attr = _ref.attr, baseValue = _ref.baseValue, accessor = _ref.accessor, accessor0 = _ref.accessor0;
  return {
    domain,
    range: range2,
    type,
    distance,
    attr,
    baseValue,
    isValue: false,
    accessor,
    accessor0
  };
}
function _collectScaleObjectFromProps(props, attr) {
  var value = props[attr], fallbackValue = props["_" + attr + "Value"], range2 = props[attr + "Range"], _props$ = props[attr + "Distance"], distance = _props$ === void 0 ? 0 : _props$, baseValue = props[attr + "BaseValue"], _props$2 = props[attr + "Type"], type = _props$2 === void 0 ? LINEAR_SCALE_TYPE : _props$2, noFallBack = props[attr + "NoFallBack"], _props$3 = props["get" + toTitleCase(attr)], accessor = _props$3 === void 0 ? function(d) {
    return d[attr];
  } : _props$3, _props$4 = props["get" + toTitleCase(attr) + "0"], accessor0 = _props$4 === void 0 ? function(d) {
    return d[attr + "0"];
  } : _props$4;
  var domain = props[attr + "Domain"];
  if (!noFallBack && typeof value !== "undefined") {
    return _createScaleObjectForValue(attr, value, props[attr + "Type"], accessor, accessor0);
  }
  if (typeof baseValue !== "undefined") {
    domain = addValueToArray(domain, baseValue);
  }
  if (!range2 || !domain || !domain.length) {
    return _createScaleObjectForValue(attr, fallbackValue, props[attr + "Type"], accessor, accessor0);
  }
  return _createScaleObjectForFunction({
    domain,
    range: range2,
    type,
    distance,
    attr,
    baseValue,
    accessor,
    accessor0
  });
}
function _computeLeftDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[1] - values[0]) / 2;
  }
  if (values.length === 1) {
    return values[0] - 0.5;
  }
  return 0;
}
function _computeRightDomainAdjustment(values) {
  if (values.length > 1) {
    return (values[values.length - 1] - values[values.length - 2]) / 2;
  }
  if (values.length === 1) {
    return values[0] - 0.5;
  }
  return 0;
}
function _computeScaleDistance(values, domain, bestDistIndex, scaleFn) {
  if (values.length > 1) {
    var i2 = Math.max(bestDistIndex, 1);
    return Math.abs(scaleFn(values[i2]) - scaleFn(values[i2 - 1]));
  }
  if (values.length === 1) {
    return Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  }
  return 0;
}
function _normalizeValues(data, values, accessor0, type) {
  if (type === TIME_SCALE_TYPE && values.length === 1) {
    var attr0 = accessor0(data[0]);
    return [attr0].concat(_toConsumableArray$3(values));
  }
  return values;
}
function _getScaleDistanceAndAdjustedDomain(data, scaleObject) {
  var domain = scaleObject.domain, type = scaleObject.type, accessor = scaleObject.accessor, accessor0 = scaleObject.accessor0;
  var uniqueValues = getUniquePropertyValues(data, accessor);
  var values = _normalizeValues(data, uniqueValues, accessor0, type);
  var index = _getSmallestDistanceIndex(values, scaleObject);
  var adjustedDomain = [].concat(domain);
  adjustedDomain[0] -= _computeLeftDomainAdjustment(values);
  adjustedDomain[domain.length - 1] += _computeRightDomainAdjustment(values);
  if (type === LOG_SCALE_TYPE && domain[0] <= 0) {
    adjustedDomain[0] = Math.min(domain[1] / 10, 1);
  }
  var adjustedScaleFn = getScaleFnFromScaleObject(_extends$U({}, scaleObject, {
    domain: adjustedDomain
  }));
  var distance = _computeScaleDistance(values, adjustedDomain, index, adjustedScaleFn);
  return {
    domain0: adjustedDomain[0],
    domainN: adjustedDomain[adjustedDomain.length - 1],
    distance
  };
}
function _isScaleAdjustmentPossible(props, scaleObject) {
  var attr = scaleObject.attr;
  var _props$_adjustBy = props._adjustBy, adjustBy = _props$_adjustBy === void 0 ? [] : _props$_adjustBy, _props$_adjustWhat = props._adjustWhat, adjustWhat = _props$_adjustWhat === void 0 ? [] : _props$_adjustWhat;
  return adjustWhat.length && adjustBy.length && adjustBy.indexOf(attr) !== -1;
}
function _adjustContinuousScale(props, scaleObject) {
  var allSeriesData = props._allData, _props$_adjustWhat2 = props._adjustWhat, adjustWhat = _props$_adjustWhat2 === void 0 ? [] : _props$_adjustWhat2;
  var domainLength = scaleObject.domain.length;
  var domain = scaleObject.domain;
  var scaleDomain0 = domain[0];
  var scaleDomainN = domain[domainLength - 1];
  var scaleDistance = scaleObject.distance;
  allSeriesData.forEach(function(data, index) {
    if (adjustWhat.indexOf(index) === -1) {
      return;
    }
    if (data && data.length) {
      var _getScaleDistanceAndA = _getScaleDistanceAndAdjustedDomain(data, scaleObject), domain0 = _getScaleDistanceAndA.domain0, domainN = _getScaleDistanceAndA.domainN, distance = _getScaleDistanceAndA.distance;
      scaleDomain0 = Math.min(scaleDomain0, domain0);
      scaleDomainN = Math.max(scaleDomainN, domainN);
      scaleDistance = Math.max(scaleDistance, distance);
    }
  });
  scaleObject.domain = [scaleDomain0].concat(_toConsumableArray$3(domain.slice(1, -1)), [scaleDomainN]);
  scaleObject.distance = scaleDistance;
  return scaleObject;
}
function _adjustCategoricalScale(scaleObject) {
  var scaleFn = getScaleFnFromScaleObject(scaleObject);
  var domain = scaleObject.domain, range2 = scaleObject.range;
  if (domain.length > 1) {
    scaleObject.distance = Math.abs(scaleFn(domain[1]) - scaleFn(domain[0]));
  } else {
    scaleObject.distance = Math.abs(range2[1] - range2[0]);
  }
  return scaleObject;
}
function getScaleObjectFromProps(props, attr) {
  var scaleObject = _collectScaleObjectFromProps(props, attr);
  if (!scaleObject) {
    return null;
  }
  if (!_isScaleAdjustmentPossible(props, scaleObject)) {
    return scaleObject;
  }
  var type = scaleObject.type;
  if (type === ORDINAL_SCALE_TYPE || type === CATEGORY_SCALE_TYPE) {
    return _adjustCategoricalScale(scaleObject);
  }
  return _adjustContinuousScale(props, scaleObject);
}
function getAttributeScale(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  return getScaleFnFromScaleObject(scaleObject);
}
function _getAttrValue(d, accessor) {
  return accessor(d.data ? d.data : d);
}
function _isDefined(value) {
  return typeof value !== "undefined";
}
function _padDomain(domain, padding) {
  if (!domain) {
    return domain;
  }
  if (isNaN(parseFloat(domain[0])) || isNaN(parseFloat(domain[1]))) {
    return domain;
  }
  var _domain = _slicedToArray(domain, 2), min2 = _domain[0], max2 = _domain[1];
  var domainPadding = (max2 - min2) * (padding * 0.01);
  return [min2 - domainPadding, max2 + domainPadding];
}
function getAttributeFunctor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    var scaleFn = getScaleFnFromScaleObject(scaleObject);
    return function(d) {
      return scaleFn(_getAttrValue(d, scaleObject.accessor));
    };
  }
  return null;
}
function getAttr0Functor(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    var domain = scaleObject.domain;
    var _scaleObject$baseValu = scaleObject.baseValue, baseValue = _scaleObject$baseValu === void 0 ? domain[0] : _scaleObject$baseValu;
    var scaleFn = getScaleFnFromScaleObject(scaleObject);
    return function(d) {
      var value = _getAttrValue(d, scaleObject.accessor0);
      return scaleFn(_isDefined(value) ? value : baseValue);
    };
  }
  return null;
}
function getAttributeValue(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  if (scaleObject) {
    if (!scaleObject.isValue && props["_" + attr + "Value"] === void 0) {
      warning("[React-vis] Cannot use data defined " + attr + " for this series type. Using fallback value instead.");
    }
    return props["_" + attr + "Value"] || scaleObject.range[0];
  }
  return null;
}
function getScalePropTypesByAttribute(attr) {
  var _ref2;
  return _ref2 = {}, _defineProperty$8(_ref2, "_" + attr + "Value", PropTypes.any), _defineProperty$8(_ref2, attr + "Domain", PropTypes.array), _defineProperty$8(_ref2, "get" + toTitleCase(attr), PropTypes.func), _defineProperty$8(_ref2, "get" + toTitleCase(attr) + "0", PropTypes.func), _defineProperty$8(_ref2, attr + "Range", PropTypes.array), _defineProperty$8(_ref2, attr + "Type", PropTypes.oneOf(Object.keys(SCALE_FUNCTIONS))), _defineProperty$8(_ref2, attr + "Distance", PropTypes.number), _defineProperty$8(_ref2, attr + "BaseValue", PropTypes.any), _ref2;
}
function extractScalePropsFromProps(props, attributes) {
  var result = {};
  Object.keys(props).forEach(function(key) {
    var attr = attributes.find(function(a2) {
      var isPlainSet = key.indexOf(a2) === 0;
      var isUnderscoreSet = key.indexOf("_" + a2) === 0;
      var usesGet = key.indexOf("get" + toTitleCase(a2)) === 0;
      return isPlainSet || isUnderscoreSet || usesGet;
    });
    if (!attr) {
      return;
    }
    result[key] = props[key];
  });
  return result;
}
function getMissingScaleProps(props, data, attributes) {
  var result = {};
  attributes.forEach(function(attr) {
    if (!props["get" + toTitleCase(attr)]) {
      result["get" + toTitleCase(attr)] = function(d) {
        return d[attr];
      };
    }
    if (!props["get" + toTitleCase(attr) + "0"]) {
      result["get" + toTitleCase(attr) + "0"] = function(d) {
        return d[attr + "0"];
      };
    }
    if (!props[attr + "Domain"]) {
      result[attr + "Domain"] = getDomainByAccessor(data, props["get" + toTitleCase(attr)] || result["get" + toTitleCase(attr)], props["get" + toTitleCase(attr) + "0"] || result["get" + toTitleCase(attr) + "0"], props[attr + "Type"]);
      if (props[attr + "Padding"]) {
        result[attr + "Domain"] = _padDomain(result[attr + "Domain"], props[attr + "Padding"]);
      }
    }
  });
  return result;
}
function literalScale(defaultValue) {
  function scale(d) {
    if (d === void 0) {
      return defaultValue;
    }
    return d;
  }
  function response() {
    return scale;
  }
  scale.domain = response;
  scale.range = response;
  scale.unknown = response;
  scale.copy = response;
  return scale;
}
function getFontColorFromBackground(background) {
  if (background) {
    return hsl(background).l > 0.57 ? "#222" : "#fff";
  }
  return null;
}
function getXYPlotValues(props, children) {
  var XYPlotScales = XYPLOT_ATTR.reduce(function(prev, attr) {
    var domain = props[attr + "Domain"], range2 = props[attr + "Range"], type = props[attr + "Type"];
    if (domain && range2 && type) {
      return _extends$U({}, prev, _defineProperty$8({}, attr, SCALE_FUNCTIONS[type]().domain(domain).range(range2)));
    }
    return prev;
  }, {});
  return children.map(function(child) {
    return XYPLOT_ATTR.reduce(function(prev, attr) {
      if (child.props && child.props[attr] !== void 0) {
        var scaleInput = child.props[attr];
        var scale = XYPlotScales[attr];
        var fallbackValue = scale ? scale(scaleInput) : scaleInput;
        return _extends$U({}, prev, _defineProperty$8({}, "_" + attr + "Value", fallbackValue));
      }
      return prev;
    }, {});
  });
}
var OPTIONAL_SCALE_PROPS = ["Padding"];
var OPTIONAL_SCALE_PROPS_REGS = OPTIONAL_SCALE_PROPS.map(function(str) {
  return new RegExp(str + "$", "i");
});
function getOptionalScaleProps(props) {
  return Object.keys(props).reduce(function(acc, prop) {
    var propIsNotOptional = OPTIONAL_SCALE_PROPS_REGS.every(function(reg) {
      return !prop.match(reg);
    });
    if (propIsNotOptional) {
      return acc;
    }
    acc[prop] = props[prop];
    return acc;
  }, {});
}
var _createClass$G = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$T = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$G(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$G(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$G(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var propTypes$9 = _extends$T({}, getScalePropTypesByAttribute("x"), getScalePropTypesByAttribute("y"), getScalePropTypesByAttribute("size"), getScalePropTypesByAttribute("opacity"), getScalePropTypesByAttribute("color"), {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueRightClick: PropTypes.func,
  onSeriesMouseOver: PropTypes.func,
  onSeriesMouseOut: PropTypes.func,
  onSeriesClick: PropTypes.func,
  onSeriesRightClick: PropTypes.func,
  onNearestX: PropTypes.func,
  onNearestXY: PropTypes.func,
  style: PropTypes.object,
  animation: AnimationPropType,
  stack: PropTypes.bool
});
var defaultProps$9 = {
  className: "",
  stack: false,
  style: {}
};
var AbstractSeries = function(_PureComponent) {
  _inherits$G(AbstractSeries2, _PureComponent);
  function AbstractSeries2() {
    var _ref;
    var _temp, _this, _ret;
    _classCallCheck$G(this, AbstractSeries2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$G(this, (_ref = AbstractSeries2.__proto__ || Object.getPrototypeOf(AbstractSeries2)).call.apply(_ref, [this].concat(args))), _this), _this._seriesClickHandler = function(event) {
      var onSeriesClick = _this.props.onSeriesClick;
      if (onSeriesClick) {
        onSeriesClick({ event });
      }
    }, _this._seriesMouseOutHandler = function(event) {
      var onSeriesMouseOut = _this.props.onSeriesMouseOut;
      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event });
      }
    }, _this._seriesMouseOverHandler = function(event) {
      var onSeriesMouseOver = _this.props.onSeriesMouseOver;
      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event });
      }
    }, _this._seriesRightClickHandler = function(event) {
      var onSeriesRightClick = _this.props.onSeriesRightClick;
      if (onSeriesRightClick) {
        onSeriesRightClick({ event });
      }
    }, _this._valueClickHandler = function(d, event) {
      var _this$props = _this.props, onValueClick = _this$props.onValueClick, onSeriesClick = _this$props.onSeriesClick;
      if (onValueClick) {
        onValueClick(d, { event });
      }
      if (onSeriesClick) {
        onSeriesClick({ event });
      }
    }, _this._valueMouseOutHandler = function(d, event) {
      var _this$props2 = _this.props, onValueMouseOut = _this$props2.onValueMouseOut, onSeriesMouseOut = _this$props2.onSeriesMouseOut;
      if (onValueMouseOut) {
        onValueMouseOut(d, { event });
      }
      if (onSeriesMouseOut) {
        onSeriesMouseOut({ event });
      }
    }, _this._valueMouseOverHandler = function(d, event) {
      var _this$props3 = _this.props, onValueMouseOver = _this$props3.onValueMouseOver, onSeriesMouseOver = _this$props3.onSeriesMouseOver;
      if (onValueMouseOver) {
        onValueMouseOver(d, { event });
      }
      if (onSeriesMouseOver) {
        onSeriesMouseOver({ event });
      }
    }, _this._valueRightClickHandler = function(d, event) {
      var _this$props4 = _this.props, onValueRightClick = _this$props4.onValueRightClick, onSeriesRightClick = _this$props4.onSeriesRightClick;
      if (onValueRightClick) {
        onValueRightClick(d, { event });
      }
      if (onSeriesRightClick) {
        onSeriesRightClick({ event });
      }
    }, _temp), _possibleConstructorReturn$G(_this, _ret);
  }
  _createClass$G(AbstractSeries2, [{
    key: "onParentMouseMove",
    value: function onParentMouseMove(event) {
      var _props = this.props, onNearestX = _props.onNearestX, onNearestXY = _props.onNearestXY, data = _props.data;
      if (!onNearestX && !onNearestXY || !data) {
        return;
      }
      if (onNearestXY) {
        this._handleNearestXY(event);
      } else {
        this._handleNearestX(event);
      }
    }
  }, {
    key: "onParentTouchMove",
    value: function onParentTouchMove(e3) {
      e3.preventDefault();
      this.onParentMouseMove(e3);
    }
  }, {
    key: "onParentTouchStart",
    value: function onParentTouchStart(e3) {
      e3.preventDefault();
    }
  }, {
    key: "_getAttr0Functor",
    value: function _getAttr0Functor(attr) {
      return getAttr0Functor(this.props, attr);
    }
  }, {
    key: "_getAttributeFunctor",
    value: function _getAttributeFunctor(attr) {
      return getAttributeFunctor(this.props, attr);
    }
  }, {
    key: "_getAttributeValue",
    value: function _getAttributeValue(attr) {
      return getAttributeValue(this.props, attr);
    }
  }, {
    key: "_getScaleDistance",
    value: function _getScaleDistance(attr) {
      var scaleObject = getScaleObjectFromProps(this.props, attr);
      return scaleObject ? scaleObject.distance : 0;
    }
  }, {
    key: "_getXYCoordinateInContainer",
    value: function _getXYCoordinateInContainer(event) {
      var _props2 = this.props, _props2$marginTop = _props2.marginTop, marginTop = _props2$marginTop === void 0 ? 0 : _props2$marginTop, _props2$marginLeft = _props2.marginLeft, marginLeft = _props2$marginLeft === void 0 ? 0 : _props2$marginLeft;
      var evt = event.nativeEvent, currentTarget = event.currentTarget;
      var rect = currentTarget.getBoundingClientRect();
      var x2 = evt.clientX;
      var y2 = evt.clientY;
      if (evt.type === "touchmove") {
        x2 = evt.touches[0].pageX;
        y2 = evt.touches[0].pageY;
      }
      return {
        x: x2 - rect.left - currentTarget.clientLeft - marginLeft,
        y: y2 - rect.top - currentTarget.clientTop - marginTop
      };
    }
  }, {
    key: "_handleNearestX",
    value: function _handleNearestX(event) {
      var _props3 = this.props, onNearestX = _props3.onNearestX, data = _props3.data;
      var minDistance = Number.POSITIVE_INFINITY;
      var value = null;
      var valueIndex = null;
      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor("x");
      data.forEach(function(item, i2) {
        var currentCoordinate = xScaleFn(item);
        var newDistance = Math.abs(coordinate.x - currentCoordinate);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          value = item;
          valueIndex = i2;
        }
      });
      if (!value) {
        return;
      }
      onNearestX(value, {
        innerX: xScaleFn(value),
        index: valueIndex,
        event: event.nativeEvent
      });
    }
  }, {
    key: "_handleNearestXY",
    value: function _handleNearestXY(event) {
      var _props4 = this.props, onNearestXY = _props4.onNearestXY, data = _props4.data;
      var coordinate = this._getXYCoordinateInContainer(event);
      var xScaleFn = this._getAttributeFunctor("x");
      var yScaleFn = this._getAttributeFunctor("y");
      var voronoiInstance = voronoi().x(xScaleFn).y(yScaleFn);
      var foundPoint = voronoiInstance(data).find(coordinate.x, coordinate.y);
      var value = foundPoint.data;
      if (!value) {
        return;
      }
      onNearestXY(value, {
        innerX: foundPoint[0],
        innerY: foundPoint[1],
        index: foundPoint.index,
        event: event.nativeEvent
      });
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig() {
      return {};
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return true;
    }
  }]);
  return AbstractSeries2;
}(react.exports.PureComponent);
AbstractSeries.displayName = "AbstractSeries";
AbstractSeries.propTypes = propTypes$9;
AbstractSeries.defaultProps = defaultProps$9;
var DISCRETE_COLOR_RANGE = ["#12939A", "#79C7E3", "#1A3177", "#FF9833", "#EF5D28"];
var EXTENDED_DISCRETE_COLOR_RANGE = ["#19CDD7", "#DDB27C", "#88572C", "#FF991F", "#F15C17", "#223F9A", "#DA70BF", "#125C77", "#4DC19C", "#776E57", "#12939A", "#17B8BE", "#F6D18A", "#B7885E", "#FFCB99", "#F89570", "#829AE3", "#E79FD5", "#1E96BE", "#89DAC1", "#B3AD9E"];
var CONTINUOUS_COLOR_RANGE = ["#EF5D28", "#FF9833"];
var SIZE_RANGE = [1, 10];
var OPACITY_TYPE = "literal";
var DEFAULT_OPACITY = 1;
var DEFAULT_SIZE = 5;
var DEFAULT_COLOR$1 = DISCRETE_COLOR_RANGE[0];
var _extends$S = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function isSeriesChild(child) {
  var prototype = child.type.prototype;
  return prototype instanceof AbstractSeries;
}
function getSeriesChildren(children) {
  return React.Children.toArray(children).filter(function(child) {
    return child && isSeriesChild(child);
  });
}
function collectSeriesTypesInfo(children) {
  var result = {};
  children.filter(isSeriesChild).forEach(function(child) {
    var displayName = child.type.displayName;
    var cluster = child.props.cluster;
    if (!result[displayName]) {
      result[displayName] = {
        sameTypeTotal: 0,
        sameTypeIndex: 0,
        clusters: /* @__PURE__ */ new Set()
      };
    }
    result[displayName].clusters.add(cluster);
    result[displayName].sameTypeTotal++;
  });
  return result;
}
function seriesHasAngleRadius() {
  var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  if (!data) {
    return false;
  }
  return data.some(function(row) {
    return row.radius && row.angle;
  });
}
function prepareData(data) {
  if (!seriesHasAngleRadius(data)) {
    return data;
  }
  return data.map(function(row) {
    return _extends$S({}, row, {
      x: row.radius * Math.cos(row.angle),
      y: row.radius * Math.sin(row.angle)
    });
  });
}
function getStackedData(children, attr) {
  var areSomeSeriesStacked = children.some(function(series) {
    return series && series.props.stack;
  });
  var latestAttrPositions = {};
  return children.reduce(function(accumulator, series, seriesIndex) {
    if (!series) {
      accumulator.push(null);
      return accumulator;
    }
    var seriesType = series.type.displayName;
    var _series$props = series.props, data = _series$props.data, _series$props$cluster = _series$props.cluster, cluster = _series$props$cluster === void 0 ? "default" : _series$props$cluster, stack2 = _series$props.stack;
    var preppedData = prepareData(data);
    if (!attr || !preppedData || !preppedData.length || areSomeSeriesStacked && !stack2) {
      accumulator.push(preppedData);
      return accumulator;
    }
    var attr0 = attr + "0";
    var baseAttr = attr === "y" ? "x" : "y";
    accumulator.push(preppedData.map(function(d, dIndex) {
      var _extends2, _latestAttrPositions$2;
      if (!latestAttrPositions[cluster]) {
        latestAttrPositions[cluster] = {};
      }
      if (!latestAttrPositions[cluster][seriesType]) {
        latestAttrPositions[cluster][seriesType] = {};
      }
      var prevD = latestAttrPositions[cluster][seriesType][d[baseAttr]];
      if (!prevD) {
        var _latestAttrPositions$;
        latestAttrPositions[cluster][seriesType][d[baseAttr]] = (_latestAttrPositions$ = {}, _defineProperty$7(_latestAttrPositions$, attr0, d[attr0]), _defineProperty$7(_latestAttrPositions$, attr, d[attr]), _latestAttrPositions$);
        return _extends$S({}, d);
      }
      var nextD = _extends$S({}, d, (_extends2 = {}, _defineProperty$7(_extends2, attr0, prevD[attr]), _defineProperty$7(_extends2, attr, prevD[attr] + d[attr] - (d[attr0] || 0)), _extends2));
      latestAttrPositions[cluster][seriesType][d[baseAttr]] = (_latestAttrPositions$2 = {}, _defineProperty$7(_latestAttrPositions$2, attr0, nextD[attr0]), _defineProperty$7(_latestAttrPositions$2, attr, nextD[attr]), _latestAttrPositions$2);
      return nextD;
    }));
    return accumulator;
  }, []);
}
function getSeriesPropsFromChildren(children) {
  var result = [];
  var seriesTypesInfo = collectSeriesTypesInfo(children);
  var seriesIndex = 0;
  var _opacityValue = DEFAULT_OPACITY;
  children.forEach(function(child) {
    var props = void 0;
    if (isSeriesChild(child)) {
      var seriesTypeInfo = seriesTypesInfo[child.type.displayName];
      var _colorValue = DISCRETE_COLOR_RANGE[seriesIndex % DISCRETE_COLOR_RANGE.length];
      props = _extends$S({}, seriesTypeInfo, {
        seriesIndex,
        _colorValue,
        _opacityValue
      });
      seriesTypeInfo.sameTypeIndex++;
      seriesIndex++;
      if (child.props.cluster) {
        props.cluster = child.props.cluster;
        props.clusters = Array.from(seriesTypeInfo.clusters);
        props.sameTypeTotal = props.clusters.length;
        props.sameTypeIndex = props.clusters.indexOf(child.props.cluster);
      }
    }
    result.push(props);
  });
  return result;
}
var ANIMATED_SERIES_PROPS = ["xRange", "xDomain", "x", "yRange", "yDomain", "y", "colorRange", "colorDomain", "color", "opacityRange", "opacityDomain", "opacity", "strokeRange", "strokeDomain", "stroke", "fillRange", "fillDomain", "fill", "width", "height", "marginLeft", "marginTop", "marginRight", "marginBottom", "data", "angleDomain", "angleRange", "angle", "radiusDomain", "radiusRange", "radius", "innerRadiusDomain", "innerRadiusRange", "innerRadius"];
function getStackParams(props) {
  var _stackBy = props._stackBy, valuePosAttr = props.valuePosAttr, cluster = props.cluster;
  var _props$sameTypeTotal = props.sameTypeTotal, sameTypeTotal = _props$sameTypeTotal === void 0 ? 1 : _props$sameTypeTotal, _props$sameTypeIndex = props.sameTypeIndex, sameTypeIndex = _props$sameTypeIndex === void 0 ? 0 : _props$sameTypeIndex;
  if (_stackBy === valuePosAttr && !cluster) {
    sameTypeTotal = 1;
    sameTypeIndex = 0;
  }
  return { sameTypeTotal, sameTypeIndex };
}
var pi$2 = Math.PI, tau$2 = 2 * pi$2, epsilon$1 = 1e-6, tauEpsilon = tau$2 - epsilon$1;
function Path() {
  this._x0 = this._y0 = this._x1 = this._y1 = null;
  this._ = "";
}
function path() {
  return new Path();
}
Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x2, y2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x2, y2) {
    this._ += "L" + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  quadraticCurveTo: function(x12, y12, x2, y2) {
    this._ += "Q" + +x12 + "," + +y12 + "," + (this._x1 = +x2) + "," + (this._y1 = +y2);
  },
  bezierCurveTo: function(x12, y12, x2, y2, x3, y3) {
    this._ += "C" + +x12 + "," + +y12 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x3) + "," + (this._y1 = +y3);
  },
  arcTo: function(x12, y12, x2, y2, r2) {
    x12 = +x12, y12 = +y12, x2 = +x2, y2 = +y2, r2 = +r2;
    var x02 = this._x1, y02 = this._y1, x21 = x2 - x12, y21 = y2 - y12, x01 = x02 - x12, y01 = y02 - y12, l01_2 = x01 * x01 + y01 * y01;
    if (r2 < 0)
      throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x12) + "," + (this._y1 = y12);
    } else if (!(l01_2 > epsilon$1))
      ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r2) {
      this._ += "L" + (this._x1 = x12) + "," + (this._y1 = y12);
    } else {
      var x20 = x2 - x02, y20 = y2 - y02, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l2 = r2 * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l2 / l01, t21 = l2 / l21;
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._ += "L" + (x12 + t01 * x01) + "," + (y12 + t01 * y01);
      }
      this._ += "A" + r2 + "," + r2 + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x12 + t21 * x21) + "," + (this._y1 = y12 + t21 * y21);
    }
  },
  arc: function(x2, y2, r2, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r2 = +r2, ccw = !!ccw;
    var dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x02 = x2 + dx, y02 = y2 + dy, cw = 1 ^ ccw, da2 = ccw ? a0 - a1 : a1 - a0;
    if (r2 < 0)
      throw new Error("negative radius: " + r2);
    if (this._x1 === null) {
      this._ += "M" + x02 + "," + y02;
    } else if (Math.abs(this._x1 - x02) > epsilon$1 || Math.abs(this._y1 - y02) > epsilon$1) {
      this._ += "L" + x02 + "," + y02;
    }
    if (!r2)
      return;
    if (da2 < 0)
      da2 = da2 % tau$2 + tau$2;
    if (da2 > tauEpsilon) {
      this._ += "A" + r2 + "," + r2 + ",0,1," + cw + "," + (x2 - dx) + "," + (y2 - dy) + "A" + r2 + "," + r2 + ",0,1," + cw + "," + (this._x1 = x02) + "," + (this._y1 = y02);
    } else if (da2 > epsilon$1) {
      this._ += "A" + r2 + "," + r2 + ",0," + +(da2 >= pi$2) + "," + cw + "," + (this._x1 = x2 + r2 * Math.cos(a1)) + "," + (this._y1 = y2 + r2 * Math.sin(a1));
    }
  },
  rect: function(x2, y2, w2, h2) {
    this._ += "M" + (this._x0 = this._x1 = +x2) + "," + (this._y0 = this._y1 = +y2) + "h" + +w2 + "v" + +h2 + "h" + -w2 + "Z";
  },
  toString: function() {
    return this._;
  }
};
function constant$2(x2) {
  return function constant2() {
    return x2;
  };
}
var abs$1 = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt$1 = Math.sqrt;
var epsilon = 1e-12;
var pi$1 = Math.PI;
var halfPi = pi$1 / 2;
var tau$1 = 2 * pi$1;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi$1 : Math.acos(x2);
}
function asin(x2) {
  return x2 >= 1 ? halfPi : x2 <= -1 ? -halfPi : Math.asin(x2);
}
function arcInnerRadius(d) {
  return d.innerRadius;
}
function arcOuterRadius(d) {
  return d.outerRadius;
}
function arcStartAngle(d) {
  return d.startAngle;
}
function arcEndAngle(d) {
  return d.endAngle;
}
function arcPadAngle(d) {
  return d && d.padAngle;
}
function intersect(x02, y02, x12, y12, x2, y2, x3, y3) {
  var x10 = x12 - x02, y10 = y12 - y02, x32 = x3 - x2, y32 = y3 - y2, t2 = y32 * x10 - x32 * y10;
  if (t2 * t2 < epsilon)
    return;
  t2 = (x32 * (y02 - y2) - y32 * (x02 - x2)) / t2;
  return [x02 + t2 * x10, y02 + t2 * y10];
}
function cornerTangents(x02, y02, x12, y12, r1, rc2, cw) {
  var x01 = x02 - x12, y01 = y02 - y12, lo = (cw ? rc2 : -rc2) / sqrt$1(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x02 + ox, y11 = y02 + oy, x10 = x12 + ox, y10 = y12 + oy, x002 = (x11 + x10) / 2, y002 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r2 = r1 - rc2, D2 = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * sqrt$1(max(0, r2 * r2 * d2 - D2 * D2)), cx0 = (D2 * dy - dx * d) / d2, cy0 = (-D2 * dx - dy * d) / d2, cx1 = (D2 * dy + dx * d) / d2, cy1 = (-D2 * dx + dy * d) / d2, dx0 = cx0 - x002, dy0 = cy0 - y002, dx1 = cx1 - x002, dy1 = cy1 - y002;
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
    cx0 = cx1, cy0 = cy1;
  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r2 - 1),
    y11: cy0 * (r1 / r2 - 1)
  };
}
function arcBuilder() {
  var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = constant$2(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
  function arc() {
    var buffer, r2, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - halfPi, a1 = endAngle.apply(this, arguments) - halfPi, da2 = abs$1(a1 - a0), cw = a1 > a0;
    if (!context)
      context = buffer = path();
    if (r1 < r0)
      r2 = r1, r1 = r0, r0 = r2;
    if (!(r1 > epsilon))
      context.moveTo(0, 0);
    else if (da2 > tau$1 - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    } else {
      var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da2, da1 = da2, ap = padAngle.apply(this, arguments) / 2, rp = ap > epsilon && (padRadius ? +padRadius.apply(this, arguments) : sqrt$1(r0 * r0 + r1 * r1)), rc2 = min(abs$1(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc2, rc1 = rc2, t02, t12;
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)), p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon)
          p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
        else
          da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon)
          p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
        else
          da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }
      var x01 = r1 * cos(a01), y01 = r1 * sin(a01), x10 = r0 * cos(a10), y10 = r0 * sin(a10);
      if (rc2 > epsilon) {
        var x11 = r1 * cos(a11), y11 = r1 * sin(a11), x002 = r0 * cos(a00), y002 = r0 * sin(a00), oc2;
        if (da2 < pi$1 && (oc2 = intersect(x01, y01, x002, y002, x11, y11, x10, y10))) {
          var ax = x01 - oc2[0], ay = y01 - oc2[1], bx = x11 - oc2[0], by = y11 - oc2[1], kc2 = 1 / sin(acos((ax * bx + ay * by) / (sqrt$1(ax * ax + ay * ay) * sqrt$1(bx * bx + by * by))) / 2), lc2 = sqrt$1(oc2[0] * oc2[0] + oc2[1] * oc2[1]);
          rc0 = min(rc2, (r0 - lc2) / (kc2 - 1));
          rc1 = min(rc2, (r1 - lc2) / (kc2 + 1));
        }
      }
      if (!(da1 > epsilon))
        context.moveTo(x01, y01);
      else if (rc1 > epsilon) {
        t02 = cornerTangents(x002, y002, x01, y01, r1, rc1, cw);
        t12 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
        context.moveTo(t02.cx + t02.x01, t02.cy + t02.y01);
        if (rc1 < rc2)
          context.arc(t02.cx, t02.cy, rc1, atan2(t02.y01, t02.x01), atan2(t12.y01, t12.x01), !cw);
        else {
          context.arc(t02.cx, t02.cy, rc1, atan2(t02.y01, t02.x01), atan2(t02.y11, t02.x11), !cw);
          context.arc(0, 0, r1, atan2(t02.cy + t02.y11, t02.cx + t02.x11), atan2(t12.cy + t12.y11, t12.cx + t12.x11), !cw);
          context.arc(t12.cx, t12.cy, rc1, atan2(t12.y11, t12.x11), atan2(t12.y01, t12.x01), !cw);
        }
      } else
        context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
      if (!(r0 > epsilon) || !(da0 > epsilon))
        context.lineTo(x10, y10);
      else if (rc0 > epsilon) {
        t02 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t12 = cornerTangents(x01, y01, x002, y002, r0, -rc0, cw);
        context.lineTo(t02.cx + t02.x01, t02.cy + t02.y01);
        if (rc0 < rc2)
          context.arc(t02.cx, t02.cy, rc0, atan2(t02.y01, t02.x01), atan2(t12.y01, t12.x01), !cw);
        else {
          context.arc(t02.cx, t02.cy, rc0, atan2(t02.y01, t02.x01), atan2(t02.y11, t02.x11), !cw);
          context.arc(0, 0, r0, atan2(t02.cy + t02.y11, t02.cx + t02.x11), atan2(t12.cy + t12.y11, t12.cx + t12.x11), cw);
          context.arc(t12.cx, t12.cy, rc0, atan2(t12.y11, t12.x11), atan2(t12.y01, t12.x01), !cw);
        }
      } else
        context.arc(0, 0, r0, a10, a00, cw);
    }
    context.closePath();
    if (buffer)
      return context = null, buffer + "" || null;
  }
  arc.centroid = function() {
    var r2 = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a2 = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos(a2) * r2, sin(a2) * r2];
  };
  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : innerRadius;
  };
  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : outerRadius;
  };
  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$2(+_), arc) : cornerRadius;
  };
  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), arc) : padRadius;
  };
  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : startAngle;
  };
  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : endAngle;
  };
  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$2(+_), arc) : padAngle;
  };
  arc.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, arc) : context;
  };
  return arc;
}
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function curveLinear(context) {
  return new Linear(context);
}
function x(p2) {
  return p2[0];
}
function y(p2) {
  return p2[1];
}
function line() {
  var x$12 = x, y$12 = y, defined = constant$2(true), context = null, curve = curveLinear, output = null;
  function line2(data) {
    var i2, n2 = data.length, d, defined0 = false, buffer;
    if (context == null)
      output = curve(buffer = path());
    for (i2 = 0; i2 <= n2; ++i2) {
      if (!(i2 < n2 && defined(d = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0)
          output.lineStart();
        else
          output.lineEnd();
      }
      if (defined0)
        output.point(+x$12(d, i2, data), +y$12(d, i2, data));
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  line2.x = function(_) {
    return arguments.length ? (x$12 = typeof _ === "function" ? _ : constant$2(+_), line2) : x$12;
  };
  line2.y = function(_) {
    return arguments.length ? (y$12 = typeof _ === "function" ? _ : constant$2(+_), line2) : y$12;
  };
  line2.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), line2) : defined;
  };
  line2.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line2) : curve;
  };
  line2.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line2) : context;
  };
  return line2;
}
function area$1() {
  var x02 = x, x12 = null, y02 = constant$2(0), y12 = y, defined = constant$2(true), context = null, curve = curveLinear, output = null;
  function area2(data) {
    var i2, j, k2, n2 = data.length, d, defined0 = false, buffer, x0z = new Array(n2), y0z = new Array(n2);
    if (context == null)
      output = curve(buffer = path());
    for (i2 = 0; i2 <= n2; ++i2) {
      if (!(i2 < n2 && defined(d = data[i2], i2, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i2;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k2 = i2 - 1; k2 >= j; --k2) {
            output.point(x0z[k2], y0z[k2]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i2] = +x02(d, i2, data), y0z[i2] = +y02(d, i2, data);
        output.point(x12 ? +x12(d, i2, data) : x0z[i2], y12 ? +y12(d, i2, data) : y0z[i2]);
      }
    }
    if (buffer)
      return output = null, buffer + "" || null;
  }
  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }
  area2.x = function(_) {
    return arguments.length ? (x02 = typeof _ === "function" ? _ : constant$2(+_), x12 = null, area2) : x02;
  };
  area2.x0 = function(_) {
    return arguments.length ? (x02 = typeof _ === "function" ? _ : constant$2(+_), area2) : x02;
  };
  area2.x1 = function(_) {
    return arguments.length ? (x12 = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), area2) : x12;
  };
  area2.y = function(_) {
    return arguments.length ? (y02 = typeof _ === "function" ? _ : constant$2(+_), y12 = null, area2) : y02;
  };
  area2.y0 = function(_) {
    return arguments.length ? (y02 = typeof _ === "function" ? _ : constant$2(+_), area2) : y02;
  };
  area2.y1 = function(_) {
    return arguments.length ? (y12 = _ == null ? null : typeof _ === "function" ? _ : constant$2(+_), area2) : y12;
  };
  area2.lineX0 = area2.lineY0 = function() {
    return arealine().x(x02).y(y02);
  };
  area2.lineY1 = function() {
    return arealine().x(x02).y(y12);
  };
  area2.lineX1 = function() {
    return arealine().x(x12).y(y02);
  };
  area2.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$2(!!_), area2) : defined;
  };
  area2.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area2) : curve;
  };
  area2.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area2) : context;
  };
  return area2;
}
function descending$1(a2, b) {
  return b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
}
function identity$1(d) {
  return d;
}
function pieBuilder() {
  var value = identity$1, sortValues = descending$1, sort = null, startAngle = constant$2(0), endAngle = constant$2(tau$1), padAngle = constant$2(0);
  function pie(data) {
    var i2, n2 = data.length, j, k2, sum2 = 0, index = new Array(n2), arcs = new Array(n2), a0 = +startAngle.apply(this, arguments), da2 = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)), a1, p2 = Math.min(Math.abs(da2) / n2, padAngle.apply(this, arguments)), pa2 = p2 * (da2 < 0 ? -1 : 1), v2;
    for (i2 = 0; i2 < n2; ++i2) {
      if ((v2 = arcs[index[i2] = i2] = +value(data[i2], i2, data)) > 0) {
        sum2 += v2;
      }
    }
    if (sortValues != null)
      index.sort(function(i3, j2) {
        return sortValues(arcs[i3], arcs[j2]);
      });
    else if (sort != null)
      index.sort(function(i3, j2) {
        return sort(data[i3], data[j2]);
      });
    for (i2 = 0, k2 = sum2 ? (da2 - n2 * pa2) / sum2 : 0; i2 < n2; ++i2, a0 = a1) {
      j = index[i2], v2 = arcs[j], a1 = a0 + (v2 > 0 ? v2 * k2 : 0) + pa2, arcs[j] = {
        data: data[j],
        index: i2,
        value: v2,
        startAngle: a0,
        endAngle: a1,
        padAngle: p2
      };
    }
    return arcs;
  }
  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$2(+_), pie) : value;
  };
  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };
  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };
  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : startAngle;
  };
  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : endAngle;
  };
  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$2(+_), pie) : padAngle;
  };
  return pie;
}
var curveRadialLinear = curveRadial$1(curveLinear);
function Radial(curve) {
  this._curve = curve;
}
Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a2, r2) {
    this._curve.point(r2 * Math.sin(a2), r2 * -Math.cos(a2));
  }
};
function curveRadial$1(curve) {
  function radial(context) {
    return new Radial(curve(context));
  }
  radial._curve = curve;
  return radial;
}
function lineRadial(l2) {
  var c2 = l2.curve;
  l2.angle = l2.x, delete l2.x;
  l2.radius = l2.y, delete l2.y;
  l2.curve = function(_) {
    return arguments.length ? c2(curveRadial$1(_)) : c2()._curve;
  };
  return l2;
}
function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}
function areaRadial() {
  var a2 = area$1().curve(curveRadialLinear), c2 = a2.curve, x02 = a2.lineX0, x12 = a2.lineX1, y02 = a2.lineY0, y12 = a2.lineY1;
  a2.angle = a2.x, delete a2.x;
  a2.startAngle = a2.x0, delete a2.x0;
  a2.endAngle = a2.x1, delete a2.x1;
  a2.radius = a2.y, delete a2.y;
  a2.innerRadius = a2.y0, delete a2.y0;
  a2.outerRadius = a2.y1, delete a2.y1;
  a2.lineStartAngle = function() {
    return lineRadial(x02());
  }, delete a2.lineX0;
  a2.lineEndAngle = function() {
    return lineRadial(x12());
  }, delete a2.lineX1;
  a2.lineInnerRadius = function() {
    return lineRadial(y02());
  }, delete a2.lineY0;
  a2.lineOuterRadius = function() {
    return lineRadial(y12());
  }, delete a2.lineY1;
  a2.curve = function(_) {
    return arguments.length ? c2(curveRadial$1(_)) : c2()._curve;
  };
  return a2;
}
function pointRadial(x2, y2) {
  return [(y2 = +y2) * Math.cos(x2 -= Math.PI / 2), y2 * Math.sin(x2)];
}
var slice$4 = Array.prototype.slice;
function linkSource(d) {
  return d.source;
}
function linkTarget(d) {
  return d.target;
}
function link(curve) {
  var source = linkSource, target = linkTarget, x$12 = x, y$12 = y, context = null;
  function link2() {
    var buffer, argv = slice$4.call(arguments), s2 = source.apply(this, argv), t2 = target.apply(this, argv);
    if (!context)
      context = buffer = path();
    curve(context, +x$12.apply(this, (argv[0] = s2, argv)), +y$12.apply(this, argv), +x$12.apply(this, (argv[0] = t2, argv)), +y$12.apply(this, argv));
    if (buffer)
      return context = null, buffer + "" || null;
  }
  link2.source = function(_) {
    return arguments.length ? (source = _, link2) : source;
  };
  link2.target = function(_) {
    return arguments.length ? (target = _, link2) : target;
  };
  link2.x = function(_) {
    return arguments.length ? (x$12 = typeof _ === "function" ? _ : constant$2(+_), link2) : x$12;
  };
  link2.y = function(_) {
    return arguments.length ? (y$12 = typeof _ === "function" ? _ : constant$2(+_), link2) : y$12;
  };
  link2.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, link2) : context;
  };
  return link2;
}
function curveHorizontal(context, x02, y02, x12, y12) {
  context.moveTo(x02, y02);
  context.bezierCurveTo(x02 = (x02 + x12) / 2, y02, x02, y12, x12, y12);
}
function curveVertical(context, x02, y02, x12, y12) {
  context.moveTo(x02, y02);
  context.bezierCurveTo(x02, y02 = (y02 + y12) / 2, x12, y02, x12, y12);
}
function curveRadial(context, x02, y02, x12, y12) {
  var p0 = pointRadial(x02, y02), p1 = pointRadial(x02, y02 = (y02 + y12) / 2), p2 = pointRadial(x12, y02), p3 = pointRadial(x12, y12);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}
function linkHorizontal() {
  return link(curveHorizontal);
}
function linkVertical() {
  return link(curveVertical);
}
function linkRadial() {
  var l2 = link(curveRadial);
  l2.angle = l2.x, delete l2.x;
  l2.radius = l2.y, delete l2.y;
  return l2;
}
var circle$1 = {
  draw: function(context, size) {
    var r2 = Math.sqrt(size / pi$1);
    context.moveTo(r2, 0);
    context.arc(0, 0, r2, 0, tau$1);
  }
};
var cross = {
  draw: function(context, size) {
    var r2 = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r2, -r2);
    context.lineTo(-r2, -r2);
    context.lineTo(-r2, -3 * r2);
    context.lineTo(r2, -3 * r2);
    context.lineTo(r2, -r2);
    context.lineTo(3 * r2, -r2);
    context.lineTo(3 * r2, r2);
    context.lineTo(r2, r2);
    context.lineTo(r2, 3 * r2);
    context.lineTo(-r2, 3 * r2);
    context.lineTo(-r2, r2);
    context.lineTo(-3 * r2, r2);
    context.closePath();
  }
};
var tan30 = Math.sqrt(1 / 3), tan30_2 = tan30 * 2;
var diamond = {
  draw: function(context, size) {
    var y2 = Math.sqrt(size / tan30_2), x2 = y2 * tan30;
    context.moveTo(0, -y2);
    context.lineTo(x2, 0);
    context.lineTo(0, y2);
    context.lineTo(-x2, 0);
    context.closePath();
  }
};
var ka = 0.8908130915292852, kr = Math.sin(pi$1 / 10) / Math.sin(7 * pi$1 / 10), kx = Math.sin(tau$1 / 10) * kr, ky = -Math.cos(tau$1 / 10) * kr;
var star = {
  draw: function(context, size) {
    var r2 = Math.sqrt(size * ka), x2 = kx * r2, y2 = ky * r2;
    context.moveTo(0, -r2);
    context.lineTo(x2, y2);
    for (var i2 = 1; i2 < 5; ++i2) {
      var a2 = tau$1 * i2 / 5, c2 = Math.cos(a2), s2 = Math.sin(a2);
      context.lineTo(s2 * r2, -c2 * r2);
      context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
    }
    context.closePath();
  }
};
var square = {
  draw: function(context, size) {
    var w2 = Math.sqrt(size), x2 = -w2 / 2;
    context.rect(x2, x2, w2, w2);
  }
};
var sqrt3 = Math.sqrt(3);
var triangle = {
  draw: function(context, size) {
    var y2 = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y2 * 2);
    context.lineTo(-sqrt3 * y2, -y2);
    context.lineTo(sqrt3 * y2, -y2);
    context.closePath();
  }
};
var c = -0.5, s = Math.sqrt(3) / 2, k$1 = 1 / Math.sqrt(12), a = (k$1 / 2 + 1) * 3;
var wye = {
  draw: function(context, size) {
    var r2 = Math.sqrt(size / a), x02 = r2 / 2, y02 = r2 * k$1, x12 = x02, y12 = r2 * k$1 + r2, x2 = -x12, y2 = y12;
    context.moveTo(x02, y02);
    context.lineTo(x12, y12);
    context.lineTo(x2, y2);
    context.lineTo(c * x02 - s * y02, s * x02 + c * y02);
    context.lineTo(c * x12 - s * y12, s * x12 + c * y12);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x02 + s * y02, c * y02 - s * x02);
    context.lineTo(c * x12 + s * y12, c * y12 - s * x12);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
var symbols = [
  circle$1,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];
function symbol() {
  var type = constant$2(circle$1), size = constant$2(64), context = null;
  function symbol2() {
    var buffer;
    if (!context)
      context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer)
      return context = null, buffer + "" || null;
  }
  symbol2.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$2(_), symbol2) : type;
  };
  symbol2.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$2(+_), symbol2) : size;
  };
  symbol2.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol2) : context;
  };
  return symbol2;
}
function noop$2() {
}
function point$3(that, x2, y2) {
  that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x2) / 6, (that._y0 + 4 * that._y1 + y2) / 6);
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point$3(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function basis(context) {
  return new Basis(context);
}
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function basisClosed(context) {
  return new BasisClosed(context);
}
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x02 = (this._x0 + 4 * this._x1 + x2) / 6, y02 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x02, y02) : this._context.moveTo(x02, y02);
        break;
      case 3:
        this._point = 4;
      default:
        point$3(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function basisOpen(context) {
  return new BasisOpen(context);
}
function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}
Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, j = x2.length - 1;
    if (j > 0) {
      var x02 = x2[0], y02 = y2[0], dx = x2[j] - x02, dy = y2[j] - y02, i2 = -1, t2;
      while (++i2 <= j) {
        t2 = i2 / j;
        this._basis.point(this._beta * x2[i2] + (1 - this._beta) * (x02 + t2 * dx), this._beta * y2[i2] + (1 - this._beta) * (y02 + t2 * dy));
      }
    }
    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
var bundle = function custom(beta) {
  function bundle2(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }
  bundle2.beta = function(beta2) {
    return custom(+beta2);
  };
  return bundle2;
}(0.85);
function point$2(that, x2, y2) {
  that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x2), that._y2 + that._k * (that._y1 - y2), that._x2, that._y2);
}
function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        point$2(this, this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        this._x1 = x2, this._y1 = y2;
        break;
      case 2:
        this._point = 3;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinal = function custom2(tension) {
  function cardinal2(context) {
    return new Cardinal(context, tension);
  }
  cardinal2.tension = function(tension2) {
    return custom2(+tension2);
  };
  return cardinal2;
}(0);
function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalClosed = function custom3(tension) {
  function cardinal2(context) {
    return new CardinalClosed(context, tension);
  }
  cardinal2.tension = function(tension2) {
    return custom3(+tension2);
  };
  return cardinal2;
}(0);
function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var cardinalOpen = function custom4(tension) {
  function cardinal2(context) {
    return new CardinalOpen(context, tension);
  }
  cardinal2.tension = function(tension2) {
    return custom4(+tension2);
  };
  return cardinal2;
}(0);
function point$1(that, x2, y2) {
  var x12 = that._x1, y12 = that._y1, x22 = that._x2, y22 = that._y2;
  if (that._l01_a > epsilon) {
    var a2 = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n2 = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x12 = (x12 * a2 - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n2;
    y12 = (y12 * a2 - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n2;
  }
  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m2 = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x22 = (x22 * b + that._x1 * that._l23_2a - x2 * that._l12_2a) / m2;
    y22 = (y22 * b + that._y1 * that._l23_2a - y2 * that._l12_2a) / m2;
  }
  that._context.bezierCurveTo(x12, y12, x22, y22, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        point$1(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRom = function custom5(alpha) {
  function catmullRom2(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }
  catmullRom2.alpha = function(alpha2) {
    return custom5(+alpha2);
  };
  return catmullRom2;
}(0.5);
function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x3 = x2, this._y3 = y2;
        break;
      case 1:
        this._point = 2;
        this._context.moveTo(this._x4 = x2, this._y4 = y2);
        break;
      case 2:
        this._point = 3;
        this._x5 = x2, this._y5 = y2;
        break;
      default:
        point$1(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomClosed = function custom6(alpha) {
  function catmullRom2(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }
  catmullRom2.alpha = function(alpha2) {
    return custom6(+alpha2);
  };
  return catmullRom2;
}(0.5);
function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}
CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) {
      var x23 = this._x2 - x2, y23 = this._y2 - y2;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        point$1(this, x2, y2);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x2;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y2;
  }
};
var catmullRomOpen = function custom7(alpha) {
  function catmullRom2(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }
  catmullRom2.alpha = function(alpha2) {
    return custom7(+alpha2);
  };
  return catmullRom2;
}(0.5);
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop$2,
  areaEnd: noop$2,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point)
      this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point)
      this._context.lineTo(x2, y2);
    else
      this._point = 1, this._context.moveTo(x2, y2);
  }
};
function linearClosed(context) {
  return new LinearClosed(context);
}
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t2) / 2 : t2;
}
function point(that, t02, t12) {
  var x02 = that._x0, y02 = that._y0, x12 = that._x1, y12 = that._y1, dx = (x12 - x02) / 3;
  that._context.bezierCurveTo(x02 + dx, y02 + dx * t02, x12 - dx, y12 - dx * t12, x12, y12);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t12 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1)
      return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point(this, slope2(this, t12 = slope3(this, x2, y2)), t12);
        break;
      default:
        point(this, this._t0, t12 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t12;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x12, y12, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y12, x12, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n2 = x2.length;
    if (n2) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n2 === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1)
      this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i2, n2 = x2.length - 1, m2, a2 = new Array(n2), b = new Array(n2), r2 = new Array(n2);
  a2[0] = 0, b[0] = 2, r2[0] = x2[0] + 2 * x2[1];
  for (i2 = 1; i2 < n2 - 1; ++i2)
    a2[i2] = 1, b[i2] = 4, r2[i2] = 4 * x2[i2] + 2 * x2[i2 + 1];
  a2[n2 - 1] = 2, b[n2 - 1] = 7, r2[n2 - 1] = 8 * x2[n2 - 1] + x2[n2];
  for (i2 = 1; i2 < n2; ++i2)
    m2 = a2[i2] / b[i2 - 1], b[i2] -= m2, r2[i2] -= m2 * r2[i2 - 1];
  a2[n2 - 1] = r2[n2 - 1] / b[n2 - 1];
  for (i2 = n2 - 2; i2 >= 0; --i2)
    a2[i2] = (r2[i2] - a2[i2 + 1]) / b[i2];
  b[n2 - 1] = (x2[n2] + a2[n2 - 1]) / 2;
  for (i2 = 0; i2 < n2 - 1; ++i2)
    b[i2] = 2 * x2[i2 + 1] - a2[i2 + 1];
  return [a2, b];
}
function natural(context) {
  return new Natural(context);
}
function Step(context, t2) {
  this._context = context;
  this._t = t2;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2)
      this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1)
      this._context.closePath();
    if (this._line >= 0)
      this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x12 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x12, this._y);
          this._context.lineTo(x12, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};
function step(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
function none$1(series, order) {
  if (!((n2 = series.length) > 1))
    return;
  for (var i2 = 1, j, s0, s1 = series[order[0]], n2, m2 = s1.length; i2 < n2; ++i2) {
    s0 = s1, s1 = series[order[i2]];
    for (j = 0; j < m2; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
function none(series) {
  var n2 = series.length, o = new Array(n2);
  while (--n2 >= 0)
    o[n2] = n2;
  return o;
}
function stackValue(d, key) {
  return d[key];
}
function stack() {
  var keys3 = constant$2([]), order = none, offset = none$1, value = stackValue;
  function stack2(data) {
    var kz = keys3.apply(this, arguments), i2, m2 = data.length, n2 = kz.length, sz = new Array(n2), oz;
    for (i2 = 0; i2 < n2; ++i2) {
      for (var ki2 = kz[i2], si2 = sz[i2] = new Array(m2), j = 0, sij; j < m2; ++j) {
        si2[j] = sij = [0, +value(data[j], ki2, j, data)];
        sij.data = data[j];
      }
      si2.key = ki2;
    }
    for (i2 = 0, oz = order(sz); i2 < n2; ++i2) {
      sz[oz[i2]].index = i2;
    }
    offset(sz, oz);
    return sz;
  }
  stack2.keys = function(_) {
    return arguments.length ? (keys3 = typeof _ === "function" ? _ : constant$2(slice$4.call(_)), stack2) : keys3;
  };
  stack2.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$2(+_), stack2) : value;
  };
  stack2.order = function(_) {
    return arguments.length ? (order = _ == null ? none : typeof _ === "function" ? _ : constant$2(slice$4.call(_)), stack2) : order;
  };
  stack2.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none$1 : _, stack2) : offset;
  };
  return stack2;
}
function expand(series, order) {
  if (!((n2 = series.length) > 0))
    return;
  for (var i2, n2, j = 0, m2 = series[0].length, y2; j < m2; ++j) {
    for (y2 = i2 = 0; i2 < n2; ++i2)
      y2 += series[i2][j][1] || 0;
    if (y2)
      for (i2 = 0; i2 < n2; ++i2)
        series[i2][j][1] /= y2;
  }
  none$1(series, order);
}
function diverging(series, order) {
  if (!((n2 = series.length) > 0))
    return;
  for (var i2, j = 0, d, dy, yp, yn, n2, m2 = series[order[0]].length; j < m2; ++j) {
    for (yp = yn = 0, i2 = 0; i2 < n2; ++i2) {
      if ((dy = (d = series[order[i2]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}
function silhouette(series, order) {
  if (!((n2 = series.length) > 0))
    return;
  for (var j = 0, s0 = series[order[0]], n2, m2 = s0.length; j < m2; ++j) {
    for (var i2 = 0, y2 = 0; i2 < n2; ++i2)
      y2 += series[i2][j][1] || 0;
    s0[j][1] += s0[j][0] = -y2 / 2;
  }
  none$1(series, order);
}
function wiggle(series, order) {
  if (!((n2 = series.length) > 0) || !((m2 = (s0 = series[order[0]]).length) > 0))
    return;
  for (var y2 = 0, j = 1, s0, m2, n2; j < m2; ++j) {
    for (var i2 = 0, s1 = 0, s2 = 0; i2 < n2; ++i2) {
      var si2 = series[order[i2]], sij0 = si2[j][1] || 0, sij1 = si2[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
      for (var k2 = 0; k2 < i2; ++k2) {
        var sk2 = series[order[k2]], skj0 = sk2[j][1] || 0, skj1 = sk2[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    if (s1)
      y2 -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y2;
  none$1(series, order);
}
function appearance(series) {
  var peaks = series.map(peak);
  return none(series).sort(function(a2, b) {
    return peaks[a2] - peaks[b];
  });
}
function peak(series) {
  var i2 = -1, j = 0, n2 = series.length, vi2, vj2 = -Infinity;
  while (++i2 < n2)
    if ((vi2 = +series[i2][1]) > vj2)
      vj2 = vi2, j = i2;
  return j;
}
function ascending$1(series) {
  var sums = series.map(sum);
  return none(series).sort(function(a2, b) {
    return sums[a2] - sums[b];
  });
}
function sum(series) {
  var s2 = 0, i2 = -1, n2 = series.length, v2;
  while (++i2 < n2)
    if (v2 = +series[i2][1])
      s2 += v2;
  return s2;
}
function descending(series) {
  return ascending$1(series).reverse();
}
function insideOut(series) {
  var n2 = series.length, i2, j, sums = series.map(sum), order = appearance(series), top = 0, bottom = 0, tops = [], bottoms = [];
  for (i2 = 0; i2 < n2; ++i2) {
    j = order[i2];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }
  return bottoms.reverse().concat(tops);
}
function reverse(series) {
  return none(series).reverse();
}
var d3Shape = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arc: arcBuilder,
  area: area$1,
  line,
  pie: pieBuilder,
  areaRadial,
  radialArea: areaRadial,
  lineRadial: lineRadial$1,
  radialLine: lineRadial$1,
  pointRadial,
  linkHorizontal,
  linkVertical,
  linkRadial,
  symbol,
  symbols,
  symbolCircle: circle$1,
  symbolCross: cross,
  symbolDiamond: diamond,
  symbolSquare: square,
  symbolStar: star,
  symbolTriangle: triangle,
  symbolWye: wye,
  curveBasisClosed: basisClosed,
  curveBasisOpen: basisOpen,
  curveBasis: basis,
  curveBundle: bundle,
  curveCardinalClosed: cardinalClosed,
  curveCardinalOpen: cardinalOpen,
  curveCardinal: cardinal,
  curveCatmullRomClosed: catmullRomClosed,
  curveCatmullRomOpen: catmullRomOpen,
  curveCatmullRom: catmullRom,
  curveLinearClosed: linearClosed,
  curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural: natural,
  curveStep: step,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore,
  stack,
  stackOffsetExpand: expand,
  stackOffsetDiverging: diverging,
  stackOffsetNone: none$1,
  stackOffsetSilhouette: silhouette,
  stackOffsetWiggle: wiggle,
  stackOrderAppearance: appearance,
  stackOrderAscending: ascending$1,
  stackOrderDescending: descending,
  stackOrderInsideOut: insideOut,
  stackOrderNone: none,
  stackOrderReverse: reverse
}, Symbol.toStringTag, { value: "Module" }));
var _createClass$F = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$R = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$F(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$F(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$F(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$f = "rv-xy-plot__series rv-xy-plot__series--arc";
var ATTRIBUTES$2 = ["radius", "angle"];
var defaultProps$8 = _extends$R({}, AbstractSeries.defaultProps, {
  center: { x: 0, y: 0 },
  arcClassName: "",
  className: "",
  style: {},
  padAngle: 0
});
function modifyRow(row) {
  var radius = row.radius, angle = row.angle, angle0 = row.angle0;
  var truedAngle = -1 * angle + Math.PI / 2;
  var truedAngle0 = -1 * angle0 + Math.PI / 2;
  return _extends$R({}, row, {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
    angle: truedAngle,
    angle0: truedAngle0
  });
}
var ArcSeries = function(_AbstractSeries) {
  _inherits$F(ArcSeries2, _AbstractSeries);
  function ArcSeries2(props) {
    _classCallCheck$F(this, ArcSeries2);
    var _this = _possibleConstructorReturn$F(this, (ArcSeries2.__proto__ || Object.getPrototypeOf(ArcSeries2)).call(this, props));
    var scaleProps = _this._getAllScaleProps(props);
    _this.state = { scaleProps };
    return _this;
  }
  _createClass$F(ArcSeries2, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ scaleProps: this._getAllScaleProps(nextProps) });
    }
  }, {
    key: "_getAllScaleProps",
    value: function _getAllScaleProps(props) {
      var defaultScaleProps = this._getDefaultScaleProps(props);
      var userScaleProps = extractScalePropsFromProps(props, ATTRIBUTES$2);
      var missingScaleProps = getMissingScaleProps(_extends$R({}, defaultScaleProps, userScaleProps), props.data, ATTRIBUTES$2);
      return _extends$R({}, defaultScaleProps, userScaleProps, missingScaleProps);
    }
  }, {
    key: "_getDefaultScaleProps",
    value: function _getDefaultScaleProps(props) {
      var innerWidth = props.innerWidth, innerHeight = props.innerHeight;
      var radius = Math.min(innerWidth / 2, innerHeight / 2);
      return {
        radiusRange: [0, radius],
        _radiusValue: radius,
        angleType: "literal"
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, arcClassName = _props.arcClassName, animation = _props.animation, className = _props.className, center = _props.center, data = _props.data, disableSeries = _props.disableSeries, hideSeries = _props.hideSeries, marginLeft = _props.marginLeft, marginTop = _props.marginTop, padAngle = _props.padAngle, style = _props.style;
      if (!data) {
        return null;
      }
      if (animation) {
        var cloneData = data.map(function(d) {
          return _extends$R({}, d);
        });
        return React.createElement("g", { className: "rv-xy-plot__series--arc__animation-wrapper" }, React.createElement(Animation, _extends$R({}, this.props, {
          animatedProps: ANIMATED_SERIES_PROPS,
          data: cloneData
        }), React.createElement(ArcSeries2, _extends$R({}, this.props, {
          animation: null,
          disableSeries: true,
          data: cloneData
        }))), React.createElement(ArcSeries2, _extends$R({}, this.props, {
          animation: null,
          hideSeries: true,
          style: { stroke: "red" }
        })));
      }
      var scaleProps = this.state.scaleProps;
      var radiusDomain = scaleProps.radiusDomain;
      var radius = getAttributeFunctor(scaleProps, "radius");
      var radius0 = getAttr0Functor(scaleProps, "radius");
      var angle = getAttributeFunctor(scaleProps, "angle");
      var angle0 = getAttr0Functor(scaleProps, "angle");
      var fill = this._getAttributeFunctor("fill") || this._getAttributeFunctor("color");
      var stroke = this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color");
      var opacity = this._getAttributeFunctor("opacity");
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      return React.createElement("g", {
        className: predefinedClassName$f + " " + className,
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        opacity: hideSeries ? 0 : 1,
        pointerEvents: disableSeries ? "none" : "all",
        transform: "translate(" + (marginLeft + x2(center)) + "," + (marginTop + y2(center)) + ")"
      }, data.map(function(row, i2) {
        var noRadius = radiusDomain[1] === radiusDomain[0];
        var arcArg = {
          innerRadius: noRadius ? 0 : radius0(row),
          outerRadius: radius(row),
          startAngle: angle0(row) || 0,
          endAngle: angle(row)
        };
        var arcedData = arcBuilder().padAngle(padAngle);
        var rowStyle = row.style || {};
        var rowClassName = row.className || "";
        return React.createElement("path", {
          style: _extends$R({
            opacity: opacity && opacity(row),
            stroke: stroke && stroke(row),
            fill: fill && fill(row)
          }, style, rowStyle),
          onClick: function onClick(e3) {
            return _this2._valueClickHandler(modifyRow(row), e3);
          },
          onContextMenu: function onContextMenu(e3) {
            return _this2._valueRightClickHandler(modifyRow(row), e3);
          },
          onMouseOver: function onMouseOver(e3) {
            return _this2._valueMouseOverHandler(modifyRow(row), e3);
          },
          onMouseOut: function onMouseOut(e3) {
            return _this2._valueMouseOutHandler(modifyRow(row), e3);
          },
          key: i2,
          className: predefinedClassName$f + "-path " + arcClassName + " " + rowClassName,
          d: arcedData(arcArg)
        });
      }));
    }
  }]);
  return ArcSeries2;
}(AbstractSeries);
ArcSeries.propTypes = _extends$R({}, AbstractSeries.propTypes, getScalePropTypesByAttribute("radius"), getScalePropTypesByAttribute("angle"), {
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  arcClassName: PropTypes.string,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
});
ArcSeries.defaultProps = defaultProps$8;
ArcSeries.displayName = "ArcSeries";
var _extends$Q = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$E = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$E(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$E(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$E(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$e = "rv-xy-plot__series rv-xy-plot__series--line";
var AreaSeries = function(_AbstractSeries) {
  _inherits$E(AreaSeries2, _AbstractSeries);
  function AreaSeries2() {
    _classCallCheck$E(this, AreaSeries2);
    return _possibleConstructorReturn$E(this, (AreaSeries2.__proto__ || Object.getPrototypeOf(AreaSeries2)).apply(this, arguments));
  }
  _createClass$E(AreaSeries2, [{
    key: "_renderArea",
    value: function _renderArea(data, x2, y02, y2, curve, getNull4) {
      var area2 = area$1();
      if (curve !== null) {
        if (typeof curve === "string" && d3Shape[curve]) {
          area2 = area2.curve(d3Shape[curve]);
        } else if (typeof curve === "function") {
          area2 = area2.curve(curve);
        }
      }
      area2 = area2.defined(getNull4);
      area2 = area2.x(x2).y0(y02).y1(y2);
      return area2(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props, animation = _props.animation, className = _props.className, curve = _props.curve, data = _props.data, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style;
      if (this.props.nullAccessor) {
        warning("nullAccessor has been renamed to getNull", true);
      }
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$Q({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(AreaSeries2, _extends$Q({}, this.props, { animation: null })));
      }
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var y02 = this._getAttr0Functor("y");
      var stroke = this._getAttributeValue("stroke") || this._getAttributeValue("color");
      var fill = this._getAttributeValue("fill") || this._getAttributeValue("color");
      var newOpacity = this._getAttributeValue("opacity");
      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var getNull4 = this.props.nullAccessor || this.props.getNull;
      var d = this._renderArea(data, x2, y02, y2, curve, getNull4);
      return React.createElement("path", {
        d,
        className: predefinedClassName$e + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")",
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        style: _extends$Q({
          opacity,
          stroke,
          fill
        }, style)
      });
    }
  }]);
  return AreaSeries2;
}(AbstractSeries);
AreaSeries.displayName = "AreaSeries";
AreaSeries.propTypes = _extends$Q({}, AbstractSeries.propTypes, {
  getNull: PropTypes.func
});
AreaSeries.defaultProps = _extends$Q({}, AbstractSeries.defaultProps, {
  getNull: function getNull() {
    return true;
  }
});
({
  style: PropTypes.shape({
    bottom: PropTypes.object,
    left: PropTypes.object,
    right: PropTypes.object,
    top: PropTypes.object
  }),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
});
var _createClass$D = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$D(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$D(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$D(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ChartLabel = function(_React$PureComponent) {
  _inherits$D(ChartLabel2, _React$PureComponent);
  function ChartLabel2() {
    _classCallCheck$D(this, ChartLabel2);
    return _possibleConstructorReturn$D(this, (ChartLabel2.__proto__ || Object.getPrototypeOf(ChartLabel2)).apply(this, arguments));
  }
  _createClass$D(ChartLabel2, [{
    key: "render",
    value: function render() {
      var _props = this.props, innerHeight = _props.innerHeight, innerWidth = _props.innerWidth, marginBottom = _props.marginBottom, marginLeft = _props.marginLeft, marginRight = _props.marginRight, marginTop = _props.marginTop, className = _props.className, includeMargin = _props.includeMargin, style = _props.style, text = _props.text, xPercent = _props.xPercent, yPercent = _props.yPercent;
      var width = innerWidth + (includeMargin ? marginLeft + marginRight : 0);
      var height = innerHeight + (includeMargin ? marginTop + marginBottom : 0);
      var xPos = width * xPercent + (includeMargin ? 0 : marginLeft);
      var yPos = height * yPercent + (includeMargin ? marginLeft : 0);
      return React.createElement("g", {
        transform: "translate(" + xPos + ", " + yPos + ")",
        className: "rv-xy-plot__axis__title " + className
      }, React.createElement("text", style, text));
    }
  }], [{
    key: "requiresSVG",
    get: function get() {
      return true;
    }
  }]);
  return ChartLabel2;
}(React.PureComponent);
ChartLabel.displayName = "ChartLabel";
ChartLabel.propTypes = {
  className: PropTypes.string,
  includeMargin: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  xPercent: PropTypes.number.isRequired,
  yPercent: PropTypes.number.isRequired
};
ChartLabel.defaultProps = {
  className: "",
  includeMargin: true,
  text: "",
  xPercent: 0,
  yPercent: 0,
  style: {}
};
var ORIENTATION$1 = {
  TOP: "top",
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal"
};
var DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal"
};
function getTicksTotalFromSize(size) {
  if (size < 700) {
    if (size > 300) {
      return 10;
    }
    return 5;
  }
  return 20;
}
function getTickValues(scale, tickTotal, tickValues) {
  return !tickValues ? scale.ticks ? scale.ticks(tickTotal) : scale.domain() : tickValues;
}
function generateFit(axisStart, axisEnd) {
  if (axisStart.x === axisEnd.x) {
    return {
      left: axisStart.y,
      right: axisEnd.y,
      slope: 0,
      offset: axisStart.x
    };
  }
  var slope = (axisStart.y - axisEnd.y) / (axisStart.x - axisEnd.x);
  return {
    left: axisStart.x,
    right: axisEnd.x,
    slope,
    offset: axisStart.y - slope * axisStart.x
  };
}
function generatePoints(_ref) {
  var axisStart = _ref.axisStart, axisEnd = _ref.axisEnd, numberOfTicks = _ref.numberOfTicks, axisDomain = _ref.axisDomain;
  var _generateFit = generateFit(axisStart, axisEnd), left = _generateFit.left, right = _generateFit.right, slope = _generateFit.slope, offset = _generateFit.offset;
  var pointSlope = (right - left) / numberOfTicks;
  var axisScale = linear().domain([left, right]).range(axisDomain);
  var slopeVertical = axisStart.x === axisEnd.x;
  return {
    slope: slopeVertical ? Infinity : slope,
    points: range(left, right + pointSlope, pointSlope).map(function(val) {
      if (slopeVertical) {
        return { y: val, x: slope * val + offset, text: axisScale(val) };
      }
      return { x: val, y: slope * val + offset, text: axisScale(val) };
    }).slice(0, numberOfTicks + 1)
  };
}
function getAxisAngle(axisStart, axisEnd) {
  if (axisStart.x === axisEnd.x) {
    return axisEnd.y > axisStart.y ? Math.PI / 2 : 3 * Math.PI / 2;
  }
  return Math.atan((axisEnd.y - axisStart.y) / (axisEnd.x - axisStart.x));
}
var _extends$P = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$C = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$C(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$C(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$C(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var animatedProps$2 = ["xRange", "yRange", "xDomain", "yDomain", "width", "height", "marginLeft", "marginTop", "marginRight", "marginBottom", "tickTotal"];
var CircularGridLines = function(_PureComponent) {
  _inherits$C(CircularGridLines2, _PureComponent);
  function CircularGridLines2() {
    _classCallCheck$C(this, CircularGridLines2);
    return _possibleConstructorReturn$C(this, (CircularGridLines2.__proto__ || Object.getPrototypeOf(CircularGridLines2)).apply(this, arguments));
  }
  _createClass$C(CircularGridLines2, [{
    key: "_getDefaultProps",
    value: function _getDefaultProps() {
      var _props = this.props, innerWidth = _props.innerWidth, innerHeight = _props.innerHeight, marginTop = _props.marginTop, marginLeft = _props.marginLeft;
      return {
        left: marginLeft,
        top: marginTop,
        width: innerWidth,
        height: innerHeight,
        style: {},
        tickTotal: getTicksTotalFromSize(Math.min(innerWidth, innerHeight))
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props, animation = _props2.animation, centerX = _props2.centerX, centerY = _props2.centerY;
      if (animation) {
        return /* @__PURE__ */ jsx(Animation, {
          ...this.props,
          animatedProps: animatedProps$2,
          children: /* @__PURE__ */ jsx(CircularGridLines2, {
            ...this.props,
            animation: null
          })
        });
      }
      var props = _extends$P({}, this._getDefaultProps(), this.props);
      var tickTotal = props.tickTotal, tickValues = props.tickValues, marginLeft = props.marginLeft, marginTop = props.marginTop, rRange = props.rRange, style = props.style;
      var xScale = getAttributeScale(props, "x");
      var yScale = getAttributeScale(props, "y");
      var values = getTickValues(xScale, tickTotal, tickValues);
      return /* @__PURE__ */ jsx("g", {
        transform: "translate(" + (xScale(centerX) + marginLeft) + "," + (yScale(centerY) + marginTop) + ")",
        className: "rv-xy-plot__circular-grid-lines",
        children: values.reduce(function(res, value, index) {
          var radius = xScale(value);
          if (rRange && (radius < rRange[0] || radius > rRange[1])) {
            return res;
          }
          return res.concat([/* @__PURE__ */ jsx("circle", {
            cx: 0,
            cy: 0,
            r: radius,
            className: "rv-xy-plot__circular-grid-lines__line",
            style
          }, index)]);
        }, [])
      });
    }
  }]);
  return CircularGridLines2;
}(react.exports.PureComponent);
CircularGridLines.displayName = "CircularGridLines";
CircularGridLines.propTypes = {
  centerX: PropTypes.number,
  centerY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  rRange: PropTypes.arrayOf(PropTypes.number),
  style: PropTypes.object,
  tickValues: PropTypes.arrayOf(PropTypes.number),
  tickTotal: PropTypes.number,
  animation: AnimationPropType,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};
CircularGridLines.defaultProps = {
  centerX: 0,
  centerY: 0
};
CircularGridLines.requiresSVG = true;
var array = Array.prototype;
var slice$3 = array.slice;
function ascending(a2, b) {
  return a2 - b;
}
function area(ring) {
  var i2 = 0, n2 = ring.length, area2 = ring[n2 - 1][1] * ring[0][0] - ring[n2 - 1][0] * ring[0][1];
  while (++i2 < n2)
    area2 += ring[i2 - 1][1] * ring[i2][0] - ring[i2 - 1][0] * ring[i2][1];
  return area2;
}
function constant$1(x2) {
  return function() {
    return x2;
  };
}
function contains(ring, hole) {
  var i2 = -1, n2 = hole.length, c2;
  while (++i2 < n2)
    if (c2 = ringContains(ring, hole[i2]))
      return c2;
  return 0;
}
function ringContains(ring, point2) {
  var x2 = point2[0], y2 = point2[1], contains2 = -1;
  for (var i2 = 0, n2 = ring.length, j = n2 - 1; i2 < n2; j = i2++) {
    var pi2 = ring[i2], xi2 = pi2[0], yi2 = pi2[1], pj2 = ring[j], xj2 = pj2[0], yj2 = pj2[1];
    if (segmentContains(pi2, pj2, point2))
      return 0;
    if (yi2 > y2 !== yj2 > y2 && x2 < (xj2 - xi2) * (y2 - yi2) / (yj2 - yi2) + xi2)
      contains2 = -contains2;
  }
  return contains2;
}
function segmentContains(a2, b, c2) {
  var i2;
  return collinear(a2, b, c2) && within(a2[i2 = +(a2[0] === b[0])], c2[i2], b[i2]);
}
function collinear(a2, b, c2) {
  return (b[0] - a2[0]) * (c2[1] - a2[1]) === (c2[0] - a2[0]) * (b[1] - a2[1]);
}
function within(p2, q2, r2) {
  return p2 <= q2 && q2 <= r2 || r2 <= q2 && q2 <= p2;
}
function noop$1() {
}
var cases = [
  [],
  [[[1, 1.5], [0.5, 1]]],
  [[[1.5, 1], [1, 1.5]]],
  [[[1.5, 1], [0.5, 1]]],
  [[[1, 0.5], [1.5, 1]]],
  [[[1, 1.5], [0.5, 1]], [[1, 0.5], [1.5, 1]]],
  [[[1, 0.5], [1, 1.5]]],
  [[[1, 0.5], [0.5, 1]]],
  [[[0.5, 1], [1, 0.5]]],
  [[[1, 1.5], [1, 0.5]]],
  [[[0.5, 1], [1, 0.5]], [[1.5, 1], [1, 1.5]]],
  [[[1.5, 1], [1, 0.5]]],
  [[[0.5, 1], [1.5, 1]]],
  [[[1, 1.5], [1.5, 1]]],
  [[[0.5, 1], [1, 1.5]]],
  []
];
function contours() {
  var dx = 1, dy = 1, threshold = thresholdSturges, smooth = smoothLinear;
  function contours2(values) {
    var tz = threshold(values);
    if (!Array.isArray(tz)) {
      var domain = extent(values), start = domain[0], stop = domain[1];
      tz = tickStep(start, stop, tz);
      tz = range(Math.floor(start / tz) * tz, Math.floor(stop / tz) * tz, tz);
    } else {
      tz = tz.slice().sort(ascending);
    }
    return tz.map(function(value) {
      return contour(values, value);
    });
  }
  function contour(values, value) {
    var polygons = [], holes = [];
    isorings(values, value, function(ring) {
      smooth(ring, values, value);
      if (area(ring) > 0)
        polygons.push([ring]);
      else
        holes.push(ring);
    });
    holes.forEach(function(hole) {
      for (var i2 = 0, n2 = polygons.length, polygon; i2 < n2; ++i2) {
        if (contains((polygon = polygons[i2])[0], hole) !== -1) {
          polygon.push(hole);
          return;
        }
      }
    });
    return {
      type: "MultiPolygon",
      value,
      coordinates: polygons
    };
  }
  function isorings(values, value, callback) {
    var fragmentByStart = new Array(), fragmentByEnd = new Array(), x2, y2, t02, t12, t2, t3;
    x2 = y2 = -1;
    t12 = values[0] >= value;
    cases[t12 << 1].forEach(stitch);
    while (++x2 < dx - 1) {
      t02 = t12, t12 = values[x2 + 1] >= value;
      cases[t02 | t12 << 1].forEach(stitch);
    }
    cases[t12 << 0].forEach(stitch);
    while (++y2 < dy - 1) {
      x2 = -1;
      t12 = values[y2 * dx + dx] >= value;
      t2 = values[y2 * dx] >= value;
      cases[t12 << 1 | t2 << 2].forEach(stitch);
      while (++x2 < dx - 1) {
        t02 = t12, t12 = values[y2 * dx + dx + x2 + 1] >= value;
        t3 = t2, t2 = values[y2 * dx + x2 + 1] >= value;
        cases[t02 | t12 << 1 | t2 << 2 | t3 << 3].forEach(stitch);
      }
      cases[t12 | t2 << 3].forEach(stitch);
    }
    x2 = -1;
    t2 = values[y2 * dx] >= value;
    cases[t2 << 2].forEach(stitch);
    while (++x2 < dx - 1) {
      t3 = t2, t2 = values[y2 * dx + x2 + 1] >= value;
      cases[t2 << 2 | t3 << 3].forEach(stitch);
    }
    cases[t2 << 3].forEach(stitch);
    function stitch(line2) {
      var start = [line2[0][0] + x2, line2[0][1] + y2], end = [line2[1][0] + x2, line2[1][1] + y2], startIndex = index(start), endIndex = index(end), f2, g;
      if (f2 = fragmentByEnd[startIndex]) {
        if (g = fragmentByStart[endIndex]) {
          delete fragmentByEnd[f2.end];
          delete fragmentByStart[g.start];
          if (f2 === g) {
            f2.ring.push(end);
            callback(f2.ring);
          } else {
            fragmentByStart[f2.start] = fragmentByEnd[g.end] = { start: f2.start, end: g.end, ring: f2.ring.concat(g.ring) };
          }
        } else {
          delete fragmentByEnd[f2.end];
          f2.ring.push(end);
          fragmentByEnd[f2.end = endIndex] = f2;
        }
      } else if (f2 = fragmentByStart[endIndex]) {
        if (g = fragmentByEnd[startIndex]) {
          delete fragmentByStart[f2.start];
          delete fragmentByEnd[g.end];
          if (f2 === g) {
            f2.ring.push(end);
            callback(f2.ring);
          } else {
            fragmentByStart[g.start] = fragmentByEnd[f2.end] = { start: g.start, end: f2.end, ring: g.ring.concat(f2.ring) };
          }
        } else {
          delete fragmentByStart[f2.start];
          f2.ring.unshift(start);
          fragmentByStart[f2.start = startIndex] = f2;
        }
      } else {
        fragmentByStart[startIndex] = fragmentByEnd[endIndex] = { start: startIndex, end: endIndex, ring: [start, end] };
      }
    }
  }
  function index(point2) {
    return point2[0] * 2 + point2[1] * (dx + 1) * 4;
  }
  function smoothLinear(ring, values, value) {
    ring.forEach(function(point2) {
      var x2 = point2[0], y2 = point2[1], xt = x2 | 0, yt = y2 | 0, v0, v1 = values[yt * dx + xt];
      if (x2 > 0 && x2 < dx && xt === x2) {
        v0 = values[yt * dx + xt - 1];
        point2[0] = x2 + (value - v0) / (v1 - v0) - 0.5;
      }
      if (y2 > 0 && y2 < dy && yt === y2) {
        v0 = values[(yt - 1) * dx + xt];
        point2[1] = y2 + (value - v0) / (v1 - v0) - 0.5;
      }
    });
  }
  contours2.contour = contour;
  contours2.size = function(_) {
    if (!arguments.length)
      return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 > 0) || !(_1 > 0))
      throw new Error("invalid size");
    return dx = _0, dy = _1, contours2;
  };
  contours2.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$1(slice$3.call(_)) : constant$1(_), contours2) : threshold;
  };
  contours2.smooth = function(_) {
    return arguments.length ? (smooth = _ ? smoothLinear : noop$1, contours2) : smooth === smoothLinear;
  };
  return contours2;
}
function blurX(source, target, r2) {
  var n2 = source.width, m2 = source.height, w2 = (r2 << 1) + 1;
  for (var j = 0; j < m2; ++j) {
    for (var i2 = 0, sr = 0; i2 < n2 + r2; ++i2) {
      if (i2 < n2) {
        sr += source.data[i2 + j * n2];
      }
      if (i2 >= r2) {
        if (i2 >= w2) {
          sr -= source.data[i2 - w2 + j * n2];
        }
        target.data[i2 - r2 + j * n2] = sr / Math.min(i2 + 1, n2 - 1 + w2 - i2, w2);
      }
    }
  }
}
function blurY(source, target, r2) {
  var n2 = source.width, m2 = source.height, w2 = (r2 << 1) + 1;
  for (var i2 = 0; i2 < n2; ++i2) {
    for (var j = 0, sr = 0; j < m2 + r2; ++j) {
      if (j < m2) {
        sr += source.data[i2 + j * n2];
      }
      if (j >= r2) {
        if (j >= w2) {
          sr -= source.data[i2 + (j - w2) * n2];
        }
        target.data[i2 + (j - r2) * n2] = sr / Math.min(j + 1, m2 - 1 + w2 - j, w2);
      }
    }
  }
}
function defaultX(d) {
  return d[0];
}
function defaultY(d) {
  return d[1];
}
function defaultWeight() {
  return 1;
}
function contourDensity() {
  var x2 = defaultX, y2 = defaultY, weight = defaultWeight, dx = 960, dy = 500, r2 = 20, k2 = 2, o = r2 * 3, n2 = dx + o * 2 >> k2, m2 = dy + o * 2 >> k2, threshold = constant$1(20);
  function density(data) {
    var values0 = new Float32Array(n2 * m2), values1 = new Float32Array(n2 * m2);
    data.forEach(function(d, i2, data2) {
      var xi2 = +x2(d, i2, data2) + o >> k2, yi2 = +y2(d, i2, data2) + o >> k2, wi2 = +weight(d, i2, data2);
      if (xi2 >= 0 && xi2 < n2 && yi2 >= 0 && yi2 < m2) {
        values0[xi2 + yi2 * n2] += wi2;
      }
    });
    blurX({ width: n2, height: m2, data: values0 }, { width: n2, height: m2, data: values1 }, r2 >> k2);
    blurY({ width: n2, height: m2, data: values1 }, { width: n2, height: m2, data: values0 }, r2 >> k2);
    blurX({ width: n2, height: m2, data: values0 }, { width: n2, height: m2, data: values1 }, r2 >> k2);
    blurY({ width: n2, height: m2, data: values1 }, { width: n2, height: m2, data: values0 }, r2 >> k2);
    blurX({ width: n2, height: m2, data: values0 }, { width: n2, height: m2, data: values1 }, r2 >> k2);
    blurY({ width: n2, height: m2, data: values1 }, { width: n2, height: m2, data: values0 }, r2 >> k2);
    var tz = threshold(values0);
    if (!Array.isArray(tz)) {
      var stop = max$1(values0);
      tz = tickStep(0, stop, tz);
      tz = range(0, Math.floor(stop / tz) * tz, tz);
      tz.shift();
    }
    return contours().thresholds(tz).size([n2, m2])(values0).map(transform);
  }
  function transform(geometry) {
    geometry.value *= Math.pow(2, -2 * k2);
    geometry.coordinates.forEach(transformPolygon);
    return geometry;
  }
  function transformPolygon(coordinates) {
    coordinates.forEach(transformRing);
  }
  function transformRing(coordinates) {
    coordinates.forEach(transformPoint);
  }
  function transformPoint(coordinates) {
    coordinates[0] = coordinates[0] * Math.pow(2, k2) - o;
    coordinates[1] = coordinates[1] * Math.pow(2, k2) - o;
  }
  function resize() {
    o = r2 * 3;
    n2 = dx + o * 2 >> k2;
    m2 = dy + o * 2 >> k2;
    return density;
  }
  density.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant$1(+_), density) : x2;
  };
  density.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant$1(+_), density) : y2;
  };
  density.weight = function(_) {
    return arguments.length ? (weight = typeof _ === "function" ? _ : constant$1(+_), density) : weight;
  };
  density.size = function(_) {
    if (!arguments.length)
      return [dx, dy];
    var _0 = Math.ceil(_[0]), _1 = Math.ceil(_[1]);
    if (!(_0 >= 0) && !(_0 >= 0))
      throw new Error("invalid size");
    return dx = _0, dy = _1, resize();
  };
  density.cellSize = function(_) {
    if (!arguments.length)
      return 1 << k2;
    if (!((_ = +_) >= 1))
      throw new Error("invalid cell size");
    return k2 = Math.floor(Math.log(_) / Math.LN2), resize();
  };
  density.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$1(slice$3.call(_)) : constant$1(_), density) : threshold;
  };
  density.bandwidth = function(_) {
    if (!arguments.length)
      return Math.sqrt(r2 * (r2 + 1));
    if (!((_ = +_) >= 0))
      throw new Error("invalid bandwidth");
    return r2 = Math.round((Math.sqrt(4 * _ * _ + 1) - 1) / 2), resize();
  };
  return density;
}
function adder() {
  return new Adder();
}
function Adder() {
  this.reset();
}
Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = this.t = 0;
  },
  add: function(y2) {
    add(temp, y2, this.t);
    add(this, temp.s, this.s);
    if (this.s)
      this.t += temp.t;
    else
      this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};
var temp = new Adder();
function add(adder2, a2, b) {
  var x2 = adder2.s = a2 + b, bv = x2 - a2, av = x2 - bv;
  adder2.t = a2 - av + (b - bv);
}
var pi = Math.PI;
var tau = pi * 2;
var abs = Math.abs;
var sqrt = Math.sqrt;
function noop() {
}
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}
var streamObjectType = {
  Feature: function(object2, stream) {
    streamGeometry(object2.geometry, stream);
  },
  FeatureCollection: function(object2, stream) {
    var features = object2.features, i2 = -1, n2 = features.length;
    while (++i2 < n2)
      streamGeometry(features[i2].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function(object2, stream) {
    stream.sphere();
  },
  Point: function(object2, stream) {
    object2 = object2.coordinates;
    stream.point(object2[0], object2[1], object2[2]);
  },
  MultiPoint: function(object2, stream) {
    var coordinates = object2.coordinates, i2 = -1, n2 = coordinates.length;
    while (++i2 < n2)
      object2 = coordinates[i2], stream.point(object2[0], object2[1], object2[2]);
  },
  LineString: function(object2, stream) {
    streamLine(object2.coordinates, stream, 0);
  },
  MultiLineString: function(object2, stream) {
    var coordinates = object2.coordinates, i2 = -1, n2 = coordinates.length;
    while (++i2 < n2)
      streamLine(coordinates[i2], stream, 0);
  },
  Polygon: function(object2, stream) {
    streamPolygon(object2.coordinates, stream);
  },
  MultiPolygon: function(object2, stream) {
    var coordinates = object2.coordinates, i2 = -1, n2 = coordinates.length;
    while (++i2 < n2)
      streamPolygon(coordinates[i2], stream);
  },
  GeometryCollection: function(object2, stream) {
    var geometries = object2.geometries, i2 = -1, n2 = geometries.length;
    while (++i2 < n2)
      streamGeometry(geometries[i2], stream);
  }
};
function streamLine(coordinates, stream, closed) {
  var i2 = -1, n2 = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i2 < n2)
    coordinate = coordinates[i2], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}
function streamPolygon(coordinates, stream) {
  var i2 = -1, n2 = coordinates.length;
  stream.polygonStart();
  while (++i2 < n2)
    streamLine(coordinates[i2], stream, 1);
  stream.polygonEnd();
}
function geoStream(object2, stream) {
  if (object2 && streamObjectType.hasOwnProperty(object2.type)) {
    streamObjectType[object2.type](object2, stream);
  } else {
    streamGeometry(object2, stream);
  }
}
function identity(x2) {
  return x2;
}
var areaSum = adder(), areaRingSum = adder(), x00$2, y00$2, x0$3, y0$3;
var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop;
    areaSum.add(abs(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
    var area2 = areaSum / 2;
    areaSum.reset();
    return area2;
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaPointFirst(x2, y2) {
  areaStream.point = areaPoint;
  x00$2 = x0$3 = x2, y00$2 = y0$3 = y2;
}
function areaPoint(x2, y2) {
  areaRingSum.add(y0$3 * x2 - x0$3 * y2);
  x0$3 = x2, y0$3 = y2;
}
function areaRingEnd() {
  areaPoint(x00$2, y00$2);
}
var pathArea = areaStream;
var x0$2 = Infinity, y0$2 = x0$2, x1 = -x0$2, y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};
function boundsPoint(x2, y2) {
  if (x2 < x0$2)
    x0$2 = x2;
  if (x2 > x1)
    x1 = x2;
  if (y2 < y0$2)
    y0$2 = y2;
  if (y2 > y1)
    y1 = y2;
}
var boundsStream$1 = boundsStream;
var X0 = 0, Y0 = 0, Z0 = 0, X1 = 0, Y1 = 0, Z1 = 0, X2 = 0, Y2 = 0, Z2 = 0, x00$1, y00$1, x0$1, y0$1;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid;
  }
};
function centroidPoint(x2, y2) {
  X0 += x2;
  Y0 += y2;
  ++Z0;
}
function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x2, y2) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
function centroidPointLine(x2, y2) {
  var dx = x2 - x0$1, dy = y2 - y0$1, z2 = sqrt(dx * dx + dy * dy);
  X1 += z2 * (x0$1 + x2) / 2;
  Y1 += z2 * (y0$1 + y2) / 2;
  Z1 += z2;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}
function centroidPointFirstRing(x2, y2) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$1 = x2, y00$1 = y0$1 = y2);
}
function centroidPointRing(x2, y2) {
  var dx = x2 - x0$1, dy = y2 - y0$1, z2 = sqrt(dx * dx + dy * dy);
  X1 += z2 * (x0$1 + x2) / 2;
  Y1 += z2 * (y0$1 + y2) / 2;
  Z1 += z2;
  z2 = y0$1 * x2 - x0$1 * y2;
  X2 += z2 * (x0$1 + x2);
  Y2 += z2 * (y0$1 + y2);
  Z2 += z2 * 3;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
var pathCentroid = centroidStream;
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0)
      this._context.closePath();
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x2, y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x2, y2);
        break;
      }
      default: {
        this._context.moveTo(x2 + this._radius, y2);
        this._context.arc(x2, y2, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};
var lengthSum = adder(), lengthRing, x00, y00, x0, y0;
var lengthStream = {
  point: noop,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing)
      lengthPoint(x00, y00);
    lengthStream.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};
function lengthPointFirst(x2, y2) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x2, y00 = y0 = y2;
}
function lengthPoint(x2, y2) {
  x0 -= x2, y0 -= y2;
  lengthSum.add(sqrt(x0 * x0 + y0 * y0));
  x0 = x2, y0 = y2;
}
var pathMeasure = lengthStream;
function PathString() {
  this._string = [];
}
PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius)
      this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0)
      this._string.push("Z");
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x2, ",", y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x2, ",", y2);
        break;
      }
      default: {
        if (this._circle == null)
          this._circle = circle(this._radius);
        this._string.push("M", x2, ",", y2, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};
function circle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}
function geoPath(projection, context) {
  var pointRadius = 4.5, projectionStream, contextStream;
  function path2(object2) {
    if (object2) {
      if (typeof pointRadius === "function")
        contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object2, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path2.area = function(object2) {
    geoStream(object2, projectionStream(pathArea));
    return pathArea.result();
  };
  path2.measure = function(object2) {
    geoStream(object2, projectionStream(pathMeasure));
    return pathMeasure.result();
  };
  path2.bounds = function(object2) {
    geoStream(object2, projectionStream(boundsStream$1));
    return boundsStream$1.result();
  };
  path2.centroid = function(object2) {
    geoStream(object2, projectionStream(pathCentroid));
    return pathCentroid.result();
  };
  path2.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity) : (projection = _).stream, path2) : projection;
  };
  path2.context = function(_) {
    if (!arguments.length)
      return context;
    contextStream = _ == null ? (context = null, new PathString()) : new PathContext(context = _);
    if (typeof pointRadius !== "function")
      contextStream.pointRadius(pointRadius);
    return path2;
  };
  path2.pointRadius = function(_) {
    if (!arguments.length)
      return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path2;
  };
  return path2.projection(projection).context(context);
}
var _extends$O = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$B = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$B(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$B(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$B(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$d = "rv-xy-plot__series rv-xy-plot__series--contour";
function getDomain(data) {
  return data.reduce(function(acc, row) {
    return {
      min: Math.min(acc.min, row.value),
      max: Math.max(acc.max, row.value)
    };
  }, { min: Infinity, max: -Infinity });
}
var ContourSeries = function(_AbstractSeries) {
  _inherits$B(ContourSeries2, _AbstractSeries);
  function ContourSeries2() {
    _classCallCheck$B(this, ContourSeries2);
    return _possibleConstructorReturn$B(this, (ContourSeries2.__proto__ || Object.getPrototypeOf(ContourSeries2)).apply(this, arguments));
  }
  _createClass$B(ContourSeries2, [{
    key: "render",
    value: function render() {
      var _props = this.props, animation = _props.animation, bandwidth = _props.bandwidth, className = _props.className, colorRange = _props.colorRange, data = _props.data, innerHeight = _props.innerHeight, innerWidth = _props.innerWidth, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style;
      if (!data || !innerWidth || !innerHeight) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$O({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(ContourSeries2, _extends$O({}, this.props, { animation: null })));
      }
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var contouredData = contourDensity().x(function(d) {
        return x2(d);
      }).y(function(d) {
        return y2(d);
      }).size([innerWidth, innerHeight]).bandwidth(bandwidth)(data);
      var geo = geoPath();
      var _getDomain = getDomain(contouredData), min2 = _getDomain.min, max2 = _getDomain.max;
      var colorScale = linear().domain([min2, max2]).range(colorRange || CONTINUOUS_COLOR_RANGE);
      return React.createElement("g", {
        className: predefinedClassName$d + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, contouredData.map(function(polygon, index) {
        return React.createElement("path", {
          className: "rv-xy-plot__series--contour-line",
          key: "rv-xy-plot__series--contour-line-" + index,
          d: geo(polygon),
          style: _extends$O({
            fill: colorScale(polygon.value)
          }, style)
        });
      }));
    }
  }]);
  return ContourSeries2;
}(AbstractSeries);
ContourSeries.propTypes = _extends$O({}, AbstractSeries.propTypes, {
  animation: PropTypes.bool,
  bandwidth: PropTypes.number,
  className: PropTypes.string,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  style: PropTypes.object
});
ContourSeries.defaultProps = _extends$O({}, AbstractSeries.defaultProps, {
  bandwidth: 40,
  style: {}
});
var _extends$N = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$A = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$A(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$A(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$A(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function defaultTitleFormat(values) {
  var value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: "x",
      value: transformValueToString(value.x)
    };
  }
}
function defaultItemsFormat(values) {
  return values.map(function(v2, i2) {
    if (v2) {
      return {
        value: v2.y,
        title: i2
      };
    }
  });
}
function getFirstNonEmptyValue(values) {
  return (values || []).find(function(v2) {
    return Boolean(v2);
  });
}
var Crosshair = function(_PureComponent) {
  _inherits$A(Crosshair2, _PureComponent);
  function Crosshair2() {
    _classCallCheck$A(this, Crosshair2);
    return _possibleConstructorReturn$A(this, (Crosshair2.__proto__ || Object.getPrototypeOf(Crosshair2)).apply(this, arguments));
  }
  _createClass$A(Crosshair2, [{
    key: "_renderCrosshairItems",
    value: function _renderCrosshairItems() {
      var _props = this.props, values = _props.values, itemsFormat = _props.itemsFormat;
      var items = itemsFormat(values);
      if (!items) {
        return null;
      }
      return items.filter(function(i2) {
        return i2;
      }).map(function renderValue(item, i2) {
        return /* @__PURE__ */ jsxs("div", {
          className: "rv-crosshair__item",
          children: [/* @__PURE__ */ jsx("span", {
            className: "rv-crosshair__item__title",
            children: item.title
          }), ": ", /* @__PURE__ */ jsx("span", {
            className: "rv-crosshair__item__value",
            children: item.value
          })]
        }, "item" + i2);
      });
    }
  }, {
    key: "_renderCrosshairTitle",
    value: function _renderCrosshairTitle() {
      var _props2 = this.props, values = _props2.values, titleFormat = _props2.titleFormat, style = _props2.style;
      var titleItem = titleFormat(values);
      if (!titleItem) {
        return null;
      }
      return /* @__PURE__ */ jsxs("div", {
        className: "rv-crosshair__title",
        style: style.title,
        children: [/* @__PURE__ */ jsx("span", {
          className: "rv-crosshair__title__title",
          children: titleItem.title
        }), ": ", /* @__PURE__ */ jsx("span", {
          className: "rv-crosshair__title__value",
          children: titleItem.value
        })]
      }, "title");
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props, children = _props3.children, className = _props3.className, values = _props3.values, marginTop = _props3.marginTop, marginLeft = _props3.marginLeft, innerWidth = _props3.innerWidth, innerHeight = _props3.innerHeight, style = _props3.style;
      var value = getFirstNonEmptyValue(values);
      if (!value) {
        return null;
      }
      var x2 = getAttributeFunctor(this.props, "x");
      var innerLeft = x2(value);
      var _props$orientation = this.props.orientation, orientation = _props$orientation === void 0 ? innerLeft > innerWidth / 2 ? "left" : "right" : _props$orientation;
      var left = marginLeft + innerLeft;
      var top = marginTop;
      var innerClassName = "rv-crosshair__inner rv-crosshair__inner--" + orientation;
      return /* @__PURE__ */ jsxs("div", {
        className: "rv-crosshair " + className,
        style: {
          left: left + "px",
          top: top + "px"
        },
        children: [/* @__PURE__ */ jsx("div", {
          className: "rv-crosshair__line",
          style: _extends$N({
            height: innerHeight + "px"
          }, style.line)
        }), /* @__PURE__ */ jsx("div", {
          className: innerClassName,
          children: children ? children : /* @__PURE__ */ jsx("div", {
            className: "rv-crosshair__inner__content",
            style: style.box,
            children: /* @__PURE__ */ jsxs("div", {
              children: [this._renderCrosshairTitle(), this._renderCrosshairItems()]
            })
          })
        })]
      });
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat,
        style: {
          line: {},
          title: {},
          box: {}
        }
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        className: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])),
        series: PropTypes.object,
        innerWidth: PropTypes.number,
        innerHeight: PropTypes.number,
        marginLeft: PropTypes.number,
        marginTop: PropTypes.number,
        orientation: PropTypes.oneOf(["left", "right"]),
        itemsFormat: PropTypes.func,
        titleFormat: PropTypes.func,
        style: PropTypes.shape({
          line: PropTypes.object,
          title: PropTypes.object,
          box: PropTypes.object
        })
      };
    }
  }]);
  return Crosshair2;
}(react.exports.PureComponent);
Crosshair.displayName = "Crosshair";
var _createClass$z = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$M = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$z(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$z(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$z(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _toConsumableArray$2(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var predefinedClassName$c = "rv-xy-plot__series rv-xy-plot__series--custom-svg-wrapper";
var DEFAULT_STYLE = {
  stroke: "blue",
  fill: "blue"
};
function predefinedComponents(type) {
  var size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
  var style = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DEFAULT_STYLE;
  switch (type) {
    case "diamond":
      return React.createElement("polygon", {
        style,
        points: "0 0 " + size / 2 + " " + size / 2 + " 0 " + size + " " + -size / 2 + " " + size / 2 + " 0 0"
      });
    case "star":
      var starPoints = [].concat(_toConsumableArray$2(new Array(5))).map(function(c2, index) {
        var angle = index / 5 * Math.PI * 2;
        var innerAngle = angle + Math.PI / 10;
        var outerAngle = angle - Math.PI / 10;
        var innerRadius = size / 2.61;
        return "\n        " + Math.cos(outerAngle) * size + " " + Math.sin(outerAngle) * size + "\n        " + Math.cos(innerAngle) * innerRadius + " " + Math.sin(innerAngle) * innerRadius + "\n      ";
      }).join(" ");
      return React.createElement("polygon", {
        points: starPoints,
        x: "0",
        y: "0",
        height: size,
        width: size,
        style
      });
    case "square":
      return React.createElement("rect", {
        x: "" + -size / 2,
        y: "" + -size / 2,
        height: size,
        width: size,
        style
      });
    default:
    case "circle":
      return React.createElement("circle", { cx: "0", cy: "0", r: size / 2, style });
  }
}
function getInnerComponent(_ref) {
  var customComponent = _ref.customComponent, defaultType = _ref.defaultType, positionInPixels = _ref.positionInPixels;
  _ref.positionFunctions;
  var style = _ref.style, propsSize = _ref.propsSize;
  var size = customComponent.size;
  var aggStyle = _extends$M({}, style, customComponent.style || {});
  var innerComponent = customComponent.customComponent;
  if (!innerComponent && typeof defaultType === "string") {
    return predefinedComponents(defaultType, size || propsSize, aggStyle);
  }
  if (!innerComponent) {
    return defaultType(customComponent, positionInPixels, aggStyle);
  }
  if (typeof innerComponent === "string") {
    return predefinedComponents(innerComponent || defaultType, size, aggStyle);
  }
  return innerComponent(customComponent, positionInPixels, aggStyle);
}
var CustomSVGSeries = function(_AbstractSeries) {
  _inherits$z(CustomSVGSeries2, _AbstractSeries);
  function CustomSVGSeries2() {
    _classCallCheck$z(this, CustomSVGSeries2);
    return _possibleConstructorReturn$z(this, (CustomSVGSeries2.__proto__ || Object.getPrototypeOf(CustomSVGSeries2)).apply(this, arguments));
  }
  _createClass$z(CustomSVGSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, customComponent = _props.customComponent, data = _props.data, innerHeight = _props.innerHeight, innerWidth = _props.innerWidth, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style, size = _props.size;
      if (!data || !innerWidth || !innerHeight) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$M({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(CustomSVGSeries2, _extends$M({}, this.props, { animation: false })));
      }
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var contents = data.map(function(seriesComponent, index) {
        var positionInPixels = {
          x: x2(seriesComponent),
          y: y2(seriesComponent)
        };
        var innerComponent = getInnerComponent({
          customComponent: seriesComponent,
          positionInPixels,
          defaultType: customComponent,
          positionFunctions: { x: x2, y: y2 },
          style,
          propsSize: size
        });
        return React.createElement("g", {
          className: "rv-xy-plot__series--custom-svg",
          key: "rv-xy-plot__series--custom-svg-" + index,
          transform: "translate(" + positionInPixels.x + "," + positionInPixels.y + ")",
          onMouseEnter: function onMouseEnter(e3) {
            return _this2._valueMouseOverHandler(seriesComponent, e3);
          },
          onMouseLeave: function onMouseLeave(e3) {
            return _this2._valueMouseOutHandler(seriesComponent, e3);
          }
        }, innerComponent);
      });
      return React.createElement("g", {
        className: predefinedClassName$c + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, contents);
    }
  }]);
  return CustomSVGSeries2;
}(AbstractSeries);
CustomSVGSeries.propTypes = {
  animation: PropTypes.bool,
  className: PropTypes.string,
  customComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  })).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  style: PropTypes.object,
  size: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func
};
CustomSVGSeries.defaultProps = _extends$M({}, AbstractSeries.defaultProps, {
  animation: false,
  customComponent: "circle",
  style: {},
  size: 2
});
var _extends$L = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function decorativeAxisTick(props) {
  var axisDomain = props.axisDomain, numberOfTicks = props.numberOfTicks, axisStart = props.axisStart, axisEnd = props.axisEnd, tickValue2 = props.tickValue, tickSize = props.tickSize, style = props.style;
  var _generatePoints = generatePoints({
    axisStart,
    axisEnd,
    numberOfTicks,
    axisDomain
  }), points = _generatePoints.points;
  var tickAngle = getAxisAngle(axisStart, axisEnd) + Math.PI / 2;
  return points.map(function(point2, index) {
    var tickProps = _extends$L({
      x1: 0,
      y1: 0,
      x2: tickSize * Math.cos(tickAngle),
      y2: tickSize * Math.sin(tickAngle)
    }, style.ticks);
    var textProps = _extends$L({
      x: tickSize * Math.cos(tickAngle),
      y: tickSize * Math.sin(tickAngle),
      textAnchor: "start"
    }, style.text);
    return React.createElement("g", {
      key: index,
      transform: "translate(" + point2.x + ", " + point2.y + ")",
      className: "rv-xy-plot__axis__tick"
    }, React.createElement("line", _extends$L({}, tickProps, { className: "rv-xy-plot__axis__tick__line" })), React.createElement("text", _extends$L({}, textProps, { className: "rv-xy-plot__axis__tick__text" }), tickValue2(point2.text)));
  });
}
var _extends$K = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$y = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$y(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$y(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$y(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$b = "rv-xy-manipulable-axis rv-xy-plot__axis";
var animatedProps$1 = ["xRange", "yRange", "xDomain", "yDomain", "width", "height", "marginLeft", "marginTop", "marginRight", "marginBottom", "tickSize", "tickTotal", "tickSizeInner", "tickSizeOuter"];
var DecorativeAxis = function(_AbstractSeries) {
  _inherits$y(DecorativeAxis2, _AbstractSeries);
  function DecorativeAxis2() {
    _classCallCheck$y(this, DecorativeAxis2);
    return _possibleConstructorReturn$y(this, (DecorativeAxis2.__proto__ || Object.getPrototypeOf(DecorativeAxis2)).apply(this, arguments));
  }
  _createClass$y(DecorativeAxis2, [{
    key: "render",
    value: function render() {
      var _props = this.props, animation = _props.animation, className = _props.className, marginLeft = _props.marginLeft, marginTop = _props.marginTop, axisStart = _props.axisStart, axisEnd = _props.axisEnd, axisDomain = _props.axisDomain, numberOfTicks = _props.numberOfTicks, tickValue2 = _props.tickValue, tickSize = _props.tickSize, style = _props.style;
      if (animation) {
        return React.createElement(Animation, _extends$K({}, this.props, { animatedProps: animatedProps$1 }), React.createElement(DecorativeAxis2, _extends$K({}, this.props, { animation: null })));
      }
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      return React.createElement("g", {
        className: predefinedClassName$b + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, React.createElement("line", _extends$K({}, _extends$K({
        x1: x2({ x: axisStart.x }),
        x2: x2({ x: axisEnd.x }),
        y1: y2({ y: axisStart.y }),
        y2: y2({ y: axisEnd.y })
      }, style.line), {
        className: "rv-xy-plot__axis__line"
      })), React.createElement("g", { className: "rv-xy-manipulable-axis__ticks" }, decorativeAxisTick({
        axisDomain,
        axisEnd: { x: x2(axisEnd), y: y2(axisEnd) },
        axisStart: { x: x2(axisStart), y: y2(axisStart) },
        numberOfTicks,
        tickValue: tickValue2,
        tickSize,
        style
      })));
    }
  }]);
  return DecorativeAxis2;
}(AbstractSeries);
var DEFAULT_FORMAT$1 = format(".2r");
DecorativeAxis.defaultProps = {
  className: "",
  numberOfTicks: 10,
  tickValue: function tickValue(d) {
    return DEFAULT_FORMAT$1(d);
  },
  tickSize: 5,
  style: {
    line: {
      strokeWidth: 1
    },
    ticks: {
      strokeWidth: 2
    },
    text: {}
  }
};
DecorativeAxis.propTypes = _extends$K({}, AbstractSeries.propTypes, {
  axisDomain: PropTypes.arrayOf(PropTypes.number).isRequired,
  axisEnd: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  axisStart: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  className: PropTypes.string,
  numberOfTicks: PropTypes.number,
  tickValue: PropTypes.func,
  tickSize: PropTypes.number,
  style: PropTypes.shape({
    line: PropTypes.object,
    ticks: PropTypes.object,
    text: PropTypes.object
  })
});
DecorativeAxis.displayName = "DecorativeAxis";
({
  className: PropTypes.string
});
var _extends$J = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$x = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$x(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$x(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$x(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var VERTICAL$1 = DIRECTION.VERTICAL, HORIZONTAL$1 = DIRECTION.HORIZONTAL;
var propTypes$8 = {
  direction: PropTypes.oneOf([VERTICAL$1, HORIZONTAL$1]),
  attr: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  style: PropTypes.object,
  tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  tickTotal: PropTypes.number,
  animation: AnimationPropType,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};
var defaultProps$7 = {
  direction: VERTICAL$1
};
var animatedProps = ["xRange", "yRange", "xDomain", "yDomain", "width", "height", "marginLeft", "marginTop", "marginRight", "marginBottom", "tickTotal"];
var GridLines = function(_PureComponent) {
  _inherits$x(GridLines2, _PureComponent);
  function GridLines2() {
    _classCallCheck$x(this, GridLines2);
    return _possibleConstructorReturn$x(this, (GridLines2.__proto__ || Object.getPrototypeOf(GridLines2)).apply(this, arguments));
  }
  _createClass$x(GridLines2, [{
    key: "_getDefaultProps",
    value: function _getDefaultProps() {
      var _props = this.props, innerWidth = _props.innerWidth, innerHeight = _props.innerHeight, marginTop = _props.marginTop, marginLeft = _props.marginLeft, direction = _props.direction;
      return {
        left: marginLeft,
        top: marginTop,
        width: innerWidth,
        height: innerHeight,
        tickTotal: getTicksTotalFromSize(direction === VERTICAL$1 ? innerWidth : innerHeight)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props, animation = _props2.animation, className = _props2.className;
      if (animation) {
        return /* @__PURE__ */ jsx(Animation, {
          ...this.props,
          animatedProps,
          children: /* @__PURE__ */ jsx(GridLines2, {
            ...this.props,
            animation: null
          })
        });
      }
      var props = _extends$J({}, this._getDefaultProps(), this.props);
      var attr = props.attr, direction = props.direction, width = props.width, height = props.height, style = props.style, tickTotal = props.tickTotal, tickValues = props.tickValues, top = props.top, left = props.left;
      var isVertical = direction === VERTICAL$1;
      var tickXAttr = isVertical ? "y" : "x";
      var tickYAttr = isVertical ? "x" : "y";
      var length = isVertical ? height : width;
      var scale = getAttributeScale(props, attr);
      var values = getTickValues(scale, tickTotal, tickValues);
      return /* @__PURE__ */ jsx("g", {
        transform: "translate(" + left + "," + top + ")",
        className: "rv-xy-plot__grid-lines " + className,
        children: values.map(function(v2, i2) {
          var _pathProps;
          var pos = scale(v2);
          var pathProps = (_pathProps = {}, _defineProperty$6(_pathProps, tickYAttr + "1", pos), _defineProperty$6(_pathProps, tickYAttr + "2", pos), _defineProperty$6(_pathProps, tickXAttr + "1", 0), _defineProperty$6(_pathProps, tickXAttr + "2", length), _pathProps);
          return /* @__PURE__ */ react.exports.createElement("line", {
            ...pathProps,
            key: i2,
            className: "rv-xy-plot__grid-lines__line",
            style
          });
        })
      });
    }
  }]);
  return GridLines2;
}(react.exports.PureComponent);
GridLines.displayName = "GridLines";
GridLines.defaultProps = defaultProps$7;
GridLines.propTypes = propTypes$8;
GridLines.requiresSVG = true;
var _extends$I = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$w = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$w(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$w(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$w(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$a = "rv-xy-plot__series rv-xy-plot__series--heatmap";
var HeatmapSeries = function(_AbstractSeries) {
  _inherits$w(HeatmapSeries2, _AbstractSeries);
  function HeatmapSeries2() {
    _classCallCheck$w(this, HeatmapSeries2);
    return _possibleConstructorReturn$w(this, (HeatmapSeries2.__proto__ || Object.getPrototypeOf(HeatmapSeries2)).apply(this, arguments));
  }
  _createClass$w(HeatmapSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, data = _props.data, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$I({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(HeatmapSeries2, _extends$I({}, this.props, { animation: null })));
      }
      var _rectStyle$style = _extends$I({ rectStyle: {} }, style), rectStyle = _rectStyle$style.rectStyle;
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var opacity = this._getAttributeFunctor("opacity");
      var fill = this._getAttributeFunctor("fill") || this._getAttributeFunctor("color");
      var stroke = this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color");
      var xDistance = this._getScaleDistance("x");
      var yDistance = this._getScaleDistance("y");
      return React.createElement("g", {
        className: predefinedClassName$a + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, data.map(function(d, i2) {
        var attrs = _extends$I({
          style: _extends$I({
            stroke: stroke && stroke(d),
            fill: fill && fill(d),
            opacity: opacity && opacity(d)
          }, style)
        }, rectStyle, {
          x: x2(d) - xDistance / 2,
          y: y2(d) - yDistance / 2,
          width: xDistance,
          height: yDistance,
          key: i2,
          onClick: function onClick(e3) {
            return _this2._valueClickHandler(d, e3);
          },
          onContextMenu: function onContextMenu(e3) {
            return _this2._valueRightClickHandler(d, e3);
          },
          onMouseOver: function onMouseOver(e3) {
            return _this2._valueMouseOverHandler(d, e3);
          },
          onMouseOut: function onMouseOut(e3) {
            return _this2._valueMouseOutHandler(d, e3);
          }
        });
        return React.createElement("rect", attrs);
      }));
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === "x" || attr === "y";
      return { isDomainAdjustmentNeeded };
    }
  }]);
  return HeatmapSeries2;
}(AbstractSeries);
HeatmapSeries.propTypes = _extends$I({}, AbstractSeries.propTypes);
HeatmapSeries.displayName = "HeatmapSeries";
var thirdPi = Math.PI / 3, angles = [0, thirdPi, 2 * thirdPi, 3 * thirdPi, 4 * thirdPi, 5 * thirdPi];
function pointX(d) {
  return d[0];
}
function pointY(d) {
  return d[1];
}
function hexbin() {
  var x02 = 0, y02 = 0, x12 = 1, y12 = 1, x2 = pointX, y2 = pointY, r2, dx, dy;
  function hexbin2(points) {
    var binsById = {}, bins = [], i2, n2 = points.length;
    for (i2 = 0; i2 < n2; ++i2) {
      if (isNaN(px = +x2.call(null, point2 = points[i2], i2, points)) || isNaN(py = +y2.call(null, point2, i2, points)))
        continue;
      var point2, px, py, pj2 = Math.round(py = py / dy), pi2 = Math.round(px = px / dx - (pj2 & 1) / 2), py1 = py - pj2;
      if (Math.abs(py1) * 3 > 1) {
        var px1 = px - pi2, pi22 = pi2 + (px < pi2 ? -1 : 1) / 2, pj22 = pj2 + (py < pj2 ? -1 : 1), px2 = px - pi22, py2 = py - pj22;
        if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2)
          pi2 = pi22 + (pj2 & 1 ? 1 : -1) / 2, pj2 = pj22;
      }
      var id2 = pi2 + "-" + pj2, bin = binsById[id2];
      if (bin)
        bin.push(point2);
      else {
        bins.push(bin = binsById[id2] = [point2]);
        bin.x = (pi2 + (pj2 & 1) / 2) * dx;
        bin.y = pj2 * dy;
      }
    }
    return bins;
  }
  function hexagon(radius) {
    var x03 = 0, y03 = 0;
    return angles.map(function(angle) {
      var x13 = Math.sin(angle) * radius, y13 = -Math.cos(angle) * radius, dx2 = x13 - x03, dy2 = y13 - y03;
      x03 = x13, y03 = y13;
      return [dx2, dy2];
    });
  }
  hexbin2.hexagon = function(radius) {
    return "m" + hexagon(radius == null ? r2 : +radius).join("l") + "z";
  };
  hexbin2.centers = function() {
    var centers = [], j = Math.round(y02 / dy), i2 = Math.round(x02 / dx);
    for (var y3 = j * dy; y3 < y12 + r2; y3 += dy, ++j) {
      for (var x3 = i2 * dx + (j & 1) * dx / 2; x3 < x12 + dx / 2; x3 += dx) {
        centers.push([x3, y3]);
      }
    }
    return centers;
  };
  hexbin2.mesh = function() {
    var fragment = hexagon(r2).slice(0, 4).join("l");
    return hexbin2.centers().map(function(p2) {
      return "M" + p2 + "m" + fragment;
    }).join("");
  };
  hexbin2.x = function(_) {
    return arguments.length ? (x2 = _, hexbin2) : x2;
  };
  hexbin2.y = function(_) {
    return arguments.length ? (y2 = _, hexbin2) : y2;
  };
  hexbin2.radius = function(_) {
    return arguments.length ? (r2 = +_, dx = r2 * 2 * Math.sin(thirdPi), dy = r2 * 1.5, hexbin2) : r2;
  };
  hexbin2.size = function(_) {
    return arguments.length ? (x02 = y02 = 0, x12 = +_[0], y12 = +_[1], hexbin2) : [x12 - x02, y12 - y02];
  };
  hexbin2.extent = function(_) {
    return arguments.length ? (x02 = +_[0][0], y02 = +_[0][1], x12 = +_[1][0], y12 = +_[1][1], hexbin2) : [[x02, y02], [x12, y12]];
  };
  return hexbin2.radius(1);
}
var _extends$H = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$v = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$v(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$v(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$v(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _toConsumableArray$1(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var predefinedClassName$9 = "rv-xy-plot__series rv-xy-plot__series--hexbin";
function getColorDomain(_ref, hexes) {
  var countDomain = _ref.countDomain;
  if (countDomain) {
    return countDomain;
  }
  return [0, Math.max.apply(Math, _toConsumableArray$1(hexes.map(function(row) {
    return row.length;
  })))];
}
var HexbinSeries = function(_AbstractSeries) {
  _inherits$v(HexbinSeries2, _AbstractSeries);
  function HexbinSeries2() {
    _classCallCheck$v(this, HexbinSeries2);
    return _possibleConstructorReturn$v(this, (HexbinSeries2.__proto__ || Object.getPrototypeOf(HexbinSeries2)).apply(this, arguments));
  }
  _createClass$v(HexbinSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, colorRange = _props.colorRange, data = _props.data, innerHeight = _props.innerHeight, innerWidth = _props.innerWidth, marginLeft = _props.marginLeft, marginTop = _props.marginTop, radius = _props.radius, sizeHexagonsWithCount = _props.sizeHexagonsWithCount, style = _props.style, xOffset = _props.xOffset, yOffset = _props.yOffset;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$H({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(HexbinSeries2, _extends$H({}, this.props, { animation: null })));
      }
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var hex2 = hexbin().x(function(d) {
        return x2(d) + xOffset;
      }).y(function(d) {
        return y2(d) + yOffset;
      }).radius(radius).size([innerWidth, innerHeight]);
      var hexagonPath = hex2.hexagon();
      var hexes = hex2(data);
      var countDomain = getColorDomain(this.props, hexes);
      var color2 = linear().domain(countDomain).range(colorRange);
      var size = linear().domain(countDomain).range([0, radius]);
      return React.createElement("g", {
        className: predefinedClassName$9 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, hexes.map(function(d, i2) {
        var attrs = {
          style,
          d: sizeHexagonsWithCount ? hex2.hexagon(size(d.length)) : hexagonPath,
          fill: color2(d.length),
          transform: "translate(" + d.x + ", " + d.y + ")",
          key: i2,
          onClick: function onClick(e3) {
            return _this2._valueClickHandler(d, e3);
          },
          onContextMenu: function onContextMenu(e3) {
            return _this2._valueRightClickHandler(d, e3);
          },
          onMouseOver: function onMouseOver(e3) {
            return _this2._valueMouseOverHandler(d, e3);
          },
          onMouseOut: function onMouseOut(e3) {
            return _this2._valueMouseOutHandler(d, e3);
          }
        };
        return React.createElement("path", attrs);
      }));
    }
  }]);
  return HexbinSeries2;
}(AbstractSeries);
HexbinSeries.propTypes = _extends$H({}, AbstractSeries.propTypes, {
  radius: PropTypes.number
});
HexbinSeries.defaultProps = {
  radius: 20,
  colorRange: CONTINUOUS_COLOR_RANGE,
  xOffset: 0,
  yOffset: 0
};
HexbinSeries.displayName = "HexbinSeries";
var _extends$G = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$u = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$u(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$u(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$u(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function getLocs(evt) {
  var xLoc = evt.type === "touchstart" ? evt.pageX : evt.offsetX;
  var yLoc = evt.type === "touchstart" ? evt.pageY : evt.offsetY;
  return { xLoc, yLoc };
}
var Highlight = function(_AbstractSeries) {
  _inherits$u(Highlight2, _AbstractSeries);
  function Highlight2() {
    var _ref;
    var _temp, _this, _ret;
    _classCallCheck$u(this, Highlight2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$u(this, (_ref = Highlight2.__proto__ || Object.getPrototypeOf(Highlight2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      brushArea: { top: 0, right: 0, bottom: 0, left: 0 },
      brushing: false,
      startLocX: 0,
      startLocY: 0,
      dragArea: null
    }, _temp), _possibleConstructorReturn$u(_this, _ret);
  }
  _createClass$u(Highlight2, [{
    key: "_getDrawArea",
    value: function _getDrawArea(xLoc, yLoc) {
      var _state = this.state, startLocX = _state.startLocX, startLocY = _state.startLocY;
      var _props = this.props, enableX = _props.enableX, enableY = _props.enableY, highlightWidth = _props.highlightWidth, highlightHeight = _props.highlightHeight, innerWidth = _props.innerWidth, innerHeight = _props.innerHeight, marginLeft = _props.marginLeft, marginRight = _props.marginRight, marginBottom = _props.marginBottom, marginTop = _props.marginTop;
      var plotHeight = innerHeight + marginTop + marginBottom;
      var plotWidth = innerWidth + marginLeft + marginRight;
      var touchWidth = highlightWidth || plotWidth;
      var touchHeight = highlightHeight || plotHeight;
      return {
        bottom: enableY ? Math.max(startLocY, yLoc) : touchHeight,
        right: enableX ? Math.max(startLocX, xLoc) : touchWidth,
        left: enableX ? Math.min(xLoc, startLocX) : 0,
        top: enableY ? Math.min(yLoc, startLocY) : 0
      };
    }
  }, {
    key: "_getDragArea",
    value: function _getDragArea(xLoc, yLoc) {
      var _props2 = this.props, enableX = _props2.enableX, enableY = _props2.enableY;
      var _state2 = this.state, startLocX = _state2.startLocX, startLocY = _state2.startLocY, dragArea = _state2.dragArea;
      return {
        bottom: dragArea.bottom + (enableY ? yLoc - startLocY : 0),
        left: dragArea.left + (enableX ? xLoc - startLocX : 0),
        right: dragArea.right + (enableX ? xLoc - startLocX : 0),
        top: dragArea.top + (enableY ? yLoc - startLocY : 0)
      };
    }
  }, {
    key: "_clickedOutsideDrag",
    value: function _clickedOutsideDrag(xLoc, yLoc) {
      var _props3 = this.props, enableX = _props3.enableX, enableY = _props3.enableY;
      var _state3 = this.state, dragArea = _state3.dragArea, _state3$brushArea = _state3.brushArea, left = _state3$brushArea.left, right = _state3$brushArea.right, top = _state3$brushArea.top, bottom = _state3$brushArea.bottom;
      var clickedOutsideDragX = dragArea && (xLoc < left || xLoc > right);
      var clickedOutsideDragY = dragArea && (yLoc < top || yLoc > bottom);
      if (enableX && enableY) {
        return clickedOutsideDragX || clickedOutsideDragY;
      }
      if (enableX) {
        return clickedOutsideDragX;
      }
      if (enableY) {
        return clickedOutsideDragY;
      }
      return true;
    }
  }, {
    key: "_convertAreaToCoordinates",
    value: function _convertAreaToCoordinates(brushArea) {
      var _props4 = this.props, enableX = _props4.enableX, enableY = _props4.enableY, marginLeft = _props4.marginLeft, marginTop = _props4.marginTop;
      var xScale = getAttributeScale(this.props, "x");
      var yScale = getAttributeScale(this.props, "y");
      if (enableX && enableY) {
        return {
          bottom: yScale.invert(brushArea.bottom),
          left: xScale.invert(brushArea.left - marginLeft),
          right: xScale.invert(brushArea.right - marginLeft),
          top: yScale.invert(brushArea.top)
        };
      }
      if (enableY) {
        return {
          bottom: yScale.invert(brushArea.bottom - marginTop),
          top: yScale.invert(brushArea.top - marginTop)
        };
      }
      if (enableX) {
        return {
          left: xScale.invert(brushArea.left - marginLeft),
          right: xScale.invert(brushArea.right - marginLeft)
        };
      }
      return {};
    }
  }, {
    key: "startBrushing",
    value: function startBrushing(e3) {
      var _this2 = this;
      var _props5 = this.props, onBrushStart = _props5.onBrushStart, onDragStart = _props5.onDragStart, drag = _props5.drag;
      var dragArea = this.state.dragArea;
      var _getLocs = getLocs(e3.nativeEvent), xLoc = _getLocs.xLoc, yLoc = _getLocs.yLoc;
      var startArea = function startArea2(dragging, resetDrag) {
        var emptyBrush = {
          bottom: yLoc,
          left: xLoc,
          right: xLoc,
          top: yLoc
        };
        _this2.setState({
          dragging,
          brushArea: dragArea && !resetDrag ? dragArea : emptyBrush,
          brushing: !dragging,
          startLocX: xLoc,
          startLocY: yLoc
        });
      };
      var clickedOutsideDrag = this._clickedOutsideDrag(xLoc, yLoc);
      if (drag && !dragArea || !drag || clickedOutsideDrag) {
        startArea(false, clickedOutsideDrag);
        if (onBrushStart) {
          onBrushStart(e3);
        }
        return;
      }
      if (drag && dragArea) {
        startArea(true, clickedOutsideDrag);
        if (onDragStart) {
          onDragStart(e3);
        }
      }
    }
  }, {
    key: "stopBrushing",
    value: function stopBrushing(e3) {
      var _state4 = this.state, brushing = _state4.brushing, dragging = _state4.dragging, brushArea = _state4.brushArea;
      if (!brushing && !dragging) {
        return;
      }
      var _props6 = this.props, onBrushEnd = _props6.onBrushEnd, onDragEnd = _props6.onDragEnd, drag = _props6.drag;
      var noHorizontal = Math.abs(brushArea.right - brushArea.left) < 5;
      var noVertical = Math.abs(brushArea.top - brushArea.bottom) < 5;
      var isNulled = noVertical || noHorizontal;
      this.setState({
        brushing: false,
        dragging: false,
        brushArea: drag ? brushArea : { top: 0, right: 0, bottom: 0, left: 0 },
        startLocX: 0,
        startLocY: 0,
        dragArea: drag && !isNulled && brushArea
      });
      if (brushing && onBrushEnd) {
        onBrushEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
      }
      if (drag && onDragEnd) {
        onDragEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
      }
    }
  }, {
    key: "onBrush",
    value: function onBrush(e3) {
      var _props7 = this.props, onBrush2 = _props7.onBrush, onDrag = _props7.onDrag, drag = _props7.drag;
      var _state5 = this.state, brushing = _state5.brushing, dragging = _state5.dragging;
      var _getLocs2 = getLocs(e3.nativeEvent), xLoc = _getLocs2.xLoc, yLoc = _getLocs2.yLoc;
      if (brushing) {
        var brushArea = this._getDrawArea(xLoc, yLoc);
        this.setState({ brushArea });
        if (onBrush2) {
          onBrush2(this._convertAreaToCoordinates(brushArea));
        }
      }
      if (drag && dragging) {
        var _brushArea = this._getDragArea(xLoc, yLoc);
        this.setState({ brushArea: _brushArea });
        if (onDrag) {
          onDrag(this._convertAreaToCoordinates(_brushArea));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _props8 = this.props, color2 = _props8.color, className = _props8.className, highlightHeight = _props8.highlightHeight, highlightWidth = _props8.highlightWidth, highlightX = _props8.highlightX, highlightY = _props8.highlightY, innerWidth = _props8.innerWidth, innerHeight = _props8.innerHeight, marginLeft = _props8.marginLeft, marginRight = _props8.marginRight, marginTop = _props8.marginTop, marginBottom = _props8.marginBottom, opacity = _props8.opacity;
      var _state$brushArea = this.state.brushArea, left = _state$brushArea.left, right = _state$brushArea.right, top = _state$brushArea.top, bottom = _state$brushArea.bottom;
      var leftPos = 0;
      if (highlightX) {
        var xScale = getAttributeScale(this.props, "x");
        leftPos = xScale(highlightX);
      }
      var topPos = 0;
      if (highlightY) {
        var yScale = getAttributeScale(this.props, "y");
        topPos = yScale(highlightY);
      }
      var plotWidth = marginLeft + marginRight + innerWidth;
      var plotHeight = marginTop + marginBottom + innerHeight;
      var touchWidth = highlightWidth || plotWidth;
      var touchHeight = highlightHeight || plotHeight;
      return React.createElement("g", {
        transform: "translate(" + leftPos + ", " + topPos + ")",
        className: className + " rv-highlight-container"
      }, React.createElement("rect", {
        className: "rv-mouse-target",
        fill: "black",
        opacity: "0",
        x: "0",
        y: "0",
        width: Math.max(touchWidth, 0),
        height: Math.max(touchHeight, 0),
        onMouseDown: function onMouseDown(e3) {
          return _this3.startBrushing(e3);
        },
        onMouseMove: function onMouseMove(e3) {
          return _this3.onBrush(e3);
        },
        onMouseUp: function onMouseUp(e3) {
          return _this3.stopBrushing(e3);
        },
        onMouseLeave: function onMouseLeave(e3) {
          return _this3.stopBrushing(e3);
        },
        onTouchEnd: function onTouchEnd(e3) {
          e3.preventDefault();
          _this3.stopBrushing(e3);
        },
        onTouchCancel: function onTouchCancel(e3) {
          e3.preventDefault();
          _this3.stopBrushing(e3);
        },
        onContextMenu: function onContextMenu(e3) {
          return e3.preventDefault();
        },
        onContextMenuCapture: function onContextMenuCapture(e3) {
          return e3.preventDefault();
        }
      }), React.createElement("rect", {
        className: "rv-highlight",
        pointerEvents: "none",
        opacity,
        fill: color2,
        x: left,
        y: top,
        width: Math.min(Math.max(0, right - left), touchWidth),
        height: Math.min(Math.max(0, bottom - top), touchHeight)
      }));
    }
  }]);
  return Highlight2;
}(AbstractSeries);
Highlight.displayName = "HighlightOverlay";
Highlight.defaultProps = {
  color: "rgb(77, 182, 172)",
  className: "",
  enableX: true,
  enableY: true,
  opacity: 0.3
};
Highlight.propTypes = _extends$G({}, AbstractSeries.propTypes, {
  enableX: PropTypes.bool,
  enableY: PropTypes.bool,
  highlightHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBrushStart: PropTypes.func,
  onDragStart: PropTypes.func,
  onBrush: PropTypes.func,
  onDrag: PropTypes.func,
  onBrushEnd: PropTypes.func,
  onDragEnd: PropTypes.func
});
var _extends$F = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$t = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$t(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$t(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$t(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ALIGN = {
  AUTO: "auto",
  LEFT: "left",
  RIGHT: "right",
  LEFT_EDGE: "leftEdge",
  RIGHT_EDGE: "rightEdge",
  BOTTOM: "bottom",
  TOP: "top",
  BOTTOM_EDGE: "bottomEdge",
  TOP_EDGE: "topEdge"
};
var ORIENTATION = {
  BOTTOM_LEFT: "bottomleft",
  BOTTOM_RIGHT: "bottomright",
  TOP_LEFT: "topleft",
  TOP_RIGHT: "topright"
};
function defaultFormat(value) {
  return Object.keys(value).map(function getProp(key) {
    return {
      title: key,
      value: transformValueToString(value[key])
    };
  });
}
var Hint = function(_PureComponent) {
  _inherits$t(Hint2, _PureComponent);
  function Hint2() {
    _classCallCheck$t(this, Hint2);
    return _possibleConstructorReturn$t(this, (Hint2.__proto__ || Object.getPrototypeOf(Hint2)).apply(this, arguments));
  }
  _createClass$t(Hint2, [{
    key: "_getAlign",
    value: function _getAlign(x2, y2) {
      var _props = this.props, innerWidth = _props.innerWidth, innerHeight = _props.innerHeight, orientation = _props.orientation, _props$align = _props.align, horizontal = _props$align.horizontal, vertical = _props$align.vertical;
      var align = orientation ? this._mapOrientationToAlign(orientation) : {
        horizontal,
        vertical
      };
      if (horizontal === ALIGN.AUTO) {
        align.horizontal = x2 > innerWidth / 2 ? ALIGN.LEFT : ALIGN.RIGHT;
      }
      if (vertical === ALIGN.AUTO) {
        align.vertical = y2 > innerHeight / 2 ? ALIGN.TOP : ALIGN.BOTTOM;
      }
      return align;
    }
  }, {
    key: "_getAlignClassNames",
    value: function _getAlignClassNames(align) {
      var orientation = this.props.orientation;
      var orientationClass = orientation ? "rv-hint--orientation-" + orientation : "";
      return orientationClass + " rv-hint--horizontalAlign-" + align.horizontal + "\n     rv-hint--verticalAlign-" + align.vertical;
    }
  }, {
    key: "_getAlignStyle",
    value: function _getAlignStyle(align, x2, y2) {
      return _extends$F({}, this._getXCSS(align.horizontal, x2), this._getYCSS(align.vertical, y2));
    }
  }, {
    key: "_getCSSBottom",
    value: function _getCSSBottom(y2) {
      if (y2 === void 0 || y2 === null) {
        return {
          bottom: 0
        };
      }
      var _props2 = this.props, innerHeight = _props2.innerHeight, marginBottom = _props2.marginBottom;
      return {
        bottom: marginBottom + innerHeight - y2
      };
    }
  }, {
    key: "_getCSSLeft",
    value: function _getCSSLeft(x2) {
      if (x2 === void 0 || x2 === null) {
        return {
          left: 0
        };
      }
      var marginLeft = this.props.marginLeft;
      return {
        left: marginLeft + x2
      };
    }
  }, {
    key: "_getCSSRight",
    value: function _getCSSRight(x2) {
      if (x2 === void 0 || x2 === null) {
        return {
          right: 0
        };
      }
      var _props3 = this.props, innerWidth = _props3.innerWidth, marginRight = _props3.marginRight;
      return {
        right: marginRight + innerWidth - x2
      };
    }
  }, {
    key: "_getCSSTop",
    value: function _getCSSTop(y2) {
      if (y2 === void 0 || y2 === null) {
        return {
          top: 0
        };
      }
      var marginTop = this.props.marginTop;
      return {
        top: marginTop + y2
      };
    }
  }, {
    key: "_getPositionInfo",
    value: function _getPositionInfo() {
      var _props4 = this.props, value = _props4.value, getAlignStyle = _props4.getAlignStyle;
      var x2 = getAttributeFunctor(this.props, "x")(value);
      var y2 = getAttributeFunctor(this.props, "y")(value);
      var align = this._getAlign(x2, y2);
      return {
        position: getAlignStyle ? getAlignStyle(align, x2, y2) : this._getAlignStyle(align, x2, y2),
        positionClassName: this._getAlignClassNames(align)
      };
    }
  }, {
    key: "_getXCSS",
    value: function _getXCSS(horizontal, x2) {
      switch (horizontal) {
        case ALIGN.LEFT_EDGE:
          return this._getCSSLeft(null);
        case ALIGN.RIGHT_EDGE:
          return this._getCSSRight(null);
        case ALIGN.LEFT:
          return this._getCSSRight(x2);
        case ALIGN.RIGHT:
        default:
          return this._getCSSLeft(x2);
      }
    }
  }, {
    key: "_getYCSS",
    value: function _getYCSS(verticalAlign, y2) {
      switch (verticalAlign) {
        case ALIGN.TOP_EDGE:
          return this._getCSSTop(null);
        case ALIGN.BOTTOM_EDGE:
          return this._getCSSBottom(null);
        case ALIGN.BOTTOM:
          return this._getCSSTop(y2);
        case ALIGN.TOP:
        default:
          return this._getCSSBottom(y2);
      }
    }
  }, {
    key: "_mapOrientationToAlign",
    value: function _mapOrientationToAlign(orientation) {
      switch (orientation) {
        case ORIENTATION.BOTTOM_LEFT:
          return {
            horizontal: ALIGN.LEFT,
            vertical: ALIGN.BOTTOM
          };
        case ORIENTATION.BOTTOM_RIGHT:
          return {
            horizontal: ALIGN.RIGHT,
            vertical: ALIGN.BOTTOM
          };
        case ORIENTATION.TOP_LEFT:
          return {
            horizontal: ALIGN.LEFT,
            vertical: ALIGN.TOP
          };
        case ORIENTATION.TOP_RIGHT:
          return {
            horizontal: ALIGN.RIGHT,
            vertical: ALIGN.TOP
          };
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props5 = this.props, value = _props5.value, format2 = _props5.format, children = _props5.children, style = _props5.style, className = _props5.className;
      var _getPositionInfo2 = this._getPositionInfo(), position = _getPositionInfo2.position, positionClassName = _getPositionInfo2.positionClassName;
      return /* @__PURE__ */ jsx("div", {
        className: "rv-hint " + positionClassName + " " + className,
        style: _extends$F({}, style, position, {
          position: "absolute"
        }),
        children: children ? children : /* @__PURE__ */ jsx("div", {
          className: "rv-hint__content",
          style: style.content,
          children: format2(value).map(function(formattedProp, i2) {
            return /* @__PURE__ */ jsxs("div", {
              style: style.row,
              children: [/* @__PURE__ */ jsx("span", {
                className: "rv-hint__title",
                style: style.title,
                children: formattedProp.title
              }), ": ", /* @__PURE__ */ jsx("span", {
                className: "rv-hint__value",
                style: style.value,
                children: formattedProp.value
              })]
            }, "rv-hint" + i2);
          })
        })
      });
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        format: defaultFormat,
        align: {
          horizontal: ALIGN.AUTO,
          vertical: ALIGN.AUTO
        },
        style: {}
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        marginTop: PropTypes.number,
        marginLeft: PropTypes.number,
        innerWidth: PropTypes.number,
        innerHeight: PropTypes.number,
        scales: PropTypes.object,
        value: PropTypes.object,
        format: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string,
        align: PropTypes.shape({
          horizontal: PropTypes.oneOf([ALIGN.AUTO, ALIGN.LEFT, ALIGN.RIGHT, ALIGN.LEFT_EDGE, ALIGN.RIGHT_EDGE]),
          vertical: PropTypes.oneOf([ALIGN.AUTO, ALIGN.BOTTOM, ALIGN.TOP, ALIGN.BOTTOM_EDGE, ALIGN.TOP_EDGE])
        }),
        getAlignStyle: PropTypes.func,
        orientation: PropTypes.oneOf([ORIENTATION.BOTTOM_LEFT, ORIENTATION.BOTTOM_RIGHT, ORIENTATION.TOP_LEFT, ORIENTATION.TOP_RIGHT])
      };
    }
  }]);
  return Hint2;
}(react.exports.PureComponent);
Hint.displayName = "Hint";
Hint.ORIENTATION = ORIENTATION;
Hint.ALIGN = ALIGN;
var _extends$E = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$s = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$s(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$s(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$s(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$8 = "rv-xy-plot__series rv-xy-plot__series--bar";
var BarSeries = function(_AbstractSeries) {
  _inherits$s(BarSeries2, _AbstractSeries);
  function BarSeries2() {
    _classCallCheck$s(this, BarSeries2);
    return _possibleConstructorReturn$s(this, (BarSeries2.__proto__ || Object.getPrototypeOf(BarSeries2)).apply(this, arguments));
  }
  _createClass$s(BarSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, data = _props.data, linePosAttr = _props.linePosAttr, lineSizeAttr = _props.lineSizeAttr, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style, valuePosAttr = _props.valuePosAttr, valueSizeAttr = _props.valueSizeAttr, barWidth = _props.barWidth;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$E({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(BarSeries2, _extends$E({}, this.props, { animation: null })));
      }
      var _getStackParams = getStackParams(this.props), sameTypeTotal = _getStackParams.sameTypeTotal, sameTypeIndex = _getStackParams.sameTypeIndex;
      var distance = this._getScaleDistance(linePosAttr);
      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      var valueFunctor = this._getAttributeFunctor(valuePosAttr);
      var value0Functor = this._getAttr0Functor(valuePosAttr);
      var fillFunctor = this._getAttributeFunctor("fill") || this._getAttributeFunctor("color");
      var strokeFunctor = this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color");
      var opacityFunctor = this._getAttributeFunctor("opacity");
      var halfSpace = distance / 2 * barWidth;
      return React.createElement("g", {
        className: predefinedClassName$8 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, data.map(function(d, i2) {
        var _attrs;
        var totalSpaceAvailable = halfSpace * 2;
        var totalSpaceCenter = lineFunctor(d);
        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace;
        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
        var spacePerBar = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels;
        var barStartingPoint = totalSpaceStartingPoint + spacePerBar * sameTypeIndex + sameTypeIndex;
        var attrs = (_attrs = {
          style: _extends$E({
            opacity: opacityFunctor && opacityFunctor(d),
            stroke: strokeFunctor && strokeFunctor(d),
            fill: fillFunctor && fillFunctor(d)
          }, style)
        }, _defineProperty$5(_attrs, linePosAttr, barStartingPoint), _defineProperty$5(_attrs, lineSizeAttr, spacePerBar), _defineProperty$5(_attrs, valuePosAttr, Math.min(value0Functor(d), valueFunctor(d))), _defineProperty$5(_attrs, valueSizeAttr, Math.abs(-value0Functor(d) + valueFunctor(d))), _defineProperty$5(_attrs, "onClick", function onClick(e3) {
          return _this2._valueClickHandler(d, e3);
        }), _defineProperty$5(_attrs, "onContextMenu", function onContextMenu(e3) {
          return _this2._valueRightClickHandler(d, e3);
        }), _defineProperty$5(_attrs, "onMouseOver", function onMouseOver(e3) {
          return _this2._valueMouseOverHandler(d, e3);
        }), _defineProperty$5(_attrs, "onMouseOut", function onMouseOut(e3) {
          return _this2._valueMouseOutHandler(d, e3);
        }), _defineProperty$5(_attrs, "key", i2), _attrs);
        return React.createElement("rect", attrs);
      }));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return _extends$E({}, AbstractSeries.propTypes, {
        linePosAttr: PropTypes.string,
        valuePosAttr: PropTypes.string,
        lineSizeAttr: PropTypes.string,
        valueSizeAttr: PropTypes.string,
        cluster: PropTypes.string,
        barWidth: PropTypes.number
      });
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        barWidth: 0.85
      };
    }
  }]);
  return BarSeries2;
}(AbstractSeries);
BarSeries.displayName = "BarSeries";
var _extends$D = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$r = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$r(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$r(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$r(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalBarSeries = function(_AbstractSeries) {
  _inherits$r(HorizontalBarSeries2, _AbstractSeries);
  function HorizontalBarSeries2() {
    _classCallCheck$r(this, HorizontalBarSeries2);
    return _possibleConstructorReturn$r(this, (HorizontalBarSeries2.__proto__ || Object.getPrototypeOf(HorizontalBarSeries2)).apply(this, arguments));
  }
  _createClass$r(HorizontalBarSeries2, [{
    key: "render",
    value: function render() {
      return React.createElement(BarSeries, _extends$D({}, this.props, {
        linePosAttr: "y",
        valuePosAttr: "x",
        lineSizeAttr: "height",
        valueSizeAttr: "width"
      }));
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === "y";
      var zeroBaseValue = attr === "x";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }]);
  return HorizontalBarSeries2;
}(AbstractSeries);
HorizontalBarSeries.displayName = "HorizontalBarSeries";
var _extends$C = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$q = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$q(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$q(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$q(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function getScaleDistance(props, attr) {
  var scaleObject = getScaleObjectFromProps(props, attr);
  return scaleObject ? scaleObject.distance : 0;
}
var BarSeriesCanvas = function(_AbstractSeries) {
  _inherits$q(BarSeriesCanvas2, _AbstractSeries);
  function BarSeriesCanvas2() {
    _classCallCheck$q(this, BarSeriesCanvas2);
    return _possibleConstructorReturn$q(this, (BarSeriesCanvas2.__proto__ || Object.getPrototypeOf(BarSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$q(BarSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var data = props.data, linePosAttr = props.linePosAttr, lineSizeAttr = props.lineSizeAttr, valuePosAttr = props.valuePosAttr, marginTop = props.marginTop, marginBottom = props.marginBottom;
      if (!data || data.length === 0) {
        return;
      }
      var distance = getScaleDistance(props, linePosAttr);
      var line2 = getAttributeFunctor(props, linePosAttr);
      var value = getAttributeFunctor(props, valuePosAttr);
      var value0 = getAttr0Functor(props, valuePosAttr);
      var fill = getAttributeFunctor(props, "fill") || getAttributeFunctor(props, "color");
      var stroke = getAttributeFunctor(props, "stroke") || getAttributeFunctor(props, "color");
      var opacity = getAttributeFunctor(props, "opacity");
      var halfSpace = distance / 2 * 0.85;
      var totalSpaceAvailable = halfSpace * 2;
      var _getStackParams = getStackParams(props), sameTypeTotal = _getStackParams.sameTypeTotal, sameTypeIndex = _getStackParams.sameTypeIndex;
      data.forEach(function(row) {
        var totalSpaceCenter = line2(row);
        var totalSpaceStartingPoint = totalSpaceCenter - halfSpace;
        var spaceTakenByInterBarsPixels = (sameTypeTotal - 1) / sameTypeTotal;
        var lineSize = totalSpaceAvailable / sameTypeTotal - spaceTakenByInterBarsPixels;
        var fillColor = rgb$1(fill(row));
        var strokeColor = rgb$1(stroke(row));
        var rowOpacity = opacity(row) || DEFAULT_OPACITY;
        var linePos = totalSpaceStartingPoint + lineSize * sameTypeIndex + sameTypeIndex;
        var valuePos = Math.min(value0(row), value(row));
        var x2 = valuePosAttr === "x" ? valuePos : linePos;
        var y2 = valuePosAttr === "y" ? valuePos : linePos;
        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === "height" ? lineSize : valueSize;
        var width = lineSizeAttr === "width" ? lineSize : valueSize;
        ctx.beginPath();
        ctx.rect(x2 + marginBottom, y2 + marginTop, width, height);
        ctx.fillStyle = "rgba(" + fillColor.r + ", " + fillColor.g + ", " + fillColor.b + ", " + rowOpacity + ")";
        ctx.fill();
        ctx.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + rowOpacity + ")";
        ctx.stroke();
      });
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return BarSeriesCanvas2;
}(AbstractSeries);
BarSeriesCanvas.displayName = "BarSeriesCanvas";
BarSeriesCanvas.defaultProps = _extends$C({}, AbstractSeries.defaultProps, {
  linePosAttr: PropTypes.string.isRequired,
  valuePosAttr: PropTypes.string.isRequired,
  lineSizeAttr: PropTypes.string.isRequired,
  valueSizeAttr: PropTypes.string.isRequired
});
BarSeriesCanvas.propTypes = _extends$C({}, AbstractSeries.propTypes);
var _extends$B = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$p = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$p(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$p(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$p(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalBarSeriesCanvas$1 = function(_AbstractSeries) {
  _inherits$p(HorizontalBarSeriesCanvas2, _AbstractSeries);
  function HorizontalBarSeriesCanvas2() {
    _classCallCheck$p(this, HorizontalBarSeriesCanvas2);
    return _possibleConstructorReturn$p(this, (HorizontalBarSeriesCanvas2.__proto__ || Object.getPrototypeOf(HorizontalBarSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$p(HorizontalBarSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === "y";
      var zeroBaseValue = attr === "x";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      BarSeriesCanvas.renderLayer(_extends$B({}, props, {
        linePosAttr: "y",
        valuePosAttr: "x",
        lineSizeAttr: "height",
        valueSizeAttr: "width"
      }), ctx);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return HorizontalBarSeriesCanvas2;
}(AbstractSeries);
HorizontalBarSeriesCanvas$1.displayName = "HorizontalBarSeriesCanvas";
HorizontalBarSeriesCanvas$1.propTypes = _extends$B({}, AbstractSeries.propTypes);
var _extends$A = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var HORIZONTAL = DIRECTION.HORIZONTAL;
var propTypes$7 = _extends$A({}, GridLines.propTypes, {
  direction: PropTypes.oneOf([HORIZONTAL])
});
var defaultProps$6 = {
  direction: HORIZONTAL,
  attr: "y"
};
function HorizontalGridLines(props) {
  return React.createElement(GridLines, props);
}
HorizontalGridLines.displayName = "HorizontalGridLines";
HorizontalGridLines.propTypes = propTypes$7;
HorizontalGridLines.defaultProps = defaultProps$6;
HorizontalGridLines.requiresSVG = true;
var _extends$z = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$o = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$o(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$o(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$o(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$7 = "rv-xy-plot__series rv-xy-plot__series--rect";
var RectSeries = function(_AbstractSeries) {
  _inherits$o(RectSeries2, _AbstractSeries);
  function RectSeries2() {
    _classCallCheck$o(this, RectSeries2);
    return _possibleConstructorReturn$o(this, (RectSeries2.__proto__ || Object.getPrototypeOf(RectSeries2)).apply(this, arguments));
  }
  _createClass$o(RectSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, data = _props.data, linePosAttr = _props.linePosAttr, lineSizeAttr = _props.lineSizeAttr, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style, valuePosAttr = _props.valuePosAttr, valueSizeAttr = _props.valueSizeAttr;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$z({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(RectSeries2, _extends$z({}, this.props, { animation: null })));
      }
      var lineFunctor = this._getAttributeFunctor(linePosAttr);
      var line0Functor = this._getAttr0Functor(linePosAttr);
      var valueFunctor = this._getAttributeFunctor(valuePosAttr);
      var value0Functor = this._getAttr0Functor(valuePosAttr);
      var fillFunctor = this._getAttributeFunctor("fill") || this._getAttributeFunctor("color");
      var strokeFunctor = this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color");
      var opacityFunctor = this._getAttributeFunctor("opacity");
      return React.createElement("g", {
        className: predefinedClassName$7 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, data.map(function(d, i2) {
        var _attrs;
        var attrs = (_attrs = {
          style: _extends$z({
            opacity: opacityFunctor && opacityFunctor(d),
            stroke: strokeFunctor && strokeFunctor(d),
            fill: fillFunctor && fillFunctor(d)
          }, style)
        }, _defineProperty$4(_attrs, linePosAttr, line0Functor(d)), _defineProperty$4(_attrs, lineSizeAttr, Math.abs(lineFunctor(d) - line0Functor(d))), _defineProperty$4(_attrs, valuePosAttr, Math.min(value0Functor(d), valueFunctor(d))), _defineProperty$4(_attrs, valueSizeAttr, Math.abs(-value0Functor(d) + valueFunctor(d))), _defineProperty$4(_attrs, "onClick", function onClick(e3) {
          return _this2._valueClickHandler(d, e3);
        }), _defineProperty$4(_attrs, "onContextMenu", function onContextMenu(e3) {
          return _this2._valueRightClickHandler(d, e3);
        }), _defineProperty$4(_attrs, "onMouseOver", function onMouseOver(e3) {
          return _this2._valueMouseOverHandler(d, e3);
        }), _defineProperty$4(_attrs, "onMouseOut", function onMouseOut(e3) {
          return _this2._valueMouseOutHandler(d, e3);
        }), _defineProperty$4(_attrs, "key", i2), _attrs);
        return React.createElement("rect", attrs);
      }));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return _extends$z({}, AbstractSeries.propTypes, {
        linePosAttr: PropTypes.string,
        valuePosAttr: PropTypes.string,
        lineSizeAttr: PropTypes.string,
        valueSizeAttr: PropTypes.string
      });
    }
  }]);
  return RectSeries2;
}(AbstractSeries);
RectSeries.displayName = "RectSeries";
var _extends$y = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$n = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$n(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$n(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$n(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalRectSeries = function(_AbstractSeries) {
  _inherits$n(HorizontalRectSeries2, _AbstractSeries);
  function HorizontalRectSeries2() {
    _classCallCheck$n(this, HorizontalRectSeries2);
    return _possibleConstructorReturn$n(this, (HorizontalRectSeries2.__proto__ || Object.getPrototypeOf(HorizontalRectSeries2)).apply(this, arguments));
  }
  _createClass$n(HorizontalRectSeries2, [{
    key: "render",
    value: function render() {
      return React.createElement(RectSeries, _extends$y({}, this.props, {
        linePosAttr: "y",
        valuePosAttr: "x",
        lineSizeAttr: "height",
        valueSizeAttr: "width"
      }));
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = false;
      var zeroBaseValue = attr === "x";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }]);
  return HorizontalRectSeries2;
}(AbstractSeries);
HorizontalRectSeries.displayName = "HorizontalRectSeries";
var _extends$x = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$m = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$m(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$m(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$m(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var RectSeriesCanvas = function(_AbstractSeries) {
  _inherits$m(RectSeriesCanvas2, _AbstractSeries);
  function RectSeriesCanvas2() {
    _classCallCheck$m(this, RectSeriesCanvas2);
    return _possibleConstructorReturn$m(this, (RectSeriesCanvas2.__proto__ || Object.getPrototypeOf(RectSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$m(RectSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var data = props.data, linePosAttr = props.linePosAttr, lineSizeAttr = props.lineSizeAttr, marginLeft = props.marginLeft, marginTop = props.marginTop, valuePosAttr = props.valuePosAttr;
      if (!data || data.length === 0) {
        return;
      }
      var line2 = getAttributeFunctor(props, linePosAttr);
      var line0 = getAttr0Functor(props, linePosAttr);
      var value = getAttributeFunctor(props, valuePosAttr);
      var value0 = getAttr0Functor(props, valuePosAttr);
      var fill = getAttributeFunctor(props, "fill") || getAttributeFunctor(props, "color");
      var stroke = getAttributeFunctor(props, "stroke") || getAttributeFunctor(props, "color");
      var opacity = getAttributeFunctor(props, "opacity");
      data.forEach(function(row) {
        var fillColor = rgb$1(fill(row));
        var strokeColor = rgb$1(stroke(row));
        var rowOpacity = opacity(row) || DEFAULT_OPACITY;
        var linePos = line0(row);
        var valuePos = Math.min(value0(row), value(row));
        var x2 = valuePosAttr === "x" ? valuePos : linePos;
        var y2 = valuePosAttr === "y" ? valuePos : linePos;
        var lineSize = Math.abs(line2(row) - line0(row));
        var valueSize = Math.abs(-value0(row) + value(row));
        var height = lineSizeAttr === "height" ? lineSize : valueSize;
        var width = lineSizeAttr === "width" ? lineSize : valueSize;
        ctx.beginPath();
        ctx.rect(x2 + marginLeft, y2 + marginTop, width, height);
        ctx.fillStyle = "rgba(" + fillColor.r + ", " + fillColor.g + ", " + fillColor.b + ", " + rowOpacity + ")";
        ctx.fill();
        ctx.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + rowOpacity + ")";
        ctx.stroke();
      });
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return RectSeriesCanvas2;
}(AbstractSeries);
RectSeriesCanvas.displayName = "RectSeriesCanvas";
RectSeriesCanvas.defaultProps = _extends$x({}, AbstractSeries.defaultProps, {
  linePosAttr: PropTypes.string.isRequired,
  valuePosAttr: PropTypes.string.isRequired,
  lineSizeAttr: PropTypes.string.isRequired,
  valueSizeAttr: PropTypes.string.isRequired
});
RectSeriesCanvas.propTypes = _extends$x({}, AbstractSeries.propTypes);
var _extends$w = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$l = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$l(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$l(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$l(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalRectSeriesCanvas$1 = function(_AbstractSeries) {
  _inherits$l(HorizontalRectSeriesCanvas2, _AbstractSeries);
  function HorizontalRectSeriesCanvas2() {
    _classCallCheck$l(this, HorizontalRectSeriesCanvas2);
    return _possibleConstructorReturn$l(this, (HorizontalRectSeriesCanvas2.__proto__ || Object.getPrototypeOf(HorizontalRectSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$l(HorizontalRectSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = false;
      var zeroBaseValue = attr === "x";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      RectSeriesCanvas.renderLayer(_extends$w({}, props, {
        linePosAttr: "y",
        valuePosAttr: "x",
        lineSizeAttr: "height",
        valueSizeAttr: "width"
      }), ctx);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return HorizontalRectSeriesCanvas2;
}(AbstractSeries);
HorizontalRectSeriesCanvas$1.displayName = "HorizontalRectSeriesCanvas";
HorizontalRectSeriesCanvas$1.propTypes = _extends$w({}, AbstractSeries.propTypes);
var _extends$v = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$k = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$k(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$k(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$k(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$6 = "rv-xy-plot__series rv-xy-plot__series--label";
var getTextAnchor = function getTextAnchor2(labelAnchorX, leftOfMiddle) {
  return labelAnchorX ? labelAnchorX : leftOfMiddle ? "start" : "end";
};
var getDominantBaseline = function getDominantBaseline2(labelAnchorY, aboveMiddle) {
  return labelAnchorY ? labelAnchorY : aboveMiddle ? "text-before-edge" : "text-after-edge";
};
var LabelSeries = function(_AbstractSeries) {
  _inherits$k(LabelSeries2, _AbstractSeries);
  function LabelSeries2() {
    _classCallCheck$k(this, LabelSeries2);
    return _possibleConstructorReturn$k(this, (LabelSeries2.__proto__ || Object.getPrototypeOf(LabelSeries2)).apply(this, arguments));
  }
  _createClass$k(LabelSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, allowOffsetToBeReversed = _props.allowOffsetToBeReversed, className = _props.className, data = _props.data, _data = _props._data, getLabel3 = _props.getLabel, marginLeft = _props.marginLeft, marginTop = _props.marginTop, rotation = _props.rotation, style = _props.style, xRange = _props.xRange, yRange = _props.yRange, labelAnchorX = _props.labelAnchorX, labelAnchorY = _props.labelAnchorY;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$v({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(LabelSeries2, _extends$v({}, this.props, { animation: null, _data: data })));
      }
      var xFunctor = this._getAttributeFunctor("x");
      var yFunctor = this._getAttributeFunctor("y");
      return React.createElement("g", {
        className: predefinedClassName$6 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")",
        style
      }, data.reduce(function(res, d, i2) {
        var markStyle = d.style, xOffset = d.xOffset, yOffset = d.yOffset;
        if (!getLabel3(d)) {
          return res;
        }
        var xVal = xFunctor(d);
        var yVal = yFunctor(d);
        var leftOfMiddle = xVal < (xRange[1] - xRange[0]) / 2;
        var aboveMiddle = yVal < Math.abs(yRange[1] - yRange[0]) / 2;
        var x2 = xVal + (allowOffsetToBeReversed && leftOfMiddle ? -1 : 1) * (xOffset || 0);
        var y2 = yVal + (allowOffsetToBeReversed && aboveMiddle ? -1 : 1) * (yOffset || 0);
        var hasRotationValueSet = d.rotation === 0 || d.rotation;
        var labelRotation = hasRotationValueSet ? d.rotation : rotation;
        var attrs = _extends$v({
          dominantBaseline: getDominantBaseline(labelAnchorY, aboveMiddle),
          className: "rv-xy-plot__series--label-text",
          key: i2,
          onClick: function onClick(e3) {
            return _this2._valueClickHandler(d, e3);
          },
          onContextMenu: function onContextMenu(e3) {
            return _this2._valueRightClickHandler(d, e3);
          },
          onMouseOver: function onMouseOver(e3) {
            return _this2._valueMouseOverHandler(d, e3);
          },
          onMouseOut: function onMouseOut(e3) {
            return _this2._valueMouseOutHandler(d, e3);
          },
          textAnchor: getTextAnchor(labelAnchorX, leftOfMiddle),
          x: x2,
          y: y2,
          transform: "rotate(" + labelRotation + "," + x2 + "," + y2 + ")"
        }, markStyle);
        var textContent = getLabel3(_data ? _data[i2] : d);
        return res.concat([React.createElement("text", attrs, textContent)]);
      }, []));
    }
  }]);
  return LabelSeries2;
}(AbstractSeries);
LabelSeries.propTypes = {
  animation: PropTypes.bool,
  allowOffsetToBeReversed: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    angle: PropTypes.number,
    radius: PropTypes.number,
    label: PropTypes.string,
    xOffset: PropTypes.number,
    yOffset: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  rotation: PropTypes.number,
  style: PropTypes.object,
  xRange: PropTypes.arrayOf(PropTypes.number),
  yRange: PropTypes.arrayOf(PropTypes.number),
  labelAnchorX: PropTypes.string,
  labelAnchorY: PropTypes.string
};
LabelSeries.defaultProps = _extends$v({}, AbstractSeries.defaultProps, {
  animation: false,
  rotation: 0,
  getLabel: function getLabel(d) {
    return d.label;
  }
});
LabelSeries.displayName = "LabelSeries";
var _extends$u = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$j = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$j(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$j(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$j(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$5 = "rv-xy-plot__series rv-xy-plot__series--line";
var STROKE_STYLES$1 = {
  dashed: "6, 2",
  solid: null
};
var LineSeries = function(_AbstractSeries) {
  _inherits$j(LineSeries2, _AbstractSeries);
  function LineSeries2() {
    _classCallCheck$j(this, LineSeries2);
    return _possibleConstructorReturn$j(this, (LineSeries2.__proto__ || Object.getPrototypeOf(LineSeries2)).apply(this, arguments));
  }
  _createClass$j(LineSeries2, [{
    key: "_renderLine",
    value: function _renderLine(data, x2, y2, curve, getNull4) {
      var line$1 = line();
      if (curve !== null) {
        if (typeof curve === "string" && d3Shape[curve]) {
          line$1 = line$1.curve(d3Shape[curve]);
        } else if (typeof curve === "function") {
          line$1 = line$1.curve(curve);
        }
      }
      line$1 = line$1.defined(getNull4);
      line$1 = line$1.x(x2).y(y2);
      return line$1(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props, animation = _props.animation, className = _props.className, data = _props.data;
      if (this.props.nullAccessor) {
        warning("nullAccessor has been renamed to getNull", true);
      }
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$u({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(LineSeries2, _extends$u({}, this.props, { animation: null })));
      }
      var _props2 = this.props, curve = _props2.curve, marginLeft = _props2.marginLeft, marginTop = _props2.marginTop, strokeDasharray = _props2.strokeDasharray, strokeStyle = _props2.strokeStyle, strokeWidth = _props2.strokeWidth, style = _props2.style;
      var x2 = this._getAttributeFunctor("x");
      var y2 = this._getAttributeFunctor("y");
      var stroke = this._getAttributeValue("stroke") || this._getAttributeValue("color");
      var newOpacity = this._getAttributeValue("opacity");
      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var getNull4 = this.props.nullAccessor || this.props.getNull;
      var d = this._renderLine(data, x2, y2, curve, getNull4);
      return React.createElement("path", {
        d,
        className: predefinedClassName$5 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")",
        onMouseOver: this._seriesMouseOverHandler,
        onMouseOut: this._seriesMouseOutHandler,
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        style: _extends$u({
          opacity,
          strokeDasharray: STROKE_STYLES$1[strokeStyle] || strokeDasharray,
          strokeWidth,
          stroke
        }, style)
      });
    }
  }]);
  return LineSeries2;
}(AbstractSeries);
LineSeries.displayName = "LineSeries";
LineSeries.propTypes = _extends$u({}, AbstractSeries.propTypes, {
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES$1)),
  curve: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getNull: PropTypes.func
});
LineSeries.defaultProps = _extends$u({}, AbstractSeries.defaultProps, {
  strokeStyle: "solid",
  style: {},
  opacity: 1,
  curve: null,
  className: "",
  getNull: function getNull2() {
    return true;
  }
});
var _extends$t = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$i = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$i(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$i(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$i(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$4 = "rv-xy-plot__series rv-xy-plot__series--mark";
var DEFAULT_STROKE_WIDTH$1 = 1;
var MarkSeries = function(_AbstractSeries) {
  _inherits$i(MarkSeries2, _AbstractSeries);
  function MarkSeries2() {
    _classCallCheck$i(this, MarkSeries2);
    return _possibleConstructorReturn$i(this, (MarkSeries2.__proto__ || Object.getPrototypeOf(MarkSeries2)).apply(this, arguments));
  }
  _createClass$i(MarkSeries2, [{
    key: "_renderCircle",
    value: function _renderCircle(d, i2, strokeWidth, style, scalingFunctions) {
      var _this2 = this;
      var fill = scalingFunctions.fill, opacity = scalingFunctions.opacity, size = scalingFunctions.size, stroke = scalingFunctions.stroke, x2 = scalingFunctions.x, y2 = scalingFunctions.y;
      var attrs = {
        r: size ? size(d) : DEFAULT_SIZE,
        cx: x2(d),
        cy: y2(d),
        style: _extends$t({
          opacity: opacity ? opacity(d) : DEFAULT_OPACITY,
          stroke: stroke && stroke(d),
          fill: fill && fill(d),
          strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH$1
        }, style),
        key: i2,
        onClick: function onClick(e3) {
          return _this2._valueClickHandler(d, e3);
        },
        onContextMenu: function onContextMenu(e3) {
          return _this2._valueRightClickHandler(d, e3);
        },
        onMouseOver: function onMouseOver(e3) {
          return _this2._valueMouseOverHandler(d, e3);
        },
        onMouseOut: function onMouseOut(e3) {
          return _this2._valueMouseOutHandler(d, e3);
        }
      };
      return React.createElement("circle", attrs);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _props = this.props, animation = _props.animation, className = _props.className, data = _props.data, marginLeft = _props.marginLeft, marginTop = _props.marginTop, strokeWidth = _props.strokeWidth, style = _props.style;
      if (this.props.nullAccessor) {
        warning("nullAccessor has been renamed to getNull", true);
      }
      var getNull4 = this.props.nullAccessor || this.props.getNull;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$t({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(MarkSeries2, _extends$t({}, this.props, { animation: null })));
      }
      var scalingFunctions = {
        fill: this._getAttributeFunctor("fill") || this._getAttributeFunctor("color"),
        opacity: this._getAttributeFunctor("opacity"),
        size: this._getAttributeFunctor("size"),
        stroke: this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color"),
        x: this._getAttributeFunctor("x"),
        y: this._getAttributeFunctor("y")
      };
      return React.createElement("g", {
        className: predefinedClassName$4 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, data.map(function(d, i2) {
        return getNull4(d) && _this3._renderCircle(d, i2, strokeWidth, style, scalingFunctions);
      }));
    }
  }]);
  return MarkSeries2;
}(AbstractSeries);
MarkSeries.displayName = "MarkSeries";
MarkSeries.propTypes = _extends$t({}, AbstractSeries.propTypes, {
  getNull: PropTypes.func,
  strokeWidth: PropTypes.number
});
MarkSeries.defaultProps = {
  getNull: function getNull3() {
    return true;
  }
};
var _createClass$h = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$s = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$h(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$h(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$h(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var propTypes$6 = _extends$s({}, LineSeries.propTypes, {
  lineStyle: PropTypes.object,
  markStyle: PropTypes.object
});
var LineMarkSeries = function(_AbstractSeries) {
  _inherits$h(LineMarkSeries2, _AbstractSeries);
  function LineMarkSeries2() {
    _classCallCheck$h(this, LineMarkSeries2);
    return _possibleConstructorReturn$h(this, (LineMarkSeries2.__proto__ || Object.getPrototypeOf(LineMarkSeries2)).apply(this, arguments));
  }
  _createClass$h(LineMarkSeries2, [{
    key: "render",
    value: function render() {
      var _props = this.props, lineStyle = _props.lineStyle, markStyle = _props.markStyle, style = _props.style;
      return React.createElement("g", { className: "rv-xy-plot__series rv-xy-plot__series--linemark" }, React.createElement(LineSeries, _extends$s({}, this.props, { style: _extends$s({}, style, lineStyle) })), React.createElement(MarkSeries, _extends$s({}, this.props, { style: _extends$s({}, style, markStyle) })));
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return _extends$s({}, LineSeries.defaultProps, {
        lineStyle: {},
        markStyle: {}
      });
    }
  }]);
  return LineMarkSeries2;
}(AbstractSeries);
LineMarkSeries.displayName = "LineMarkSeries";
LineMarkSeries.propTypes = propTypes$6;
var _extends$r = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$g = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$g(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$g(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$g(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var MarkSeriesCanvas = function(_AbstractSeries) {
  _inherits$g(MarkSeriesCanvas2, _AbstractSeries);
  function MarkSeriesCanvas2() {
    _classCallCheck$g(this, MarkSeriesCanvas2);
    return _possibleConstructorReturn$g(this, (MarkSeriesCanvas2.__proto__ || Object.getPrototypeOf(MarkSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$g(MarkSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var data = props.data, marginLeft = props.marginLeft, marginTop = props.marginTop;
      var x2 = getAttributeFunctor(props, "x");
      var y2 = getAttributeFunctor(props, "y");
      var size = getAttributeFunctor(props, "size") || function(p2) {
        return DEFAULT_SIZE;
      };
      var fill = getAttributeFunctor(props, "fill") || getAttributeFunctor(props, "color");
      var stroke = getAttributeFunctor(props, "stroke") || getAttributeFunctor(props, "color");
      var opacity = getAttributeFunctor(props, "opacity");
      data.forEach(function(row) {
        var fillColor = rgb$1(fill(row));
        var strokeColor = rgb$1(stroke(row));
        var rowOpacity = opacity(row) || DEFAULT_OPACITY;
        ctx.beginPath();
        ctx.arc(x2(row) + marginLeft, y2(row) + marginTop, size(row), 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + fillColor.r + ", " + fillColor.g + ", " + fillColor.b + ", " + rowOpacity + ")";
        ctx.fill();
        ctx.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + rowOpacity + ")";
        ctx.stroke();
      });
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return MarkSeriesCanvas2;
}(AbstractSeries);
MarkSeriesCanvas.displayName = "MarkSeriesCanvas";
MarkSeriesCanvas.propTypes = _extends$r({}, AbstractSeries.propTypes);
var _extends$q = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$f = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$f(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$f(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$f(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var LineSeriesCanvas = function(_AbstractSeries) {
  _inherits$f(LineSeriesCanvas2, _AbstractSeries);
  function LineSeriesCanvas2() {
    _classCallCheck$f(this, LineSeriesCanvas2);
    return _possibleConstructorReturn$f(this, (LineSeriesCanvas2.__proto__ || Object.getPrototypeOf(LineSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$f(LineSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null);
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      var curve = props.curve, data = props.data, marginLeft = props.marginLeft, marginTop = props.marginTop, strokeWidth = props.strokeWidth, strokeDasharray = props.strokeDasharray;
      if (!data || data.length === 0) {
        return;
      }
      var x2 = getAttributeFunctor(props, "x");
      var y2 = getAttributeFunctor(props, "y");
      var stroke = getAttributeValue(props, "stroke") || getAttributeValue(props, "color");
      var strokeColor = rgb$1(stroke);
      var newOpacity = getAttributeValue(props, "opacity");
      var opacity = Number.isFinite(newOpacity) ? newOpacity : DEFAULT_OPACITY;
      var line$1 = line().x(function(row) {
        return x2(row) + marginLeft;
      }).y(function(row) {
        return y2(row) + marginTop;
      });
      if (typeof curve === "string" && d3Shape[curve]) {
        line$1 = line$1.curve(d3Shape[curve]);
      } else if (typeof curve === "function") {
        line$1 = line$1.curve(curve);
      }
      ctx.beginPath();
      ctx.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + opacity + ")";
      ctx.lineWidth = strokeWidth;
      if (strokeDasharray) {
        ctx.setLineDash(strokeDasharray);
      }
      line$1.context(ctx)(data);
      ctx.stroke();
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return LineSeriesCanvas2;
}(AbstractSeries);
LineSeriesCanvas.displayName = "LineSeriesCanvas";
LineSeriesCanvas.defaultProps = _extends$q({}, AbstractSeries.defaultProps, {
  strokeWidth: 2
});
LineSeriesCanvas.propTypes = _extends$q({}, AbstractSeries.propTypes, {
  strokeWidth: PropTypes.number
});
var _extends$p = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$e = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$e(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$e(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$e(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var LineMarkSeriesCanvas = function(_AbstractSeries) {
  _inherits$e(LineMarkSeriesCanvas2, _AbstractSeries);
  function LineMarkSeriesCanvas2() {
    _classCallCheck$e(this, LineMarkSeriesCanvas2);
    return _possibleConstructorReturn$e(this, (LineMarkSeriesCanvas2.__proto__ || Object.getPrototypeOf(LineMarkSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$e(LineMarkSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      LineSeriesCanvas.renderLayer(props, ctx);
      MarkSeriesCanvas.renderLayer(props, ctx);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return LineMarkSeriesCanvas2;
}(AbstractSeries);
LineMarkSeriesCanvas.displayName = "LineMarkSeriesCanvas";
LineMarkSeriesCanvas.propTypes = _extends$p({}, AbstractSeries.propTypes);
var _extends$o = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$d = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$d(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$d(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$d(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$3 = "rv-xy-plot__series rv-xy-plot__series--polygon";
var DEFAULT_COLOR = "#12939A";
var generatePath = function generatePath2(data, xFunctor, yFunctor) {
  return data.reduce(function(res, row, i2) {
    return res + " " + (i2 ? "L" : "M") + xFunctor(row) + " " + yFunctor(row);
  }, "") + " Z";
};
var PolygonSeries = function(_AbstractSeries) {
  _inherits$d(PolygonSeries2, _AbstractSeries);
  function PolygonSeries2() {
    _classCallCheck$d(this, PolygonSeries2);
    return _possibleConstructorReturn$d(this, (PolygonSeries2.__proto__ || Object.getPrototypeOf(PolygonSeries2)).apply(this, arguments));
  }
  _createClass$d(PolygonSeries2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, animation = _props.animation, color2 = _props.color, className = _props.className, data = _props.data, marginLeft = _props.marginLeft, marginTop = _props.marginTop, style = _props.style;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$o({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(PolygonSeries2, _extends$o({}, this.props, { animation: null })));
      }
      var xFunctor = this._getAttributeFunctor("x");
      var yFunctor = this._getAttributeFunctor("y");
      return React.createElement("path", {
        className: predefinedClassName$3 + " " + className,
        onMouseOver: function onMouseOver(e3) {
          return _this2._seriesMouseOverHandler(data, e3);
        },
        onMouseOut: function onMouseOut(e3) {
          return _this2._seriesMouseOutHandler(data, e3);
        },
        onClick: this._seriesClickHandler,
        onContextMenu: this._seriesRightClickHandler,
        fill: color2 || DEFAULT_COLOR,
        style,
        d: generatePath(data, xFunctor, yFunctor),
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      });
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return _extends$o({}, AbstractSeries.propTypes);
    }
  }]);
  return PolygonSeries2;
}(AbstractSeries);
PolygonSeries.displayName = "PolygonSeries";
var _extends$n = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$c = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$c(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$c(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$c(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var VerticalBarSeries = function(_AbstractSeries) {
  _inherits$c(VerticalBarSeries2, _AbstractSeries);
  function VerticalBarSeries2() {
    _classCallCheck$c(this, VerticalBarSeries2);
    return _possibleConstructorReturn$c(this, (VerticalBarSeries2.__proto__ || Object.getPrototypeOf(VerticalBarSeries2)).apply(this, arguments));
  }
  _createClass$c(VerticalBarSeries2, [{
    key: "render",
    value: function render() {
      return React.createElement(BarSeries, _extends$n({}, this.props, {
        linePosAttr: "x",
        valuePosAttr: "y",
        lineSizeAttr: "width",
        valueSizeAttr: "height"
      }));
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === "x";
      var zeroBaseValue = attr === "y";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }]);
  return VerticalBarSeries2;
}(AbstractSeries);
VerticalBarSeries.displayName = "VerticalBarSeries";
var _extends$m = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$b = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$b(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$b(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$b(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalBarSeriesCanvas = function(_AbstractSeries) {
  _inherits$b(HorizontalBarSeriesCanvas2, _AbstractSeries);
  function HorizontalBarSeriesCanvas2() {
    _classCallCheck$b(this, HorizontalBarSeriesCanvas2);
    return _possibleConstructorReturn$b(this, (HorizontalBarSeriesCanvas2.__proto__ || Object.getPrototypeOf(HorizontalBarSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$b(HorizontalBarSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = attr === "x";
      var zeroBaseValue = attr === "y";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      BarSeriesCanvas.renderLayer(_extends$m({}, props, {
        linePosAttr: "x",
        valuePosAttr: "y",
        lineSizeAttr: "width",
        valueSizeAttr: "height"
      }), ctx);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return HorizontalBarSeriesCanvas2;
}(AbstractSeries);
HorizontalBarSeriesCanvas.displayName = "HorizontalBarSeriesCanvas";
HorizontalBarSeriesCanvas.propTypes = _extends$m({}, AbstractSeries.propTypes);
var _extends$l = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var VERTICAL = DIRECTION.VERTICAL;
_extends$l({}, GridLines.propTypes, {
  direction: PropTypes.oneOf([VERTICAL])
});
var _extends$k = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$a = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$a(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$a(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$a(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var VerticalRectSeries = function(_AbstractSeries) {
  _inherits$a(VerticalRectSeries2, _AbstractSeries);
  function VerticalRectSeries2() {
    _classCallCheck$a(this, VerticalRectSeries2);
    return _possibleConstructorReturn$a(this, (VerticalRectSeries2.__proto__ || Object.getPrototypeOf(VerticalRectSeries2)).apply(this, arguments));
  }
  _createClass$a(VerticalRectSeries2, [{
    key: "render",
    value: function render() {
      return React.createElement(RectSeries, _extends$k({}, this.props, {
        linePosAttr: "x",
        valuePosAttr: "y",
        lineSizeAttr: "width",
        valueSizeAttr: "height"
      }));
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = false;
      var zeroBaseValue = attr === "y";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }]);
  return VerticalRectSeries2;
}(AbstractSeries);
VerticalRectSeries.displayName = "VerticalRectSeries";
var _extends$j = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$9 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$9(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$9(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var HorizontalRectSeriesCanvas = function(_AbstractSeries) {
  _inherits$9(HorizontalRectSeriesCanvas2, _AbstractSeries);
  function HorizontalRectSeriesCanvas2() {
    _classCallCheck$9(this, HorizontalRectSeriesCanvas2);
    return _possibleConstructorReturn$9(this, (HorizontalRectSeriesCanvas2.__proto__ || Object.getPrototypeOf(HorizontalRectSeriesCanvas2)).apply(this, arguments));
  }
  _createClass$9(HorizontalRectSeriesCanvas2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getParentConfig",
    value: function getParentConfig(attr) {
      var isDomainAdjustmentNeeded = false;
      var zeroBaseValue = attr === "y";
      return {
        isDomainAdjustmentNeeded,
        zeroBaseValue
      };
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(props, ctx) {
      RectSeriesCanvas.renderLayer(_extends$j({}, props, {
        linePosAttr: "x",
        valuePosAttr: "y",
        lineSizeAttr: "width",
        valueSizeAttr: "height"
      }), ctx);
    }
  }, {
    key: "requiresSVG",
    get: function get() {
      return false;
    }
  }, {
    key: "isCanvas",
    get: function get() {
      return true;
    }
  }]);
  return HorizontalRectSeriesCanvas2;
}(AbstractSeries);
HorizontalRectSeriesCanvas.displayName = "HorizontalRectSeriesCanvas";
HorizontalRectSeriesCanvas.propTypes = _extends$j({}, AbstractSeries.propTypes);
({
  className: PropTypes.string,
  extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
});
var _createClass$8 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$i = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$8(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$8(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName$2 = "rv-xy-plot__series rv-xy-plot__series--whisker";
var DEFAULT_STROKE_WIDTH = 1;
var DEFAULT_CROSS_BAR_WIDTH = 6;
var renderWhiskerMark = function renderWhiskerMark2(whiskerMarkProps) {
  return function(d, i2) {
    var crossBarWidth = whiskerMarkProps.crossBarWidth, opacityFunctor = whiskerMarkProps.opacityFunctor, sizeFunctor = whiskerMarkProps.sizeFunctor, strokeFunctor = whiskerMarkProps.strokeFunctor, strokeWidth = whiskerMarkProps.strokeWidth, style = whiskerMarkProps.style, valueClickHandler = whiskerMarkProps.valueClickHandler, valueMouseOutHandler = whiskerMarkProps.valueMouseOutHandler, valueMouseOverHandler = whiskerMarkProps.valueMouseOverHandler, valueRightClickHandler = whiskerMarkProps.valueRightClickHandler, xFunctor = whiskerMarkProps.xFunctor, yFunctor = whiskerMarkProps.yFunctor;
    var r2 = sizeFunctor ? sizeFunctor(d) : 0;
    var cx = xFunctor(d);
    var cy = yFunctor(d);
    var positiveXVariance = xFunctor({ x: d.x + d.xVariance / 2 });
    var negativeXVariance = xFunctor({ x: d.x - d.xVariance / 2 });
    var positiveYVariance = yFunctor({ y: d.y + d.yVariance / 2 });
    var negativeYVariance = yFunctor({ y: d.y - d.yVariance / 2 });
    var hasXWhiskers = positiveXVariance && cx + r2 < positiveXVariance;
    var hasYWhiskers = positiveYVariance && cy - r2 > positiveYVariance;
    if (!hasXWhiskers && !hasYWhiskers) {
      return null;
    }
    var styleAttr = _extends$i({
      opacity: opacityFunctor ? opacityFunctor(d) : DEFAULT_OPACITY,
      stroke: strokeFunctor && strokeFunctor(d),
      strokeWidth: strokeWidth || DEFAULT_STROKE_WIDTH
    }, style);
    var crossBarExtension = crossBarWidth / 2;
    var rightLineAttrs = {
      x1: cx + r2,
      y1: cy,
      x2: positiveXVariance,
      y2: cy,
      style: styleAttr
    };
    var leftLineAttrs = {
      x1: cx - r2,
      y1: cy,
      x2: negativeXVariance,
      y2: cy,
      style: styleAttr
    };
    var rightCrossBarAttrs = {
      x1: positiveXVariance,
      y1: cy - crossBarExtension,
      x2: positiveXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };
    var leftCrossBarAttrs = {
      x1: negativeXVariance,
      y1: cy - crossBarExtension,
      x2: negativeXVariance,
      y2: cy + crossBarExtension,
      style: styleAttr
    };
    var upperLineAttrs = {
      x1: cx,
      y1: cy - r2,
      x2: cx,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerLineAttrs = {
      x1: cx,
      y1: cy + r2,
      x2: cx,
      y2: negativeYVariance,
      style: styleAttr
    };
    var upperCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: positiveYVariance,
      x2: cx + crossBarExtension,
      y2: positiveYVariance,
      style: styleAttr
    };
    var lowerCrossBarAttrs = {
      x1: cx - crossBarExtension,
      y1: negativeYVariance,
      x2: cx + crossBarExtension,
      y2: negativeYVariance,
      style: styleAttr
    };
    return React.createElement("g", {
      className: "mark-whiskers",
      key: i2,
      onClick: function onClick(e3) {
        return valueClickHandler(d, e3);
      },
      onContextMenu: function onContextMenu(e3) {
        return valueRightClickHandler(d, e3);
      },
      onMouseOver: function onMouseOver(e3) {
        return valueMouseOverHandler(d, e3);
      },
      onMouseOut: function onMouseOut(e3) {
        return valueMouseOutHandler(d, e3);
      }
    }, hasXWhiskers ? React.createElement("g", { className: "x-whiskers" }, React.createElement("line", rightLineAttrs), React.createElement("line", leftLineAttrs), React.createElement("line", rightCrossBarAttrs), React.createElement("line", leftCrossBarAttrs)) : null, hasYWhiskers ? React.createElement("g", { className: "y-whiskers" }, React.createElement("line", upperLineAttrs), React.createElement("line", lowerLineAttrs), React.createElement("line", upperCrossBarAttrs), React.createElement("line", lowerCrossBarAttrs)) : null);
  };
};
var WhiskerSeries = function(_AbstractSeries) {
  _inherits$8(WhiskerSeries2, _AbstractSeries);
  function WhiskerSeries2() {
    _classCallCheck$8(this, WhiskerSeries2);
    return _possibleConstructorReturn$8(this, (WhiskerSeries2.__proto__ || Object.getPrototypeOf(WhiskerSeries2)).apply(this, arguments));
  }
  _createClass$8(WhiskerSeries2, [{
    key: "render",
    value: function render() {
      var _props = this.props, animation = _props.animation, className = _props.className, crossBarWidth = _props.crossBarWidth, data = _props.data, marginLeft = _props.marginLeft, marginTop = _props.marginTop, strokeWidth = _props.strokeWidth, style = _props.style;
      if (!data) {
        return null;
      }
      if (animation) {
        return React.createElement(Animation, _extends$i({}, this.props, { animatedProps: ANIMATED_SERIES_PROPS }), React.createElement(WhiskerSeries2, _extends$i({}, this.props, { animation: null })));
      }
      var whiskerMarkProps = {
        crossBarWidth,
        opacityFunctor: this._getAttributeFunctor("opacity"),
        sizeFunctor: this._getAttributeFunctor("size"),
        strokeFunctor: this._getAttributeFunctor("stroke") || this._getAttributeFunctor("color"),
        strokeWidth,
        style,
        xFunctor: this._getAttributeFunctor("x"),
        yFunctor: this._getAttributeFunctor("y"),
        valueClickHandler: this._valueClickHandler,
        valueRightClickHandler: this._valueRightClickHandler,
        valueMouseOverHandler: this._valueMouseOverHandler,
        valueMouseOutHandler: this._valueMouseOutHandler
      };
      return React.createElement("g", {
        className: predefinedClassName$2 + " " + className,
        transform: "translate(" + marginLeft + "," + marginTop + ")"
      }, data.map(renderWhiskerMark(whiskerMarkProps)));
    }
  }]);
  return WhiskerSeries2;
}(AbstractSeries);
WhiskerSeries.displayName = "WhiskerSeries";
WhiskerSeries.propTypes = _extends$i({}, AbstractSeries.propTypes, {
  strokeWidth: PropTypes.number
});
WhiskerSeries.defaultProps = _extends$i({}, AbstractSeries.defaultProps, {
  crossBarWidth: DEFAULT_CROSS_BAR_WIDTH,
  size: 0,
  strokeWidth: DEFAULT_STROKE_WIDTH
});
var toStr$4 = Object.prototype.toString;
var isArguments$2 = function isArguments2(value) {
  var str = toStr$4.call(value);
  var isArgs2 = str === "[object Arguments]";
  if (!isArgs2) {
    isArgs2 = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr$4.call(value.callee) === "[object Function]";
  }
  return isArgs2;
};
var keysShim$1;
if (!Object.keys) {
  var has$1 = Object.prototype.hasOwnProperty;
  var toStr$3 = Object.prototype.toString;
  var isArgs$1 = isArguments$2;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
  var hasProtoEnumBug = isEnumerable.call(function() {
  }, "prototype");
  var dontEnums = [
    "toString",
    "toLocaleString",
    "valueOf",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "constructor"
  ];
  var equalsConstructorPrototype = function(o) {
    var ctor = o.constructor;
    return ctor && ctor.prototype === o;
  };
  var excludedKeys = {
    $applicationCache: true,
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $onmozfullscreenchange: true,
    $onmozfullscreenerror: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true
  };
  var hasAutomationEqualityBug = function() {
    if (typeof window === "undefined") {
      return false;
    }
    for (var k2 in window) {
      try {
        if (!excludedKeys["$" + k2] && has$1.call(window, k2) && window[k2] !== null && typeof window[k2] === "object") {
          try {
            equalsConstructorPrototype(window[k2]);
          } catch (e3) {
            return true;
          }
        }
      } catch (e3) {
        return true;
      }
    }
    return false;
  }();
  var equalsConstructorPrototypeIfNotBuggy = function(o) {
    if (typeof window === "undefined" || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(o);
    }
    try {
      return equalsConstructorPrototype(o);
    } catch (e3) {
      return false;
    }
  };
  keysShim$1 = function keys3(object2) {
    var isObject = object2 !== null && typeof object2 === "object";
    var isFunction2 = toStr$3.call(object2) === "[object Function]";
    var isArguments5 = isArgs$1(object2);
    var isString = isObject && toStr$3.call(object2) === "[object String]";
    var theKeys = [];
    if (!isObject && !isFunction2 && !isArguments5) {
      throw new TypeError("Object.keys called on a non-object");
    }
    var skipProto = hasProtoEnumBug && isFunction2;
    if (isString && object2.length > 0 && !has$1.call(object2, 0)) {
      for (var i2 = 0; i2 < object2.length; ++i2) {
        theKeys.push(String(i2));
      }
    }
    if (isArguments5 && object2.length > 0) {
      for (var j = 0; j < object2.length; ++j) {
        theKeys.push(String(j));
      }
    } else {
      for (var name in object2) {
        if (!(skipProto && name === "prototype") && has$1.call(object2, name)) {
          theKeys.push(String(name));
        }
      }
    }
    if (hasDontEnumBug) {
      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object2);
      for (var k2 = 0; k2 < dontEnums.length; ++k2) {
        if (!(skipConstructor && dontEnums[k2] === "constructor") && has$1.call(object2, dontEnums[k2])) {
          theKeys.push(dontEnums[k2]);
        }
      }
    }
    return theKeys;
  };
}
var implementation$8 = keysShim$1;
var slice$2 = Array.prototype.slice;
var isArgs = isArguments$2;
var origKeys = Object.keys;
var keysShim = origKeys ? function keys2(o) {
  return origKeys(o);
} : implementation$8;
var originalKeys = Object.keys;
keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function() {
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);
    if (!keysWorksWithArguments) {
      Object.keys = function keys3(object2) {
        if (isArgs(object2)) {
          return originalKeys(slice$2.call(object2));
        }
        return originalKeys(object2);
      };
    }
  } else {
    Object.keys = keysShim;
  }
  return Object.keys || keysShim;
};
var objectKeys$1 = keysShim;
var shams$1 = function hasSymbols2() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var hasSymbols$3 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$3() && !!Symbol.toStringTag;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$2 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice$1 = Array.prototype.slice;
var toStr$2 = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$7 = function bind2(that) {
  var target = this;
  if (typeof target !== "function" || toStr$2.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice$1.call(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(this, args.concat(slice$1.call(arguments)));
      if (Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, args.concat(slice$1.call(arguments)));
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i2 = 0; i2 < boundLength; i2++) {
    boundArgs.push("$" + i2);
  }
  bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation$6 = implementation$7;
var functionBind = Function.prototype.bind || implementation$6;
var bind$1 = functionBind;
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e3) {
  }
};
var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
  try {
    $gOPD$1({}, "");
  } catch (e3) {
    $gOPD$1 = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError();
};
var ThrowTypeError = $gOPD$1 ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD$1(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$1 = hasSymbols$2();
var getProto$1 = Object.getPrototypeOf || function(x2) {
  return x2.__proto__;
};
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto$1(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols$1 ? getProto$1(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols$1 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen) {
      value = getProto$1(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind = functionBind;
var hasOwn = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec$1 = bind.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string2) {
  var first = $strSlice(string2, 0, 1);
  var last2 = $strSlice(string2, -1);
  if (first === "%" && last2 !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last2 === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string2, rePropName, function(match, number2, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number2 || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic2(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }
  if ($exec$1(/^%?[^%]*%?$/g, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
    var part = parts[i2];
    var first = $strSlice(part, 0, 1);
    var last2 = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last2 === '"' || last2 === "'" || last2 === "`")) && first !== last2) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD$1 && i2 + 1 >= parts.length) {
        var desc = $gOPD$1(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$3 = { exports: {} };
(function(module) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty2 = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty2) {
    try {
      $defineProperty2({}, "a", { value: 1 });
    } catch (e3) {
      $defineProperty2 = null;
    }
  }
  module.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind3, $call, arguments);
    if ($gOPD2 && $defineProperty2) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty2(func, "length", { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) });
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty2) {
    $defineProperty2(module.exports, "apply", { value: applyBind });
  } else {
    module.exports.apply = applyBind;
  }
})(callBind$3);
var GetIntrinsic$1 = getIntrinsic;
var callBind$2 = callBind$3.exports;
var $indexOf = callBind$2(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind$2(intrinsic);
  }
  return intrinsic;
};
var hasToStringTag$2 = shams();
var callBound$1 = callBound$2;
var $toString$1 = callBound$1("Object.prototype.toString");
var isStandardArguments = function isArguments3(value) {
  if (hasToStringTag$2 && value && typeof value === "object" && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$1(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments4(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$1(value) !== "[object Array]" && $toString$1(value.callee) === "[object Function]";
};
var supportsStandardArguments = function() {
  return isStandardArguments(arguments);
}();
isStandardArguments.isLegacyArguments = isLegacyArguments;
var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
var GetIntrinsic = getIntrinsic;
var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
var hasPropertyDescriptors$1 = function hasPropertyDescriptors2() {
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
      return true;
    } catch (e3) {
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  if (!hasPropertyDescriptors$1()) {
    return null;
  }
  try {
    return $defineProperty([], "length", { value: 1 }).length !== 1;
  } catch (e3) {
    return true;
  }
};
var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;
var keys = objectKeys$1;
var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
var toStr$1 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;
var isFunction = function(fn) {
  return typeof fn === "function" && toStr$1.call(fn) === "[object Function]";
};
var hasPropertyDescriptors = hasPropertyDescriptors_1();
var supportsDescriptors$2 = origDefineProperty && hasPropertyDescriptors;
var defineProperty$1 = function(object2, name, value, predicate) {
  if (name in object2 && (!isFunction(predicate) || !predicate())) {
    return;
  }
  if (supportsDescriptors$2) {
    origDefineProperty(object2, name, {
      configurable: true,
      enumerable: false,
      value,
      writable: true
    });
  } else {
    object2[name] = value;
  }
};
var defineProperties = function(object2, map2) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys(map2);
  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map2));
  }
  for (var i2 = 0; i2 < props.length; i2 += 1) {
    defineProperty$1(object2, props[i2], map2[props[i2]], predicates[props[i2]]);
  }
};
defineProperties.supportsDescriptors = !!supportsDescriptors$2;
var defineProperties_1 = defineProperties;
var numberIsNaN = function(value) {
  return value !== value;
};
var implementation$5 = function is2(a2, b) {
  if (a2 === 0 && b === 0) {
    return 1 / a2 === 1 / b;
  }
  if (a2 === b) {
    return true;
  }
  if (numberIsNaN(a2) && numberIsNaN(b)) {
    return true;
  }
  return false;
};
var implementation$4 = implementation$5;
var polyfill$2 = function getPolyfill2() {
  return typeof Object.is === "function" ? Object.is : implementation$4;
};
var getPolyfill$3 = polyfill$2;
var define$2 = defineProperties_1;
var shim$4 = function shimObjectIs() {
  var polyfill3 = getPolyfill$3();
  define$2(Object, { is: polyfill3 }, {
    is: function testObjectIs() {
      return Object.is !== polyfill3;
    }
  });
  return polyfill3;
};
var define$1 = defineProperties_1;
var callBind$1 = callBind$3.exports;
var implementation$3 = implementation$5;
var getPolyfill$2 = polyfill$2;
var shim$3 = shim$4;
var polyfill$1 = callBind$1(getPolyfill$2(), Object);
define$1(polyfill$1, {
  getPolyfill: getPolyfill$2,
  implementation: implementation$3,
  shim: shim$3
});
var objectIs = polyfill$1;
var callBound = callBound$2;
var hasToStringTag$1 = shams();
var has;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$1) {
  has = callBound("Object.prototype.hasOwnProperty");
  $exec = callBound("RegExp.prototype.exec");
  isRegexMarker = {};
  var throwRegexMarker = function() {
    throw isRegexMarker;
  };
  badStringifier = {
    toString: throwRegexMarker,
    valueOf: throwRegexMarker
  };
  if (typeof Symbol.toPrimitive === "symbol") {
    badStringifier[Symbol.toPrimitive] = throwRegexMarker;
  }
}
var $toString = callBound("Object.prototype.toString");
var gOPD$2 = Object.getOwnPropertyDescriptor;
var regexClass = "[object RegExp]";
var isRegex$1 = hasToStringTag$1 ? function isRegex2(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  var descriptor = gOPD$2(value, "lastIndex");
  var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
  if (!hasLastIndexDataProperty) {
    return false;
  }
  try {
    $exec(value, badStringifier);
  } catch (e3) {
    return e3 === isRegexMarker;
  }
} : function isRegex3(value) {
  if (!value || typeof value !== "object" && typeof value !== "function") {
    return false;
  }
  return $toString(value) === regexClass;
};
var implementation$2 = { exports: {} };
var functionsHaveNames = function functionsHaveNames2() {
  return typeof function f2() {
  }.name === "string";
};
var gOPD$1 = Object.getOwnPropertyDescriptor;
if (gOPD$1) {
  try {
    gOPD$1([], "length");
  } catch (e3) {
    gOPD$1 = null;
  }
}
functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
  if (!functionsHaveNames() || !gOPD$1) {
    return false;
  }
  var desc = gOPD$1(function() {
  }, "name");
  return !!desc && !!desc.configurable;
};
var $bind = Function.prototype.bind;
functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
  return functionsHaveNames() && typeof $bind === "function" && function f2() {
  }.bind().name !== "";
};
var functionsHaveNames_1 = functionsHaveNames;
(function(module) {
  var functionsHaveConfigurableNames2 = functionsHaveNames_1.functionsHaveConfigurableNames();
  var $Object = Object;
  var $TypeError2 = TypeError;
  module.exports = function flags2() {
    if (this != null && this !== $Object(this)) {
      throw new $TypeError2("RegExp.prototype.flags getter called on non-object");
    }
    var result = "";
    if (this.hasIndices) {
      result += "d";
    }
    if (this.global) {
      result += "g";
    }
    if (this.ignoreCase) {
      result += "i";
    }
    if (this.multiline) {
      result += "m";
    }
    if (this.dotAll) {
      result += "s";
    }
    if (this.unicode) {
      result += "u";
    }
    if (this.sticky) {
      result += "y";
    }
    return result;
  };
  if (functionsHaveConfigurableNames2 && Object.defineProperty) {
    Object.defineProperty(module.exports, "name", { value: "get flags" });
  }
})(implementation$2);
var implementation$1 = implementation$2.exports;
var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var polyfill = function getPolyfill3() {
  if (supportsDescriptors$1 && /a/mig.flags === "gim") {
    var descriptor = $gOPD(RegExp.prototype, "flags");
    if (descriptor && typeof descriptor.get === "function" && typeof RegExp.prototype.dotAll === "boolean" && typeof RegExp.prototype.hasIndices === "boolean") {
      var calls = "";
      var o = {};
      Object.defineProperty(o, "hasIndices", {
        get: function() {
          calls += "d";
        }
      });
      Object.defineProperty(o, "sticky", {
        get: function() {
          calls += "y";
        }
      });
      if (calls === "dy") {
        return descriptor.get;
      }
    }
  }
  return implementation$1;
};
var supportsDescriptors = defineProperties_1.supportsDescriptors;
var getPolyfill$1 = polyfill;
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;
var shim$2 = function shimFlags() {
  if (!supportsDescriptors || !getProto) {
    throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
  }
  var polyfill3 = getPolyfill$1();
  var proto2 = getProto(regex);
  var descriptor = gOPD(proto2, "flags");
  if (!descriptor || descriptor.get !== polyfill3) {
    defineProperty(proto2, "flags", {
      configurable: true,
      enumerable: false,
      get: polyfill3
    });
  }
  return polyfill3;
};
var define = defineProperties_1;
var callBind = callBind$3.exports;
var implementation = implementation$2.exports;
var getPolyfill = polyfill;
var shim$1 = shim$2;
var flagsBound = callBind(getPolyfill());
define(flagsBound, {
  getPolyfill,
  implementation,
  shim: shim$1
});
var regexp_prototype_flags = flagsBound;
var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e3) {
    return false;
  }
};
var toStr = Object.prototype.toString;
var dateClass = "[object Date]";
var hasToStringTag = shams();
var isDateObject = function isDateObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};
var objectKeys = objectKeys$1;
var isArguments = isArguments$1;
var is = objectIs;
var isRegex = isRegex$1;
var flags = regexp_prototype_flags;
var isDate = isDateObject;
var getTime = Date.prototype.getTime;
function deepEqual(actual, expected, options) {
  var opts = options || {};
  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  }
  if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
    return opts.strict ? is(actual, expected) : actual == expected;
  }
  return objEquiv(actual, expected, opts);
}
function isUndefinedOrNull(value) {
  return value === null || value === void 0;
}
function isBuffer(x2) {
  if (!x2 || typeof x2 !== "object" || typeof x2.length !== "number") {
    return false;
  }
  if (typeof x2.copy !== "function" || typeof x2.slice !== "function") {
    return false;
  }
  if (x2.length > 0 && typeof x2[0] !== "number") {
    return false;
  }
  return true;
}
function objEquiv(a2, b, opts) {
  var i2, key;
  if (typeof a2 !== typeof b) {
    return false;
  }
  if (isUndefinedOrNull(a2) || isUndefinedOrNull(b)) {
    return false;
  }
  if (a2.prototype !== b.prototype) {
    return false;
  }
  if (isArguments(a2) !== isArguments(b)) {
    return false;
  }
  var aIsRegex = isRegex(a2);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) {
    return false;
  }
  if (aIsRegex || bIsRegex) {
    return a2.source === b.source && flags(a2) === flags(b);
  }
  if (isDate(a2) && isDate(b)) {
    return getTime.call(a2) === getTime.call(b);
  }
  var aIsBuffer = isBuffer(a2);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) {
    return false;
  }
  if (aIsBuffer || bIsBuffer) {
    if (a2.length !== b.length) {
      return false;
    }
    for (i2 = 0; i2 < a2.length; i2++) {
      if (a2[i2] !== b[i2]) {
        return false;
      }
    }
    return true;
  }
  if (typeof a2 !== typeof b) {
    return false;
  }
  try {
    var ka2 = objectKeys(a2);
    var kb2 = objectKeys(b);
  } catch (e3) {
    return false;
  }
  if (ka2.length !== kb2.length) {
    return false;
  }
  ka2.sort();
  kb2.sort();
  for (i2 = ka2.length - 1; i2 >= 0; i2--) {
    if (ka2[i2] != kb2[i2]) {
      return false;
    }
  }
  for (i2 = ka2.length - 1; i2 >= 0; i2--) {
    key = ka2[i2];
    if (!deepEqual(a2[key], b[key], opts)) {
      return false;
    }
  }
  return true;
}
var deepEqual_1 = deepEqual;
var _extends$h = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function getInnerDimensions(props, defaultMargins) {
  var margin = props.margin, width = props.width, height = props.height;
  var marginProps = _extends$h({}, defaultMargins, typeof margin === "number" ? {
    left: margin,
    right: margin,
    top: margin,
    bottom: margin
  } : margin);
  var _marginProps$left = marginProps.left, marginLeft = _marginProps$left === void 0 ? 0 : _marginProps$left, _marginProps$top = marginProps.top, marginTop = _marginProps$top === void 0 ? 0 : _marginProps$top, _marginProps$right = marginProps.right, marginRight = _marginProps$right === void 0 ? 0 : _marginProps$right, _marginProps$bottom = marginProps.bottom, marginBottom = _marginProps$bottom === void 0 ? 0 : _marginProps$bottom;
  return {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    innerHeight: height - marginBottom - marginTop,
    innerWidth: width - marginLeft - marginRight
  };
}
var MarginPropType = PropTypes.oneOfType([PropTypes.shape({
  left: PropTypes.number,
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number
}), PropTypes.number]);
var DEFAULT_MARGINS$1 = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};
var _createClass$7 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$g = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$7(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var MAX_DRAWS = 30;
function engageDrawLoop(ctx, height, width, layers) {
  var drawIteration = 0;
  var drawCycle = setInterval(function() {
    if (!ctx) {
      clearInterval(drawCycle);
      return;
    }
    drawLayers(ctx, height, width, layers, drawIteration);
    if (drawIteration > MAX_DRAWS) {
      clearInterval(drawCycle);
    }
    drawIteration += 1;
  }, 1);
}
function drawLayers(ctx, height, width, layers, drawIteration) {
  ctx.clearRect(0, 0, width, height);
  layers.forEach(function(layer) {
    var interpolator = layer.interpolator, newProps = layer.newProps, animation = layer.animation;
    var interpolatedProps = animation ? interpolator ? interpolator(drawIteration / MAX_DRAWS) : interpolator : function() {
      return {};
    };
    layer.renderLayer(_extends$g({}, newProps, interpolatedProps), ctx);
  });
}
function buildLayers(newChildren, oldChildren) {
  return newChildren.map(function(child, index) {
    var oldProps = oldChildren[index] ? oldChildren[index].props : {};
    var newProps = child.props;
    var oldAnimatedProps = extractAnimatedPropValues(_extends$g({}, oldProps, {
      animatedProps: ANIMATED_SERIES_PROPS
    }));
    var newAnimatedProps = newProps ? extractAnimatedPropValues(_extends$g({}, newProps, {
      animatedProps: ANIMATED_SERIES_PROPS
    })) : null;
    var interpolator = interpolate(oldAnimatedProps, newAnimatedProps);
    return {
      renderLayer: child.type.renderLayer,
      newProps: child.props,
      animation: child.props.animation,
      interpolator
    };
  });
}
var CanvasWrapper = function(_Component) {
  _inherits$7(CanvasWrapper2, _Component);
  function CanvasWrapper2() {
    _classCallCheck$7(this, CanvasWrapper2);
    return _possibleConstructorReturn$7(this, (CanvasWrapper2.__proto__ || Object.getPrototypeOf(CanvasWrapper2)).apply(this, arguments));
  }
  _createClass$7(CanvasWrapper2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ctx = this.canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      var pixelRatio = this.props.pixelRatio;
      if (!ctx) {
        return;
      }
      ctx.scale(pixelRatio, pixelRatio);
      this.drawChildren(null, this.props, ctx);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      this.drawChildren(oldProps, this.props, this.canvas.getContext("2d"));
    }
  }, {
    key: "drawChildren",
    value: function drawChildren(oldProps, newProps, ctx) {
      var children = newProps.children, innerHeight = newProps.innerHeight, innerWidth = newProps.innerWidth, marginBottom = newProps.marginBottom, marginLeft = newProps.marginLeft, marginRight = newProps.marginRight, marginTop = newProps.marginTop;
      if (!ctx) {
        return;
      }
      var childrenShouldAnimate = children.find(function(child) {
        return child.props.animation;
      });
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      var layers = buildLayers(newProps.children, oldProps ? oldProps.children : []);
      if (!childrenShouldAnimate) {
        drawLayers(ctx, height, width, layers);
        return;
      }
      engageDrawLoop(ctx, height, width, layers);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _props = this.props, innerHeight = _props.innerHeight, innerWidth = _props.innerWidth, marginBottom = _props.marginBottom, marginLeft = _props.marginLeft, marginRight = _props.marginRight, marginTop = _props.marginTop, pixelRatio = _props.pixelRatio;
      var height = innerHeight + marginTop + marginBottom;
      var width = innerWidth + marginLeft + marginRight;
      return /* @__PURE__ */ jsxs("div", {
        style: {
          left: 0,
          top: 0
        },
        className: "rv-xy-canvas",
        children: [/* @__PURE__ */ jsx("canvas", {
          className: "rv-xy-canvas-element",
          height: height * pixelRatio,
          width: width * pixelRatio,
          style: {
            height: height + "px",
            width: width + "px"
          },
          ref: function ref(_ref) {
            return _this2.canvas = _ref;
          }
        }), this.props.children]
      });
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        pixelRatio: window && window.devicePixelRatio || 1
      };
    }
  }]);
  return CanvasWrapper2;
}(react.exports.Component);
CanvasWrapper.displayName = "CanvasWrapper";
CanvasWrapper.propTypes = {
  marginBottom: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired,
  pixelRatio: PropTypes.number.isRequired
};
var _createClass$6 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$f = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$6(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ATTRIBUTES$1 = ["x", "y", "radius", "angle", "color", "fill", "stroke", "opacity", "size"];
function cleanseData(data) {
  return data.map(function(series) {
    if (!Array.isArray(series)) {
      return series;
    }
    return series.map(function(row) {
      return _extends$f({}, row, { parent: null });
    });
  });
}
function checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, hasTreeStructure) {
  var newMixins = _extends$f({}, nextScaleMixins, {
    _allData: hasTreeStructure ? cleanseData(nextScaleMixins._allData) : nextScaleMixins._allData
  });
  var oldMixins = _extends$f({}, scaleMixins, {
    _allData: hasTreeStructure ? cleanseData(scaleMixins._allData) : scaleMixins._allData
  });
  return deepEqual_1(newMixins, oldMixins);
}
var XYPlot = function(_React$Component) {
  _inherits$6(XYPlot2, _React$Component);
  _createClass$6(XYPlot2, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        className: ""
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        animation: AnimationPropType,
        className: PropTypes.string,
        dontCheckIfEmpty: PropTypes.bool,
        height: PropTypes.number.isRequired,
        margin: MarginPropType,
        onClick: PropTypes.func,
        onDoubleClick: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseMove: PropTypes.func,
        onTouchStart: PropTypes.func,
        onTouchMove: PropTypes.func,
        onTouchEnd: PropTypes.func,
        onTouchCancel: PropTypes.func,
        onWheel: PropTypes.func,
        stackBy: PropTypes.oneOf(ATTRIBUTES$1),
        style: PropTypes.object,
        width: PropTypes.number.isRequired
      };
    }
  }]);
  function XYPlot2(props) {
    _classCallCheck$6(this, XYPlot2);
    var _this = _possibleConstructorReturn$6(this, (XYPlot2.__proto__ || Object.getPrototypeOf(XYPlot2)).call(this, props));
    _initialiseProps.call(_this);
    var stackBy = props.stackBy;
    var children = getSeriesChildren(props.children);
    var data = getStackedData(children, stackBy);
    _this.state = {
      scaleMixins: _this._getScaleMixins(data, props),
      data
    };
    return _this;
  }
  _createClass$6(XYPlot2, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var children = getSeriesChildren(nextProps.children);
      var nextData = getStackedData(children, nextProps.stackBy);
      var scaleMixins = this.state.scaleMixins;
      var nextScaleMixins = this._getScaleMixins(nextData, nextProps);
      if (!checkIfMixinsAreEqual(nextScaleMixins, scaleMixins, nextProps.hasTreeStructure)) {
        this.setState({
          scaleMixins: nextScaleMixins,
          data: nextData
        });
      }
    }
  }, {
    key: "_getClonedChildComponents",
    value: function _getClonedChildComponents() {
      var _this2 = this;
      var props = this.props;
      var animation = this.props.animation;
      var _state = this.state, scaleMixins = _state.scaleMixins, data = _state.data;
      var dimensions = getInnerDimensions(this.props, DEFAULT_MARGINS$1);
      var children = React.Children.toArray(this.props.children);
      var seriesProps = getSeriesPropsFromChildren(children);
      var XYPlotValues = getXYPlotValues(props, children);
      return children.map(function(child, index) {
        var dataProps = null;
        if (seriesProps[index]) {
          var seriesIndex = seriesProps[index].seriesIndex;
          dataProps = { data: data[seriesIndex] };
        }
        return React.cloneElement(child, _extends$f({}, dimensions, {
          animation
        }, dataProps && child.type.prototype && child.type.prototype.render ? {
          ref: function ref(_ref) {
            return _this2["series" + seriesProps[index].seriesIndex] = _ref;
          }
        } : {}, seriesProps[index], scaleMixins, child.props, XYPlotValues[index], dataProps));
      });
    }
  }, {
    key: "_getDefaultScaleProps",
    value: function _getDefaultScaleProps(props) {
      var _getInnerDimensions = getInnerDimensions(props, DEFAULT_MARGINS$1), innerWidth = _getInnerDimensions.innerWidth, innerHeight = _getInnerDimensions.innerHeight;
      var colorRanges = ["color", "fill", "stroke"].reduce(function(acc, attr) {
        var range2 = props[attr + "Type"] === "category" ? EXTENDED_DISCRETE_COLOR_RANGE : CONTINUOUS_COLOR_RANGE;
        return _extends$f({}, acc, _defineProperty$3({}, attr + "Range", range2));
      }, {});
      return _extends$f({
        xRange: [0, innerWidth],
        yRange: [innerHeight, 0]
      }, colorRanges, {
        opacityType: OPACITY_TYPE,
        sizeRange: SIZE_RANGE
      });
    }
  }, {
    key: "_getScaleMixins",
    value: function _getScaleMixins(data, props) {
      var _ref2;
      var filteredData = data.filter(function(d) {
        return d;
      });
      var allData = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(filteredData));
      var defaultScaleProps = this._getDefaultScaleProps(props);
      var optionalScaleProps = getOptionalScaleProps(props);
      var userScaleProps = extractScalePropsFromProps(props, ATTRIBUTES$1);
      var missingScaleProps = getMissingScaleProps(_extends$f({}, defaultScaleProps, optionalScaleProps, userScaleProps), allData, ATTRIBUTES$1);
      var children = getSeriesChildren(props.children);
      var zeroBaseProps = {};
      var adjustBy = /* @__PURE__ */ new Set();
      var adjustWhat = /* @__PURE__ */ new Set();
      children.forEach(function(child, index) {
        if (!child || !data[index]) {
          return;
        }
        ATTRIBUTES$1.forEach(function(attr) {
          var _child$type$getParent = child.type.getParentConfig(attr, child.props), isDomainAdjustmentNeeded = _child$type$getParent.isDomainAdjustmentNeeded, zeroBaseValue = _child$type$getParent.zeroBaseValue;
          if (isDomainAdjustmentNeeded) {
            adjustBy.add(attr);
            adjustWhat.add(index);
          }
          if (zeroBaseValue) {
            var specifiedDomain = props[attr + "Domain"];
            zeroBaseProps[attr + "BaseValue"] = specifiedDomain ? specifiedDomain[0] : 0;
          }
        });
      });
      return _extends$f({}, defaultScaleProps, zeroBaseProps, userScaleProps, missingScaleProps, {
        _allData: data,
        _adjustBy: Array.from(adjustBy),
        _adjustWhat: Array.from(adjustWhat),
        _stackBy: props.stackBy
      });
    }
  }, {
    key: "_isPlotEmpty",
    value: function _isPlotEmpty() {
      var data = this.state.data;
      return !data || !data.length || !data.some(function(series) {
        return series && series.some(function(d) {
          return d;
        });
      });
    }
  }, {
    key: "renderCanvasComponents",
    value: function renderCanvasComponents(components, props) {
      var componentsToRender = components.filter(function(c2) {
        return c2 && !c2.type.requiresSVG && c2.type.isCanvas;
      });
      if (componentsToRender.length === 0) {
        return null;
      }
      var _componentsToRender$ = componentsToRender[0].props, marginLeft = _componentsToRender$.marginLeft, marginTop = _componentsToRender$.marginTop, marginBottom = _componentsToRender$.marginBottom, marginRight = _componentsToRender$.marginRight, innerHeight = _componentsToRender$.innerHeight, innerWidth = _componentsToRender$.innerWidth;
      return React.createElement(CanvasWrapper, {
        innerHeight,
        innerWidth,
        marginLeft,
        marginTop,
        marginBottom,
        marginRight
      }, componentsToRender);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props, className = _props.className, dontCheckIfEmpty = _props.dontCheckIfEmpty, style = _props.style, width = _props.width, height = _props.height;
      if (!dontCheckIfEmpty && this._isPlotEmpty()) {
        return React.createElement("div", {
          className: "rv-xy-plot " + className,
          style: _extends$f({
            width: width + "px",
            height: height + "px"
          }, this.props.style)
        });
      }
      var components = this._getClonedChildComponents();
      return React.createElement("div", {
        style: {
          width: width + "px",
          height: height + "px"
        },
        className: "rv-xy-plot " + className
      }, React.createElement("svg", {
        className: "rv-xy-plot__inner",
        width,
        height,
        style,
        onClick: this._clickHandler,
        onDoubleClick: this._doubleClickHandler,
        onMouseDown: this._mouseDownHandler,
        onMouseUp: this._mouseUpHandler,
        onMouseMove: this._mouseMoveHandler,
        onMouseLeave: this._mouseLeaveHandler,
        onMouseEnter: this._mouseEnterHandler,
        onTouchStart: this._mouseDownHandler,
        onTouchMove: this._touchMoveHandler,
        onTouchEnd: this._touchEndHandler,
        onTouchCancel: this._touchCancelHandler,
        onWheel: this._wheelHandler
      }, components.filter(function(c2) {
        return c2 && c2.type.requiresSVG;
      })), this.renderCanvasComponents(components, this.props), components.filter(function(c2) {
        return c2 && !c2.type.requiresSVG && !c2.type.isCanvas;
      }));
    }
  }]);
  return XYPlot2;
}(React.Component);
var _initialiseProps = function _initialiseProps2() {
  var _this3 = this;
  this._clickHandler = function(event) {
    var onClick = _this3.props.onClick;
    if (onClick) {
      onClick(event);
    }
  };
  this._doubleClickHandler = function(event) {
    var onDoubleClick = _this3.props.onDoubleClick;
    if (onDoubleClick) {
      onDoubleClick(event);
    }
  };
  this._mouseDownHandler = function(event) {
    var _props2 = _this3.props, onMouseDown = _props2.onMouseDown, children = _props2.children;
    if (onMouseDown) {
      onMouseDown(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentMouseDown) {
        component.onParentMouseDown(event);
      }
    });
  };
  this._mouseEnterHandler = function(event) {
    var _props3 = _this3.props, onMouseEnter = _props3.onMouseEnter, children = _props3.children;
    if (onMouseEnter) {
      onMouseEnter(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentMouseEnter) {
        component.onParentMouseEnter(event);
      }
    });
  };
  this._mouseLeaveHandler = function(event) {
    var _props4 = _this3.props, onMouseLeave = _props4.onMouseLeave, children = _props4.children;
    if (onMouseLeave) {
      onMouseLeave(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentMouseLeave) {
        component.onParentMouseLeave(event);
      }
    });
  };
  this._mouseMoveHandler = function(event) {
    var _props5 = _this3.props, onMouseMove = _props5.onMouseMove, children = _props5.children;
    if (onMouseMove) {
      onMouseMove(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentMouseMove) {
        component.onParentMouseMove(event);
      }
    });
  };
  this._mouseUpHandler = function(event) {
    var _props6 = _this3.props, onMouseUp = _props6.onMouseUp, children = _props6.children;
    if (onMouseUp) {
      onMouseUp(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentMouseUp) {
        component.onParentMouseUp(event);
      }
    });
  };
  this._touchCancelHandler = function(event) {
    var onTouchCancel = _this3.props.onTouchCancel;
    if (onTouchCancel) {
      onTouchCancel(event);
    }
  };
  this._touchEndHandler = function(event) {
    var onTouchEnd = _this3.props.onTouchEnd;
    if (onTouchEnd) {
      onTouchEnd(event);
    }
  };
  this._touchMoveHandler = function(event) {
    var _props7 = _this3.props, onTouchMove = _props7.onTouchMove, children = _props7.children;
    if (onTouchMove) {
      onTouchMove(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentTouchMove) {
        component.onParentTouchMove(event);
      }
    });
  };
  this._touchStartHandler = function(event) {
    var _props8 = _this3.props, onTouchStart = _props8.onTouchStart, children = _props8.children;
    if (onTouchStart) {
      onTouchStart(event);
    }
    var seriesChildren = getSeriesChildren(children);
    seriesChildren.forEach(function(child, index) {
      var component = _this3["series" + index];
      if (component && component.onParentTouchStart) {
        component.onParentTouchStart(event);
      }
    });
  };
  this._wheelHandler = function(event) {
    var onWheel = _this3.props.onWheel;
    if (onWheel) {
      onWheel(event);
    }
  };
};
XYPlot.displayName = "XYPlot";
var _extends$e = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var LEFT$4 = ORIENTATION$1.LEFT, RIGHT$4 = ORIENTATION$1.RIGHT, TOP$4 = ORIENTATION$1.TOP, BOTTOM$4 = ORIENTATION$1.BOTTOM;
var propTypes$5 = {
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  orientation: PropTypes.oneOf([LEFT$4, RIGHT$4, TOP$4, BOTTOM$4]).isRequired,
  width: PropTypes.number.isRequired
};
var defaultProps$5 = {
  style: {}
};
function AxisLine(_ref) {
  var orientation = _ref.orientation, width = _ref.width, height = _ref.height, style = _ref.style;
  var lineProps = void 0;
  if (orientation === LEFT$4) {
    lineProps = {
      x1: width,
      x2: width,
      y1: 0,
      y2: height
    };
  } else if (orientation === RIGHT$4) {
    lineProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: height
    };
  } else if (orientation === TOP$4) {
    lineProps = {
      x1: 0,
      x2: width,
      y1: height,
      y2: height
    };
  } else {
    lineProps = {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0
    };
  }
  return React.createElement("line", _extends$e({}, lineProps, { className: "rv-xy-plot__axis__line", style }));
}
AxisLine.defaultProps = defaultProps$5;
AxisLine.displayName = "AxisLine";
AxisLine.propTypes = propTypes$5;
var _extends$d = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$5 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$5(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var LEFT$3 = ORIENTATION$1.LEFT, RIGHT$3 = ORIENTATION$1.RIGHT, TOP$3 = ORIENTATION$1.TOP, BOTTOM$3 = ORIENTATION$1.BOTTOM;
var propTypes$4 = {
  height: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf([LEFT$3, RIGHT$3, TOP$3, BOTTOM$3]).isRequired,
  style: PropTypes.object,
  width: PropTypes.number.isRequired
};
var defaultProps$4 = {
  style: {}
};
function _getTickFormatFn(scale, tickTotal, tickFormat2) {
  return !tickFormat2 ? scale.tickFormat ? scale.tickFormat(tickTotal) : function(v2) {
    return v2;
  } : tickFormat2;
}
var AxisTicks = function(_React$Component) {
  _inherits$5(AxisTicks2, _React$Component);
  function AxisTicks2() {
    _classCallCheck$5(this, AxisTicks2);
    return _possibleConstructorReturn$5(this, (AxisTicks2.__proto__ || Object.getPrototypeOf(AxisTicks2)).apply(this, arguments));
  }
  _createClass$5(AxisTicks2, [{
    key: "_areTicksWrapped",
    value: function _areTicksWrapped() {
      var orientation = this.props.orientation;
      return orientation === LEFT$3 || orientation === TOP$3;
    }
  }, {
    key: "_getTickContainerPropsGetterFn",
    value: function _getTickContainerPropsGetterFn() {
      if (this._isAxisVertical()) {
        return function(pos) {
          return { transform: "translate(0, " + pos + ")" };
        };
      }
      return function(pos) {
        return { transform: "translate(" + pos + ", 0)" };
      };
    }
  }, {
    key: "_getTickLabelProps",
    value: function _getTickLabelProps() {
      var _props = this.props, orientation = _props.orientation, tickLabelAngle = _props.tickLabelAngle, tickSize = _props.tickSize, _props$tickSizeOuter = _props.tickSizeOuter, tickSizeOuter = _props$tickSizeOuter === void 0 ? tickSize : _props$tickSizeOuter, _props$tickPadding = _props.tickPadding, tickPadding = _props$tickPadding === void 0 ? tickSize : _props$tickPadding;
      var textAnchor = void 0;
      if (orientation === LEFT$3 || orientation === BOTTOM$3 && tickLabelAngle) {
        textAnchor = "end";
      } else if (orientation === RIGHT$3 || orientation === TOP$3 && tickLabelAngle) {
        textAnchor = "start";
      } else {
        textAnchor = "middle";
      }
      var isVertical = this._isAxisVertical();
      var wrap = this._areTicksWrapped() ? -1 : 1;
      var labelOffset = wrap * (tickSizeOuter + tickPadding);
      var transform = (isVertical ? "translate(" + labelOffset + ", 0)" : "translate(0, " + labelOffset + ")") + (tickLabelAngle ? " rotate(" + tickLabelAngle + ")" : "");
      var dy = orientation === TOP$3 || tickLabelAngle ? "0" : orientation === BOTTOM$3 ? "0.72em" : "0.32em";
      return {
        textAnchor,
        dy,
        transform
      };
    }
  }, {
    key: "_getTickLineProps",
    value: function _getTickLineProps() {
      var _ref;
      var _props2 = this.props, tickSize = _props2.tickSize, _props2$tickSizeOuter = _props2.tickSizeOuter, tickSizeOuter = _props2$tickSizeOuter === void 0 ? tickSize : _props2$tickSizeOuter, _props2$tickSizeInner = _props2.tickSizeInner, tickSizeInner = _props2$tickSizeInner === void 0 ? tickSize : _props2$tickSizeInner;
      var isVertical = this._isAxisVertical();
      var tickXAttr = isVertical ? "y" : "x";
      var tickYAttr = isVertical ? "x" : "y";
      var wrap = this._areTicksWrapped() ? -1 : 1;
      return _ref = {}, _defineProperty$2(_ref, tickXAttr + "1", 0), _defineProperty$2(_ref, tickXAttr + "2", 0), _defineProperty$2(_ref, tickYAttr + "1", -wrap * tickSizeInner), _defineProperty$2(_ref, tickYAttr + "2", wrap * tickSizeOuter), _ref;
    }
  }, {
    key: "_isAxisVertical",
    value: function _isAxisVertical() {
      var orientation = this.props.orientation;
      return orientation === LEFT$3 || orientation === RIGHT$3;
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props, attr = _props3.attr, orientation = _props3.orientation, width = _props3.width, height = _props3.height, style = _props3.style, tickFormat2 = _props3.tickFormat, tickTotal = _props3.tickTotal, tickValues = _props3.tickValues;
      var x2 = orientation === LEFT$3 ? width : 0;
      var y2 = orientation === TOP$3 ? height : 0;
      var scale = getAttributeScale(this.props, attr);
      var values = getTickValues(scale, tickTotal, tickValues);
      var tickFormatFn = _getTickFormatFn(scale, tickTotal, tickFormat2);
      var translateFn = this._getTickContainerPropsGetterFn();
      var pathProps = this._getTickLineProps();
      var textProps = this._getTickLabelProps();
      var ticks2 = values.map(function(v2, i2) {
        var pos = scale(v2);
        var labelNode = tickFormatFn(v2, i2, scale, tickTotal);
        var shouldRenderAsOwnNode = React.isValidElement(labelNode) && !["tspan", "textPath"].includes(labelNode.type);
        var shouldAddProps = labelNode && typeof labelNode.type !== "string";
        return React.createElement("g", _extends$d({
          key: i2
        }, translateFn(pos, 0), {
          className: "rv-xy-plot__axis__tick",
          style
        }), React.createElement("line", _extends$d({}, pathProps, {
          className: "rv-xy-plot__axis__tick__line",
          style: _extends$d({}, style, style.line)
        })), shouldRenderAsOwnNode ? React.cloneElement(labelNode, shouldAddProps ? _extends$d({}, textProps, {
          containerWidth: width,
          tickCount: values.length
        }) : void 0) : React.createElement("text", _extends$d({}, textProps, {
          className: "rv-xy-plot__axis__tick__text",
          style: _extends$d({}, style, style.text)
        }), labelNode));
      });
      return React.createElement("g", {
        transform: "translate(" + x2 + ", " + y2 + ")",
        className: "rv-xy-plot__axis__ticks"
      }, ticks2);
    }
  }]);
  return AxisTicks2;
}(React.Component);
AxisTicks.defaultProps = defaultProps$4;
AxisTicks.displayName = "AxisTicks";
AxisTicks.propTypes = propTypes$4;
AxisTicks.requiresSVG = true;
var _extends$c = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var ADJUSTMENT_FOR_TEXT_SIZE = 16;
var MARGIN = 6;
var LEFT$2 = ORIENTATION$1.LEFT, RIGHT$2 = ORIENTATION$1.RIGHT, TOP$2 = ORIENTATION$1.TOP, BOTTOM$2 = ORIENTATION$1.BOTTOM;
var defaultProps$3 = {
  position: "end"
};
var transformation = function transformation2(width, height) {
  var _ref;
  return _ref = {}, _defineProperty$1(_ref, LEFT$2, {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: MARGIN,
      rotation: -90,
      textAnchor: "end"
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: "middle"
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: "start"
    }
  }), _defineProperty$1(_ref, RIGHT$2, {
    end: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: MARGIN,
      rotation: -90,
      textAnchor: "end"
    },
    middle: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height / 2 - MARGIN,
      rotation: -90,
      textAnchor: "middle"
    },
    start: {
      x: ADJUSTMENT_FOR_TEXT_SIZE * -0.5,
      y: height - MARGIN,
      rotation: -90,
      textAnchor: "start"
    }
  }), _defineProperty$1(_ref, TOP$2, {
    start: {
      x: MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: "start"
    },
    middle: {
      x: width / 2 - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: "middle"
    },
    end: {
      x: width - MARGIN,
      y: ADJUSTMENT_FOR_TEXT_SIZE,
      rotation: 0,
      textAnchor: "end"
    }
  }), _defineProperty$1(_ref, BOTTOM$2, {
    start: {
      x: MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: "start"
    },
    middle: {
      x: width / 2 - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: "middle"
    },
    end: {
      x: width - MARGIN,
      y: -MARGIN,
      rotation: 0,
      textAnchor: "end"
    }
  }), _ref;
};
var propTypes$3 = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf([LEFT$2, RIGHT$2, TOP$2, BOTTOM$2]).isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired
};
function AxisTitle(_ref2) {
  var orientation = _ref2.orientation, position = _ref2.position, width = _ref2.width, height = _ref2.height, style = _ref2.style, title = _ref2.title;
  var outerGroupTranslateX = orientation === LEFT$2 ? width : 0;
  var outerGroupTranslateY = orientation === TOP$2 ? height : 0;
  var outerGroupTransform = "translate(" + outerGroupTranslateX + ", " + outerGroupTranslateY + ")";
  var _transformation$orien = transformation(width, height)[orientation][position], x2 = _transformation$orien.x, y2 = _transformation$orien.y, rotation = _transformation$orien.rotation, textAnchor = _transformation$orien.textAnchor;
  var innerGroupTransform = "translate(" + x2 + ", " + y2 + ") rotate(" + rotation + ")";
  return React.createElement("g", { transform: outerGroupTransform, className: "rv-xy-plot__axis__title" }, React.createElement("g", { style: _extends$c({ textAnchor }, style), transform: innerGroupTransform }, React.createElement("text", { style }, title)));
}
AxisTitle.displayName = "AxisTitle";
AxisTitle.propTypes = propTypes$3;
AxisTitle.defaultProps = defaultProps$3;
var _extends$b = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$4 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$4(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var defaultAnimatedProps = ["xRange", "yRange", "xDomain", "yDomain", "width", "height", "marginLeft", "marginTop", "marginRight", "marginBottom", "tickSize", "tickTotal", "tickSizeInner", "tickSizeOuter"];
var LEFT$1 = ORIENTATION$1.LEFT, RIGHT$1 = ORIENTATION$1.RIGHT, TOP$1 = ORIENTATION$1.TOP, BOTTOM$1 = ORIENTATION$1.BOTTOM;
var propTypes$2 = {
  orientation: PropTypes.oneOf([LEFT$1, RIGHT$1, TOP$1, BOTTOM$1]),
  attr: PropTypes.string.isRequired,
  attrAxis: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  hideTicks: PropTypes.bool,
  hideLine: PropTypes.bool,
  on0: PropTypes.bool,
  tickLabelAngle: PropTypes.number,
  tickSize: PropTypes.number,
  tickSizeInner: PropTypes.number,
  tickSizeOuter: PropTypes.number,
  tickPadding: PropTypes.number,
  tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  tickFormat: PropTypes.func,
  tickTotal: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};
var defaultProps$2 = {
  className: "",
  on0: false,
  style: {},
  tickSize: 6,
  tickPadding: 8,
  orientation: BOTTOM$1
};
var predefinedClassName$1 = "rv-xy-plot__axis";
var VERTICAL_CLASS_NAME = "rv-xy-plot__axis--vertical";
var HORIZONTAL_CLASS_NAME = "rv-xy-plot__axis--horizontal";
var Axis = function(_PureComponent) {
  _inherits$4(Axis2, _PureComponent);
  function Axis2() {
    _classCallCheck$4(this, Axis2);
    return _possibleConstructorReturn$4(this, (Axis2.__proto__ || Object.getPrototypeOf(Axis2)).apply(this, arguments));
  }
  _createClass$4(Axis2, [{
    key: "_getDefaultAxisProps",
    value: function _getDefaultAxisProps() {
      var _props = this.props, innerWidth = _props.innerWidth, innerHeight = _props.innerHeight, marginTop = _props.marginTop, marginBottom = _props.marginBottom, marginLeft = _props.marginLeft, marginRight = _props.marginRight, orientation = _props.orientation;
      if (orientation === BOTTOM$1) {
        return {
          tickTotal: getTicksTotalFromSize(innerWidth),
          top: innerHeight + marginTop,
          left: marginLeft,
          width: innerWidth,
          height: marginBottom
        };
      } else if (orientation === TOP$1) {
        return {
          tickTotal: getTicksTotalFromSize(innerWidth),
          top: 0,
          left: marginLeft,
          width: innerWidth,
          height: marginTop
        };
      } else if (orientation === LEFT$1) {
        return {
          tickTotal: getTicksTotalFromSize(innerHeight),
          top: marginTop,
          left: 0,
          width: marginLeft,
          height: innerHeight
        };
      }
      return {
        tickTotal: getTicksTotalFromSize(innerHeight),
        top: marginTop,
        left: marginLeft + innerWidth,
        width: marginRight,
        height: innerHeight
      };
    }
  }, {
    key: "render",
    value: function render() {
      var animation = this.props.animation;
      if (animation) {
        var animatedProps2 = animation.nonAnimatedProps ? defaultAnimatedProps.filter(function(prop) {
          return animation.nonAnimatedProps.indexOf(prop) < 0;
        }) : defaultAnimatedProps;
        return /* @__PURE__ */ jsx(Animation, {
          ...this.props,
          animatedProps: animatedProps2,
          children: /* @__PURE__ */ jsx(Axis2, {
            ...this.props,
            animation: null
          })
        });
      }
      var props = _extends$b({}, this._getDefaultAxisProps(), this.props);
      var attrAxis = props.attrAxis, className = props.className, height = props.height, hideLine = props.hideLine, hideTicks = props.hideTicks, left = props.left, marginTop = props.marginTop, on0 = props.on0, orientation = props.orientation, position = props.position, style = props.style, title = props.title, top = props.top, width = props.width;
      var isVertical = [LEFT$1, RIGHT$1].indexOf(orientation) > -1;
      var axisClassName = isVertical ? VERTICAL_CLASS_NAME : HORIZONTAL_CLASS_NAME;
      var leftPos = left;
      var topPos = top;
      if (on0) {
        var scale = getAttributeScale(props, attrAxis);
        if (isVertical) {
          leftPos = scale(0);
        } else {
          topPos = marginTop + scale(0);
        }
      }
      return /* @__PURE__ */ jsxs("g", {
        transform: "translate(" + leftPos + "," + topPos + ")",
        className: predefinedClassName$1 + " " + axisClassName + " " + className,
        style,
        children: [!hideLine && /* @__PURE__ */ jsx(AxisLine, {
          height,
          width,
          orientation,
          style: _extends$b({}, style, style.line)
        }), !hideTicks && /* @__PURE__ */ jsx(AxisTicks, {
          ...props,
          style: _extends$b({}, style, style.ticks)
        }), title ? /* @__PURE__ */ jsx(AxisTitle, {
          position,
          title,
          height,
          width,
          style: _extends$b({}, style, style.title),
          orientation
        }) : null]
      });
    }
  }]);
  return Axis2;
}(react.exports.PureComponent);
Axis.displayName = "Axis";
Axis.propTypes = propTypes$2;
Axis.defaultProps = defaultProps$2;
Axis.requiresSVG = true;
var _extends$a = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var TOP = ORIENTATION$1.TOP, BOTTOM = ORIENTATION$1.BOTTOM;
var propTypes$1 = _extends$a({}, Axis.propTypes, {
  orientation: PropTypes.oneOf([TOP, BOTTOM])
});
var defaultProps$1 = {
  orientation: BOTTOM,
  attr: "x",
  attrAxis: "y"
};
function XAxis(props) {
  return React.createElement(Axis, props);
}
XAxis.displayName = "XAxis";
XAxis.propTypes = propTypes$1;
XAxis.defaultProps = defaultProps$1;
XAxis.requiresSVG = true;
var _extends$9 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var LEFT = ORIENTATION$1.LEFT, RIGHT = ORIENTATION$1.RIGHT;
var propTypes = _extends$9({}, Axis.propTypes, {
  orientation: PropTypes.oneOf([LEFT, RIGHT])
});
var defaultProps = {
  orientation: LEFT,
  attr: "y",
  attrAxis: "x"
};
function YAxis(props) {
  return React.createElement(Axis, props);
}
YAxis.displayName = "YAxis";
YAxis.propTypes = propTypes;
YAxis.defaultProps = defaultProps;
YAxis.requiresSVG = true;
({
  className: PropTypes.string,
  height: PropTypes.number,
  endColor: PropTypes.string,
  endTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  midColor: PropTypes.string,
  midTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  startColor: PropTypes.string,
  startTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.number
});
({
  className: "",
  startColor: CONTINUOUS_COLOR_RANGE[0],
  endColor: CONTINUOUS_COLOR_RANGE[1]
});
({
  className: PropTypes.string,
  circlesTotal: PropTypes.number,
  endSize: PropTypes.number,
  endTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.number,
  startSize: PropTypes.number,
  startTitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.number
});
var _extends$8 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var STROKE_STYLES = {
  dashed: "6, 2",
  solid: null
};
function DiscreteColorLegendItem(_ref) {
  var color2 = _ref.color, strokeDasharray = _ref.strokeDasharray, strokeStyle = _ref.strokeStyle, strokeWidth = _ref.strokeWidth, disabled = _ref.disabled, onClick = _ref.onClick, orientation = _ref.orientation, onMouseEnter = _ref.onMouseEnter, onMouseLeave = _ref.onMouseLeave, title = _ref.title;
  var className = "rv-discrete-color-legend-item " + orientation;
  if (disabled) {
    className += " disabled";
  }
  if (onClick) {
    className += " clickable";
  }
  var strokeDasharrayStyle = STROKE_STYLES[strokeStyle] || strokeDasharray;
  return React.createElement("div", { className, onClick, onMouseEnter, onMouseLeave }, React.createElement("svg", { className: "rv-discrete-color-legend-item__color", height: 2, width: 14 }, React.createElement("path", {
    className: "rv-discrete-color-legend-item__color__path",
    d: "M 0, 1 L 14, 1",
    style: _extends$8({}, strokeWidth ? { strokeWidth } : {}, strokeDasharrayStyle ? { strokeDasharray: strokeDasharrayStyle } : {}, {
      stroke: disabled ? null : color2
    })
  })), React.createElement("span", { className: "rv-discrete-color-legend-item__title" }, title));
}
DiscreteColorLegendItem.propTypes = {
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeStyle: PropTypes.oneOf(Object.keys(STROKE_STYLES))
};
DiscreteColorLegendItem.defaultProps = {
  disabled: false,
  strokeStyle: "solid"
};
DiscreteColorLegendItem.displayName = "DiscreteColorLegendItem";
var _extends$7 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function DiscreteColorLegend(_ref) {
  var className = _ref.className, colors2 = _ref.colors, height = _ref.height, items = _ref.items, onItemClick = _ref.onItemClick, onItemMouseEnter = _ref.onItemMouseEnter, onItemMouseLeave = _ref.onItemMouseLeave, orientation = _ref.orientation, style = _ref.style, width = _ref.width;
  return React.createElement("div", {
    className: "rv-discrete-color-legend " + orientation + " " + className,
    style: _extends$7({ width, height }, style)
  }, items.map(function(item, i2) {
    return React.createElement(DiscreteColorLegendItem, {
      title: item.title ? item.title : item,
      color: item.color ? item.color : colors2[i2 % colors2.length],
      strokeDasharray: item.strokeDasharray,
      strokeStyle: item.strokeStyle,
      strokeWidth: item.strokeWidth,
      disabled: Boolean(item.disabled),
      orientation,
      key: i2,
      onClick: onItemClick ? function(e3) {
        return onItemClick(item, i2, e3);
      } : null,
      onMouseEnter: onItemMouseEnter ? function(e3) {
        return onItemMouseEnter(item, i2, e3);
      } : null,
      onMouseLeave: onItemMouseEnter ? function(e3) {
        return onItemMouseLeave(item, i2, e3);
      } : null
    });
  }));
}
DiscreteColorLegend.displayName = "DiscreteColorLegendItem";
DiscreteColorLegend.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    color: PropTypes.string,
    disabled: PropTypes.bool
  }), PropTypes.string.isRequired, PropTypes.element])).isRequired,
  onItemClick: PropTypes.func,
  onItemMouseEnter: PropTypes.func,
  onItemMouseLeave: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  orientation: PropTypes.oneOf(["vertical", "horizontal"])
};
DiscreteColorLegend.defaultProps = {
  className: "",
  colors: DISCRETE_COLOR_RANGE,
  orientation: "vertical"
};
var _extends$6 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
_extends$6({}, DiscreteColorLegend.propTypes, {
  searchText: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  searchFn: PropTypes.func
});
var _createClass$3 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$5 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$3(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var predefinedClassName = "rv-parallel-coordinates-chart";
var DEFAULT_FORMAT = format(".2r");
function getAxes(props) {
  var animation = props.animation, domains = props.domains, style = props.style, tickFormat2 = props.tickFormat;
  return domains.map(function(domain, index) {
    var sortedDomain = domain.domain;
    var domainTickFormat = function domainTickFormat2(t2) {
      return domain.tickFormat ? domain.tickFormat(t2) : tickFormat2(t2);
    };
    return /* @__PURE__ */ jsx(DecorativeAxis, {
      animation,
      axisStart: {
        x: domain.name,
        y: 0
      },
      axisEnd: {
        x: domain.name,
        y: 1
      },
      axisDomain: sortedDomain,
      numberOfTicks: 5,
      tickValue: domainTickFormat,
      style: style.axes
    }, index + "-axis");
  });
}
function getLabels(props) {
  var domains = props.domains, style = props.style;
  return domains.map(function(domain, index) {
    return {
      x: domain.name,
      y: 1.1,
      label: domain.name,
      style
    };
  });
}
function getLines(props) {
  var animation = props.animation, brushFilters = props.brushFilters, colorRange = props.colorRange, domains = props.domains, data = props.data, style = props.style, showMarks = props.showMarks;
  var scales = domains.reduce(function(acc, _ref) {
    var domain = _ref.domain, name = _ref.name;
    acc[name] = linear().domain(domain).range([0, 1]);
    return acc;
  }, {});
  return data.map(function(row, rowIndex) {
    var withinFilteredRange = true;
    var mappedData = domains.map(function(domain, index) {
      var getValue = domain.getValue, name = domain.name;
      var yVal = scales[name](getValue ? getValue(row) : row[name]);
      var filter = brushFilters[name];
      if (filter && (yVal < filter.min || yVal > filter.max)) {
        withinFilteredRange = false;
      }
      return {
        x: name,
        y: yVal
      };
    });
    var selectedName = predefinedClassName + "-line";
    var unselectedName = selectedName + " " + predefinedClassName + "-line-unselected";
    var lineProps = {
      animation,
      className: withinFilteredRange ? selectedName : unselectedName,
      key: rowIndex + "-polygon",
      data: mappedData,
      color: row.color || colorRange[rowIndex % colorRange.length],
      style: _extends$5({}, style.lines, row.style || {})
    };
    if (!withinFilteredRange) {
      lineProps.style = _extends$5({}, lineProps.style, style.deselectedLineStyle);
    }
    return showMarks ? /* @__PURE__ */ jsx(LineMarkSeries, {
      ...lineProps
    }) : /* @__PURE__ */ jsx(LineSeries, {
      ...lineProps
    });
  });
}
var ParallelCoordinates = function(_Component) {
  _inherits$3(ParallelCoordinates2, _Component);
  function ParallelCoordinates2() {
    var _ref2;
    var _temp, _this, _ret;
    _classCallCheck$3(this, ParallelCoordinates2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$3(this, (_ref2 = ParallelCoordinates2.__proto__ || Object.getPrototypeOf(ParallelCoordinates2)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      brushFilters: {}
    }, _temp), _possibleConstructorReturn$3(_this, _ret);
  }
  _createClass$3(ParallelCoordinates2, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var brushFilters = this.state.brushFilters;
      var _props = this.props, animation = _props.animation, brushing = _props.brushing, className = _props.className, children = _props.children, colorRange = _props.colorRange, data = _props.data, domains = _props.domains, height = _props.height, hideInnerMostValues = _props.hideInnerMostValues, margin = _props.margin, onMouseLeave = _props.onMouseLeave, onMouseEnter = _props.onMouseEnter, showMarks = _props.showMarks, style = _props.style, tickFormat2 = _props.tickFormat, width = _props.width;
      var axes = getAxes({
        domains,
        animation,
        hideInnerMostValues,
        style,
        tickFormat: tickFormat2
      });
      var lines = getLines({
        animation,
        brushFilters,
        colorRange,
        domains,
        data,
        showMarks,
        style
      });
      var labelSeries = /* @__PURE__ */ jsx(LabelSeries, {
        animation: true,
        className: predefinedClassName + "-label",
        data: getLabels({
          domains,
          style: style.labels
        })
      }, className);
      var _getInnerDimensions = getInnerDimensions(this.props, DEFAULT_MARGINS$1), marginLeft = _getInnerDimensions.marginLeft, marginRight = _getInnerDimensions.marginRight;
      return /* @__PURE__ */ jsxs(XYPlot, {
        height,
        width,
        margin,
        dontCheckIfEmpty: true,
        className: className + " " + predefinedClassName,
        onMouseLeave,
        onMouseEnter,
        xType: "ordinal",
        yDomain: [0, 1],
        children: [children, axes.concat(lines).concat(labelSeries), brushing && domains.map(function(d) {
          var trigger = function trigger2(row) {
            _this2.setState({
              brushFilters: _extends$5({}, brushFilters, _defineProperty({}, d.name, row ? {
                min: row.bottom,
                max: row.top
              } : null))
            });
          };
          return /* @__PURE__ */ jsx(Highlight, {
            drag: true,
            highlightX: d.name,
            onBrushEnd: trigger,
            onDragEnd: trigger,
            highlightWidth: (width - marginLeft - marginRight) / domains.length,
            enableX: false
          }, d.name);
        })]
      });
    }
  }]);
  return ParallelCoordinates2;
}(react.exports.Component);
ParallelCoordinates.displayName = "ParallelCoordinates";
ParallelCoordinates.propTypes = {
  animation: AnimationPropType,
  brushing: PropTypes.bool,
  className: PropTypes.string,
  colorType: PropTypes.string,
  colorRange: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    tickFormat: PropTypes.func
  })).isRequired,
  height: PropTypes.number.isRequired,
  margin: MarginPropType,
  style: PropTypes.shape({
    axes: PropTypes.object,
    labels: PropTypes.object,
    lines: PropTypes.object
  }),
  showMarks: PropTypes.bool,
  tickFormat: PropTypes.func,
  width: PropTypes.number.isRequired
};
ParallelCoordinates.defaultProps = {
  className: "",
  colorType: "category",
  colorRange: DISCRETE_COLOR_RANGE,
  style: {
    axes: {
      line: {},
      ticks: {},
      text: {}
    },
    labels: {
      fontSize: 10,
      textAnchor: "middle"
    },
    lines: {
      strokeWidth: 1,
      strokeOpacity: 1
    },
    deselectedLineStyle: {
      strokeOpacity: 0.1
    }
  },
  tickFormat: DEFAULT_FORMAT
};
format(".2r");
({
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  colorRange: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  domains: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    tickFormat: PropTypes.func
  })).isRequired,
  height: PropTypes.number.isRequired,
  hideInnerMostValues: PropTypes.bool,
  margin: MarginPropType,
  startingAngle: PropTypes.number,
  style: PropTypes.shape({
    axes: PropTypes.object,
    labels: PropTypes.object,
    polygons: PropTypes.object
  }),
  tickFormat: PropTypes.func,
  width: PropTypes.number.isRequired,
  renderAxesOverPolygons: PropTypes.bool,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onSeriesMouseOver: PropTypes.func,
  onSeriesMouseOut: PropTypes.func
});
({
  animation: AnimationPropType,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    angle: PropTypes.number,
    className: PropTypes.string,
    label: PropTypes.string,
    radius: PropTypes.number,
    style: PropTypes.object
  })).isRequired,
  getAngle: PropTypes.func,
  getAngle0: PropTypes.func,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  getRadius: PropTypes.func,
  getRadius0: PropTypes.func,
  getLabel: PropTypes.func,
  height: PropTypes.number.isRequired,
  labelsAboveChildren: PropTypes.bool,
  labelsStyle: PropTypes.object,
  margin: MarginPropType,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  showLabels: PropTypes.bool,
  style: PropTypes.object,
  subLabel: PropTypes.func,
  width: PropTypes.number.isRequired
});
DISCRETE_COLOR_RANGE[1];
({
  align: PropTypes.oneOf(["justify", "left", "right", "center"]),
  className: PropTypes.string,
  hasVoronoi: PropTypes.bool,
  height: PropTypes.number.isRequired,
  hideLabels: PropTypes.bool,
  labelRotation: PropTypes.number,
  layout: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    target: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired
  })).isRequired,
  margin: MarginPropType,
  nodePadding: PropTypes.number,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodeWidth: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  onLinkClick: PropTypes.func,
  onLinkMouseOver: PropTypes.func,
  onLinkMouseOut: PropTypes.func,
  style: PropTypes.shape({
    links: PropTypes.object,
    rects: PropTypes.object,
    labels: PropTypes.object
  }),
  width: PropTypes.number.isRequired
});
function count(node) {
  var sum2 = 0, children = node.children, i2 = children && children.length;
  if (!i2)
    sum2 = 1;
  else
    while (--i2 >= 0)
      sum2 += children[i2].value;
  node.value = sum2;
}
function node_count() {
  return this.eachAfter(count);
}
function node_each(callback) {
  var node = this, current, next = [node], children, i2, n2;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children)
        for (i2 = 0, n2 = children.length; i2 < n2; ++i2) {
          next.push(children[i2]);
        }
    }
  } while (next.length);
  return this;
}
function node_eachBefore(callback) {
  var node = this, nodes = [node], children, i2;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children)
      for (i2 = children.length - 1; i2 >= 0; --i2) {
        nodes.push(children[i2]);
      }
  }
  return this;
}
function node_eachAfter(callback) {
  var node = this, nodes = [node], next = [], children, i2, n2;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children)
      for (i2 = 0, n2 = children.length; i2 < n2; ++i2) {
        nodes.push(children[i2]);
      }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
}
function node_sum(value) {
  return this.eachAfter(function(node) {
    var sum2 = +value(node.data) || 0, children = node.children, i2 = children && children.length;
    while (--i2 >= 0)
      sum2 += children[i2].value;
    node.value = sum2;
  });
}
function node_sort(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}
function node_path(end) {
  var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k2 = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k2, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a2, b) {
  if (a2 === b)
    return a2;
  var aNodes = a2.ancestors(), bNodes = b.ancestors(), c2 = null;
  a2 = aNodes.pop();
  b = bNodes.pop();
  while (a2 === b) {
    c2 = a2;
    a2 = aNodes.pop();
    b = bNodes.pop();
  }
  return c2;
}
function node_ancestors() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}
function node_descendants() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
}
function node_leaves() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}
function node_links() {
  var root2 = this, links = [];
  root2.each(function(node) {
    if (node !== root2) {
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}
function hierarchy(data, children) {
  var root2 = new Node$1(data), valued = +data.value && (root2.value = data.value), node, nodes = [root2], child, childs, i2, n2;
  if (children == null)
    children = defaultChildren;
  while (node = nodes.pop()) {
    if (valued)
      node.value = +node.data.value;
    if ((childs = children(node.data)) && (n2 = childs.length)) {
      node.children = new Array(n2);
      for (i2 = n2 - 1; i2 >= 0; --i2) {
        nodes.push(child = node.children[i2] = new Node$1(childs[i2]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root2.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function defaultChildren(d) {
  return d.children;
}
function copyData(node) {
  node.data = node.data.data;
}
function computeHeight(node) {
  var height = 0;
  do
    node.height = height;
  while ((node = node.parent) && node.height < ++height);
}
function Node$1(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node$1.prototype = hierarchy.prototype = {
  constructor: Node$1,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};
var slice = Array.prototype.slice;
function shuffle(array2) {
  var m2 = array2.length, t2, i2;
  while (m2) {
    i2 = Math.random() * m2-- | 0;
    t2 = array2[m2];
    array2[m2] = array2[i2];
    array2[i2] = t2;
  }
  return array2;
}
function enclose(circles2) {
  var i2 = 0, n2 = (circles2 = shuffle(slice.call(circles2))).length, B2 = [], p2, e3;
  while (i2 < n2) {
    p2 = circles2[i2];
    if (e3 && enclosesWeak(e3, p2))
      ++i2;
    else
      e3 = encloseBasis(B2 = extendBasis(B2, p2)), i2 = 0;
  }
  return e3;
}
function extendBasis(B2, p2) {
  var i2, j;
  if (enclosesWeakAll(p2, B2))
    return [p2];
  for (i2 = 0; i2 < B2.length; ++i2) {
    if (enclosesNot(p2, B2[i2]) && enclosesWeakAll(encloseBasis2(B2[i2], p2), B2)) {
      return [B2[i2], p2];
    }
  }
  for (i2 = 0; i2 < B2.length - 1; ++i2) {
    for (j = i2 + 1; j < B2.length; ++j) {
      if (enclosesNot(encloseBasis2(B2[i2], B2[j]), p2) && enclosesNot(encloseBasis2(B2[i2], p2), B2[j]) && enclosesNot(encloseBasis2(B2[j], p2), B2[i2]) && enclosesWeakAll(encloseBasis3(B2[i2], B2[j], p2), B2)) {
        return [B2[i2], B2[j], p2];
      }
    }
  }
  throw new Error();
}
function enclosesNot(a2, b) {
  var dr = a2.r - b.r, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}
function enclosesWeak(a2, b) {
  var dr = a2.r - b.r + 1e-6, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function enclosesWeakAll(a2, B2) {
  for (var i2 = 0; i2 < B2.length; ++i2) {
    if (!enclosesWeak(a2, B2[i2])) {
      return false;
    }
  }
  return true;
}
function encloseBasis(B2) {
  switch (B2.length) {
    case 1:
      return encloseBasis1(B2[0]);
    case 2:
      return encloseBasis2(B2[0], B2[1]);
    case 3:
      return encloseBasis3(B2[0], B2[1], B2[2]);
  }
}
function encloseBasis1(a2) {
  return {
    x: a2.x,
    y: a2.y,
    r: a2.r
  };
}
function encloseBasis2(a2, b) {
  var x12 = a2.x, y12 = a2.y, r1 = a2.r, x2 = b.x, y2 = b.y, r2 = b.r, x21 = x2 - x12, y21 = y2 - y12, r21 = r2 - r1, l2 = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x12 + x2 + x21 / l2 * r21) / 2,
    y: (y12 + y2 + y21 / l2 * r21) / 2,
    r: (l2 + r1 + r2) / 2
  };
}
function encloseBasis3(a2, b, c2) {
  var x12 = a2.x, y12 = a2.y, r1 = a2.r, x2 = b.x, y2 = b.y, r2 = b.r, x3 = c2.x, y3 = c2.y, r3 = c2.r, a22 = x12 - x2, a3 = x12 - x3, b2 = y12 - y2, b3 = y12 - y3, c22 = r2 - r1, c3 = r3 - r1, d1 = x12 * x12 + y12 * y12 - r1 * r1, d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2, d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3, ab2 = a3 * b2 - a22 * b3, xa = (b2 * d3 - b3 * d2) / (ab2 * 2) - x12, xb2 = (b3 * c22 - b2 * c3) / ab2, ya2 = (a3 * d2 - a22 * d3) / (ab2 * 2) - y12, yb2 = (a22 * c3 - a3 * c22) / ab2, A2 = xb2 * xb2 + yb2 * yb2 - 1, B2 = 2 * (r1 + xa * xb2 + ya2 * yb2), C2 = xa * xa + ya2 * ya2 - r1 * r1, r4 = -(A2 ? (B2 + Math.sqrt(B2 * B2 - 4 * A2 * C2)) / (2 * A2) : C2 / B2);
  return {
    x: x12 + xa + xb2 * r4,
    y: y12 + ya2 + yb2 * r4,
    r: r4
  };
}
function place(b, a2, c2) {
  var dx = b.x - a2.x, x2, a22, dy = b.y - a2.y, y2, b2, d2 = dx * dx + dy * dy;
  if (d2) {
    a22 = a2.r + c2.r, a22 *= a22;
    b2 = b.r + c2.r, b2 *= b2;
    if (a22 > b2) {
      x2 = (d2 + b2 - a22) / (2 * d2);
      y2 = Math.sqrt(Math.max(0, b2 / d2 - x2 * x2));
      c2.x = b.x - x2 * dx - y2 * dy;
      c2.y = b.y - x2 * dy + y2 * dx;
    } else {
      x2 = (d2 + a22 - b2) / (2 * d2);
      y2 = Math.sqrt(Math.max(0, a22 / d2 - x2 * x2));
      c2.x = a2.x + x2 * dx - y2 * dy;
      c2.y = a2.y + x2 * dy + y2 * dx;
    }
  } else {
    c2.x = a2.x + c2.r;
    c2.y = a2.y;
  }
}
function intersects(a2, b) {
  var dr = a2.r + b.r - 1e-6, dx = b.x - a2.x, dy = b.y - a2.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}
function score(node) {
  var a2 = node._, b = node.next._, ab2 = a2.r + b.r, dx = (a2.x * b.r + b.x * a2.r) / ab2, dy = (a2.y * b.r + b.y * a2.r) / ab2;
  return dx * dx + dy * dy;
}
function Node(circle2) {
  this._ = circle2;
  this.next = null;
  this.previous = null;
}
function packEnclose(circles2) {
  if (!(n2 = circles2.length))
    return 0;
  var a2, b, c2, n2, aa2, ca2, i2, j, k2, sj2, sk2;
  a2 = circles2[0], a2.x = 0, a2.y = 0;
  if (!(n2 > 1))
    return a2.r;
  b = circles2[1], a2.x = -b.r, b.x = a2.r, b.y = 0;
  if (!(n2 > 2))
    return a2.r + b.r;
  place(b, a2, c2 = circles2[2]);
  a2 = new Node(a2), b = new Node(b), c2 = new Node(c2);
  a2.next = c2.previous = b;
  b.next = a2.previous = c2;
  c2.next = b.previous = a2;
  pack:
    for (i2 = 3; i2 < n2; ++i2) {
      place(a2._, b._, c2 = circles2[i2]), c2 = new Node(c2);
      j = b.next, k2 = a2.previous, sj2 = b._.r, sk2 = a2._.r;
      do {
        if (sj2 <= sk2) {
          if (intersects(j._, c2._)) {
            b = j, a2.next = b, b.previous = a2, --i2;
            continue pack;
          }
          sj2 += j._.r, j = j.next;
        } else {
          if (intersects(k2._, c2._)) {
            a2 = k2, a2.next = b, b.previous = a2, --i2;
            continue pack;
          }
          sk2 += k2._.r, k2 = k2.previous;
        }
      } while (j !== k2.next);
      c2.previous = a2, c2.next = b, a2.next = b.previous = b = c2;
      aa2 = score(a2);
      while ((c2 = c2.next) !== b) {
        if ((ca2 = score(c2)) < aa2) {
          a2 = c2, aa2 = ca2;
        }
      }
      b = a2.next;
    }
  a2 = [b._], c2 = b;
  while ((c2 = c2.next) !== b)
    a2.push(c2._);
  c2 = enclose(a2);
  for (i2 = 0; i2 < n2; ++i2)
    a2 = circles2[i2], a2.x -= c2.x, a2.y -= c2.y;
  return c2.r;
}
function optional(f2) {
  return f2 == null ? null : required(f2);
}
function required(f2) {
  if (typeof f2 !== "function")
    throw new Error();
  return f2;
}
function constantZero() {
  return 0;
}
function constant(x2) {
  return function() {
    return x2;
  };
}
function defaultRadius(d) {
  return Math.sqrt(d.value);
}
function pack() {
  var radius = null, dx = 1, dy = 1, padding = constantZero;
  function pack2(root2) {
    root2.x = dx / 2, root2.y = dy / 2;
    if (radius) {
      root2.eachBefore(radiusLeaf(radius)).eachAfter(packChildren(padding, 0.5)).eachBefore(translateChild(1));
    } else {
      root2.eachBefore(radiusLeaf(defaultRadius)).eachAfter(packChildren(constantZero, 1)).eachAfter(packChildren(padding, root2.r / Math.min(dx, dy))).eachBefore(translateChild(Math.min(dx, dy) / (2 * root2.r)));
    }
    return root2;
  }
  pack2.radius = function(x2) {
    return arguments.length ? (radius = optional(x2), pack2) : radius;
  };
  pack2.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], pack2) : [dx, dy];
  };
  pack2.padding = function(x2) {
    return arguments.length ? (padding = typeof x2 === "function" ? x2 : constant(+x2), pack2) : padding;
  };
  return pack2;
}
function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}
function packChildren(padding, k2) {
  return function(node) {
    if (children = node.children) {
      var children, i2, n2 = children.length, r2 = padding(node) * k2 || 0, e3;
      if (r2)
        for (i2 = 0; i2 < n2; ++i2)
          children[i2].r += r2;
      e3 = packEnclose(children);
      if (r2)
        for (i2 = 0; i2 < n2; ++i2)
          children[i2].r -= r2;
      node.r = e3 + r2;
    }
  };
}
function translateChild(k2) {
  return function(node) {
    var parent = node.parent;
    node.r *= k2;
    if (parent) {
      node.x = parent.x + k2 * node.x;
      node.y = parent.y + k2 * node.y;
    }
  };
}
function roundNode(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}
function treemapDice(parent, x02, y02, x12, y12) {
  var nodes = parent.children, node, i2 = -1, n2 = nodes.length, k2 = parent.value && (x12 - x02) / parent.value;
  while (++i2 < n2) {
    node = nodes[i2], node.y0 = y02, node.y1 = y12;
    node.x0 = x02, node.x1 = x02 += node.value * k2;
  }
}
function partition() {
  var dx = 1, dy = 1, padding = 0, round = false;
  function partition2(root2) {
    var n2 = root2.height + 1;
    root2.x0 = root2.y0 = padding;
    root2.x1 = dx;
    root2.y1 = dy / n2;
    root2.eachBefore(positionNode(dy, n2));
    if (round)
      root2.eachBefore(roundNode);
    return root2;
  }
  function positionNode(dy2, n2) {
    return function(node) {
      if (node.children) {
        treemapDice(node, node.x0, dy2 * (node.depth + 1) / n2, node.x1, dy2 * (node.depth + 2) / n2);
      }
      var x02 = node.x0, y02 = node.y0, x12 = node.x1 - padding, y12 = node.y1 - padding;
      if (x12 < x02)
        x02 = x12 = (x02 + x12) / 2;
      if (y12 < y02)
        y02 = y12 = (y02 + y12) / 2;
      node.x0 = x02;
      node.y0 = y02;
      node.x1 = x12;
      node.y1 = y12;
    };
  }
  partition2.round = function(x2) {
    return arguments.length ? (round = !!x2, partition2) : round;
  };
  partition2.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], partition2) : [dx, dy];
  };
  partition2.padding = function(x2) {
    return arguments.length ? (padding = +x2, partition2) : padding;
  };
  return partition2;
}
function treemapSlice(parent, x02, y02, x12, y12) {
  var nodes = parent.children, node, i2 = -1, n2 = nodes.length, k2 = parent.value && (y12 - y02) / parent.value;
  while (++i2 < n2) {
    node = nodes[i2], node.x0 = x02, node.x1 = x12;
    node.y0 = y02, node.y1 = y02 += node.value * k2;
  }
}
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x02, y02, x12, y12) {
  var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n2 = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
  while (i0 < n2) {
    dx = x12 - x02, dy = y12 - y02;
    do
      sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n2);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; i1 < n2; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue)
        minValue = nodeValue;
      if (nodeValue > maxValue)
        maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) });
    if (row.dice)
      treemapDice(row, x02, y02, x12, value ? y02 += dy * sumValue / value : y12);
    else
      treemapSlice(row, x02, y02, value ? x02 += dx * sumValue / value : x12, y12);
    value -= sumValue, i0 = i1;
  }
  return rows;
}
var treemapSquarify = function custom8(ratio) {
  function squarify(parent, x02, y02, x12, y12) {
    squarifyRatio(ratio, parent, x02, y02, x12, y12);
  }
  squarify.ratio = function(x2) {
    return custom8((x2 = +x2) > 1 ? x2 : 1);
  };
  return squarify;
}(phi);
function treemap() {
  var tile = treemapSquarify, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
  function treemap2(root2) {
    root2.x0 = root2.y0 = 0;
    root2.x1 = dx;
    root2.y1 = dy;
    root2.eachBefore(positionNode);
    paddingStack = [0];
    if (round)
      root2.eachBefore(roundNode);
    return root2;
  }
  function positionNode(node) {
    var p2 = paddingStack[node.depth], x02 = node.x0 + p2, y02 = node.y0 + p2, x12 = node.x1 - p2, y12 = node.y1 - p2;
    if (x12 < x02)
      x02 = x12 = (x02 + x12) / 2;
    if (y12 < y02)
      y02 = y12 = (y02 + y12) / 2;
    node.x0 = x02;
    node.y0 = y02;
    node.x1 = x12;
    node.y1 = y12;
    if (node.children) {
      p2 = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x02 += paddingLeft(node) - p2;
      y02 += paddingTop(node) - p2;
      x12 -= paddingRight(node) - p2;
      y12 -= paddingBottom(node) - p2;
      if (x12 < x02)
        x02 = x12 = (x02 + x12) / 2;
      if (y12 < y02)
        y02 = y12 = (y02 + y12) / 2;
      tile(node, x02, y02, x12, y12);
    }
  }
  treemap2.round = function(x2) {
    return arguments.length ? (round = !!x2, treemap2) : round;
  };
  treemap2.size = function(x2) {
    return arguments.length ? (dx = +x2[0], dy = +x2[1], treemap2) : [dx, dy];
  };
  treemap2.tile = function(x2) {
    return arguments.length ? (tile = required(x2), treemap2) : tile;
  };
  treemap2.padding = function(x2) {
    return arguments.length ? treemap2.paddingInner(x2).paddingOuter(x2) : treemap2.paddingInner();
  };
  treemap2.paddingInner = function(x2) {
    return arguments.length ? (paddingInner = typeof x2 === "function" ? x2 : constant(+x2), treemap2) : paddingInner;
  };
  treemap2.paddingOuter = function(x2) {
    return arguments.length ? treemap2.paddingTop(x2).paddingRight(x2).paddingBottom(x2).paddingLeft(x2) : treemap2.paddingTop();
  };
  treemap2.paddingTop = function(x2) {
    return arguments.length ? (paddingTop = typeof x2 === "function" ? x2 : constant(+x2), treemap2) : paddingTop;
  };
  treemap2.paddingRight = function(x2) {
    return arguments.length ? (paddingRight = typeof x2 === "function" ? x2 : constant(+x2), treemap2) : paddingRight;
  };
  treemap2.paddingBottom = function(x2) {
    return arguments.length ? (paddingBottom = typeof x2 === "function" ? x2 : constant(+x2), treemap2) : paddingBottom;
  };
  treemap2.paddingLeft = function(x2) {
    return arguments.length ? (paddingLeft = typeof x2 === "function" ? x2 : constant(+x2), treemap2) : paddingLeft;
  };
  return treemap2;
}
function treemapBinary(parent, x02, y02, x12, y12) {
  var nodes = parent.children, i2, n2 = nodes.length, sum2, sums = new Array(n2 + 1);
  for (sums[0] = sum2 = i2 = 0; i2 < n2; ++i2) {
    sums[i2 + 1] = sum2 += nodes[i2].value;
  }
  partition2(0, n2, parent.value, x02, y02, x12, y12);
  function partition2(i3, j, value, x03, y03, x13, y13) {
    if (i3 >= j - 1) {
      var node = nodes[i3];
      node.x0 = x03, node.y0 = y03;
      node.x1 = x13, node.y1 = y13;
      return;
    }
    var valueOffset = sums[i3], valueTarget = value / 2 + valueOffset, k2 = i3 + 1, hi2 = j - 1;
    while (k2 < hi2) {
      var mid = k2 + hi2 >>> 1;
      if (sums[mid] < valueTarget)
        k2 = mid + 1;
      else
        hi2 = mid;
    }
    if (valueTarget - sums[k2 - 1] < sums[k2] - valueTarget && i3 + 1 < k2)
      --k2;
    var valueLeft = sums[k2] - valueOffset, valueRight = value - valueLeft;
    if (x13 - x03 > y13 - y03) {
      var xk2 = (x03 * valueRight + x13 * valueLeft) / value;
      partition2(i3, k2, valueLeft, x03, y03, xk2, y13);
      partition2(k2, j, valueRight, xk2, y03, x13, y13);
    } else {
      var yk2 = (y03 * valueRight + y13 * valueLeft) / value;
      partition2(i3, k2, valueLeft, x03, y03, x13, yk2);
      partition2(k2, j, valueRight, x03, yk2, x13, y13);
    }
  }
}
function treemapSliceDice(parent, x02, y02, x12, y12) {
  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x02, y02, x12, y12);
}
var treemapResquarify = function custom9(ratio) {
  function resquarify(parent, x02, y02, x12, y12) {
    if ((rows = parent._squarify) && rows.ratio === ratio) {
      var rows, row, nodes, i2, j = -1, n2, m2 = rows.length, value = parent.value;
      while (++j < m2) {
        row = rows[j], nodes = row.children;
        for (i2 = row.value = 0, n2 = nodes.length; i2 < n2; ++i2)
          row.value += nodes[i2].value;
        if (row.dice)
          treemapDice(row, x02, y02, x12, y02 += (y12 - y02) * row.value / value);
        else
          treemapSlice(row, x02, y02, x02 += (x12 - x02) * row.value / value, y12);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x02, y02, x12, y12);
      rows.ratio = ratio;
    }
  }
  resquarify.ratio = function(x2) {
    return custom9((x2 = +x2) > 1 ? x2 : 1);
  };
  return resquarify;
}(phi);
({
  animation: AnimationPropType,
  getAngle: PropTypes.func,
  getAngle0: PropTypes.func,
  className: PropTypes.string,
  colorType: PropTypes.string,
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideRootNode: PropTypes.bool,
  getLabel: PropTypes.func,
  onValueClick: PropTypes.func,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func,
  getSize: PropTypes.func,
  width: PropTypes.number.isRequired,
  padAngle: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
});
var _extends$4 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var ANIMATED_PROPS = ["colorRange", "colorDomain", "color", "opacityRange", "opacityDomain", "opacity", "x0", "x1", "y0", "y1", "r"];
function TreemapLeaf(props) {
  var animation = props.animation, getLabel3 = props.getLabel, mode = props.mode, node = props.node, onLeafClick = props.onLeafClick, onLeafMouseOver = props.onLeafMouseOver, onLeafMouseOut = props.onLeafMouseOut, r2 = props.r, scales = props.scales, x02 = props.x0, x12 = props.x1, y02 = props.y0, y12 = props.y1, style = props.style;
  if (animation) {
    return React.createElement(Animation, _extends$4({}, props, { animatedProps: ANIMATED_PROPS }), React.createElement(TreemapLeaf, _extends$4({}, props, { animation: null })));
  }
  var useCirclePacking = mode === "circlePack";
  var background = scales.color(node);
  var opacity = scales.opacity(node);
  var color2 = getFontColorFromBackground(background);
  var data = node.data;
  var title = getLabel3(data);
  var leafStyle = _extends$4({
    top: useCirclePacking ? y02 - r2 : y02,
    left: useCirclePacking ? x02 - r2 : x02,
    width: useCirclePacking ? r2 * 2 : x12 - x02,
    height: useCirclePacking ? r2 * 2 : y12 - y02,
    background,
    opacity,
    color: color2
  }, style, node.data.style);
  return React.createElement("div", {
    className: "rv-treemap__leaf " + (useCirclePacking ? "rv-treemap__leaf--circle" : ""),
    onMouseEnter: function onMouseEnter(event) {
      return onLeafMouseOver(node, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return onLeafMouseOut(node, event);
    },
    onClick: function onClick(event) {
      return onLeafClick(node, event);
    },
    style: leafStyle
  }, React.createElement("div", { className: "rv-treemap__leaf__content" }, title));
}
TreemapLeaf.propTypes = {
  animation: AnimationPropType,
  height: PropTypes.number.isRequired,
  mode: PropTypes.string,
  node: PropTypes.object.isRequired,
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  scales: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  x0: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y0: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired
};
var _extends$3 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function TreemapDOM(props) {
  var animation = props.animation, className = props.className, height = props.height, hideRootNode = props.hideRootNode, getLabel3 = props.getLabel, mode = props.mode, nodes = props.nodes, width = props.width, scales = props.scales, style = props.style;
  var useCirclePacking = mode === "circlePack";
  return React.createElement("div", {
    className: "rv-treemap " + (useCirclePacking ? "rv-treemap-circle-packed" : "") + " " + className,
    style: { height, width }
  }, nodes.map(function(node, index) {
    if (hideRootNode && !index) {
      return null;
    }
    var nodeProps = _extends$3({
      animation,
      node,
      getLabel: getLabel3
    }, props, {
      x0: useCirclePacking ? node.x : node.x0,
      x1: useCirclePacking ? node.x : node.x1,
      y0: useCirclePacking ? node.y : node.y0,
      y1: useCirclePacking ? node.y : node.y1,
      r: useCirclePacking ? node.r : 1,
      scales,
      style
    });
    return React.createElement(TreemapLeaf, _extends$3({}, nodeProps, { key: "leaf-" + index }));
  }));
}
TreemapDOM.displayName = "TreemapDOM";
var _extends$2 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$2 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$2(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var MARGIN_ADJUST = 1.2;
var TreemapSVG = function(_React$Component) {
  _inherits$2(TreemapSVG2, _React$Component);
  function TreemapSVG2() {
    _classCallCheck$2(this, TreemapSVG2);
    return _possibleConstructorReturn$2(this, (TreemapSVG2.__proto__ || Object.getPrototypeOf(TreemapSVG2)).apply(this, arguments));
  }
  _createClass$2(TreemapSVG2, [{
    key: "getCircularNodes",
    value: function getCircularNodes() {
      var _props = this.props, animation = _props.animation, hideRootNode = _props.hideRootNode, nodes = _props.nodes, onLeafMouseOver = _props.onLeafMouseOver, onLeafMouseOut = _props.onLeafMouseOut, onLeafClick = _props.onLeafClick, scales = _props.scales, style = _props.style;
      var _nodes$reduce = nodes.reduce(function(acc, node, index) {
        if (!index && hideRootNode) {
          return acc;
        }
        var x2 = node.x, y2 = node.y, r2 = node.r;
        return {
          maxY: Math.max(y2 + r2, acc.maxY),
          minY: Math.min(y2 - r2, acc.minY),
          maxX: Math.max(x2 + MARGIN_ADJUST * r2, acc.maxX),
          minX: Math.min(x2 - MARGIN_ADJUST * r2, acc.minX),
          rows: acc.rows.concat([{
            x: x2,
            y: y2,
            size: r2,
            color: scales.color(node)
          }])
        };
      }, {
        rows: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      }), rows = _nodes$reduce.rows, minY = _nodes$reduce.minY, maxY = _nodes$reduce.maxY, minX = _nodes$reduce.minX, maxX = _nodes$reduce.maxX;
      return {
        updatedNodes: React.createElement(MarkSeries, {
          animation,
          className: "rv-treemap__leaf rv-treemap__leaf--circle",
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data: rows,
          colorType: "literal",
          getColor: function getColor2(d) {
            return d.color;
          },
          sizeType: "literal",
          getSize: function getSize2(d) {
            return d.size;
          },
          style
        }),
        minY,
        maxY,
        minX,
        maxX
      };
    }
  }, {
    key: "getNonCircularNodes",
    value: function getNonCircularNodes() {
      var _props2 = this.props, animation = _props2.animation, hideRootNode = _props2.hideRootNode, nodes = _props2.nodes, onLeafMouseOver = _props2.onLeafMouseOver, onLeafMouseOut = _props2.onLeafMouseOut, onLeafClick = _props2.onLeafClick, scales = _props2.scales, style = _props2.style;
      var color2 = scales.color;
      return nodes.reduce(function(acc, node, index) {
        if (!index && hideRootNode) {
          return acc;
        }
        var x02 = node.x0, x12 = node.x1, y12 = node.y1, y02 = node.y0;
        var x2 = x02;
        var y2 = y02;
        var nodeHeight = y12 - y02;
        var nodeWidth = x12 - x02;
        acc.maxY = Math.max(y2 + nodeHeight, acc.maxY);
        acc.minY = Math.min(y2, acc.minY);
        acc.maxX = Math.max(x2 + nodeWidth, acc.maxX);
        acc.minX = Math.min(x2, acc.minX);
        var data = [{ x: x2, y: y2 }, { x: x2, y: y2 + nodeHeight }, { x: x2 + nodeWidth, y: y2 + nodeHeight }, { x: x2 + nodeWidth, y: y2 }];
        acc.updatedNodes = acc.updatedNodes.concat([React.createElement(PolygonSeries, {
          animation,
          className: "rv-treemap__leaf",
          key: index,
          color: color2(node),
          type: "literal",
          onSeriesMouseEnter: onLeafMouseOver,
          onSeriesMouseLeave: onLeafMouseOut,
          onSeriesClick: onLeafClick,
          data,
          style: _extends$2({}, style, node.style)
        })]);
        return acc;
      }, {
        updatedNodes: [],
        maxY: -Infinity,
        minY: Infinity,
        maxX: -Infinity,
        minX: Infinity
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props, className = _props3.className, height = _props3.height, mode = _props3.mode, nodes = _props3.nodes, width = _props3.width;
      var useCirclePacking = mode === "circlePack";
      var _ref = useCirclePacking ? this.getCircularNodes() : this.getNonCircularNodes(), minY = _ref.minY, maxY = _ref.maxY, minX = _ref.minX, maxX = _ref.maxX, updatedNodes = _ref.updatedNodes;
      var labels = nodes.reduce(function(acc, node) {
        if (!node.data.title) {
          return acc;
        }
        return acc.concat(_extends$2({}, node.data, {
          x: node.x0 || node.x,
          y: node.y0 || node.y,
          label: "" + node.data.title
        }));
      }, []);
      return React.createElement(XYPlot, _extends$2({
        className: "rv-treemap " + (useCirclePacking ? "rv-treemap-circle-packed" : "") + " " + className,
        width,
        height,
        yDomain: [maxY, minY],
        xDomain: [minX, maxX],
        colorType: "literal",
        hasTreeStructure: true
      }, this.props), updatedNodes, React.createElement(LabelSeries, { data: labels }));
    }
  }]);
  return TreemapSVG2;
}(React.Component);
TreemapSVG.displayName = "TreemapSVG";
var _createClass$1 = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
var _extends$1 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$1(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var TREEMAP_TILE_MODES = {
  squarify: treemapSquarify,
  resquarify: treemapResquarify,
  slice: treemapSlice,
  dice: treemapDice,
  slicedice: treemapSliceDice,
  binary: treemapBinary
};
var TREEMAP_LAYOUT_MODES = ["circlePack", "partition", "partition-pivot"];
var NOOP = function NOOP2(d) {
  return d;
};
var ATTRIBUTES = ["opacity", "color"];
var DEFAULT_MARGINS = {
  left: 40,
  right: 10,
  top: 10,
  bottom: 40
};
function _getScaleFns(props) {
  var data = props.data;
  var allData = data.children || [];
  var compatibleProps = _extends$1({}, props, getMissingScaleProps(props, allData, ATTRIBUTES), {
    _allData: allData
  });
  return {
    opacity: getAttributeFunctor(compatibleProps, "opacity"),
    color: getAttributeFunctor(compatibleProps, "color")
  };
}
var Treemap = function(_React$Component) {
  _inherits$1(Treemap2, _React$Component);
  function Treemap2(props) {
    _classCallCheck$1(this, Treemap2);
    var _this = _possibleConstructorReturn$1(this, (Treemap2.__proto__ || Object.getPrototypeOf(Treemap2)).call(this, props));
    _this.state = _extends$1({
      scales: _getScaleFns(props)
    }, getInnerDimensions(props, props.margin));
    return _this;
  }
  _createClass$1(Treemap2, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState(_extends$1({
        scales: _getScaleFns(props)
      }, getInnerDimensions(props, props.margin)));
    }
  }, {
    key: "_getNodesToRender",
    value: function _getNodesToRender() {
      var _state = this.state, innerWidth = _state.innerWidth, innerHeight = _state.innerHeight;
      var _props = this.props, data = _props.data, mode = _props.mode, padding = _props.padding, sortFunction2 = _props.sortFunction, getSize2 = _props.getSize;
      if (!data) {
        return [];
      }
      if (mode === "partition" || mode === "partition-pivot") {
        var partitionFunction = partition().size(mode === "partition-pivot" ? [innerHeight, innerWidth] : [innerWidth, innerHeight]).padding(padding);
        var _structuredInput = hierarchy(data).sum(getSize2).sort(function(a2, b) {
          return sortFunction2(a2, b, getSize2);
        });
        var mappedNodes = partitionFunction(_structuredInput).descendants();
        if (mode === "partition-pivot") {
          return mappedNodes.map(function(node) {
            return _extends$1({}, node, {
              x0: node.y0,
              x1: node.y1,
              y0: node.x0,
              y1: node.x1
            });
          });
        }
        return mappedNodes;
      }
      if (mode === "circlePack") {
        var packingFunction = pack().size([innerWidth, innerHeight]).padding(padding);
        var _structuredInput2 = hierarchy(data).sum(getSize2).sort(function(a2, b) {
          return sortFunction2(a2, b, getSize2);
        });
        return packingFunction(_structuredInput2).descendants();
      }
      var tileFn = TREEMAP_TILE_MODES[mode];
      var treemapingFunction = treemap().tile(tileFn).size([innerWidth, innerHeight]).padding(padding);
      var structuredInput = hierarchy(data).sum(getSize2).sort(function(a2, b) {
        return sortFunction2(a2, b, getSize2);
      });
      return treemapingFunction(structuredInput).descendants();
    }
  }, {
    key: "render",
    value: function render() {
      var renderMode = this.props.renderMode;
      var scales = this.state.scales;
      var nodes = this._getNodesToRender();
      var TreemapElement = renderMode === "SVG" ? TreemapSVG : TreemapDOM;
      return React.createElement(TreemapElement, _extends$1({}, this.props, { nodes, scales }));
    }
  }]);
  return Treemap2;
}(React.Component);
Treemap.displayName = "Treemap";
Treemap.propTypes = {
  animation: AnimationPropType,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  hideRootNode: PropTypes.bool,
  margin: MarginPropType,
  mode: PropTypes.oneOf(Object.keys(TREEMAP_TILE_MODES).concat(TREEMAP_LAYOUT_MODES)),
  onLeafClick: PropTypes.func,
  onLeafMouseOver: PropTypes.func,
  onLeafMouseOut: PropTypes.func,
  useCirclePacking: PropTypes.bool,
  padding: PropTypes.number.isRequired,
  sortFunction: PropTypes.func,
  width: PropTypes.number.isRequired,
  getSize: PropTypes.func,
  getColor: PropTypes.func
};
Treemap.defaultProps = {
  className: "",
  colorRange: CONTINUOUS_COLOR_RANGE,
  _colorValue: DEFAULT_COLOR$1,
  data: {
    children: []
  },
  hideRootNode: false,
  margin: DEFAULT_MARGINS,
  mode: "squarify",
  onLeafClick: NOOP,
  onLeafMouseOver: NOOP,
  onLeafMouseOut: NOOP,
  opacityType: OPACITY_TYPE,
  _opacityValue: DEFAULT_OPACITY,
  padding: 1,
  sortFunction: function sortFunction(a2, b, accessor) {
    if (!accessor) {
      return 0;
    }
    return accessor(a2) - accessor(b);
  },
  getSize: function getSize(d) {
    return d.size;
  },
  getColor: function getColor(d) {
    return d.color;
  },
  getLabel: function getLabel2(d) {
    return d.title;
  }
};
var win;
if (typeof window !== "undefined") {
  win = window;
} else if (typeof commonjsGlobal !== "undefined") {
  win = commonjsGlobal;
} else if (typeof self !== "undefined") {
  win = self;
} else {
  win = {};
}
var window_1 = win;
var _extends = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = function() {
  function defineProperties2(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties2(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties2(Constructor, staticProps);
    return Constructor;
  };
}();
function _objectWithoutProperties(obj, keys3) {
  var target = {};
  for (var i2 in obj) {
    if (keys3.indexOf(i2) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i2))
      continue;
    target[i2] = obj[i2];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var CONTAINER_REF = "container";
var resizeSubscribers = [];
var DEBOUNCE_DURATION = 100;
var timeoutId = null;
function debounceEmitResize() {
  window_1.clearTimeout(timeoutId);
  timeoutId = window_1.setTimeout(emitResize, DEBOUNCE_DURATION);
}
function emitResize() {
  resizeSubscribers.forEach(function(cb2) {
    return cb2();
  });
}
function subscribeToDebouncedResize(cb2) {
  resizeSubscribers.push(cb2);
  if (resizeSubscribers.length === 1) {
    window_1.addEventListener("resize", debounceEmitResize);
  }
  return function unsubscribe() {
    removeSubscriber(cb2);
    if (resizeSubscribers.length === 0) {
      window_1.clearTimeout(timeoutId);
      window_1.removeEventListener("resize", debounceEmitResize);
    }
  };
}
function removeSubscriber(cb2) {
  var index = resizeSubscribers.indexOf(cb2);
  if (index > -1) {
    resizeSubscribers.splice(index, 1);
  }
}
function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
function makeFlexible(Component, isWidthFlexible, isHeightFlexible) {
  var ResultClass = function(_React$Component) {
    _inherits(ResultClass2, _React$Component);
    _createClass(ResultClass2, null, [{
      key: "propTypes",
      get: function get() {
        var _Component$propTypes = Component.propTypes;
        _Component$propTypes.height;
        _Component$propTypes.width;
        var otherPropTypes = _objectWithoutProperties(_Component$propTypes, ["height", "width"]);
        return otherPropTypes;
      }
    }]);
    function ResultClass2(props) {
      _classCallCheck(this, ResultClass2);
      var _this = _possibleConstructorReturn(this, (ResultClass2.__proto__ || Object.getPrototypeOf(ResultClass2)).call(this, props));
      _this._onResize = function() {
        var containerElement = getDOMNode(_this[CONTAINER_REF]);
        var offsetHeight = containerElement.offsetHeight, offsetWidth = containerElement.offsetWidth;
        var newHeight = _this.state.height === offsetHeight ? {} : { height: offsetHeight };
        var newWidth = _this.state.width === offsetWidth ? {} : { width: offsetWidth };
        _this.setState(_extends({}, newHeight, newWidth));
      };
      _this.state = {
        height: 0,
        width: 0
      };
      return _this;
    }
    _createClass(ResultClass2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._onResize();
        this.cancelSubscription = subscribeToDebouncedResize(this._onResize);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps() {
        this._onResize();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.cancelSubscription();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _state = this.state, height = _state.height, width = _state.width;
        var props = _extends({}, this.props, {
          animation: height === 0 && width === 0 ? null : this.props.animation
        });
        var updatedDimensions = _extends({}, isHeightFlexible ? { height } : {}, isWidthFlexible ? { width } : {});
        return React.createElement("div", {
          ref: function ref(_ref) {
            return _this2[CONTAINER_REF] = _ref;
          },
          style: { width: "100%", height: "100%" }
        }, React.createElement(Component, _extends({}, updatedDimensions, props)));
      }
    }]);
    return ResultClass2;
  }(React.Component);
  ResultClass.displayName = "Flexible" + getDisplayName(Component);
  return ResultClass;
}
function makeHeightFlexible(component) {
  return makeFlexible(component, false, true);
}
function makeVisFlexible(component) {
  return makeFlexible(component, true, true);
}
function makeWidthFlexible(component) {
  return makeFlexible(component, true, false);
}
makeWidthFlexible(XYPlot);
makeHeightFlexible(XYPlot);
makeVisFlexible(XYPlot);
async function performQuery(query, options) {
  const response = await fetch("http://localhost:20777/api/v1/query/range", {
    method: "POST",
    body: JSON.stringify({
      query,
      from: options == null ? void 0 : options.from,
      to: options == null ? void 0 : options.to,
      interval: options == null ? void 0 : options.interval,
      maxSamples: options == null ? void 0 : options.maxSamples
    })
  });
  const body = await response.json();
  if (response.status !== 200) {
    const error = body;
    throw new Error(error.message);
  }
  return body;
}
async function fetchLabels(from, to) {
  const query = new URLSearchParams();
  query.set("from", from);
  query.set("to", to);
  const response = await fetch(`http://localhost:20777/api/v1/labels?${query.toString()}`, {
    method: "GET"
  });
  const body = await response.json();
  if (response.status !== 200) {
    const error = body;
    throw new Error(error.message);
  }
  return body;
}
async function fetchLabelValues(label, from, to) {
  const query = new URLSearchParams();
  query.set("from", from);
  query.set("to", to);
  const response = await fetch(`http://localhost:20777/api/v1/labels/${encodeURIComponent(label)}?${query.toString()}`, {
    method: "GET"
  });
  const body = await response.json();
  if (response.status !== 200) {
    const error = body;
    throw new Error(error.message);
  }
  return body;
}
async function fetchAllLabelsWithValues() {
  const from = "0s";
  const to = "2h";
  const result = {};
  const labels = await fetchLabels(from, to);
  const values = await Promise.all(labels.labels.map((label) => fetchLabelValues(label, from, to)));
  for (let i2 = 0; i2 < labels.labels.length; i2++) {
    result[labels.labels[i2]] = values[i2].values;
  }
  return result;
}
function convertSeriesToPoints(series) {
  return series[0].values.reduce((points, [x2, y2]) => ({ ...points, [x2]: Number(y2) }), {});
}
window.api = {
  performQuery,
  fetchLabels,
  fetchLabelValues,
  fetchAllLabelsWithValues
};
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var withSelector = { exports: {} };
var withSelector_production_min = {};
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e = react.exports;
function h$1(a2, b) {
  return a2 === b && (a2 !== 0 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var k = typeof Object.is === "function" ? Object.is : h$1, l = e.useState, m = e.useEffect, n$1 = e.useLayoutEffect, p$1 = e.useDebugValue;
function q$1(a2, b) {
  var d = b(), f2 = l({ inst: { value: d, getSnapshot: b } }), c2 = f2[0].inst, g = f2[1];
  n$1(function() {
    c2.value = d;
    c2.getSnapshot = b;
    r$1(c2) && g({ inst: c2 });
  }, [a2, d, b]);
  m(function() {
    r$1(c2) && g({ inst: c2 });
    return a2(function() {
      r$1(c2) && g({ inst: c2 });
    });
  }, [a2]);
  p$1(d);
  return d;
}
function r$1(a2) {
  var b = a2.getSnapshot;
  a2 = a2.value;
  try {
    var d = b();
    return !k(a2, d);
  } catch (f2) {
    return true;
  }
}
function t$1(a2, b) {
  return b();
}
var u$1 = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? t$1 : q$1;
useSyncExternalStoreShim_production_min.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u$1;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h = react.exports, n = shim.exports;
function p(a2, b) {
  return a2 === b && (a2 !== 0 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var q = typeof Object.is === "function" ? Object.is : p, r = n.useSyncExternalStore, t = h.useRef, u = h.useEffect, v = h.useMemo, w = h.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a2, b, e3, l2, g) {
  var c2 = t(null);
  if (c2.current === null) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v(function() {
    function a3(a4) {
      if (!c3) {
        c3 = true;
        d2 = a4;
        a4 = l2(a4);
        if (g !== void 0 && f2.hasValue) {
          var b2 = f2.value;
          if (g(b2, a4))
            return k2 = b2;
        }
        return k2 = a4;
      }
      b2 = k2;
      if (q(d2, a4))
        return b2;
      var e4 = l2(a4);
      if (g !== void 0 && g(b2, e4))
        return b2;
      d2 = a4;
      return k2 = e4;
    }
    var c3 = false, d2, k2, m2 = e3 === void 0 ? null : e3;
    return [function() {
      return a3(b());
    }, m2 === null ? void 0 : function() {
      return a3(m2());
    }];
  }, [b, e3, l2, g]);
  var d = r(a2, c2[0], c2[1]);
  u(function() {
    f2.hasValue = true;
    f2.value = d;
  }, [d]);
  w(d);
  return d;
};
{
  withSelector.exports = withSelector_production_min;
}
var useSyncExternalStoreExports = withSelector.exports;
const { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
function useStore$1(api, selector = api.getState, equalityFn) {
  const slice2 = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
  react.exports.useDebugValue(slice2);
  return slice2;
}
const createImpl = (createState) => {
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore$1(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var create$1 = create;
const toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e3) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e3);
      }
    };
  }
};
const persistImpl = (config, baseOptions) => (set2, get, api) => {
  let options = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options.getStorage();
  } catch (e3) {
  }
  if (!storage) {
    return config((...args) => {
      console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
      set2(...args);
    }, get, api);
  }
  const thenableSerialize = toThenable(options.serialize);
  const setItem = () => {
    const state = options.partialize({ ...get() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options.version }).then((serializedValue) => storage.setItem(options.name, serializedValue)).catch((e3) => {
      errorInSync = e3;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config((...args) => {
    set2(...args);
    void setItem();
  }, get, api);
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb2) => cb2(get()));
    const postRehydrationCallback = ((_a = options.onRehydrateStorage) == null ? void 0 : _a.call(options, get())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((storageValue) => {
      if (storageValue) {
        return options.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
          }
          console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
      set2(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb2) => cb2(stateFromStorage));
    }).catch((e3) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e3);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb2) => {
      hydrationListeners.add(cb2);
      return () => {
        hydrationListeners.delete(cb2);
      };
    },
    onFinishHydration: (cb2) => {
      finishHydrationListeners.add(cb2);
      return () => {
        finishHydrationListeners.delete(cb2);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
const persist = persistImpl;
function GetItem(arg1) {
  return window["go"]["app"]["App"]["GetItem"](arg1);
}
function RemoveItem(arg1) {
  window["go"]["app"]["App"]["RemoveItem"](arg1);
}
function SetItem(arg1, arg2) {
  window["go"]["app"]["App"]["SetItem"](arg1, arg2);
}
const useStore = create$1()(persist((set2) => ({
  dismissedHints: [],
  dismissHint: (hint) => set2((state) => ({
    dismissedHints: Array.from(/* @__PURE__ */ new Set([...state.dismissedHints, hint]))
  })),
  resetHints: () => set2(() => ({ dismissedHints: [] })),
  queryHistory: [],
  setQueryHistory: (queries) => set2(() => ({ queryHistory: queries })),
  clearQueries: () => set2(() => ({ queryHistory: [] }))
}), {
  name: "store",
  getStorage: () => "go" in window ? { getItem: GetItem, setItem: SetItem, removeItem: RemoveItem } : window.localStorage
}));
function Tip({
  uuid,
  children
}) {
  const [dismissedHints, dismissHint] = useStore((state) => [state.dismissedHints, state.dismissHint]);
  if (dismissedHints.includes(uuid)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "card",
    children: [children, /* @__PURE__ */ jsx("button", {
      className: "mt-2",
      onClick: () => dismissHint(uuid),
      children: "Dismiss"
    })]
  });
}
var graphs = /* @__PURE__ */ (() => ".react-vis-magic-css-import-rule{display:inherit}.rv-treemap{font-size:12px;position:relative}.rv-treemap__leaf{overflow:hidden;position:absolute}.rv-treemap__leaf--circle{align-items:center;border-radius:100%;display:flex;justify-content:center}.rv-treemap__leaf__content{overflow:hidden;padding:10px;text-overflow:ellipsis}.rv-xy-plot{color:#c3c3c3;position:relative}.rv-xy-plot canvas{pointer-events:none}.rv-xy-plot .rv-xy-canvas{pointer-events:none;position:absolute}.rv-xy-plot__inner{display:block}.rv-xy-plot__axis__line{fill:none;stroke-width:2px;stroke:#e6e6e9}.rv-xy-plot__axis__tick__line{stroke:#e6e6e9}.rv-xy-plot__axis__tick__text{fill:#6b6b76;font-size:11px}.rv-xy-plot__axis__title text{fill:#6b6b76;font-size:11px}.rv-xy-plot__grid-lines__line{stroke:#e6e6e9}.rv-xy-plot__circular-grid-lines__line{fill-opacity:0;stroke:#e6e6e9}.rv-xy-plot__series,.rv-xy-plot__series path{pointer-events:all}.rv-xy-plot__series--line{fill:none;stroke:#000;stroke-width:2px}.rv-crosshair{position:absolute;font-size:11px;pointer-events:none}.rv-crosshair__line{background:#47d3d9;width:1px}.rv-crosshair__inner{position:absolute;text-align:left;top:0}.rv-crosshair__inner__content{border-radius:4px;background:#3a3a48;color:#fff;font-size:12px;padding:7px 10px;box-shadow:0 2px 4px rgba(0,0,0,0.5)}.rv-crosshair__inner--left{right:4px}.rv-crosshair__inner--right{left:4px}.rv-crosshair__title{font-weight:bold;white-space:nowrap}.rv-crosshair__item{white-space:nowrap}.rv-hint{position:absolute;pointer-events:none}.rv-hint__content{border-radius:4px;padding:7px 10px;font-size:12px;background:#3a3a48;box-shadow:0 2px 4px rgba(0,0,0,0.5);color:#fff;text-align:left;white-space:nowrap}.rv-discrete-color-legend{box-sizing:border-box;overflow-y:auto;font-size:12px}.rv-discrete-color-legend.horizontal{white-space:nowrap}.rv-discrete-color-legend-item{color:#3a3a48;border-radius:1px;padding:9px 10px}.rv-discrete-color-legend-item.horizontal{display:inline-block}.rv-discrete-color-legend-item.horizontal .rv-discrete-color-legend-item__title{margin-left:0;display:block}.rv-discrete-color-legend-item__color{display:inline-block;vertical-align:middle;overflow:visible}.rv-discrete-color-legend-item__color__path{stroke:#dcdcdc;stroke-width:2px}.rv-discrete-color-legend-item__title{margin-left:10px}.rv-discrete-color-legend-item.disabled{color:#b8b8b8}.rv-discrete-color-legend-item.clickable{cursor:pointer}.rv-discrete-color-legend-item.clickable:hover{background:#f9f9f9}.rv-search-wrapper{display:flex;flex-direction:column}.rv-search-wrapper__form{flex:0}.rv-search-wrapper__form__input{width:100%;color:#a6a6a5;border:1px solid #e5e5e4;padding:7px 10px;font-size:12px;box-sizing:border-box;border-radius:2px;margin:0 0 9px;outline:0}.rv-search-wrapper__contents{flex:1;overflow:auto}.rv-continuous-color-legend{font-size:12px}.rv-continuous-color-legend .rv-gradient{height:4px;border-radius:2px;margin-bottom:5px}.rv-continuous-size-legend{font-size:12px}.rv-continuous-size-legend .rv-bubbles{text-align:justify;overflow:hidden;margin-bottom:5px;width:100%}.rv-continuous-size-legend .rv-bubble{background:#d8d9dc;display:inline-block;vertical-align:bottom}.rv-continuous-size-legend .rv-spacer{display:inline-block;font-size:0;line-height:0;width:100%}.rv-legend-titles{height:16px;position:relative}.rv-legend-titles__left,.rv-legend-titles__right,.rv-legend-titles__center{position:absolute;white-space:nowrap;overflow:hidden}.rv-legend-titles__center{display:block;text-align:center;width:100%}.rv-legend-titles__right{right:0}.rv-radial-chart .rv-xy-plot__series--label{pointer-events:none}.rv-xy-plot{\n  /* @apply rounded-md p-2 bg-slate-600 m-0 my-2 box-content; */\n}.rv-xy-plot__axis__tick__text {\n  /* @apply text-base fill-white; */\n  font-size:0.75rem;\n  line-height:1rem;\n  --tw-text-opacity:1;\n  color:rgb(100 116 139 / var(--tw-text-opacity));\n}.rv-xy-plot__axis__line{display:none}.rv-xy-plot__grid-lines__line,  .rv-xy-plot__axis__tick__line{stroke:#64748b}.rv-xy-plot__axis__title text{font-size:0.75rem;line-height:1rem;--tw-text-opacity:1;color:rgb(100 116 139 / var(--tw-text-opacity))}.rv-crosshair{top:0px !important;height:100%}/* .rv-crosshair__inner {\n  @apply hidden;\n} */.rv-crosshair__line{height:100% !important;--tw-bg-opacity:1;background-color:rgb(226 232 240 / var(--tw-bg-opacity))}.rv-crosshair__title{display:none}\n")();
const FlexibleXYPlot = makeWidthFlexible(XYPlot);
async function findSectors(car, session, options) {
  const data = await performQuery(`changes(sector{car="${car}",session="${session}"}[1s]) * (sector{car="${car}",session="${session}"} + 1) != 0`, {
    ...options,
    interval: "1s",
    maxSamples: 1e4
  });
  return data.result[0].values.filter(([_, y2]) => y2 !== "0").reduce((sectors, [x2, y2]) => ({
    ...sectors,
    [x2]: Number(y2)
  }), {});
}
async function findLaps(car, session, options) {
  const data = await performQuery(`changes(lap{car="${car}",session="${session}"}[1s]) * lap{car="${car}",session="${session}"} != 0`, {
    ...options,
    interval: "1s",
    maxSamples: 1e4
  });
  return data.result[0].values.filter(([_, y2]) => y2 !== "0").reduce((sectors, [x2, y2]) => ({
    ...sectors,
    [x2]: Number(y2)
  }), {});
}
function GraphPage() {
  const [crosshairX, setCrosshairX] = react.exports.useState(-1);
  const [loading, setLoading] = react.exports.useState(false);
  const [showGraph, setShowGraph] = react.exports.useState(false);
  const [sessions, setSessions] = react.exports.useState([]);
  const [session, setSession] = react.exports.useState("");
  const [car, setCar] = react.exports.useState("");
  const [brake, setBrake] = react.exports.useState({});
  const [drs, setDRS] = react.exports.useState({});
  const [gears, setGears] = react.exports.useState({});
  const [speed, setSpeed] = react.exports.useState({});
  const [steering, setSteering] = react.exports.useState({});
  const [throttle, setThrottle] = react.exports.useState({});
  const [sectors, setSectors] = react.exports.useState({});
  const [laps, setLaps] = react.exports.useState({});
  const mouseMove = (point2) => {
    setCrosshairX(point2.x);
  };
  function mouseLeave() {
    setCrosshairX(-1);
  }
  react.exports.useEffect(() => {
    fetchLabelValues("session", "0s", "10m").then((data) => {
      setSessions(data.values);
    }).catch(console.error);
  }, []);
  async function graph() {
    setLoading(true);
    const options = {
      from: "1m",
      to: "4m",
      interval: "1s",
      maxSamples: 1e4
    };
    try {
      const sectors2 = await findSectors(car, session, options);
      const laps2 = await findLaps(car, session, options);
      setSectors(sectors2);
      setLaps(laps2);
      const brakeData = await performQuery(`brake{car="${car}",session="${session}"}`, options);
      setBrake(convertSeriesToPoints(brakeData.result));
      const drsData = await performQuery(`drs{car="${car}",session="${session}"}`, options);
      setDRS(convertSeriesToPoints(drsData.result));
      const gearData = await performQuery(`gear{car="${car}",session="${session}"}`, options);
      setGears(convertSeriesToPoints(gearData.result));
      const speedData = await performQuery(`speed{car="${car}",session="${session}"}`, options);
      setSpeed(convertSeriesToPoints(speedData.result));
      const steerData = await performQuery(`steer{car="${car}",session="${session}"} * -1`, options);
      setSteering(convertSeriesToPoints(steerData.result));
      const throttleData = await performQuery(`throttle{car="${car}",session="${session}"}`, options);
      setThrottle(convertSeriesToPoints(throttleData.result));
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    setShowGraph(true);
    setLoading(false);
  }
  function formatTick(x2) {
    return /* @__PURE__ */ jsxs("tspan", {
      children: [sectors[x2] ? /* @__PURE__ */ jsxs("tspan", {
        x: "0",
        children: ["sector ", sectors[x2]]
      }) : null, laps[x2] ? /* @__PURE__ */ jsxs("tspan", {
        x: "0",
        dy: "15",
        children: ["lap ", laps[x2]]
      }) : null]
    });
  }
  const renderedGraph = /* @__PURE__ */ jsxs("div", {
    className: "card",
    onMouseLeave: mouseLeave,
    children: [/* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 120,
      yDomain: [-1, 8],
      margin: {
        top: 10,
        bottom: 10,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        tickValues: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8],
        tickFormat: (v2) => ["R", "N", "1", "2", "3", "4", "5", "6", "7", "8"][v2 + 1]
      }), /* @__PURE__ */ jsx(HorizontalGridLines, {
        tickValues: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "Gear",
        includeMargin: false,
        xPercent: 0,
        yPercent: 0.5
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(gears).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveStep",
        onNearestX: mouseMove
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "gear",
          value: typeof gears[crosshairX] === "undefined" ? "unknown" : ["R", "N", "1", "2", "3", "4", "5", "6", "7", "8"][gears[crosshairX] + 1]
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      })]
    }), /* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 100,
      yDomain: [-1, 1],
      margin: {
        top: 10,
        bottom: 10,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        tickValues: [-1, 0, 1],
        tickFormat: (v2) => ["right", "straight", "left"][v2 + 1]
      }), /* @__PURE__ */ jsx(HorizontalGridLines, {
        tickValues: [0]
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "Steering",
        includeMargin: false,
        xPercent: 0,
        yPercent: 0.5
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "steer",
          value: (() => {
            if (typeof steering[crosshairX] === "undefined") {
              return "unknown";
            }
            if (steering[crosshairX] < 0) {
              return `${Math.round(-steering[crosshairX] * 180)}\xB0 right`;
            }
            if (steering[crosshairX] === 0) {
              return `straight`;
            }
            return `${Math.round(steering[crosshairX] * 180)}\xB0 left`;
          })()
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(steering).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveBasis",
        onNearestX: mouseMove
      })]
    }), /* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 50,
      yDomain: [0, 1],
      margin: {
        top: 10,
        bottom: 10,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        hideTicks: true
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "DRS",
        includeMargin: false,
        xPercent: 0,
        yPercent: 1
      }), /* @__PURE__ */ jsx(YAxis, {
        tickValues: [0, 1],
        tickFormat: (v2) => v2 == 1 ? "on" : "off"
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "drs",
          value: typeof drs[crosshairX] === "undefined" ? "unkown" : drs[crosshairX] === 1 ? "on" : "off"
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(drs).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveStep",
        onNearestX: mouseMove
      })]
    }), /* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 100,
      yDomain: [0, 1],
      margin: {
        top: 10,
        bottom: 10,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        hideTicks: true
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "Throttle",
        includeMargin: false,
        xPercent: 0,
        yPercent: 1
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "throttle",
          value: typeof throttle[crosshairX] === "undefined" ? "unknown" : `${Math.round(throttle[crosshairX] * 100)}%`
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(throttle).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveBasis",
        onNearestX: mouseMove
      })]
    }), /* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 200,
      margin: {
        top: 10,
        bottom: 10,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        hideTicks: true
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "Speed",
        includeMargin: false,
        xPercent: 0,
        yPercent: 1
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "speed",
          value: typeof speed[crosshairX] === "undefined" ? "unknown" : `${speed[crosshairX]}km/h`
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(speed).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveBasis",
        onNearestX: mouseMove
      })]
    }), /* @__PURE__ */ jsxs(FlexibleXYPlot, {
      height: 100,
      yDomain: [0, 1],
      margin: {
        top: 5,
        bottom: 60,
        left: 60,
        right: 0
      },
      children: [/* @__PURE__ */ jsx(YAxis, {
        hideTicks: true
      }), /* @__PURE__ */ jsx(XAxis, {
        hideLine: true,
        tickValues: [...Object.keys(sectors), ...Object.keys(laps)],
        tickFormat: (x2) => formatTick(x2)
      }), /* @__PURE__ */ jsx(ChartLabel, {
        text: "Brake",
        includeMargin: false,
        xPercent: 0,
        yPercent: 1
      }), /* @__PURE__ */ jsx(Crosshair, {
        values: [{
          x: crosshairX,
          y: 0
        }],
        itemsFormat: () => [{
          title: "brake",
          value: typeof brake[crosshairX] === "undefined" ? "unknown" : `${Math.round(brake[crosshairX] * 100)}%`
        }],
        titleFormat: () => ({
          title: "time",
          value: crosshairX
        })
      }), /* @__PURE__ */ jsx(LineSeries, {
        data: Object.entries(brake).map(([x2, y2]) => ({
          x: Number(x2),
          y: y2
        })),
        curve: "curveBasis",
        onNearestX: mouseMove
      })]
    })]
  });
  const sessionOptions = sessions.map((x2) => /* @__PURE__ */ jsx("option", {
    value: x2,
    children: x2
  }, x2));
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Graph"
    }), /* @__PURE__ */ jsx(Tip, {
      uuid: "tip.graph-page.intro",
      children: /* @__PURE__ */ jsx("p", {
        children: "This page allows you to produce a telemetry graph, modeled after a real world example. To produce a graph, simply specify a session and car. The values can be found in the queries page."
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Configuration"
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Session", /* @__PURE__ */ jsx("input", {
          type: "text",
          value: session,
          onChange: (e3) => setSession(e3.target.value),
          list: "session"
        }), /* @__PURE__ */ jsx("datalist", {
          id: "session",
          children: sessionOptions
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Car", /* @__PURE__ */ jsx("input", {
          type: "text",
          value: car,
          onChange: (e3) => setCar(e3.target.value)
        })]
      }), /* @__PURE__ */ jsx("button", {
        disabled: loading,
        onClick: graph,
        className: "mt-2",
        children: "Graph"
      })]
    }), showGraph ? renderedGraph : null]
  });
}
function HomePage() {
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(Tip, {
      uuid: "tip.home-page.intro",
      children: /* @__PURE__ */ jsxs("p", {
        children: ["To get started with querying your data, visit the", " ", /* @__PURE__ */ jsx(NavLink, {
          to: "/query",
          children: "query page"
        }), ". To create a diagram of telemetry, visit the ", /* @__PURE__ */ jsx(NavLink, {
          to: "/graph",
          children: "graph page"
        }), "."]
      })
    })
  });
}
function normalize({
  x: x2,
  y: y2
}, min2, range2, canvas) {
  return {
    x: (x2 - min2.x) / range2.x * canvas.width,
    y: (y2 - min2.y) / range2.y * canvas.height
  };
}
function MapPage() {
  const [loading, setLoading] = react.exports.useState(false);
  const [showMap, setShowMap] = react.exports.useState(false);
  const [sessions, setSessions] = react.exports.useState([]);
  const canvasElement = react.exports.useRef(null);
  const [session, setSession] = react.exports.useState("");
  const [car, setCar] = react.exports.useState("");
  react.exports.useEffect(() => {
    fetchLabelValues("session", "0s", "10m").then((data) => {
      setSessions(data.values);
    }).catch(console.error);
  }, []);
  async function map2() {
    setLoading(true);
    setShowMap(false);
    const options = {
      from: "1m",
      to: "3m",
      interval: "1s",
      maxSamples: 1e4
    };
    const worldXResult = await performQuery(`world_x{car="${car}",session="${session}"}`, options);
    const worldX = convertSeriesToPoints(worldXResult.result);
    const worldYResult = await performQuery(`world_z{car="${car}",session="${session}"}`, options);
    const worldY = convertSeriesToPoints(worldYResult.result);
    const positions = {};
    for (const [key, x2] of Object.entries(worldX)) {
      const time = Number(key);
      const y2 = worldY[time];
      if (typeof y2 !== "undefined") {
        positions[time] = {
          x: x2,
          y: y2
        };
      }
    }
    const min2 = {
      x: Number.MAX_SAFE_INTEGER,
      y: Number.MAX_SAFE_INTEGER
    };
    const max2 = {
      x: -Number.MAX_SAFE_INTEGER,
      y: -Number.MAX_SAFE_INTEGER
    };
    for (const {
      x: x2,
      y: y2
    } of Object.values(positions)) {
      if (x2 < min2.x) {
        min2.x = x2;
      }
      if (y2 < min2.y) {
        min2.y = y2;
      }
      if (x2 > max2.x) {
        max2.x = x2;
      }
      if (y2 > max2.y) {
        max2.y = y2;
      }
    }
    const range2 = {
      x: max2.x - min2.x,
      y: max2.y - min2.y
    };
    const ratio = range2.y / range2.x;
    const canvas = canvasElement.current;
    if (!canvas) {
      console.error("canvas not yet mounted");
      setLoading(false);
      return;
    }
    canvas.height = ratio * canvas.width;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("unsupported browser - failed to get 2d context");
      setLoading(false);
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    const p2 = Object.values(positions);
    for (let i2 = 1; i2 < p2.length; i2++) {
      const previous = normalize(p2[i2 - 1], min2, range2, canvas);
      const current = normalize(p2[i2], min2, range2, canvas);
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(current.x, current.y);
      context.strokeStyle = `rgba(255, 0, 0, ${i2 / p2.length})`;
      context.stroke();
    }
    setLoading(false);
    setShowMap(true);
  }
  const renderedMap = /* @__PURE__ */ jsx("canvas", {
    width: "320",
    height: "320",
    ref: canvasElement
  });
  const sessionOptions = sessions.map((x2) => /* @__PURE__ */ jsx("option", {
    value: x2,
    children: x2
  }, x2));
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Map"
    }), /* @__PURE__ */ jsx(Tip, {
      uuid: "tip.map-page.intro",
      children: /* @__PURE__ */ jsx("p", {
        children: "This page allows you to produce a map of cars' positions. To produce a map, simply specify a session and car. The values can be found in the queries page."
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Configuration"
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Session", /* @__PURE__ */ jsx("input", {
          type: "text",
          value: session,
          onChange: (e3) => setSession(e3.target.value),
          list: "session"
        }), /* @__PURE__ */ jsx("datalist", {
          id: "session",
          children: sessionOptions
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: ["Car", /* @__PURE__ */ jsx("input", {
          type: "text",
          value: car,
          onChange: (e3) => setCar(e3.target.value)
        })]
      }), /* @__PURE__ */ jsx("button", {
        disabled: loading,
        onClick: map2,
        className: "mt-2",
        children: "Map"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "card",
      children: renderedMap
    })]
  });
}
function QueryPage() {
  const [queryStartTime, setQueryStartTime] = react.exports.useState("");
  const [queryEndTime, setQueryEndTime] = react.exports.useState("");
  const [queryInterval, setQueryInterval] = react.exports.useState("200ms");
  const [queryMaxSamples, setQueryMaxSamples] = react.exports.useState("1000");
  const [query, setQuery] = react.exports.useState("");
  const [loading, setLoading] = react.exports.useState(false);
  const [result, setResult] = react.exports.useState(null);
  const [queries, setQueries] = useStore((state) => [state.queryHistory, state.setQueryHistory]);
  const [labels, setLabels] = react.exports.useState(null);
  function fillQuery(query2, options) {
    setQuery(query2);
    setQueryStartTime(options.from || "");
    setQueryEndTime(options.to || "");
    setQueryInterval(options.interval || "");
    setQueryMaxSamples(options.maxSamples ? options.maxSamples.toString() : "");
  }
  const renderedQueries = queries.map(({
    query: query2,
    options
  }) => /* @__PURE__ */ jsxs("tr", {
    className: "cursor-pointer",
    onClick: () => fillQuery(query2, options),
    children: [/* @__PURE__ */ jsx("td", {
      children: query2
    }), /* @__PURE__ */ jsx("td", {
      children: options.from
    }), /* @__PURE__ */ jsx("td", {
      children: options.to
    }), /* @__PURE__ */ jsx("td", {
      children: options.interval
    }), /* @__PURE__ */ jsx("td", {
      children: options.maxSamples
    })]
  }));
  react.exports.useEffect(() => {
    fetchAllLabelsWithValues().then(setLabels).catch(console.error);
  }, []);
  async function handleQuery() {
    setLoading(true);
    const options = {
      from: queryStartTime,
      to: queryEndTime,
      interval: queryInterval,
      maxSamples: Number(queryMaxSamples)
    };
    setQueries([{
      query,
      options
    }, ...queries].slice(0, 10));
    try {
      const result2 = await performQuery(query, options);
      setResult(result2);
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  }
  const resultCard = /* @__PURE__ */ jsxs("div", {
    className: "card",
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Result"
    }), /* @__PURE__ */ jsx("code", {
      className: "block-code",
      children: JSON.stringify(result, null, 2)
    })]
  });
  const example = `sum(avg_over_time(speed{self="true"}[1m])) by (session)`;
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Query"
    }), /* @__PURE__ */ jsx(Tip, {
      uuid: "tip.query-page.intro",
      children: /* @__PURE__ */ jsxs("p", {
        children: ["You can query any collected data using", " ", /* @__PURE__ */ jsx("a", {
          target: "_blank",
          href: "https://prometheus.io/docs/prometheus/latest/querying/basics/",
          children: "PromQL"
        }), ". For example, to see average speed of your car the first minute of sessions, specify the ", /* @__PURE__ */ jsx("code", {
          children: example
        }), " query, using", " ", /* @__PURE__ */ jsx("code", {
          children: "0s"
        }), " as from, ", /* @__PURE__ */ jsx("code", {
          children: "1m"
        }), " as the to and interval and finally ", /* @__PURE__ */ jsx("code", {
          children: "10000"
        }), " as the max samples, before pressing the query button. The metrics below describe all available metrics you can use in a query. Likewise, the labels describe all available labels as well as their respective values."]
      })
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Query data"
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("p", {
          children: "PromQL query"
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          value: query,
          onChange: (e3) => setQuery(e3.target.value)
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsxs("p", {
          children: ["Start time for the query, for example ", /* @__PURE__ */ jsx("code", {
            children: "10m2s"
          })]
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          value: queryStartTime,
          onChange: (e3) => setQueryStartTime(e3.target.value)
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsxs("p", {
          children: ["End time for the query, for example ", /* @__PURE__ */ jsx("code", {
            children: "15m"
          })]
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          value: queryEndTime,
          onChange: (e3) => setQueryEndTime(e3.target.value)
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("p", {
          children: "Interval"
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          value: queryInterval,
          onChange: (e3) => setQueryInterval(e3.target.value)
        })]
      }), /* @__PURE__ */ jsxs("label", {
        children: [/* @__PURE__ */ jsx("p", {
          children: "Max samples"
        }), /* @__PURE__ */ jsx("input", {
          type: "text",
          value: queryMaxSamples,
          onChange: (e3) => setQueryMaxSamples(e3.target.value)
        })]
      }), /* @__PURE__ */ jsx("button", {
        disabled: loading,
        onClick: handleQuery,
        className: "mt-2",
        children: "Query"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Metrics and Labels"
      }), labels ? Object.entries(labels).map(([label, values]) => /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("h3", {
          children: label === "__name__" ? "Metrics" : `Label '${label}'`
        }), /* @__PURE__ */ jsx("div", {
          className: "flex flex-row flex-wrap",
          children: values.map((value) => /* @__PURE__ */ jsx("code", {
            className: "bg-slate-600 rounded-md p-2 m-2 text-sm",
            children: value
          }))
        })]
      })) : null]
    }), renderedQueries.length > 0 ? /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Recent Queries"
      }), /* @__PURE__ */ jsxs("table", {
        children: [/* @__PURE__ */ jsx("thead", {
          children: /* @__PURE__ */ jsxs("tr", {
            children: [/* @__PURE__ */ jsx("th", {
              scope: "col",
              children: "Query"
            }), /* @__PURE__ */ jsx("th", {
              scope: "col",
              children: "From"
            }), /* @__PURE__ */ jsx("th", {
              scope: "col",
              children: "To"
            }), /* @__PURE__ */ jsx("th", {
              scope: "col",
              children: "Interval"
            }), /* @__PURE__ */ jsx("th", {
              scope: "col",
              children: "Max samples"
            })]
          })
        }), /* @__PURE__ */ jsx("tbody", {
          children: renderedQueries
        })]
      })]
    }) : null, result == null ? null : resultCard]
  });
}
function SettingsPage() {
  const [resetHints, clearQueries] = useStore((state) => [state.resetHints, state.clearQueries]);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Settings"
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Queries"
      }), /* @__PURE__ */ jsx("button", {
        onClick: clearQueries,
        className: "mt-2",
        children: "Clear query history"
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "card",
      children: [/* @__PURE__ */ jsx("h2", {
        children: "Hints"
      }), /* @__PURE__ */ jsx("button", {
        onClick: resetHints,
        className: "mt-2",
        children: "Reset dismissed hints"
      })]
    })]
  });
}
function App() {
  const [navDepth, setNavDepth] = react.exports.useState(0);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", {
    className: "relative",
    children: [/* @__PURE__ */ jsx("menu", {
      className: "fixed w-20 bg-slate-700 h-full flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("ul", {
        className: "grid grid-rows-2 gap-y-5",
        children: [/* @__PURE__ */ jsx(NavLink, {
          to: "/",
          className: (navData) => navData.isActive ? "text-red-500" : "text-slate-400",
          children: /* @__PURE__ */ jsx("li", {
            className: "transition-transform active:scale-95 hover:scale-105",
            children: /* @__PURE__ */ jsx(HomeIcon, {
              className: "w-8 h-8"
            })
          })
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/graph",
          className: (navData) => navData.isActive ? "text-red-500" : "text-slate-400",
          children: /* @__PURE__ */ jsx("li", {
            className: "transition-transform active:scale-95 hover:scale-105",
            children: /* @__PURE__ */ jsx(ChartIcon, {
              className: "w-8 h-8"
            })
          })
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/map",
          className: (navData) => navData.isActive ? "text-red-500" : "text-slate-400",
          children: /* @__PURE__ */ jsx("li", {
            className: "transition-transform active:scale-95 hover:scale-105",
            children: /* @__PURE__ */ jsx(MapIcon, {
              className: "w-8 h-8"
            })
          })
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/query",
          className: (navData) => navData.isActive ? "text-red-500" : "text-slate-400",
          children: /* @__PURE__ */ jsx("li", {
            className: "transition-transform active:scale-95 hover:scale-105",
            children: /* @__PURE__ */ jsx(CodeIcon, {
              className: "w-8 h-8"
            })
          })
        }), /* @__PURE__ */ jsx(NavLink, {
          to: "/settings",
          className: (navData) => navData.isActive ? "text-red-500" : "text-slate-400",
          children: /* @__PURE__ */ jsx("li", {
            className: "transition-transform active:scale-95 hover:scale-105",
            children: /* @__PURE__ */ jsx(SettingsIcon, {
              className: "w-8 h-8"
            })
          })
        })]
      })
    }), /* @__PURE__ */ jsxs("main", {
      className: "pl-24 py-5 pr-4 flex flex-col",
      children: [/* @__PURE__ */ jsx("header", {
        className: "mb-4 text-sm",
        children: navDepth > 0 ? /* @__PURE__ */ jsxs("div", {
          className: "flex items-center cursor-pointer",
          onClick: () => navigate(-1),
          children: [/* @__PURE__ */ jsx(LeftArrowIcon, {
            className: "w-4"
          }), " Back"]
        }) : null
      }), /* @__PURE__ */ jsxs(Routes, {
        children: [/* @__PURE__ */ jsx(Route, {
          path: "/",
          element: /* @__PURE__ */ jsx(HomePage, {})
        }), /* @__PURE__ */ jsx(Route, {
          path: "/graph",
          element: /* @__PURE__ */ jsx(GraphPage, {})
        }), /* @__PURE__ */ jsx(Route, {
          path: "/map",
          element: /* @__PURE__ */ jsx(MapPage, {})
        }), /* @__PURE__ */ jsx(Route, {
          path: "/query",
          element: /* @__PURE__ */ jsx(QueryPage, {})
        }), /* @__PURE__ */ jsx(Route, {
          path: "/settings",
          element: /* @__PURE__ */ jsx(SettingsPage, {})
        })]
      })]
    })]
  });
}
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(/* @__PURE__ */ jsx(React.StrictMode, {
    children: /* @__PURE__ */ jsx(BrowserRouter, {
      children: /* @__PURE__ */ jsx(App, {})
    })
  }));
}
//# sourceMappingURL=index.25689c11.js.map
