import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
`

const TableWrapper = styled.div`
  width: 950px;
  margin: 0 auto;
`

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    }
  }

  render () {
    return (
      <Container>
        <TableWrapper></TableWrapper>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeList: state.store.storeList
  }
}
export default connect(mapStateToProps)(Admin);
