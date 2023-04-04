export type CartItem = {
  title: string;
  price: number;
  id: string;
  category: string;
  description: string;
  quantity: number;
};

export type Product = { title: string; price: number; id: string; category: string; description: string };

export type Order = {
  phone: number;
  pickupDate: string;
  pickupAddress: string;
};
