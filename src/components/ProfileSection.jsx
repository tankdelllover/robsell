import MetricCard from "./MetricCard";

export default function ProfileSection({

    title,
    metrics,
    brand

}) {

    return (

        <section className="profile-section">

            <h2>{title}</h2>

            <div className="metric-grid">

                {metrics.map(metric => (

                    <MetricCard

                        key={metric.title}

                        title={metric.title}

                        value={metric.value}

                        rank={metric.rank}

                        color={brand.primary}

                    />

                ))}

            </div>

        </section>

    );

}