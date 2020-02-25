const { config } = require("../../config");
const boom = require("@hapi/boom");
const debug = require("debug")("app:error");
const isRequestAjaxOrApi = require("../../utils/isRequestAjaxOrApi");

function whithErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack } //Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  debug(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next){
  if(!err.isBoom){
      next(boom.badImplementation(err));
    }
    next(err);
  }

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;
  // catch errors for AJAX request
    if (isRequestAjaxOrApi(req) || res.headersSent ){
      res.status(statusCode).json(whithErrorStack(payload, err, stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output : { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.render("error", whithErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
};