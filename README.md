# MusicNous Official — sitio web estático

Sitio estático responsive en español, preparado para GitHub Pages. No necesita backend, base de datos ni proceso de compilación.

## Archivos

- `index.html`: contenido y estructura de la web.
- `styles.css`: diseño responsive negro/violeta/cian y animaciones CSS.
- `script.js`: menú móvil y configuración del enlace de descarga.
- `assets/logo-mark.png`: emblema del logotipo (fondo transparente) usado en la cabecera y el pie.
- `assets/logo-og.jpg`: logotipo completo de MusicNous, usado como imagen al compartir el enlace.
- `assets/favicon.png`: icono de la pestaña (`assets/favicon.svg` es el icono anterior y ya no se usa).

## Antes de publicar

1. Revisa las funciones descritas para asegurarte de que corresponden a las que incluirá el APK del lanzamiento.
2. No cambies el enlace de descarga por una URL inventada. Cuando publiques el APK, abre su publicación real en GitHub Releases y copia la URL pública.
3. En `script.js`, cambia esta línea:

   ```js
   const GITHUB_RELEASES_URL = "";
   ```

   por la URL real, por ejemplo `const GITHUB_RELEASES_URL = "https://github.com/USUARIO/REPOSITORIO/releases/latest";`. Sustituye el ejemplo por tu URL real.
4. Si eliges un canal de soporte, añade su enlace o correo en la sección de preguntas frecuentes. Por ahora no se inventa un contacto.

## Publicar gratis con GitHub Pages

1. Inicia sesión en GitHub y crea un repositorio público llamado, por ejemplo, `musicnous-official`.
2. Sube el contenido de esta carpeta directamente a la raíz del repositorio: `index.html`, `styles.css`, `script.js`, `README.md` y `assets/`.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/(root)`, y pulsa **Save**.
6. Espera a que termine la publicación. GitHub mostrará la URL del sitio en la sección Pages; será una URL del tipo `https://USUARIO.github.io/musicnous-official/`.
7. Abre la URL en el teléfono y en un computador. Comprueba menú móvil, secciones, enlaces y lectura del contenido.
8. Cuando el APK esté publicado en Releases, configura `GITHUB_RELEASES_URL` con el enlace real, vuelve a subir `script.js` y verifica el botón de descarga.

## Publicar el APK en GitHub Releases

1. En el repositorio de código o distribución, crea una publicación nueva desde **Releases → Draft a new release**.
2. Añade una etiqueta de versión que corresponda a tu versión real de APK.
3. Adjunta el archivo APK firmado que hayas probado. No publiques una compilación de prueba por accidente.
4. Publica el release y copia su URL pública.
5. Pega esa URL en `GITHUB_RELEASES_URL` en el repositorio de la web.

## Protección de la marca frente a la traducción automática

- El documento usa `lang="es"` y **no** desactiva la traducción de la página completa (no hay `<meta name="google" content="notranslate">`), para que los visitantes puedan traducir el resto del contenido.
- Todo elemento que muestra el nombre de la marca lleva `translate="no"`: los logotipos de cabecera y pie (`a.brand`), la etiqueta `MUSICNOUS` de la tarjeta del reproductor, el texto `musicnous` de la vista previa del navegador y cada mención de `MusicNous` dentro de párrafos, botones, preguntas frecuentes y copyright.
- Al añadir texto nuevo con el nombre, envuélvelo así: `<span translate="no">MusicNous</span>`. Si lo insertas desde JavaScript, incluye ese mismo `span`.
- Dentro de botones, enlaces con flecha y preguntas frecuentes (contenedores flex con reglas para `span`), usa `<span class="lbl">Texto <span class="nt" translate="no">MusicNous</span></span>`; las clases `lbl` y `nt` evitan que el texto cambie de tamaño, color o posición.
- No separes el nombre en trozos dentro de distintos elementos fuera de un contenedor con `translate="no"`, porque el traductor puede procesar «Music» y «Nous» por separado.
- Limitación conocida: Chrome puede traducir el título de la pestaña (`<title>`) y no hay una forma fiable de impedirlo sin afectar al resto del título.

## Notas

- La página no anuncia Premium.
- El sitio no recopila datos, no usa formularios ni integra analítica.
- Las fuentes de Google Fonts requieren conexión a internet; las fuentes de respaldo del sistema se usarán si no están disponibles.
- GitHub Pages es alojamiento estático; no puede verificar pagos ni emitir licencias por sí solo.
