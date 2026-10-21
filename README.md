# MusicNous Official — sitio web estático

Sitio estático responsive en español, preparado para GitHub Pages. No necesita backend, base de datos ni proceso de compilación.

## Archivos

- `index.html`: contenido y estructura de la web.
- `styles.css`: diseño responsive negro/violeta/cian y animaciones CSS.
- `script.js`: menú móvil, cuenta regresiva y estado del botón de descarga.
- `release.json`: estado de la descarga. **Solo lo modifica el comando `lanzamiento-oficial`** después de publicar y verificar el APK.
- `tools/lanzamiento-oficial` y `tools/instalar-termux.sh`: publicación del lanzamiento desde Termux.
- `assets/logo-mark.png`: emblema del logotipo (fondo transparente) usado en la cabecera y el pie.
- `assets/logo-og.jpg`: logotipo completo de MusicNous, usado como imagen al compartir el enlace.
- `assets/favicon.png`: icono de la pestaña (`assets/favicon.svg` es el icono anterior y ya no se usa).

## Cuenta regresiva y descarga

- **Cuenta regresiva:** apunta al 31/10/2026 a las 00:00 en hora de Colombia (`launchAt` en `script.js`, `2026-10-31T00:00:00-05:00`; Colombia no usa horario de verano). Al llegar a cero se detiene y muestra un mensaje de lanzamiento, sin tiempos negativos. Usa el reloj del dispositivo del visitante.
- **Probarla:** cambia temporalmente `launchAt` por una hora cercana (por ejemplo, dentro de dos minutos, con `-05:00`), recarga la web y observa el conteo y el mensaje final. Después restaura `2026-10-31T00:00:00-05:00`.
- **Descarga:** el botón lee `release.json`. Mientras diga `"status": "coming-soon"`, muestra «Próximamente» y no ofrece ningún enlace. Solo se activa si `release.json` está completo y coherente (URL de un APK de las publicaciones de este repositorio, versión, tamaño y SHA-256) y, además, la API pública de GitHub confirma que el archivo existe en una publicación visible. Si no se puede confirmar, no se ofrece.
- **No edites `release.json` a mano** para anunciar la descarga: debe escribirlo el comando, que lo hace al final de todas las verificaciones.

## Publicar gratis con GitHub Pages

1. Inicia sesión en GitHub y crea un repositorio público llamado, por ejemplo, `musicnous-official`.
2. Sube el contenido de esta carpeta directamente a la raíz del repositorio: `index.html`, `styles.css`, `script.js`, `README.md` y `assets/`.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/(root)`, y pulsa **Save**.
6. Espera a que termine la publicación. GitHub mostrará la URL del sitio en la sección Pages; será una URL del tipo `https://USUARIO.github.io/musicnous-official/`.
7. Abre la URL en el teléfono y en un computador. Comprueba menú móvil, secciones, enlaces y lectura del contenido.
8. Cuando publiques el APK con `lanzamiento-oficial`, comprueba en la web el botón de descarga.

## Publicar el lanzamiento desde Termux

### Configuración segura (una sola vez)

1. Con el repositorio clonado en Termux: `bash ~/Musicnous_Oficial/tools/instalar-termux.sh`. Instala `gh`, `curl`, `coreutils`, `unzip`, `aapt` y `apksigner`, y crea el comando `lanzamiento-oficial`.
2. Crea un token **fine-grained** en GitHub (Settings → Developer settings → Personal access tokens → Fine-grained tokens):
   - Repository access: **Only select repositories** → `Musicnous_Oficial`.
   - Permissions → Repository permissions → **Contents: Read and write**. No añadas más permisos.
   - Expiración corta (por ejemplo, 30 días).
3. Inicia sesión sin escribir el token en un comando: ejecuta `gh auth login --with-token`, pega el token, pulsa Enter y luego Ctrl+D. `gh` lo guarda en el almacenamiento privado de Termux (no en el repositorio). Para quitarlo: `gh auth logout`.
4. Nunca pegues el token en `script.js`, `release.json`, el repositorio ni chats. Si lo expones, revócalo en GitHub.
5. Revisa el entorno: `lanzamiento-oficial doctor` (no modifica nada).

### Seleccionar el APK final

```
lanzamiento-oficial seleccionar ~/storage/downloads/TU-APK-FINAL.apk
```

Guarda la ruta y el SHA-256 en `~/.config/musicnous/apk_seleccionado` (fuera del repositorio). Si el archivo cambia después, el comando se detiene y hay que volver a seleccionarlo. La primera vez que uses Descargas, ejecuta `termux-setup-storage`.

### Publicar

```
lanzamiento-oficial --simulacro   # todas las comprobaciones, sin publicar nada
lanzamiento-oficial               # publicación real
```

El comando comprueba el APK (existe, no vacío, ZIP válido), calcula el SHA-256, lee versión y paquete (aapt) y verifica la firma (apksigner). Se detiene si el paquete no es el esperado, si el APK es depurable, si está firmado con el certificado de depuración, si la versión parece de pruebas, si la etiqueta `v<versión>` ya existe o si la versión no es más nueva que la publicada. Antes de publicar pide que escribas exactamente `PUBLICAR v<versión>` (con `CON AVISOS` si hubo comprobaciones que no pudieron hacerse o si aún no es la fecha de lanzamiento). Después sube el APK a un borrador, comprueba la subida, lo publica, verifica el enlace público (HTTP 200 y tamaño), vuelve a descargarlo para comparar el SHA-256 (usa datos móviles; se omite con `--sin-redescarga`) y solo entonces actualiza `release.json` y espera a que GitHub Pages lo muestre. Nunca borra ni sobrescribe publicaciones existentes.

Convención: etiqueta `v<versionName>` y archivo `MusicNous-<versionName>.apk`. Antes de cada lanzamiento, sube `versionName` y `versionCode` en la app. Si el APK usa otro identificador de paquete, cámbialo en `~/.config/musicnous/lanzamiento.conf`.

### Verificar que el botón descarga el APK correcto

1. Abre la web (sin caché) y comprueba que el botón dice «Descargar MusicNous» y muestra la versión y el tamaño esperados.
2. Pulsa el botón y confirma que se descarga `MusicNous-<versión>.apk`.
3. Despliega «Comprobar integridad (SHA-256)» y compara con `sha256sum` del archivo descargado en Termux.

## Protección de la marca frente a la traducción automática

- El documento usa `lang="es"` y **no** desactiva la traducción de la página completa (no hay `<meta name="google" content="notranslate">`), para que los visitantes puedan traducir el resto del contenido.
- Todo elemento que muestra el nombre de la marca lleva `translate="no"`: los logotipos de cabecera y pie (`a.brand`), la etiqueta `MUSICNOUS` de la tarjeta del reproductor, el texto `musicnous` de la vista previa del navegador y cada mención de `MusicNous` dentro de párrafos, botones, preguntas frecuentes y copyright.
- Al añadir texto nuevo con el nombre, envuélvelo así: `<span translate="no">MusicNous</span>`. Si lo insertas desde JavaScript, incluye ese mismo `span`.
- Dentro de botones, enlaces con flecha y preguntas frecuentes (contenedores flex con reglas para `span`), usa `<span class="lbl">Texto <span class="nt" translate="no">MusicNous</span></span>`; las clases `lbl` y `nt` evitan que el texto cambie de tamaño, color o posición.
- No separes el nombre en trozos dentro de distintos elementos fuera de un contenedor con `translate="no"`, porque el traductor puede procesar «Music» y «Nous» por separado.
- Limitación conocida: Chrome puede traducir el título de la pestaña (`<title>`) y no hay una forma fiable de impedirlo sin afectar al resto del título.

## Notas

- El sitio no recopila datos, no usa formularios ni integra analítica. El botón «Contactar con soporte» solo abre el cliente de correo del visitante.
- Las fuentes de Google Fonts requieren conexión a internet; las fuentes de respaldo del sistema se usarán si no están disponibles.
- GitHub Pages es alojamiento estático: el estado de la descarga se actualiza solo mediante `release.json`.
