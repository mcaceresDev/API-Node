Una vez clonado el proyecto ejecutar: 
- npm install

En caso de surgir el error: npm ERR! Cannot read properties of null (reading 'pickAlgorithm')

Ejecutar la instruccion: 
- npm cache clear --force

Luego volver a ejecutar npm install

Crear un archivo de variables de entorno en la raíz del proyecto (.env)
Con las siguientes variables:
PORT=3050
DBHOST=localhost
DBUSER=root
DBNAME=dbarticulos
DBPASSWORD=

Instalar un servidor local e importar el backup de base de datos que esta en la raíz del proyecto:
dbarticulos.sql

correr la aplicacion con:
- npm run dev

Una vez tengas corriendo el proyecto puedes entrar a la ruta base http://localhost/ y podras acceder a la documentación.