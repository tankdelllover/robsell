import { Link } from "react-router-dom";

function RankingsTable({
  teams,
  columns,
  sortColumn,
  ascending,
  sortTeams,
  formatRank,
  formatDecimal,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map(([key, label]) => (
              <th key={key} onClick={() => sortTeams(key)}>
                {label}
                {sortColumn === key && (ascending ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{formatRank(team.rank)}</td>

              <td className="team-name">
  <Link
    to={`/team/${encodeURIComponent(team.Team || team.team)}`}
    className="team-link"
  >
    {team.Team || team.team}
  </Link>
</td>

              <td>{team.conference || "-"}</td>

              <td>{formatDecimal(team.overall_efficiency)}</td>

              <td>{formatDecimal(team.offense)}</td>

              <td>{formatDecimal(team.defense)}</td>

              <td>{formatRank(team.sos_rank)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingsTable;