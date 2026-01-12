import {createContext, type ReactNode, useState } from "react";
import type { ProductProps } from '../pages/home';

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode
}

export const CartContext = createContext({} as CartContextData);


function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([]);

    function addItemCart(newItem: ProductProps){

        // Adicionar ao carrinho
        // Verificar se já não existe no carrinho

        const indexItem = cart.findIndex(item => item.id === newItem.id) // Se não encontrar, devolve -1

        if (indexItem !== -1) {
            // Somar +1 a quantidade e calcular o total do carrinho
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            return;
        }

        // Adicionar o item a lista
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price

        }

        setCart(products => [...products, data]) // Aqui o 'products' é o argumento da função. Ele é um apelido para cart. Ou seja, products === cart.

    }
    return (
        <CartContext.Provider 
            value={{
                cart,
                cartAmount: cart.length,
                addItemCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;