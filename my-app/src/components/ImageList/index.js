import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ImageContext from '../../contexts/ImageWizard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
        padding: 30,
    },
  },
  gridElement: {
      width: '100%',
  },
}));


export default function ImageList() {
  const classes = useStyles();
  const [width, setWidth] = useState((window.innerWidth));
  const { images, setImages } = useContext(ImageContext);


  useEffect(() => {
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&extras=url_m&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(data => setImages(_.get(data, 'photos.photo', [])));
  }, []);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            }
    }, []);
  const isMobile = width<=450;
  const isTablet = width>450 && width <=768;
  const isBrowser = width>=1024;

  const getComputedCol = () => isMobile ? 3 : isTablet ? 1.5 : 1;
  console.log({ isBrowser, isTablet, isMobile });
  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={3} spacing={5}>
        {images.map((tile) => (
          <GridListTile key={tile.id} className={classes.gridElement} cols={getComputedCol()}>
            <img src={tile.url_m} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
