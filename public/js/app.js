var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

var Hello = createReactClass({
  render: function() {
    return React.createElement("h3", null, "Levi graphQl");
  }
});

ReactDOM.render(React.createElement(Hello), document.getElementById('react'));
