const { Actor, HttpAgent } = require("@dfinity/agent");
const { idlFactory } = require("./sbic2024_products.did.js");

const canisterId = "cw2e2-nyaaa-aaaai-qpeyq-cai";
const agent = new HttpAgent({
    host: "https://ic0.app", // mainnet url | local dfx http://127.0.0.1:4943
});

const sbic2024_products = Actor.createActor(idlFactory, { agent, canisterId });

/**
 * Fetches the list of products from the canister.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 */
const getAllProducts = async () => {
    try {
        const opt_entry = await sbic2024_products.listAll();

        if (opt_entry.length === 0) {
            console.log("No products found.");
            return [];
        } else {
            // Map the optional product entries to an array, providing default values for undefined properties.
            const productList = opt_entry.map((product) => ({
                sku: product?.sku || "",
                name: product?.name || "",
                // Add other properties from your product type here as needed
            }));

            // Log the loaded products (optional)
            console.log("Loaded products:", productList);

            return productList;
        }
    } catch (error) {
        console.error("Error loading products:", error);
        // Handle the error appropriately, e.g., rethrow or return an empty array
        return [];
    }
}


module.exports = { getAllProducts }; 