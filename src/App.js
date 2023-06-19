import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [carList, setCarList] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    cost: "",
    checked: false,
  });

  // Captures new object car
  const handleNewCar = (event) => {
    const { name, value } = event.target;
    setNewCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Takes newCar and adds it to carList
  const handleAddCar = () => {
    setCarList((prevState) => [...prevState, { ...newCar }]);
  };

  // Clears new car object
  const handleClear = () => {
    setNewCar((prevState) => ({
      ...prevState,
      brand: "",
      model: "",
      color: "",
      fuel: "",
      cost: "",
    }));
  };

  // Handles checkboxes
  const handleIsChecked = (id) => {
    setCarList((prevState) =>
      prevState.map((item, index) =>
        index === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Filters carList to display only false objects
  const handleBuyCar = () => {
    setCarList((prevState) => prevState.filter((item) => !item.checked));
  };

  useEffect(() => {
    console.log("carList", carList);
  }, [carList]);

  useEffect(() => {
    console.log("newCar", newCar);
  }, [newCar]);

  return (
    <div className="container">
      <h1>Car Dealership</h1>
      <h3>Enter a new car into the lot below:</h3>
      <div className="questions">
        <input
          placeholder="brand"
          name="brand"
          value={newCar.brand}
          onChange={handleNewCar}
        />
        <input
          placeholder="model"
          name="model"
          value={newCar.model}
          onChange={handleNewCar}
        />
        <input
          placeholder="color"
          name="color"
          value={newCar.color}
          onChange={handleNewCar}
        />
        <select name="fuel" value={newCar.fuel} onChange={handleNewCar}>
          <option></option>
          <option>Gas</option>
          <option>Electric</option>
        </select>
        <input
          placeholder="cost"
          name="cost"
          type="number"
          value={newCar.cost}
          onChange={handleNewCar}
        />
        <button onClick={handleAddCar}>Add Car</button>
        <button onClick={handleClear}>Clear Inputs</button>
        <button onClick={handleBuyCar}>Buy Car</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Color</th>
            <th>Gas/ Electric</th>
            <th>Cost</th>
            <th>Buy Car</th>
          </tr>
        </thead>
        <tbody>
          {carList.length === 0 ? (
            <tr>
              <td colSpan="6">No cars available</td>
            </tr>
          ) : (
            carList.map((item, index) => (
              <tr key={index}>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.color}</td>
                <td>{item.fuel}</td>
                <td>{item.cost}</td>
                <td>
                  <input
                    type="checkbox"
                    value={item.checked}
                    onChange={() => handleIsChecked(index)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
