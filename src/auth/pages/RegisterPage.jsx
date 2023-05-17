import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'),'El correo debe de tener una @'],
  password: [(value) => value.length >= 6,'el password debe de tener más de 6 letras'],
  displayName: [( value ) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isChecking = useMemo(() => status === 'checking', [status])

  const { 
    displayName, email, password, onInputChange, formState,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if( !isFormValid ) return;

    dispatch(startCreatingUserWithEmailPassword( formState ));
  }

  return (
    <>
      <AuthLayout title='Registrarse'>
          <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label='Nombre Completo' 
                  type={'text'} 
                  placeholder='Tu Nombre'
                  fullWidth 
                  name='displayName'
                  value={displayName}
                  onChange={onInputChange}
                  error={displayNameValid && formSubmitted}
                  helperText={displayNameValid}
                />
              </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label='Correo' 
                  type={'email'} 
                  placeholder='correo@google.com'
                  fullWidth 
                  name='email'
                  value={email}
                  error={emailValid && formSubmitted}
                  onChange={onInputChange}
                  helperText={emailValid}
                />
              </Grid>

              <Grid item xs={12} sx={{mt: 2}}>
                <TextField 
                  label='Contraseña' 
                  type={'password'} 
                  placeholder=''
                  fullWidth 
                  name='password'
                  value={password}
                  error={passwordValid && formSubmitted}
                  onChange={onInputChange}
                  helperText={passwordValid}
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
                <Grid item xs={12}>
                  <Button disabled={isChecking} type='submit' variant='contained' fullWidth>
                    Crear Cuenta
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent={'end'}>
                <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to='/auth/login'>
                  Iniciar sesión
                </Link>
              </Grid>

            </Grid>
          </form>
      </AuthLayout>
    </>
  )
}
