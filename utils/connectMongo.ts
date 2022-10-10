import { connect } from "mongoose";

const connectMongo = async () =>
  await connect(process.env.DB_URL_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

export default connectMongo;
