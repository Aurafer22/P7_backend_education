# Gestor de Librerías y Libros

Este proyecto es una API RESTful Auth para gestionar el material formativo en una entidad educativa, diseñada para practicar conocimientos básicos de backend. Utiliza **Node.js**, **Express**, **JWT**, **Bcrypt**, y **MongoDB Atlas** como base de datos.

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Rutas Disponibles](#rutas-disponibles)
5. [Tecnologías Usadas](#tecnologías-usadas)
6. [Contribución](#contribución)
7. [Licencia](#licencia)
8. [Créditos](#créditos)

## Descripción

Esta API permite gestionar tres colecciones relacionadas:

- **Usuarios**: Registro de usuarios en la API.
- **Cursos**: Listado e información de cursos de la entidad educativa.
- **Asignaturas**: Listado de asignaturas que se puede encontrar en cada curso e información y documentación de la misma.

### Funcionalidades

- CRUD para Usuarios, Cursos y Asignaturas.
- Relación entre Cursos y Asignaturas, así como Curso y Usuario.
- Registro de usuarios y login para acceder a la información.
- Roles para autenticación: rol usuario ("alumno") y rol admin ("profesor")
- Filtrado abierto por Cursos y con autenticación: por Usuario, Curso y Asignatura.

## Instalación

1. Clona este repositorio:
   git clone https://github.com/Aurafer22/P7_backend_education.git

2.Ve al directorio del proyecto:
cd P7_BACKEND_EDUCACION

3.Instala las dependencias:
npm install

4.Configura las variables de entorno:
• Crea un archivo .env con las siguientes claves:
DB_URL=mongodb+srv://aurafercomunicacion:7xu1AocKSXXYNwbs@cluster0.sahoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
y JWT_SECRET
• Inicia el servidor:
npm start
• Reestablece la semilla asignaturas:
npm seed

## Uso

Usa herramientas como Postman o Insomnia para realizar peticiones a la API.
Ejemplo de petición GET para obtener todos los cursos:
GET http://localhost:3000/api/v1/courses
Ejemplo de peticion POST para registro de usuario (por defecto: "alumno"):
POST http://localhost:3000/api/v1/users/register
Ejemplo de peticion POST para login en la API:
POST http://localhost:3000/api/v1/users/login
Ejemplo de petición GET para obtener todos los usuarios (Autorizados para hacer la petición: usuarios con rol "profesor"):
GET http://localhost:3000/api/v1/users
Ejemplo de petición GET para obtener todas las asignaturas (Autorizados para hacer la petición: usuarios con rol "profesor"):
GET http://localhost:3000/api/v1/subjects/

## Rutas Disponibles

**USUARIOS**

| PETICION              | ENDPOINT |          RUTA          | DESCRIPCIÓN                                                            |
| :-------------------- | :------: | :--------------------: | :--------------------------------------------------------------------- |
| Registro Usuario      |   POST   | /api/v1/users/register | Permite crear un nuevo usuario                                         |
| Login Usuario         |   POST   |  /api/v1/users/login   | Permite obtener un token para acceder a determinadas rutas             |
| Info Usuarios         |   GET    |     /api/v1/users      | Permite a profesores ver el listado completo de usuarios registrados   |
| Info Usuario          |   GET    |   /api/v1/users/:id    | Permite a profesores y a cada usuario ver la información de ese perfil |
| Actualización Usuario |   PUT    |   /api/v1/users/:id    | Permite a profesores cambiar el curso y rol de cada alumno             |
| Eliminar Usuario      |  DELETE  |   /api/v1/users/:id    | Permite a profesores y al alumno en cuestión, eliminar su perfil       |

**CURSOS**

| PETICION            | ENDPOINT |        RUTA         | DESCRIPCIÓN                                                                                |
| :------------------ | :------: | :-----------------: | :----------------------------------------------------------------------------------------- |
| Info Cursos         |   GET    |   /api/v1/courses   | Permite ver los cursos existentes                                                          |
| Info Curso          |   GET    | /api/v1/courses/:id | Permite ver la info de cada curso a todos los profesores y a alumnos del curso en cuestion |
| Crear Curso         |   POST   |   /api/v1/courses   | Permite crear un curso del listado establecido                                             |
| Actualización Curso |   PUT    | /api/v1/courses/:id | Permite a profesores actualizar la info del curso                                          |
| Eliminar Curso      |  DELETE  | /api/v1/courses/:id | Permite a profesores eliminar un curso                                                     |

**ASIGNATURAS**

| PETICION                 | ENDPOINT |         RUTA         | DESCRIPCIÓN                                                                                       |
| :----------------------- | :------: | :------------------: | :------------------------------------------------------------------------------------------------ |
| Info Asignaturas         |   GET    |  /api/v1/subjects/   | Permite a los profesores ver todas las asignaturas existentes                                     |
| Info Asignatura          |   GET    | /api/v1/subjects/:id | Permite a profesores y alumnos que cursen esa asignatura, ver la info y documentación de la misma |
| Crear Asignatura         |   POST   |  /api/v1/subjects/   | Permite a profesores crear una nueva asignatura                                                   |
| Actualización Asignatura |   PUT    | /api/v1/subjects/:id | Permite a profesores actualizar la info y documentación de la asignatura                          |
| Eliminar Asignatura      |  DELETE  | /api/v1/subjects/:id | Permite a profesores eliminar una asignatura                                                      |

## Relación

• GET /api/v1/users - Muestra en cada alumno el curso al que pertenece.
• GET /api/v1/courses/:id - Muestra en cada curso el listado de asignaturas que tiene.

## Tecnologías Usadas

• Node.js
• Express
• MongoDB Atlas
• Mongoose
• JWT (jsonwebtoken)
• Bcrypt

## Contribución

¿Quieres contribuir? ¡Bienvenid@!

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   git checkout -b feature/nueva-funcion
3. Sube tus cambios:
   git commit -m "Añadida nueva funcionalidad"
   git push origin feature/nueva-funcion
4. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

## Créditos

Creado por Aurora Ramírez Fernández.

---
