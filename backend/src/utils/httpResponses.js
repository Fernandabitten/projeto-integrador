export const sendSuccess = (res, status, data) => {
  return res.status(status).json({ success: true, data });
};

export const sendError = (res, status, message, details = null) => {
  return res.status(status).json({
    success: false,
    message,
    ...(details && { details }),
  });
};
