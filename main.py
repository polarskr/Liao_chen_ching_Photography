import yfinance as yf
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import schedule
import requests
from bs4 import BeautifulSoup

def fetch_bdi_from_bloomberg():
    url = "https://tradingeconomics.com/commodity/baltic"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        current_value_element = soup.find('span', class_='priceText__1853e8a5')
        current_value = current_value_element.text.strip() if current_value_element else 'N/A'
        
        change_element = soup.find('span', class_='changeAbsolute__395487f7')
        change_percent_element = soup.find('span', class_='changePercent__2d7dc0d2')
        
        change = change_element.text.strip() if change_element else 'N/A'
        change_percent = change_percent_element.text.strip() if change_percent_element else 'N/A'
        
        return {
            '當前值': current_value,
            '變化': change,
            '變化百分比': change_percent
        }
    except Exception as e:
        print(f"Error fetching BDI data: {e}")
        return {'當前值': 'N/A', '變化': 'N/A', '變化百分比': 'N/A'}

def fetch_financial_data():
    tickers = {
        '滬深300指數': '000300.SS',
        '法蘭克福指數': '^GDAXI',
        '英國富時指數': '^FTSE',
        '歐元匯率': 'EURUSD=X',
        '日圓匯率': 'JPY=X',
        '原油價格': 'CL=F',
        '黃金價格': 'GC=F',
        '債券指數': 'AGG',
        'VIX指數': '^VIX',
        '標普500指數': '^GSPC'
    }

    data = {}
    for name, ticker in tickers.items():
        try:
            df = yf.download(ticker, period='2d')
            if len(df) >= 2:
                today = df.iloc[-1]
                yesterday = df.iloc[-2]
                current = round(today['Close'], 2)
                change = round(current - yesterday['Close'], 2)
                change_percent = round((change / yesterday['Close']) * 100, 2)
                direction = "上漲" if change > 0 else "下跌"
                data[name] = {
                    '當前值': current,
                    '變化': change,
                    '變化百分比': f"{change_percent}% ({direction})"
                }
            else:
                data[name] = {'當前值': current, '變化': 'N/A', '變化百分比': 'N/A'}
        except Exception as e:
            print(f"Error fetching data for {name}: {e}")
            data[name] = {'當前值': 'N/A', '變化': 'N/A', '變化百分比': 'N/A'}

    data['波羅的海乾散貨運價指數'] = fetch_bdi_from_bloomberg()

    return data

def generate_html(data):
    with open('templates/template.html', 'r', encoding='utf-8') as file:
        template = file.read()

    rows = ''
    for key, value in data.items():
        rows += f'''
        <tr>
            <td>{key}</td>
            <td>{value['當前值']}</td>
            <td>{value['變化']}</td>
            <td>{value['變化百分比']}</td>
        </tr>
        '''

    html_content = template.replace('{{data_rows}}', rows)

    with open('financial_data.html', 'w', encoding='utf-8') as file:
        file.write(html_content)
    print("HTML content generated successfully.")

def update_data():
    print("Updating data...")
    data = fetch_financial_data()
    generate_html(data)
    print("Data updated at:", time.strftime("%Y-%m-%d %H:%M:%S"))

def main():
    update_data()
    schedule.every(60).minutes.do(update_data)

    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    main()
