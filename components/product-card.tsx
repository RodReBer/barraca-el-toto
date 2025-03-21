import Link from "next/link"
import Image from "next/image"
import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/contexts/product-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPercentage !== undefined && product.originalPrice !== undefined

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={288}
          height={192}
          className="h-full w-full object-contain"
        />

        {/* Badges para descuento o nuevo */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              NUEVO
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-yellow-600 font-medium mb-1">{product.category}</div>
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.shortDescription}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-gray-500 line-through text-sm">${product.originalPrice?.toLocaleString()}</span>
                <span className="font-bold text-red-600">${product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="font-bold text-gray-800">${product.price.toLocaleString()}</span>
            )}
          </div>
          <Link href={`/producto/${product.id}`}>
            <Button size="sm" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
              Ver Producto
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

