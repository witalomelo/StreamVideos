import "./App.css";
import Row from "../Home2/Row";
import categories from "../../services/api2";
import Banner from "./../Home2/Banner";

function App() {
  return (
    <div className="App">
      <Banner />
      {categories.map((category) => {
        return (
          <Row
            key={category.name}
            title={category.title}
            path={category.path}
            isLarge={category.isLarge}
          />
        );
      })}
    </div>
  );
}

export default App;
