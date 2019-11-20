import React from 'react';
import '../styles/landing.scss';
import Header from '../components/header';
import Body from '../components/LandingPage/body';
import Footer from '../components/footer';


class Landing extends React.Component {
    render() {
        return (
            <div className="Landing">
              <Header></Header>
              <Body></Body>
              <Footer></Footer>
            </div>
          );
    }
}

export default Landing