import styled from '@emotion/styled';

import ButtonAppBar from '../../components/admin/Appbar';
import CategoryTable from '../../components/admin/CategoryTable';
import DataTable from '../../components/admin/DataTable';
import SignIn from '../../components/admin/SignIn';

import useAuth from '../../hooks/useAuth';

const AdminLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
  margin-bottom: 2rem;
`;

const TableDiv = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 100px 20px;
`;

export default function Admin() {
  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      {useAuth.isLoggedIn() ? (
        <AdminLayout>
          <TableDiv>
            <Title>Data Table</Title>
            <DataTable></DataTable>
          </TableDiv>

          <TableDiv>
            <Title>Category Table</Title>
            <CategoryTable></CategoryTable>
          </TableDiv>
        </AdminLayout>
      ) : (
        <SignIn />
      )}
    </>
  );
}
