var db = require("../config/connection");
var collection = require("../config/collections");
var objectId = require("mongodb").ObjectId;
module.exports = {
  addproduct: (product, callback) => {
    console.log(product);
    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId);
      });
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTION)
        .find()
        .toArray();
      console.log(products);
      resolve(products);
    });
  },
  deleteProduct: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: new objectId(prodId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails:(prodId) => {
    return new Promise((resolve,reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id:new objectId(prodId) })
        .then((product)=>{
          resolve(product);
        });
    });
  },
  updateProduct: (proId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: new objectId(proId) },
          {
            $set: {
              name: proDetails.name,
              description: proDetails.description,
              price: proDetails.price,
              category: proDetails.category,
            },
          }
        )
        .then((response) => {
            console.log(response);
          resolve(response);
        });
    });
  },
};
