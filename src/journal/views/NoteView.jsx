import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Third party
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";


export const NoteView = () => {
  
  const { active: note, isSaving, messageSaved } = useSelector((state) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);

  const dispatch = useDispatch()

  
  // I will use an useMemo because this data is not going to change so much
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // I'm doing this to simulate a click on input file while clicking the upload icon button
  const fileInputRef = useRef()


  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])
  

  useEffect(() => {
    if (messageSaved.length > 0) {
      // pude colocar un return Swal.fire.....
      // pero entonces no se dispararía el alerta hasta que recién el componente sea destruido
      Swal.fire('Note updated!', messageSaved, 'success')
    }
  }, [messageSaved])

  const handleSaveNote = () => {
    dispatch(startSaveNote())
  };

  const handleInputChange = ({target}) => {

    if(target.files.length === 0) return

    dispatch( startUploadingFiles(target.files))
  }

  const handleDeleteNote = () => {
    dispatch( startDeletingNote())
  }

  return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid item>
          <Typography fontSize={39} fontWeight="light">
            {dateString}
          </Typography>
        </Grid>
        <Grid item>

          <input type="file" multiple ref={fileInputRef} onChange={handleInputChange} style={{display: "none"}}/>
         
          <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
            <UploadOutlined/>
          </IconButton>

          <Button disabled={isSaving} onClick={handleSaveNote} color="primary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Grid>

        <Grid container>
          <TextField
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{ border: "none", mb: 1 }}
            onChange={onInputChange}
            name="title"
            value={title}
          />

          <TextField
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={5}
            onChange={onInputChange}
            name="body"
            value={body}
          />
        </Grid>

        <Grid container justifyContent="end">
          <Button
            onClick={handleDeleteNote}
            sx={{mt: 2}}
            color="error"
          >
            <DeleteOutline />
            Borrar
          </Button>

        </Grid>

        <ImageGallery images={note.imageUrls}/>
      </Grid>
  );
};
