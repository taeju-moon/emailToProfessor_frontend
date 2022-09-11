import * as React from 'react';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const StyledButtonAppBar = styled(AppBar)({
  background: '#060606',
  border: 0,
  color: 'white',
});

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledButtonAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </StyledButtonAppBar>
    </Box>
  );
}
