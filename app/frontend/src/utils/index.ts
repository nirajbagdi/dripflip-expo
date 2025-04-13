export function formatPrice(price: number | string): string {
    if (typeof price === 'string') {
        // If it's already a string (like "$78"), return it
        if (price.startsWith('$')) return price;

        // Try to convert to number
        const numPrice = Number.parseFloat(price);
        if (isNaN(numPrice)) return price;
        price = numPrice;
    }

    return `$${price.toFixed(2)}`;
}
