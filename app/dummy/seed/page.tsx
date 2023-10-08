import stripe from 'src/lib/stripe'
import { DummyProduct, GetDummyProductsType } from 'src/types';

async function getDummyProducts() {
  const response = await fetch('https://dummyjson.com/products?limit=9');
  const dummyData = await response.json();
  const products: GetDummyProductsType[] = dummyData.products.map((product: DummyProduct) => {

    return {
      id: product.id,
      description: product.description,
      name: product.title,
      images: product.images,
      default_price_data: {
        unit_amount_decimal: product.price,
        currency: 'BRL'
      },
    };
  });
  return products;
};

async function seedDummyDate() {
  const products = await getDummyProducts();
  await products.map(async (product: GetDummyProductsType) => {
    try {
      await stripe.products.create(product);
    } catch (err: any) {
      console.error('stripe_client_error.........>', err.message)
    }
  })
}

export default async function Seed() {
  // await seedDummyDate()
  return (
    <>seed</>
  )
}