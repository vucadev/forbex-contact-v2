/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'
import TableViewIcon from '@mui/icons-material/TableView'
import { AppBar, Toolbar, Button, ButtonGroup } from '@mui/material'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/forbex-logo-color.svg'
/**
 * @param {Number} count Cantidad total de datos
 * @return {Object} Component for Creating an entity
 */
export default function NavBar({ count }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1, height: '12vh' }}>
        <img src={Logo} className="App-header-Logo" alt="logo" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button variant="contained" component={Link} to="/">
                <HomeIcon /> Inicio
              </Button>
              <Button variant="contained" component={Link} to="/list">
                <TableViewIcon /> Listado
              </Button>
              <Button variant="contained" component={Link} to="/new">
                <AddIcon /> Nueva
              </Button>
              <p className="totalCount">
                Total de consultas:{' '}
                {count != -1 ? count : <HourglassEmptyIcon fontSize="small" />}
              </p>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
