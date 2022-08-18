import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypeSelectors';
import MenuLayout from '../../layouts/menuLayout/MenuLayout';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Container,
  IconButton,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';
import { Edit, Save, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Role, User } from '../../models/baseTypes';
import getEmptyUser from '../../models/models';
import { SelectChangeEvent } from '@mui/material';

// padding: theme.spacing(1),

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const styleWrap = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const Users = () => {
  const { createUser, fetchUsers, changeUser, deleteUser } = useActions();
  const { users } = useTypedSelector(state => state.users);
  const { user: root } = useTypedSelector(state => state.auth);

  const [copyUser, setCopyUser] = useState<User>({} as User);

  useEffect(() => {
    fetchUsers();
  }, []);

  // e: React.SyntheticEvent<HTMLButtonElement>

  const handlerClick = (user: User) => () => {
    setCopyUser(user);
  };

  const handlerChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopyUser(user => ({
      ...user,
      [field]: e.target.value,
    }));
  };

  const handlerChangeSelect = (e: SelectChangeEvent) => {
    setCopyUser(user => ({
      ...user,
      role: e.target.value as Role,
    }));
  };

  const handlerSave = () => {
    changeUser(copyUser);
    setCopyUser({} as User);
  };

  const handlerCreate = () => {
    createUser(getEmptyUser());
  };

  const handlerDelete = (user: User) => () => {
    deleteUser(user);
  };

  return (
    <MenuLayout>
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Stack spacing={2}>
          <Item>
            <Button fullWidth onClick={handlerCreate}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>создать</Typography>
              <Delete />
            </Button>
          </Item>

          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">login</TableCell>
                    <TableCell align="center">pass</TableCell>
                    <TableCell align="center">role</TableCell>
                    {root.role === Role.Admin ? <TableCell align="center">tools</TableCell> : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => {
                    const isEdit = user.id === copyUser?.id;
                    return (
                      <TableRow
                        key={user.name}
                        sx={{
                          '&:last-child td, &:last-child th': {
                            border: 0,
                            ...styleWrap,
                          },
                        }}>
                        <TableCell align="center" sx={{ maxWidth: 80, ...styleWrap }}>
                          {user.id}
                        </TableCell>
                        <TableCell
                          component="th"
                          align="center"
                          scope="row"
                          sx={{ maxWidth: 80, ...styleWrap }}>
                          {isEdit ? (
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              sx={{ maxWidth: 80 }}
                              value={copyUser.name}
                              onChange={handlerChange('name')}
                            />
                          ) : (
                            user.name
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ maxWidth: 80, ...styleWrap }}>
                          {user.login}
                        </TableCell>
                        <TableCell align="center" sx={{ maxWidth: 80, ...styleWrap }}>
                          {isEdit ? (
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              sx={{ maxWidth: 80 }}
                              value={copyUser.pass}
                              onChange={handlerChange('pass')}
                            />
                          ) : (
                            user.pass
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ maxWidth: 80, ...styleWrap }}>
                          {isEdit ? (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={copyUser.role}
                              onChange={handlerChangeSelect}>
                              {Object.entries(Role).map(([en, ru], index) => {
                                return (
                                  <MenuItem key={ru + index} value={ru}>
                                    {en}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          ) : (
                            user.role
                          )}
                        </TableCell>
                        {root.role === Role.Admin ? (
                          <TableCell align="center" sx={{ maxWidth: 80, ...styleWrap }}>
                            {isEdit ? (
                              <IconButton onClick={handlerSave}>
                                <Save />
                              </IconButton>
                            ) : (
                              <>
                                <IconButton onClick={handlerClick(user)}>
                                  <Edit />
                                </IconButton>
                                {user.id !== root.id ? (
                                  <IconButton onClick={handlerDelete(user)}>
                                    <Delete />
                                  </IconButton>
                                ) : null}
                              </>
                            )}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Stack>
      </Container>
    </MenuLayout>
  );
};

export default Users;
