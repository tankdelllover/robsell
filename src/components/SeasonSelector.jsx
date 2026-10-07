import { useYear, AVAILABLE_YEARS } from "../context/YearContext";

export default function SeasonSelector() {

    const { year, setYear } = useYear();

    return (

        <div className="season-selector">

            <label>

                Season

            </label>

            <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            >

                {AVAILABLE_YEARS.map(y => (

                    <option
                        key={y}
                        value={y}
                    >
                        {y}
                    </option>

                ))}

            </select>

        </div>

    );

}