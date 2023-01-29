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
  const b = Math.round(x);
  return b?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const filterByCategory = (param, objArray) => {
  return objArray.filter((item) => {
    return item.category == param;
  });
};

const capitalizeFirstString = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

const sliceString = (str, length) => {
  return str?.slice(0, length) + `${str?.length > length ? '...' : ''}`;
};

const string2Html = (htmlString) => {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, 'text/html');
  const allpEl = htmlDoc.getElementsByTagName('p');

  return allpEl[0].textContent;
};

const removePTag = (text) => {
  return text.replace('<p>', '').replace('</p>', '');
};

export { slugify, numberWithCommas, filterByCategory, capitalizeFirstString, sliceString, string2Html, removePTag };
