const Event = require("../models/eventModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);

  res.status(201).json({ newEvent });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const { start, end, page, items_per_page, sort_col, sort_type } = req.query;

  let query = {};
  if (start !== "All" && end !== "All") {
    query.created_at = {
      $gte: new Date(start),
      $lte: new Date(end),
    };
  }

  // Create a sorting object
  let sort = {};
  sort_col && sort_type
    ? (sort[sort_col] = sort_type === "desc" ? -1 : 1)
    : (sort["created_at"] = -1);

  const total = await Event.countDocuments(query);
  const total_pages = Math.ceil(total / +items_per_page);

  const events = await Event.find(query)
    .sort(sort)
    .skip((page - 1) * +items_per_page)
    .limit(+items_per_page);

  if (!events) {
    return next(new AppError("No events found!", 404));
  }

  res.status(200).json({ events, total, total_pages });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError("No event found with that ID!", 404));
  }

  res.status(200).json({ event });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError("No event found with that ID!", 404));
  }

  res.status(204).json({
    status: "success",
  });
});
