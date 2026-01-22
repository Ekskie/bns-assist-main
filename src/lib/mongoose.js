import mongoose from "mongoose";

const MongoURL =
	"mongodb+srv://imdavenickole:dave@cluster0.wp31ozj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//connection to database
const connectToDatabase = async () => {
	try {
		await mongoose.connect(MongoURL);
		console.log("connected to database");
	} catch (error) {
		console.log(error);
	}
};

export default connectToDatabase;
