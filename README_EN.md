# BanWire Javascript SDK

For the Spanish version of this documentation, see [README.md](README.md).

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
  data-international="false"
></script>
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
  data-loading-text="Wait..."
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
  data-item-2-qty="3"
>
  /
</script>
```

### Parameter description

| Parameter            | Description                                                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-sandbox         | TRUE / FALSE Activate test environment                                                                                                                   |
| data-user            | Username                                                                                                                                                 |
| data-title           | Business name                                                                                                                                            |
| data-total           | Amount payable                                                                                                                                           |
| data-payment-options | Payment options (all:todos, visa, amex, oxxo, spei)                                                                                                      |
| data-review-order    | TRUE / FALSE Activate purchase summary                                                                                                                   |
| data-success-page    | Merchant successful payment information page                                                                                                             |
| data-error-page      | Trade error page                                                                                                                                         |
| data-pending-page    | Merchant's pending payment page (applies for payments in OXXO and SPEIFAST)                                                                              |
| data-notify-url      | URL of the merchant where BanWire notifies successful payments                                                                                           |
| data-concept         | Payment concept                                                                                                                                          |
| data-international   | Special configuration for international payments (second last name optional)                                                                             |
| data-secure-3d       | Enable 3D Secure validation for purchase protection (Banorte - Payworks Affiliation)                                                                     |
| data-reference       | Merchant Order ID                                                                                                                                        |
| data-months          | "3,6,9,12" Payment in months                                                                                                                             |
| data-currency        | Currency: Mexican peso                                                                                                                                   |
| data-exchange-rate   | Exchange rate defined by the business (In case you select a currency that requires showing the exchange rate to MXN. Informational only). Example: 15.00 |
| data-cust-fname      | Name of the buyer                                                                                                                                        |
| data-cust-mname      | Buyer's paternal surname                                                                                                                                 |
| data-cust-lname      | Buyer's mother's name                                                                                                                                    |
| data-cust-email      | Buyer email                                                                                                                                              |
| data-cust-phone      | Buyer's telephone number (10 digits)                                                                                                                     |
| data-cust-addr       | Purchaser's address                                                                                                                                      |
| data-cust-zip        | Buyer's zip code                                                                                                                                         |
| data-cust-city       | Buyer's city                                                                                                                                             |
| data-cust-country    | Buyer's country (3 digits according to ISO format)                                                                                                       |
| data-cust-state      | Buyer's status (2 digits according to ISO format)                                                                                                        |
| data-ship-addr       | Shipping Address                                                                                                                                         |
| data-ship-zip        | Shipping address zip code                                                                                                                                |
| data-ship-city       | Shipping city                                                                                                                                            |
| data-ship-country    | Shipping country (3 digits according to ISO format)                                                                                                      |
| data-ship-state      | Shipping status (2 digits according to ISO format)                                                                                                       |
| data-time            | Automatic window closing. By default it is undefined and will not close the window. (value is in seconds. Minimum value required 60 seconds.)            |
| data-item-1-name     | Product name one                                                                                                                                         |
| data-item-1-price    | Price of product one                                                                                                                                     |
| data-item-1-qty      | Quantity of product(s) one                                                                                                                               |

### Integration for payments with represented cardholders

For payments where the cardholder is represented by a third party in possession of the cardholder's data and confidential information, the following parameter must be added.

```html
data-cust-represent="true"
```

### Integration for recurring payments

Subscriptions to recurring payments can be created where the client can be made a certain number of fixed payments during a certain period of time. The following variables must be added:

```html
data-recurring="true" data-recurring-interval="month" data-recurring-limit="10"
data-recurring-start="2014-08-21" data-recurring-total="100"
```

Where the variable data-recurring-interval is the interval in which the payment will be collected and can be: "month" (monthly), "week" (weekly), "6months" (semi-annually), "annual" (annually) , "3months" (quarterly)
The data-recurring-limit variable determines the number of payments to execute before the subscription ends. If this variable is not defined, the subscription will never expire.
If data-recurring-start is not defined, the initial payment will be made immediately, otherwise the first payment will be made on the date specified in this variable in YYYY-MM-DD format.
If the data-recurring-total variable is not established, the amount of each payment will be the one specified in data-total. In the event that a first immediate payment needs to be made with an amount different from subsequent payments, the initial amount to be paid must be entered in data-total and subsequent payments will be for the amount established in data-recurring-total

## Integration using Javascript

A more customizable integration is possible using Javascript directly.
To do this, you must first include the JS file in the HEAD or BODY of the page:

```html
<script
  type="text/javascript"
  src="https://sw.banwire.com/checkout.js"
></script>
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

| Value | Description                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------ |
| MXN   | Mexican peso (Default)                                                                                       |
| USD   | American dollar (For informational purposes only. The total to be paid will be shown in Mexican pesos [MXN]) |
| EUR   | Euro (For informational purposes only. The total to be paid will be shown in Mexican pesos [MXN])            |

# Responses and notifications

The system will issue a series of notifications in different events of the process that will be detailed below.

## Card notifications

### Payment successful

Every time a successful payment is made, the system will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable          | Value                   | Description                                                                        |
| ----------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| events            | cards                   | Notification event type                                                            |
| status            | paid                    | Transaction status                                                                 |
| auth_code         | Alphanumeric            | Unique transaction authorization code                                              |
| reference         | The one originally sent | The payment reference initially sent by data-reference                             |
| id                | Alphanumeric            | Payment identifier within Banwire                                                  |
| total             | Decimal                 | Total paid                                                                         |
| hash              | sha1                    | Security hash\*                                                                    |
| plan              | Arrangement             | Variable set \*\*\*\*                                                              |
| plan[type]        | Alphanumeric            | Plan Type \*\*\*\*                                                                 |
| plan[no_payments] | Alphanumeric            | Number of payments (Example: in case of type 'no_interest', 6 = 6 Months) \*\*\*\* |

\*\*\*\* The variable will be added to the notification only if a payment plan (monthly payments) has been selected.

#### Types of plans

| Type        | Description             |
| ----------- | ----------------------- |
| no_interest | Months without interest |

###Challenge\*\*\*
Each time a payment is submitted for review, the system will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable          | Value                   | Description                                                                        |
| ----------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| events            | cards                   | Notification event type                                                            |
| status            | challenges              | Transaction status                                                                 |
| reference         | The one originally sent | The payment reference initially sent by data-reference                             |
| id                | Alphanumeric            | Payment identifier within Banwire                                                  |
| total             | Decimal                 | Total paid                                                                         |
| hash              | sha1                    | Security hash\*                                                                    |
| plan              | Arrangement             | Variable set \*\*\*\*                                                              |
| plan[type]        | Alphanumeric            | Plan type [no_interest] \*\*\*\*                                                   |
| plan[no_payments] | Alphanumeric            | Number of payments (Example: in case of type 'no_interest', 6 = 6 Months) \*\*\*\* |

## OXXO Notifications

### Pending payment \*\*\*

Every time a payment request is made in OXXO, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | oxxo                    | Notification event type                                |
| status    | pending                 | Transaction status                                     |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

### Payment successful

Every time a payment is received via OXXO, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | oxxo                    | Notification event type                                |
| status    | paid                    | Transaction status                                     |
| auth_code | Alphanumeric            | Payment barcode                                        |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

## Paycash Notifications

### Pending payment \*\*\*

Every time a payment request is made in convenience stores with the Paycash system, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | paycash                 | Notification event type                                |
| status    | pending                 | Transaction status                                     |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

### Payment successful

Every time a payment is received via Paycash, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | paycash                 | Notification event type                                |
| status    | paid                    | Transaction status                                     |
| auth_code | Alphanumeric            | Payment barcode                                        |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

## SPEIFAST notifications

### Earring \*\*\*

Every time a payment request is made in SPEIFAST, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | speifast                | Notification event type                                |
| status    | pending                 | Transaction status                                     |
| type      | sent                    | Transaction movement type                              |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

### Pass

Every time a partial payment is received via SPEIFAST and the full amount is not covered, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | speifast                | Notification event type                                |
| status    | pending                 | Transaction status                                     |
| type      | partial_payment         | Transaction movement type                              |
| auth_code | Alphanumeric            | SPEI tracking code                                     |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

### Payment successful

Every time a payment is received via SPEIFAST and if the full amount is covered, the system will send a notification via HTTP POST to the URL established in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable  | Value                   | Description                                            |
| --------- | ----------------------- | ------------------------------------------------------ |
| events    | speifast                | Notification event type                                |
| status    | paid                    | Transaction status                                     |
| type      | completed               | Transaction movement type                              |
| auth_code | Alphanumeric            | SPEI tracking code                                     |
| reference | The one originally sent | The payment reference initially sent by data-reference |
| id        | Alphanumeric            | Payment identifier within Banwire                      |
| hash      | sha1                    | Security hash\*                                        |
| total     | Decimal                 | Total paid                                             |

## Recurring card payment notifications

### Payment successful

Each time a successful recurring payment is made, Banwire will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable   | Value                   | Description                                            |
| ---------- | ----------------------- | ------------------------------------------------------ |
| events     | regular                 | Notification event type                                |
| status     | paid                    | Transaction status                                     |
| auth_code  | Alphanumeric            | Unique transaction authorization code                  |
| reference  | The one originally sent | The payment reference initially sent by data-reference |
| id         | Alphanumeric            | Payment identifier within Banwire                      |
| hash       | sha1                    | Security hash\*                                        |
| total      | Decimal                 | Total paid                                             |
| token      | Alphanumeric            | Subscription identifier token                          |
| cancel_url | URL                     | Unsubscribe URL                                        |

### Payment Declined \*\*\*

Each time a declined recurring payment is made, Banwire will send a notification via HTTP POST to the URL set in data-notify-url (HTML) or notifyUrl (Javascript) with the following variables:

| Variable   | Value                   | Description                                            |
| ---------- | ----------------------- | ------------------------------------------------------ |
| events     | regular                 | Notification event type                                |
| status     | denied                  | Transaction status                                     |
| reference  | The one originally sent | The payment reference initially sent by data-reference |
| id         | Alphanumeric            | Payment identifier within Banwire                      |
| hash       | sha1                    | Security hash\*                                        |
| total      | Decimal                 | Total paid                                             |
| token      | Alphanumeric            | Subscription identifier token                          |
| cancel_url | URL                     | Unsubscribe URL                                        |

\*\*\*At the moment it is only available for some users.

## Cancel recurring payment subscription

To cancel a recurring payment subscription, you must request it directly to the contact support@banwire.com, since the cancellation service is under maintenance.

## Secure Window Testing

To carry out tests with Secure Window, you must activate the sandbox environment and use the test user 'testsbw', it is possible to simulate the successful payment with the test card.

### Test card

| Data            | Worth            |
| --------------- | ---------------- |
| Cardholder name | Testsbw          |
| Card Number     | 5134422031476272 |
| Card type       | MasterCard       |
| Expiration date | 12/21            |
| Security code   | 162              |

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

| Parameter value id | SECRET API    | Hash parameter value                                             |
| ------------------ | ------------- | ---------------------------------------------------------------- |
| 14                 | aBc0123456789 | 484a265cc951ab1ff646506fe4211ba6b3e9e64887968a5d9db1675c624baf99 |

Example in PHP:

```html
$hash = hash_hmac('sha256','14','aBc0123456789');
```
