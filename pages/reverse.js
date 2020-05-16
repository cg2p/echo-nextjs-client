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
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();


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
      myvar: publicRuntimeConfig.myvar,
      mysecret: serverRuntimeConfig.mysecret,
      TESTVAR: publicRuntimeConfig.TESTVAR,
      k8secret: '',
      k8var: '',
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

  async handleSubmit(event) {
    event.preventDefault();

    var inputText = this.state.textInput;
    var outputText;

    if (this.state.reverseChecked) {
      outputText = inputText.split("").reverse().join("");
    } else {
      outputText = inputText;
    }
    
    console.log("myvar %s", this.state.myvar);
    console.log("mysecret %s", this.state.mysecret);
    
    this.setState({textOutput: outputText });

    /*
    const echo_url = 'http://' + echo_host + ':' + echo_port + '/' + echo_api;
    const reverse_url = 'http://' + reverse_host + ':' + reverse_port + '/' + reverse_api;
    
    var myheaders = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    
    try {
      if (this.state.echoChoice) {
        var url = echo_url;
      } else {
        var url = reverse_url;
      }
      console.log('url is %s', url);
      var inputText = this.state.textInput;
    
      const response = await fetch(url, {
        method: 'POST',
        headers: myheaders,
        body: JSON.stringify({ inputText })
      })
      if (response.ok) {
        const { outputText } = await response.json()
        console.log('outputText is %s', outputText);
        this.setState({textOutput: outputText });
      } else {
        console.log('call failed.')
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        inputText, 
        error
      )
      this.setState({ error: error.message })
    }
    */
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
                <Paper className={classes.paper}>
                  myvar {this.state.myvar }
                </Paper>
                <Paper className={classes.paper}>
                  mysecret {this.state.mysecret }
                </Paper>
                <Paper className={classes.paper}>
                  TESTVAR {this.state.TESTVAR }
                </Paper>
                <Paper className={classes.paper}>
                  k8var {this.state.k8var }
                </Paper>
                <Paper className={classes.paper}>
                  k8secret {this.state.k8secret }
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
