export default function StatCards({

    team,
    brand

}) {

    const value = (n, d = 3) =>

        n == null

            ? "-"

            : Number(n).toFixed(d);

    const rank = r =>

        r

            ? `#${r}`

            : "-";

    return (

        <div className="stat-grid">

            <div

                className="stat-card"

                style={{

                    borderTopColor: brand.primary

                }}

            >

                <h3>Overall</h3>

                <strong>

                    {value(team.overall_efficiency)}

                </strong>

                <p>{rank(team.rank)}</p>

            </div>

            <div

                className="stat-card"

                style={{

                    borderTopColor: brand.primary

                }}

            >

                <h3>Offense</h3>

                <strong>

                    {value(team.offensive_efficiency)}

                </strong>

                <p>{rank(team.offense_rank)}</p>

            </div>

            <div

                className="stat-card"

                style={{

                    borderTopColor: brand.primary

                }}

            >

                <h3>Defense</h3>

                <strong>

                    {value(team.defensive_efficiency)}

                </strong>

                <p>{rank(team.defense_rank)}</p>

            </div>

        </div>

    );

}