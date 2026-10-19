import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createSortedRowModel,
  filterFn_includesString,
  filterFn_inNumberRange,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table';

export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: {
    includeStrings: filterFn_includesString,
    isNumberRange: filterFn_inNumberRange,
  },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

export type DataTableFeatures = typeof features;
