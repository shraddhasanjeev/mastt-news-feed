import urllib.request
import json
import time
from bs4 import BeautifulSoup

list = []
with open('./app/controllers/holiday/scripts/address.json', 'r', encoding='utf8') as f:
    json_data = json.load(f)
    for record in json_data:
        url = record['link']
        country = record['country'].replace('\'', '')
        file = urllib.request.urlopen(url).read()
        soup = BeautifulSoup(file, features="html.parser")

        tr_arr = soup.table.find_all("tr")
        for tr in tr_arr:
            td_arr = tr.find_all("td")
            if(len(td_arr) != 0):
                des = ''
                if td_arr[4].string is None:
                    des = td_arr[3].string
                else:
                    des = td_arr[3].string +" " + td_arr[4].string
                    data = (country,td_arr[2].string.replace('\'', '').replace(',', ''),td_arr[1].string.replace('\'', '').replace(',', ''),des.replace('\'', '').replace(',', ''))
                    list.append(data)
        time.sleep(5)
 
print(list)