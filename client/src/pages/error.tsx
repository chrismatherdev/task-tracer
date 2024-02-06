import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/Error.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>Uh-oh</div>
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
    </div>
  );
};

export default ErrorPage;
