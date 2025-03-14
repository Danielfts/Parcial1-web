# Parcial 1 - Programación con tecnologías web
Daniel Felipe Triviño Santana  
202113218  
d.trivino@uniandes.edu.co  

# Especificaciones de la app
+ Libreria de UI
  + React 19.0.0
  + React-Bootstrap 
+ Otras liberías usadas
  + Sass (preprocesamiento de estilos)
  + Axios (peticiones http)
  + React-Query (manejo de estados de consultas a api)
  + React Rotuer (ruteo)
  + React Intl (internacionalización)
+ Versión de nodejs
  + 22.12.0
+ Version de npm
  + 10.9.0
+ Método de creación del proyecto
  + Vite 6.2.0
  + Typescript (tsx)
+ Entorno de desarrollo
  + Debian Bookworm (devcontainer)

# Rutas de la aplicación
+ / (root)
  + **test/** (desarrollo del parcial) 
    + login
    + home
    + menu (vista de detalle)
    + stores (vista de detalle)
    + cart (vista de detalle)
  + pretest (desarrollo de parcial de prueba 1)
  + pretest2 (desarrollo de parcial de prueba 2)

> **Nota importante:** En el release 1.0.0 de la aplicación (entrega en clase), la ruta raíz (/) **NO** redirige automáticamente a "/test". Sin embargo, si en la url del navegador se dirige a la ruta "/test", usted será redirigido automáticamente al desarrollo del parcial, comenzando por la vista de login "/test/login". Este detalle fué solventado en la segunda parte de la entrega agregando el elemento Navigate faltante en las rutas.

# Pasos para la ejecución de la aplicación
Dentro de la raiz del repositorio:  
Instalar las dependencias  
```
npm i
```
## Ejecutar la aplicación en entorno de desarrollo
Ejecutar el proyecto en modo de desarrollo
```
npm run start
```

## Ejecutar la aplicación en entorno de producción
Compilar el proyecto: Esto generará uan carpeta en la raíz del repositorio llamada **build**,
la cual contiene el html, javascript y css empaquetado por vite.  
```
npm run build
```
Visualizar la aplicación con un servidor de prueba
```
npm run preview
```

Esperar a que el browser abra automáticamente la aplicación o navegar a la url generada en la terminal.

# Proceso de desarrollo del parcial
## Preparación
Se tomaron las siguientes medidas de preparación para el parcial:

+ Configuración del proyecto: Se configuro con anterioridad el proyecto de React con las especificaciones mencionadas en la seccion **Especificaciones de la app** para no perder tiempo en configuraciones.
+ Elección de herramientas:
  + Typescript y TSX: Para minimizar los errores causados por el tipado incorrecto de variables. Fué muy util para estructurar elementos fundamentales para el parcial (interfaces para llamados a API, props, manejo de estados)
  + Sass: Para incluir los estilos de bootstrap a la app de manera que sea personalizable. También permite usar una sitaxis especial de para dar estilos a los componentes.
  + Bootstrap: Libreria de UI usada en el curso. Facilita en gran medida el uso de componentes preexistentes y la configuración de la disposición de la app con la retícula y flexbox.
  + Axios y React Query: Para minimizar la dificultad de realizar peticiones HTTP al API de prueba y el manejo de estados necesario para mostrar la información al usuario.
+ Desarrollo de parciales de prueba: Estos estan presentes en este mismo proyecto, y su resultado se puede observar navegando a las rutas especificadas en la sección **Rutas de la aplicación**
  + pretest: app triatlón
  + pretest2: app instagram
## Estrategia
Dado el tiempo limitado, se desarrolló el proyecto con las siguietnes prioridades en orden descendente:

1. Desarrollar la mayor cantidad de vistas y componentes de manera que: se pueda navegar correctamente entre vistas (ruteo), los enlaces y botones sean funcionales, y la validación de datos (password) sea correcta. 
1. Implementar el carrusel solicitado
1. Hacer que los datos se obtengan correctamente de una api mock con peticiones http y manejo de estados.
1. Hacer que el layout sea lo más parecido posible a los mockups
1. Con la menor prioridad: Detallar los estilos para que cada componente se parezca lo más posible a los mockups.

Adicionalmente, se usaron las siguientes estrategias para minimizar errores y organizar el código:

+ Uso de css modules para organizar los estilos: Se evita el problema de definir nombres de clases que entren en conflicto por accidente
+ Estructura de directorios: cada página y componente tiene su propia carpeta, que contiene el archivo .tsx y su stylesheet correspondiente.

## Desarrollo
Las vistas se desarrollaron en el siguiente orden:

+ Login
+ Home
+ Detalle

Para cada vista, el proceso de pensamiento para descomponer el problema en componentes más pequeños fué:
+ login
  + Se necesitan dos columnas de bootstrap, una para el splash screen y la otra para el formulario de login.
  + Se necesita un elemento form para manejar el nombre de usuario y la contraseña, mas un botón de tipo submit para controlar el evento correspondiente
  + Validación del formulario:
    + release 1.0.0: Se logró manejando el estado del formulario con **useState** y reaccionando al evento de submit con una función **handler**. El handler realiza la validación e invoca la navegación (**useNavigate**) hacia la vista home  dependiendo del resultado.
    + release 2.0.0: Se simplifica la validación con atributos nativos de HTML, en véz de lógica en el handler (atributos required, minLength y maxLength del elemento \<input/>)
+ home
  + Un componente Container que abarque todo el viewport y que contenga el background de la vista
  + Un componente Card centrado
  + Tres elementos \<div/> dentro del card que hagan las veces de botones para navegar a las tres vistas de detalle.
    + Cada div contiene una imagen y un texto
    + Para hacer que los div sean "clickeables" se hizo uso de estilos para cambiar el estado del cursor y de un handler para reaccional al evento **onClick**.
    + En la version 2.0.0 se agregaron estilos (bordes) para mejorar el feedback al usuario cuando pasa el cursor sobre cada div.
  + Para este componente solo fue necesario el uso del hook **useNavigate**
+ detail
  + Se descompone en tres secciones: header, carousel y sección de tarjetas
  + Se usaron nuevamente los componentes de React Bootstrap.
    + Carousel
    + Card
    + Layout (Container, Row y Col)
  + Para traer los datos del api mock, se usa el hook **useQuery**. Este hook reemplaza el uso de **useEffect**, al ser más robusto y menos verboso. Si bien este hook se puede usar con el api fetch de javascript, se optó por usar axios por simplicidad (manejo automático de errores, conversión automática del response body, menos verboso)
  + Se generó un pequeño conjunto de datos con mockaroo, el cual es un arreglo de objetos, cada uno con una url de imagen dummy y un texto que representa un alimento. Para evitar problemas con el límite de uso de mockaroo, se hospedó el json resultante en un gist en github.
  + Debido a que tanto el carrusel como los cards contienen imágenes, se optó por usar el mismo endpoint para alimentar ambos componentes. Se hizo uso del método **Array.map(()=>{})** para renderizar los datos correctamente.
  + **Manejo de las tres vistas de detalle**: Debido a que era necesario presentar tres variantes de la vista de detalle (menú, tiendas y carrito), se consideraron las siguietnes opciones:
    + ❌ Hacer tres vistas diferentes (descartado):
      + Viola el principio DRY (don't repeat yourself)
      + Uso de más archivos redundantes
      + Es una mala práctica en general, y no aprovecha la reutilización de componentes que ofrece react. 
    + ❌ Pasar el tipo de página de detalle por la url usando query parameters y el hook **useNavigate** (descartado):
      + Es muy engorroso y en el momento no se tenía el conocimiento para hacerlo
    + ✅ Usar props en el componente de detalle (usado)>
      + Se cumple el principio DRY y se reutiliza correctamente el componente
      + Se definen tres rutas separadas en el router, el cual se encarga de pasar un prop que define el **tipo** de vista de detalle
      + El componente se encarga de mostrar la información correspondiente. Si bien podría ser preferible pasar toda la información dinámica como props (título e imágen del header), el tiempo no fué suficiente para realizar este cambio. 
+ Internacionalización:
  + Se implementó en el modulo App.tsx la lógica para determinar el lenguaje del browser al momento de cargar la aplicación.
  + Se definieron dos archivos con los mensajes estáticos de la app en inglés y español
  + Se hizo uso de los siguientes elementos de la librería react-intl
    + \<IntlProvider/> Proveedor en el root de la app necesario para usar los componentes y hooks necesarios
    + **useIntl()** hook para internacionalizar mensajes definidos como variables (como el título de la vista de detalle).
    + \<FormattedMessage> para internacionalizar textos otros estáticos.
  + Adicionalmente, para cambiar dinamicamente el locale usando botones, se hizo uso de un Context Provider y el hook useContext.

![login](/readme_assets/login_ss.png)
Puede hacer uso de los controles en la parte superior derecha de la vista login para cambiar el locale de la app entre español e inglés. También puede cambiar el idioma del browser.

## Resumen de elementos de react usados
En total, se aplicaron, entre otros, los siguientes conceptos de react para realizar la aplicación:
+ Ruteo
+ Function components
+ Props
+ Contexts y context provider
+ Componentes de React Bootstrap
+ Hooks
  + useState
  + useQuery
  + useNavigate
  + useContext
  + useIntl
+ Reactividad con handlers / callbacks

## Resultados
Durante la hora de clase fue posible:
+ Desarrollar las tres vistas
+ Desarrollar el carrusel de la vista de detalle
+ Unir las vistas a través de rutas
+ Implementar un llamado al api mock para poblar la vista de detalle
+ Ubicar los componentes con una disposición similar a los mockups
+ Darle estilos y color a la mayoría de componentes
+ Validar el input de la vista de login

Para la segunda parte:
+ Se implementó la internacionalización, la cual funciona al cambiar al idioma del browser
+ Se documento el desarrollo de parcial en el README
