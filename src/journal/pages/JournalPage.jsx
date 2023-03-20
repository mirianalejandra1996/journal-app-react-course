import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';


import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {

  const dispatch = useDispatch()
  const { isSaving, active : activeNote } = useSelector((state) => state.journal)

  const handleCreateNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      
      { activeNote ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={handleCreateNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}