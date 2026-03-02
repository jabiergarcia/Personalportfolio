#!/bin/bash

# Script de verificación rápida para Cloudflare SEO
# Uso: bash verify-cloudflare-seo.sh

echo "🔍 VERIFICACIÓN CLOUDFLARE SEO"
echo "================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Array de proyectos para verificar
projects=("assorta" "puffykitten" "chupsee" "gotapp" "pomeranian")

echo "📋 Verificando archivos locales..."
echo ""

# Verificar archivos de configuración
if [ -f "public/_redirects" ]; then
    echo -e "${GREEN}✅${NC} _redirects existe"
else
    echo -e "${RED}❌${NC} _redirects NO existe"
fi

if [ -f "public/_headers" ]; then
    echo -e "${GREEN}✅${NC} _headers existe"
else
    echo -e "${RED}❌${NC} _headers NO existe"
fi

echo ""
echo "📂 Verificando archivos HTML de proyectos..."
echo ""

# Verificar archivos HTML
for project in "${projects[@]}"
do
    if [ -f "public/proyectos/$project.html" ]; then
        echo -e "${GREEN}✅${NC} proyectos/$project.html existe"
    else
        echo -e "${RED}❌${NC} proyectos/$project.html NO existe"
    fi
    
    if [ -f "public/projects/$project.html" ]; then
        echo -e "${GREEN}✅${NC} projects/$project.html existe"
    else
        echo -e "${RED}❌${NC} projects/$project.html NO existe"
    fi
done

echo ""
echo "🌐 Verificando respuestas del servidor..."
echo ""
echo -e "${YELLOW}⏳${NC} Testing https://jabiergarcia.com/proyectos/assorta"
echo ""

# Verificar respuesta del servidor
response=$(curl -s -A "LinkedInBot/1.0" https://jabiergarcia.com/proyectos/assorta)

if [[ $response == *"Assorta | Retail Visual Platform"* ]]; then
    echo -e "${GREEN}✅ ÉXITO${NC} - LinkedIn Bot ve el título correcto"
    echo ""
    echo "Título detectado:"
    echo "$response" | grep -o '<title>.*</title>' | sed 's/<[^>]*>//g'
else
    echo -e "${RED}❌ FALLO${NC} - LinkedIn Bot NO ve el título correcto"
    echo ""
    echo "Título detectado:"
    echo "$response" | grep -o '<title>.*</title>' | sed 's/<[^>]*>//g'
fi

echo ""
echo "📸 Verificando meta tags de imagen..."
echo ""

if [[ $response == *"og:image"* ]]; then
    echo -e "${GREEN}✅${NC} Meta tag og:image presente"
    echo "$response" | grep -o 'property="og:image" content="[^"]*"' | head -1
else
    echo -e "${RED}❌${NC} Meta tag og:image NO encontrado"
fi

echo ""
echo "================================"
echo "📊 RESUMEN DE VERIFICACIÓN"
echo "================================"
echo ""

if [[ $response == *"Assorta | Retail Visual Platform"* ]]; then
    echo -e "${GREEN}✅ SEO funcionando correctamente${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Probar en LinkedIn Inspector:"
    echo "   https://www.linkedin.com/post-inspector/"
    echo ""
    echo "2. Verificar otros proyectos:"
    echo "   https://jabiergarcia.com/proyectos/puffykitten"
    echo "   https://jabiergarcia.com/proyectos/chupsee"
else
    echo -e "${YELLOW}⚠️  Configuración pendiente de propagación${NC}"
    echo ""
    echo "Posibles causas:"
    echo "1. Caché de Cloudflare aún no purgado (espera 5-10 min)"
    echo "2. Figma Make no soporta _redirects (requiere Worker)"
    echo "3. Configuración no desplegada aún"
    echo ""
    echo "Solución:"
    echo "Ver /CLOUDFLARE_SEO_CONFIG.md sección 'Troubleshooting'"
fi

echo ""
