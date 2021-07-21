import { Link, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Link as Link2, useHistory } from 'react-router-dom'

interface IMenuItem {
  children: ReactNode,
  to: string,
}

const MenuItem = ({ children, to = '/home' }: IMenuItem) => (
  <Link as={Link2} to={to}>
    <Text display="block">
      {children}
    </Text>
  </Link>
)
export default MenuItem
