# Conta facil - Grupo 1 

## Version requerida de node.js 
    16.X

## Steps BACKEND
### 1. Clonar el repositorio

### 2. Ingresar al directorio contenedor del backend
```sh
    cd backend
```

### 3. Instalar node modules 
```sh
npm install 
```
### 4. Crear la base de datos y cargar los seeds :
```sh
npx prisma migrate dev --name init
```
### 5. Iniciar el servidor 
```sh
npm start
```

## Steps FRONTEND
### 1. Ingresar al directorio contenedor del frontend
```sh
    cd angular_frontend
```

### 2. Instalar node modules 
```sh
npm install 
```

### 3. configurar la url del backend
cambiar el valor de la variable apirul de los archivos

angular_frontend\src\app\service\producto.service.ts
angular_frontend\src\app\service\reg-contable.service.ts

cambiar por el valor utilizado en el backend, generalmente es "http://localhost:3000"

### 4. iniciar la aplicacion front end 
```sh
ng serve
```
