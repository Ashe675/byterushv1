
export const routes = {
    home: '/',
    auth: {
        register: '/auth/register',
        login: '/auth/login', 
    },
    categories: {
        list: '/categories',
        detail: (categoryName: string) => `/categories/${categoryName}`,
    },
    admin: {
        orders: '/admin', 
        products: '/admin/products',
    },
}