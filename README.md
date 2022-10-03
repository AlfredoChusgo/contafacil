# Conta facil - Grupo 1 

## Version requerida de node.js 
    16.X

## Steps    
### 1. Clonar el repositorio
despues de clonar el codigo utilizar el comando dentro del directorio "conta_facil_backend_app" para instalar las dependencias ejecutar :
```sh
npm install 
```
### Crear la base de datos y cargar los seeds :
```sh
npx prisma migrate dev
```
### iniciar el servidor 
```sh
node app.js
```