import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
`

const TabWrapper = styled.div`
  width: 950px;
  margin: 0 auto;
`

class StoreDetail extends Component {
  render () {
    return (
      <Container>
        <TabWrapper>
          <div className="ui top attached tabular menu">
            <div className="item active">按件統計</div>
            <div className="item">按人統計</div>
          </div>
          <div className="ui bottom attached tab segment">
            <p></p>
            <p></p>
          </div>
        </TabWrapper>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeList: state.stores
  }
}
export default connect(mapStateToProps)(StoreDetail);
