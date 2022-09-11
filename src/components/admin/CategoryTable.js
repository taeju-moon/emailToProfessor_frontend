import * as React from 'react';
import styled from '@emotion/styled';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import useFetch from '../../hooks/useFetch';

const StyledDataGrid = styled(DataGrid)`
  &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
  &.MuiDataGrid-root .MuiDataGrid-cell:focus {
    outline: none;
  }
`;

export default function CategoryTable() {
  const { data, status } = useFetch('http://3.35.11.39:8000/category');

  const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'name', headerName: 'Name ', sortable: false, width: 130 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      width: 100,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params);
        };

        return (
          <Button color="error" onClick={onClick}>
            Remove
          </Button>
        );
      },
    },
  ];

  let rows = [];

  if (status === 'fetched') {
    rows = data.data.map((item) => {
      return {
        id: item._id,
        name: item.name,
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
