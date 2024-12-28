'use client'

import PageHeader from '../_components/PageHeader'
import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import { useCreateIssueMutation } from '@/gql/issuesMutations'
import { IssueType, useQueryIssues } from '@/gql/issuesQueries'
import Issue from '../_components/Issue'

const IssuesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [issueName, setIssueName] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [_, createIssue] = useCreateIssueMutation()
  // const [issues, setIssues] = useState<IssueType[]>([])
  // const [data] = useQueryIssues({ input: { statuses: ['DONE', 'BACKLOG'] } })
  const [{ data, fetching, error }, reFetch] = useQueryIssues()
  const issues = data?.issues || []

  // useEffect(() => {
  //   if (data?.issues) {
  //     setIssues(data?.issues)
  //   }
  // }, [data])

  const onCreate = async (close: () => void) => {
    if (issueDescription.trim() === '' || issueName.trim() === '') {
      return
    }

    const response = await createIssue({
      input: { content: issueDescription, name: issueName },
    })

    if (response.data) {
      close()
      setIssueName('')
      setIssueDescription('')
      reFetch()

      // setIssues((prev) => [response.data?.createIssue!, ...prev])
    }
  }

  return (
    <div>
      <PageHeader title="All issues">
        <Tooltip content="New Issue">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </PageHeader>

      {fetching && (
        <div className="p-5 ">
          <Spinner />
        </div>
      )}
      {!fetching && issues?.length === 0 && (
        <i className=" block select-none p-5 text-slate-400">
          There is no issues yet
        </i>
      )}
      {issues.map((issue) => (
        <div key={issue.id}>
          <Issue issue={issue} />
        </div>
      ))}

      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New issue</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Issue name"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Issue description"
                    className="bg-white"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    classNames={{
                      inputWrapper: 'bg-white border-none shadow-none p-0',
                      base: 'bg-white p-0',
                      input: 'bg-white p-0',
                      innerWrapper: 'bg-white p-0',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="ghost" onPress={() => onOpenChange()}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Issue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default IssuesPage
