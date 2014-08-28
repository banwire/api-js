# BanWire Javascript SDK

SDK para integración de BanWire Pago Pro con ReD.
Revisar los archivos en la carpeta examples para ver los métodos de integración.

## Integración utilizando HTML

Para integrar utilizando sólo HTML, utiliza el siguiente formato:
```html
<script
    type="text/javascript"
    src="https://test.banwire.com/sw/checkout.js"
    data-sandbox="true"
    data-user="userdemo"
    data-total="500.00"
    data-success-page="http://google.com"
    data-error-page="http://facebook.com"
    data-pending-page="http://yahoo.com"
    data-concept="Concepto de pago"
    data-reference="Referencia de pago"
    data-button-caption="Pagar ahora"
    data-button-class="btn-pay">
</script>
```

Para una integración más personalizada se pueden utilizar parámetros adicionales (opcionales):
```html
<script
    type="text/javascript"
    src="https://test.banwire.com/sw/checkout.js"
    data-sandbox="true"
    data-user="userdemo"
    data-title="Mi Comercio"
    data-total="500.00"
    data-payment-options="visa,amex"
    data-review-order="true"
    data-sandbox="true"
    data-loading-text="Espere..."
    data-success-page="https://test.banwire.com/sw/examples"
    data-notify-url="https://test.banwire.com/sw/examples/response.php"
    data-error-page="http://facebook.com"
    data-pending-page="http://yahoo.com"
    data-concept="Concepto de pago"
    data-reference="Referencia de pago"
    data-months="3,6"
    data-currency="MXN"
    data-cust-fname="Ricardo"
    data-cust-mname="Gamba"
    data-cust-lname="Lavin"
    data-cust-email="rgamba@gmail.com"
    data-cust-phone="55555555"
    data-cust-addr="Circuito fuentes del pedregal 440 10"
    data-cust-zip="14140"
    data-cust-city="Mexico"
    data-cust-country="MEX"
    data-cust-state="Di"
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
    data-item-2-qty="3">
</script>
```

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
<script type="text/javascript" src="https://test.banwire.com/sw/checkout.js"></script>
```

Y utilizar el siguente formato para iniciar el servicio:
```javascript
var SW = new BwGateway({
        // Quitar o establecer a false cuando pase a produccion
        sandbox: true,
        // Nombre de usuario de Banwire
        user: 'userdemo',
        // Titulo de la entana
        title: "Mi Comercio",
        // Referencia
        reference: 'testref01',
        // Concepto
        concept: 'pago de prueba',
        // Opcional: Moneda
        currency: 'MXN',
        // Total de la compra
        total: "100.00",
        // Opcional: Meses sin intereses
        months: [3,6],
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
                name: "Otro articulo con nombre mas largo quien sabe que mas poner",
                qty: 2,
                desc: "Articulo numero tres de prueba con una descripcion bien larga",
                unitPrice: 40
            }
        ],
        cust: {
            fname: "Ricardo",
            mname: "Gamba",
            lname: "Lavin",
            email: "rgamba@banwire.com",
            phone: "56457845",
            addr: "Direccion 440",
            city: "Mexico",
            state: "Di",
            country: "MEX",
            zip: "14145"
        },
        ship: {
            addr: "Direccion 440",
            city: "Mexico",
            state: "Di",
            country: "MEX",
            zip: "14145"
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

# Respuestas y notificaciones
El sistema emitirá una serie de notificaciones en diferentes eventos del proceso que se detallarán a continuación.

## Notificación de pago recibido con tarjeta
Cada vez que se efectúa un pago exitoso, Banwire enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | card | Tipo de evento de la notificación
auth_code | Alfanumérico | Código unico de autorización de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
hash | sha1 | Hash de seguridad*

## Notificación de pago recibido via OXXO
Cada vez que se recibe un pago vía OXXO, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | oxxo | Tipo de evento de la notificación
auth_code | Alfanumérico | Código de barras del pago
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
hash | sha1 | Hash de seguridad*

## Notificación de pago recibido via SPEIFAST
Cada vez que se recibe un pago vía SPEIFAST, el sistema enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | speifast | Tipo de evento de la notificación
auth_code | Alfanumérico | Código de rastreo del SPEI
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
hash | sha1 | Hash de seguridad*

## Notificación de pago recurrente recibido
Cada vez que se efectúa un pago recurrente exitoso, Banwire enviará una notificación vía HTTP POST a la URL establecida en data-notify-url (HTML) o notifyUrl (Javascript) con las siguientes variables:

Variable | Valor | Descripción
--- | --- | --- 
event | recurring | Tipo de evento de la notificación
auth_code | Alfanumérico | Código unico de autorización de la transacción
reference | El enviado inicialmente | La referencia de pago enviada inicialmente por data-reference
id | Alfanumérico | Identificador de pago dentro de Banwire
total | Decimal | Total pagado
token | Alfanumérico | Token identificador de la suscripcion
hash | sha1 | Hash de seguridad*
cancel_url | URL | URL para cancelar la suscripción

## Ejemplos en vivo
[Ir a la página de ejemplos en vivo](https://test.banwire.com/sw/examples)
