const STATUS = {
  ok: 200,
  notFound: 404,
  inserted: 201,
  deleted: 204,
};

const getHTTPStatus = (status) => STATUS[status];

module.exports = getHTTPStatus;