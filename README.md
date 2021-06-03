# mastt-news-feed
Remote Working Dashboard - News Feed for Mastt as part of USYD Capstone Semester 1, 2021 project.

# Overview

Remote Working Dashboard - News Feed is a website and an accompanying API which enables effective collaboration amongst team members while providing them the contextual information regarding other’s physical and social environment through relevant data like News, Weather and Holidays.

# Tech

  * Node JS
  
  * Express
  
  * React
  
  * JavaScript
  
  * MongoDB
  
  * Azure

# Cloud URLs for Testing

- [Server Side URL][serverSideURL]

- Client Side: Not Deployed yet

# API endpoints for retrieving data from 3rd party

- Weather
City Name: ["Buenos Aires","Hyderabad", "Manila", "Sydney"]
  > https://mastt-news-feed-server.azurewebsites.net/getWeatherByCity?city=[INSERT city Name here]&token=f39236376746483bb4f7922954f2f503
- News
  > https://mastt-news-feed-server.azurewebsites.net/getNews?token=f39236376746483bb4f7922954f2f503
- Holiday
Country Names: [ "Argentina", "Phillippines","India", "Australia"]
  > http://mastt-news-feed-server.azurewebsites.net/getHoliday?city=[INSERT Country Name Here]&token=f39236376746483bb4f7922954f2f503
# Local Compilation & Installation

- Prerequisites
  
  > npm
  
  > Python 3.9.5

- Clone Git Repo (Or Extract Zip folder)

- Run Server locally

  > Navigate to \mastt-news-feed\server-side
  
  > Using any command line tool like Powershell run: npm install
  
  > Using any command line tool like Powershell run the following:
    
    > pip install nltk

  > Open any IDE like VSCode
  
  > Open app.js
  
  > At line number 19 and 20, replace azurePort with any port number of choice like 3000
  
  > Using any command line tool like Powershell run: node app.js
  
  > Using any browser, Navigate to http://localhost:[insert port_number here]/
  
- Run News Feed Web Client Side App locally

  > Navigate to \mastt-news-feed\client-side
  
  > Using any command line tool like Powershell run: npm install
  
  > Using any command line tool like Powershell run: npm start
  
  > Using any browser, Navigate to http://localhost:[insert port_number here]/
  
[serverSideURL]: <https://mastt-news-feed-server.azurewebsites.net/>
