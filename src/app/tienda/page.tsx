"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { CATEGORY_ICONS } from "@/components/ui/category-icons";
import { ProductDetailModal } from "@/components/product/product-detail-modal";
import { useProductDetail } from "@/hooks/useProductDetail";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

const allProducts: Product[] = [
  {
    id: 1,
    name: "Guineo Verde del Magdalena",
    description:
      "Guineo verde de primera calidad, cultivado en las fertiles tierras del Magdalena. Ideal para patacones, sancochos y preparaciones tradicionales colombianas. Producto fresco cosechado directamente del campo, con certificacion de sostenibilidad y comercio justo.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 45000,
    originalPrice: 52000,
    discount: 13,
    unit: "por caja (22kg)",
    location: "Santa Marta, Magdalena",
    rating: 4.8,
    reviews: 156,
    sales: 234,
    stock: 48,
    status: "disponible",
    category: "Plátano",
    certifications: ["fairtrade", "rainforest"],
    badge: "Mas vendido",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Nequi", icon: "nequi" },
      { name: "Efectivo", icon: "efectivo" },
    ],
    shipping: { free: true, cost: 0, estimatedDays: "2-4 dias", available: true },
    relatedProducts: [2, 4, 5],
    traceability: {
      producer: {
        id: 101,
        name: "Pedro Jose Martinez",
        farm: "Finca El Progreso",
        location: "Cienaga, Magdalena",
        verified: true,
        memberSince: "2019",
        description: "Productor de guineo con mas de 15 anos de experiencia. Enfocado en practicas sostenibles y comercio justo para el beneficio de su comunidad.",
      },
      origin: "Cienaga, Magdalena",
      harvestDate: "Hace 3 dias",
      lotNumber: "GVM-2026-0147",
      farmingMethod: "tradiciona",
    },
  },
  {
    id: 2,
    name: "Cafe Organico Sierra Nevada",
    description:
      "Cafe de especialidad cultivado en las alturas de la Sierra Nevada de Santa Marta. Notas de chocolate y caramelo, con acidez media y cuerpo sedoso. Tostado artesanalmente para garantizar el maximo sabor y aroma. Certificado organico y de comercio justo.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 85000,
    originalPrice: 95000,
    discount: 10,
    unit: "por kilo",
    location: "Minca, Magdalena",
    rating: 4.9,
    reviews: 203,
    sales: 189,
    stock: 32,
    status: "disponible",
    category: "Café",
    certifications: ["fairtrade", "organic"],
    badge: "Premium",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Nequi", icon: "nequi" },
    ],
    shipping: { free: true, cost: 0, estimatedDays: "2-3 dias", available: true },
    relatedProducts: [3, 6, 1],
    traceability: {
      producer: {
        id: 102,
        name: "Maria Elena Torres",
        farm: "Finca La Esperanza",
        location: "Minca, Magdalena",
        verified: true,
        memberSince: "2017",
        description: "Cultivadora de cafe organico en las montanas de Minca. Aplica sistemas agroforestales que protegen la biodiversidad de la Sierra Nevada.",
      },
      origin: "Minca, Sierra Nevada",
      harvestDate: "Hace 5 dias",
      lotNumber: "CSN-2026-0082",
      farmingMethod: "agroforestal",
    },
  },
  {
    id: 3,
    name: "Cacao Fino de Aroma",
    description:
      "Cacao fino de aroma reconocido internacionalmente por su calidad superior. Cultivado en la region de Fundacion, Magdalena. Perfecto para la produccion de chocolate artesanal y productos gourmet. Granos fermentados y secados al sol.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 65000,
    originalPrice: 72000,
    discount: 9,
    unit: "por kilo",
    location: "Fundacion, Magdalena",
    rating: 4.7,
    reviews: 98,
    sales: 156,
    stock: 25,
    status: "disponible",
    category: "Cacao",
    certifications: ["rainforest"],
    badge: "Exportacion",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Nequi", icon: "nequi" },
    ],
    shipping: { free: false, cost: 8000, estimatedDays: "3-5 dias", available: true },
    relatedProducts: [2, 6, 1],
    traceability: {
      producer: {
        id: 103,
        name: "Carlos Andres Gutierrez",
        farm: "Hacienda San Jose",
        location: "Fundacion, Magdalena",
        verified: true,
        memberSince: "2020",
        description: "Productor de cacao fino de aroma con certificacion Rainforest Alliance. Sus granos son exportados a mercados europeos y japoneses.",
      },
      origin: "Fundacion, Magdalena",
      harvestDate: "Hace 7 dias",
      lotNumber: "CFA-2026-0203",
      farmingMethod: "agroforestal",
    },
  },
  {
    id: 4,
    name: "Mango Tommy Atkins",
    description:
      "Mango Tommy Atkins de excelente calidad, cultivado en las tierras calidas del Magdalena. Dulce, jugoso y con fibra fina. Ideal para jugos, ensaladas y consumo directo. Cosechado en su punto optimo de maduracion.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 30000,
    originalPrice: 38000,
    discount: 21,
    unit: "por caja (10kg)",
    location: "Cienaga, Magdalena",
    rating: 4.6,
    reviews: 134,
    sales: 312,
    stock: 60,
    status: "disponible",
    category: "Mango",
    certifications: [],
    badge: "Oferta",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Efectivo", icon: "efectivo" },
    ],
    shipping: { free: true, cost: 0, estimatedDays: "1-3 dias", available: true },
    relatedProducts: [1, 5, 8],
    traceability: {
      producer: {
        id: 104,
        name: "Luz Marina Herrera",
        farm: "Finca Las Delicias",
        location: "Cienaga, Magdalena",
        verified: false,
        memberSince: "2021",
        description: "Productora de frutas tropicales con enfoque en mango de exportacion. Sus frutas son conocidas por su dulzura y calidad.",
      },
      origin: "Cienaga, Magdalena",
      harvestDate: "Hace 2 dias",
      lotNumber: "MTA-2026-0315",
      farmingMethod: "tradiciona",
    },
  },
  {
    id: 5,
    name: "Arroz Oro del Magdalena",
    description:
      "Arroz premium de grano largo, cultivado en las vegas del rio Magdalena. Grano entero, blanco y brillante. Ideal para acompanamientos, arroces y preparaciones tradicionales colombianas. Producto de alta calidad con garantia de frescura.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 55000,
    originalPrice: 55000,
    discount: 0,
    unit: "por bulto (50kg)",
    location: "Aracataca, Magdalena",
    rating: 4.8,
    reviews: 187,
    sales: 198,
    stock: 15,
    status: "disponible",
    category: "Arroz",
    certifications: ["fairtrade"],
    badge: null,
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Nequi", icon: "nequi" },
      { name: "Efectivo", icon: "efectivo" },
    ],
    shipping: { free: true, cost: 0, estimatedDays: "2-4 dias", available: true },
    relatedProducts: [1, 4, 7],
    traceability: {
      producer: {
        id: 105,
        name: "Jose Gregorio Pacheco",
        farm: "Finca El Eden",
        location: "Aracataca, Magdalena",
        verified: true,
        memberSince: "2018",
        description: "Productor de arroz con certificacion Fairtrade. Sus cultivos emplean a mas de 20 familias de la zona rural de Aracataca.",
      },
      origin: "Aracataca, Magdalena",
      harvestDate: "Hace 4 dias",
      lotNumber: "AOM-2026-0098",
      farmingMethod: "organico",
    },
  },
  {
    id: 6,
    name: "Aceite de Palma Africana",
    description:
      "Aceite de palma aceitera 100% natural, producido en las plantaciones del Magdalena. Rico en vitamina E y carotenos. Ideal para cocina, frituras y procesamiento alimentario. Cultivado con practicas sostenibles y certificacion ambiental.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 40000,
    originalPrice: 45000,
    discount: 11,
    unit: "por garrafin (5 litros)",
    location: "Sierra Nevada, Magdalena",
    rating: 5.0,
    reviews: 67,
    sales: 89,
    stock: 3,
    status: "disponible",
    category: "Palma Aceitera",
    certifications: ["organic"],
    badge: "Sostenible",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "Nequi", icon: "nequi" },
    ],
    shipping: { free: false, cost: 5000, estimatedDays: "3-5 dias", available: true },
    relatedProducts: [2, 3, 7],
    traceability: {
      producer: {
        id: 106,
        name: "Ramon Antonio Vargas",
        farm: "Hacienda Palma Verde",
        location: "Sierra Nevada, Magdalena",
        verified: true,
        memberSince: "2016",
        description: "Productor de palma aceitera con mas de 20 anos de experiencia. Sus plantaciones aplican sistemas sostenibles que protegen la biodiversidad.",
      },
      origin: "Sierra Nevada, Magdalena",
      harvestDate: "Hace 10 dias",
      lotNumber: "APA-2026-0041",
      farmingMethod: "agroforestal",
    },
  },
  {
    id: 7,
    name: "Carne Bovina Premium",
    description:
      "Carne bovina de ganado criollo, alimentado con pastos naturales del Magdalena. Corte premium con marmoleo ideal para asados, bifes y preparaciones gourmet. Producto fresco con garantia de trazabilidad desde el pastoreo hasta su mesa.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 25000,
    originalPrice: 30000,
    discount: 16,
    unit: "por kilo",
    location: "Pivijay, Magdalena",
    rating: 4.5,
    reviews: 89,
    sales: 423,
    stock: 80,
    status: "disponible",
    category: "Ganadería",
    certifications: [],
    badge: "Fresco",
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "PSE", icon: "pse" },
      { name: "Efectivo", icon: "efectivo" },
    ],
    shipping: { free: true, cost: 0, estimatedDays: "1-3 dias", available: true },
    relatedProducts: [8, 4, 1],
    traceability: {
      producer: {
        id: 107,
        name: "Ana Julia Mejia",
        farm: "Hacienda La Bendicion",
        location: "Pivijay, Magdalena",
        verified: false,
        memberSince: "2022",
        description: "Ganadera con experiencia en cria de ganado criollo. Sus reses pastan en sabanas naturales del sur del Magdalena.",
      },
      origin: "Pivijay, Magdalena",
      harvestDate: "Hace 1 dia",
      lotNumber: "CBP-2026-0412",
      farmingMethod: "tradiciona",
    },
  },
  {
    id: 8,
    name: "Platano Harton del Magdalena",
    description:
      "Platano Harton fresco, cultivado en las fertiles tierras del Magdalena. Ideal para patacones, sancochos y fritos. Producto de primera calidad con textura perfecta y sabor tradicional colombiano.",
    images: ["/nebbi.png", "/nebbi.png", "/nebbi.png"],
    price: 35000,
    originalPrice: 35000,
    discount: 0,
    unit: "por guineo (22kg)",
    location: "El Reten, Magdalena",
    rating: 4.4,
    reviews: 112,
    sales: 267,
    stock: 0,
    status: "agotado",
    category: "Plátano",
    certifications: [],
    badge: null,
    paymentMethods: [
      { name: "Tarjeta", icon: "tarjeta" },
      { name: "Efectivo", icon: "efectivo" },
    ],
    shipping: { free: false, cost: 6000, estimatedDays: "2-4 dias", available: true },
    relatedProducts: [7, 4, 5],
    traceability: {
      producer: {
        id: 108,
        name: "Francisco Javier Molina",
        farm: "Finca El Porvenir",
        location: "El Reten, Magdalena",
        verified: false,
        memberSince: "2023",
        description: "Joven productor de platano que inicio su emprendimiento agricola con apoyo de programas de inclusion rural del Magdalena.",
      },
      origin: "El Reten, Magdalena",
      harvestDate: "Agotado - proxima cosecha en 2 semanas",
      lotNumber: "PHM-2026-0178",
      farmingMethod: "tradiciona",
    },
  },
];

const categories = [
  "Café",
  "Cacao",
  "Plátano",
  "Arroz",
  "Palma Aceitera",
  "Mango",
  "Ganadería",
];

export default function TiendaPage() {
  const { selectedProduct, isOpen, openProductDetail, closeProductDetail } = useProductDetail();
  const { addToCart, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = allProducts.filter((p) => p.category === cat).length;
    }
    return counts;
  }, []);

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const relatedProducts = selectedProduct
    ? allProducts.filter((p) => selectedProduct.relatedProducts.includes(p.id))
    : [];

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart(product, quantity);
    openCart();
  };

  return (
    <main className="flex-1 bg-[#FFFAF3]">
      <section className="bg-gradient-to-br from-[#6D9E13] to-[#4A7010] py-8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos (guineo, cafe, cacao...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-0 outline-none focus:ring-2 focus:ring-[#FFFAF3]/30 text-lg"
            />
          </div>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {["Café", "Cacao", "Plátano", "Arroz", "Mango"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag.toLowerCase())}
                className="px-4 py-1.5 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 grid grid-cols-4 md:grid-cols-7 gap-3">
          {categories.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors group ${
                  selectedCategory === cat
                    ? "bg-[#DEDB8D]/40"
                    : "hover:bg-[#DEDB8D]/30"
                }`}
              >
                {IconComponent && <IconComponent className="w-8 h-8" />}
                <span className={`text-xs font-medium text-center ${selectedCategory === cat ? "text-[#4A7010]" : "text-gray-700 group-hover:text-[#4A7010]"}`}>
                  {cat}
                </span>
                <span className="text-[10px] text-gray-400">{categoryCounts[cat]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-900">
              {selectedCategory || "Productos del Magdalena"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {filteredProducts.length} productos encontrados
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:border-[#6D9E13] hover:text-[#6D9E13] transition-colors">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={openProductDetail}
                onAddToCart={(p) => handleAddToCart(p)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No se encontraron productos</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="text-[#6D9E13] text-sm font-medium hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={closeProductDetail}
        relatedProducts={relatedProducts}
        onAddToCart={handleAddToCart}
        onOpenRelated={openProductDetail}
      />
    </main>
  );
}
