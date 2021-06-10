import Weather from "./components/weather";
import Nav from "./components/nav";
import News from "./components/news/index";
import Holidays from "./components/holidays";
import "./App.css";

export default function App() {
  return (
    <div>
      <Nav />

      <Weather />
      <Holidays />
      <News />
    </div>
  );
}
