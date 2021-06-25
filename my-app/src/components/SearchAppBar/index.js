import _ from 'lodash';
import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import ImageContext from '../../contexts/ImageWizard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: 'block',
    padding: '20px 0px',
    justifyContent: 'center',
  },
  title: {
    margin: 'auto',
    width: 150,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: 'auto',
    width: '300px',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '350px',
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
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const { setImages } = useContext(ImageContext);

  const searchImage = (e) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=aeafe065ace713b9cedb10b958dfa6a3&extras=url_m&text=${e.target.value}&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(data => setImages(_.get(data, 'photos.photo', [])));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.content}>
          <Typography className={classes.title} variant="h6" noWrap>
            Search Photos
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              onChange={_.debounce((e) => searchImage(e), 200)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
