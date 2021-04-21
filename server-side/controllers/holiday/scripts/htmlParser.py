# pip install beautifulsoup4
from bs4 import BeautifulSoup
import json
#会读取调用该脚本的文件路径

list = []
with open('./controllers/holiday/scripts/address.json', 'r', encoding='utf8') as f:
    json_data = json.load(f)
    for record in json_data:
        country = record['country']
        file = open('./controllers/holiday/holidayData/' + country +'.html',encoding='utf-8' )
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
                    data = (country,td_arr[2].string,td_arr[1].string,des)
                    for element in data:
                        element.replace(",", " ")
                    list.append(data)

print(list)





    