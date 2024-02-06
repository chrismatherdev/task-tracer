import { useEffect, useState } from 'react';
import { TextInput, PasswordInput, Text, Box, Paper, Group, Button, Divider, Anchor, Stack } from '@mantine/core';
import { login } from '../api/auth';
import { LoginData } from '../interfaces/login-data';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch, user } = useAuthContext();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const goToRegister = () => {
    navigate('/register');
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>, data: LoginData) => {
    event?.preventDefault();

    try {
      setLoading(true);
      const response = await login(data);
      localStorage.setItem('user', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
      navigate('/dashboard');
    } catch (error) {
      setError('Incorrect username or password. Please try again.');
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

        <form onSubmit={(event) => onLogin(event, form.values)}>
          <Stack>
            <TextInput
              required
              label='Username'
              placeholder='Your username'
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
            <Anchor component='button' type='button' c='dimmed' onClick={() => goToRegister()} size='xs'>
              Don't have an account? Register here!
            </Anchor>
            {error && <div>{error}</div>}
            <Button type='submit' radius='sm' disabled={loading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
