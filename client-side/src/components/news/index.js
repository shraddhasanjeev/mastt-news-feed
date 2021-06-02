import axios from 'axios'
import React, { Component } from 'react'
import { Item, Container, Label } from 'semantic-ui-react'


export default class News extends Component {


    state = {
        totalPages: [],
        news: []
    }

    componentDidMount() {
        const url = "https://mastt-news-feed-server.azurewebsites.net/getNews?token=f39236376746483bb4f7922954f2f503"
        axios.get(url).then(response => {
            const data = response.data
            // 取前四十条新闻
            const newData = data.slice(0, 40)
            console.log(newData)
            this.setState({ news: newData })
            this.setState({ totalPages: newData.length })
        })
    }

    render() {
        const { news } = this.state
        return (
            <div>
                <Container style={{ width: 800, marginTop: 60 }}>
                    <Item.Group>
                        {
                            news.map(item => {
                                return <Item key={item._id}>
                                    <Item.Image size='medium' src={item.image} />

                                    <Item.Content>
                                        <Item.Header as='a' href={item.sourceUrl}>{item.title}</Item.Header>
                                        <Item.Description>
                                            {item.content}
                                        </Item.Description>
                                        <Item.Extra>
                                            <Label>{item._id}</Label>
                                            <Label>{item.country}</Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            })
                        }
                    </Item.Group>
                </Container>
            </div>
        )
    }
}
