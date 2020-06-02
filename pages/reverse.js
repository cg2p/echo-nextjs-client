import React from 'react';
import { Component } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import { useStyles } from '../components/Styles';

import getConfig from 'next/config'

/*const { publicRuntimeConfig } = getConfig();
const { 
//  ECHO_SERVICE_GET_PING, 
//  ECHO_SERVICE_GET_ECHOES,
  ECHO_SERVICE_POST_ECHO,
  ECHO_SERVICE_POST_REVERSE,
} = publicRuntimeConfig;
*/
function useStylesHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  }
}

class Reverse extends Component {
  constructor (props) {
    super(props)

    this.state = {
      textInput: '',
      error: '',
      textOutput: '',
      reverseChecked: false,
    };
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChoiceChange (event) {
    if (event.target.checked) {
      this.state.reverseChecked = true;
    } else {
      this.state.reverseChecked = false;
    }
  }
  handleTextInputChange (event) {
    this.setState({ textInput: event.target.value })
  }

  handleSetTextOutput (value) {
    this.setState({ textOutput: value })
  }

  async handleSubmit(event) {
    event.preventDefault();

    const inputText = this.state.textInput;
    const reverseChecked = this.state.reverseChecked;
    
    const url = process.env.ECHO_SERVICE_URL;
    const echo_url = url + process.env.ECHO_SERVICE_POST_ECHO;
    const reverse_url = url + process.env.ECHO_SERVICE_POST_REVERSE;
    
    console.log('echo_url is %s', echo_url);
    console.log('reverse_url is %s', reverse_url);

    // hard code for the moment
    let userid = "333";

    async function getTextOutput(inputText, reverseChecked) {
      var myheaders = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });

      try {
        if (reverseChecked) {
          var url = reverse_url;
        } else {
          var url = echo_url;
        }
  
        let response = await fetch(url, {
          method: 'POST',
          headers: myheaders,
          body: JSON.stringify({ uid: userid, inputText: inputText })
        });
  
        if (response.ok) {
          console.log("response ok");
          let data = await response.json(); 
          console.log("result %s", data.result.text);
          return data.result.text;
        } else {
          console.log('echo service call failed.');
          let error = new Error(response.statusText);
          error.response = response;
          throw error;        
        }
      } catch (error) {
        console.error('Error thrown inside getTextOutput', error); 
      }
    };

    try {
      getTextOutput(inputText, reverseChecked).then(value => this.handleSetTextOutput(value));
    } catch (error) {
      console.error(
        'Error caught outside.',
        error
      );
      this.setState({ error: error.message });
    }; 

  }

  render() {
    const classes = this.props.classes;

    return (
      <Layout>
        <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h5" component="h1" gutterBottom>
            Reverse
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="textInput"
              label="Input Text"
              name="textInput"
              autoComplete="textInput"
              autoFocus
              value={this.state.textInput}
              onChange={this.handleTextInputChange}
            />
            <FormControlLabel
            control={<Checkbox value={this.state.reverseChecked} onChange={this.handleChoiceChange} color="primary" />}
            label="Reverse"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Go
            </Button>
          </form>
          <br />
          <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {this.state.textOutput }
                </Paper>
              </Grid>
          </Grid>
        </Box>
        </Container>
      </Layout>
    );
  }
}

export default useStylesHook(Reverse);
