//tipizzazione del prodotto
export type Product = {
    id: string;
    name: string;
    description: string;
};

//elenco di prodotti
export const PRODUCTS: Product[] = [

    {
        id: "1",
        name: "Pizza Margherita",
        description: "Pomodoro, mozzarella, basilico fresco"
    },

        {
        id: "2",
        name: "Pizza alla Carbonara",
        description: "Uova, guanciale, pecorino, pepe nero"
    },

    {
        id: "3",
        name: "Tiramisù",
        description: "Savoiardi, mascarpone, caffè, cacao amaro"
    },
]
