import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import { Paper, Button, Grid } from '@material-ui/core';

export default function Fetcher(props) {
    const { url, value} = props;
    let [clicks, setClicks] = useState(0);
    const [response, setResponse] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const body = `input=${inputValue}&weekDay=${value}`;

    const  fetchData= async()=>{
      const res = await fetch(url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body  // body data type must match "Content-Type" header
        }
      );
      const json = await res.json();
      setResponse(json);
    }
    useEffect( ()=> {
      setResponse(null);
      fetchData().catch(e=>{console.log(e)});
    }, [url, clicks]);

    const doSomething = function (event) {
        console.log(event.currentTarget.getAttribute('data-something'));
        setClicks(clicks + 1);
    }
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };


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
