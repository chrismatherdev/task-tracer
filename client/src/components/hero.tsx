import { Container, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component='span' variant='gradient' gradient={{ from: 'blue', to: 'cyan' }} inherit>
            modern
          </Text>{' '}
          task application
        </h1>

        <Text className={classes.description} c='dimmed'>
          Create and monitor your tasks no matter the difficulty. Customise and split your tasks into manageable
          subtasks and watch your productivity grow.
        </Text>

        <Group className={classes.controls}>
          <Button
            size='xl'
            className={classes.control}
            onClick={goToRegister}
            variant='gradient'
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default Hero;
