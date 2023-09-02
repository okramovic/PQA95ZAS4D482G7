import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Organization, Repository } from './apiTypes';
import { fetchOrganizations, fetchRepos } from './utils';
import { Table } from './Components/Table/Table';
import { Pagination } from './Components/Pagination/Pagination';
import { Form } from './Components/Form/Form';
import { formReducer } from './Context/reducer';
import { FormContext, initialFormState } from './Context/formContext';
import { OrganizationSelection } from './Components/OrganizationSelection/OrganizationSelection';
import { LoadingIndicator } from './Components/LoadingIndicator/LoadingIndicator';

function App() {

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organization|undefined>();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    ;(async()=>{
      const organizations = await fetchOrganizations();

      // first one is fake empty Org so that no Organisation appears to be selected to the user
      // (with nothing else visible) at first (see task criteria)
      setOrganizations([{id: -1} as Organization, ...organizations]);
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
  };

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
      <main className={`app ${isLoading ? 'loading' : ''}`}>
        <OrganizationSelection 
          organizations={organizations}
          currentOrganization={currentOrg}
          onOrganizationChange={onOrganizationChange}
        />
        { isLoading && <LoadingIndicator/>}

        { currentOrg && 
            <FormContext.Provider value={{formState, dispatch}}>
              <>
                <Form
                  currentOrg={currentOrg}
                  onRefetchClick={onRefetchClick}
                />

                <Pagination
                  page={page}
                  onPageChange={onPageChange}
                  hasRepositories={!!repositories.length}
                />

                <Table repositories={repositories} />
              </>
            </FormContext.Provider> 
        }
      </main>
  );
}

export default App;
