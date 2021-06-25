import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ModalImage from "react-modal-image";

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
  const { images, setImages, limit, setSkip, skip } = useContext(ImageContext);

  const getImagesOnScroll = async () => {
    await setSkip(prev => limit+prev);
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&extras=url_m%2C+url_l&skip=${skip}&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(data => setImages([...images, ..._.get(data, 'photos.photo', [])]));
};

  useEffect(() => {
    fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&extras=url_m%2C+url_l&format=json&nojsoncallback=1')
    .then(response => response.json())
    .then(data => setImages(_.get(data, 'photos.photo', [])));
  }, []);

    window.onscroll = function() {
      if(document.getElementById('root').scrollHeight === (window.scrollY+window.innerHeight)) {
          getImagesOnScroll();
      }
   };

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

  const getComputedCol = () => isMobile ? 3 : isTablet ? 1.5 : 1;

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={3} spacing={5}>
        {images.map((tile) => (
        <GridListTile key={tile.id} cols={getComputedCol(tile.url_m)}>
          <ModalImage
            small={tile.url_m}
            className={classes.gridElement}
            large={tile.url_l}
            alt=""
          />
        </GridListTile>
        ))} 
      </GridList>
    </div>
  );
}
