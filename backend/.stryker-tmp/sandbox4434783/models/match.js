"use strict";

var cov_1fj7heon21 = function () {
  var path = "/home/local/pyykkomi/liiga/backend/models/match.js";
  var hash = "72c0e29b90853cf6d69aa1809bbc5f5927f727c6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/local/pyykkomi/liiga/backend/models/match.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 6,
          column: 20
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 29,
          column: 5
        }
      },
      "2": {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 203,
          column: 5
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 3
          }
        },
        loc: {
          start: {
            line: 5,
            column: 25
          },
          end: {
            line: 7,
            column: 3
          }
        },
        line: 5
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 9,
            column: 3
          }
        },
        loc: {
          start: {
            line: 9,
            column: 26
          },
          end: {
            line: 30,
            column: 3
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 32,
            column: 2
          },
          end: {
            line: 32,
            column: 3
          }
        },
        loc: {
          start: {
            line: 32,
            column: 32
          },
          end: {
            line: 204,
            column: 3
          }
        },
        line: 32
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    hash: "72c0e29b90853cf6d69aa1809bbc5f5927f727c6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  return coverage[path] = coverageData;
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Match = void 0;

var _db = require("db");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Match =
/*#__PURE__*/
function (_Model) {
  _inherits(Match, _Model);

  function Match() {
    _classCallCheck(this, Match);

    return _possibleConstructorReturn(this, _getPrototypeOf(Match).apply(this, arguments));
  }

  _createClass(Match, null, [{
    key: "tableName",
    get: function get() {
      cov_1fj7heon21.f[0]++;
      cov_1fj7heon21.s[0]++;
      return 'matches';
    }
  }, {
    key: "jsonSchema",
    get: function get() {
      cov_1fj7heon21.f[1]++;
      cov_1fj7heon21.s[1]++;
      return {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          tournament_id: {
            type: 'integer'
          },
          season_id: {
            type: 'integer'
          },
          round: {
            type: 'integer'
          },
          date: {
            type: 'date-time'
          },
          time: {
            type: 'time'
          },
          status: {
            type: 'integer'
          },
          min: {
            type: 'integer'
          },
          width: {
            type: 'integer'
          },
          height: {
            type: 'integer'
          },
          home_team_id: {
            type: 'integer'
          },
          away_team_id: {
            type: 'integer'
          },
          home_score: {
            type: 'integer'
          },
          away_score: {
            type: 'integer'
          }
        }
      };
    }
  }, {
    key: "relationMappings",
    get: function get() {
      cov_1fj7heon21.f[2]++;
      cov_1fj7heon21.s[2]++;

      /*     const Tournament = require('./tournament')
          const Season = require('./season')
          const Team = require('./team')
          const MatchPlayerStatistic = require('./matchPlayerStatistic')
          const MatchTeamStatistic = require('./matchTeamStatistic')
          const MatchTeamInfo = require('./matchTeamInfo')
       */
      return {
        tournament: {
          relation: _db.Model.BelongsToOneRelation,
          modelClass: _path["default"].join(__dirname, 'tournament'),
          join: {
            from: 'matches.tournament_id',
            to: 'tournaments.id'
          }
        },
        season: {
          relation: _db.Model.BelongsToOneRelation,
          modelClass: _path["default"].join(__dirname, 'season'),
          join: {
            from: ['matches.tournament_id', 'matches.season_id'],
            to: ['seasons.tournament_id', 'seasons.id']
          }
        },
        home_team: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'team'),
          join: {
            from: 'matches.home_team_id',
            to: 'teams.id'
          }
        },
        away_team: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'team'),
          join: {
            from: 'matches.away_team_id',
            to: 'teams.id'
          }
        },
        home_players: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'matchPlayerStatistic'),
          join: {
            from: ['matches.home_team_id', 'matches.id'],
            to: ['match_player_statistics.team_id', 'match_player_statistics.match_id']
          }
        },
        away_players: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'matchPlayerStatistic'),
          join: {
            from: ['matches.away_team_id', 'matches.id'],
            to: ['match_player_statistics.team_id', 'match_player_statistics.match_id']
          }
        },
        home_statistics: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamStatistic'),
          join: {
            from: ['matches.home_team_id', 'matches.id'],
            to: ['match_team_statistics.team_id', 'match_team_statistics.match_id']
          }
        },
        away_statistics: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamStatistic'),
          join: {
            from: ['matches.away_team_id', 'matches.id'],
            to: ['match_team_statistics.team_id', 'match_team_statistics.match_id']
          }
        },
        home_team_info: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamInfo'),
          join: {
            from: ['matches.home_team_id', 'matches.id'],
            to: ['match_team_infos.team_id', 'match_team_infos.match_id']
          }
        },
        away_team_info: {
          relation: _db.Model.HasOneRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamInfo'),
          join: {
            from: ['matches.away_team_id', 'matches.id'],
            to: ['match_team_infos.team_id', 'match_team_infos.match_id']
          }
        },
        home_team_tactics: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamTactic'),
          join: {
            from: ['matches.home_team_id', 'matches.id'],
            to: ['match_team_tactics.team_id', 'match_team_tactics.match_id']
          }
        },
        away_team_tactics: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'matchTeamTactic'),
          join: {
            from: ['matches.away_team_id', 'matches.id'],
            to: ['match_team_tactics.team_id', 'match_team_tactics.match_id']
          }
        },
        goals: {
          relation: _db.Model.HasManyRelation,
          modelClass: _path["default"].join(__dirname, 'goal'),
          join: {
            from: ['matches.id'],
            to: ['goals.match_id']
          }
        }
      };
    }
  }]);

  return Match;
}(_db.Model);

exports.Match = Match;