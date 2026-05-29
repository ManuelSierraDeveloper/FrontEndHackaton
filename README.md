# AgroTrace Magdalena - Frontend

Aplicación web frontend para AgroTrace Magdalena, plataforma de trazabilidad agrícola y comercio internacional.

## Requisitos

- Node.js >= 20.0.0
- npm o yarn

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run typecheck` - Verifica tipos de TypeScript

## Estructura del proyecto

```
agro-trace-frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/        # Componentes React
│   ├── services/         # Servicios y lógica de negocio
│   ├── types/            # Definiciones de tipos TypeScript
│   └── utils/            # Utilidades y funciones helper
├── public/               # Archivos estáticos públicos
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore
```

## Variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Documentación relacionada

- Specification general del proyecto: `docs/specs/00-descripcion-proyecto.md`
- Casos de uso: `docs/specs/01-casos-de-uso.md`
- Especificación del Chatbot: `docs/specs/13-chatbot.md`