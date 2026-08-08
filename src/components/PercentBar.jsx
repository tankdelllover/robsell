export default function PercentBar({
    rank,
    total = 136
}) {

    if (!rank) return null;


    const percent = Math.round(
        ((total - rank + 1) / total) * 100
    );


    let color;


    if (percent >= 90) {

        color = "#22c55e"; // green

    } else if (percent >= 70) {

        color = "#eab308"; // yellow

    } else if (percent >= 40) {

        color = "#f97316"; // orange

    } else {

        color = "#ef4444"; // red

    }



    return (

        <div className="percent-container">


            <div className="percent-label">

                <span>
                    National Percentile
                </span>

                <strong>
                    {percent}%
                </strong>

            </div>



            <div className="percent-track">

                <div

                    className="percent-fill"

                    style={{

                        width: `${percent}%`,

                        background: color

                    }}

                />

            </div>



            <p>

                {percent >= 90 && "Elite"}

                {percent >= 70 && percent < 90 && "Above Average"}

                {percent >= 40 && percent < 70 && "Average"}

                {percent < 40 && "Needs Improvement"}

            </p>


        </div>

    );

}