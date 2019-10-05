import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  background: #F5FAFF;
  border: 1px solid #f1f1f1;
`

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
  <Container>
    <Ul>
      <Li>
        <Link to="/">Store List</Link>
      </Li>
      <Li>
        <Link to="/admin">Admin</Link>
      </Li>
    </Ul>
  </Container>
)

export default Header
