# pip install beautifulsoup4
from bs4 import BeautifulSoup
#会读取调用该脚本的文件路径
file = open('./controllers/holiday/holidayData/sduview.html',encoding='utf-8' )
soup = BeautifulSoup(file, features="html.parser")

tr_arr = soup.table.find_all("tr")

list = []

for tr in tr_arr:
    td_arr = tr.find_all("td")
    if(len(td_arr) != 0):
        des = ''
        if td_arr[4].string is None:
            des = td_arr[3].string
        else:
            des = td_arr[3].string +" " + td_arr[4].string
        data = {
            "id": 1,
            "title": td_arr[2].string,
            "image": "a URL",
            "start_date": td_arr[1].string,
            "end_date": td_arr[1].string,
            "catagory": "holiday",
            "summary": des
        }
        list.append(data)
print(list)

    