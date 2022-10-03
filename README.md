# Conta facil - Grupo 1 

## Version requerida de node.js 
    16.X

## Steps    
### 1. Clonar el repositorio

### 2. Ingresar al directorio contenedor del backend
```sh
    cd conta_facil_backend_app
```

### 3. Instalar node modules 
```sh
npm install 
```
### 4. Crear la base de datos y cargar los seeds :
```sh
npx prisma migrate dev
```
### 5. Iniciar el servidor 
```sh
node app.js
```