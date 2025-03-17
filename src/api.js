export const getProducts = async ({
    orderBy = 'recent',
    page = 1,
    pageSize = 10,
} = {}) => {
    const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
    const res = await fetch(`https://panda-market-api.vercel.app/products?${query}`)
    const body = await res.json()
    return body
};

// export const getFavorite = async (productId) => {
//     const res = await fetch(`https://panda-market-api.vercel.app/products/${productId}/favorite`)
//     const favorite = await res.json()
//     return favorite
// };

