
const initialState = {
  characters: [],
  currentRace: null,
  currentJob: null,
  currentUser: null,
  jobs: [],
  races: [],
  newCharacter: {}
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_CHARACTER':
      return {
        ...state,
        characters: [...state.characters, action.payload]
      };

    case 'EDIT_NEW_CHARACTER':
      return {
        ...state,
        newCharacter: {
          ...state.newCharacter,
          ...action.payload
        }
      };

    case 'SET_CHARACTERS':
      return {
        ...state,
        characters: action.payload
      };

    case 'SET_JOBS':
      return {
        ...state,
        jobs: action.payload
      };

    case 'SET_RACES':
      return {
        ...state,
        races: action.payload
      };

    case 'SET_CURRENT_JOB':
      return {
        ...state,
        currentJob: action.payload
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };

    case 'SET_CURRENT_RACE':
      return {
        ...state,
        currentRace: action.payload
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
}
