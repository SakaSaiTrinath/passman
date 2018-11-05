import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { logout } from "../../actions/auth";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  Navtoggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, logout } = this.props;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Passman</NavbarBrand>
          <NavbarToggler onClick={this.Navtoggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/stats">Stats</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/addnew">Add new</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/all">Display All</NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={() => logout()}>Logout</Button>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Login</NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  dark: PropTypes.bool,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
