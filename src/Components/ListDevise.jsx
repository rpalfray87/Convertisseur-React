export default function ListDevise({ defaultDevise, setCountry }) {

    function handleChange(event) {
        setCountry(event.target.value);
    }

    return (
        <select name="devise" id="devise" value={defaultDevise} onChange={handleChange}>
            <option value="EUR">Euro</option>
            <option value="USD">Dollar</option>
        </select>
    )
}