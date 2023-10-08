import Stripe from 'stripe'
import stripe from 'src/lib/stripe';
import { ProductData } from 'src/types';
import ProductCard from './product-card';

async function getProducts() {
  try {
    const stripePorducts = await stripe.products.list({
      limit: 9,
      expand: ['data.default_price'],
    })
    return stripePorducts.data.map((product: Stripe.Product): ProductData => {
      return {
        id: product.id,
        name: product.name,
        description: product.description ?? '',
        price: (product.default_price as Stripe.Price).unit_amount_decimal ?? '0',
        currency: (product.default_price as Stripe.Price).currency ?? 'BRL',
        images: product.images,
        image: product.images[0]
      }
    })
  } catch (err: any) {
    console.error('error....>', err.message)
  }

}

export default async function ProducList() {
  const products = await getProducts();
  return (
    <section>
      {products?.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  )
}