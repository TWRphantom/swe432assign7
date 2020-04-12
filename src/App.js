import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './App.css';
import Fetcher from './components/Fetcher';
import Hooks, {aFunc} from './components/Hooks';
import ToggleButtons from './components/ToggleButtons';

export const getLocationUrlData = () => {
  return {
      url:
          process.env.NODE_ENV === 'production'?
          'https://swe432tomcat.herokuapp.com'
          :`${window.location.origin}`,
      hash: `${window.location.hash}`
  };
};
export const servicePath ='/echo';

function App() {
  return (
    <Rating
      name="hover-feedback"
      value={value}
      precision={0.5}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onChangeActive={(event, newHover) => {
        setHover(newHover);
      }}
    />
    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
  );
}

export default App;
