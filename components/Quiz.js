import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SubmitBtn, TextButton } from '../utils/helpers';
//import { AppLoading } from 'expo';

import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

class Quiz extends Component {

  /*
  questionsRender = () => {
  if (this.props.onQuestions.length) {
  if (this.props.onQuestions.length === 1) {
  return <Text>{ this.props.onQuestions.length } card</Text>
} else {
return <Text>{ this.props.onQuestions.length } cards</Text>
}
}
}
*/

state = {
  counter: 0,
  face: 'question',
  correct: 0,
  incorrect: 0,
  enable: false
}

//ready: false,
//deck: '',
//questions: null,

static navigationOptions = ({ navigation }) => {
  const { title, deck } = navigation.state.params
  return {
    title,
    deck
  }
}

/*
grabData = () => {
const { deck, decks } = this.props;
this.setState({
deck: deck,
questions: decks[deck].questions
})
}
*/

componentDidMount () {
  /*
  this.grabData()
  .then(() => this.setState(() => ({ready: true})))
  */
  /*
  const { deck, decks } = this.props;
  this.setState({
  deck: deck,
  questions: decks[deck].questions
})
*/
}

changeFace = (face) => {
  this.setState({ face });
  console.log(face)
}

correctAndIncorrect = (result) => {

  if (this.state.counter + 1 === this.props.decks[this.props.deck].questions.length) {

console.log('clear notification ON')

clearLocalNotification()
  .then(setLocalNotification)

    this.setState({
      enable: true
    });
  }
  /*
  else {
  this.setState({
  [result]: this.state[result] + 1,
  counter: this.state.counter + 1
});
}
*/
this.setState({
  [result]: this.state[result] + 1,
  counter: this.state.counter + 1,
  face: 'question'
});
}

render() {



  //console.log(this.state.questions, this.props.title, this.props.deck);

  //console.log(this.state.deck);
  //console.log(this.state.questions);

  //console.log(this.props.decks);

  //console.log(this.props.decks[this.props.deck].questions);

  const { counter, face, correct, incorrect, enable } = this.state;
  const { deck, decks } = this.props;

  console.log(correct, incorrect);
  console.log(counter, enable);

  return (
    <View style={ styles.container }>

      {enable === true ? (
        <View>
          <Text>Counter: { counter }</Text>
          <Text>Correct: { correct }</Text>
          <Text>Incorrect: { incorrect }</Text>
        </View>
      ) : (
        <View>
          <View>
            <Text> { `${counter + 1} / ${decks[deck].questions.length}` }</Text>
          </View>

          {face === 'question' ? (
            <View>
              <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 30 }}>
                { decks[deck].questions[counter].question }
              </Text>

              <TextButton style={ {margin: 20 }} onPress={ () => this.changeFace('answer') }>
                Answer
              </TextButton>
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 30 }}>
                { decks[deck].questions[counter].answer }
              </Text>

              <TextButton style={{ margin: 20 }} onPress={ () => this.changeFace('question') }>
                Question
              </TextButton>
            </View>
          )}
          <SubmitBtn onPress={ () => this.correctAndIncorrect('correct') } onLabel='Correct' />
          <SubmitBtn onPress={ () => this.correctAndIncorrect('incorrect') } onLabel='Incorrect' />
        </View>
      )}

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  parent: {
    padding: 10
  }
});

function mapStateToProps (decks, { navigation }) {
  const { title, deck } = navigation.state.params
  return {
    decks,
    deck
  }
}

export default connect(mapStateToProps)(Quiz);
