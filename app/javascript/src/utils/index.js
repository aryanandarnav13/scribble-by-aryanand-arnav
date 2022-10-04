export const buildSelectOptions = selectOptions =>
  selectOptions.map(selectOption => ({
    label: selectOption,
    value: selectOption,
  }));
