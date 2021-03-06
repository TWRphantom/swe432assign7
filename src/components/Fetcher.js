import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
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
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        >
          <Grid item xs>
            <Typography variant="h6">submits: {clicks}</Typography>
          </Grid>
            <Grid item xs>
              <TextField 
              label="Type something"
              helperText="This will be echo echo by the server"
              value={inputValue} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} />
            </Grid>
            <Grid item xs>
              <Button onClick={doSomething} variant="contained" color="primary" data-something="submit">
                  submit</Button>
            </Grid>
            <Grid item xs>
              <Paper elevation={1} style={
                {height:200, width:200, wordBreak: "break-all", padding:4}
              } >
                {response?JSON.stringify(response):
                (<React.Fragment>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={200} height={118} />
                <Skeleton animation = {false} />
                <Skeleton animation = "wave" />
                </React.Fragment>)}
                </Paper>
              </Grid>
        </Grid>

    );
}

