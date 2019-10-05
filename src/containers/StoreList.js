import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import shopImg from '../assets/image/shop.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 50px;
`

const ItemWrapper = styled.div`
  width: 950px;
  margin: 0 auto;
`

const EmptyText = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  color: #ccc;
  font-size: 20px;
`

const DefaultImage = styled.div`
  background: url(${shopImg}) center no-repeat;
  background-size: contain;
  height: 100%;
`

const Item = ({ store, deleteStore }) => (
  <div className="item">
    <div className="ui small image">
      <DefaultImage></DefaultImage>
    </div>
    <div className="content">
      <div className="header">
        <Link style={{color: 'inherit'}} to={`/store/${store.id}`}>{store.displayName}</Link>
      </div>
      <div className="meta">
        <span>Description</span>
      </div>
      <div className="description">

      </div>
      <div className="extra">
        <div className="ui left floated">
          創建日期：{store.createdAt}
        </div>
        <div className="ui right floated tiny button" onClick={() => deleteStore(store.id)}>
          下單
        </div>
      </div>
    </div>
  </div>
)


class StoreList extends Component {

  addStore () {
    let date = new Date()
    let info = {
      displayName: 'xxxx',
      createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
    this.props.addStore(info)
  }

  render () {
    return (
      <Container>
        <ItemWrapper>
          <div className="ui link items">
            {
              this.props.storeList.map(store => (
                <Item store={store}></Item>
              ))
            }
          </div>
        </ItemWrapper>
        {this.props.storeList.length===0?<EmptyText>暫無店家</EmptyText>:null}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeList: state.store.storeList
  }
}
export default connect(mapStateToProps)(StoreList);
