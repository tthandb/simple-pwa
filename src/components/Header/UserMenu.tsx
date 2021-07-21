import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Link, Icon, Avatar,
} from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { useSetRecoilState } from 'recoil'
import { tokenState } from '../../recoil/atoms'

interface IProps {
  name: string
}

const UserMenu = (props: IProps) => {
  const { name } = props
  const setToken = useSetRecoilState(tokenState)
  const handleLogout = () => {
    localStorage.clear()
    setToken({
      accessToken: '',
      expiredTime: '',
    })
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Avatar name={name} src="https://bit.ly/broken-link" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader color="grey">
          Hi,
          {' '}
          {name}
          !
        </PopoverHeader>
        <PopoverBody>
          <Link color="grey" onClick={handleLogout}>
            <Icon as={FiLogOut} w="5" h="5" />
            {' '}
            Logout
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default UserMenu
