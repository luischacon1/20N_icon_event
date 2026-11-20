#!/bin/sh
# Cambia el sello de versión (?v=) para que el navegador no sirva archivos en caché. Uso: npm run version
V=$(date +%s)
sed -i.bak -E "s/\\?v=[0-9]+/?v=$V/g" index.html src/gate.js src/app.js && rm -f index.html.bak src/*.bak
echo "v=$V"
