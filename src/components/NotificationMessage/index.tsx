import {
  Alert, AlertDescription, AlertIcon, Box, Text,
} from '@chakra-ui/react'

interface IProps {
  status: 'success' | 'error' | 'warning' | 'info',
  message: string,
}

const NotificationMessage = ({ status, message }: IProps) => (
  <Box my="4">
    <Alert status={status} borderRadius={4} variant="left-accent">
      <AlertIcon />
      <Text fontSize="sm">
        {message}
      </Text>
    </Alert>
  </Box>
)

export default NotificationMessage
