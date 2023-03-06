import { useContext } from "react";
import { AmountContext } from "../Contexts/AmountContext";

export default function Input({value}) {
    const amountContext = useContext(AmountContext);

    function handleChange(event) {
        amountContext.setAmount(event.target.value);
    }

    return <input type="text" onChange={handleChange} value={value} />;
}
