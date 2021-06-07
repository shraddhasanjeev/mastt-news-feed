import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, Container, Card, Button } from "semantic-ui-react";
import "./index.css";

export default function Weather() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let cities = ["Buenos Aires", "Hyderabad", "Manilla", "Sydney"];
      const responses = await Promise.all(
        cities.map((city) =>
          axios.get(
            `https://mastt-news-feed-server.azurewebsites.net/getWeatherByCity?city=${city}&token=f39236376746483bb4f7922954f2f503`
          )
        )
      );
      setData(responses.map((res) => res.data[0]));
    };
    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: 100 }}>
      <Card.Group itemsPerRow={4}>
        {data.map((item) => {
          return (
            <Card className={id === item._id ? "card-item" : ""} key={item._id}>
              <Image src={`${item.city}.jpg`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  <h1>{item.city}</h1>
                </Card.Header>
                <Card.Description>
                  <h3>{item.temperature} °C</h3>
                </Card.Description>
                <Card.Description>
                  <h3>{item.outlook}</h3>
                </Card.Description>

              </Card.Content>
              <Card.Content extra></Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </Container>
  );
}
