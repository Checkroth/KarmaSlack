import KarmaModel from './karma.model.js'; 

export default class KarmaService {
	
	constructor() {
		
	}
	
	//Add Karma record
	
	add(teamId, userId, amount){		
		
		return new Promise((res,rej) =>{
			
			return KarmaModel.changeOrCreate(teamId, userId, amount)
			.then(() => {
				return this.userCount(teamId, userId, "increased")
						.then((data) => {
							res(data);
						}).catch((err)=>{
							rej(`Error retrieving karma for <@${userId}>.`);
						});
			},()=>{
				rej(`Error adding karma for <@${userId}>.`);
			});
		});
	}
	
	//Remove Karma record
	
	remove(teamId, userId, amount){
		
		return new Promise((res,rej) =>{
			return KarmaModel.changeOrCreate(teamId, userId, amount)	
			.then(() => {
				return this.userCount(teamId, userId, "decreased")
						.then((data) => {
							res(data);
						}).catch((err)=>{
							rej(`Error retrieving karma for <@${userId}>.`);
						});
					},() =>{
							rej(`Error removing karma for <@${userId}>.`);
				});
			});
		
		function whenNoRecordFound (userId){
	  
			return Promise.resolve(`<@${userId}> needs some positive karma from you first.`);
		};
		
		function fromSelf (){
		  
			return Promise.resolve(`Don't be so hard on yourself.`);
		};
	}
	
	//Get Karma count for user
	
	userCount(teamId, userId, incDec){
  
		return new Promise((res,rej) =>{
			KarmaModel.getUserPoints(teamId, userId)
			.then((user) => {
				var responseText = `<@${userId}> has a karma of ${user.karmaPoints}.`; 		 
		
				if(incDec){
					responseText = `<@${userId}> has ${incDec} their karma to ${user.karmaPoints}.`;
				}
				
				res(responseText);
			}).catch(()=>{
				rej(`Error retrieving karma for <@${userId}>.`);
			});
		});
	}
	
	//Get Karma count for team

	teamCount(teamId){
		
		return new Promise((res,rej) =>{
			KarmaModel.getTeamPoints(teamId)
			.then((collection) => {

				var responseText = 'Karma Totals: \n';
				for(var u in collection) {
					responseText += `${u}\n`
					// responseText += `<@${u.userId}: ${u.karmaPoints} \n`
				}
		
				res(responseText);
			}).catch(()=>{
				rej('Error retrieving karma for team.');
			});
		});
	}
}