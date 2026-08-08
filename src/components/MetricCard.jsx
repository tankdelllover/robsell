import PercentBar from "./PercentBar";

export default function MetricCard({

    title,
    value,
    rank,
    color

}) {

    return (

        <div className="metric-card">

            <h3>{title}</h3>

            <strong>{value}</strong>

            <p>

                {rank ? `#${rank}` : "-"}

            </p>

            <PercentBar

                rank={rank}
                color={color}

            />

        </div>

    );

}