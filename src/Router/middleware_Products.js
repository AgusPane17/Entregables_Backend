function validateRequestBody(req, res, next) {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.price ||
    !req.body.stock ||
    !req.body.codeP ||
    !req.body.category
  ) {
    res.status(400).send({ status: "error", error: `Data isn't valid` });
  } else {
    next();
  }
}
function validatePut(req, res, next) {
  if (req.query.myVar == "id") {
    res
      .status(404)
      .send({ status: "error", error: `the id cannot be modified ` });
  } else {
    next();
  }
}
export { validatePut, validateRequestBody };
