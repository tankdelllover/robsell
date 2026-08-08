export default function TeamHero({

    team,
    brand

}) {

    return (

        <div

            className="team-hero"

            style={{

                background: brand.primary,

                color: brand.secondary

            }}

        >

            <div className="logo-container">

                <img

                    className="hero-logo"

                    src={`/data/branding/logos/${brand.logo}`}

                    alt={team.team}

                />

            </div>

            <h1>{team.team}</h1>

            <h2>{brand.nickname}</h2>

            <p>{team.conference}</p>

            <div className="overall-rank">

                Overall Rank #{team.rank}

            </div>

        </div>

    );

}