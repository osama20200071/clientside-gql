import { cacheExchange, gql, useMutation } from 'urql'
import { IssueType } from './issuesQueries'

export const createIssueMutation = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      content
      id
      name
      status
    }
  }
`
export const editIssueMutation = gql`
  mutation EditIssue($input: EditIssueInput!) {
    editIssue(input: $input) {
      id
      createdAt
      status
      name
      content
    }
  }
`

export const deleteIssueMutation = gql`
  mutation Mutation($deleteIssueId: ID!) {
    deleteIssue(id: $deleteIssueId)
  }
`

type createIssueResponse = {
  createIssue: IssueType
}

type createIssueInput = {
  content: string
  name: string
}
type createIssueVariables = {
  input: createIssueInput
}

type updateIssueInput = {
  input: RequireOnly<IssueType, 'id'>
}

type editIssueResponse = {
  editIssue: IssueType
}

type deleteIssueVariables = {
  deleteIssueId: string
}

export const useCreateIssueMutation = () =>
  useMutation<createIssueResponse, createIssueVariables>(createIssueMutation)

export const useEditIssueMutation = () =>
  useMutation<editIssueResponse, updateIssueInput>(editIssueMutation)

export const useDeleteIssueMutation = () =>
  useMutation<{}, deleteIssueVariables>(deleteIssueMutation)
