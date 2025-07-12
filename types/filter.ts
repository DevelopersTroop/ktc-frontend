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
    offset?: TSingleFilter[],
    weight?: TSingleFilter[],
    tire_height?: TSingleFilter[],
    material?: TSingleFilter[],
    msrp?: TSingleFilter[],
    diameter?: TSingleFilter[],
    map_price?: TSingleFilter[],
    load_index?: TSingleFilter[],
    rim_diameter?: TSingleFilter[],
    color?: TSingleFilter[],
    model?: TSingleFilter[],
    display_model_no?: TSingleFilter[],
    fancy_finish_desc?: TSingleFilter[],
    brand_desc?: TSingleFilter[],
    brand?: TSingleFilter[],
    price: TPriceFilter,
    product_sub_type?: TSingleFilter[],
    tire_type?: TSingleFilter[],
    load_range?: TSingleFilter[],
    bolt_pattern_metric?: TSingleFilter[],
    bolt_pattern_standard?: TSingleFilter[],
}
