const express = require("express");
const router = express.Router();
const categories = require("../models/model");
const subcategories = require("../models/sub");

router.route("/create-categories").post((req, res) => {
  const cat = new categories(req.body);
  cat
    .save()
    .then((res) => {
      const sub = new subcategories({
        cat_id: res.data._id,
        name: [],
      });
      sub
        .save()
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(req.body);
    })
    .catch((error) => {
      res.status(400).send("something went wrong");
    });
  res.status(200).send("success");
});

router.route("/get-categories/").post((req, res) => {
  categories.find((error, data) => {
    if (error) {
      res.send("it's here");
      console.log(error);
    } else {
      res.json(data);
    }
  });
});

router.route("/get-subCategories/:id").get((req, res) => {
  categories.findOne(
    { _id: req.params.id },

    (error, data) => {
      if (error) {
        res.send("it's here");
        console.log("please");
        console.log(error);
      } else {
        res.json(data);
        console.log("!");
      }
    }
  );
});

router.route("/update-subCategories/:id").post((req, res) => {
  console.log(req.body);

  categories.updateOne(
    { _id: req.params.id },
    {
      $push: { subcategories: req.body.sub },
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json(req.body);
        console.log(data);

        console.log("added!");
      }
    }
  );
});

module.exports = router;
