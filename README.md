Bitconvert.js
=========

Bitconvert.js converts any value within a user-specified class to from and Bitcoin to USD. It takes the latest value from MtGox as the exchange rate.

##Usage
Link to the javascript file. The default class name is 'amount' and converts from USD to BTC. Remember to add a button that toggles the conversion.

You have to wrap the amount within a class element. The default is called 'amount'. It automatically detects the number and converts accordingly.

    <script src="bitconvert.js"></script>
    <span class="amount">$ 5.24</span>
    <span class="amount">$ 1</span>
    <button onclick="toggleConversion()">Toggle</button>

##Options
You can change the default values by editing the javascript file. The options are at the top of the file. These are the defaults.

    var options = {
      default_currency: 'USD',
      class_element: 'amount'
    }

##Styling
You can also change the styling by editing the javascript file. It works on normal CSS rules. The default for Bitconvert is shown below. Change it to anything you'd like.

    css.innerHTML = "."+ options.class_element+"{ border: 1px solid #aaa; background-color: #eee; padding: 0px 6px; }";

License
-

MIT
    