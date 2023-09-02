import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Octokit } from "octokit";
import { OctokitResponse } from '@octokit/types';
import { Organisation, Repository } from './apiTypes';
import { Table } from './Components/Table/Table';
import { Pagination } from './Components/Pagination/Pagination';
import { Form } from './Components/Form/Form';
import { formReducer } from './Context/reducer';
import { FormContext, initialFormState } from './Context/formContext';

const TOKEN = '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',
QUERY_PAGE = 'page=';

const octokit = new Octokit({
  auth: TOKEN,
});

const defaultHeaders = {
  accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28', // latest api version
};

function App() {

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organizations, setOrganizations] = useState<Organisation[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organisation|undefined>();
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [page, setPage] = useState(1);

  useEffect(()=>{
    ;(async()=>{
      const response = await octokit.request('GET /organizations', {headers: defaultHeaders});

      // first one is empty so no Organisation is selected (with nothing else visible) at first (see criteria)
      setOrganizations([{id: -1} as Organisation, ...response.data]);
      setIsLoading(false);
    })();
  },[]);

  const onOrganizationSelect = async (ev: React.ChangeEvent<HTMLSelectElement>) =>{
    setIsLoading(true);
    const organisationName = ev.target.value;

    const repositories =  await fetchRepos({organisationName, page});
    setRepositories(repositories);
    const newOrganisation = organizations.find(({login})=>login === organisationName);
    setCurrentOrg(newOrganisation);
    setIsLoading(false);
  };

  const onPageChange = async (newPage: number)=>{
    setIsLoading(true);
    setPage(newPage);
    const repos = await fetchRepos({organisationName: currentOrg!.login, page: newPage});
    setRepositories(repos);
    setIsLoading(false);
  };

  return (
    <FormContext.Provider value={{formState, dispatch}}>
      <div className={`app ${isLoading ? 'loading' : ''}`}>
        <div className='form-row'>
          <label htmlFor='organization-selection'>
            select organization
          </label>
          { !!organizations.length && <select
              onChange={onOrganizationSelect}
              value={currentOrg?.login}
              id='organization-selection'
            >
              { organizations
                .map(({id, login}) =>(
                  <option key={id} value={login}>
                    {login}
                  </option>
                ))
              }
            </select>
          }
        </div>

        {currentOrg && <Form currentOrg={currentOrg}/>}

        { currentOrg && <Pagination
            page={page}
            onPageChange={onPageChange}
            hasRepositories={!!repositories.length}
          />
        }

        { currentOrg && <Table repositories={repositories} />}
      </div>
    </FormContext.Provider> 
  );
}

export default App;

async function fetchRepos({organisationName, page} : {organisationName: string, page: number}){
  try{
    const response: OctokitResponse<Repository[]> = await octokit.request(`GET /orgs/${organisationName}/repos?${QUERY_PAGE}${page}`, {
      org: 'ORG',
      headers: defaultHeaders,
    })
    return response.data;
  } catch(e){
    console.error(e)
    return []
  }
}
