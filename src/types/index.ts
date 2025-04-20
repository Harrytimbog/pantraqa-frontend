export interface StockItem {
    id: number;
    drinkId: number;
    storageLocationId: number;
    quantity: number;
    threshold: number;
    updatedAt: string;
    Drink: {
        name: string;
        size: string;
        category: string;
    };
    StorageLocation: {
        name: string;
        type: string;
    };
}


export interface Drink {
    id: number;
    name: string;
    size: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}


export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    role: 'admin' | 'manager' | 'staff';
    createdAt: string;
    updatedAt: string;
}