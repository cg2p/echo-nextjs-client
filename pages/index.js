import React from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import Link from '../components/Link';
import { useStyles } from '../components/Styles';


export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Layout>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Echo Reverse
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Gather round to see the amazing text reversing application.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary" component={Link} naked href="/reverse">
                  Call To Action
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {/* End hero unit */}
      </Layout>
    </React.Fragment>
  );
}
