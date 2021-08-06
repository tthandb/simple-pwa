import {
  Tr,
  Td,
  Icon,
  IconButton,
  ButtonGroup,
  Center,
} from '@chakra-ui/react'
import {
  FiCheckCircle, FiXCircle, FiTrash2, FiEdit,
} from 'react-icons/fi'
import { IoMdFemale, IoMdMale } from 'react-icons/io'
import { Customer } from '../../../utils/types'
import { sendLog } from '../../../utils/logger'

interface IRow {
  data: Customer,
  handleEdit: (id: number | undefined) => void
  onClickDeleteButton: (id: number | undefined) => void,
  onOpen: () => void
}

const Row = (props: IRow) => {
  const {
    data, handleEdit, onClickDeleteButton, onOpen,
  } = props

  return (
    <>
      <Tr>
        <Td>
          <Center>{data.id}</Center>
        </Td>
        <Td px="0.1rem">{data.name}</Td>
        <Td pl="0.1rem">
          <Center>
            {data.gender === 'male'
              ? <Icon as={IoMdMale} color="blue.500" w="5" h="5" />
              : <Icon as={IoMdFemale} color="pink.500" w="5" h="5" />}
          </Center>
        </Td>
        <Td px="0.1rem">
          <Center>{data.age}</Center>
        </Td>
        <Td>{data.phone}</Td>
        <Td px="0.1rem">{data.email}</Td>
        <Td px="0.1rem">{data.address}</Td>
        <Td px="0.1rem"><Center>{data.company}</Center></Td>
        <Td><Center>{data.balance}</Center></Td>
        <Td px="0">
          <Center>
            {data.isActive
              ? <Icon as={FiCheckCircle} color="green.500" w="5" h="5" />
              : <Icon as={FiXCircle} color="red.500" w="5" h="5" />}
          </Center>
        </Td>
        <Td px="0.1rem">
          <ButtonGroup isAttached>
            <IconButton
              size="sm"
              bg="transparent"
              aria-label="Edit"
              icon={<Icon as={FiEdit} />}
              onClick={() => handleEdit(data.id)}
            />
            <IconButton
              size="sm"
              bg="transparent"
              aria-label="Delete"
              icon={<Icon as={FiTrash2} />}
              onClick={() => {
                sendLog('info', 'Click delete button').then()
                onClickDeleteButton(data.id)
                onOpen()
              }}
            />
          </ButtonGroup>
        </Td>
      </Tr>

    </>

  )
}

export default Row
