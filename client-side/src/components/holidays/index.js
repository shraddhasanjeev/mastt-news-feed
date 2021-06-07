import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, Container, Card, Button } from "semantic-ui-react";
import "./index.css";

export default function Holidays() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let countries = ["Argentina", "Philippines", "India", "Australia"];
      const responses = await Promise.all(
        countries.map((country) =>
          axios.get(
            `https://mastt-news-feed-server.azurewebsites.net/getHoliday?city=${country}&token=f39236376746483bb4f7922954f2f503`
          )
        )
      );
      setData(responses.map((res) => res.data[0]));
    };
    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: 3 }}>
      <Card.Group itemsPerRow={4}>
        {data.map((item) => {
          return (
            <Card key={item._id}>
              <Card.Content>
                <Card.Description>
                  <h1>{item.title}</h1>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <h3>
                  {item.start_date.slice(5, 10)}-{item.start_date.slice(0, 4)}
                </h3>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
  // }
}
