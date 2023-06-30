type CartItem = {
  title: string;
  price: number;
  id: string;
  category: string;
  description: string;
  quantity: number;
};

type Product = { title: string; price: number; id: string; category: string; description: string };

type Order = {
  phone: number;
  pickupDate: string;
  pickupAddress: string;
};
