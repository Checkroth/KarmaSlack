import Mongoose from 'mongoose';
import LoadClass from 'mongoose-class-wrapper';

var karmaSchema = Mongoose.Schema({
	teamId: String,
	userId: String,	
	karmaPoints: Number
});

class KarmaModel {

	static changeOrCreate(teamId, userId, amnt){
		return this.findOne({teamId, userId}, (err, user) => {
			if (user) {
				user.karmaPoints = user.karmaPoints + amnt;
				return user.save(function (err) {
					if(err) console.err(`Couldn't add karma to ${userId}`);
				});
			}
			else {
				return this.create({
					"teamId": teamId,
					"userId": userId,
					"karmaPoints": amnt
				}, function(err, usr) {
					if (err) console.err(`Couldn't create user ${userId} with points ${amnt}`)
				});
			}
		});
	}
	static getUserPoints(teamId, userId){
		return this.findOne({ teamId, userId });
	}
	
	static getTeamPoints(teamId){
		return new Promise((res, rej) => {
			this.find({ teamId },
				{
					sort: {
						karmaPoints: -1
					}
				},
				function(err, users) {
					if (err) console.err(`Couldn't find users for ${teamId}`);
					res(users)
				});
		});
	}
}

karmaSchema.plugin(LoadClass, KarmaModel);

export default Mongoose.model('Karma', karmaSchema);