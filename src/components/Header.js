import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Ul = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
`
const Li = styled.li`
  margin-right: 15px;
  cursor: pointer;
`

const Header = () => (
  <nav className="indigo">
    <Ul className="right">
      <Li>
        <Link to="/">Store List</Link>
      </Li>
      <Li>
        <Link to="/admin">Admin</Link>
      </Li>
    </Ul>
  </nav>
)

export default Header
