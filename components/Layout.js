import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div>
    <CssBaseline />
    <Header />
        {props.children}
    <Footer />
  </div>
);

export default Layout;