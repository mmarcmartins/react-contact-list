import React, { Component } from 'react';
import ListContact from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'
import { Route } from 'react-router-dom'


class App extends Component {

  state = {
    contacts : []
  }

  componentDidMount(){
    ContactsAPI.getAll().then( contacts => {
      this.setState( { contacts } )
    })
  }

  onCreateContact = contact =>{

    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })

  }

  removeContact = contact => {

    this.setState( state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <ListContact
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
              />

          )}/>

        <Route path="/create" render={({ history }) => (

            <CreateContact
              onCreateContact = {(contact) => {
                  this.onCreateContact(contact)
                  history.push('/')
              }}/>

          )}/>
        </div>
      )
    }
  }

  export default App;
