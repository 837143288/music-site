<template>
  <div class="container">
    <a data-animation="ripple"
      >Click <span style="font-weight: bold">Me</span></a
    >
  </div>
</template>

<script>
export default {
  name: "Btn",
  mounted() {
    window["tmripple"] = /******/ (function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/ var installedModules = {}; // The require function
      /******/
      /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
          /******/ return installedModules[moduleId].exports;
          /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
          /******/ i: moduleId,
          /******/ l: false,
          /******/ exports: {},
          /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
          module.exports,
          module,
          module.exports,
          __webpack_require__
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
      } // expose the modules object (__webpack_modules__)
      /******/
      /******/
      /******/ /******/ __webpack_require__.m = modules; // expose the module cache
      /******/
      /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
      /******/
      /******/ /******/ __webpack_require__.d = function (
        exports,
        name,
        getter
      ) {
        /******/ if (!__webpack_require__.o(exports, name)) {
          /******/ Object.defineProperty(exports, name, {
            /******/ configurable: false,
            /******/ enumerable: true,
            /******/ get: getter,
            /******/
          });
          /******/
        }
        /******/
      }; // getDefaultExport function for compatibility with non-harmony modules
      /******/
      /******/ /******/ __webpack_require__.n = function (module) {
        /******/ var getter =
          module && module.__esModule
            ? /******/ function getDefault() {
                return module["default"];
              }
            : /******/ function getModuleExports() {
                return module;
              };
        /******/ __webpack_require__.d(getter, "a", getter);
        /******/ return getter;
        /******/
      }; // Object.prototype.hasOwnProperty.call
      /******/
      /******/ /******/ __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      }; // __webpack_public_path__
      /******/
      /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
      /******/
      /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
      /******/
    })(
      /************************************************************************/
      /******/ [
        /* 0 */
        /***/ function (module, exports, __webpack_require__) {
          "use strict";

          // Default Settings
          var settings = {
            area: "",
            color: "rgba(255, 255, 255, 0.4)",
            offsetEl: null,
            eventListener: "click",
            mouseMove: false,
          };

          /**
           * @description Where the magic happens
           * @param {object} e
           * @param {string} rippleColor
           * @param {string} eventListener
           */
          function ripple(e, rippleColor, eventListener) {
            var clickedEl = e.currentTarget;
            var PageX = eventListener.match(/touch/)
              ? e.changedTouches[0].pageX
              : e.clientX;
            var PageY = eventListener.match(/touch/)
              ? e.changedTouches[0].pageY
              : e.clientY;
            var btnWidth = clickedEl.clientWidth;
            var el = clickedEl.getBoundingClientRect();
            var rippleOffset = settings.offsetEl
              ? settings.offsetEl.clientHeight
              : 0;
            var btnOffsetTop = el.top + rippleOffset;
            var btnOffsetLeft = el.left;
            var posMouseX = PageX;
            var posMouseY = PageY + rippleOffset;
            var rippleX = posMouseX - btnOffsetLeft;
            var rippleY = posMouseY - btnOffsetTop;

            var baseCSS =
              "\n          position: absolute;\n          width: " +
              btnWidth * 2 +
              "px;\n          height: " +
              btnWidth * 2 +
              "px;\n          border-radius: 50%;\n          transition: transform 700ms, opacity 700ms;\n          transition-timing-function: cubic-bezier(0.250, 0.460, 0.450, 0.940);\n          background: " +
              rippleColor +
              ";\n          background-position: center;\n          background-repeat: no-repeat;\n          background-size: 100%;\n          left: " +
              (rippleX - btnWidth) +
              "px;\n          top: " +
              (rippleY - btnWidth) +
              "px;\n          transform: scale(0);\n          pointer-events: none;\n      ";

            // Prepare the dom
            var rippleEffect = document.createElement("span");
            rippleEffect.style.cssText = baseCSS;

            // Add some css for prevent overflow errors
            clickedEl.style.overflow = "hidden";

            // Check if the element is not static because the ripple is in absolute
            if (window.getComputedStyle(clickedEl).position === "static") {
              clickedEl.style.position = "relative";
            }

            // Check for the mousemove event
            if (settings.mouseMove) {
              settings.mouseMove = false;
              return;
            }

            clickedEl.appendChild(rippleEffect);

            // start animation
            requestAnimationFrame(function () {
              rippleEffect.style.cssText =
                baseCSS + " transform: scale(1); opacity: 0;";
            });

            setTimeout(function () {
              rippleEffect.remove();
            }, 700);
          }

          /**
           * @description Prevent ripple when scrolling (Mobile Only)
           * @param {string} eventListener
           */
          function onDrag(eventListener) {
            if (eventListener === "touchend") {
              document
                .getElementsByTagName("body")[0]
                .addEventListener("touchmove", function () {
                  settings.mouseMove = true;
                });
            }
          }

          function attachRipple(els, rippleColor, eventListener) {
            for (var i = 0; i < els.length; i += 1) {
              var currentBtn = els[i];
              currentBtn.addEventListener(eventListener, function (e) {
                return ripple(e, rippleColor, eventListener);
              });
            }
          }

          function attachRippleToAttribute(area, rippleColor, eventListener) {
            var attributeEl = document.querySelectorAll(
              area + " [data-animation='ripple']"
            );

            if (attributeEl.length > 0) {
              attachRipple(attributeEl, rippleColor, eventListener);
            } else {
              throw new Error(
                'not found any element with data-animation="ripple"'
              );
            }
          }

          function attachRippleToSelectors(
            selectors,
            rippleColor,
            eventListener
          ) {
            if (selectors) {
              var selectorsEl = document.querySelectorAll(selectors);
            } else {
              throw new Error("You have to enter at least 1 selector");
            }

            if (selectorsEl.length > 0) {
              attachRipple(selectorsEl, rippleColor, eventListener);
            } else {
              console.warn("No element found with this selector: ", selectors);
            }
          }

          module.exports = {
            init: function init() {
              var data =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : {};

              try {
                var area = settings.area,
                  color = settings.color,
                  offsetEl = settings.offsetEl,
                  eventListener = settings.eventListener;

                area = data.area || area;
                color = data.color || color;
                offsetEl = data.offsetEl
                  ? this.setOffsetEl(data.offsetEl)
                  : offsetEl;
                eventListener = data.eventListener || eventListener;

                onDrag(eventListener);
                attachRippleToAttribute(area, color, eventListener);
              } catch (e) {
                console.warn(e.message);
              }
            },
            attachToSelectors: function attachToSelectors() {
              var data =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : {};

              try {
                var elSetting = {
                  color: data.color || settings.color,
                  eventListener: data.eventListener || settings.eventListener,
                };
                var color = elSetting.color,
                  eventListener = elSetting.eventListener;

                attachRippleToSelectors(data.selectors, color, eventListener);
              } catch (e) {
                console.warn(e.message);
              }
            },
            setOffsetEl: function setOffsetEl(el) {
              settings.offsetEl = document.querySelector(el);
            },

            ripple: ripple,
          };

          /***/
        },
        /******/
      ]
    );
    tmripple.init();
  },
  methods: {

  },
};
</script>

<style scoped>
body {
  background: #36353c;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  width: 200px;
  margin: auto;
}
*[data-animation="ripple"] {
  height: 100%;
  width: 100%;
  display: block;
  outline: none;
  padding: 20px;
  color: #fff;
  text-transform: uppercase;
  background: linear-gradient(135deg, #e570e7 0%, #79f1fc 100%);
  box-sizing: border-box;
  text-align: center;
  line-height: 14px;
  font-family: roboto, helvetica;
  font-weight: 200;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  /*border-radius: 50px;*/
  -webkit-tap-highlight-color: transparent;
  border-radius: 5px;
}

*[data-animation="ripple"]:focus {
  outline: none;
}

*[data-animation="ripple"]::selection {
  background: transparent;
  pointer-events: none;
}
</style>