export type TPriceFilter = {
    min: number,
    max: number
}
export type TSingleFilter = {
    value: string | number,
    count: number
}

export type TFilters = {
    width?: TSingleFilter[],
    msrp?: TSingleFilter[],
    diameter?: TSingleFilter[],
    map_price?: TSingleFilter[],
    load_index?: TSingleFilter[],
    rim_diameter?: TSingleFilter[],
    color?: TSingleFilter[],
    model?: TSingleFilter[],
    brand?: TSingleFilter[],
    price: TPriceFilter,
    product_sub_type?: TSingleFilter[],
}
