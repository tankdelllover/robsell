import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useYear } from "../context/YearContext";

import TeamHero from "../components/TeamHero";
import StatCards from "../components/StatCards";
import ProfileSection from "../components/ProfileSection";
import TeamSummary from "../components/TeamSummary";
import "./Team.css";


function Team() {

    const { teamName } = useParams();
const { year } = useYear();

const [team, setTeam] = useState(null);
    const [branding, setBranding] = useState({});


    useEffect(() => {

        Promise.all([

            fetch(`/data/${year}/teams.json`)
                .then(res => res.json()),

            fetch("/data/branding/team_branding.json")
                .then(res => res.json())

        ])

        .then(([teams, brands]) => {


            const found = teams.find(

                t =>

                    t.team &&

                    decodeURIComponent(teamName)
                        .toLowerCase() ===
                    t.team.toLowerCase()

            );


            setTeam(found || null);

            setBranding(brands);

        });


    }, [teamName, year]);



    if (!team) {

        return (

            <div className="page">

                <h2>
                    Loading team...
                </h2>

            </div>

        );

    }



    const brand = branding[team.team] || {

        nickname: "",

        primary: "#4b92db",

        secondary: "#ffffff",

        logo: null

    };



    const value = (num, digits = 3) => {

        if (num === undefined || num === null)

            return "-";


        return Number(num).toFixed(digits);

    };



    const offense = [

        {

            title: "Offensive Efficiency",

            value: value(team.offensive_efficiency),

            rank: team.offense_rank

        },


        {

            title: "Pass Yards/Game",

            value: value(team.pass_yards_per_game, 1),

            rank: team.pass_yards_per_game_rank

        },


        {

            title: "Rush Yards/Game",

            value: value(team.rush_yards_per_game, 1),

            rank: team.rush_yards_per_game_rank

        },


        {

            title: "Pass Yards/Attempt",

            value: value(team.pass_yards_per_attempt, 2),

            rank: team.pass_yards_per_attempt_rank

        },


        {

            title: "Rush Yards/Attempt",

            value: value(team.rush_yards_per_attempt, 2),

            rank: team.rush_yards_per_attempt_rank

        },


                {

            title: "Turnover Margin/Game",

            value: value(team.turnover_margin_per_game, 2),

            rank: team.turnover_margin_rank

        },

        {

            title: "Red Zone Offense",

            value: value(team.red_zone_offense, 2),

            rank: team.red_zone_offense_rank

        }
    ];



    const defense = [

        {

            title: "Defensive Efficiency",

            value: value(team.defensive_efficiency),

            rank: team.defense_rank

        },


        {

            title: "Pass Yards Allowed/Game",

            value: value(team.pass_yards_allowed_per_game, 1),

            rank: team.pass_yards_allowed_rank

        },


        {

            title: "Rush Yards Allowed/Game",

            value: value(team.rush_yards_allowed_per_game, 1),

            rank: team.rush_yards_allowed_rank

        },



        {

            title: "Pass Yards/Attempt Allowed",

            value: value(team.yards_allowed_per_pass_attempt, 2),

            rank: team.pass_defense_rank

        },


        {

            title: "Rush Yards/Carry Allowed",

            value: value(team.yards_allowed_per_rush, 2),

            rank: team.rush_defense_rank

        },


                {

            title: "Red Zone Points Allowed/Attempt",

            value: value(team.red_zone_defense, 2),

            rank: team.red_zone_defense_rank

        },


        {

            title: "Havoc Rate",

            value:

                team.havoc_rate

                    ? `${(team.havoc_rate * 100).toFixed(1)}%`

                    : "-",

            rank: team.havoc_rank

        }


    ];

        return (

        <div className="team-page">


            <TeamHero

                team={team}

                brand={brand}

            />



            <StatCards

                team={team}

                brand={brand}

            />

            <TeamSummary

    team={team}

/>



            <ProfileSection

                title="Offensive Profile"

                metrics={offense}

                brand={brand}

            />



            <ProfileSection

                title="Defensive Profile"

                metrics={defense}

                brand={brand}

            />


        </div>

    );

}


export default Team;