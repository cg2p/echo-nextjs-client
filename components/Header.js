import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Link from '../components/Link';

import { useStyles } from '../components/Styles';

function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <AppBar position="relative" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link href="/">Echo Reverse App
          </Link>
          
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="/reverse" className={classes.link}>
            Reverse
          </Link>
          <Link variant="button" color="textPrimary" href="/about" className={classes.link}>
            About
          </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined" className={classes.link}>
          Login
        </Button>
      </Toolbar>
    </AppBar>     
    </React.Fragment>
  );
}  

export default Header;