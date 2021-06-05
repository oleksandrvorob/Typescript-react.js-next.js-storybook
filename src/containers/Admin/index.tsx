import { FunctionComponent, useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'

import AddIcon from '@material-ui/icons/Add'

import LoaderBackdrop from 'components/LoaderBackdrop'
import Breadcrumbs from 'components/Breadcrumbs'
import Dialog from 'components/atoms/Dialog'
import Flex from 'components/Flex'
import Stack from 'components/Stack'

import { useAdminStore } from 'stores/AdminStore'

import CreatePermissionForm from './CreatePermissionForm'

const Admin: FunctionComponent = () => {
  const [open, setOpen] = useState(false)

  const { usersData, permissionData } = useAdminStore()
  const { users, addPermission, deletePermission, loadingUsers } = usersData
  const { permissions, createPermission, loadingPermissions } = permissionData

  const togglePermission = (checked: boolean, userId: number, permissionId: number) => {
    if (checked) {
      addPermission(userId, permissionId)
    } else {
      deletePermission(userId, permissionId)
    }
  }

  return (
    <>
      <Container>
        <Stack>
          <div>
            <Typography color="textSecondary">Manage users</Typography>
            <Breadcrumbs
              links={[
                { title: 'Dashboard', href: '/' },
                { title: 'Admin', href: '/admin' },
              ]}
            />
          </div>
          <Divider />
          <Card>
            <CardHeader
              titleTypographyProps={{ variant: 'subtitle2', color: 'textSecondary' }}
              title="User Permissions"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setOpen(true)}
                >
                  Create Permission
                </Button>
              }
            />
            <Flex justify="center" style={{ alignItems: 'center' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {permissions.map((permission) => (
                      <TableCell key={permission.id}>{permission.name}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <ListItemAvatar>
                            <Avatar src={user.image} />
                          </ListItemAvatar>
                          <ListItemText primary={user.name} secondary={user.email} />
                        </Box>
                      </TableCell>
                      {permissions.map((permission) => (
                        <TableCell key={`${user.id}-${permission.id}`}>
                          <Checkbox
                            checked={user.permissions
                              .map((item) => item.permission?.name)
                              .includes(permission.name)}
                            color="primary"
                            onChange={(e) => {
                              togglePermission(e.target.checked, user.id, permission.id)
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Flex>
          </Card>
        </Stack>
      </Container>
      <LoaderBackdrop open={loadingUsers || loadingPermissions} />
      <Dialog title="Create Permission" open={open} handleClose={() => setOpen(false)}>
        <CreatePermissionForm
          onCancel={() => setOpen(false)}
          onSubmit={(name) => {
            createPermission(name)
            setOpen(false)
          }}
        />
      </Dialog>
    </>
  )
}

// Admin.getInitialProps = async (ctx) => {
//   const res = await get('user')
//   const [users, count] = await res.json()
//   return { users, count }
// }

export default Admin
