import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Menu, MenuItem } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SortIcon from '@material-ui/icons/Sort';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '24ch',
      '&:focus': {
        width: '36ch',
      },
    },
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const [filterMenu, setFilterMenu] = useState(null);
  const openFilters = (e) => {
    setFilterMenu(e.currentTarget)
  }

  const [sortMenu, setSortMenu] = useState(null);
  const openSorts = (e) => {
    setSortMenu(e.currentTarget)
  }

  const [sort, setSort] = useState('relevance');

  const [filter, setFilter] = useState('none');

  const [term, setTerm] = useState('');

  const filterLabels = {
    none: 'Todos',
    new: 'Nuevo',
    used: 'Usado'
  }

  const sortLabels = {
    relevance: 'Más relevantes',
    price_asc: 'Menor precio',
    price_desc: 'Mayor precio'
  }

  useEffect(()=>{
    if(term !="")
    props.onCriteriaChange({
      term,
      filter,
      sort
    })
  },[term, sort, filter])

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Mercado Libre
          </Typography>
          <Button
            color="inherit"
            aria-owns='language-menu'
            aria-haspopup="true"
            onClick={e => openFilters(e)}
            data-ga-event-category="header"
            data-ga-event-action="language"
          >
            <FilterListIcon />
            <span className={classes.language}>
              Condición: {filterLabels[filter]}
              </span>
            <ExpandMoreIcon fontSize="small" />
          </Button>
          <Menu open={!!filterMenu} id='language-menu' anchorEl={filterMenu}>
            <MenuItem selected={filter === 'none'} onClick={e => {setFilter('none'); setFilterMenu(null)}}>
              Todos
            </MenuItem>
            <MenuItem selected={filter === 'new'} onClick={e => {setFilter('new'); setFilterMenu(null)}}>
              Nuevo
            </MenuItem>
            <MenuItem selected={filter === 'used'} onClick={e => {setFilter('used'); setFilterMenu(null)}}>
              Usado
            </MenuItem>
          </Menu>
          <Button
            color="inherit"
            aria-owns='language-menu'
            aria-haspopup="true"
            onClick={e => openSorts(e)}
            data-ga-event-category="header"
            data-ga-event-action="language"
          >
            <SortIcon />
            <span className={classes.language}>
              Ordenar: {sortLabels[sort]}
              </span>
            <ExpandMoreIcon fontSize="small" />
          </Button>
          <Menu open={!!sortMenu} id='language-menu' anchorEl={sortMenu}>
            <MenuItem selected={sort === 'relevance'} onClick={e => {setSort('relevance'); setSortMenu(null)}}>
              Más relevantes
            </MenuItem>
            <MenuItem  selected={sort === 'price_asc'} onClick={e => {setSort('price_asc'); setSortMenu(null)}}>
              Menor precio
            </MenuItem>
            <MenuItem selected={sort === 'price_desc'} onClick={e => {setSort('price_desc'); setSortMenu(null)}}>
              Mayor precio
            </MenuItem>
          </Menu>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={e => e.key === `Enter` ? setTerm(e.target.value) : null}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
