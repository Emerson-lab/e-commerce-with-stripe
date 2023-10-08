'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import { Button } from "../ui/button"
import { ProductData } from "src/types"
import Image from "next/image"


export default function ProductCard({
  name,
  image,
  description,
  price
}: ProductData) {

  async function addToCart() {

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
          <p>{price}</p>
        </div>
        <Button size={'lg'} variant={'default'} onClick={addToCart}>
          Comprar Agora
        </Button>
      </CardFooter>
    </Card>

  )
}