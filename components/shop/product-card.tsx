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


export default function ProductCard(props: ProductData) {

  async function addToCart() {

  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{props.description}</p>
      </CardContent>
      <CardFooter>
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