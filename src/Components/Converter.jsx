import { AmountContext } from "../Contexts/AmountContext";
import "./Converter.css";
import DatePicker from "./DatePicker";
import Input from "./Input";
import ListDevise from "./ListDevise";
import { useState, useEffect } from "react";

export default function Converter() {
    const [amount, setAmount] = useState(0);
    const [taux, setTaux] = useState(0.5);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("EUR");
    const [date, setDate] = useState("2022-01-01");

    useEffect(() => {
        async function fetchData() {
            const rate = await setTauxFromAPI(from, to, date);
            setTaux(rate);
        }
        fetchData();
    }, [from, to, date]);

    return (
        <AmountContext.Provider value={{ amount, setAmount, setFrom, setTo }}>
            <div className="converter">
                <h1>Converter</h1>
                <div className="container devise-container">
                    <Input value={amount} />
                    <ListDevise defaultDevise={from} setCountry={setFrom} />
                </div>
                <div className="container result-container">
                    <div className="Result">{amount * taux}</div>
                    <ListDevise defaultDevise={to} setCountry={setTo} />
                </div>
                <div className="container date-container">
                    <div>Taux : {taux} </div>
                    <DatePicker value={date} setDate={setDate} />
                </div>
            </div>
        </AmountContext.Provider>
    );
}

async function setTauxFromAPI(from, to, date) {
    //date = date.replace(/-/g, "/");

    const myHeaders = new Headers();
    myHeaders.append("apikey", "O9S1iAhr1zbc66TcM9cxTW36WLoD20hh");

    const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    
    const request = `https://api.apilayer.com/exchangerates_data/${date}&base=${from}`;

    console.log(request);
    try {
        const response = await fetch(request, requestOptions);
        const data = await response.json();

        return data.rates[to];
    } catch (error) {
        console.error(error);
    }
}
