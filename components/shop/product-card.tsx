'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { ProductData } from "src/types"
import { useToast } from "../ui/use-toast"
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'

export default function ProductCard({
  name,
  image,
  description,
  price,
  id,
  currency
}: ProductData) {

  const { toast } = useToast();
  const { addItem } = useShoppingCart();
  const fomattedPrice = formatCurrencyString({
    value: +price,
    currency: 'BRL'
  })

  async function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addItem({ name, description, id, currency, price: Number(price), image });
    toast({
      title: `${name} Adicionado`,
      description: "Adicione mais por descontos."
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center justify-center min-h-[4rem]"
        >
          {name}</CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={image}
            fill
            sizes="100%"
            alt={name}
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>
            {fomattedPrice}
          </p>
        </div>
        <Button size={'lg'} variant={'default'} onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>

  )
}