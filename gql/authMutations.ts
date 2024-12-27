import { gql, useMutation } from '@urql/next'

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput!) {
    createUser(input: $input) {
      thing: token
    }
  }
`
// for renaming

export const SigninMutation = gql`
  mutation Signin($input: AuthInput!) {
    signin(input: $input) {
      token
    }
  }
`

export const useSignupMutation = () =>
  useMutation<SignupResponse, AuthVariables>(SignupMutation)
export const useSigninMutation = () =>
  useMutation<SigninResponse, AuthVariables>(SigninMutation)
