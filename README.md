# BanWire Javascript SDK

SDK para integración de BanWire Pago Pro con ReD.
Revisar los archivos en la carpeta examples para ver los métodos de integración.

## Ejemplo de integración utilizando sólo HTML

Para integrar utilizando sólo HTML, utiliza el siguiente formato:

  <script
      type="text/javascript"
      src="https://test.banwire.com/sw/checkout.js"
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
