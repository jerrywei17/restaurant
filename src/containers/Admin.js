import React, { Component } from 'react';
import * as actions from '../actions/storeActions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import shopImg from '../assets/image/shop.svg'
import { Link } from 'react-router-dom';

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

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`

const DefaultImage = styled.div`
  background: url(${shopImg}) center no-repeat;
  background-size: contain;
  height: 100%;
`
const Mask = styled.div`
  display: ${props => props.active?'block':'none'};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background: rgba(0,0,0,.2);
  transition: opacity linear 0.5s;
  opacity: ${props => props.fadeType==='out'?0:1};
`

const Modal = styled.div`
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity linear 0.5s;
  opacity: ${props => props.fadeType==='out'?0:1};
`
const ErrorMsg = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: #9f3a38;
  font-weight: lighter;
  font-size: 12px;
`

const Item = ({ store, deleteStore }) => (
  <div className="item">
    <div className="ui small image">
      <DefaultImage></DefaultImage>
    </div>
    <div className="content">
      <div className="header">
        <Link style={{color: 'inherit'}} to={`/admin/${store.id}`}>{store.displayName}</Link>
      </div>

      <div className="meta">
        <p>{store.description}</p>
      </div>
      <div className="description">

      </div>
      <div className="extra">
        <div className="ui left floated">
          創建日期：{store.createdAt}
        </div>
        <div className="ui right floated tiny button" onClick={() => deleteStore(store.id)}>
          刪除
        </div>
        <Link className="ui right floated tiny button" to={`/admin/${store.id}`}>詳情</Link>
      </div>
    </div>
  </div>
)



const validators = {
  displayName: (v, cb) => {
    if(v===''||undefined){
      return '不得為空'
    }
    return ''
  }
}

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fadeType: 'out',
      form: {
        displayName: {
          errorMsg: '',
          value: ''
        },
        description: {
          errorMsg: '',
          value: ''
        }
      }
    }
  }

  closeModal (e) {
    if(e){
      e.preventDefault()
    }
    this.setState({
      ...this.state,
      fadeType: 'out'
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        modalVisible: false,
        form: {
          displayName: {
            errorMsg: '',
            value: ''
          },
          description: {
            errorMsg: '',
            value: ''
          }
        }
      })
    }, 1000)
  }

  openModal () {
    this.setState({
      ...this.state,
      modalVisible: true
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        fadeType: 'in'
      })
    }, 0)
  }

  submitForm () {
    let isValid = true
    Object.keys(validators).forEach(key => {
      isValid = this.validateField(key) && isValid
    })
    if(isValid){
      this.props.addStore({
        displayName: this.state.form.displayName.value,
        description: this.state.form.description.value
      })
      this.closeModal()
    }
  }

  validateField (key) {
    let validation = validators[key]
    if(validation){
      let value = this.state.form[key].value
      let errorMsg = validation(value)
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: {
            errorMsg,
            value: value
          }
        }
      })
      if(errorMsg){
        return false
      }
    }
    return true
  }

  handleInput (e, key) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: {
          errorMsg: '',
          value: e.target.value
        }
      }
    })
    setTimeout(() => {
      this.validateField(key)
    }, 0)
  }



  render () {
    return (
      <Container>
        <ItemWrapper>
          <div className="ui link items" >
            {
              this.props.storeList.map(store => (
                <Item store={store} key={store.id} deleteStore={this.props.deleteStore}></Item>
              ))
            }
          </div>
        </ItemWrapper>
        {this.props.storeList.length===0?<EmptyText>尚未新增店家</EmptyText>:null}
        <Footer>
          <button type="button" className="tiny ui button" onClick={this.openModal.bind(this)}>
            新增店家
          </button>
        </Footer>

        <Mask active={this.state.modalVisible} fadeType={this.state.fadeType} onClick={this.closeModal.bind(this)}></Mask>
        <Modal className={`ui modal tiny ${this.state.modalVisible?'active':''}`} fadeType={this.state.fadeType}>
          <div className="header">店家資訊</div>
          <div className="content">
            <form className="ui form">
              <div className={`field ${this.state.form.displayName.errorMsg?'error': ''}`}>
                <label>名稱</label>
                <ErrorMsg>{this.state.form.displayName.errorMsg}</ErrorMsg>
                <input onChange={(e) => {this.handleInput(e, 'displayName')}} value={this.state.form.displayName.value} type="text" placeholder="名稱" />
              </div>
              <div className="field">
                <label>簡介</label>
                <textarea onChange={(e) => {this.handleInput(e, 'description')}} value={this.state.form.description.value}></textarea>
              </div>
            </form>
          </div>
          <div className="actions">
            <div className="ui blue button" onClick={this.submitForm.bind(this)}>送出</div>
            <div className="ui basic button" onClick={this.closeModal.bind(this)}>取消</div>
          </div>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeList: state.stores
  }
}
export default connect(mapStateToProps, actions)(Admin);
