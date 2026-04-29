# PRÁCTICA 4 - FRONT
En esta práctica he desarrollado un clon funcional de una red social tipo Twitter utilizando Next.js y TypeScript.
La aplicación permite a los usuarios registrarse, iniciar sesión y realizar acciones típicas de una red social como publicar posts, dar like, hacer retweet y comentar.
Además, incluye diferentes páginas como la home con los posts recientes, el detalle de cada post y la página de perfil del usuario.


# COMANDOS
Los comandos necesarios son los siguientes: 
  - Comando para instalar todas las dependencias necesarias: npm install
  - Comando para poder arrancar el proyecto: npm run dev


# CREACIÓN DEL PROYECTO
1. Ir a la carpeta donde quiero crear el proyecto (por ejemplo, Escritorio): cd Escritorio
2. Crear el proyecto con Next.js: npx create-next-app@latest practica4
3. Elegir las diferentes opciones cuando lo pida
4. Instalar las dependencias y ejecutar el proyecto: Puesto en el apartado anterior de COMANDOS
5. Instalar Axios para poder hacer peticiones a la API: npm install axios
6. Ejecutar el proyecto con npm run dev. Una vez ejecutado, se abrirá en http://localhost:3000 


# FUNCIONAMIENTO 
 - El usuario puede registrarse o iniciar sesión desde la página de login.
 - Una vez autenticado, se guarda el token JWT en localStorage.
 - Si no hay token, el usuario es redirigido automáticamente al login.
 - En la página principal se muestran los últimos posts con paginación.
 - El usuario puede publicar nuevos posts desde la home.
 - Cada post permite dar like o hacer retweet.
 - Al pulsar sobre un post, se accede a su página de detalle.
 - En el detalle del post se muestran los comentarios y se pueden añadir nuevos.
 - En la página de perfil se muestran los datos del usuario y sus posts.


# NAVEGACIÓN Y GESTIÓN DE DATOS DE LA API
# Navegación
La aplicación está organizada en varias páginas utilizando el sistema de rutas de Next.js:
  - /login: Es la página de login y registro.
  - /: Es la página principal. 
  - /post/[id]: Es la página de detalle de un post  
  - /profile/[id]: Es la página de perfil del usuario  
La navegación se realiza utilizando useRouter() y router.push(), lo que permite cambiar de página sin recargar.
Por ejemplo:
  - Después de iniciar sesión, el usuario es redirigido a la home.
  - Al hacer click en un post, se accede a su detalle.

Además, en la página principal se comprueba si el usuario tiene token guardado en localStorage.  
Si no lo tiene, se redirige automáticamente al login.

## Gestión de datos de la API
La API utilizada no siempre devuelve los datos con la misma estructura.
En algunos casos, los posts pueden venir en:
  - res.data.data  
  - res.data.posts  
  - o directamente en res.data  


# ESTRUCTURA DEL PROYECTO Y EXPLICACIÓN
# api/api.ts
En este archivo se configura Axios con la URL base de la API.
También se añaden automáticamente los headers necesarios:
  - x-nombre obligatorio
  - Authorization con el token JWT


# components/Header.tsx
Este componente representa la cabecera común de la aplicación.
Incluye botones para:
 - Ir a la home: redirige a la página principal, donde se muestran los posts.
 - Ir al perfil: redirige a la página del perfil del usuario autenticado.
 - Cerrar sesión: elimina el token guardado y redirige al usuario a la página de login. 


# components/PostCard.tsx
Este componente se encarga de mostrar un post individual dentro de la aplicación.
Muestra:
 - Contenido del post
 - Autor
 - Número de likes y retweets
Incluye botones para dar like y hacer retweet
También permite navegar al detalle del post al hacer click.


# components/Paginador.tsx
Este componente permite cambiar de página en la lista de posts.
Incluye botones de anterior y siguiente


# app/page.tsx
Es la página principal (Home).
 - Carga los posts desde la API con paginación.
 - Permite publicar nuevos posts.
 - Muestra la lista de posts usando PostCard.
 - Controla la redirección al login si no hay token.


# app/login/page.tsx
Es la página de login y registro.
 - Permite alternar entre login y registro.
 - En login se envían email y password.
 - En registro se envían username, email y password.
 - Guarda el token en y redirige a la home.


# app/post/[id]/page.tsx
Es la página de detalle de un post.
Se encarga de mostrat el contenido, el autor, la fecha y los likes y retweets
Además permite dar like, hacer retweet, ver comentarios y añadir comentarios


# app/profile/[id]/page.tsx
Es la página de perfil de usuario.
Muestra el usuario, la biografía, el número de seguidores y seguidos. 
También lista los posts que ha realizado el usuario.


# types/Post.ts
Define la estructura de un post. 


# app/globals.css
Es el archivo de estilos globales.


# app/styles.css
En este archivo se han definido algunos estilos básicos adicionales de la aplicación.


# PROBLEMAS ENCONTRADOS DURANTE EL DESARROLLO
Durante la realización de la práctica me he encontrado con algunos problemas:
  - Problemas con las rutas: Al principio me salía el error "Module not found" porque los imports no coincidían con las carpetas. Lo solucioné cambiando las rutas.
  - Problemas con la API: A veces la API no funcionaba o tardaba en cargar, por lo que el login o los posts no funcionaban correctamente.
  - Datos de la API: Los datos no siempre venían igual. Lo solucioné comprobando varias opciones para obtenerlos.
  - Datos vacíos: Algunos posts no tenían autor o datos completos, así que añadí comprobaciones para que no fallase.
  - Uso de localStorage: Tuve que usar "use client" en los componentes donde uso localStorage para que funcionase bien.
  - Actualización de datos: Después de hacer like o retweet, en algunos casos recargo la página para ver los cambios.