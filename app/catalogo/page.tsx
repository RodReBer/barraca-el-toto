"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

export default function CatalogoPage() {
  const { categories, getProductsByCategory } = useProducts()

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Catálogo de Productos</h1>
      </div>

      <Tabs defaultValue={categories[0].id} className="mt-8">
        <TabsList className="w-full flex justify-start overflow-auto py-2 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getProductsByCategory(category.id).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href={`/categorias/${category.id}`}>
                <Button className="bg-gray-800 hover:bg-gray-700">Ver todos los productos de {category.name}</Button>
              </Link>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

