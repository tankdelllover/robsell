import { useEffect, useState } from "react";
import "../App.css";
import RankingsTable from "../components/RankingsTable";
import { Link } from "react-router-dom";
import SeasonSelector from "../components/SeasonSelector";
import { useYear } from "../context/YearContext";

function Home() {
  const [teams, setTeams] = useState([]);
  const [sortColumn, setSortColumn] = useState("rank");
  const [ascending, setAscending] = useState(true);
  const { year } = useYear();

  useEffect(() => {
  fetch(`/data/${year}/rankings.json`)
    .then((res) => res.json())
    .then((data) => {
      setTeams(data);
    });
}, [year]);

  function sortTeams(column) {
    const newAscending =
      sortColumn === column ? !ascending : true;

    const sorted = [...teams].sort((a, b) => {
      let x = a[column];
      let y = b[column];

      if (typeof x === "string") {
        return newAscending
          ? x.localeCompare(y)
          : y.localeCompare(x);
      }

      x = x ?? -999;
      y = y ?? -999;

      return newAscending ? x - y : y - x;
    });

    setTeams(sorted);
    setSortColumn(column);
    setAscending(newAscending);
  }

  function formatRank(value) {
    if (value === null || value === undefined || isNaN(value)) {
      return "-";
    }

    return Number(value).toFixed(0);
  }

  function formatDecimal(value) {
    if (value === null || value ===undefined || isNaN(value)) {
      return "-";
    }

    return Number(value).toFixed(3);
  }

  const columns = [
    ["rank", "Rank"],
    ["team", "Team"],
    ["conference", "Conference"],
    ["overall_efficiency", "Overall"],
    ["offense", "Offense"],
    ["defense", "Defense"],
    ["sos_rank", "SOS Rank"],
  ];

  return (
    <>
      <div className="topbar">
        <h1 className="logo">RobSell.com</h1>

        <div className="tagline">
          College Football Analytics
          <br />
          Data-driven rankings built from efficiency,
          red zone performance, HAVOC, and strength of schedule.
        </div>

        <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center"
  }}
>
  <SeasonSelector />
</div>

        <div className="navbar">
          <span>🏆 Rankings</span>
          <span>🏈 Teams</span>
          <Link to="/compare">
    📊 Compare
</Link>
          <span>🏟 Conferences</span>
        </div>
      </div>

      <div className="page">
        <div className="dashboard">
          <div className="card">
            <div className="card-title">Overall #1</div>

            <div className="card-value">
              {teams.length ? teams[0].team : "-"}
            </div>

            <div className="card-sub">
              Highest Adjusted Overall Rating
            </div>
          </div>

          <div className="card">
            <div className="card-title">Best Offense</div>

            <div className="card-value">
              Notre Dame
            </div>

            <div className="card-sub">
              Adjusted Offensive Efficiency
            </div>
          </div>

          <div className="card">
            <div className="card-title">Best Defense</div>

            <div className="card-value">
              Texas Tech
            </div>

            <div className="card-sub">
              Adjusted Defensive Efficiency
            </div>
          </div>

          <div className="card">
            <div className="card-title">Hardest Schedule</div>

            <div className="card-value">
              UCLA
            </div>

            <div className="card-sub">
              Strength of Schedule
            </div>
          </div>
        </div>

        <RankingsTable
          teams={teams}
          columns={columns}
          sortColumn={sortColumn}
          ascending={ascending}
          sortTeams={sortTeams}
          formatRank={formatRank}
          formatDecimal={formatDecimal}
        />
      </div>
    </>
  );
}

export default Home;