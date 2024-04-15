# BanWire Javascript SDK

SDK para integración de BanWire Pago Pro con ReD.
Revisar los archivos en la carpeta examples para ver los métodos de integración.

## Integración utilizando HTML

Para integrar utilizando sólo HTML, utiliza el siguiente formato:
```html
<script
    type="text/javascript"
    src="https://sw.banwire.com/checkout.js"
    data-sandbox="true" 
    data-user="pruebasbw" 
    data-total="500.00" 
    data-cust-fname="Ricardo" 
    data-cust-mname="Gamba" 
    data-cust-lname="Lavin" 
    data-cust-email="prueba@banwire.com" 
    data-success-page="http://google.com" 
    data-error-page="http://facebook.com" 
    data-pending-page="http://yahoo.com" 
    data-concept="Concepto de pago" 
    data-reference="Referencia de pago" 
    data-notify-url="https://test.banwire.com/sw/examples/response.php" 
    data-button-caption="Pagar ahora" 
    data-button-class="btn-pay"
    data-secure-3d="false"
    data-international="false">
</script>
```

Para una integración más personalizada se pueden utilizar parámetros adicionales (opcionales):
```html
<script
    type="text/javascript"
    src="https://sw.banwire.com/checkout.js"
    data-sandbox="true" 
    data-user="pruebasbw" 
    data-title="Mi Comercio" 
    data-total="500.00" 
    data-payment-options="visa,amex" 
    data-review-order="true" 
    data-international="true"
    data-secure-3d="false"
    data-loading-text="Espere..."
    data-success-page="https://test.banwire.com/sw/examples" 
    data-notify-url="https://test.banwire.com/sw/examples/response.php" 
    data-error-page="http://facebook.com"  
    data-pending-page="http://yahoo.com" 
    data-concept="Concepto de pago" 
    data-reference="Referencia de pago" 
    data-months="3,6,9,12" 
    data-currency="MXN" 
    data-exchange-rate="" 
    data-cust-fname="Ricardo" 
    data-cust-mname="Gamba" 
    data-cust-lname="Lavin" 
    data-cust-email="prueba@banwire.com" 
    data-cust-phone="55555555" 
    data-cust-addr="Circuito fuentes del pedregal 440 10" 
    data-cust-zip="14140" 
    data-cust-city="Mexico" 
    data-cust-country="MEX" 
    data-cust-state="DF"  
    data-ship-addr="Direccion de envio" 
    data-ship-zip="13145" 
    data-ship-city="Mexico" 
    data-ship-country="MX" 
    data-ship-state="DF" 
    data-button-caption="Pagar ahora" 
    data-button-class="btn-pay"
    data-time="900"
    data-item-1-name="Primero" 
    data-item-1-price="100.00" 
    data-item-1-qty="2"
    data-item-2-name="Segundo" 
    data-item-2-price="100.00" 
    data-item-2-qty="3"> /
</script>
```
### Descripción de parámetros
Parámetro | Descripción
--- | ---
data-sandbox | TRUE / FALSE Activar ambiente de pruebas
data-user | Nombre de usuario
data-title | Nombre del comercio
data-total | Monto a pagar
data-payment-options | Opciones de pago (all:todas, visa, amex, oxxo, spei)
data-review-order | TRUE / FALSE Activar resumen de compra
data-success-page | Página informativa de pago exitoso del comercio
data-error-page | Página de error del comercio
data-pending-page | Página de pago pendiente del comercio (aplica para pagos en OXXO y SPEIFAST)
data-notify-url | URL del comercio donde BanWire notifica los pagos exitoso
data-concept | Concepto de pago
data-international | Configuración especial para pagos internacionales (Segundo apellido opcional)
data-secure-3d | Habilidar validación de 3D Secure para proteccion de compras ( Afiliación Banorte - Payworks)
data-reference | ID de pedido del comercio
data-months | "3,6,9,12" Pago a meses 
data-currency | Moneda: peso mexicano
data-exchange-rate | Tipo de cambio definido por el comercio (En caso de seleccionar una moneda que requiera mostrar el tipo de cambio a MXN. Solo informativo). Ejemplo: 15.00
data-cust-fname | Nombre del comprador
data-cust-mname | Apellido paterno del comprador
data-cust-lname | Apellido materno del comprador
data-cust-email | Email del comprador
data-cust-phone | Número telefónico del comprador (10 dígitos)
data-cust-addr | Dirección del comprador
data-cust-zip | Código postal del comprador
data-cust-city | Ciudad del comprador
data-cust-country | País del comprador (3 dígitos de acuerdo al formato ISO)
data-cust-state | Estado del comprador (2 dígitos de acuerdo al formato ISO)
data-ship-addr | Dirección de envío
data-ship-zip | Código postal de la dirección de envío
data-ship-city | Ciudad de envío
data-ship-country | País de envío (3 dígitos de acuerdo al formato ISO)
data-ship-state | Estado de envío (2 dígitos de acuerdo al formato ISO)
data-time | Cierre automático de la ventana. Por defecto es indefinido y no cerrará la ventana. (el valor es en segundos. valor minimo requerido 60 segundos.)
data-item-1-name | Nombre del producto uno
data-item-1-price | Precio del producto uno
data-item-1-qty | Cantidad de producto (s) uno

### Integración para pagos con tarjeta-habientes representados 
Para pagos en donde el tarjetahabiente es representado por un tercero en posesión de los datos e información confidencial del tarjeta-habiente, se debe agregar el siguiente parámetro.
```html
data-cust-represent="true"
```

### Integración para pagos recurrentes
Se pueden crear suscripciones a pagos recurrentes donde al cliente se le puede efecturar un número determinados de pagos fijos durante un periodo determinado de tiempo. Se deben agregar las siguientes variables:
```html
data-recurring="true"
data-recurring-interval="month"
data-recurring-limit="10"
data-recurring-start="2014-08-21"
data-recurring-total="100"
```
En donde la variable data-recurring-interval es el intervalo en el que se cobrará el pago y puede ser: "month" (mensualmente), "week" (semanalmente), "6months" (semestralmente), "annual" (anualmente), "3months" (trimestralmente)
La variable data-recurring-limit determina el número de pagos a ejecutar antes que termine la suscripción. En caso de no definir esta variable, la suscripción nunca vencerá.
En caso de no definir data-recurring-start, el pago inicial se efectuará de inmediato, en caso contrario el primer pago se realizará en la fecha especificada en esta variable en formato YYYY-MM-DD.
En caso de no establecer la variable data-recurring-total, el monto de cada pago será el especificado en data-total. En caso de que se necesite efectuar un primer pago inmediato con un monto diferente a los pagos subsecuentes, se debe de ingresar el monto inicial a pagar en data-total y los pagos subsecuentes serán por el monto establecido en data-recurring-total

## Integración utilizando Javascript

Es posible realizar una integración más personalizable utilizando Javascript directamente.
Para hacerlo pimero se debe incluir el archivo JS en HEAD o BODY de la página:
```html
<script type="text/javascript" src="https://sw.banwire.com/checkout.js"></script>
```

Y utilizar el siguente formato para iniciar el servicio:
```javascript
var SW = new BwGateway({
        // Quitar o establecer a false cuando pase a produccion
        sandbox: true,
        // Nombre de usuario de Banwire
        user: 'pruebasbw',
        // Titulo de la entana
        title: "Mi Comercio",
        // Referencia
        reference: 'testref01',
        // Concepto
        concept: 'pago de prueba',
        // Opcional: Moneda
        currency: 'MXN',
        // Opcional: Configuracion especial para pagos internacionales
        international: false,
        // Opcional: Habilitar Validacion 3D Secure
        secure3D: false,
        // Opcional: Tipo de cambio definido por el comercio (En caso de seleccionar una moneda que requiera mostrar el tipo de cambio a MXN. Solo informativo). Ejemplo: 15.00
        exchangeRate: '',
        // Total de la compra
        total: "100.00",
        // Opcional: Meses sin intereses
        months: [3,6,9,12],
        // Arreglo con los items de compra
        items: [
            {
                name: "Articulo uno",
                qty: 1,
                desc: "Articulo de prueba numero uno",
                unitPrice: 10
            },
            {
                name: "Articulo dos",
                qty: 2,
                desc: "Articulo numero dos de prueba",
                unitPrice: 40
            },
            {
                name: "Otro articulo con nombre mas largo",
                qty: 2,
                desc: "Articulo numero tres de prueba con una descripcion larga",
                unitPrice: 40
            }
        ],
        cust: {
            fname: "Ricardo", //Nombre del comprador
            mname: "Gamba", //Apellido paterno del comprador
            lname: "Lavin", //Apeliido materno del comprador
            email: "prueba@banwire.com", //Email del comprador
            phone: "55555555", //Número telefónico del comprador
            addr: "Direccion 440", //Dirección del comprador (calle y número)
            city: "Mexico", //Ciudad del comprador
            state: "DF", //Estado del comprador (2 dígitos de acuerdo al formato ISO)
            country: "MEX", //País del comprador (3 dígitos de acuerdo al formato ISO)
            zip: "14145" //Código de postal del comprador
        },
        ship: {
            addr: "Direccion 440", //Dirección de envío
            city: "Mexico", //Ciudad de envío
            state: "DF", //Estado de envío (2 dígitos de acuerdo al formato ISO)
            country: "MEX", //País de envío (3 dígitos de acuerdo al formato ISO)
            zip: "14145" //Código de postal del envío
        },
        // Cierre automático de la ventana. Por defecto es indefinido y no cerrará la ventana. (el valor es en segundos. valor minimo requerido 60 segundos.)
        time: 900, // Ejemplo de cierre de ventana automáticamente en 15 minutos
        // Opciones de pago, por defecto es "all". Puede incluir varias opciones separadas por comas
        paymentOptions: 'all', // visa, mastercard, amex, paycash, oxxo,speifast,all
        // Mostrar o no pagina de resumen de compra
        reviewOrder: true,
        // Mostrar o no mostrar los campos de envio
        showShipping: true,
        // Solamente para pagos recurrentes o suscripciones
        recurring: {
            // Cada cuanto se ejecutará el pago "month","year" o un entero representando numero de días
            interval: "month",
            // Opcional: Limitar el número de pagos (si no se pone entonces no tendrá limite)
            limit: 10, 
            // Opcional: Fecha del primer cargo (en caso de no especificar se ejecutará de inmediato)
            start: "2014-01-01", // Formaro YYYY-MM-DD
            // Opcional: En caso de que los pagos subsecuentes (después del primero)
            // tengan un monto distinto al inicial
            total: "50.00"
        },
        // URL donde se van a enviar todas las notificaciones por HTTP POST de manera asoncrónica
        notifyUrl: "https://www.mipagina.com/recibir.php",
        // Handler en caso de exito en el pago
        successPage: 'http://google.com',
        onSuccess: function(data){
            alert("¡Gracias por tu pago!")
        },
        // Pago pendiente OXXO
        pendingPage: 'http://yahoo.com',
        onPending: function(data){
            alert("El pago está pendiente por ser efectuado");
        },
        // Pago challenge
        challengePage: 'http://challenge.com',
        onChallenge: function(data){
            alert("Pago enviado a validaciones de seguridad");
        },
        // Handler en caso de error en el pago
        errorPage: 'http://facebook.com',
        onError: function(data){
            alert("Error en el pago");
        },
        // Cuando cierra el popup sin completar el proceso
        onCancel: function(data){
            console.log("Se cancelo el proceso");
        }
    });

function pagar() {
    // Podemos pagar con los valores por defecto
    SW.pay();
    
    /* O podemos modificar los valores antes de efectuar el pago
    SW.pay({
        total: 500,
        concept: "Concepto nuevo"
    });
    */
}
```
Se puede invocar el pago desde cualquier botón de pago:
```html
<a href="#" onclick="pagar();" class="btn-pay">Pagar</a>
```

#### Moneda: Valor y Descripción (currency)

Valor | Descripción
--- | --- 
MXN | Peso mexicano (Default)
USD | Dólar americano (Sólo de carácter informativo. El total a pagar sera mostrado en Pesos mexicanos [MXN])
EUR | Euro (Sólo de carácter informativo. El total a pagar sera mostrado en Pesos mexicanos [MXN])

# Respuestas y notificaciones
El sistema emitirá una serie de notificaciones en diferentes eventos del proceso que se detallarán a continuación.

## Notificaciones con tarjeta

### Pago exitoso
Cada vez que se efectúa un pago exitoso, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | card | Tipo de evento de la notificación
status | paid | Estatus de la transacción
auth_code | Alfanumérico | Código unico de autorización de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
hash | sha1 | Hash de seguridad*
plan | Arreglo | Conjunto de variables ****
plan[type] | Alfanumérico | Tipo de plan ****
plan[no_payments] | Alfanumérico | Número de pagos (Ejemplo: en caso de tipo 'no_interest', 6 = 6 Meses) ****

**** La variable sera agregada dentro la notificación solo en caso que se haya seleccionado un plan de pagos (pagos a meses). 

#### Tipos de planes

Tipo | Descripción
--- | --- 
no_interest | Meses sin intereses

### Challenge ***
Cada vez que un pago se envía a revisión, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables: 

Variable | Valor | Descripción
--- | --- | --- 
event | card | Tipo de evento de la notificación
status | challenge | Estatus de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
hash | sha1 | Hash de seguridad*
plan | Arreglo | Conjunto de variables ****
plan[type] | Alfanumérico | Tipo de plan [no_interest] ****
plan[no_payments] | Alfanumérico | Número de pagos (Ejemplo: en caso de tipo 'no_interest', 6 = 6 Meses) ****

## Notificaciones OXXO

### Pago pendiente ***
Cada vez que se realize una solicitud de pago en OXXO, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | oxxo | Tipo de evento de la notificación
status | pending | Estatus de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

### Pago exitoso
Cada vez que se recibe un pago vía OXXO, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | oxxo | Tipo de evento de la notificación
status | paid | Estatus de la transacción
auth_code | Alfanumérico | Código de barras del pago
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

## Notificaciones Paycash

### Pago pendiente ***
Cada vez que se realize una solicitud de pago en las tiendas de conveniencia con sistema Paycash, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | paycash | Tipo de evento de la notificación
status | pending | Estatus de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

### Pago exitoso
Cada vez que se recibe un pago vía Paycash, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | paycash | Tipo de evento de la notificación
status | paid | Estatus de la transacción
auth_code | Alfanumérico | Código de barras del pago
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado



## Notificaciones SPEIFAST

### Pendiente ***
Cada vez que se realize una solicitud de pago en SPEIFAST, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | speifast | Tipo de evento de la notificación
status | pending | Estatus de la transacción
type | sent | Tipo de movimiento de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

### Abono
Cada vez que se recibe un pago parcial vía SPEIFAST y no se cubre el monto total, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | speifast | Tipo de evento de la notificación
status | pending | Estatus de la transacción
type | parcial_payment | Tipo de movimiento de la transacción
auth_code | Alfanumérico | Código de rastreo del SPEI
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

### Pago exitoso
Cada vez que se recibe un pago vía SPEIFAST y si se cubre el monto total, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | speifast | Tipo de evento de la notificación
status | paid | Estatus de la transacción
type | completed | Tipo de movimiento de la transacción
auth_code | Alfanumérico | Código de rastreo del SPEI
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado

## Notificaciones de pago recurrente con tarjeta

### Pago exitoso
Cada vez que se efectúa un pago recurrente exitoso, Banwire enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | recurring | Tipo de evento de la notificación
status | paid | Estatus de la transacción
auth_code | Alfanumérico | Código unico de autorización de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado
token | Alfanumérico | Token identificador de la suscripcion
cancel_url | URL | URL para cancelar la suscripción

### Pago declinado ***
Cada vez que se efectúa un pago recurrente declinado, Banwire enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | recurring | Tipo de evento de la notificación
status | denied | Estatus de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
hash | sha1 | Hash de seguridad*
total | Decimal | Total pagado
token | Alfanumérico | Token identificador de la suscripcion
cancel_url | URL | URL para cancelar la suscripción

 *** Por el momento está disponible solo para algunos usuarios.

## Cancelar suscripción de pago recurrente
Para cancelar una suscripción de pago recurrente se debe solicitar directamente al contacto soporte@banwire.com, dado que el servicio de cancelación está en mantenimiento.

## Pruebas de Secure Window
Para realizar pruebas con Secure Window se debe activar el ambiente de sandbox y utilizar el usuario de pruebas 'pruebasbw', es posible simular el pago exitoso con la tarjeta de pruebas.

### Tarjeta de pruebas
Dato | Valor
--- | ---
Nombre tarjetahabiente | Pruebasbw 
Número de Tarjeta | 5134422031476272
Tipo de tarjeta | MasterCard
Fecha de expiración | 12/21
Código de seguridad | 162

### Ejemplos en vivo
[Ir a la página de ejemplos en vivo](https://test.banwire.com/sw_ex)

## De sandbox a producción 
Para pasar a producción el proceso es el siguiente, el representante de la cuenta debe enviar un correo a soporte@banwire.com solicitando su pase a modo de producción, de éste correo se les indicará las instrucciones a realizar en la integración para configurarla para modo de producción.

## Hash de Seguridad
El parámetro 'hash' es un valor cifrado con el algoritmo SHA256 mediante una clave específica (API-SECRET) usando el método HMAC. Este parámetro se utilizará para poder verificar que el emisor de la notificación recibida está autorizado por el receptor, éste último deberá validar el parámetro Hash, asegurándose que el valor cifrado coincida con el que él calcula.

Todas las Respuestas y Notificaciones que son enviadas desde BanWire en los diferentes eventos del proceso de Secure Window incluyen el parámetro 'hash'.

API-SECRET es un valor único que se genera de forma aleatoria para cada cuenta de BanWire que se encuentran utilizando el API de Secure Window. BanWire sólo revelará ésta información al usuario autorizado de la cuenta (el manejo de ésta información quedará bajo responsabilidad y propio riesgo del usuario). Si se cree o se sabe que ésta información se conoce por un  tercera o sufre algún tipo de riesgo, se debe informar inmediatamente a BanWire para que se pueda generar y proporcionar una nueva API-SECRET. Ésta información se proporcionará una vez el usuario tenga su proceso administrativo terminado, lo que incluye la firma del contrato con BanWire.

### ¿Cómo se calcula el valor del parámetro 'hash'?
El parámetro 'hash' es el valor cifrado del parámetro 'id'(Identificador único de la transacción), el cual se incluye dentro de la notificación vía POST que envía BanWire a la URL del parámetro 'notifyUrl' en la integración.
Ejemplo:

Valor del parámetro id | API SECRET | Valor del parámetro hash
--- | --- | ---
14 | aBc0123456789 | 484a265cc951ab1ff646506fe4211ba6b3e9e64887968a5d9db1675c624baf99

Ejemplo en PHP:
```html
$hash = hash_hmac('sha256','14','aBc0123456789');
```

#BanWire Javascript SDK

SDK for integration of BanWire Pago Pro with ReD.
Review the files in the examples folder for integration methods.

## Integration using HTML

To integrate using only HTML, use the following format:
```html

<script
    type="text/javascript"
    src="https://sw.banwire.com/checkout.js"
    data-sandbox="true" 
    data-user="testbw" 
    data-total="500.00" 
    data-cust-fname="Richard" 
    data-cust-mname="Gamba" 
    data-cust-lname="Lavin" 
    data-cust-email="test@banwire.com" 
    data-success-page="http://success_page.com" 
    data-error-page="http://error_page.com" 
    data-pending-page="http://pending_page.com" 
    data-concept="Payment concept" 
    data-reference="Payment reference" 
    data-notify-url="https://test.banwire.com/sw/examples/response.php" 
    data-button-caption="Pay now" 
    data-button-class="btn-pay"
    data-secure-3d="false"
    data-international="false">
</script>
```

For a more personalized integration additional (optional) parameters can be used:
```html

<script
    type="text/javascript"
    src="https://sw.banwire.com/checkout.js"
    data-sandbox="true" 
    data-user="testbw" 
    data-title="My trade" 
    data-total="500.00" 
    data-payment-options="visa,amex" 
    data-review-order="true" 
    data-international="true"
    data-secure-3d="false"
    data-loading-text="Espere..."
    data-success-page="https://test.banwire.com/sw/examples" 
    data-notify-url="https://test.banwire.com/sw/examples/response.php" 
    data-error-page="http://error_page.com"  
    data-pending-page="http://pending_page.com" 
    data-concept="Payment concept" 
    data-reference="Payment reference" 
    data-months="3,6,9,12" 
    data-currency="MXN" 
    data-exchange-rate="" 
    data-cust-fname="Richard" 
    data-cust-mname="Gamba" 
    data-cust-lname="Lavin" 
    data-cust-email="test@banwire.com" 
    data-cust-phone="55555555" 
    data-cust-addr="North Miami, florida" 
    data-cust-zip="33162" 
    data-cust-city="United States" 
    data-cust-country="USA" 
    data-cust-state="UA"  
    data-ship-addr="Shipping Address" 
    data-ship-zip="33162" 
    data-ship-city="United States" 
    data-ship-country="USA" 
    data-ship-state="UA" 
    data-button-caption="Pay now" 
    data-button-class="btn-pay"
    data-time="900"
    data-item-1-name="First" 
    data-item-1-price="100.00" 
    data-item-1-qty="2"
    data-item-2-name="Second" 
    data-item-2-price="100.00" 
    data-item-2-qty="3"> /
</script>
```

### Parameter description
Parameter | Description
--- | ---
data-sandbox | TRUE / FALSE Activate test environment
data-user | Username
data-title | Business name
data-total | Amount payable
data-payment-options | Payment options (all:todos, visa, amex, oxxo, spei)
data-review-order | TRUE / FALSE Activate purchase summary
data-success-page | Merchant successful payment information page
data-error-page | Trade error page
data-pending-page | Merchant's pending payment page (applies for payments in OXXO and SPEIFAST)
data-notify-url | URL of the merchant where BanWire notifies successful payments
data-concept | Payment concept
data-international | Special configuration for international payments (second last name optional)
data-secure-3d | Enable 3D Secure validation for purchase protection (Banorte - Payworks Affiliation)
data-reference | Merchant Order ID
data-months | "3,6,9,12" Payment in months
data-currency | Currency: Mexican peso
data-exchange-rate | Exchange rate defined by the business (In case you select a currency that requires showing the exchange rate to MXN. Informational only). Example: 15.00
data-cust-fname | Name of the buyer
data-cust-mname | Buyer's paternal surname
data-cust-lname | Buyer's mother's name
data-cust-email | Buyer email
data-cust-phone | Buyer's telephone number (10 digits)
data-cust-addr | Purchaser's address
data-cust-zip | Buyer's zip code
data-cust-city | Buyer's city
data-cust-country | Buyer's country (3 digits according to ISO format)
data-cust-state | Buyer's status (2 digits according to ISO format)
data-ship-addr | Shipping Address
data-ship-zip | Shipping address zip code
data-ship-city | Shipping city
data-ship-country | Shipping country (3 digits according to ISO format)
data-ship-state | Shipping status (2 digits according to ISO format)
data-time | Automatic window closing. By default it is undefined and will not close the window. (value is in seconds. Minimum value required 60 seconds.)
data-item-1-name | Product name one
data-item-1-price | Price of product one
data-item-1-qty | Quantity of product(s) one

### Integration for payments with represented cardholders
For payments where the cardholder is represented by a third party in possession of the cardholder's data and confidential information, the following parameter must be added.
```html
data-cust-represent="true"
```

### Integration for recurring payments
Subscriptions to recurring payments can be created where the client can be made a certain number of fixed payments during a certain period of time. The following variables must be added:
```html
data-recurring="true"
data-recurring-interval="month"
data-recurring-limit="10"
data-recurring-start="2014-08-21"
data-recurring-total="100"
```
Where the variable data-recurring-interval is the interval in which the payment will be collected and can be: "month" (monthly), "week" (weekly), "6months" (semi-annually), "annual" (annually) , "3months" (quarterly)
The data-recurring-limit variable determines the number of payments to execute before the subscription ends. If this variable is not defined, the subscription will never expire.
If data-recurring-start is not defined, the initial payment will be made immediately, otherwise the first payment will be made on the date specified in this variable in YYYY-MM-DD format.
If the data-recurring-total variable is not established, the amount of each payment will be the one specified in data-total. In the event that a first immediate payment needs to be made with an amount different from subsequent payments, the initial amount to be paid must be entered in data-total and subsequent payments will be for the amount established in data-recurring-total

## Integration using Javascript

A more customizable integration is possible using Javascript directly.
To do this, you must first include the JS file in the HEAD or BODY of the page:
```html
<script type="text/javascript" src="https://sw.banwire.com/checkout.js"></script>
```
And use the following format to start the service:
```javascript

var SW = new BwGateway({
         // Remove or set to false when going to production
         sandbox: true,
         // Banwire username
         user: 'bwtests',
         // Window title
         title: "My Trade",
         // Reference
         reference: 'testref01',
         // Concept
         concept: 'trial payment',
         // Optional: Currency
         currency: 'MXN',
         // Optional: Special configuration for international payments
         international: false,
         // Optional: Enable 3D Secure Validation
         secure3D: false,
         // Optional: Exchange rate defined by the business (In case you select a currency that requires displaying the exchange rate to MXN. Informational only). Example: 15.00
         exchangeRate: '',
         // Total purchase
         total: "100.00",
         // Optional: Months without interest
         months: [3,6,9,12],
         // Arrangement with purchase items
         items: [
             {
                 name: "Article one",
                 qty: 1,
                 desc: "Test article number one",
                 unitPrice: 10
             },
             {
                 name: "Article two",
                 qty: 2,
                 desc: "Test article number two",
                 unitPrice: 40
             },
             {
                 name: "Another article with a longer name",
                 qty: 2,
                 desc: "Test item number three with a long description",
                 unitPrice: 40
             }
         ],
         cust: {
             fname: "Ricardo", //Buyer name
             mname: "Gamba", //Paternal surname of the buyer
             lname: "Lavin", //Buyer's mother's last name
             email: "test@banwire.com", //Buyer email
             phone: "55555555", //Buyer's phone number
             addr: "Address 440", //Buyer's address (street and number)
             city: "Mexico", //Buyer's city
             state: "DF", //Buyer's state (2 digits according to ISO format)
             country: "MEX", //Buyer's country (3 digits according to ISO format)
             zip: "14145" //Buyer's zip code
         },
         ship: {
             addr: "Address 440", //Shipping address
             city: "Mexico", //Shipping city
             state: "DF", //Shipping status (2 digits according to ISO format)
             country: "MEX", //Shipping country (3 digits according to ISO format)
             zip: "14145" //Shipping zip code
         },
         // Automatic closing of the window. By default it is undefined and will not close the window. (value is in seconds. Minimum value required 60 seconds.)
         time: 900, // Example of automatically closing the window in 15 minutes
         // Payment options, default is "all". Can include multiple options separated by commas
         paymentOptions: 'all', // visa, mastercard, amex, paycash, oxxo, speifast, all
         // Show purchase summary page or not
         reviewOrder: true,
         // Show or not show shipping fields
         showShipping: true,
         // Only for recurring payments or subscriptions
         recurring: {
             // How often will the payment be executed "month","year" or an integer representing number of days
             interval: "month",
             // Optional: Limit the number of payments (if not set then there will be no limit)
             limit: 10,
             // Optional: Date of the first charge (if not specified it will be executed immediately)
             start: "2014-01-01", // Form YYYY-MM-DD
             // Optional: In case subsequent payments (after the first one)
             // have a different amount than the initial one
             total: "50.00"
         },
         // URL where all HTTP POST notifications will be sent asynchronously
         notifyUrl: "https://www.mipagina.com/recibir.php",
         // Handler in case of payment success
         successPage: 'http://google.com',
         onSuccess: function(data){
             alert("Thank you for your payment!")
         },
         // OXXO pending payment
         pendingPage: 'http://yahoo.com',
         onPending: function(data){
             alert("The payment is pending to be made");
         },
         // Challenge payment
         challengePage: 'http://challenge.com',
         onChallenge: function(data){
             alert("Payment sent to security validations");
         },
         // Handler in case of payment error
         errorPage: 'http://facebook.com',
         onError: function(data){
             alert("Payment error");
         },
         // When the popup closes without completing the process
         onCancel: function(data){
             console.log("The process was canceled");
         }
     });

function pay() {
     // We can pay with default values
     SW.pay();
    
     /* Or we can modify the values still
}
```
Payment can be invoked from any payment button:
```html
<a href="#" onclick="pay();" class="btn-pay">Pay</a>
```
#### Currency: Value and Description (currency)

Value | Description
--- | ---
MXN | Mexican peso (Default)
USD | American dollar (For informational purposes only. The total to be paid will be shown in Mexican pesos [MXN])
EUR | Euro (For informational purposes only. The total to be paid will be shown in Mexican pesos [MXN])

# Responses and notifications
The system will issue a series of notifications in different events of the process that will be detailed below.

## Card notifications

### Payment successful
Every time a successful payment is made, the system will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | cards | Notification event type
status | paid | Transaction status
auth_code | Alphanumeric | Unique transaction authorization code
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
total | Decimal | Total paid
hash | sha1 | Security hash*
plan | Arrangement | Variable set ****
plan[type] | Alphanumeric | Plan Type ****
plan[no_payments] | Alphanumeric | Number of payments (Example: in case of type 'no_interest', 6 = 6 Months) ****

**** The variable will be added to the notification only if a payment plan (monthly payments) has been selected.

#### Types of plans

Type | Description
--- | ---
no_interest | Months without interest

###Challenge***
Each time a payment is submitted for review, the system will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | cards | Notification event type
status | challenges | Transaction status
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
total | Decimal | Total paid
hash | sha1 | Security hash*
plan | Arrangement | Variable set ****
plan[type] | Alphanumeric | Plan type [no_interest] ****
plan[no_payments] | Alphanumeric | Number of payments (Example: in case of type 'no_interest', 6 = 6 Months) ****

## OXXO Notifications

### Pending payment ***
Every time a payment request is made in OXXO, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | oxxo | Notification event type
status | pending | Transaction status
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

### Payment successful
Every time a payment is received via OXXO, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | oxxo | Notification event type
status | paid | Transaction status
auth_code | Alphanumeric | Payment barcode
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

## Paycash Notifications

### Pending payment ***
Every time a payment request is made in convenience stores with the Paycash system, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | paycash | Notification event type
status | pending | Transaction status
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

### Payment successful
Every time a payment is received via Paycash, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | paycash | Notification event type
status | paid | Transaction status
auth_code | Alphanumeric | Payment barcode
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

## SPEIFAST notifications

### Earring ***
Every time a payment request is made in SPEIFAST, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | speifast | Notification event type
status | pending | Transaction status
type | sent | Transaction movement type
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

### Pass
Every time a partial payment is received via SPEIFAST and the full amount is not covered, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | speifast | Notification event type
status | pending | Transaction status
type | partial_payment | Transaction movement type
auth_code | Alphanumeric | SPEI tracking code
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

### Payment successful
Every time a payment is received via SPEIFAST and if the full amount is covered, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | speifast | Notification event type
status | paid | Transaction status
type | completed | Transaction movement type
auth_code | Alphanumeric | SPEI tracking code
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid

## Recurring card payment notifications

### Payment successful
Each time a successful recurring payment is made, Banwire will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | regular | Notification event type
status | paid | Transaction status
auth_code | Alphanumeric | Unique transaction authorization code
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid
token | Alphanumeric | Subscription identifier token
cancel_url | URL | Unsubscribe URL

### Payment Declined ***
Each time a declined recurring payment is made, Banwire will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

Variable | Value | Description
--- | --- | ---
events | regular | Notification event type
status | denied | Transaction status
reference | The one originally sent | The payment reference initially sent by data-reference
id | Alphanumeric | Payment identifier within Banwire
hash | sha1 | Security hash*
total | Decimal | Total paid
token | Alphanumeric | Subscription identifier token
cancel_url | URL | Unsubscribe URL

  ***At the moment it is only available for some users.

## Cancel recurring payment subscription
To cancel a recurring payment subscription, you must request it directly to the contact support@banwire.com, since the cancellation service is under maintenance.

## Secure Window Testing
To carry out tests with Secure Window, you must activate the sandbox environment and use the test user 'testsbw', it is possible to simulate the successful payment with the test card.

### Test card
Data | Worth
--- | ---
Cardholder name | Testsbw
Card Number | 5134422031476272
Card type | MasterCard
Expiration date | 12/21
Security code | 162

### Live examples
[Go to live examples page](https://test.banwire.com/sw_ex)

## From sandbox to production
To go to production, the process is as follows: the account representative must send an email to support@banwire.com requesting the transfer to production mode. From this email, they will be given the instructions to carry out the integration to configure it for production mode. of production.

## Security Hash
The 'hash' parameter is a value encrypted with the SHA256 algorithm using a specific key (API-SECRET) using the HMAC method. This parameter will be used to verify that the sender of the notification received is authorized by the receiver, the latter must validate the Hash parameter, ensuring that the encrypted value matches the one it calculates.

All Responses and Notifications that are sent from BanWire in the different events of the Secure Window process include the 'hash' parameter.

API-SECRET is a unique value that is randomly generated for each BanWire account found using the Secure Window API. BanWire will only disclose this information to the authorized user of the account (the handling of this information will be under the user's own responsibility and risk). If it is believed or known that this information is known by a third party or suffers any type of risk, BanWire must be immediately informed so that a new API-SECRET can be generated and provided. This information will be provided once the user has completed their administrative process, which includes signing the contract with BanWire.

### How is the value of the 'hash' parameter calculated?
The 'hash' parameter is the encrypted value of the 'id' parameter (Unique Transaction Identifier), which is included within the POST notification that BanWire sends to the URL of the 'notifyUrl' parameter in the integration.
Example:

Parameter value id | SECRET API | Hash parameter value
--- | --- | ---
14 | aBc0123456789 | 484a265cc951ab1ff646506fe4211ba6b3e9e64887968a5d9db1675c624baf99

Example in PHP:
```html
$hash = hash_hmac('sha256','14','aBc0123456789');
```
