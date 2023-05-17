import { DeleteOutline, Notes, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import { ImageGallery } from '../components'

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, messageSaved, isSaving } = useSelector( state => state.journal );

    const { body, title, onInputChange, formState, date } = useForm( activeNote );

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState));
    }, [ formState ]);

    useEffect(() => {
        if( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved]) 

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }
    
    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;

        dispatch(startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid 
            container 
            className='animate__animated animate__fadeIn animate__faster'
            direction='row' 
            justifyContent='space-between' 
            alignItems='center'
            sx={{mb: 1}}
        >

            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un título'
                    label='Título'
                    sx={{border: 'none', mb: 1}}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió hoy?'
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
                
            </Grid> 
            
           

            <Grid item>
                <input 
                    type='file'
                    multiple
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                    ref={fileInputRef}
                />

                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={ isSaving }
                    onClick={onSaveNote} 
                    color='primary' 
                    sx={{padding: 2}}
                >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Guardar
                </Button>

                <Button
                        onClick={ onDelete }
                        sx={{padding: .5}}
                        color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
        	    
                { activeNote.imageUrls !== '' &&
                    <ImageGallery images={activeNote.imageUrls} />
                }
            </Grid>
        </Grid>
    )
}
