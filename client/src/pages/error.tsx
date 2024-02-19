import { Box, Button, Container, Group, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/Error.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.label}>Uh-oh</Box>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size='lg' ta='center' className={classes.description}>
          Our servers could not handle your request. Please try refreshing your page.
        </Text>
        <Group justify='center'>
          <Button variant='white' onClick={() => goToHome()} size='md'>
            Return to home
          </Button>
        </Group>
      </Container>
    </Box>
  );
};

export default ErrorPage;
