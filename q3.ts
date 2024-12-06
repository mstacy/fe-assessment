interface Product {
    id: string;
    guid: string;
    in_stock: boolean;
    on_sale: boolean;
    name: string;
    picture: string;
    gender: string;
    categories: string[];
    color: string;
    price: string;
    description: string;
}


function analyzeProducts(products: Product[]) {
    let outOfStockNotOnSaleUnder20: string[] = [];
    let categoryCount: Record<string, number> = {};
    let salePricesSum: number = 0;
    let saleItemsCount: number = 0;
    let womensOutOfStock: Record<string, number> = {};

    for (let product of products) {
        // 1. Products out of stock, not on sale, and under $20
        if (!product.in_stock && !product.on_sale && parseFloat(product.price.replace('$', '')) < 20) {
            outOfStockNotOnSaleUnder20.push(product.name);
        }

        // 2. Count categories
        for (let category of product.categories) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        }

        // 3. Sum of sale items prices
        if (product.on_sale) {
            salePricesSum += parseFloat(product.price.replace('$', ''));
            saleItemsCount++;
        }

        // 4. Women's products out of stock, broken down by color
        if (product.gender === 'female' && !product.in_stock) {
            womensOutOfStock[product.color] = (womensOutOfStock[product.color] || 0) + 1;
        }
    }

    // Find most common category
    const mostCommonCategory = Object.entries(categoryCount)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];

    // Calculate average sale price
    const avgSalePrice = saleItemsCount > 0 ? salePricesSum / saleItemsCount : 0;

    return {
        outOfStockNotOnSaleUnder20,
        mostCommonCategory,
        avgSalePrice: `$${avgSalePrice.toFixed(2)}`,
        womensOutOfStockByColor: womensOutOfStock
    };
}