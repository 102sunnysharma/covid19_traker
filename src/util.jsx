export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => b.cases - a.cases);

  return sortedData.map((country) => ({
    country: country.country,
    cases: country.cases,
  }));
};
