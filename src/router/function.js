const filter = {};

filter.map = ["public"];

filter.title = function (to) {
  document.title = to.meta.title || "默认title";
};

filter.stop = function (to) {
  if (filter.map.indexOf(to.name)) {
    return false;
  } else {
    return true;
  }
};

export { filter };
