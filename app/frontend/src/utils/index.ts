export function formatPrice(price: number | string): string {
    if (typeof price === 'string') {
        // If it's already a string (like "$78"), return it
        if (price.startsWith('$')) return price.substring(1);

        // Try to convert to number
        const numPrice = Number.parseFloat(price);
        if (isNaN(numPrice)) return price;
        price = numPrice;
    }

    // Format with 2 decimal places if there are cents, otherwise as a whole number
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
}
