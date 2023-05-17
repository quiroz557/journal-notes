import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );

  const { onInputChange, email, password } = useForm( formData );

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useDispatch();

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({email, password}));
  }
  
  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <>
      <AuthLayout title='Login'>
          <form 
            aria-label='submit-form'
            onSubmit={onSubmit} 
            className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label='Correo' 
                  type={'email'} 
                  placeholder='correo@google.com'
                  name='email'
                  value={ email }
                  onChange={ onInputChange }
                  fullWidth 
                />
              </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label='Contraseña' 
                  type={'password'} 
                  placeholder='*********'
                  name='password'
                  inputProps={{
                    'data-testid':'password'
                  }}
                  value={ password }
                  onChange={ onInputChange }
                  fullWidth 
                />
              </Grid>

              <Grid
                item
                xs={ 12 }
                display = { errorMessage ? '' : 'none' }
                sx={{mt: 2}}
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 1, mb: 1}}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    disabled={ isAuthenticating }
                    type='submit' 
                    variant='contained' 
                    fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button 
                    aria-label='google-btn '
                    disabled={ isAuthenticating }
                    variant='contained' 
                    fullWidth
                    onClick={onGoogleSignIn}>
                    <Google />
                    <Typography sx={{ml: 1}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent={'end'}>
                <Link component={ RouterLink } color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
      </AuthLayout>
    </>
  )
}
