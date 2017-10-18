import axios from 'axios'
import Config from './config'

var url = 'http:\/\/' + window.location.host + "/api"

// axios(config);
class API {
	get(param) {
		let config = new Config()
		config.baseURL = url
		config.url = param.url
		config.params = param.data;
		return axios.get(param.url, config);
	}
	post(param) {
		let config = new Config()
		config.baseURL = url
		config.url = param.url;
		config.data = param.data;
		return axios.request(config);
	}

}
export default API;