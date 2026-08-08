import PercentBar from "./PercentBar";


export default function TeamSummary({

    team

}) {


    const valueToPercentile = (rank, total = 136) => {

        if (!rank) return 0;

        return Math.round(
            ((total - rank + 1) / total) * 100
        );

    };



    const metrics = [

        {
            name: "Offensive Efficiency",
            percentile: valueToPercentile(team.offense_rank)
        },

        {
            name: "Defensive Efficiency",
            percentile: valueToPercentile(team.defense_rank)
        },

        {
            name: "Passing Offense",
            percentile: valueToPercentile(team.pass_yards_per_game_rank)
        },

        {
            name: "Rushing Offense",
            percentile: valueToPercentile(team.rush_yards_per_game_rank)
        },

        {
            name: "Pass Protection",
            percentile: valueToPercentile(team.pass_yards_per_attempt_rank)
        },

        {
            name: "Rush Efficiency",
            percentile: valueToPercentile(team.rush_yards_per_attempt_rank)
        },

        {
            name: "Havoc Creation",
            percentile: valueToPercentile(team.havoc_rank)
        },

        {
            name: "Pass Defense",
            percentile: valueToPercentile(team.pass_defense_rank)
        },

        {
            name: "Rush Defense",
            percentile: valueToPercentile(team.rush_defense_rank)
        }

    ];



    const strengths = metrics

        .filter(metric => metric.percentile >= 85)

        .sort((a,b) =>
            b.percentile - a.percentile
        )

        .slice(0,3);



    const weaknesses = metrics

        .filter(metric => metric.percentile <= 35)

        .sort((a,b) =>
            a.percentile - b.percentile
        )

        .slice(0,3);



    return (

        <section className="team-summary">


            <h2>
                Team Profile
            </h2>



            <div className="summary-grid">


                <div className="summary-card strengths">


                    <h3>
                        🔥 Strengths
                    </h3>



                    {strengths.length > 0 ? (

                        strengths.map(metric => (

                            <div
                                className="summary-item"
                                key={metric.name}
                            >

                                <span>
                                    {metric.name}
                                </span>


                                <strong>
                                    {metric.percentile}%
                                </strong>


                            </div>

                        ))

                    ) : (

                        <p>
                            No elite areas yet
                        </p>

                    )}

                </div>





                <div className="summary-card weaknesses">


                    <h3>
                        ⚠️ Weaknesses
                    </h3>



                    {weaknesses.length > 0 ? (

                        weaknesses.map(metric => (

                            <div
                                className="summary-item"
                                key={metric.name}
                            >

                                <span>
                                    {metric.name}
                                </span>


                                <strong>
                                    {metric.percentile}%
                                </strong>


                            </div>

                        ))

                    ) : (

                        <p>
                            No major weaknesses
                        </p>

                    )}

                </div>



            </div>


        </section>

    );

}