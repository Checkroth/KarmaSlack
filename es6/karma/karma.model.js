import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var karmaSchema = Mongoose.Schema({
	teamId: String,
	userId: String,	
	karmaPoints: Number
});

class KarmaModel {

	static addOrCreate(teamId, userId, amnt){
		return this.findOne( { teamId, userId}, function(err, user) {
			if(!user) {
				this.user = KarmaModel.create({
					"teamId": teamId,
					"userId": userId,
					"karmaPoints": amnt
				});
			}
			else {
				user.karmaPoints = user.karmaPoints + amnt
				user.save(function (err) {
				if(err) {
					console.error(`Couldn't update karma for ${userId}`)
				}
			});
			}
		});
	} 
	static getUserPoints(teamId, userId){
		return this.findOne({ teamId, userId });
	}
	
	static getTeamPoints(teamId){
		
		return new Promise((res,rej) =>{
			
			this.aggregate([
			    {
					$match: {teamId}
				},{
				    $group : {
						_id: '$userId',
						count: '$karmaPoints'
				    }
				},
				{ 
					"$sort": { 
						"count": -1 
					} 
				},
			], function(err, collection){
				res(collection);
			});
				
			
		});
	}
	
	static removePoints(teamId, userId, amnt){
		return this.findOne({ teamId, userId}, function(err, user) {
			user.karmaPoints = user.karmaPoints + amnt;
			user.save(function (err) {
				if(err) {
					console.error(`Couldn't update karma for ${userId}`)
				}
			});
		});
	}
}

karmaSchema.plugin(LoadClass, KarmaModel);

export default Mongoose.model('Karma', karmaSchema);