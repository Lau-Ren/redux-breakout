# redux-breakout
## An introduction to redux
Redux is a powerful tool for **controlling state within react apps**. We're going to build an app that helps you keep track of your family's happiness.   
They're starting to worry you.

### 1.
Broadly speaking, redux is a *state management tool*. So before we can dive into it, we need some states to manage. Let's make a new react component for our family members called FamilyMember.js:

   `public/components/FamilyMember.js`

Inside of FamilyMember.js, we're going to write some basic code to display in our render, including the name of our family member as a *prop*, and we're going to set their initial mood state:

```
// FamilyMember.js

import React from 'react'

export default React.createClass({
  getInitialState: function () {
    return {
      mood: 'Neutral'
    }
  },

  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.state.mood}</p>
      </div>
    )
  }
})
```
Now over in our App.js render, we're going to add a little code to get our family members displaying on the page. Remember to also require in the FamilyMember.js file, we're gonna need that.

```
// App.js
...
import FamilyMember from './FamilyMember.js'

// you're adding this! ^

export default React.createClass({
  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>

        <FamilyMember name='Mom'/>
        <FamilyMember name='Dad'/>
        <FamilyMember name='Daughter'/>
        <FamilyMember name='Son'/>

        // and these! ^

      </div>
    )
  }
})
```
Now it's time to run `npm start` from your terminal and open `index.html` in your web browser. And, all going well, boom, you've got family members rendering on your page. "What is this magic!?" you ask, "I'm not running a server or anything!" Because of the way we have configured our webpack, you don't need to serve your content on a local host. Webpack bundles everything for us and `index.html` just renders everything it needs from that bundle.

### 2.
So, setting their initial states to neutral was all well and good, but we all know that's a little too good to be true. We need to be able to *change* that state somehow. We're gonna need a few different things here...

1. A button next to each family member, for changing their mood.
1. An array of mood states to cycle though, ie: [Neutral, Depressed, Anguish, Utter Agony]
1. When we click the buttons, we need something to **control our states**...

Something like, Redux!
First, let's get those buttons displaying. Howsabout we create a new react class for that. Something along the lines of:

`public/components/MoodButton.js`

Inside of MoodButton.js, we will write some basic render code that displays an HTML button. Also, when it's clicked, it will perform a function that will be passed in later as a prop.

```
// MoodButton.js

import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='mood-button'>
        <button onClick={() => this.props.changeMood()}>Change Mood</button>
      </div>
    )
  }
})
```

What's happening in that `onClick`? We're getting an anonymous function to call our props function. That seems kind of unnecessary. I agree, but currently React automatically calls button `onClick` functions when they render for some reason. Wrapping them in an additional anonymous function seems to fix that issue. If you know why, let me know. It's annoying.

Currently that `onClick` is calling `this.props.changeMood()`. That might be a slight issue, given that `changeMood()` doesn't actually exist. So let's create it up in our parent element, `FamilyMember.js`.

```
// FamilyMember.js
...
import MoodButton from './MoodButton.js'

// don't forget to import the button! ^

export default React.createClass({
  ...
  },

  changeMood: function () {
    const moods = [
      'Dead',
      'Dying',
      'Awful',
      'Bad',
      'Neutral',
      'Good',
      'Great',
      'Amazing',
      'Perfect'
    ]
    Ω(moods)
  },

  // you're adding all of this crap ^

  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.state.mood}
        </p>

        <MoodButton changeMood={this.changeMood}/>

        // and adding the button into your render ^

      </div>
    )
  }
})
```
So there's a few things going on here. First off; *WHAT* is that weird `Ω` character and where can I get one?! It's an omega symbol, you philistine, it's an amazing npm package for quick, smart console.logs. It's globally installed on this project, but you can get it for your own personal use at [this delicious location](https://github.com/josephquested/lomega "Ω LOMEGA Ω"). It's called Lomega.

We also add a new function here, called `changeMood`. We make a little `moods` array, (add whatever you want in there, it won't be on the test), and then we Lomega the array. We just want to check to see if our button is working, we'll build the real functionality later.

Finally we add the a `<MoodButton changeMood={this.changeMood}/>` tag into our return function. This means that, for every family member we render, we'll also render their own personal mood button with a `changeMood` prop.

Now go to your browser, refresh, and try clicking the buttons. All going well, you should see the `moods` array appearing in your developer console. If not, running `npm start` again. It should have automatically re-bundled, but you know how these things are sometimes.

### 3.
