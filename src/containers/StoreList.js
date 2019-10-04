import React from 'react';
import { connect } from 'react-redux';

const StoreList = ({storeList}) => {
  return (
    <div>
      {
        storeList.map(store => (
          <div>
            <div>{store.id}</div>
            <div>{store.displayName}</div>
          </div>
        ))
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    storeList: state.store.storeList
  }
}

export default connect(mapStateToProps)(StoreList);
