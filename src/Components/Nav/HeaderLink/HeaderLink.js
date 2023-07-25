import React from "react";
import { NavLink } from "react-router-dom";

class HeaderLink extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <NavLink
          to={this.props.linkUrl}
          activeClassName="active"
          className="nav-link js-scroll-trigger"
        >
          {this.props.linkName}
        </NavLink>
      </li>
    );
  }
}

export default HeaderLink;

//Difference between NavLink and Link

// In React Router DOM, both NavLink and Link are used to navigate between different routes of a web application. However, there are some key differences between the two:

// Styling: NavLink adds a class name of "active" to the active link, allowing you to style the active link differently from the other links. Link, on the other hand, does not add any class name to the active link.

// URL: When using NavLink, the URL for the active link will have an "active" class added to it. Link, on the other hand, will not have any class name added to its URL.

// Props: NavLink allows you to pass additional props that are used to style the active link. For example, you can set the "activeStyle" prop to style the active link differently from the other links. Link, on the other hand, only accepts the "to" prop.

// Here's an example of how to use NavLink and Link:
// import { NavLink, Link } from 'react-router-dom';

// // NavLink example
// <NavLink to="/about" activeClassName="active" activeStyle={{fontWeight: "bold"}}>About</NavLink>

// // Link example
// <Link to="/contact">Contact</Link>

// In summary, NavLink is used when you want to style the active link differently from the other links and pass additional props, while Link is used when you only need to navigate to a different route.