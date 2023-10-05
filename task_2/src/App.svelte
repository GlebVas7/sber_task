<script>
  let amount = 1;
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let exchangeRate = 0.0;
  let result = 0.0;

  async function fetchExchangeRate() {
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      exchangeRate = data.rates[toCurrency];
      result = amount * exchangeRate;
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
    }
  }

  function updateResult() {
    fetchExchangeRate();
  }

  $: {
    updateResult();
  }
</script>

<div class = "main">
  <p class = "logo">Конвертер валют</p>
  <div class = "one">
    <label>Из валюты:</label>
    <select bind:value={fromCurrency} on:change={updateResult}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="RUB">RUB</option>
    </select>
  </div>
  <div class = "two">
    <label>В:</label>
    <select bind:value={toCurrency} on:change={updateResult}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="RUB">RUB</option>
    </select>
  </div>
  <div>
    <label>Сумма:</label>
    <input type="number" step="1" bind:value={amount} on:input={updateResult} />
  </div>
  <div class = "res">
    <p class = "res_p">Результат: {result.toFixed(2)}</p>
  </div>
</div>