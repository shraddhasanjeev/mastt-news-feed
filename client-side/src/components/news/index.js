import axios from 'axios'
import React, { Component } from 'react'
import { Item, Container, Label, Button } from 'semantic-ui-react'


export default class News extends Component {


    state = {
        totalPages: [],
        news: []
    }

    componentDidMount() {
        const url = "https://mastt-news-feed-server.azurewebsites.net/getNews?token=f39236376746483bb4f7922954f2f503"
        axios.get(url).then(response => {
            const data = response.data
            // get 40 news
            const newData = data.slice(0, 40)
            this.setState({ news: newData })
            this.setState({ totalPages: newData.length })
        })
    }

    handleClick = (id) => {
        return () => {
            const url = `api/archiveNews?id=${id}&token=f39236376746483bb4f7922954f2f503`
            axios.get(url).then(response => {
                console.log(response.data)
            })
           const {news}  = this.state
           const n = news.map(item=>{
               if (item._id === id) {
                   return {...item, archived: "true"}
                }
               else return item
           })
           this.setState({news:n})
        }
    }

    render() {
        const { news } = this.state
        return (
            <div>
                <Container style={{ width: 800, marginTop: 60 }}>
                    <Item.Group>
                        {
                            news.map(item => {
                                return <Item key={item._id} className={item.archived ? "card-item":""}>
                                <Item.Image size='medium' src={item.image} />
                                <Item.Content>
                                    <Item.Header as='a' href={item.sourceUrl}>{item.title}</Item.Header>
                                    <Item.Description>
                                        {item.content}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Label>{item.country}</Label>
                                        <Button floated="right" onClick={this.handleClick(item._id)} primary>Not Relevant</Button>
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
