import React from 'react'
import Header from './Header.js'
import FamilyMember from './family-member.js'

export default React.createClass({

  changeMood : function (familyMemberId) {
     this.props.store.dispatch({
      type: 'UPDATE_MOOD', 
      state: this.props.moodStates, 
      id: familyMemberId})
     
  },

  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'  />
        <FamilyMember id={0} name="Mum" changeMood={this.changeMood} mood={this.props.moodStates[0]}/>
        <FamilyMember id={1} name="Donny" changeMood={this.changeMood} mood={this.props.moodStates[1]}/>
        <FamilyMember id={2} name="Daughter" changeMood={this.changeMood} mood={this.props.moodStates[2]}/>
        <FamilyMember id={3} name="Son" changeMood={this.changeMood} mood={this.props.moodStates[3]}/>
      </div>
    )
  }
})
