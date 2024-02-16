'use client';

import { Alert, Box, CircularProgress, FormGroup, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@stitches/react';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Loginimage from '../../../../images/login/login.jpg';
import '../../globals.css';
import { East, RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [ispasswordVisible, setIspasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successmessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  // password hide and show handle change functionality
  const handleVisiblity = () => {
    setIspasswordVisible(!ispasswordVisible);
  };

  // call useForm
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  
  // handle submit function
  const onSubmit = (data: any) => {
    setLoading(true);
    //clearing prev. messages
    setErrorMessage('');
    setSuccessMessage('');

    // user data object
    const userObject = {
      email: data?.email || '',
      password: data?.password || '',
    };

    // api call
    axios
      .post(`${process.env.NEXT_APP_API_URL}/user/login`, userObject)
      .then((res) => {
        localStorage.setItem('forms', JSON.stringify(res?.data?.user));
        setSuccessMessage(res?.data?.message);
        // @ts-ignore
        setInterval(router.push('/blogs') && setLoading(false), 5000);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message);
      });
  };
  return (
    <>
      <Head>
        <title>Login | Blog App</title>
      </Head>
      <Box sx={{ px: { xs: 2, lg: 0 }, background: '#fff' }}>
        <Box className='logo'>BLOG_</Box>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: '#fff',
            }}
          >
            <Box sx={{ textAlign: 'left', width: '400px' }}>
              <p className='login_title'>Login</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {successmessage && (
                  <FormGroup sx={{ my: 5, position: 'relative' }}>
                    <Alert severity='success'>{successmessage}.</Alert>
                  </FormGroup>
                )}
                {errorMessage && (
                  <FormGroup sx={{ my: 5, position: 'relative' }}>
                    <Alert severity='error'>{errorMessage}.</Alert>
                  </FormGroup>
                )}
                <FormGroup sx={{ my: 5, position: 'relative' }}>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <>
                        <input
                          placeholder='Email'
                          className='input_field'
                          type='email'
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      </>
                    )}
                    name={'email'}
                    control={control}
                    rules={{ required: 'Email field is required' }}
                  />
                  {errors['email'] && (
                    <span
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px',
                      }}
                    >
                      {errors['email'].message}
                    </span>
                  )}
                </FormGroup>
                <FormGroup sx={{ my: 5, position: 'relative' }}>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <>
                        <input
                          placeholder='Password'
                          className='input_field'
                          type={ispasswordVisible ? 'text' : 'password'}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        {!ispasswordVisible ? (
                          <RemoveRedEye
                            onClick={handleVisiblity}
                            sx={{
                              position: 'absolute',
                              cursor: 'pointer',
                              right: '10px',
                              top: '9px',
                            }}
                          />
                        ) : (
                          <VisibilityOff
                            onClick={handleVisiblity}
                            sx={{
                              position: 'absolute',
                              cursor: 'pointer',
                              right: '10px',
                              top: '9px',
                            }}
                          />
                        )}
                      </>
                    )}
                    name={'password'}
                    control={control}
                    rules={{ required: 'Password field is required' }}
                  />
                  {errors['password'] && (
                    <span
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px',
                      }}
                    >
                      {errors['password'].message}
                    </span>
                  )}
                </FormGroup>
                <FormGroup
                  sx={{
                    my: 5,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'end',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'end',
                      flexDirection: 'column',
                    }}
                  >
                    <button type='submit' className='login_button'>
                      Login{'  '}
                      <span>
                        {isLoading ? (
                          <CircularProgress
                            size={'16px'}
                            sx={{ color: '#fff' }}
                          />
                        ) : (
                          <East />
                        )}
                      </span>
                    </button>
                    <p className='donthaveAccount'>
                      Dont have account?{' '}
                      <a className='donthaveLink' href='/auth/register'>
                        Create Account
                      </a>
                    </p>
                  </div>
                </FormGroup>
              </form>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <Image
              src={Loginimage}
              alt='login'
              style={{ height: '100vh', width: '100%', overflow: 'hidden' }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
