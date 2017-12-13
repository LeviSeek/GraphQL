import {get} from "jquery";
import ServerActions from "./actions/ServerActions";

 let API = {
   fetchLinks() {

     // Ajax request to read /data/links
     get("data/links").done(resp => {
       ServerActions.receiveLinks(resp);
     })
   }
 };

 export default API;
