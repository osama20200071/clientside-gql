import { IssueType, queryIssues, useQueryIssues } from '@/gql/issuesQueries'
import Status from './Status'
import { Trash } from 'lucide-react'
import { useDeleteIssueMutation } from '@/gql/issuesMutations'

const Issue = ({ issue }: { issue: IssueType }) => {
  const displayId = issue.id.split('-').pop()?.slice(-3)

  const [{ fetching }, deleteIssue] = useDeleteIssueMutation()

  const deleteHandler = async () => {
    await deleteIssue({ deleteIssueId: issue.id })
  }

  return (
    <div className="px-4 h-[40px] border-b flex items-center justify-between hover:bg-slate-50">
      <div className="flex items-center gap-4">
        <span className=" text-sm text-slate-300 w-[80px]">
          {`PAR-${displayId}`.toUpperCase()}
        </span>
        <Status status={issue.status} issueId={issue.id} />
        <span>{issue.name}</span>
      </div>
      <button onClick={deleteHandler}>
        <Trash color="red" size={15} className=" hover:animate-pulse" />
      </button>
    </div>
  )
}

export default Issue
