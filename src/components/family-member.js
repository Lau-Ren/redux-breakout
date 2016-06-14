import React from 'react'
import MoodButton from './mood-button.js'

export default React.createClass({
	getInitialState: function () {
		return {
			id: this.props.id,
			mood: 'neutral'
		}
	},


	render () {
		return (
			<div className="family-member">
				<h2>{this.props.name}</h2>
				<p>Mood: {this.props.mood}</p>
				<MoodButton id={this.props.id} changeMood={this.props.changeMood}/>
			</div>

		)
	}

})