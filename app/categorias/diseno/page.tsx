"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

export default function DisenoPage() {
  const { categories, getProductsByCategory } = useProducts()
  const categoryId = "diseno"
  const category = categories.find((cat) => cat.id === categoryId)
  const products = getProductsByCategory(categoryId)

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">{category?.name}</h1>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-600 max-w-3xl">
          {category?.description ||
            "Transforma tus espacios con nuestra colección de productos para diseño interior. Ofrecemos vinilos, baldosas, PVC y muchos otros materiales para renovar tu hogar con estilo."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

