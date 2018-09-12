
const initialState = {
  characters: [],
  characterCreated: false,
  currentPage: null,
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

    case 'CHARACTER_CREATED_FALSE':
      return {
        ...state,
        characterCreated: false
      };

    case 'CHARACTER_CREATED_TRUE':
      return {
        ...state,
        characterCreated: true
      };

    case 'CREATE_NEW_CHARACTER':
      return {
        ...state,
        newCharacter: action.payload
      };

    case 'LOGOUT':
      return initialState;

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
      };

    case 'UPDATE_CHARACTER':
      const characters = state.characters.filter(char => char.id !== action.payload.id )
      return {
        ...state,
        characters: [
          ...characters,
          action.payload
        ]
      };

    default:
      return state;
  }
}
