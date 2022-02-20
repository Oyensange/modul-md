'use strict';

const denied = exports;

denied.distinct = function(self) {
  if (self._fields && Object.keys(self._fields).length > 0) {
    return 'field selection and slice';
  }

  const keys = Object.keys(denied.distinct);
  let err;

  keys.every(function(option) {
    if (self.options[option]) {
      err = option;
      return false;
    }
    return true;
  });

  return err;
};
denied.distinct.select =
denied.distinct.slice =
denied.distinct.sort =
denied.distinct.limit =
denied.distinct.skip =
denied.distinct.batchSize =
denied.distinct.comment =
denied.distinct.maxScan =
denied.distinct.snapshot =
denied.distinct.hint =
denied.distinct.tailable = true;


// aggregation integration


denied.findOneAndUpdate =
denied.findOneAndRemove = function(self) {
  const keys = Object.keys(denied.findOneAndUpdate);
  let err;

  keys.every(function(option) {
    if (self.options[option]) {
      err = option;
      return false;
    }
    return true;
  });

  return err;
};
denied.findOneAndUpdate.limit =
denied.findOneAndUpdate.skip =
denied.findOneAndUpdate.batchSize =
denied.findOneAndUpdate.maxScan =
denied.findOneAndUpdate.snapshot =
denied.findOneAndUpdate.hint =
denied.findOneAndUpdate.tailable =
denied.findOneAndUpdate.comment = true;


denied.count = function(self) {
  if (self._fields && Object.keys(self._fields).length > 0) {
    return 'field selection and slice';
  }

  const keys = Object.keys(denied.count);
  let err;

  keys.every(function(option) {
    if (self.options[option]) {
      err = option;
      return false;
    }
    return true;
  });

  return err;
};

denied.count.slice =
denied.count.batchSize =
denied.count.comment =
denied.count.maxScan =
denied.count.snapshot =
denied.count.tailable = true;
