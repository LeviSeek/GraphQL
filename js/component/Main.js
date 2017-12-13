import React from "react";
import API from "../API";
import LinkStore from "../stores/LinkStore";

// create another function to always read the links from the store
let getAppState = () => {
  return { links: LinkStore.getAll() };
};

export default class Main extends React.Component{
  constructor(props) {
    // in main, it needs to read the data from the store
    super(props);

    this.state = getAppState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    API.fetchLinks();
    // register a listener to the store EventEmitter, using the on method
    LinkStore.on("change", this.onChange);
  }

  // remove the listener
  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }

  onChange() {
    this.setState(getAppState());
  }

  render() {
    let content = this.state.links.map(link => {
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
