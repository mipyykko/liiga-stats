export const testSeasons = [
  {
    id: 1, // this is the seasonid
    name: 'Test. Testing Tournament - 2019',
    first_match: 1
  },
  {
    id: 2,
    name: 'Test. Testing Tournament - 2019-2020',
    first_match: 2
  },
  {
    id: 3,
    name: 'invalidtournamentname'
  }
]

export const expectedTournament = {
  id: 1,
  name: 'Testing Tournament',
  country: 'Test'
}

export const expectedSeasons = {
  1: {
    id: 1,
    tournament_id: 1,
    name: 'Testing Tournament - 2019',
    start_year: 2019,
    end_year: 2019,
    first_match_id: 1
  },
  2: {
    id: 2,
    tournament_id: 1,
    name: 'Testing Tournament - 2019-2020',
    start_year: 2019,
    end_year: 2020,
    first_match_id: 2
  }
}

export const testMatches = [
  {
    match_id: 1,
    tournament_id: 1,
    // incomplete match to be updated
    status: 4,
    first_team: { 
      team_id: 1,
      name: 'first team',
      logo: 'logo1.jpg',
      statistics: {
        cw: 3,
        yc: 2
      }
    },
    second_team: {
      team_id: 2,
      name: 'second team',
      logo: 'logo2.jpg',
      statistics: {
        cw: 96,
        yc: 6
      }
    },
  },
  {
    // complete match
    match_id: 1,
    tournament_id: 1,
    status: 5,
    round: 1,
    date: '01-01-2019',
    min: 94,
    first_team: { 
      team_id: 1,
      name: 'first team',
      logo: 'logo1.jpg',
      statistics: {
        cw: 3,
        yc: 2
      }
    },
    second_team: {
      team_id: 2,
      name: 'second team',
      logo: 'logo2.jpg',
      statistics: {
        cw: 96,
        yc: 6
      }
    },
    score_first_team: 1,
    score_second_team: 1,
    first_team_coach_name: 'first',
    first_team_coach_surname: 'coach',
    second_team_coach_name: 'second',
    second_team_coach_surname: 'coach',
    tactics: [
      {
        tactics: [
          {
            team_id: 1,
            player_id: 1,
            position: 31,
            player_num: 1,
            half: 1,
            second: 0
          },
          {
            team_id: 2,
            player_id: 2,
            position: 32,
            player_num: 2,
            half: 1,
            second: 0
          }
        ],
        second: 0
      },
      {
        tactics: [
          {
            team_id: 1,
            player_id: 1,
            position: 31,
            player_num: 1,
            half: 2,
            second: 2700
          },
          {
            team_id: 2,
            player_id: 3,
            position: 32,
            player_num: 3,
            half: 2,
            second: 2700
          }
        ],
        second: 2700
      }
    ],
    events: [
      {
        player_id: 1,
        opponent_player_id: 2, // this should be the goalie
        type: 'goal',
        half: 1,
        minute: 20,
        second: 1,
        event_id: 1,
        action_code: 8010
      },
      {
        player_id: 2,
        opponent_player_id: 3,
        type: 'sub',
        team_id: 2,
        half: 2,
        minute: 46,
        second: 0,
        event_id: 2,
        action_code: 14000,
        pos_x: 12.0,
        pos_y: 12.0
      },
      {
        // double event: should not be counted
        player_id: 2,
        opponent_player_id: 3,
        type: 'sub',
        team_id: 2,
        half: 2,
        minute: 46,
        second: 0,
        event_id: 2,
        action_code: 14000,
        pos_x: 0.0,
        pos_y: 0.0
      },
      { 
        player_id: 2,
        opponent_player_id: 1, // ditto
        type: 'goal',
        half: 2,
        minute: 87,
        second: 27,
        action_code: 8010,
        event_id: 3
      }
    ],
    players: [
      {
        // a duplicate player with ok stats
        player_id: 1,
        position_id: 31,
        display_name: 'player1',
        photo: 'player1.jpg',
        team_id: 1,
        number: 1,
        statistics: { 
          g: 1,
          isi: 500
        }
      },
      {
        player_id: 1,
        position_id: 31,
        display_name: 'player1',
        photo: 'player1.jpg',
        team_id: 1,
        number: 1,
        statistics: {
          g: 1,
          isi: 500
        }
      },
      // a duplicate with ok stats and null stats
      {
        player_id: 2,
        position_id: 32,
        display_name: 'player2',
        photo: 'player2.jpg',
        team_id: 2,
        number: 2,
        statistics: {
          g: 0,
          isi: 150
        }
      },
      {
        player_id: 2,
        position_id: 32,
        display_name: 'player2',
        team_id: 2,
        number: 2,
        statistics: {
          g: null,
          isi: null
        }
      },
      // player with null stats and no duplicate
      {
        player_id: 3,
        position_id: 32,
        display_name: 'player3',
        team_id: 2,
        number: 3,
        statistics: {
          g: null,
          isi: null
        }
      },
      {
        // player with empty display name/null number
        player_id: 4,
        position_id: 53,
        display_name: '',
        number: null,
        team_id: 2,
        statistics: {
          g: null,
          isi: null
        }
      }
    ],
    goals: [
      // 1-0 goal with no assistant
      {
        scorer: {
          player_id: 1
        },
        half: 1,
        minute: 20,
        standard: 1,
        type: 1,
        side: 1,
        second: 1141
      },
      // 1-1 goal with assistant
      {
        scorer: {
          player_id: 2
        },
        assistant: {
          player_id: 3
        },
        half: 2,
        minute: 87,
        standard: 1,
        type: 1,
        side: 2,
        second: 5187
      }
    ]
  }, {
    match_id: 2,
    status: 5,
    first_team: { 
      team_id: 1,
      name: 'first team',
      logo: 'logo1.jpg',
      statistics: {
        cw: 0,
        yc: 0
      }
    },
    second_team: {
      team_id: 3,
      name: 'third team',
      logo: 'logo3.jpg',
      statistics: {
        cw: 6,
        yc: 6
      }
    },
    score_first_team: 0,
    score_second_team: 2,
    players: [
      {
        player_id: 1,
        position_id: 31,
        display_name: 'player1',
        team_id: 1,
        number: 1,
        statistics: {
          g: 0,
          isi: 300
        }
      },
      {
        player_id: 1,
        display_name: 'player1',
        position_id: 31,
        team_id: 1,
        number: 1,
        statistics: {
          g: 0,
          isi: 300
        }
      },
      {
        player_id: 5,
        display_name: 'player5',
        position_id: 33,
        team_id: 3,
        number: 2,
        statistics: {
          g: null,
          isi: null
        }
      }
    ],    
    goals: [
      { 
        // 0-1 own goal
        scorer: {
          player_id: 1
        },
        type: 2,
        half: 1,
        minute: 20,
        side: 2,
        second: 1162,
        standard: 1
      },
      {
        // 0-2 
        scorer: {
          player_id: 5
        },
        type: 1,
        half: 2,
        minute: 2,
        standard: 1,
        side: 2,
        second: 5187
      }
    ]
  },
]

const expectedMatches = [
  {
    id: 1,
    tournament_id: 1,
    season_id: 1,
    round: 1,
    date: '01-01-2019',
    min: 94,
    status: 5,
    home_team_id: 1,
    away_team_id: 2,
    home_score: 1,
    away_score: 1
  }
]

export const expectedTeams = [
  {
    id: 1,
    name: 'first team',
    display_name: 'first team',
    logo: 'logo1.jpg'
  },
  { 
    id: 2,
    name: 'second team',
    display_name: 'second team',
    logo: 'logo2.jpg' 
  },
  { 
    id: 3,
    name: 'third team',
    display_name: 'third team',
    logo: 'logo3.jpg'
  }
]

export const expectedTeamStatistics = {
  first: {
    team_id: 1,
    match_id: 1,
    cw: 3,
    yc: 2,
  },
  second: {
    team_id: 2,
    match_id: 1,
    cw: 96,
    yc: 6
  }
}

export const expectedTeamInfos = {
  first: {
    match_id: 1,
    team_id: 1,
    score: 1,
    score_pen: undefined,
    shirt_color: undefined,
    number_color: undefined,
    coach_name: 'first',
    coach_surname: 'coach'
  },
  second: {
    match_id: 1,
    team_id: 2,
    score: 1,
    score_pen: undefined,
    shirt_color: undefined,
    number_color: undefined,
    coach_name: 'second',
    coach_surname: 'coach'
  }
}

export const expectedTactics = [
  {
    team_id: 1,
    player_id: 1,
    position: 31,
    second: 0,
    match_id: 1
  },
  {
    team_id: 2,
    player_id: 2,
    position: 32,
    second: 0,
    match_id: 1
  },
  {
    team_id: 1,
    player_id: 1,
    position: 31,
    second: 2700,
    match_id: 1
  },
  {
    team_id: 2,
    player_id: 3,
    position: 32,
    second: 2700,
    match_id: 1
  }
]

export const expectedUniquePlayers = [
  {
    player_id: 1,
    position_id: 31,
    display_name: 'player1',
    photo: 'player1.jpg',
    team_id: 1,
    number: 1,
    statistics: {
      g: 1,
      isi: 500
    }
  },
  {
    player_id: 2,
    position_id: 32,
    display_name: 'player2',
    photo: 'player2.jpg',
    team_id: 2,
    number: 2,
    statistics: {
      g: 0,
      isi: 150
    }
  },
  {
    player_id: 3,
    position_id: 32,
    display_name: 'player3',
    team_id: 2,
    number: 3,
    statistics: {
      g: null,
      isi: null
    }
  },
  {
    player_id: 4,
    position_id: 53,
    display_name: '',
    number: null,
    team_id: 2,
    statistics: {
      g: null,
      isi: null
    }
  },
  {
    player_id: 5,
    display_name: 'player5',
    position_id: 33,
    team_id: 3,
    number: 2,
    statistics: {
      g: null,
      isi: null
    }
  }
]

export const expectedPlayers = [
  {
    id: 1,
    display_name: 'player1',
    photo: 'player1.jpg'
  },
  {
    id: 2,
    display_name: 'player2',
    photo: 'player2.jpg'
  },
  {
    id: 3,
    display_name: 'player3',
    photo: undefined
  },
  {
    id: 5,
    display_name: 'player5',
    photo: undefined
  }
]

export const expectedPlayerStatistics = [
  {
    player_id: 1,
    team_id: 1,
    match_id: 1,
    position_id: 31,
    number: 1,
    starting: true,
    g: 1,
    isi: 500,
    replaced_player_id: undefined,
    replacement_player_id: undefined
  },
  {
    player_id: 2,
    team_id: 2,
    match_id: 1,
    position_id: 32,
    number: 2,
    starting: true,
    replaced_player_id: undefined,
    replacement_player_id: 3,
    g: 0,
    isi: 150
  },
  {
    player_id: 3,
    team_id: 2,
    match_id: 1,
    position_id: 32,
    number: 3,
    starting: false,
    replaced_player_id: 2,
    replacement_player_id: undefined,
    g: null,
    isi: null
  }
]

export const expectedGoals = [
  { 
    match_id: 1,
    team_id: 1,
    opposing_team_id: 2,
    opposing_goalkeeper_id: 2,
    home_team_score: 1,
    away_team_score: 0,
    home_team_prev_score: 0,
    away_team_prev_score: 0,
    scorer_id: 1,
    assistant_id: null,
    half: 1,
    side: 1,
    second: 1141,
    standard: 1,
    type: 1,
  },
  {
    match_id: 1,
    team_id: 2,
    opposing_team_id: 1,
    opposing_goalkeeper_id: 1,
    home_team_score: 1,
    away_team_score: 1,
    home_team_prev_score: 1,
    away_team_prev_score: 0,
    scorer_id: 2,
    assistant_id: 3,
    half: 2,
    side: 2,
    standard: 1,
    type: 1,
    second: 5187
  }
]

export const expectedEvents = [
  {
    id: 1,
    player_id: 1,
    opponent_player_id: 2, // this should be the goalie
    type: 'goal',
    half: 1,
    second: 1,
    action_code: 8010,
    match_id: 1
  },
  {
    id: 2,
    player_id: 2,
    opponent_player_id: 3,
    type: 'sub',
    team_id: 2,
    half: 2,
    second: 0,
    action_code: 14000,
    pos_x: 12.0,
    pos_y: 12.0,
    match_id: 1
  },
  { 
    id: 3,
    player_id: 2,
    opponent_player_id: 1, // ditto
    type: 'goal',
    half: 2,
    second: 27,
    action_code: 8010,
    match_id: 1
  }
]  

export const detailedEvent = {
  players: [
    {
      id: 1,
      name_eng: 'player',
      lastname_eng: 'one'
    },
    {
      id: 2,
      name_eng: 'player',
      lastname_eng: 'two'
    },
    {
      id: 3,
      name_eng: null,
      lastname_eng: null
    }
  ]
}

export const expectedDetailedPlayers = [
  {
    id: 1,
    name: 'player',
    surname: 'one',
    display_name: 'player1',
    photo: 'player1.jpg'
  },
  {
    id: 2,
    name: 'player',
    surname: 'two',
    display_name: 'player2',
    photo: 'player2.jpg'
  }
]