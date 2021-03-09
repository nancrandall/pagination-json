import PaginationInit from './pagination';

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    PaginationInit();
  }
}
