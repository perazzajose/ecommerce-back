#                            Entrega 8

Este proyecto está usando Node por lo tanto no se puede visualizar desde GitHub Pages, recomiendo usar Vscode




## Pasos a seguir
En Visual Studio Code `git clone https://github.com/perazzajose/ecommerce-back.git`

## Configuración inicial

1. **Instalación de dependencias:** Ejecuta `npm install` en la carpeta del proyecto para instalar las dependencias necesarias.

### Dependencias : 
- MariaDB
- Jsonwebtoken
- Express
- Cors

## Levantar el servidor

3. **Inicia el servidor:** Ejecuta `node servidor.js` para iniciar el servidor. Por defecto, este proyecto utiliza el puerto 3001. Y el archivo "servidor.js" esta dentro de /js

4. **Accede a las rutas disponibles:** Las rutas disponibles son:
   - `/json/cart`: Retorna el contenido del carrito de compras.
   - `/json/cats`: Retorna las categorías disponibles.
   - `/json/cats_products/:id.json`: Retorna productos según la categoría especificada.
   - `/json/products/:id.json`: Retorna detalles de un producto específico.
   - `/json/products_comments/:id.json`: Retorna comentarios de un producto.
   - `/json/sell`: Retorna mensajes relacionados con publicaciones.

### Autenticación

5. **Registro de usuarios:** Envia una solicitud POST a `/register` con el cuerpo de la solicitud incluyendo `username`, `password`, y `email` para registrar un nuevo usuario.

6. **Inicio de sesión:** Envia una solicitud POST a `/login` con `username` y `password` en el cuerpo para obtener un token JWT que se usará para autorizar otras solicitudes.

### Middleware de autorización

7. **Protección de ruta `/cart`:** Esta ruta solo es accesible para usuarios autenticados. Utiliza el token JWT obtenido en el paso de inicio de sesión en el encabezado `access_token` para acceder a `/cart` y enviar los datos del carrito al servidor.

### Consideraciones

- **Visualizar Front:** [Ecommerce_front](https://perazzajose.github.io/ecommerce-front/login.html)
- **Datos del carrito:** El proyecto actualmente guarda los datos del carrito en un archivo JSON específico.
- **Token y usuarios:** Me basé en la funcionalidad de Postman para enviar solicitudes /post desde el navegador. 



Jose 🦉
