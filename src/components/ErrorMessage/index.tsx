import {
  Alert, AlertDescription, AlertIcon, Box,
} from '@chakra-ui/react';

interface IProps {
  message: string
}

const ErrorMessage = ({ message }: IProps) => (
  <Box my={4}>
    <Alert status="error" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>
        {' '}
        {message}
      </AlertDescription>
    </Alert>
  </Box>
);

export default ErrorMessage;
