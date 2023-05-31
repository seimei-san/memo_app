const Memo = require("../models/Memo");
// const { options } = require("../routes/memos");

const getAllMemos = async (req, res) => {
  try {
    const allMemos = await Memo.find({});
    res.status(200).json(allMemos);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createMemo = async (req, res) => {
  try {
    const createMemo = await Memo.create(req.body);
    res.status(200).json(createMemo);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleMemo = async (req, res) => {
  try {
  const getSingleMemo = await Memo.findOne({_id: req.params.id});
  if(!getSingleMemo) {
    return res.status(404).json(`_id: ${req.params.id} not exist`);
  }
  res.status(200).json(getSingleMemo);
  } catch (err) {
  res.status(500).json(err); 
  }
};

const updateMemo = async (req, res ) => {
  try {
    const updateMemo = await Memo.findOneAndUpdate(
      {_id: req.params.id},
      req.body,
      {
        new: true
      }
      );
    if(!updateMemo) {
      return res.status(404).json(`_id: ${req.params.id} not exist`);
    }
    res.status(200).json(updateMemo);
    } catch (err) {
    res.status(500).json(err); 
    }
};

const deleteMemo = async (req, res) => {
  try {
    const deleteMemo = await Memo.findOneAndDelete(
      {_id: req.params.id},
      req.body
      // {
      //   new: true
      // }
      );
    if(!deleteMemo) {
      return res.status(404).json(`_id: ${req.params.id} not exist`);
    }
    res.status(200).json(deleteMemo);
    } catch (err) {
    res.status(500).json(err); 
    }
};

module.exports = {
  getAllMemos,
  createMemo,
  getSingleMemo,
  updateMemo,
  deleteMemo
}