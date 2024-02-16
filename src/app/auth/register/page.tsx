'use client';

import { Alert, Box, CircularProgress, FormGroup, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@stitches/react';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import Loginimage from '../../../../images/login/login.jpg';
import '../../globals.css';
import { East, RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [ispasswordVisible, setIspasswordVisible] = useState(false);
  const [isConfirmpasswordVisible, setIsConfirmpasswordVisible] =
    useState(false);
  const [isLoading, setLoading] = useState(false);
  const [successmessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleVisiblity = () => {
    setIspasswordVisible(!ispasswordVisible);
  };
  const handleConfirmVisiblity = () => {
    setIsConfirmpasswordVisible(!isConfirmpasswordVisible);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: any) => {
    console.log(data);
    setLoading(true);
    //clearing prev. messages
    setErrorMessage('');
    setSuccessMessage('');

    //check password match
    if (data?.password !== data?.confirmPassword) {
      setErrorMessage('Password is not matching');
      return;
    }

    // user data object
    const userObject = {
      email: data?.email || '',
      password: data?.password || '',
      username: data?.name || '',
    };

    // api call
    axios
      .post(`${process.env.NEXT_APP_API_URL}/user/register`, userObject)
      .then((res) => {
        setSuccessMessage(res?.data?.message);
        // @ts-ignore
        setInterval(router.push('/auth/login') && setLoading(false), 5000);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message);
      });
  };
  return (
    <>
      <Head>
        <title>Register | Blog App</title>
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
              <p className='login_title'>Register</p>
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
                          placeholder='Name'
                          className='input_field'
                          type='text'
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      </>
                    )}
                    name={'name'}
                    control={control}
                    rules={{ required: 'Name field is required' }}
                  />
                  {errors['name'] && (
                    <span
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px',
                      }}
                    >
                      {errors['name'].message}
                    </span>
                  )}
                </FormGroup>
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
                <FormGroup sx={{ my: 5, position: 'relative' }}>
                  <Controller
                    render={({ field: { onChange, value, onBlur } }) => (
                      <>
                        <input
                          placeholder='Confirm Password'
                          className='input_field'
                          type={isConfirmpasswordVisible ? 'text' : 'password'}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                        {!isConfirmpasswordVisible ? (
                          <RemoveRedEye
                            onClick={handleConfirmVisiblity}
                            sx={{
                              position: 'absolute',
                              cursor: 'pointer',
                              right: '10px',
                              top: '9px',
                            }}
                          />
                        ) : (
                          <VisibilityOff
                            onClick={handleConfirmVisiblity}
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
                    name={'confirmPassword'}
                    control={control}
                    rules={{ required: 'Confirm Password field is required' }}
                  />
                  {errors['confirmPassword'] && (
                    <span
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        marginTop: '3px',
                      }}
                    >
                      {errors['confirmPassword'].message}
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
                      Register{'  '}
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
                      Do you have account?{' '}
                      <a className='donthaveLink' href='/auth/login'>
                        Login
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

export default Register;
