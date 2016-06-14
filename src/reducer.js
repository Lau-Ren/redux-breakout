import clone from 'clone'

const moods = [
  'lethargic',
  'mopey',
  'hyper',
  'agro',
  'aggressive',
  'dopey',
  'ecstatic'
]

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState = ['dopey','dopey','dopey','dopey']

export default (state = initialState, action) => {

	switch (action.type) {
		case 'UPDATE_MOOD' :
			let newState = clone(state)
			console.log("new State", newState)
			newState[action.id] =moods[randomNumber(0, moods.length - 1)]
			console.log("family member ", action.id, " is now...", newState[action.id])
			return newState
		default :
			return state
	}
}