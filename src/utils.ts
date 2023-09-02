import { Octokit } from "octokit";
import { OctokitResponse } from '@octokit/types';
import { Organization, Repository } from "./apiTypes";

const defaultHeaders = {
  accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28', // the latest and only api version
};

const QUERY_PAGE = 'page=';

const octokit = new Octokit();

export function isNumber(value: unknown){
  return typeof value === 'number';
}

export async function fetchRepos({organization, page}:{organization: Organization['login'], page: number}){
  try{
    const response: OctokitResponse<Repository[]> = await octokit.request(`GET /orgs/${organization}/repos?${QUERY_PAGE}${page}`, {
      org: 'ORG',
      headers: defaultHeaders,
    });
    if (response.status === 200){
      return response.data;
    } else {
      window.alert(`loading repositories did not work out, status returned: ${response.status}`);
      return [];
    };
  } catch(e){
    console.error(e);
    return [];
  }
}

export async function fetchOrganizations(){
  try {
    const response = await octokit.request('GET /organizations', {headers: defaultHeaders});
    if (response.status === 200){
      return response.data;
    } else {
      window.alert(`loading organizations did not work out, status returned: ${response.status}`);
      return [];
    }
  } catch (e){
    console.error(e);
    return [];
  }
}
