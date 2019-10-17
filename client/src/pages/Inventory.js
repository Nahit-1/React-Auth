import React from 'react'

import Item from '../components/Item'

import { getInventory } from '../services/api'

class Inventory extends React.Component {
  state = {
    inventory: []
  }

  style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  }

  setInventory = () => {
    getInventory()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.setState({ inventory: data })
        }
      })
  }

  componentDidMount () {
    if (!this.props.username) {
      this.props.history.push('/signin')
    } else {
      this.setInventory()
    }
  }

  render () {
    const { inventory } = this.state

    return (
      <div style={this.style} className='user-list'>
        <h3>Here's your inventory:</h3>
        { inventory.length === 0 && <p>Sorry, you don't have any items.</p>}
        {
          inventory.map(item =>
            <Item key={item.id} item={item} />
          )
        }
      </div>
    )
  }
}

export default Inventory