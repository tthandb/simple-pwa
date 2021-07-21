import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Center,
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useToast, Box,
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useMutation } from 'react-query'
import { Customer } from '../../../utils/types'
import { formState } from '../../../recoil/atoms'
import { deleteCustomer } from '../../../utils/api'
import Row from './Row'

interface IProps {
  data: Customer[] | undefined,
  refetch: any,
  backUpCurrentPage: () => void
}

const CustomersTable = (props: IProps) => {
  const { data, refetch, backUpCurrentPage } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory()
  const toast = useToast()
  const setFormState = useSetRecoilState(formState)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [deletedId, setDeletedId] = useState<number | null>(null)
  const mutation = useMutation((id: number) => deleteCustomer(id), {
    onSuccess:
        (_, variables) => {
          backUpCurrentPage()
          refetch()
          toast({
            title: 'Deleted successfully.',
            description: `Customer #${variables} is deleted successfully.`,
            status: 'success',
            duration: 1000,
            isClosable: true,
          })
          onClose()
        },
  })
  const handleEdit = (id: number) => {
    const customer = data?.find((e) => e.id === id)
    if (customer) {
      setFormState({
        isEdit: true,
        data: customer,
      })
      history.push(`/home/${customer.id}`)
    }
  }

  const getCustomerId = (id: number) => {
    setDeletedId(id)
  }
  const handleDelete = () => {
    if (deletedId != null) {
      mutation.mutate(deletedId)
      setDeletedId(null)
    }
  }
  return (
    <Box>
      <Table variant="striped" colorScheme="blackAlpha" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th px="0.1rem"><Center>Name</Center></Th>
            <Th pl="0.1rem"><Center>Gender</Center></Th>
            <Th px="0.1rem"><Center>Age</Center></Th>
            <Th><Center>Phone</Center></Th>
            <Th px="0.1rem"><Center>Email</Center></Th>
            <Th px="0.1rem"><Center>Address</Center></Th>
            <Th px="0.1rem"><Center>Company</Center></Th>
            <Th><Center>Balance</Center></Th>
            <Th px="0">Active</Th>
            <Th px="0.1rem"><Center>Action</Center></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((e) => (
            <Row
              data={e}
              key={e.id}
              handleEdit={handleEdit}
              onClickDeleteButton={getCustomerId}
              onOpen={onOpen}
            />
          ))}
        </Tbody>
      </Table>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete customer?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this customer? You can not undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  )
}

export default CustomersTable
