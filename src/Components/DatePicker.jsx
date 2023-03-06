export default function DatePicker({value ,setDate}) {

    function handleChange(event) {
        setDate(event.target.value);
    }

    return (
        <input type="date" name="date" id="date" value={value} onChange={handleChange} />
    )
}