//

const response = async (res, statusCode, success, message, data) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

//! Export
export default response;
