const slugify = (str) => {
  str
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return str;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const filterByCategory = (param, objArray) => {
  return objArray.filter((item) => {
    return item.category == param;
  });
};

export { slugify, numberWithCommas, filterByCategory };
