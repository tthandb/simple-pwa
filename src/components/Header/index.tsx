import {
  Flex, Heading, HStack, Stack, Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import UserMenu from './UserMenu'
import userState from '../../recoil/atoms/user'

interface PayLoad extends JwtPayload {
  email: string
}

const Header = () => {
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    if (user.email === '') {
      const token = localStorage.getItem('access_token') || ''
      const { email } = jwtDecode<PayLoad>(token)
      setUser({ ...user, ...{ email } })
    }
  }, [])

  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      w="100%"
      p="1.5rem"
      bg="teal.500"
      color="white"
      shadow="xl"
    >
      <HStack w="container.xl" px="1rem" justify="space-between" alignItems="center">
        <Link className="cursor-pointer" to="/home">
          <Heading>This is LOGO</Heading>
        </Link>
        <Stack
          spacing={8}
          align="center"
          justify="center"
          direction="row"
        >
          {/* <MenuItem to="/">Home</MenuItem> */}
          <Text>{user.email}</Text>
          <UserMenu name={user.email} />
        </Stack>
      </HStack>
    </Flex>
  )
}

export default Header
