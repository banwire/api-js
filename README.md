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
    data-button-class="btn-pay">
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
data-item-1-name | Nombre del producto uno
data-item-1-price | Precio del producto uno
data-item-1-qty | Cantidad de producto (s) uno

### Integración para pagos con tarjeta-habientes representados 
Para pagos en donde el tarjetahabiente es representado por un tercero en posesión de los datos e información confidencial del tarjeta-habiente, se debe agregar el siguiente parámetro.
```html
data-cust-represented="true"
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
        // Opciones de pago, por defecto es "all". Puede incluir varias opciones separadas por comas
        paymentOptions: 'all', // visa,mastercard,amex,oxxo,speifast,all
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
Fecha de expiración | 12/19
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
