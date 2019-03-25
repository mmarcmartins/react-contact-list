import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContact extends Component{

  static propTypes = {
    contacts: PropTypes.array.isRequired ,
    onDeleteContact: PropTypes.func.isRequired
  }


  state = {

    query : ''

  }

  updateQuery = query => {

    this.setState({
      query: query.trim()
    })

  }

  clearQuery = () =>{
    this.setState({ query : ''})
  }

  render(){

    const { contacts, onDeleteContact } = this.props
    const { query } = this.state


    let filterContacts

    if(query){

      const match = new RegExp(escapeRegExp(query), 'i')
      filterContacts = contacts.filter( c => match.test(c.name))

    }else{
      filterContacts = contacts
    }

    filterContacts.sort(sortBy('name'))

    return(
      <div className="list-contacts">

        <div className="list-contacts-top">

          <input
            className= "search-contacts"
            type= "text"
            placeholder= "Search Contacts"
            value= {query}
            onChange = { event => this.updateQuery(event.target.value)}
            />

          <Link
            to="/create"
            className="add-contact">
            Add Contact</Link>

        </div>
        { filterContacts.length !== contacts.length &&(
          <div className="showing-contacts">
            <span>Now Showing {filterContacts.length} of {contacts.length} total </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )
      }
      <ol className="contact-list">

        {filterContacts.map((c) => (

          <li key={c.id} className="contact-list-item">

            <div className="contact-avatar" style={{

                backgroundImage: `url(${c.avatarURL})`

              }}/>
              <div className="contact-details">

                <p>{c.name}</p>
                <p>{c.email}</p>

              </div>

              <button onClick={ () => onDeleteContact(c) } className="contact-remove">
                Remove
              </button>
            </li>
          ))}

        </ol>
      </div>
    );

  }
}


export default ListContact;
