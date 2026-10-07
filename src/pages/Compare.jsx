import { useEffect, useState } from "react";
import "./Compare.css";
import { useYear } from "../context/YearContext";

export default function Compare() {

    const [teams, setTeams] = useState([]);
    const [branding, setBranding] = useState([]);

    const [teamOne, setTeamOne] = useState(null);
    const [teamTwo, setTeamTwo] = useState(null);

    useEffect(() => {

        Promise.all([
          fetch(`/data/${year}/teams.json`).then(r => r.json()),
            fetch("/data/branding/team_branding.json").then(r => r.json())
        ]).then(([teamData, brandData]) => {

            setTeams(teamData);
            setBranding(brandData);

            setTeamOne(teamData[0]);
            setTeamTwo(teamData[1]);

        });

   }, [year]);

    if (!teamOne || !teamTwo) {
        return <h2>Loading...</h2>;
    }

    const brand1 = branding[teamOne.team] || {};
    const brand2 = branding[teamTwo.team] || {};

    const value = (num, decimals = 3) => {

        if (num === undefined || num === null) {
            return "-";
        }

        return Number(num).toFixed(decimals);

    };


    const CompareMetric = ({
    title,
    leftValue,
    rightValue,
    leftColor,
    rightColor,
    decimals = 3,
    lowerIsBetter = false
}) => {

        const left = Number(leftValue) || 0;
        const right = Number(rightValue) || 0;

        const max = Math.max(left, right);

        const leftWidth =
            max > 0 ? (left / max) * 100 : 0;

        const rightWidth =
            max > 0 ? (right / max) * 100 : 0;

        let winner = "Even";

if (lowerIsBetter) {

    if (left < right) {
        winner = teamOne.team;
    }

    if (right < left) {
        winner = teamTwo.team;
    }

} else {

    if (left > right) {
        winner = teamOne.team;
    }

    if (right > left) {
        winner = teamTwo.team;
    }

}

        return (

            <div className="compare-metric">

                <h3>{title}</h3>

                <div className="metric-bars">

                    <div className="metric-side left">

                        <strong>
                            {value(leftValue, decimals)}
                        </strong>

                        <div className="track">

                            <div
                                className="fill"
                                style={{
                                    width: `${leftWidth}%`,
                                    background: leftColor
                                }}
                            />

                        </div>

                    </div>


                    <div className="metric-vs">
                        VS
                    </div>


                    <div className="metric-side right">

                        <div className="track">

                            <div
                                className="fill"
                                style={{
                                    width: `${rightWidth}%`,
                                    background: rightColor
                                }}
                            />

                        </div>

                        <strong>
                            {value(rightValue, decimals)}
                        </strong>

                    </div>

                </div>


                <p className="winner">

                    {winner === "Even"
                        ? "Even"
                        : `${winner} Advantage`
                    }

                </p>

            </div>

        );

    };


    return (

        <div className="compare-page">

            <h1>Team Comparison</h1>


            {/* TEAM SELECTORS */}

            <div className="compare-selectors">

                <select
                    value={teamOne.team}
                    onChange={e =>
                        setTeamOne(
                            teams.find(
                                t => t.team === e.target.value
                            )
                        )
                    }
                >

                    {teams.map(team => (

                        <option
                            key={team.team}
                            value={team.team}
                        >
                            {team.team}
                        </option>

                    ))}

                </select>


                <select
                    value={teamTwo.team}
                    onChange={e =>
                        setTeamTwo(
                            teams.find(
                                t => t.team === e.target.value
                            )
                        )
                    }
                >

                    {teams.map(team => (

                        <option
                            key={team.team}
                            value={team.team}
                        >
                            {team.team}
                        </option>

                    ))}

                </select>

            </div>


            {/* TEAM HEADER */}

            <div className="teams-header">


                {/* TEAM ONE */}

                <div
                    className="team-compare-card"
                    style={{
                        borderTopColor: brand1.primary
                    }}
                >

                    {brand1.logo && (

                        <img
                            src={`/data/branding/logos/${brand1.logo}`}
                            alt={teamOne.team}
                            style={{
                                width: "80px",
                                height: "80px",
                                maxWidth: "80px",
                                maxHeight: "80px",
                                objectFit: "contain",
                                display: "block",
                                margin: "0 auto 12px auto"
                            }}
                        />

                    )}

                    <h2>{teamOne.team}</h2>

                    <h3>{brand1.nickname}</h3>

                    <p>
                        Overall Rank #{teamOne.rank}
                    </p>

                </div>


                {/* VS */}

                <div className="compare-vs">
                    VS
                </div>


                {/* TEAM TWO */}

                <div
                    className="team-compare-card"
                    style={{
                        borderTopColor: brand2.primary
                    }}
                >

                    {brand2.logo && (

                        <img
                            src={`/data/branding/logos/${brand2.logo}`}
                            alt={teamTwo.team}
                            style={{
                                width: "80px",
                                height: "80px",
                                maxWidth: "80px",
                                maxHeight: "80px",
                                objectFit: "contain",
                                display: "block",
                                margin: "0 auto 12px auto"
                            }}
                        />

                    )}

                    <h2>{teamTwo.team}</h2>

                    <h3>{brand2.nickname}</h3>

                    <p>
                        Overall Rank #{teamTwo.rank}
                    </p>

                </div>

            </div>


            {/* COMPARISON METRICS */}

           <div className="comparison-section">

    <h2>Efficiency Comparison</h2>

    <CompareMetric
        title="Overall Efficiency"
        leftValue={teamOne.overall_efficiency}
        rightValue={teamTwo.overall_efficiency}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
    />

    <CompareMetric
        title="Offensive Efficiency"
        leftValue={teamOne.offensive_efficiency}
        rightValue={teamTwo.offensive_efficiency}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
    />

    <CompareMetric
        title="Defensive Efficiency"
        leftValue={teamOne.defensive_efficiency}
        rightValue={teamTwo.defensive_efficiency}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
    />

    <CompareMetric
        title="Pass Yards/Game"
        leftValue={teamOne.pass_yards_per_game}
        rightValue={teamTwo.pass_yards_per_game}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={1}
    />

    <CompareMetric
        title="Rush Yards/Game"
        leftValue={teamOne.rush_yards_per_game}
        rightValue={teamTwo.rush_yards_per_game}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={1}
    />

    <CompareMetric
        title="Pass Yards/Attempt"
        leftValue={teamOne.pass_yards_per_attempt}
        rightValue={teamTwo.pass_yards_per_attempt}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={2}
    />

    <CompareMetric
        title="Rush Yards/Attempt"
        leftValue={teamOne.rush_yards_per_attempt}
        rightValue={teamTwo.rush_yards_per_attempt}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={2}
    />

    <CompareMetric
        title="Pass Yards Allowed/Game"
        leftValue={teamOne.pass_yards_allowed_per_game}
        rightValue={teamTwo.pass_yards_allowed_per_game}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={1}
        lowerIsBetter={true}
    />

    <CompareMetric
        title="Rush Yards Allowed/Game"
        leftValue={teamOne.rush_yards_allowed_per_game}
        rightValue={teamTwo.rush_yards_allowed_per_game}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={1}
        lowerIsBetter={true}
    />

    <CompareMetric
        title="Pass Yards/Attempt Allowed"
        leftValue={teamOne.yards_allowed_per_pass_attempt}
        rightValue={teamTwo.yards_allowed_per_pass_attempt}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={2}
        lowerIsBetter={true}
    />

    <CompareMetric
        title="Rush Yards/Carry Allowed"
        leftValue={teamOne.yards_allowed_per_rush}
        rightValue={teamTwo.yards_allowed_per_rush}
        leftColor={brand1.primary}
        rightColor={brand2.primary}
        decimals={2}
        lowerIsBetter={true}
    />

</div>

        </div>

    );

}