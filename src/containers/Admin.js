import React from 'react'
import * as actions from '../actions/storeActions'
import { connect } from 'react-redux'

const Card = ({ store }) => (
  <div class="card">
    <div class="image">

    </div>
    <div class="content">
      <div class="header">{store.displayName}</div>
      <div class="description">
        Matthew is an interior designer living in New York.
        </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        Joined in 2013
      </span>
    </div>
  </div>
)

const Admin = ({ addStore, storeList }) => {
  return (
    <div>
      <div class="ui link cards">

        {
          storeList.map(store => (
            <Card store={store}></Card>
          ))
        }
      </div>
      <button type="button" onClick={() => addStore({ displayName: 'xxxx' })}>Add</button>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    storeList: state.store.storeList
  }
}
export default connect(mapStateToProps, actions)(Admin);
