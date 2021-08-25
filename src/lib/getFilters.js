import defaultFilters from '../constants/defaultFilters';

const getFilters = (queries) => {
  // Loop over each query from the URL
  const filters = Object.keys(queries).reduce((obj, key) => {
    // If the query is recognised as a filter
    if (defaultFilters[key]) {
      return {
        ...obj,
        [key]: {
          ...obj[key],
          checked: true,
        }
      }
    }
    return obj;
  }, defaultFilters);

  // An array of checked filters to be used to filter results
  const checkedFilters = Object.values(filters).filter((filter) => filter.checked)

  return {
    filters,
    checkedFilters,
  };
};

export default getFilters;
