import React, { Component } from 'react';
import styled from 'styled-components'

const Icon = styled.i`
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`
const isPositive = /^\+?[1-9][0-9]*$/

const validators = {
  displayName: (v) => {
    return !!v || v===0
  },
  amount: (v) => {
    return isPositive.test(v+'')
  }
}


class MenuRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.row.temp?'edit':'display',
      displayName: {
        value: props.row.displayName || '',
        hasError: false
      },
      amount: {
        value: props.row.amount || '',
        hasError: false
      }
    }
  }

  submit () {
    let isAllValid = true

    let cloneState = {
      ...this.state
    }
    Object.keys(validators).forEach(k => {
      let isValid = validators[k](this.state[k].value)
      if(!isValid){
        isAllValid = false
        cloneState[k] = {
          ...this.state[k],
          hasError: true
        }
      }
    })
    if(isAllValid){
      this.props.addMenu(this.props.index, {
        displayName: this.state.displayName.value,
        amount: this.state.amount.value,
      })
    } else {
      this.setState(cloneState)
    }
  }

  handleInput (e, key) {
    this.setState({
      ...this.state,
      [key]: {
        value: e.target.value,
        hasError: false
      }
    })
  }

  render () {
    return (
      this.state.mode==='edit'?
      <tr>
        <td>
          <div className={`ui input ${this.state.displayName.hasError?'error':''}`}>
            <input type="text" value={this.state.displayName.value} onChange={e => {this.handleInput(e, 'displayName')}}/>
          </div>
        </td>
        <td>
          <div className={`ui input ${this.state.amount.hasError?'error':''}`}>
            <input type="number" step="1" value={this.state.amount.value} onChange={e => {this.handleInput(e, 'amount')}}/>
          </div>
        </td>
        <td>
          <Icon onClick={this.submit.bind(this)}>
            <i className="icon check"></i>
          </Icon>
          <Icon onClick={this.props.undo}>
            <i className="icon undo"></i>
          </Icon>
        </td>
      </tr>
      :
      <tr>
        <td>{this.props.row.displayName}</td>
        <td>{this.props.row.amount}</td>
        <td>
          <Icon onClick={() => {this.props.createMenuRow(this.props.index+1)}}>
            <i className="icon plus"></i>
          </Icon>
          <Icon onClick={() => {this.props.removeMenuRow(this.props.index)}}>
            <i className="icon minus"></i>
          </Icon>
          <Icon>
            <i className="icon edit"></i>
          </Icon>
        </td>
      </tr>
    )
  }
}

export default MenuRow
