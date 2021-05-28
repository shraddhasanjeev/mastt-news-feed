import React from 'react';
import axios from "axios"
import "./table.css"

const rows = [];
const acountry = "Australia";
var num = -1;
var history = new Array();
//router.get('/holiday', mainController.getAllHolidays)
//router.get('/weather', mainController.getAllWeather)

class Holiday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:false
        }
    }
    

    componentWillMount() {
        axios({
          method: "GET",

          url:
                "https://mastt-news-feed-server.azurewebsites.net/getIndiaHoliday",
            params: {
                token: 'f39236376746483bb4f7922954f2f503'
            }

        })
            .then((response) => {
              console.log(response)
            num = response.data.length;
            for (let y = 0; y < num; y += 1) {
              history[y] = response.data[y];
            }

            this.setState({
              msg: true,
            });
            console.log("Finished");
          })
          .catch(function (error) {
            console.log("Error");
          });
    }

    render() {
        if (this.state.msg) {
            for (let y = 0; y < num; y += 1) {
                rows.push(
                    <tr>
                        <th>{history[y].city}</th>
                        <th>{history[y].title}</th>
                        <th>{history[y].start_date}</th>
                        <th>{history[y].end_date}</th>
                        <th>{history[y].category}</th>
                        <th>{history[y].content}</th>
                    </tr>
                )
            }
            return (
                <div id="history">
                    <table>
                        <tr>
                            <td>city</td>
                            <td>title</td>
                            <td>start_date</td>
                            <td>end_date</td>
                            <td>category</td>
                            <td>content</td>
                        </tr>
                        {rows}
                    </table>
                </div>
            )
        } else {
            return (<div></div>);
        }
        
    }

} export default Holiday;