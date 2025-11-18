import React, { useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the BMI Calculator</h1>
      <Link to="/calculator">
        <button>Go to Calculator</button>
      </Link>
    </div>
  );
}

function Calculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || h <= 0) {
      alert("Please enter valid weight & height");
      return;
    }

    const bmiValue = (w / (h * h)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <div className="calculator">
      <h2>BMI Calculator</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Weight (kg):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </label>
        <br />

        <label>
          Height (m):
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </label>
        <br />

        <button type="submit">Calculate BMI</button>
      </form>

      {bmi && (
        <div>
          <h3>Your BMI: {bmi}</h3>
          <p>Category: {category}</p>
        </div>
      )}

      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  );
}
