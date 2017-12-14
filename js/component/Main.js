import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";
import PropTypes from 'prop-types';

// create another function to always read the links from the store
let getAppState = () => {
  return { links: LinkStore.getAll() };
};

class Main extends React.Component{

  static propTypes = {
    limit: PropTypes.number
  }
  
  static defaultProps = {
    limit: 4
  }

  state = getAppState();
  
  componentDidMount() {
    API.fetchLinks();
    // register a listener to the store EventEmitter, using the on method
    LinkStore.on("change", this.onChange);
  }

  // remove the listener
  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }

  // change the onChange function to a property by using the arrow function
  onChange = () => {
    this.setState(getAppState());
  }

  render() {
    let content = this.state.links.slice(0, this.props.limit).map(link => {
      return <li key={link._id}>
               <a href={link.url}>{link.title}</a>
            </li>;
    });
    return (
      <div>
        <h3>Links</h3>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

export default Main;