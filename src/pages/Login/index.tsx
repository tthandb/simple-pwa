import {
  ChangeEvent, SyntheticEvent, useEffect, useRef, useState,
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
  FormHelperText,
  InputRightElement,
  CircularProgress, useToast, Text, Icon, Checkbox, HStack,
} from '@chakra-ui/react'
import {
  FaUserAlt, FaLock, FaEye, FaEyeSlash,
} from 'react-icons/fa'
import { Link as Link2, useHistory } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'
import NotificationMessage from '../../components/NotificationMessage'
import { postLogin, authorizationProvider } from '../../utils/apis'
import { User } from '../../utils/types'
import { validateEmail } from '../../utils/validation'
import { tokenState, userState } from '../../recoil/atoms'
import { sendErrorLog, sendLog } from '../../utils/logger'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = () => {
  const [user, setUser] = useState<User>({
    email: 'test1@mail.xxx',
    password: '123456',
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRemembered, setIsRemembered] = useState<boolean>(true)
  const history = useHistory()
  const toast = useToast()
  const setUserGlobal = useSetRecoilState(userState)
  const setToken = useSetRecoilState(tokenState)
  const mutation = useMutation(
    (data: User) => postLogin(data),
    {
      onSuccess: (data, variables) => {
        sendLog('info', 'Sign in success').then()
        const { accessToken } = (data as any)
        const expiredTime = Date.now().toString()
        authorizationProvider(accessToken)
        setToken({ accessToken, expiredTime })
        if (isRemembered) {
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('last_login', expiredTime)
        }
        toast({
          title: 'Login successfully.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        setUserGlobal(variables)
        setIsLoading(false)
        setError(null)
        history.push('/home')
      },
      onError: (err: any) => {
        sendErrorLog(err)
        setError('The provided username or password is not correct. Please try again')
        setIsLoading(false)
      },
    },
  )

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    sendLog('info', 'Click button "Sign in"').then((r) => true)
    setIsLoading(true)
    mutation.mutate(user)
  }

  const handleShowClick = () => {
    if (!showPassword) {
      sendLog('info', 'Click button "show password" to show password').then((r) => true)
    } else {
      sendLog('info', 'Click button "show password" to hide password').then((r) => true)
    }

    setShowPassword(!showPassword)
  }

  useEffect(() => {
    sendLog('info', 'Login page mount').then((r) => true)
    setToken({
      accessToken: localStorage.getItem('access_token'),
      expiredTime: localStorage.getItem('last_login'),
    })
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
        mb="0.5rem"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Login</Heading>
        <Box w="30rem">
          <form onSubmit={handleSubmit}>
            <Stack
              spacing="1.25rem"
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              justify="space-between"
            >
              {error && <NotificationMessage status="error" message={error} />}
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Email"
                    defaultValue="test1@mail.xxx"
                    isRequired
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setUser(
                            { ...user, ...{ email: e.currentTarget.value } },
                          )
                        }
                  />
                </InputGroup>
                {!validateEmail(user.email)
                  && (
                  <NotificationMessage
                    status="error"
                    message="Password must contain at least 8 characters and include letters,
                  numbers and special characters."
                  />
                  )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    defaultValue="123456"
                    isRequired
                    onChange={
                          (e: ChangeEvent<HTMLInputElement>) => setUser(
                            { ...user, ...{ password: e.currentTarget.value } },
                          )
                        }
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {!showPassword ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
                    </Button>

                  </InputRightElement>
                </InputGroup>
                <HStack justify="space-between" mt="1rem">
                  <Checkbox
                    size="sm"
                    colorScheme="teal"
                    defaultIsChecked
                    onChange={(
                      e: ChangeEvent<HTMLInputElement>,
                    ) => setIsRemembered(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <FormHelperText textAlign="right">
                    <Link>Forgot password?</Link>
                  </FormHelperText>
                </HStack>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="1.5rem" color="teal" />
                ) : (
                  'Sign In'
                )}

              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Do not have an account yet?
        {' '}
        <Link
          as={Link2}
          color="teal.500"
          to="/registration"
          onClick={() => sendLog('info', 'Click button "Sign up" when not have account')
            .then((r) => true)}
        >
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
