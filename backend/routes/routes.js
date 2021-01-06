const express = require("express");
const router = express.Router();
const categories = require("../models/model");
const subcategories = require("../models/sub");

router.route("/create-categories").post(async (req, res) => {
  let id = "";
  const cat = new categories(req.body);
  await cat.save((error, user) => {
    if (user) {
      id = user._id;
      console.log(id, "id");
      console.log(req.body.option, "options");

      const sub = new subcategories({
        cat_id: id,
        name: [],
        option: req.body.option,
      });
      sub.save((error, user) => {
        if (user) {
          console.log("success");
        } else if (error) {
          console.log("error");
        }
      });
    } else if (error) {
      console.log("something went wrong");
    }
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
  subcategories.findOne(
    { cat_id: req.params.id },

    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
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
        res.send(error);
      } else {
        res.json(req.body);
      }
    }
  );
});

module.exports = router;
