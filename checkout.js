/**
 * BanWire Payment Gateway
 * ---
 * @author Ricardo Gamba <rgamba@gmail.com>
 * @created 24/08/2013
 * @modified 24/08/2013
 *
 * La clase se puede instanciar con un objeto vars
 * con la siguiente estructura:
 *
 * - user: {string} Nombre de usuario en Banwire
 * - reference: {string} Referencia del pago (opcional)
 * - successPage: {string} En caso de que se incluya, el explorador redirigira a esta pagina en caso de que el pago
 *              se haya completado correctamente (opcional)
 * - errorPage: {string} En caso de existir, el explorador redirigira a esta pagina en caso de pago rechazado (opcional)
 * - pendingPage: {string} En caso de existir, el explorador redirigira  a esta pagina en caso de pago pendiente
 *              por ejemplo en pago con OXXO (opcional)
 * - currency: {string} Codigo de la divisa. Por defecto es MXN (opcional)
 * - total: {float} Total a pagar
 * - items: {object} Concepto de compra o desgloce de articulos. Debe ser un arreglo de objetos con la estructura:
 *      - name: {string} Nombre o concepto del articulo
 *      - desc: {string} Descripcion del articulo (opcional)
 *      - unitPrice: {float} Precio unitario
 *      - qty: {int} Cantidad. Por defecto es 1 (opcional)
 * - paymentOptions: {string} Opciones de pago a desplegar, separadas por coma. Pueden ser: visa, mastercard, amex, oxxo, all.
 *                   Por defecto es "all" y muestra todas las opciones
 * - reviewOrder: {bool} Determina si mostrar o no la pagina de revision de compra
 * - months: {array}{int} Habilita pago a meses en caso de que la terminal lo soporte
 * - onSuccess: {function} Funcion a ejecutar en caso de que el pago se completo correctamente (opcional)
 * - onError: {function} Funcion a ejecutar en caso de que el no se completo o fue rechazado (opcional)
 * - onPending: {function} Funcion a ejecutar en caso de que el pago quedo pendiente (opcional)
 * - onCancel: {function} Funcion a ejecutar en caso de que la ventana fue cerrada antes de completar el proceso (opcional)
 *
 * @usage:
 * Ejemplo sencillo
 * BwGateway = new BwGateway({
 *     user: 'test',
 *     successPage: 'http://localhost/exito.html
 *     errorPage: 'http://localhost/error.html
 *     pendingPage: 'http://localhost/pending.html
 *     items: [
 *           {
 *               name: 'Producto de compra',
 *               unitPrice: 100
 *           }
 *     ],
 *     total: 100
 * }).pay();
 * ------
 * Ejemplo con uso de funciones callback
 * BwGateway = new BwGateway({
 *     user: 'test'
 *     reference: 'P0001',
 *     items: [
 *           {
 *               name: 'Producto de compra',
 *               unitPrice: 100
 *           }
 *     ],
 *     total: 100,
 *     onError: function(){
 *          console.log("Error en el pago");
 *     },
 *     onSuccess: function(){
 *          console.log("Pago exitoso");
 *     },
 *     onPending: function(){
 *          console.log("Pago pendiente");
 *     },
 *     onCancel: function(){
 *          console.log("El pago fue cancelado por el usuario");
 *     }
 * }).pay();
 * ------
 * Ejemplo para varios conceptos de pago en la misma pagina usando links con atributos
 * En un <script>:
 * BwGateway = new BwGateway({
 *      user: 'test',
 *      successPage: 'http://localhost/exito.html',
 *      errorPage: 'http://localhost/exito.html',
 *      pendingPage: 'http://localhost/exito.html',
 * });
 *
 * Y los botones:
 * <a href="#" data-total="100" data-item-name="Articulo uno" data-item-unitprice="50" data-item-qty="2" onclick="BwGateway.pay(this);">Articulo uno</a>
 * <a href="#" data-total="200" data-item-name="Articulo dos" data-item-unitprice="200" data-item-qty="1" onclick="BwGateway.pay(this);">Articulo dos</a>
 * ------
 * Ejemplo para varios botones de pago con varios conceptos cada uno
 * En un <script>:
 * BwGateway = new BwGateway({
 *      user: 'test',
 *      successPage: 'http://localhost/exito.html',
 *      errorPage: 'http://localhost/exito.html',
 *      pendingPage: 'http://localhost/exito.html',
 * });
 *
 * Y los botones:
 * <a href="#" onclick="BwGateway.setParams({total: 1500, items: [{name: 'Primero', unitPrice: 500, qty: 2}, {name: 'Segundo', unitPrice: 500}]}).pay(); return false;">Paquete uno</a>
 * <a href="#" onclick="BwGateway.setParams({total: 1500, items: [{name: 'Tercero', unitPrice: 500, qty: 2}, {name: 'Cuarto', unitPrice: 500}]}).pay(); return false;">Paquete dos</a>
 */
var BwGateway = function(vars){
    /**
     * URL de entrada del gateway en BanWire
     * @type {String}
     */
    this.gateway_url = 'https://test.banwire.com/sw/';
    /**
     * Referencia a la ventana emergente
     * @type {null}
     */
    this.popup = null;
    /**
     * Las variables de configuracion se almacenan aqui
     * @type {Object}
     */
    this.params = {};
    /**
     * Determina si el proceso se completo o se cancelo
     * @access private
     * @type {Boolean}
     */
    this.popup_completed = false;

    this.proxy = null;

    /**
     * Funcion para abrir el popup
     * @access public
     */
    this.pay = function(obj){
        if(this.popup != null)
            return false;
        if(typeof this.params.loadingText == "undefined")
            this.params.loadingText = "Por favor espere...";
        try{
            if(typeof obj != "undefined"){
                if(obj.tagName.toLowerCase() == "a"){
                    obj.rel = obj.innerHTML;
                    obj.innerHTML = this.params.loadingText;
                } else {
                    obj.rel = obj.value;
                    obj.value = this.params.loadingText;
                }
            }

            if(typeof obj != "undefined" && obj.hasAttribute("data-total")){
                // Tiene los detalles del pago en los atributos del link

                this.params.total = parseFloat(obj.getAttribute("data-total"));
                if(obj.hasAttribute("data-item-name") && obj.hasAttribute("data-item-price")){
                    this.params.items = [{
                        name: obj.getAttribute("data-item-name"),
                        unitPrice: parseFloat(obj.getAttribute("data-item-price")),
                        qty: obj.hasAttribute("data-item-qty") ? parseInt(obj.getAttribute("data-item-qty")) : 1,
                        desc: obj.hasAttribute("data-item-desc") ? obj.getAttribute("data-item-desc") : ''
                    }];
                }
            }
        }catch(err){
            // IE7 da error tratando de obtener los attr de HTML5
        }
        //console.log(this.params);
        var w = 480;
        var h = 430;
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var left = ((screen.width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((screen.height / 2) - (h / 2)) + dualScreenTop;

        //this.popup = window.open(this.gateway_url + '?' + build_query(this.params), 'mainapp', 'width='+w+', height='+h+', directories=0, location=0, menubar=0, resizable=0, status=0, toolbar=0, fullscreen=0, scrollbars=1, top='+top+', left='+left);
        this.popup_completed = false;

        // If user's explorer accepts postmessage and we have both
        // callbacks and urls, discard the urls
        if(hasPostMessage()){
            if(typeof vars.onSuccess == "function"){
                this.params.successPage = "";
            }
            if(typeof vars.onError == "function"){
                this.params.errorPage = "";
            }
            if(typeof vars.onPending == "function"){
                this.params.pendingPage = "";
            }
        }
        this.params.method = 'iframe';
        var iframe = createElement('<iframe allowtransparency="true" src="'+ this.gateway_url + '?' + build_query(this.params) +'" style="width: 100%; height: 100%; left: 0px; top: 0px; right: 0px; bottom: 0px; z-index: 9999; display: block; overflow-x; hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: fixed; background: transparent" frameborder="0" name="bw_popup" id="bw_popup"></iframe>');
        document.body.appendChild(iframe);
        this.popup = document.getElementById("bw_popup");

        this.setSocket();
        var self = this;
        var inter = window.setInterval(function() {
            try{
                if (self.popup.contentWindow.document.readyState === "complete") {
                    window.clearInterval(inter);

                    if(typeof obj != "undefined"){
                        if(obj.tagName.toLowerCase() == "a")
                            obj.innerHTML = obj.rel;
                        else
                            obj.value = obj.rel;

                    }
                }
            } catch(e) {
                if(typeof obj != "undefined"){
                    if(obj.tagName.toLowerCase() == "a")
                        obj.innerHTML = obj.rel;
                    else
                        obj.value = obj.rel;

                }
            }

        }, 100);
    };

    this.closeIframe = function(){
        this.popup.parentNode.removeChild(this.popup);
        this.onPopupClose();
    }

    /**
     * Se ejecuta cuando se cierra el popup
     */
    this.onPopupClose = function(){
        if(!this.popup_completed){
            if(typeof vars.onCancel == "function")
                vars.onCancel.call(this);
        }

        if(typeof(vars.onClose) == "function")
            vars.onClose.call(this);
        this.popup = null;
    }

    /**
     * Se ejecuta esta funcion cuando el pago fue completado y procesado
     * completamente
     */
    this.onPaymentOk = function(){
        this.popup_completed = true;
        if(typeof(vars.onSuccess) == "function"){
            vars.onSuccess.call(this);
        }else{
            if(this.params.successPage != ""){
                window.location.href = this.params.successPage;
            }
        }

    }

    /**
     * Se ejecuta esta function cuando el pago no pudo ser completado
     */
    this.onPaymentError = function(){
        this.popup_completed = true;
        if(typeof(vars.onError) == "function"){
            vars.onError.call(this);
        }else{
            if(this.params.errorPage != ""){
                window.location.href = this.params.errorPage;
            }
        }
    }

    /**
     * Se ejecuta esta function cuando el pago queda pendiente de pago
     * como es el caso de OXXO o deposito referenciado
     */
    this.onPaymentPending = function(){
        this.popup_completed = true;
        if(typeof(vars.onPending) == "function"){
            vars.onPending.call(this);
        }else{
            if(this.params.pendingPage != ""){
                window.location.href = this.params.pendingPage;
            }
        }
    }

    /**
     * Se ejecuta esta function cuando el pago queda pendiente
     * porque necesita validaciones extra de seguridad
     */
    this.onPaymentChallenge = function(){
        this.popup_completed = true;
        if(typeof(vars.onChallenge) == "function"){
            vars.onChallenge.call(this);
        }else{
            if(this.params.challengePage != ""){
                window.location.href = this.params.challengePage;
            }
        }
    }

    /**
     * Para sustituir los valores por defecto enviados en la funcion
     * constructora
     * @param params
     * @return {*}
     */
    this.setParams = function(params){
        for(var i in params)
            vars[i] = params[i];
        this.construct();
        return this;
    }

    /**
     * Crea un elemento HTML
     * @access private
     * @param htmlStr
     * @return {DocumentFragment}
     */
    function createElement(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    /**
     * Crea un http query string con base en un objeto
     * @access private
     * @param obj
     * @param num_prefix
     * @param temp_key
     * @return {String}
     */
    function build_query(obj, num_prefix, temp_key) {
        var output_string = []

        for(var key in obj){
        //Object.keys(obj).forEach(function (val) {
            var val = key;
            //var key = val;
            num_prefix && !isNaN(key) ? key = num_prefix + key : ''
            var key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
            temp_key ? key = temp_key + '[' + key + ']' : ''
            if(typeof obj[val] === 'function')
                return false;
            if (typeof obj[val] === 'object') {
                var query = build_query(obj[val], null, key)
                output_string.push(query)
            } else {
                if(typeof obj[val] != "undefined"){
                    var value = (isNaN(obj[val])) ? encodeURIComponent(obj[val].replace(/[!'()*]/g, escape)) : obj[val];
                    output_string.push(key + '=' + value)
                }

            }
        }//)

        return output_string.join('&')
    }

    function hasPostMessage() {
        if(typeof window.postMessage === "undefined")
            return false;

        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer'){
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        if(rv < 9 && rv > 0)
            return false;

        return true;
    }

    this.setSocket = function(){
        var self = this;
        try{
            var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
            var eventer = window[eventMethod];
            var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

            eventer(messageEvent, function(e){
                try{
                    var data = JSON.parse(e.data);
                } catch (e){
                    try{
                        var data = eval(' '+ e.data +' ');
                    } catch (ex){
                        var data = { event: e.data};
                    }

                }

                // TODO e.data viene vacio en IE9... hay que checar
                switch(data.event){
                    case 'payment_success':
                        self.onPaymentOk(data)
                        break;
                    case 'payment_pending':
                        self.onPaymentPending(data);
                        break;
                    case 'payment_error':
                        self.onPaymentError(data);
                        break;
                    case 'payment_challenge':
                        self.onPaymentChallenge(data);
                        break;
                    case 'close_iframe':
                        self.closeIframe(data);
                        break;
                }
            }, false);
        }catch(e){
            // IE7
            //console.log("No pudo crear event listener");
        }
    }

    /**
     * Funcion constructora
     * @access private
     */
    this.construct = function(){
        if(typeof vars.cust == "undefined")
            vars.cust = {};
        if(typeof vars.ship == "undefined")
            vars.ship = {};

        this.params = {
            user: vars.user,
            title: vars.title,
            reference: vars.reference,
            customer: {
                fname: vars.cust.fname,
                lname: vars.cust.lname,
                mname: vars.cust.mname,
                email: vars.cust.email,
                addr: vars.cust.addr,
                zip: vars.cust.zip,
                phone: vars.cust.phone,
                city: vars.cust.city,
                country: vars.cust.country,
                state: vars.cust.state
            },
            shipping: {
                addr: vars.ship.addr,
                city: vars.ship.city,
                zip: vars.ship.zip,
                country: vars.ship.country,
                state: vars.ship.state
            },
            successPage: (typeof vars.successPage == "undefined" ? '' : vars.successPage),
            notifyUrl: (typeof vars.notifyUrl == "undefined" ? '' : vars.notifyUrl),
            errorPage: (typeof vars.errorPage == "undefined" ? '' : vars.errorPage),
            pendingPage: (typeof vars.pendingPage == "undefined" ? '' : vars.pendingPage),
            currency: (typeof vars.currency == "undefined" || !vars.currency ? 'MXN' : vars.currency),
            showShipping: (typeof vars.showShipping == "undefined" ? true : vars.showShipping),
            sandbox: (typeof vars.sandbox == "undefined" ? false : vars.sandbox),
            total: parseFloat(vars.total),
            items: vars.items,
            paymentOptions: (typeof vars.paymentOptions == "undefined" || !vars.paymentOptions ? 'all' : vars.paymentOptions), // visa,mastercard,amex,oxxo
            reviewOrder: vars.reviewOrder,
            months: (typeof vars.months == "object") ? vars.months : [],
            // Detectamos si el cliente tiene soporte para postmessage
            postmessage: hasPostMessage(),
            loadingText: vars.loadingText
        };

        //console.log(params);
        // Load the remote js
        /*var style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = this.gateway_url + "css/client.css";
        document.getElementsByTagName('head')[0].appendChild( style );*/

    }

    this.construct();
};

var Bw_createElement = function(htmlStr){
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
};

var BwCheckout = [];
var SW = null;
var scripts = document.getElementsByTagName("script");

for(var i = 0, l = scripts.length; i < l; i++){
    if(scripts[i].src === 'https://test.banwire.com/sw/checkout.js'){
        if(scripts[i].getAttribute('data-user') == null || scripts[i].getAttribute('data-user') == undefined)
            continue;


        var params = {};
        var btn_caption = "";
        params.cust = {};
        params.ship = {};
        if(scripts[i].getAttribute('data-user') != null)
            params.user = scripts[i].getAttribute('data-user');
        if(scripts[i].getAttribute('data-title') != null)
            params.title = scripts[i].getAttribute('data-title');
        if(scripts[i].getAttribute('data-concept') != null)
            params.concept = scripts[i].getAttribute('data-concept');
        if(scripts[i].getAttribute('data-reference') != null)
            params.reference = scripts[i].getAttribute('data-reference');
        if(scripts[i].getAttribute('data-total') != null)
            params.total = parseFloat(scripts[i].getAttribute('data-total'));
        if(scripts[i].getAttribute('data-payment-options') != null)
            params.paymentOptions = scripts[i].getAttribute('data-payment-options') == "all" ? "all" :  scripts[i].getAttribute('data-payment-options');
        if(scripts[i].getAttribute('data-review-order') != null)
            params.reviewOrder = scripts[i].getAttribute('data-review-order') == "true";
        if(scripts[i].getAttribute('data-success-page') != null)
            params.successPage = scripts[i].getAttribute('data-success-page');
        if(scripts[i].getAttribute('data-notify-url') != null)
            params.notifyUrl = scripts[i].getAttribute('data-notify-url');
        if(scripts[i].getAttribute('data-error-page') != null)
            params.errorPage = scripts[i].getAttribute('data-error-page');
        if(scripts[i].getAttribute('data-months') != null)
            params.months = scripts[i].getAttribute('data-months').split(",");
        if(scripts[i].getAttribute('data-button-class') != null)
            var btn_class = scripts[i].getAttribute('data-button-class');
        if(scripts[i].getAttribute('data-button-caption') != null)
            btn_caption = scripts[i].getAttribute('data-button-caption');
        // Customer
        if(scripts[i].getAttribute('data-cust-fname') != null)
            params.cust.fname = scripts[i].getAttribute('data-cust-fname');
        if(scripts[i].getAttribute('data-cust-mname') != null)
            params.cust.mname = scripts[i].getAttribute('data-cust-mname');
        if(scripts[i].getAttribute('data-cust-lname') != null)
            params.cust.lname = scripts[i].getAttribute('data-cust-lname');
        if(scripts[i].getAttribute('data-cust-email') != null)
            params.cust.email = scripts[i].getAttribute('data-cust-email');
        if(scripts[i].getAttribute('data-cust-phone') != null)
            params.cust.phone = scripts[i].getAttribute('data-cust-phone');
        if(scripts[i].getAttribute('data-cust-addr') != null)
            params.cust.addr = scripts[i].getAttribute('data-cust-addr');
        if(scripts[i].getAttribute('data-cust-zip') != null)
            params.cust.zip = scripts[i].getAttribute('data-cust-zip');
        if(scripts[i].getAttribute('data-cust-city') != null)
            params.cust.city = scripts[i].getAttribute('data-cust-city');
        if(scripts[i].getAttribute('data-cust-country') != null)
            params.cust.country = scripts[i].getAttribute('data-cust-country');
        if(scripts[i].getAttribute('data-cust-state') != null)
            params.cust.state = scripts[i].getAttribute('data-cust-state');
        // Shipping
        if(scripts[i].getAttribute('data-ship-addr') != null)
            params.ship.addr = scripts[i].getAttribute('data-ship-addr');
        if(scripts[i].getAttribute('data-ship-zip') != null)
            params.ship.zip = scripts[i].getAttribute('data-ship-zip');
        if(scripts[i].getAttribute('data-ship-city') != null)
            params.ship.city = scripts[i].getAttribute('data-ship-city');
        if(scripts[i].getAttribute('data-ship-country') != null)
            params.ship.country = scripts[i].getAttribute('data-ship-country');
        if(scripts[i].getAttribute('data-ship-state') != null)
            params.ship.state = scripts[i].getAttribute('data-ship-state');
        if(scripts[i].getAttribute('data-loading-text') != null)
            params.loadingText = scripts[i].getAttribute('data-loading-text');
        if(scripts[i].getAttribute('data-show-shipping') != null)
            params.showShipping = scripts[i].getAttribute('data-show-shipping') == "false" ? false : true;
        if(scripts[i].getAttribute('data-sandbox') != null)
            params.sandbox = scripts[i].getAttribute('data-sandbox') == "true" ? true : false;

        var j = 1;
        while(true){
            if(scripts[i].getAttribute('data-item-' + j + '-name') != null){
                if(typeof params.items == "undefined")
                    params.items = [];
                params.items.push({
                    name: scripts[i].getAttribute('data-item-' + j + '-name'),
                    unitPrice: parseFloat(scripts[i].getAttribute('data-item-' + j + '-price')),
                    qty: (scripts[i].getAttribute('data-item-' + j + '-qty') == null ? 1 : parseInt(scripts[i].getAttribute('data-item-' + j + '-qty')))
                });

            } else {
                break;
            }
            j++;
        }


        BwCheckout[i] = new BwGateway(params);
        if(btn_caption != ""){
            var btn = Bw_createElement('<a href="#" onclick="BwCheckout['+ i +'].pay(this); return false" class="'+ btn_class +'" id="bw_pay_btn">'+ btn_caption +'</a>');
            scripts[i].parentNode.insertBefore(btn, scripts[i]);
        }

        if(SW == null){
            SW = BwCheckout[i];
            //console.log(SW);
        }

    }

}



