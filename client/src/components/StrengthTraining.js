import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createStrengthTraining } from "../utils/API";
import Header from "./Header";
import strengthIcon from "../assets/images/strength-training-w.png";

export default function StrengthTraining() {
const [form, setForm] = useState({
name: "",
weight: "",
sets: "",
reps: "",
date: new Date(),
});
const [message, setMessage] = useState("");

const loggedIn = Auth.loggedIn();
const token = loggedIn ? Auth.getToken() : null;
const userId = loggedIn ? Auth.getUserId() : null;

const handleChange = (e) =>
setForm({ ...form, [e.target.name]: e.target.value });

const handleDateChange = (date) => setForm({ ...form, date });

const handleSubmit = async (e) => {
e.preventDefault();
if (!token || !userId) return;

const payload = {
    ...form,
    userId,
    weight: Number(form.weight),
    sets: Number(form.sets),
    reps: Number(form.reps),
};

try {
    const res = await createStrengthTraining(payload, token);
    if (!res.ok) throw new Error("Failed to create record");

    setMessage("✅ Strength training added!");
    setForm({
    name: "",
    weight: "",
    sets: "",
    reps: "",
    date: new Date(),
    });
} catch (err) {
    console.error(err);
    setMessage("❌ Error adding record");
} finally {
    setTimeout(() => setMessage(""), 3000);
}
};

if (!loggedIn) return <Navigate to="/login" />;

    return (
    <div className="strengthtraining">
        <Header />
        <div className="d-flex flex-column align-items-center">
        <h2 className="title text-center">Add Strength Training</h2>
        <form
            className="strength-form d-flex flex-column"
            onSubmit={handleSubmit}
        >
            <div className="d-flex justify-content-center">
            <img
                alt="strength training"
                src={strengthIcon
                
                }
                className="exercise-form-icon"
            />
            </div>

            {["name", "weight", "sets", "reps"].map((field) => (
            <React.Fragment key={field}>
                <label>
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {field === "weight" && " (lbs)"}
                </label>
                <input
                type={field === "name" ? "text" : "number"}
                name={field}
                value={form[field]}
                placeholder={field === "name" ? "Bench Press" : "0"}
                onChange={handleChange}
                />
            </React.Fragment>
            ))}

            <label>Date:</label>
            <DatePicker
            selected={form.date}
            onChange={handleDateChange}
            placeholderText="mm/dd/yyyy"
            />

            <button
            className="submit-btn strength-submit-btn"
            type="submit"
            disabled={
                !form.name || !form.weight || !form.sets || !form.reps || !form.date
            }
            >
            Add
            </button>
        </form>

        <p className="message">{message}</p>
        </div>
    </div>
    );
}
