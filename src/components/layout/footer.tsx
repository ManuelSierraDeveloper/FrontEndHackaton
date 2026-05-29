import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  plataforma: [
    { href: "/tienda", label: "Tienda" },
    { href: "/mapa", label: "Mapa" },
    { href: "/productores", label: "Productores" },
    { href: "/experiencias", label: "Experiencias" },
  ],
  recursos: [
    { href: "/tienda", label: "Comprar Productos" },
    { href: "/about", label: "Como Funciona" },
  ],
  empresa: [
    { href: "/about", label: "Acerca de Nebbi" },
    { href: "/contacto", label: "Contacto" },
    { href: "/terminos", label: "Terminos y Condiciones" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/nebbi.png"
                alt="Nebbi Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-white">Nebbi</span>
                <span className="text-[10px] text-[#DEDB8D] tracking-wider">SABOR CARIBE, FLOW DIGITAL</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Plataforma digital de trazabilidad agricola para productores del Magdalena, Colombia.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Plataforma</h4>
            <ul className="space-y-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>2026 Nebbi. Todos los derechos reservados.</p>
          <p>Hecho con amor en el Magdalena, Colombia</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
