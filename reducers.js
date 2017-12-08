// Users
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  }
}

function user (state = initialUserState, action) {
  switch (user.type) {
    case "FETCHING_USER_SUCCESS":
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default:
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: ''
}

function users(state = initialState, action) {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      }
    case "UNAUTH_USER":
      return {
        ...state,
        isAuthed: false,
        authedId: ""
      }
    case "FETCHING_USER":
      return {
        ...state,
        isFetching: true
      }
    case "FETCHING_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "FETCHING_USER_SUCCESS":
    // Checks firebase if it returns null or it succeeds on returning the user
      return action.user === null
        ? {
          ...state,
          error: '',
          isFetching: false
        }
        : {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: user(state[action.uid], action)
      }
    default:
      return state;
  }
}

// Ducks
// don't worry about the same constant name,
// it will be moved to a separate file
const initialState = {
  isFetching: true,
  error: '',
}

function ducks(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_DUCK" :
      return {
        ...state,
        isFetching: true,
      };
    case "FETCHING_DUCK_ERROR" :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case "ADD_DUCK" :
    case "FETCHING_DUCK_SUCCESS" :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      }
    case "REMOVE_FETCHING" :
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case "ADD_MULTIPLE_DUCKS" :
      return {
        ...state,
        ...action.ducks
      }

    default:
      return state;
  }
}

// Feed
const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  duckIdsToAdd: [],
}

function feed(state = initialState, action) {
  switch (action.type) {
    case "SETTING_FEED_LISTENER" :
      return {
        ...state,
        isFetching: true,
      }
    case "SETTING_FEED_LISTENER_ERROR" :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "SETTING_FEED_LISTENER_SUCCESS" :
      return {
        ...state,
        isFetching: false,
        error: '',
        dickIds: action.duckIds,
        newDucksAvailable: false,
      }
    case "ADD_NEW_DUCK_ID_TO_FEED" :
      return {
        ...state,
        duckIdsToAdd: [action.duckId, ...state.duckIdsToAdd]
      }
    case "RESET_NEW_DUCKS_AVAILABLE" :
      return {
        ...state,
        duckIds: [...state.duckIdsToAdd, ...state.duckIds],
        duckIdsToAdd: [],
        newDucksAvailable: false,
      }
    default:
      return state;
  }
}

// Listeners
function listeners(state = {}, action) {
  switch (action.type) {
    case "ADD_LISTENER" :
      return {
        ...state,
        [action.listenerId]: true,
      }
    default:
      return state
  }
}

// Modal
const initialState = {
  isOpen: false
}
function modal(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL" :
      return {
        ...state,
        isOpen: true,
      }
    case "CLOSE_MODAL" :
      return {
        ...state,
        isOpen: false,
      }
    case "UPDATE_DUCK_TEXT" :
      return {
        ...state,
        duck: action.newDuckText,
      }
    default:
      return state
  }
}

// Users Likes
function usersLikes(state, action) {
  switch (action.type) {
    case "ADD_LIKE" :
      return {
        ...state,
        duckId: true,
      }
    case "REMOVE_LIKE" :
      // Can I just find the frikkin duckid and set it to false?
      // NO! Because that will MUTATE the state. Redux state is IMMUTABLE
      // Use filter & reduce for returning the new array with the removed duck
      return {
        ...state,
        duckId: Object.keys(state)
          .filter((duckId) => action.duckId !== duckId)
          .reduce((prev, current) => {
            prev[current] = state[current];
            return prev;
          }),
      }
    case "FETCHING_LIKES" :
      return {
        ...state,
        isFetching: true,
      }
    case "FETCHING_LIKES_ERROR" :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "FETCHING_LIKES_SUCCESS" :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      }
    default:
      return state;
  }
}

// Like Count
function count (state = 0, action) {
  switch (action.type) {
    case "ADD_LIKE" :
      return state + 1
    case "REMOVE_LIKE" :
      return state - 1
    default:
      return state
  }
}

const initialState = {
  error: '',
  isFetching: false,
}

function (state = initialState, action) {
  switch (action.type) {
    case "FETCHING_COUNT" :
      return {
        ...state,
        isFetching: true,
      }
    case "FETCHING_COUNT_ERROR" :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "FETCHING_COUNT_SUCCESS" :
      return {
        ...state,
        ...initialState,
        [action.duckId]: action.count,
      }
    case "ADD_LIKE" :
    case "REMOVE_LIKE" :
      return typeof state[action.duckId] === 'undefined'
        ? state
        : {
          ...state,
          [action.duckId]: count(state[action.duckId], action),
        }
    default:
      return state;
  }
}

//Users Ducks
const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: [],
}

function usersDuck(state = initialUsersDuckState, action) {
  switch (action.type) {
    case "ADD_SINGLE_USERS_DUCK" :
      return {
        ...state,
        duckIds: state.duckIds.concat([action.duckId])
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

function usersDucks(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_USERS_DUCKS" :
      return {
        ...state,
        isFetching: true,
      }
    case "FETCHING_USERS_DUCKS_ERROR" :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "FETCHING_USERS_DUCKS_SUCCESS" :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.duckIds
        }
      }
    case "ADD_SINGLE_USERS_DUCK" :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersDuck(state[action.uid], action),
      }
    default:
      return state;
  }
}

// Replies
