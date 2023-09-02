import { Repository } from "../../types";

export const Table = ({
  repositories,
} : {
  repositories: Repository[],
})=>{  

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>repository name</th>
            <th>issues open</th>
            <th>stars count</th>
          </tr>
        </thead>
        <tbody>
          { repositories.map(TableRow) }
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({id, name, open_issues_count, stargazers_count}: Repository)=> (
  <tr key={id}>
    <td>{name}</td>
    <td>{open_issues_count}</td>
    <td>{stargazers_count}</td>
  </tr>
)
