import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import MenuRow from '../components/MenuRow'
import * as menuActions from '../actions/menuActions'


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

class AdminEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: props.menu.length>0?[...props.menu]:[{temp: true}]
    }
  }

  undo () {
    if(this.props.menu.length === 0){
      return
    }
    this.setState({
      ...this.state,
      menuList: [...this.props.menu]
    })
  }

  addMenu (index, menuRow) {
    this.props.addMenu({
      index,
      id: this.props.match.params.id,
      menuRow
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        menuList: [...this.props.menu]
      })
    }, 0)
  }

  removeMenuRow (index) {
    this.props.removeMenu({
      id: this.props.match.params.id,
      index
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        menuList: this.props.menu.length>0?[...this.props.menu]:[{temp: true}]
      })
    }, 0)
  }

  createMenuRow (index) {
    let former = this.state.menuList.slice(0, index).filter(r=>!r.temp)
    let latter = this.state.menuList.slice(index, this.state.menuList.length).filter(r=>!r.temp)

    this.setState({
      ...this.state,
      menuList: [...former, {temp: true}, ...latter]
    })
  }

  render () {
    return (
      <Container>
        <h2 className="ui icon header">
          {this.props.store.displayName}
          <div className="sub header">{this.props.store.description}</div>
        </h2>
        <TableWrapper>
          <table className="ui striped table">
            <thead>
              <tr>
                <th width="40%">名稱</th>
                <th width="40%">價格</th>
                <th width="20%"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.menuList.map((row, i) => (
                <MenuRow
                  key={row.displayName}
                  row={row}
                  index={i}
                  undo={this.undo.bind(this)}
                  addMenu={this.addMenu.bind(this)}
                  removeMenuRow={this.removeMenuRow.bind(this)}
                  createMenuRow={this.createMenuRow.bind(this)}></MenuRow>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  let id = props.match.params.id
  let store = state.stores.find(s => s.id === id)
  if(!store){
    props.history.push('/admin')
    return {
      store: {},
      menu: []
    }
  } else {
    let menu = state.menus[id]
    return {
      store,
      menu
    }
  }
}
export default connect(mapStateToProps, menuActions)(AdminEdit);
