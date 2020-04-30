# Reclamo ciudadano (reclamo_cuidadano)

Servicio web para realizar solicitudes de reclamo al estado

## Technologies
Project is created with:
* Vuejs version: 2.6.11
* Vuex version: 3.3.0
* Quasar version: 1.7.4
* FireBase
* FireStorage
* NodeJs: 13.11.0

## Install [NodeJS](https://nodejs.org/es/)
```bash
Requerido para gestionar package 
```

## Install the dependencies
Nos alojamos con la consola en la ubicacion root del proyecto, en la misma raiz de package.json 
y ejecumos el siguiente comando.

```bash
 npm install
```

### Install CLI [Quasar framekork](https://quasar.dev/)
Instalamos CLI (command line input) de quasar para poder manipular al mismo

```bash
npm install -g @quasar/cli
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
Luego de la instalación de los packages ejecutamos: 
```bash
quasar dev
```

### Start in port 8080
En el archivo quasar-conf-js esta especificado el puerto para desplegar el servicio

```bash
devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    }
```
