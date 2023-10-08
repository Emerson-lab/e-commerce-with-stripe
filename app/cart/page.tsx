'use client'

import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import Image from 'next/image';
import { Loader, Trash2 } from 'lucide-react';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';


export default function Cart() {
  const [isChekingOut, setIsChecingkOut] = useState(false);
  const { cartCount, cartDetails, redirectToCheckout, clearCart, removeItem } = useShoppingCart();

  async function checkout() {
    setIsChecingkOut(true);

    const response = await fetch('/api/checkout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails)
    });

    console.log('response',response)

    if (response.ok) {
      try {
        const {id}  = await response.json();

        const result = await redirectToCheckout(id);
        console.log('result', result);

      } catch (error) {
        console.error("Erro ao fazer o parse da resposta JSON:", error);
      }
    } else {
      console.error("Erro na requisição: ", response.status);
    }
    setIsChecingkOut(false);
  }


  return (
    <section className="flex flex-col my-2 space-y-2">
      {cartDetails &&
        Object.keys(cartDetails).map(key => (
          <Card key={key}>

            <CardHeader>
              <CardTitle className='tracking-wider'>
                {cartDetails[key].name} {' '} ({cartDetails[key].quantity})
              </CardTitle>
              <CardDescription className='text-md tracking-wider'>
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>

            <CardContent className='grid gap-6'>
              <div className='flex items-center justify-between space-x-4'>
                <div className='flex items-center space-x-4'>
                  <div className='relative w-28 h-28'>
                    <Image
                      src={cartDetails[key].image ?? ''}
                      fill
                      alt={cartDetails[key].name}
                      className='object-contain'
                    />
                  </div>
                  <div>
                    <p className='text-md font-medium leading-none'>Preço</p>
                    <p className='text-md text-muted-foreground'>
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                </div>
                <Trash2
                  className='text-red-400 hover:text-red-600'
                  onClick={() => removeItem(cartDetails[key].id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      <div
        className={cn(
          'flex items-center justify-between',
          cartCount === undefined || cartCount <= 0 ? 'hidden' : ''
        )}
      >
        <button
          onClick={clearCart}
        >
          remover todos items
        </button>

        <Button
          variant={'default'}
          size={'lg'}
          onClick={checkout}
          disabled={isChekingOut}
        >
          {isChekingOut ?
            <div>
              <Loader className='animate-spin 2s repeat-infinite' />{' '}
            </div>
            :
            'Finalizar'
          }
        </Button>
      </div>
    </section>
  )
}