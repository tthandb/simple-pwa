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
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  Radio, RadioGroup,
  CircularProgress, useToast, HStack,
} from '@chakra-ui/react'
import { Link as Link2, useHistory } from 'react-router-dom'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useMutation } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { validateEmail, validateName } from '../../utils/validation'
import { UserInformation } from '../../utils/types'
import { postRegister } from '../../apis'
import NotificationMessage from '../../components/NotificationMessage'
import userState from '../../recoil/atoms/user'
import { sendErrorLog, sendLog } from '../../utils/logger'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
const CHiOutlineMail = chakra(HiOutlineMail)

const Registration = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [gender, setGender] = useState<boolean>(true)
  const [birthDate, setBirthDate] = useState<string>('')
  const [retypePassword, setRetypePassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const setUserGlobal = useSetRecoilState(userState)
  const history = useHistory()
  const toast = useToast()

  const mutation = useMutation(
    (data: UserInformation) => postRegister(data),
    {
      onSuccess: (data, variables) => {
        sendLog('info', 'Registration success').then()
        const { accessToken } = (data as any)
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('last_login', Date.now().toString())
        toast({
          title: 'Account created.',
          description: 'We\'ve created your account.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setUserGlobal(variables)
        setError(null)
        history.push('/home')
      },
      onError: (err: any) => {
        sendErrorLog(err)
        setError(err.response.data)
        setIsLoading(false)
      },
    },
  )

  const validateForm = () => {
    if (!validateEmail(email)) {
      setError('Email address is not formatted correctly.')
      return false
    }
    if (password !== retypePassword) {
      setError('Password is not matched!')
      return false
    }
    if (!validateName(firstName)) {
      setError('First name is not formatted correctly.')
      return false
    }
    if (!validateName(lastName)) {
      setError('Last name is not formatted correctly.')
      return false
    }
    return true
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    sendLog('info', 'Click button "Submit"').then(() => true)
    if (validateForm()) {
      setIsLoading(true)
      const user = {
        firstName,
        lastName,
        email,
        gender,
        birthDate,
        password,
      }
      mutation.mutate(user)
    }
  }

  useEffect(() => {
    sendLog('info', 'Registration page mount').then(() => true)
  }, [])

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Registration</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing="1rem"
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              alignItems="center"
            >
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CHiOutlineMail color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="First Name"
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)
                        }
                  />
                </InputGroup>
              </FormControl>
              <RadioGroup
                w="100%"
                defaultValue="male"
                onChange={(value: string) => setGender(value === 'male')}
              >
                <HStack spacing="1rem" justifyContent="space-around">
                  <Radio colorScheme="green" size="lg" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" size="lg" value="female">
                    Female
                  </Radio>
                </HStack>
              </RadioGroup>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input
                    type="date"
                    value={birthDate}
                    min="1900-01-01"
                    max="2021-01-01"
                    placeholder="Email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setBirthDate(e.currentTarget.value)
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)
                        }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    onChange={
                          // eslint-disable-next-line max-len
                          (e: ChangeEvent<HTMLInputElement>) => setRetypePassword(e.currentTarget.value)
                        }
                  />
                </InputGroup>
              </FormControl>
              {error && <NotificationMessage status="error" message={error} />}
              <Button
                borderRadius={0}
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
      <Box>
        Have an account yet?
        {' '}
        <Link as={Link2} color="teal.500" to="/login">
          Login
        </Link>
      </Box>
    </Flex>
  )
}

export default Registration
