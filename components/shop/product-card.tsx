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


export default function ProductCard(props: ProductData) {

  async function addToCart() {

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center justify-center min-h-[4rem]"
        >
          {props.name}</CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={props.image}
            fill
            sizes="100%"
            alt={props.name}
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{props.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>{props.price}</p>
        </div>
        <Button size={'lg'} variant={'default'} onClick={addToCart}>
          Comprar Agora
        </Button>
      </CardFooter>
    </Card>

  )
}