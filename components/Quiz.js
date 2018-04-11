import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SubmitBtn, TextButton } from '../utils/helpers';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import { green, red, white } from '../utils/colors';
import PercentageCircle from 'react-native-percentage-circle';

class Quiz extends Component {

  state = {
    counter: 0,
    face: 'question',
    correct: 0,
    incorrect: 0,
    enable: false
  }

  static navigationOptions = ({ navigation }) => {
    const { title, deck } = navigation.state.params
    return {
      title,
      deck
    }
  }

  calculatePercentage = () => {
    const { counter, correct, incorrect } = this.state;
    return Math.round((correct * 100) / counter);
  }

  evaluateResult = (result) => {
    if (result === 100) {
      return 'You rock!';
    } else if (result < 100 && result > 80) {
      return 'Good job';
    } else if (result < 80 && result > 60)  {
      return 'Poor!';
    } else if (result < 60 && result > 10) {
      return 'What...?';
    } else {
      return 'That´s sad!';
    }
  }

  changeFace = (face) => {
    this.setState({ face });
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

    this.setState({
      [result]: this.state[result] + 1,
      counter: this.state.counter + 1,
      face: 'question'
    });
  }

  render() {

    const { counter, face, correct, incorrect, enable } = this.state;
    const { deck, decks } = this.props;

    return (
      <View style={ styles.container }>

        {enable === true ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <PercentageCircle radius={ 70 } percent={ this.calculatePercentage() } color={ green } borderWidth={ 4 }
                textStyle={{ fontSize: 24 }}></PercentageCircle>
                <Text>{this.evaluateResult(this.calculatePercentage())}</Text>
                <Text>Counter: { counter }</Text>
                <Text>Correct: { correct }</Text>
                <Text>Incorrect: { incorrect }</Text>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 3 }}>
                <View>
                  <Text style={{ padding: 10 }}> { `${counter + 1} / ${decks[deck].questions.length}` }</Text>
                </View>

                {face === 'question' ? (
                  <View>
                    <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 10 }}>
                      { decks[deck].questions[counter].question }
                    </Text>

                    <TextButton onPress={ () => this.changeFace('answer') }>
                      Answer
                    </TextButton>
                  </View>
                ) : (
                  <View>
                    <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 10 }}>
                      { decks[deck].questions[counter].answer }
                    </Text>

                    <TextButton onPress={ () => this.changeFace('question') }>
                      Question
                    </TextButton>
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <SubmitBtn onPress={ () => this.correctAndIncorrect('correct') } onLabel='Correct'
                  onParentStyles={{ width: 200, backgroundColor: green, marginBottom: 20 }} />
                  <SubmitBtn onPress={ () => this.correctAndIncorrect('incorrect') } onLabel='Incorrect'
                    onParentStyles={{ width: 200, backgroundColor: red }} />
                  </View>
                </View>
              )}

            </View>
          );
        }
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: white
        },
        column: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around'
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
