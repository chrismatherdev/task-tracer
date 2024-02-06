import { useEffect, useState } from 'react';
import { TextInput, PasswordInput, Text, Box, Paper, Group, Button, Divider, Anchor, Stack } from '@mantine/core';
import { register } from '../api/auth';
import { LoginData } from '../interfaces/login-data';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth';

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch, user } = useAuthContext();

  const goToLogin = () => {
    navigate('/login');
  };

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const onRegister = async (event: React.FormEvent<HTMLFormElement>, data: LoginData) => {
    event?.preventDefault();

    try {
      setLoading(true);
      const response = await register(data);
      localStorage.setItem('user', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
      navigate('/dashboard');
    } catch (error: any) {
      setError('This user already exists. Please register with a different username.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <Box p={50}>
      <Paper radius='md' p='xl'>
        <Text size='lg' fw={500}>
          Welcome to TaskTracer
        </Text>

        <Divider my='lg' />

        <form onSubmit={(event) => onRegister(event, form.values)}>
          <Stack>
            <TextInput
              label='First name'
              placeholder='Your first name'
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              radius='md'
            />

            <TextInput
              label='Last name'
              placeholder='Your last name'
              value={form.values.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              radius='md'
            />

            <TextInput
              required
              label='Username'
              placeholder='Enter your desired username'
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              radius='md'
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius='md'
            />
          </Stack>

          <Group justify='space-between' mt='xl'>
            <Anchor component='button' type='button' c='dimmed' onClick={() => goToLogin()} size='xs'>
              Already have an account? Login here!
            </Anchor>
            {error && <div>{error}</div>}
            <Button type='submit' radius='sm' disabled={loading}>
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
