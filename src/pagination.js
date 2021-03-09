import data from './data';

export default function PaginationInit() { // set your custom pattern init function name
    //vars
    const listElement = document.getElementById('list'),
      parentPagination = document.querySelector(".kpPagination"),
      paginationNavWrapper =document.querySelector(".kpPagination__item-dropdown"),
      paginationElement = document.getElementById('pagination'),
      paginationMobileElement = document.getElementById('kpPagination__select'),
      buttonNext = document.getElementById("buttonNext"),
      buttonPrevious = document.getElementById("buttonPrevious"),
      pageIndexNumber = document.getElementById("page");
    let rows = 10,
      currentPage = 1;
  
    var  getCurrentWindowWidth = function() {
      var w = window,
          d = document,
          de = d.documentElement,
          b = de.getElementsByTagName('body')[0],
          windowWidth = w.innerWidth || de.clientWidth || b.clientWidth;
      return windowWidth;
    },
    getCurrentBreakpoint = function() {
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
  
    showListItems = function(items, articleWrapper, rows_per_page, page) {
      articleWrapper.innerHTML = "";
      page--;
      let start = rows_per_page * page,
        end = start + rows_per_page,
        paginatedItems = items.slice(start, end);
    
      for (let i = 0; i < paginatedItems.length; i++) {
        let itemImage = '<div class="news__articles-image">' + '<img src="../_images/' + paginatedItems[i].image + '" />' + '</div>';
        let itemSubtitle = '<div class="news__articles-text--small"> <p>' + paginatedItems[i].subtitle + " | " + paginatedItems[i].date + '</p></div>';
        let itemTitle = '<h3 class="news__articles-title">' + '<a href="' + paginatedItems[i].links + '">' + paginatedItems[i].title + '</a>' + '</h3>';
        let itemDescription = '<div class="news__articles-text">' + paginatedItems[i].description + '</div>';
        let item_element = document.createElement('div');
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
          buttonPrevious.querySelector('.screenreader-only').innerText = 'Disabled previous page, pagination reached first page'
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
          buttonNext.classList.add('-disabled')
          buttonNext.querySelector('.screenreader-only').innerText = 'Disabled Next page, pagination reached last page'
          buttonNext.querySelector('.kpPagination__link').setAttribute("tabIndex", " -1");
        }
        articleWrapper.appendChild(item_element);
  
      }
    },
     setupPaginationDesktop = function(items, wrapper, rows_per_page) {
      wrapper.innerHTML = "";
      if (currentWidth !== undefined && getCurrentBreakpoint() === 'desktop') {
        paginationElement.style.visibility = "visible";
        paginationNavWrapper.style.visibility = "hidden";
      }
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButtonDesktop(i, items);
        wrapper.appendChild(btn);
      }
  
    },
    setupPaginationMobile = function(items, mobileWrapper, rows_per_page) {
      mobileWrapper.innerHTML = "";
      if (currentWidth !== undefined && getCurrentBreakpoint() === 'mobile') {
        paginationElement.style.visibility = "hidden";
        paginationNavWrapper.style.visibility = "visible";
      }
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let selectOption = paginationButtonMobile(i, items);
        mobileWrapper.appendChild(selectOption);
      }
    },
    setupPageCountMobile = function() {
      let dropdownLabelNext = document.createElement('p');
      dropdownLabelNext.classList.add('kpPagination__totalPages');
      dropdownLabelNext.innerText = 'of ' + numPages() + ' pages' ;
      paginationNavWrapper.appendChild(dropdownLabelNext);
    },
    paginationButtonMobile = function(page, items) {
      let dropdownOption = document.createElement('option');
      dropdownOption.classList.add('kpPagination__option');
      dropdownOption.classList.add('-page');
      dropdownOption.setAttribute("value", page);
      dropdownOption.innerText = page;
  
    if (currentPage === page) dropdownOption.classList.add('-active');
     [].forEach.call(items, function() {
      paginationMobileElement.addEventListener('change', function() {
       let currentSelectOption = paginationMobileElement.options[paginationMobileElement.selectedIndex];
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
    paginationButtonDesktop = function(page, items) {
        let button = document.createElement('li');
        button.classList.add('kpPagination__item');
        button.classList.add('-page');
        button.innerHTML = '<a class="kpPagination__link" href="javascript:void(0)" >' + '<span class="screenreader-only">page</span>' + '<span class="kpPagination__pageIndex">' + page + '</span></a>';
        if (currentPage == page) button.classList.add('-active');
        button.addEventListener('click', function() {
          currentPage = page;
          console.log('button', currentPage );
          showListItems(items, listElement, rows, currentPage);
          let current_btn = document.querySelector('.kpPagination__nav li.-active');
          let currentScreenReader = current_btn.querySelector('.screenreader-only');
          let newScreenReader = button.querySelector('.screenreader-only');
          current_btn.classList.remove('-active');
          currentScreenReader.innerText = 'page';
          button.classList.add('-active');
          newScreenReader.innerText = 'active page';
        });
        return button;
    },
  
     previousPage = function() {
      if (currentPage > 1) {
        currentPage--;
        showListItems(data.listitems, listElement, rows, currentPage);
      }
    },
    nextPage  = function() {
      if (currentPage < numPages()) {
        currentPage++;
        showListItems(data.listitems, listElement, rows, currentPage);
      }
    },
    nextPrevEventListener = function() {
      buttonNext.addEventListener('click', function() {
        nextPage(data.listitems);
        let current_btn = document.querySelector('.kpPagination__nav li.-active');
        let nextPageButton = current_btn.nextSibling;
        let currentScreenReader = current_btn.querySelector('.screenreader-only');
        let newScreenReader = nextPageButton.querySelector('.screenreader-only');
        current_btn.classList.remove('-active');
        currentScreenReader.innerText = 'page';
        nextPageButton.classList.add('-active');
        newScreenReader.innerText = 'active page';
      });
      buttonPrevious.addEventListener('click', function() {
        previousPage(data.listitems);
        let current_btn = document.querySelector('.kpPagination__nav li.-active');
        let previousPageButton = current_btn.previousSibling;
        let currentScreenReader = current_btn.querySelector('.screenreader-only');
        let newScreenReader = previousPageButton.querySelector('.screenreader-only');
        current_btn.classList.remove('-active');
        currentScreenReader.innerText = 'page';
        previousPageButton.classList.add('-active');
        newScreenReader.innerText = 'active page';
      });
    },
    //Math to output page number of total
    numPages = function() {
      return Math.ceil(data.listitems.length / rows);
    },
    init = function() {
      setupPageCountMobile();
      showListItems(data.listitems, listElement, rows, currentPage);
      setupPaginationDesktop(data.listitems, paginationElement, rows);
      setupPaginationMobile(data.listitems, paginationMobileElement, rows);
      nextPrevEventListener();
  
      window.addEventListener('resize', function() {
        setupPaginationDesktop(data.listitems, paginationElement, rows);
        setupPaginationMobile(data.listitems, paginationMobileElement, rows);
    
      });
    }
    if (data.listitems < 10) {
      parentPagination.style.visibility = "hidden";
      showListItems(data.listitems, listElement, rows, currentPage);
    } 
    else {
      init();
    }
  }
