"use strict";

var _interopRequireDefault = require("F:\\kdtool\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("F:\\kdtool\\node_modules\\@babel\\runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("F:\\kdtool\\node_modules\\@babel\\runtime/helpers/asyncToGenerator"));

// import portfinder from 'portfinder';
var portfinder = require('portfinder'); //export default


module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(port) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!port) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", port);

          case 2:
            if (!process.env.PORT) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", parseInt(process.env.PORT, 10));

          case 4:
            portfinder.basePort = process.env.BASE_PORT || 8100;
            portfinder.highestPort = 9000;
            return _context.abrupt("return", portfinder.getPortPromise());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();