import './App.css';
import React, { useState } from 'react';
import SearchAppBar from './components/SearchAppBar';
import ImageList from './components/ImageList';

import { ImageWizardProvider } from './contexts/ImageWizard';

function App() {
  const [images, setImages] = useState([]);
  return (
    <ImageWizardProvider value={{
      images,
      setImages
    }}>
      <SearchAppBar />
      <ImageList />
    </ImageWizardProvider>
  );
}

export default App;
