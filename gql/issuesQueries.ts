import { gql, useQuery } from 'urql'

export const queryIssues = gql`
  query Issues($input: IssuesFilterInput) {
    issues(input: $input) {
      content
      id
      name
      status
      createdAt
    }
  }
`
export type IssueType = {
  content: string
  id: string
  name: string
  status: StatusType
  createdAt: Date
}

export type StatusType = 'BACKLOG' | 'TODO' | 'INPROGRESS' | 'DONE'

type QueryIssuesInput = {
  statuses: StatusType[]
}

type QueryIssuesResponse = {
  issues: IssueType[]
}

type QueryIssuesVariables = {
  input?: QueryIssuesInput
}

export const useQueryIssues = (pause?: boolean, params?: QueryIssuesVariables) =>
  useQuery<QueryIssuesResponse, QueryIssuesVariables>({
    query: queryIssues,
    variables: { input: params?.input },
    pause: pause || false,
  })
