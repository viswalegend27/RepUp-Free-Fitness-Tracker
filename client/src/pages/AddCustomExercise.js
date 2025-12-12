import React, { useState } from "react";
import { createCustomExercise } from "../utils/API";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AddCustomExercise() {
  const navigate = useNavigate();
  const token = Auth.getToken();
  console.log("CLIENT: token before fetch:", token);
  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [fields, setFields] = useState([{ key: "", value: "" }]);

  // Add a new dynamic field
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  // Update a field
  const updateField = (i, key, value) => {
    const copy = [...fields];
    copy[i][key] = value;
    setFields(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsObject = {};
    fields.forEach((f) => {
      if (f.key.trim() !== "")
        fieldsObject[f.key] = f.value;
    });

    const data = {
      name,
      date,
      fields: fieldsObject
    };

    const res = await createCustomExercise(data, token);

    if (res.ok) {
      alert("Custom Exercise Created!");
      navigate("/exercise");
    } else {
      alert("Error creating custom exercise");
    }
  };

  return (
    <div className="custom-exercise-page container">
      <h2>Create Custom Exercise</h2>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <h4>Custom Fields</h4>
        {fields.map((f, i) => (
          <div key={i} className="d-flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Field name (e.g. reps)"
              className="form-control"
              value={f.key}
              onChange={(e) => updateField(i, "key", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Value (e.g. 10)"
              className="form-control"
              value={f.value}
              onChange={(e) => updateField(i, "value", e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" className="btn btn-secondary mt-3" onClick={addField}>
          + Add Field
        </button>

        <br />

        <button type="submit" className="btn btn-success mt-3">
          Save Exercise
        </button>
      </form>
    </div>
  );
}
