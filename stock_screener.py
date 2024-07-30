import requests
import pandas as pd

# 設置API Key和基本URL
API_KEY = 'B8SNVBIKV7RX32M'
BASE_URL = 'https://www.alphavantage.co/query'

# 定義函數來獲取股票數據
def get_stock_data(symbol, interval='daily', outputsize='compact'):
    function = 'TIME_SERIES_DAILY'
    if interval == 'intraday':
        function = 'TIME_SERIES_INTRADAY'
        interval = '5min'  # 可以設置其他間隔：1min, 5min, 15min, 30min, 60min
    
    params = {
        'function': function,
        'symbol': symbol,
        'apikey': API_KEY,
        'datatype': 'json',
        'outputsize': outputsize
    }
    if interval == 'intraday':
        params['interval'] = interval

    response = requests.get(BASE_URL, params=params)
    data = response.json()
    
    if 'Time Series (Daily)' in data:
        time_series = data['Time Series (Daily)']
    elif 'Time Series (5min)' in data:
        time_series = data['Time Series (5min)']
    else:
        print('Error fetching data.')
        return None

    df = pd.DataFrame.from_dict(time_series, orient='index')
    df = df.rename(columns={
        '1. open': 'Open',
        '2. high': 'High',
        '3. low': 'Low',
        '4. close': 'Close',
        '5. volume': 'Volume'
    })
    df.index = pd.to_datetime(df.index)
    df = df.sort_index()
    return df

# 獲取特定股票的數據，例如蘋果公司 (AAPL)
symbol = 'AAPL'
stock_data = get_stock_data(symbol)

# 顯示數據
print(stock_data.head())
