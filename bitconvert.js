var bitconvert = (function(){
  var options = {
    default_currency: 'USD',
    class_element: 'amount'
  }

  var exchange_rate = 0;
  var original_element_values = [];
  var current_currency = options.default_currency;

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = "."+ options.class_element+"{ border: 1px solid #aaa; background-color: #eee; padding: 0px 6px; }";
  document.body.appendChild(css);

  function toggleConversion(){
    if(exchange_rate == 0){ //If the exchange rate has not been initialized. Get latest exchangre rate from MtGox.
      var elements = document.getElementsByClassName(options.class_element);
      var i=0;
      for(; i<elements.length; i++){
        var element_value = elements[i].innerHTML;
        element_value = element_value.replace(/[A-Za-z$-]/g, '');
        original_element_values[i] = parseFloat(element_value); //Store original values for easy toggling.
      }
      
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
          var json = JSON.parse(xhr.responseText);
          exchange_rate = json.data.last.value;
          render();
        }
      }
      xhr.open('GET', 'http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast', true);
      xhr.send();
    }
    else{
      render();
    }
  }

  function render(){
    var elements = document.getElementsByClassName(options.class_element);
    var i=0;
    for(; i<elements.length; i++){
      if(current_currency == 'BTC'){ //If in Bitcoin convert to USD
        if(options.default_currency == 'BTC') elements[i].innerHTML = "$ "+(original_element_values[i]*exchange_rate).toFixed(2);
        else elements[i].innerHTML = "$ "+ original_element_values[i];
      }
      else{ //Else it's in USD then convert to BTC
        if(options.default_currency == 'USD') elements[i].innerHTML = (original_element_values[i]/exchange_rate).toFixed(8) + " BTC";
        else elements[i].innerHTML = original_element_values[i] + " BTC";
      }
    }
    current_currency = current_currency == 'USD' ? "BTC" : "USD"; //Toggle current currency.
  }

  return {
    toggleConversion: toggleConversion
  }
})();