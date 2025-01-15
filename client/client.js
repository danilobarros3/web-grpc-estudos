const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const protoObject = protoLoader.loadSync(
  path.resolve(__dirname, "../proto/bookstore.proto")
);

const protoDefinition = grpc.loadPackageDefinition(protoObject)
const port = 8080
const bookstoreClient = new protoDefinition.Bookstore(`localhost:${port}`, grpc.credentials.crateInsure())

authorClient.listAuthor({}, (err, {authors}) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(authors)
})