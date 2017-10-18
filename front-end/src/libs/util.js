import axios from 'axios';
import env from '../config/env';
import config from "./config.js"

let util = {

};
util.title = function(title) {
    window.document.title = title;
};


export default util;