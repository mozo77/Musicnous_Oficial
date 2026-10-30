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
- `assets/MusicNous-promo.mp4` y `assets/promo-poster.jpg`: video de presentación (8 s, 1 MB, H.264 + AAC) y su imagen de portada. No se descarga hasta que el visitante pulsa reproducir.
- `assets/favicon.png`: icono de la pestaña (`assets/favicon.svg` es el icono anterior y ya no se usa).

## Cuenta regresiva y descarga

- **Cuenta regresiva:** apunta al 31/10/2026 a las 16:00 (4:00 p. m.) en hora de Colombia (`launchAt` en `script.js`, `2026-10-31T16:00:00-05:00`; Colombia no usa horario de verano). Al llegar a cero se detiene y muestra un mensaje de lanzamiento, sin tiempos negativos. Usa el reloj del dispositivo del visitante.
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

## «Asegurar tu descarga»

- El botón guarda una solicitud **solo en el navegador del visitante** (`localStorage`: fecha y estado). No se envía ningún dato a un servidor y no existe una lista de usuarios.
- Cuando el APK está publicado y verificado (`release.json`), la descarga **empieza sola una vez por versión** al abrir esta página en ese mismo navegador, o en cuanto se publica si la página ya está abierta. Si el navegador la bloquea, queda el botón «Descargar MusicNous».
- **No instala nada automáticamente.** Android exige que cada usuario confirme la instalación (y permita instalar apps de esta fuente); ninguna web puede evitarlo.
- Si el visitante borra los datos del navegador, usa otro navegador u otro dispositivo, tendrá que asegurarla de nuevo. El enlace «Añadir recordatorio al calendario» abre Google Calendar con el evento del 31/10/2026 (solo se carga si el usuario lo pulsa).
- Para avisar a personas que no vuelvan a la página (correo o notificaciones push) haría falta un servicio externo y un aviso de privacidad; la web actual no lo incluye.

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

### Elegir el APK final (menú con flechas)

`lanzamiento-oficial` (con o sin `--simulacro`) abre un menú con los `.apk` de la carpeta Descargas de Android (también la subcarpeta de primer nivel), del más nuevo al más viejo. Muestra tamaño, versión, fecha y si está bien firmado:

- **↑ / ↓** (o `k` / `j`) mueven la selección, **Enter** elige, **r** vuelve a leer la carpeta, **q** o **ESC** cancelan.
- Solo deja elegir APK **firmados con tu clave oficial**. Rechaza (con el motivo) los que están sin firmar o con firma inválida, con la firma de depuración, firmados con otra clave, de otro paquete, depurables, de versión de pruebas o dañados.
- La huella de la clave oficial está en `HUELLA_CERT_ESPERADA` (`~/.config/musicnous/lanzamiento.conf`). Si algún día cambias de clave a propósito, actualízala ahí.
- El análisis de cada APK se guarda en una caché (`cache_apks`) y se repite solo si el archivo cambia.
- Sin menú: `lanzamiento-oficial --apk RUTA` usa ese archivo y `lanzamiento-oficial --seleccion-guardada` reutiliza el último elegido. `lanzamiento-oficial seleccionar` sin ruta solo abre el menú y guarda la elección.

### Publicar

```
lanzamiento-oficial --simulacro   # todas las comprobaciones, sin publicar nada
lanzamiento-oficial               # publicación real
```

Tras elegir el APK en el menú, el comando lo comprueba (existe, no vacío, ZIP válido), calcula el SHA-256, lee versión y paquete (aapt) y verifica la firma (apksigner). Se detiene si el paquete no es el esperado, si el APK es depurable, si está firmado con el certificado de depuración, si la versión parece de pruebas, si la etiqueta `v<versión>` ya existe o si la versión no es más nueva que la publicada. Antes de publicar pide que escribas exactamente `PUBLICAR v<versión>` (con `CON AVISOS` si hubo comprobaciones que no pudieron hacerse o si aún no es la fecha de lanzamiento). Después sube el APK a un borrador, comprueba la subida, lo publica, verifica el enlace público (HTTP 200 y tamaño), vuelve a descargarlo para comparar el SHA-256 (usa datos móviles; se omite con `--sin-redescarga`) y solo entonces actualiza `release.json` y espera a que GitHub Pages lo muestre. Nunca borra ni sobrescribe publicaciones existentes.

Convención: etiqueta `v<versionName>` y archivo `MusicNous-<versionName>.apk`. Antes de cada lanzamiento, sube `versionName` y `versionCode` en la app. Si el APK usa otro identificador de paquete, cámbialo en `~/.config/musicnous/lanzamiento.conf`.

### Ensayo general (repositorio de pruebas)

`lanzamiento-ensayo` ejecuta **el mismo comando** que `lanzamiento-oficial`, pero contra un repositorio de pruebas aparte, con otra carpeta de ajustes (`~/.config/musicnous-prueba`). No puede tocar el repositorio oficial: se niega a usarlo y, además, el token de pruebas solo funciona en el repositorio de pruebas.

1. En GitHub crea un repositorio **público** (por ejemplo `mozo77/Musicnous_Pruebas`) con un README, y activa Pages: Settings → Pages → Deploy from a branch → `main` → `/(root)`. Debe ser público porque el comando comprueba el enlace de descarga sin iniciar sesión.
2. Crea un token fine-grained **solo para ese repositorio** (Contents: Read and write).
3. En Termux: `lanzamiento-ensayo preparar mozo77/Musicnous_Pruebas`.
4. Pega el token de pruebas (`read -rs -p "Token de pruebas: " GH_TOKEN; export GH_TOKEN`) y ejecuta `lanzamiento-ensayo doctor` y luego `lanzamiento-ensayo`.
5. El ensayo usa una fecha de lanzamiento ya pasada, así que pide la misma frase que el día real (sin `CON AVISOS`).
6. Al terminar, borra el repositorio de pruebas (Settings → Delete this repository) y revoca su token, para que el APK no quede público.

El ensayo prueba la subida, la verificación y la actualización de `release.json`. El botón de la web y el actualizador de la app solo leen el repositorio oficial, así que esos dos se comprueban de verdad al publicar.

### Ensayo del actualizador de la app

El actualizador de la app oficial solo lee el repositorio oficial. Para ensayarlo existe una app de pruebas (`io.github.jmoxs77.musicnous.pruebas`, «MusicNous Pruebas»): se instala junto a la oficial y apunta solo al repositorio de pruebas. La genera el workflow manual `build-pruebas.yml` del repositorio privado de la app, que parchea una copia en GitHub y no cambia el código.

1. Ejecuta el workflow dos veces (Actions → Build APK de PRUEBAS → Run workflow): primero `1.60.0` / `66` (la que instalas) y luego `1.60.1` / `67` (la que publicas).
2. Instala `MusicNous-pruebas-1.60.0-66.apk` en el teléfono y abre la app: «Buscar actualizaciones» debe decir que estás al día.
3. Prepara el ensayo con ese paquete: `lanzamiento-ensayo preparar mozo77/Musicnous_Pruebas io.github.jmoxs77.musicnous.pruebas`.
4. Publica `MusicNous-pruebas-1.60.1-67.apk` con `lanzamiento-ensayo` y, cuando Pages lo sirva, vuelve a «Buscar actualizaciones» en la app de pruebas: debe ofrecer la 1.60.1 y, al aceptar, descargarla, verificarla e instalarla.
5. Al terminar, desinstala «MusicNous Pruebas», borra el repositorio de pruebas y revoca su token.

El lanzamiento oficial rechaza estos APK por su paquete, y el ensayo rechaza los oficiales.

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
