"use client"

import Link from "next/link"
import Image from "next/image"
import React from "react"
import { ArrowLeft, Star, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const { getProductById, getRelatedProducts } = useProducts()

  // Unwrap params using React.use()
  const { slug } = React.use(params)

  // Obtener el producto según el slug
  const product = getProductById(slug)

  // Si no se encuentra el producto, redirigir a 404
  if (!product) {
    router.push("/404")
    return null
  }

  // Obtener productos relacionados
  const relatedProducts = getRelatedProducts(product.id)

  // Verificar si tiene descuento
  const hasDiscount = product.discountPercentage !== undefined && product.originalPrice !== undefined

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link
        href={`/categorias/${product.categoryId}`}
        className="inline-flex items-center text-gray-600 mb-6 hover:text-gray-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a {product.category}
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imágenes del producto */}
        <div className="space-y-4">
          <div className="relative border rounded-lg overflow-hidden bg-white">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full object-contain h-[400px]"
            />

            {/* Badge de descuento */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                -{product.discountPercentage}%
              </div>
            )}

            {/* Badge de nuevo */}
            {product.isNew && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                NUEVO
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className="border rounded-md overflow-hidden hover:border-yellow-400">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} vista ${i}`}
                  width={100}
                  height={100}
                  className="w-full h-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">{Math.floor(Math.random() * 20) + 1} reseñas</span>
            </div>
          </div>

          <div className="text-3xl font-bold">
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-red-600">${product.price.toLocaleString()}</span>
                <span className="text-gray-500 line-through text-xl">${product.originalPrice?.toLocaleString()}</span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-md">
                  Ahorro: ${(product.originalPrice! - product.price).toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-gray-800">${product.price.toLocaleString()}</span>
            )}
          </div>

          <div className="prose max-w-none text-gray-600">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-b py-4 border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Especificaciones:</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              {product.specifications.map((spec) => (
                <div key={spec.name} className="flex justify-between col-span-2">
                  <dt className="text-gray-500">{spec.name}</dt>
                  <dd className="text-gray-800 font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">¿Interesado en este producto?</h3>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              onClick={() =>
                window.open(
                  `https://wa.me/59812345678?text=Hola, estoy interesado en el producto: ${product.name} (${product.price.toLocaleString()} pesos)`,
                  "_blank",
                )
              }
            >
              <Phone className="h-5 w-5" />
              Consultar por WhatsApp
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Nuestro equipo te responderá a la brevedad con información sobre disponibilidad y formas de pago.
            </p>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-16">
        <Tabs defaultValue="descripcion">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="descripcion">Descripción Detallada</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
          </TabsList>
          <TabsContent value="descripcion" className="py-6">
            <div className="prose max-w-none">
              <p>
                {product.name} es un producto de alta calidad diseñado para ofrecer máximo rendimiento y durabilidad.
                Este producto de {product.category} cuenta con todas las características que necesitas para tus
                proyectos.
              </p>
              <p>
                Su diseño ergonómico permite un uso cómodo durante largos períodos de trabajo, mientras que su calidad
                superior te da la confianza que necesitas para cada tipo de proyecto.
              </p>
              <p>
                Fabricado con los mejores materiales, este producto es una opción versátil para todo tipo de
                aplicaciones relacionadas con {product.category.toLowerCase()}.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="caracteristicas" className="py-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
              <li>Incluye garantía del fabricante</li>
              <li>Servicio técnico disponible</li>
              <li>Envío a todo Uruguay</li>
            </ul>
          </TabsContent>
          <TabsContent value="opiniones" className="py-6">
            <div className="space-y-6">
              {[
                {
                  name: "Carlos Rodríguez",
                  date: "15/03/2025",
                  rating: 5,
                  comment: `Excelente ${product.category.toLowerCase()}, muy buena calidad y el precio está bien. Lo recomiendo totalmente.`,
                },
                {
                  name: "María González",
                  date: "02/02/2025",
                  rating: 4,
                  comment: "Muy buena relación calidad-precio. El servicio de entrega fue muy rápido.",
                },
                {
                  name: "Juan Pérez",
                  date: "10/01/2025",
                  rating: 4,
                  comment: `Funciona muy bien, aunque esperaba algo más de un producto de ${product.category.toLowerCase()}.`,
                },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Productos relacionados */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

