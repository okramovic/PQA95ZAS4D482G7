import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Octokit } from "octokit";
import { OctokitResponse } from '@octokit/types';
import { Organization, Repository } from './apiTypes';
import { Table } from './Components/Table/Table';
import { Pagination } from './Components/Pagination/Pagination';
import { Form } from './Components/Form/Form';
import { formReducer } from './Context/reducer';
import { FormContext, initialFormState } from './Context/formContext';
import { OrganizationSelection } from './Components/OrganizationSelection/OrganizationSelection';

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
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organization|undefined>();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    ;(async()=>{
      const response = await octokit.request('GET /organizations', {headers: defaultHeaders});

      // first one is empty so no Organisation appears to be selected to user (with nothing else visible) at first (see task criteria)
      setOrganizations([{id: -1} as Organization, ...response.data]);
      setIsLoading(false);
    })();
  },[]);

  const fetchAndSetRepositories = async ({newPage, newName}: {newPage?: number, newName?: Organization['login']}) =>{
    setIsLoading(true);
    const repositories = await fetchRepos({
      organization: newName ?? currentOrg!.login, 
      page: newPage ?? page,
    });
    setRepositories(repositories);
    setIsLoading(false);
  }

  const onOrganizationChange = async (newName: string) =>{
    await fetchAndSetRepositories({newName: newName});
    const newOrganisation = organizations.find(({login})=>login === newName);
    setCurrentOrg(newOrganisation);
  };

  const onPageChange = (newPage: number) =>{
    setPage(newPage);
    fetchAndSetRepositories({newPage});
  };

  const onRefetchClick = () =>{
    fetchAndSetRepositories({});
  };

  return (
    <FormContext.Provider value={{formState, dispatch}}>
      <main className={`app ${isLoading ? 'loading' : ''}`}>
        <OrganizationSelection 
          organizations={organizations}
          currentOrganization={currentOrg}
          onOrganizationChange={onOrganizationChange}
        />

        { currentOrg && <Form currentOrg={currentOrg} onRefetchClick={onRefetchClick}/>}

        { currentOrg && <Pagination
            page={page}
            onPageChange={onPageChange}
            hasRepositories={!!repositories.length}
          />
        }

        { currentOrg && <Table repositories={repositories} />}
      </main>
    </FormContext.Provider> 
  );
}

export default App;

async function fetchRepos({organization, page} : {organization: Organization['login'], page: number}){
  try{
    const response: OctokitResponse<Repository[]> = await octokit.request(`GET /orgs/${organization}/repos?${QUERY_PAGE}${page}`, {
      org: 'ORG',
      headers: defaultHeaders,
    });
    return response.data;
  } catch(e){
    console.error(e);
    return [];
  }
}
