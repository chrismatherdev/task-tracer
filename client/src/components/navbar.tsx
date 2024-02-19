import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChecklist, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { ActionIcon, Avatar, Button, Divider, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { useAuthContext } from '../hooks/use-auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const onButtonClick = (route: string) => {
    if (route === 'login') {
      navigate('/login');
    } else if (route === 'register') {
      navigate('/register');
    } else if (route === 'home') {
      navigate('/');
    } else if (route === 'logout') {
      console.log('logout!');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    }
  };

  return (
    <React.Fragment>
      <Flex align='center' justify='space-between' h={75} p={20}>
        <Flex align='center'>
          <IconChecklist />
          <Text style={{ cursor: 'pointer' }} onClick={() => onButtonClick('home')} size='xl' fw={700}>
            TaskTracer
          </Text>
        </Flex>
        <Flex align='center'>
          {user && (
            <React.Fragment>
              <Avatar color='cyan' radius='xl' mr='10px'>
                <IconUser />
              </Avatar>
              <Button variant='outline' mr='10px' onClick={() => onButtonClick('logout')}>
                Logout
              </Button>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <Button variant='outline' mr='10px' onClick={() => onButtonClick('login')}>
                Login
              </Button>
              <Button variant='outline' mr='10px' onClick={() => onButtonClick('register')}>
                Register
              </Button>
            </React.Fragment>
          )}
          <ActionIcon size='lg' onClick={() => toggleColorScheme()} title='Toggle color scheme'>
            {dark ? <IconSun width={20} height={20} /> : <IconMoon width={20} height={20} />}
          </ActionIcon>
        </Flex>
      </Flex>
      <Divider size='xs' />
    </React.Fragment>
  );
};

export default Navbar;
