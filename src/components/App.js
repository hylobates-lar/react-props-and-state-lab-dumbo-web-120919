import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
        filters: {
          ...this.state.filters,
          type: event.target.value
        }
    })
  }

  findPets = (event) => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then(r => r.json())
        .then(data => {
          this.setState({
            ...this.state,
            pets: data
          })
        })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(r => r.json())
        .then(data => {
          this.setState({
            ...this.state,
            pets: data
          })
        })
    }
  }

  adoptPet = (id) => {
    let pets = this.state.pets.map( pet => {
      if (pet.id === id) {
        pet.isAdopted = true
      }
      return {...pet}
    })
    this.setState({
      ...this.state,
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
