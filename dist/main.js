(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pagination-pattern"] = factory();
	else
		root["pagination-pattern"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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


var _pagination = __webpack_require__(1);

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    (0, _pagination2.default)();
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PaginationInit;
function PaginationInit() {
  // set your custom pattern init function name
  //vars
  var listElement = document.getElementById('list'),
      parentPagination = document.querySelector(".kpPagination"),
      paginationNavWrapper = document.querySelector(".kpPagination__item-dropdown"),
      paginationElement = document.getElementById('pagination'),
      paginationMobileElement = document.getElementById('kpPagination__select'),
      buttonNext = document.getElementById("buttonNext"),
      buttonPrevious = document.getElementById("buttonPrevious"),
      pageIndexNumber = document.getElementById("page");
  var rows = 10,
      currentPage = 1;

  var getCurrentWindowWidth = function getCurrentWindowWidth() {
    var w = window,
        d = document,
        de = d.documentElement,
        b = de.getElementsByTagName('body')[0],
        windowWidth = w.innerWidth || de.clientWidth || b.clientWidth;
    return windowWidth;
  },
      getCurrentBreakpoint = function getCurrentBreakpoint() {
    var currentBreakpoint,
        tabletWidth = 601,
        desktopWidth = 769,
        currentWidth = getCurrentWindowWidth();
    if (currentWidth >= desktopWidth) {
      currentBreakpoint = 'desktop';
    } else if (currentWidth >= tabletWidth && currentWidth < desktopWidth) {
      currentBreakpoint = 'tablet';
    } else {
      currentBreakpoint = 'mobile';
    }
    return currentBreakpoint;
  },
      currentWidth = getCurrentWindowWidth(),
      showListItems = function showListItems(items, articleWrapper, rows_per_page, page) {
    articleWrapper.innerHTML = "";
    page--;
    var start = rows_per_page * page,
        end = start + rows_per_page,
        paginatedItems = items.slice(start, end);

    for (var i = 0; i < paginatedItems.length; i++) {
      var itemImage = '<div class="news__articles-image">' + '<img src="../_images/' + paginatedItems[i].image + '" />' + '</div>';
      var itemSubtitle = '<div class="news__articles-text--small"> <p>' + paginatedItems[i].subtitle + " | " + paginatedItems[i].date + '</p></div>';
      var itemTitle = '<h3 class="news__articles-title">' + '<a href="' + paginatedItems[i].links + '">' + paginatedItems[i].title + '</a>' + '</h3>';
      var itemDescription = '<div class="news__articles-text">' + paginatedItems[i].description + '</div>';
      var item_element = document.createElement('div');
      item_element.classList.add('news__articles-group');
      if (paginatedItems[i].image == undefined) {
        item_element.innerHTML = '<div class="news__articles-content">' + itemSubtitle + itemTitle + itemDescription + '</div>';
      } else {
        item_element.innerHTML = itemImage + '<div class="news__articles-content">' + itemSubtitle + itemTitle + itemDescription + '</div>';
      };
      // Validate pages
      if (page <= 1) page = 1;
      if (page >= numPages()) page = numPages();
      //Previous button conditional
      if (currentPage > 1) {
        buttonPrevious.classList.remove('-disabled');
        buttonPrevious.querySelector('.kpPagination__link').removeAttribute('tabIndex');
        buttonPrevious.querySelector('.screenreader-only').innerText = 'Next Page ' + page++;
      } else {
        buttonPrevious.classList.add('-disabled');
        buttonPrevious.querySelector('.screenreader-only').innerText = 'Disabled previous page, pagination reached first page';
        buttonPrevious.querySelector('.kpPagination__link').setAttribute("tabIndex", " -1");
      }
      //Next button conditional
      if (currentPage < numPages()) {
        pageIndexNumber.innerHTML = '<p><span class="kpPagination__fromIndex">' + (start + 1) + '</span>' + "-" + '<span class="kpPagination__toIndex">' + end + '</span>' + ' of ' + '<span class="kpPagination__totalItems">' + data.listitems.length + '</span>' + ' items </p>';
        buttonNext.classList.remove('-disabled');
        buttonNext.querySelector('.kpPagination__link').removeAttribute("tabIndex");
        buttonPrevious.querySelector('.screenreader-only').innerText = 'Previous Page ' + page--;
      } else {
        //Output index text
        pageIndexNumber.innerHTML = '<p><span class="kpPagination__fromIndex">' + (start + 1) + '</span>' + "-" + '<span class="kpPagination__toIndex">' + data.listitems.length + '</span>' + ' of ' + '<span class="kpPagination__totalItems">' + data.listitems.length + '</span>' + ' items </p>';
        buttonNext.classList.add('-disabled');
        buttonNext.querySelector('.screenreader-only').innerText = 'Disabled Next page, pagination reached last page';
        buttonNext.querySelector('.kpPagination__link').setAttribute("tabIndex", " -1");
      }
      articleWrapper.appendChild(item_element);
    }
  },
      setupPaginationDesktop = function setupPaginationDesktop(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";
    if (currentWidth !== undefined && getCurrentBreakpoint() === 'desktop') {
      paginationElement.style.visibility = "visible";
      paginationNavWrapper.style.visibility = "hidden";
    }
    var page_count = Math.ceil(items.length / rows_per_page);
    for (var i = 1; i < page_count + 1; i++) {
      var btn = paginationButtonDesktop(i, items);
      wrapper.appendChild(btn);
    }
  },
      setupPaginationMobile = function setupPaginationMobile(items, mobileWrapper, rows_per_page) {
    mobileWrapper.innerHTML = "";
    if (currentWidth !== undefined && getCurrentBreakpoint() === 'mobile') {
      paginationElement.style.visibility = "hidden";
      paginationNavWrapper.style.visibility = "visible";
    }
    var page_count = Math.ceil(items.length / rows_per_page);
    for (var i = 1; i < page_count + 1; i++) {
      var selectOption = paginationButtonMobile(i, items);
      mobileWrapper.appendChild(selectOption);
    }
  },
      setupPageCountMobile = function setupPageCountMobile() {
    var dropdownLabelNext = document.createElement('p');
    dropdownLabelNext.classList.add('kpPagination__totalPages');
    dropdownLabelNext.innerText = 'of ' + numPages() + ' pages';
    paginationNavWrapper.appendChild(dropdownLabelNext);
  },
      paginationButtonMobile = function paginationButtonMobile(page, items) {
    var dropdownOption = document.createElement('option');
    dropdownOption.classList.add('kpPagination__option');
    dropdownOption.classList.add('-page');
    dropdownOption.setAttribute("value", page);
    dropdownOption.innerText = page;

    if (currentPage === page) dropdownOption.classList.add('-active');
    [].forEach.call(items, function () {
      paginationMobileElement.addEventListener('change', function () {
        var currentSelectOption = paginationMobileElement.options[paginationMobileElement.selectedIndex];
        if (dropdownOption.classList.contains('-active')) currentPage = page;
        showListItems(items, listElement, rows, currentPage);
        console.log(currentPage);
        var previousSelect = document.querySelector('.kpPagination__select .-active');
        previousSelect.classList.remove('-active');
        currentSelectOption.classList.add('-active');
      });
    });
    return dropdownOption;
  },
      paginationButtonDesktop = function paginationButtonDesktop(page, items) {
    var button = document.createElement('li');
    button.classList.add('kpPagination__item');
    button.classList.add('-page');
    button.innerHTML = '<a class="kpPagination__link" href="javascript:void(0)" >' + '<span class="screenreader-only">page</span>' + '<span class="kpPagination__pageIndex">' + page + '</span></a>';
    if (currentPage == page) button.classList.add('-active');
    button.addEventListener('click', function () {
      currentPage = page;
      console.log('button', currentPage);
      showListItems(items, listElement, rows, currentPage);
      var current_btn = document.querySelector('.kpPagination__nav li.-active');
      var currentScreenReader = current_btn.querySelector('.screenreader-only');
      var newScreenReader = button.querySelector('.screenreader-only');
      current_btn.classList.remove('-active');
      currentScreenReader.innerText = 'page';
      button.classList.add('-active');
      newScreenReader.innerText = 'active page';
    });
    return button;
  },
      previousPage = function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      showListItems(data.listitems, listElement, rows, currentPage);
    }
  },
      nextPage = function nextPage() {
    if (currentPage < numPages()) {
      currentPage++;
      showListItems(data.listitems, listElement, rows, currentPage);
    }
  },
      nextPrevEventListener = function nextPrevEventListener() {
    buttonNext.addEventListener('click', function () {
      nextPage(data.listitems);
      var current_btn = document.querySelector('.kpPagination__nav li.-active');
      var nextPageButton = current_btn.nextSibling;
      var currentScreenReader = current_btn.querySelector('.screenreader-only');
      var newScreenReader = nextPageButton.querySelector('.screenreader-only');
      current_btn.classList.remove('-active');
      currentScreenReader.innerText = 'page';
      nextPageButton.classList.add('-active');
      newScreenReader.innerText = 'active page';
    });
    buttonPrevious.addEventListener('click', function () {
      previousPage(data.listitems);
      var current_btn = document.querySelector('.kpPagination__nav li.-active');
      var previousPageButton = current_btn.previousSibling;
      var currentScreenReader = current_btn.querySelector('.screenreader-only');
      var newScreenReader = previousPageButton.querySelector('.screenreader-only');
      current_btn.classList.remove('-active');
      currentScreenReader.innerText = 'page';
      previousPageButton.classList.add('-active');
      newScreenReader.innerText = 'active page';
    });
  },

  //Math to output page number of total
  numPages = function numPages() {
    return Math.ceil(data.listitems.length / rows);
  },
      init = function init() {
    setupPageCountMobile();
    showListItems(data.listitems, listElement, rows, currentPage);
    setupPaginationDesktop(data.listitems, paginationElement, rows);
    setupPaginationMobile(data.listitems, paginationMobileElement, rows);
    nextPrevEventListener();

    window.addEventListener('resize', function () {
      setupPaginationDesktop(data.listitems, paginationElement, rows);
      setupPaginationMobile(data.listitems, paginationMobileElement, rows);
    });
  };
  if (data.listitems < 10) {
    parentPagination.style.visibility = "hidden";
    showListItems(data.listitems, listElement, rows, currentPage);
  } else {
    init();
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map