import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Image, Container, Card, Button } from 'semantic-ui-react'
import './index.css'

export default function Holidays() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            let countries = [ "Argentina", "Phillippines","India", "Australia"]
            const responses = await Promise.all(
                countries.map((country) => axios.get(`http://mastt-news-feed-server.azurewebsites.net/getHoliday?city=${country}&token=f39236376746483bb4f7922954f2f503`))
            )
            setData(responses.map((res) => res.data[0]))
        }
        fetchData()
    }, [])

    return (
        <Container style={{ marginTop: 60 }} >
            <Card.Group itemsPerRow={4}>
                {
                    data.map(item => {
                        return <Card key={item._id} >
                            {/* <Image size="tiny" src={"https://source.unsplash.com/random/" + item._id}  ui={false} /> */}
                            <Card.Content>
                                <Card.Header>{item.city}</Card.Header>
                                <Card.Description>
                                    <h4>Holiday: {item.title}</h4>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {item.start_date.slice(5,10)}-{item.start_date.slice(0,4)}
                            </Card.Content>
                        </Card>
                    })
                }
            </Card.Group>
        </Container>
    )
    // }
}
