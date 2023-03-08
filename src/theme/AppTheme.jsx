import React from 'react'
import { ThemeProvider} from '@mui/material/styles';

import { purpleTheme } from '.';
import { CssBaseline } from '@mui/material';

const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}

export default AppTheme