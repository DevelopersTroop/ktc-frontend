import { TFilters, TPriceFilter, TSingleFilter } from "../types/filter"

export const getPriceFilter = (filters: TFilters) => {
    return "min" in filters?.price ? filters?.price : { min: 0, max: 0 }
}
export function isPriceFilter(filter: TPriceFilter | TSingleFilter[]): filter is TPriceFilter {
    return "min" in filter
}
export const getFiltersExceptPriceFilterBy = (filters: TFilters, filterKey: string) => {
    return !isPriceFilter(filters[filterKey]) ? filters[filterKey] : ([] as TSingleFilter[])
}



