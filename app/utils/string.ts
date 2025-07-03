import { BillingAddress, Dealer } from "@/types/order";

export function capitalizeWords(str: string) {
    return str
        .split(/[_\s-]+/) // Split string by underscore, whitespace, or hyphen
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words with a space
}
export function dealerToString(dealer: Dealer) {
    return `${dealer.Addressee}, ${dealer["Address 1"]}, ${dealer.City}, ${dealer["State/Province"].text}, ${dealer["Zip Code"]}, ${dealer.Country.text}`;
}

// create a function that will transform a string camel case to Capitalize words
export function camelCaseToWords(str: string) {
    return str
        .replace(/([A-Z])/g, ' $1') // Add a space before every capital letter
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/^./, (firstLetter: string) => firstLetter.toUpperCase()) // Capitalize the first letter
        .trim(); // Remove leading and trailing whitespace
}

export function billingAddressToStringAddress(billingAddress: BillingAddress) {
    // concat all keys of billing address in a such way so that it represent a full address. The string address should not include email, phone, names, company name, apartment
    const addressKeys = Object.keys(billingAddress).filter((key) => !['email', 'phone', 'firstName', 'lastName', 'companyName', 'apartment'].includes(key));
    const orderedKeys = [
        'Street Address', 'Address', 'Suburb', 'District', 'Town / District', 'Town / City / Post Office', 'City',
        'Municipality', 'Municipality / District', 'County', 'State/County', 'State', 'Province', 'Region',
        'State / Zone', 'Prefecture', 'Department', 'Parish', 'Canton', 'Country', 'Postal code', 'Postcode',
        'ZIP Code', 'PIN Code', 'Eircode', 'Postal Code'
    ];

    const addressParts = orderedKeys
        .filter(key => billingAddress[key])
        .map(key => billingAddress[key]);

    return addressParts.join(', ');
}


export function truncWord(word: string, maxLength=10) {
    if (word.length <= maxLength) {
        return word;
    }
    return `${word.slice(0, maxLength)}...`;
}
