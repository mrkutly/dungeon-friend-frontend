export const addCharacter = (character) => {
  return {
    type: "ADD_CHARACTER",
    payload: character
  }
}

export const createNewCharacter = (character) => {
  return {
    type: "CREATE_NEW_CHARACTER",
    payload: character
  }
}

export const setCharacters = (characters) => {
  return {
    type: "SET_CHARACTERS",
    payload: characters
  }
}

export const setCurrentJob = (job) => {
  return {
    type: "SET_CURRENT_JOB",
    payload: job
  }
}

export const setCurrentRace = (race) => {
  return {
    type: "SET_CURRENT_RACE",
    payload: race
  }
}

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user
  }
}

export const setJobs = (jobs) => {
  return {
    type: "SET_JOBS",
    payload: jobs
  }
}

export const setRaces = (races) => {
  return {
    type: "SET_RACES",
    payload: races
  }
}
