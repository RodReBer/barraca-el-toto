'use client'

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProducts } from "@/contexts/product-context"
import ProductCard from "@/components/product-card"

export default function Home() {
  const { categories, getFeaturedProducts, getDiscountedProducts } = useProducts()
  const featuredProducts = getFeaturedProducts(6)
  const discountedProducts = getDiscountedProducts(4)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-400">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-800">
                  Barraca y Ferretería "El Toto"
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl">
                  Todo lo que necesitas para construcción, diseño y hogar en un solo lugar. Calidad y variedad en
                  Toledo, Uruguay.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/catalogo">
                  <Button className="bg-gray-800 hover:bg-gray-700">Ver Catálogo</Button>
                </Link>
                <Link href="/contacto">
                  <Button variant="outline" className="border-gray-800 text-gray-800">
                    Contacto
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/el-toto.jpg"
                alt="Barraca El Toto"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
                Nuestras Categorías
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestra amplia variedad de productos para todas tus necesidades
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden border-none shadow-lg flex flex-col h-full">
                <div className="h-60 w-full bg-gray-600 flex items-center justify-center">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={360}
                    height={240}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-6 bg-white flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 mt-2 flex-grow">{category.description}</p>
                  <div className="mt-4">
                    <Link href={`/categorias/${category.id}`}>
                      <Button variant="link" className="p-0 text-gray-800">
                        Ver productos
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Viernes de Descuentos */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400&text=Ofertas"
                alt="Viernes de Descuentos"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Viernes de Descuentos</h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Cada viernes, ofertas exclusivas en productos seleccionados. ¡No te los pierdas!
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {discountedProducts.slice(0, 2).map((product) => (
                  <div key={product.id} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="text-gray-400 line-through">${product.originalPrice?.toLocaleString()}</span>
                        <span className="text-yellow-400 font-bold ml-2">${product.price.toLocaleString()}</span>
                      </div>
                      <Link href={`/producto/${product.id}`}>
                        <Button size="sm" className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">
                          Ver
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/catalogo">
                  <Button className="bg-yellow-400 text-gray-800 hover:bg-yellow-500">Ver Ofertas Actuales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
                Productos Destacados
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestros productos más populares de diversas categorías
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/catalogo">
              <Button className="bg-gray-800 hover:bg-gray-700">Ver Catálogo Completo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="w-full py-12 md:py-16 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">Nuestras Marcas</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Trabajamos con las mejores marcas del mercado
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-8 mt-8">
            {["Stanley", "Bosch", "Tramontina", "3M", "Philips", "Black & Decker"].map((brand, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=80&width=120&text=${brand}`}
                  alt={`Marca ${brand}`}
                  width={120}
                  height={80}
                  className="object-contain h-16 md:h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">
                  Sobre Nosotros
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Barraca y Ferretería "El Toto" es una empresa familiar con más de 20 años de experiencia en Toledo,
                  Uruguay. Nos especializamos en brindar productos de calidad para construcción, diseño y hogar.
                </p>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestro compromiso es ofrecer la mejor atención y asesoramiento a nuestros clientes, con precios
                  competitivos y una amplia variedad de productos.
                </p>
              </div>
              <Link href="/sobre-nosotros">
                <Button variant="outline" className="w-fit border-gray-800 text-gray-800">
                  Conoce más sobre nosotros
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Sobre+Nosotros"
                alt="Sobre Nosotros"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-800">Contacto</h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Estamos aquí para ayudarte. Contáctanos para más información.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-yellow-400 p-6">
                <h3 className="text-2xl font-bold text-gray-800">Información de Contacto</h3>
                <p className="text-gray-700 mt-2">
                  Estamos disponibles para atenderte y responder todas tus consultas.
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Dirección</h4>
                    <p className="text-gray-600">Av. Principal 1234, Toledo, Canelones, Uruguay</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Teléfono</h4>
                    <p className="text-gray-600">+598 2222 3333</p>
                    <p className="text-gray-600">+598 9999 8888 (WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@eltoto.com.uy</p>
                    <p className="text-gray-600">ventas@eltoto.com.uy</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Horarios de Atención</h4>
                  <div className="grid grid-cols-2 gap-2 text-gray-600">
                    <div>Lunes a Viernes</div>
                    <div>8:00 - 19:00</div>
                    <div>Sábados</div>
                    <div>8:00 - 13:00</div>
                    <div>Domingos</div>
                    <div>Cerrado</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-yellow-400 p-6">
                <h3 className="text-2xl font-bold text-gray-800">Envíanos un Mensaje</h3>
                <p className="text-gray-700 mt-2">Completa el formulario y te responderemos a la brevedad.</p>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        placeholder="Tu teléfono"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Asunto
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        placeholder="Asunto de tu mensaje"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  <Button className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500">Enviar Mensaje</Button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ubicación</h3>
            <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Mapa de ubicación</p>
              {/* Aquí iría un mapa real en una implementación completa */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

