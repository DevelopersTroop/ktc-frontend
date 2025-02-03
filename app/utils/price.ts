import { TCartState } from './../globalRedux/features/cart/cart-slice';
export function formatPrice(number: number): string {
    // Fix the number to 2 decimal places and add comma formatting
    return number.toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
export function isSale(msrp: number, map: number): boolean {
    return msrp > map && map !== 0 && msrp !== 0;
}
export function getPrice(msrp: number, map: number): number {
    if (isSale(msrp, map)) {
        return map;
    }
    if (msrp === 0) {
        return map;
    }
    if (map === 0) {
        return msrp;
    }
    return map;
}


export function calculateCartTotal<T = string>(products: TCartState['products'], format: boolean = true): T {
    let totalPrice = 0;
    for (let sku in products) {
        const product = products[sku];
        totalPrice += product.price * product.quantity;
    }
    return format ? formatPrice(totalPrice) as T : totalPrice as T;
}