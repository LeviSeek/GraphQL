import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";
import {EventEmitter} from "events";

let _links = [];

class LinkStore extends EventEmitter {
  constructor(props) {
    super(props);

    // this register gives store the action dispatched in the callback
    AppDispatcher.register(action => {
      switch(action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log("3. In Store");
          _links = action.links;
          this.emit("change");
          // do sth
          break;
        default:
        //do nothing
      }
    });
  }

  getAll() {
    return _links;
  }
}

export default new LinkStore();
