import React, { useEffect, useState } from 'react';
import Hero from '../components/hero';
import { Flex, Loader } from '@mantine/core';
import { useAuthContext } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (user?.token) {
      console.log(user.token, 'user token');
      navigate('/dashboard');
    }

    setLoading(false);
  }, [user]);

  return (
    <React.Fragment>
      {loading && (
        <Flex align='center' justify='center' p='20px'>
          <Loader color='blue' size='lg' />
        </Flex>
      )}
      {!loading && <Hero />}
    </React.Fragment>
  );
};

export default Homepage;
