import {
  ChangeEvent, SyntheticEvent, useState,
} from 'react';
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
  AlertIcon, Radio, RadioGroup,
  AlertDescription,
  Alert,
  CircularProgress,
} from '@chakra-ui/react';
import { Link as Link2 } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
// import api from '../utils/api';
import { validateEmail, validateName } from '../../utils/validation';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CHiOutlineMail = chakra(HiOutlineMail);

function ErrorMessage({ message }: {message: string}) {
  return (
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
}

const Registration = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<boolean>(true);
  const [birthDate, setBirthDate] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkInformationValid = () => {
    if (!validateEmail(email)) {
      setError('Email address is not formatted correctly.');
      return false;
    }
    if (password !== retypePassword) {
      setError('Password is not matched!');
      return false;
    }
    if (!validateName(firstName)) {
      setError('First name is not formatted correctly.');
      return false;
    }
    if (!validateName(lastName)) {
      setError('Last name is not formatted correctly.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (checkInformationValid()) {
      const formattedBirthdate = new Date(birthDate).getTime();
      setIsLoading(true);
      const user = {
        username,
        firstName,
        lastName,
        email,
        gender,
        birthDate: formattedBirthdate,
        password,
      };
      setTimeout(() => {
        console.log(user);
        setIsLoading(false);
        setError(null);
      }, 500);
    }
  };

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
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              justify="space-between"
            >

              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Username"
                    onChange={
                      (e: ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)
                    }
                  />
                </InputGroup>
              </FormControl>
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
                    placeholder="Last Name"
                    onChange={
                      (e: ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)
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
              <RadioGroup
                defaultValue="male"
                onChange={(value: string) => setGender(value === 'male')}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" size="lg" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" size="lg" value="female">
                    Female
                  </Radio>
                </Stack>
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
                      setBirthDate(e.currentTarget.value);
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
                      (e: ChangeEvent<HTMLInputElement>) => setRetypePassword(e.currentTarget.value)
                    }
                  />
                </InputGroup>
              </FormControl>
              {error && <ErrorMessage message={error} />}
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
        <Link color="teal.500">
          <Link2 to="/login">Login</Link2>
        </Link>
      </Box>
    </Flex>
  );
};

export default Registration;
