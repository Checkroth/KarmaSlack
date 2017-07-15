export default class Config {
	
	constructor() {
		this._env = process.env.NODE_ENV || 'development';
		this._port = process.env.PORT || 80;
		this._mongodbName = process.env.MONGODB_NAME || 'karmatest';
		this._mongodbUsername = process.env.MONGODB_USERNAME || 'trunk';
		this._mongodbPassword = process.env.MONGODB_PASSWORD || 'trunk';
		this._mongodbEndpoint = process.env.MONGODB_ENDPOINT || 'localhost';
		this._mongodbPort = process.env.MONGODB_PORT || '25762';

	}
	
	get db(){		
		return this.productionEnv ?
			`mongodb://${this._mongodbUsername}:${this._mongodbPassword}@${this._mongodbEndpoint}:${this.__mongodbPort}/${this._mongodbName}`:
			'mongodb://localhost/karma';
	}
	
	get port(){
		return this.productionEnv ? this._port : '3000';
	}	
	
	get productionEnv(){
		return (this._env === 'production');
	}
}