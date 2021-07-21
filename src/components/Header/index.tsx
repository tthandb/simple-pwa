import {
  Button,
  Flex, Heading, Stack,
} from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import MenuItem from './MenuItem'
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
      justify="space-between"
      w="100%"
      mb={8}
      p={6}
      bg="teal.500"
      color="white"
    >
      <Heading>This is LOGO</Heading>
      <Stack
        spacing={8}
        align="center"
        justify="center"
        direction="row"
      >
        <MenuItem to="/">Home</MenuItem>
        <UserMenu name={user.email} />
      </Stack>
    </Flex>
  )
}

export default Header
