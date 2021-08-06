import {
  ChangeEvent, SyntheticEvent, useEffect, useState,
} from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  Radio, RadioGroup,
  CircularProgress, useToast, HStack,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import {
  FaUserAlt, FaPhone, FaAddressBook, FaDollarSign,
} from 'react-icons/fa'
import { ImMail, ImOffice } from 'react-icons/im'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'
import { validateEmail, validateName } from '../../utils/validation'
import { Customer } from '../../utils/types'
import { postCustomer, updateCustomer } from '../../utils/apis/customers'
import NotificationMessage from '../../components/NotificationMessage'
import { formState } from '../../recoil/atoms'
import Breadcrumbs from '../../components/Breadcrumbs'
import { sendLog } from '../../utils/logger'

const CustomerForm = () => {
  const [error, setError] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useRecoilState(formState)
  const history = useHistory()
  const toast = useToast()
  const mutation = useMutation(
    (data: Customer) => {
      if (form.isEdit) {
        return updateCustomer(data.id, data)
      }
      return postCustomer(data)
    },
    {
      onSuccess: (data) => {
        sendLog('info', `${form.isEdit ? 'Update' : 'Add new'} success`, JSON.stringify(data)).then()
        toast({
          title: `Customer is ${form.isEdit ? 'updated' : 'created'}.`,
          description: `We have ${form.isEdit ? 'updated' : 'created'} customer information for you.`,
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        setError(null)
        history.push('/dashboard')
      },
      onError: (err: any) => {
        setError(err.response.data)
        setIsLoading(false)
      },
    },
  )

  const validateForm = () => {
    if (!validateEmail(form.data.email)) {
      setError('Email address is not formatted correctly.')
      return false
    }
    if (!validateName(form.data.name)) {
      setError('First name is not formatted correctly.')
      return false
    }
    return true
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      mutation.mutate(form.data)
    }
  }

  useEffect(() => {
    sendLog('info', 'Customer form mount').then()
  }, [])

  useEffect(() => () => {
    setForm({ ...form, ...{ isEdit: false } })
  }, [])

  return (
    <Flex
      flexDirection="column"
      backgroundColor="gray.200"
      alignItems="center"
    >
      <Breadcrumbs />
      <Stack
        flexDir="column"
        spacing="3rem"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">
          {form.isEdit ? 'Update customer' : 'Add new customer'}
        </Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing="1rem"
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              justify="space-between"
            >

              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Name"
                    defaultValue={form.isEdit ? form.data.name : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ name: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<ImMail color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    defaultValue={form.isEdit ? form.data.email : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ email: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="number"
                    placeholder="Age"
                    defaultValue={form.isEdit ? form.data.age : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ age: +e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaPhone color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Phone"
                    defaultValue={form.isEdit ? form.data.phone : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ phone: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <RadioGroup
                value={form.data.gender}
                onChange={(value: string) => setForm(
                  {
                    ...form,
                    ...{
                      data: {
                        ...form.data, ...{ gender: value },
                      },
                    },
                  },
                )}
              >
                <HStack spacing="1.25rem" justify="space-around">
                  <Radio colorScheme="cyan" size="lg" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="pink" size="lg" value="female">
                    Female
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaAddressBook color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Address"
                    defaultValue={form.isEdit ? form.data.address : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ address: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<ImOffice color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Company"
                    defaultValue={form.isEdit ? form.data.company : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ company: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<FaDollarSign color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Balance"
                    defaultValue={form.isEdit ? form.data.balance : ''}
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setForm(
                            {
                              ...form,
                              ...{
                                data: {
                                  ...form.data, ...{ balance: e.currentTarget.value },
                                },
                              },
                            },
                          )
                        }
                  />
                </InputGroup>
              </FormControl>
              <RadioGroup
                value={form.data.isActive ? 'active' : 'not active'}
                onChange={(value: string) => {
                  const isActive = value === 'active'
                  return setForm(
                    {
                      ...form,
                      ...{
                        data: {
                          ...form.data, ...{ isActive },
                        },
                      },
                    },
                  )
                }}
              >
                <HStack spacing="1.25rem" justify="space-around">
                  <Radio colorScheme="green" size="lg" value="active">
                    Active
                  </Radio>
                  <Radio colorScheme="red" size="lg" value="not active">
                    Not active
                  </Radio>
                </HStack>
              </RadioGroup>
              {error && <NotificationMessage status="error" message={error} />}
              <Button
                borderRadius="1rem"
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="green" />
                ) : (
                  'Submit'
                )}

              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default CustomerForm
