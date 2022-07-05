import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
       <Menu.Item> <Link to="/">Vote App</Link></Menu.Item>
        
       <Menu.Menu position="right">
       <Menu.Item> <Link to="/">Vote</Link></Menu.Item>
       <Menu.Item> <Link to="/newcandidate">Become a Candidate</Link></Menu.Item>
       <Menu.Item> <Link to="/results">Results</Link></Menu.Item>
       </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Header;
