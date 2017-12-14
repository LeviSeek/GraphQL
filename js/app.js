import React from "react";
import ReactDOM from "react-dom";

import Main from './component/Main';
import Relay from 'react-relay';
import { log } from "util";

ReactDOM.render(<Main />, document.getElementById('react'));

// console.log('Relay is:', Relay)
console.log(
    Relay.QL`
    query Test {
        links {
            title
        }
    }
    `
);