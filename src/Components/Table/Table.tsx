import { useContext } from "react";
import { Repository } from "../../apiTypes";
import { FormContext, FormState } from "../../Context/formContext";
import styles from './Table.module.css'

export const Table = ({
  repositories,
} : {
  repositories: Repository[],
})=>{  

  const { formState } = useContext(FormContext);
  
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>repository name</th>
            <th>issues open</th>
            <th>stars count</th>
          </tr>
        </thead>
        <tbody>
          { repositories
            .filter(repository => repositoryFilter(repository, formState))
            .map(TableRow) 
          }
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({id, name, open_issues_count, stargazers_count}: Repository)=> (
  <tr key={id}>
    <td className={styles.td}>{name}</td>
    <td className={styles.td}>{open_issues_count}</td>
    <td className={styles.td}>{stargazers_count}</td>
  </tr>
)

function repositoryFilter(repository: Repository, formState: FormState){

  const {name, minimum, maximum} = formState;

  if (name && !repository.name.includes(name)){
    return false;
  }
  else if (minimum && repository.open_issues_count < minimum){
    return false;
  }
  else if (maximum && repository.open_issues_count > maximum){
    return false;
  }

  return true;
}
