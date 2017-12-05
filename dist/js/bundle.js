/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ROUTES = {
    common: __webpack_require__(1),
    homepage: __webpack_require__(3)
};

var ROUTER = {
    exec: function exec(controller, action) {
        action = !action ? 'init' : action;

        if (controller && ROUTES[controller] && typeof ROUTES[controller][action] === 'function') {
            ROUTES[controller][action]();
        }
    },
    init: function init() {
        var body = document.body;
        var controller = body.getAttribute('data-controller');
        var action = body.getAttribute('data-action');

        ROUTER.exec('common');
        ROUTER.exec(controller, action);
    }
};

ROUTER.init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lousyLoad = __webpack_require__(2);

var common = {
    init: function init() {
        // Lazy load all images
        var ll = new lousyLoad(document.body);
    }
};

module.exports = common;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Lazy loading plugin for the future
 * Author: Derek Wheelden
 * Git: https://github.com/frxnz
 * License: MIT
 * Attribution: Plugin boilerplate from https://github.com/janrembold/vanilla-plugin-boilerplate
 */
(function (root, factory) {
    var pluginName = 'lousyLoad';

    if (( false ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
})(window, function (pluginName) {
    'use strict';

    var defaults = {
        immediate: true,
        selector: 'img',
        threshold: 0,
        wrapElement: true
    };

    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function extend(defaults, options) {
        var extended = {};

        for (var prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }

        for (var _prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, _prop)) {
                extended[_prop] = options[_prop];
            }
        }

        return extended;
    };

    // NodeList `forEach` polyfill for IE support
    // via https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, argument) {
            argument = argument || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(argument, this[i], i, this);
            }
        };
    }

    var LousyImage = function () {
        function LousyImage(element) {
            _classCallCheck(this, LousyImage);

            this.__data = {};
            this.__element = element;
        }

        _createClass(LousyImage, [{
            key: 'data',
            value: function data(key, value) {
                if (!key) {
                    return this.__data;
                }

                if (!value) {
                    return this.__data[key];
                }

                this.__data[key] = value;
            }
        }, {
            key: 'el',
            get: function get() {
                return this.__element;
            }
        }]);

        return LousyImage;
    }();

    /**
     * Plugin class
     * @param {Node} element The html element to initialize
     * @param {Object} options User options
     * @constructor
     */


    var Plugin = function () {
        function Plugin(element, options) {
            _classCallCheck(this, Plugin);

            this.element = element;
            this._defaults = defaults;
            this._name = pluginName;
            this.options = extend(defaults, options);

            if (this.options.immediate) {
                this.init();
            }
        }

        _createClass(Plugin, [{
            key: 'init',
            value: function init() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.$images = this.__getImages();

                this.$images.forEach(this.prepareImage.bind(this));

                if (!opts.isReinit) {
                    window.onresize = this.__debounce(this.__resizeHandler.bind(this), 50);
                }

                return this.$images;
            }
        }, {
            key: 'prepareImage',
            value: function prepareImage(element) {
                var image = new LousyImage(element);
                var $image = image.el;

                var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var dimensions = this.__getImageDimensions($image);
                var shouldWrap = $image.getAttribute('data-nowrap') === null && this.options.wrapElement;
                var $wrapper = void 0;

                if ($image.getAttribute('style')) {
                    $image.setAttribute('data-ogStyles', $image.getAttribute('style'));
                }

                image.data('shouldWrap', shouldWrap);

                if (shouldWrap) {
                    $wrapper = document.createElement('span');
                    $wrapper.classList.add('ll-image_wrapper');
                    $wrapper.style.width = dimensions.width + 'px';
                    $wrapper.style.height = dimensions.height + 'px';
                    $wrapper.style.display = 'inline-block';

                    $image.classList.add('ll-image');
                    $image.style.width = dimensions.width + 'px';
                    $image.style.height = dimensions.height + 'px';

                    this.__wrapElement($wrapper, $image);
                    image.data('wrapper', $wrapper);
                }

                var isLoaded = this.tryLoadImage(image);
                var scrollHandler = this.__debounce(function () {
                    var isLoaded = this.tryLoadImage(image);

                    if (isLoaded) {
                        window.removeEventListener('scroll', scrollHandler);
                    }
                }.bind(this), 50);

                if (!isLoaded) {
                    window.addEventListener('scroll', scrollHandler);
                }

                return image;
            }
        }, {
            key: 'tryLoadImage',
            value: function tryLoadImage(image, _top) {
                var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var $image = image.el;
                var type = void 0;

                if ((_top || $image.getBoundingClientRect().top) > viewportHeight + this.options.threshold) return false;

                if ($image.nodeName !== 'IMG') {
                    type = 'background';
                } else if ($image.getAttribute('data-srcset')) {
                    type = 'srcset';
                } else {
                    type = 'src';
                }

                image.data('type', type);

                this.__loadImageByType(image, type);

                return true;
            }
        }, {
            key: '__getImages',
            value: function __getImages() {
                return this.element.querySelectorAll(this.options.selector);
            }
        }, {
            key: '__debounce',
            value: function __debounce(func, wait, immediate) {
                // https://davidwalsh.name/javascript-debounce-function
                var timeout = void 0;
                return function () {
                    var context = this;
                    var args = arguments;
                    var later = function later() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }
        }, {
            key: '__wrapElement',
            value: function __wrapElement(wrapper, elms) {
                // https://stackoverflow.com/questions/3337587/wrapping-a-set-of-dom-elements-using-javascript/13169465#13169465
                // Convert `elms` to an array, if necessary.
                if (!elms.length) elms = [elms];

                // Loops backwards to prevent having to clone the wrapper on the
                // first element (see `child` below).
                for (var i = elms.length - 1; i >= 0; i--) {
                    var child = i > 0 ? wrapper.cloneNode(true) : wrapper;
                    var el = elms[i];

                    // Cache the current parent and sibling.
                    var parent = el.parentNode;
                    var sibling = el.nextSibling;

                    // Wrap the element (is automatically removed from its current
                    // parent).
                    child.appendChild(el);

                    // If the element had a sibling, insert the wrapper before
                    // the sibling to maintain the HTML structure; otherwise, just
                    // append it to the parent.
                    if (sibling) {
                        parent.insertBefore(child, sibling);
                    } else {
                        parent.appendChild(child);
                    }
                }
            }
        }, {
            key: '__unwrapElement',
            value: function __unwrapElement(element) {
                var wrapper = element.parentNode;
                var parent = wrapper.parentNode;

                if (!wrapper.classList.contains('ll-image_wrapper')) return;

                while (wrapper.firstChild) {
                    parent.insertBefore(wrapper.firstChild, wrapper);
                }

                parent.removeChild(wrapper);
            }
        }, {
            key: '__getImageDimensions',
            value: function __getImageDimensions($image) {
                var styles = window.getComputedStyle($image);
                // Width and height need to be computed differently for images and background images
                var width = $image.nodeName === 'IMG' ? Number($image.getAttribute('width')) : $image.offsetWidth;
                var height = $image.nodeName === 'IMG' ? Number($image.getAttribute('height')) : $image.offsetHeight;
                var maxWidth = styles.getPropertyValue('max-width') === 'none' ? null : styles.getPropertyValue('max-width');
                var aspectRatio = width / height;

                if (maxWidth) {
                    if (maxWidth.indexOf('%') > -1) {
                        var fraction = Number(maxWidth.replace('%', '')) / 100;
                        var parentStyles = window.getComputedStyle($image.parentElement);
                        var parentWidth = parentStyles.getPropertyValue('width');

                        maxWidth = Number(parentWidth.replace('px', '')) * fraction;
                    } else if (maxWidth.indexOf('px') > -1) {
                        maxWidth = Number(maxWidth.replace('px', ''));
                    }

                    if (Number(width) > Number(maxWidth)) {
                        width = maxWidth;
                        height = maxWidth / aspectRatio;
                    }
                } else {
                    maxWidth = width;
                }

                return {
                    width: width,
                    height: height,
                    maxWidth: maxWidth,
                    aspectRatio: aspectRatio
                };
            }
        }, {
            key: '__attachLoadEvent',
            value: function __attachLoadEvent(image, $wrapper, shouldWrap) {
                var $image = image.el;

                $wrapper = $wrapper || image.data('wrapper');
                shouldWrap = shouldWrap || image.data('shouldWrap');

                if ($image.nodeName === 'IMG') {
                    $image.onload = loadHandler.bind(this);
                    return;
                }

                var styles = window.getComputedStyle($image);
                var src = styles.getPropertyValue('background-image').match(/url\(['"]?([^'"]*)['"]?\)/)[1];
                var img = new Image();
                img.onload = loadHandler.bind(this);
                img.src = src;

                if (img.complete) loadHandler();

                function loadHandler() {
                    $image.classList.add('is-loaded');

                    if (shouldWrap) {
                        $wrapper.classList.add('is-loaded');
                    }
                }
            }
        }, {
            key: '__loadImageByType',
            value: function __loadImageByType(image, type) {
                var $image = image.el;

                switch (type) {
                    case 'srcset':
                        $image.srcset = $image.getAttribute('data-srcset');
                        $image.src = $image.getAttribute('data-src');
                        break;
                    case 'background':
                        if (this.options.backgroundClass) {
                            $image.classList.remove(this.options.backgroundClass.replace(/^\./, ''));
                        } else {
                            $image.style.removeProperty('background');
                        }
                        break;
                    default:
                        $image.src = $image.getAttribute('data-src');
                        break;
                }

                this.__attachLoadEvent(image);
            }
        }, {
            key: '__resizeHandler',
            value: function __resizeHandler() {
                var _this = this;

                this.__getImages().forEach(function (image) {
                    if (image.getAttribute('data-ogStyles')) {
                        image.setAttribute('style', image.getAttribute('data-ogStyles'));
                    } else {
                        image.removeAttribute('style');
                    }

                    if (image.getAttribute('data-nowrap') === null && _this.options.wrapElement) {
                        _this.__unwrapElement(image);
                    }
                });

                this.init({ isReinit: true });
            }
        }]);

        return Plugin;
    }();

    if (window.jQuery) {
        var $ = window.jQuery;

        $.fn[pluginName] = function (options) {
            options = options || {};

            return this.each(function () {
                // add plugin to element data
                if (!$.data(this, 'plugin_' + pluginName)) {
                    options.element = this;
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        };
    }

    return Plugin;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This module will be used when data-controller === 'homepage'

var homepage = {
    init: function init() {}
};

module.exports = homepage;

/***/ })
/******/ ]);