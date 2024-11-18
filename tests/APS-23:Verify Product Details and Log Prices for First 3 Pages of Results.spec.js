import { test, expect } from "@playwright/test";

test("Ananas Page - Product Verification with Banner Check", async ({ page }) => {
    await page.goto("https://ananas.rs/");

   
    // Click on the "Slažem se" button
    const slazemSeButton = page.locator('[class="sc-1rhklln-0 gIUtAK"]');
    await slazemSeButton.click();

    // Function that checks for and closes the banner
    const closeBannerIfExists = async () => {
        const closeButton = page.locator('svg.close-button');
        const closeButtonCount = await closeButton.count();
        if (closeButtonCount > 0) {
           await closeButton.click(); 
        }
    };

     // Check for banner every 2 seconds
     const bannerCheckInterval = setInterval(async () => {
    await closeBannerIfExists();
    }, 2000);

    // Product search
    const searchBar = page.locator('[class="aa-Input"]');
    await searchBar.click();
    await searchBar.fill("patike");

    const searchButton = page.locator('[aria-label="Search"]');
    await searchButton.click();

    // Locator for all products on the page
    const allProductsParent = page.locator('[class="ais-Hits"]'); // Parent element for products
    const products = allProductsParent.locator('[class="ais-Hits-item"]'); // Child locator for each product
    const productCount = await products.count();

    // Check products on the first page
    for (let i = 0; i < productCount; i++) {
        const product = products.nth(i);

        // Check if the product has an image
        const image = product.locator('img[alt]:not([aria-hidden="true"])').first();
        await expect(image).toHaveAttribute("alt", /.+/);

        // Check if the product has a price with the RSD label
        const price = product.locator('[class="sc-1arj7wv-3 hasJsD"]');
        await expect(price).toContainText("RSD");

        // Check if the product has a title and description
        const titleAndDescription = product.locator('[class="sc-14no49n-0 sc-492kdg-1 eZmkQR bmZJba"]');
        await expect(titleAndDescription).toHaveText(/.+/);
    }
    //await page.pause();
    // Click on the pagination ‘2’
    const paginationButton2 = page.locator('[class="sc-hj4qyi-0 czzIrF"]').filter({ hasText: "2" });
    await paginationButton2.click();

    // Verify products on the second page
    const secondPageProducts = allProductsParent.locator('[class="ais-Hits-item"]');
    const secondPageProductCount = await secondPageProducts.count();

    for (let i = 0; i < secondPageProductCount; i++) {
        const product = secondPageProducts.nth(i);

        // Check if the product has an image
        const image = product.locator('img[alt]:not([aria-hidden="true"])').first();
        await expect(image).toHaveAttribute("alt", /.+/);

        // Check if the product has a price with the RSD label
        const price = product.locator('[class="sc-1arj7wv-3 hasJsD"]');
        await expect(price).toContainText("RSD");

        // Check if the product has a title and description
        const titleAndDescription = product.locator('[class="sc-14no49n-0 sc-492kdg-1 eZmkQR bmZJba"]');
        await expect(titleAndDescription).toHaveText(/.+/);
    }
    //await page.pause();

    // Click on the pagination ‘Next’
    const nextPaginationButton = page.locator('[class="ais-Pagination-item ais-Pagination-item--nextPage"]');
    await nextPaginationButton.click();

    // Verify products on the third page
    const thirdPageProducts = allProductsParent.locator('[class="ais-Hits-item"]');
    const thirdPageProductCount = await thirdPageProducts.count();

    for (let i = 0; i < thirdPageProductCount; i++) {
        const product = thirdPageProducts.nth(i);

        // Check if the product has an image
        const image = product.locator('img[alt]:not([aria-hidden="true"])').first();
        await expect(image).toHaveAttribute("alt", /.+/);

        // Check if the product has a price with the RSD label
        const price = product.locator('[class="sc-1arj7wv-3 hasJsD"]');
        await expect(price).toContainText("RSD");

        // Check if the product has a title and description
        const titleAndDescription = product.locator('[class="sc-14no49n-0 sc-492kdg-1 eZmkQR bmZJba"]');
        await expect(titleAndDescription).toHaveText(/.+/);
    }

    // Stop the banner interval
    clearInterval(bannerCheckInterval);

    //await page.pause();
});