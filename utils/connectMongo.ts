import { connect } from "mongoose";

const connectMongo = async () => await connect(process.env.DB_URL_CLOUD);

export default connectMongo;
