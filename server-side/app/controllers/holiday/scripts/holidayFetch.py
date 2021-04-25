import urllib.request
import json
import time
 
def getHtml(url):
    html = urllib.request.urlopen(url).read()
    return html
 
def saveHtml(file_name, file_content):
    # 注意windows文件命名的禁用符，比如 /
    with open('./controllers/holiday/holidayData/' + file_name.replace('/', '_') + ".html", "wb") as f:
        # 写文件用bytes而不是str，所以要转码
        f.write(file_content)

with open('./controllers/holiday/scripts/address.json', 'r', encoding='utf8') as f:
    json_data = json.load(f)
    for record in json_data:
        url = record['link']
        html = getHtml(url)
        saveHtml(record['country'], html)
        time.sleep(5)
 
print ("complete")
#aurl = "https://www.officeholidays.com/countries/australia"
#html = getHtml(aurl)
#saveHtml("sduview", html)
 
#print("下载成功")