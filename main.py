import requests
from bs4 import BeautifulSoup
import pandas as pd
import yfinance as yf
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def fetch_bdi_with_selenium():
    # 设置Chrome选项
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 无头模式
    chrome_options.add_argument("--disable-gpu")

    # 设置Chrome驱动程序路径
    service = Service('/Users/liaochenqing/Downloads/chromedriver-mac-arm64/chromedriver')  # 请替换为实际的ChromeDriver路径

    # 初始化WebDriver
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 打开目标网页
    driver.get('https://tradingeconomics.com/commodity/baltic')

    # 等待页面加载并寻找波罗的海干散货运价指数元素
    try:
        bdi_element = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'span#p'))
        )
        bdi = bdi_element.text
    except Exception as e:
        print(f"Error: {e}")
        bdi = 'N/A'

    # 关闭浏览器
    driver.quit()
    
    return bdi

def fetch_financial_data():
    hs300 = round(yf.download('000300.SS', period='1d')['Close'].iloc[-1], 2)
    dax = round(yf.download('^GDAXI', period='1d')['Close'].iloc[-1], 2)
    ftse = round(yf.download('^FTSE', period='1d')['Close'].iloc[-1], 2)
    eur_usd = round(yf.download('EURUSD=X', period='1d')['Close'].iloc[-1], 2)
    jpy_usd = round(yf.download('JPY=X', period='1d')['Close'].iloc[-1], 2)
    crude_oil = round(yf.download('CL=F', period='1d')['Close'].iloc[-1], 2)
    gold = round(yf.download('GC=F', period='1d')['Close'].iloc[-1], 2)
    bond_index = round(yf.download('AGG', period='1d')['Close'].iloc[-1], 2)

    # 使用Selenium抓取波羅的海乾散貨運價指數
    bdi = fetch_bdi_with_selenium()

    vix = round(yf.download('^VIX', period='1d')['Close'].iloc[-1], 2)
    sp500 = round(yf.download('^GSPC', period='1d')['Close'].iloc[-1], 2)

    data = {
        '滬深300指數': hs300,
        '法蘭克福指數': dax,
        '英國富時指數': ftse,
        '歐元匯率': eur_usd,
        '日圓匯率': jpy_usd,
        '原油價格': crude_oil,
        '黃金價格': gold,
        '債券指數': bond_index,
        '波羅的海乾散貨運價指數': bdi,
        'VIX指數': vix,
        '標普500指數': sp500
    }

    return data

def generate_html(data):
    with open('templates/template.html', 'r', encoding='utf-8') as file:
        template = file.read()

    rows = ''
    for key, value in data.items():
        rows += f'<tr><td>{key}</td><td>{value:.2f}</td></tr>\n' if isinstance(value, (float, int)) else f'<tr><td>{key}</td><td>{value}</td></tr>\n'

    html_content = template.replace('{{data_rows}}', rows)

    with open('financial_data.html', 'w', encoding='utf-8') as file:
        file.write(html_content)
    print("HTML content generated successfully.")

def main():
    data = fetch_financial_data()
    generate_html(data)

if __name__ == "__main__":
    main()
