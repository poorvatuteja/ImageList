import './App.css';
import React, { useState } from 'react';
import SearchAppBar from './components/SearchAppBar';
import ImageList from './components/ImageList';

import { ImageWizardProvider } from './contexts/ImageWizard';

const limit = 100;

function App() {
  const [images, setImages] = useState([]);
  const [skip, setSkip] = useState(0);

  return (
    <ImageWizardProvider value={{
      images,
      setImages,
      limit,
      skip,
      setSkip
    }}>
      <SearchAppBar />
      <ImageList />
    </ImageWizardProvider>
  );
}

export default App;
