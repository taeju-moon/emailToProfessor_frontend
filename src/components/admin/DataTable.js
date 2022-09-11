import * as React from 'react';
import styled from '@emotion/styled';

import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography, Modal, TextField, Divider } from '@mui/material';

import useFetch from '../../hooks/useFetch';

// Style for Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none !important;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextFieldDiv = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

function EditModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = () => {
    console.log('change');
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FlexBox>
            <TextFieldDiv>
              <Typography variant="h6" component="h6">
                id: {data.row.id}
              </Typography>

              <Typography variant="h6" component="h6">
                Category: {data.row.category}
              </Typography>
              <Typography variant="h6" component="h6" sx={{ marginBottom: 2 }}>
                Stars: {data.row.stars}
              </Typography>

              <StyledTextField
                id="outlined-multiline-flexible"
                label="내용"
                multiline
                rows={10}
                value={data.row.content}
                onChange={handleChange}
              />
            </TextFieldDiv>
            <Button onClick={handleClose}>Close</Button>
          </FlexBox>
        </Box>
      </Modal>
    </div>
  );
}

export default function DataTable() {
  const { data, status } = useFetch('http://3.35.11.39:8000/forms');

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title ', sortable: false, width: 130 },
    { field: 'category', headerName: 'Category ', width: 130 },
    {
      field: 'stars',
      headerName: 'Stars',
      type: 'number',
      width: 90,
    },
    {
      field: 'content',
      headerName: 'Content',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 400,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,

      renderCell: (params) => {
        return <EditModal data={params} />;
      },
    },
  ];

  let rows = [];
  if (status === 'fetched') {
    rows = data.data.forms.map((item) => {
      return {
        id: item._id,
        title: item.title,
        content: item.content,
        stars: item.stars,
        category: item.category.name,
      };
    });
  }

  return (
    <div style={{ width: '100%', height: 800 }}>
      {status === 'fetched' ? (
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
