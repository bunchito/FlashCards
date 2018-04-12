import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SubmitBtn, TextButton } from '../utils/helpers';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';
import { NavigationActions } from 'react-navigation';
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

  setColorForCP = (result) => {
    if (result > 50) {
      return green;
    } else {
      return red;
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

  restartQuiz = () => {
    this.setState({
      counter: 0,
      face: 'question',
      correct: 0,
      incorrect: 0,
      enable: false
    });
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  goHome = () => {
    const homeScreen = NavigationActions.navigate({
      routeName: 'Home',
      params: {}
    })
    this.props.navigation.dispatch(homeScreen)
  }

  render() {

    const { counter, face, correct, incorrect, enable } = this.state;
    const { deck, decks } = this.props;

    const percentageIs = this.calculatePercentage();
    const percentageColor = this.setColorForCP(percentageIs);

    return (
      <View style={ styles.container }>
        {enable === true ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              { percentageIs >= 30 ? (
                <PercentageCircle radius={ 70 } percent={ percentageIs }
                  color={ percentageColor } borderWidth={ 4 }
                  textStyle={{ fontSize: 44, color: percentageColor }}></PercentageCircle>
                ) : (
                  <Text style={{ fontSize: 44, color: percentageColor }}>{ `${percentageIs}%` }</Text>
                )}
                <Text style={{ fontSize: 24, color: percentageColor }}>{ this.evaluateResult(percentageIs) }</Text>
                <Text style={{ marginTop: 10 }}>Counter: { counter }</Text>
                <Text>Correct: { correct }</Text>
                <Text>Incorrect: { incorrect }</Text>
                <TextButton style={{ padding: 10 }} onPress={ () => this.restartQuiz() }>
                  Restart Quiz
                </TextButton>
                <TextButton onPress={ () => this.goBack() }>
                  Back to Deck
                </TextButton>
                <TextButton style={{ padding: 10 }} onPress={ () => this.goHome() }>
                  Try other Deck
                </TextButton>
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
                    <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                      { decks[deck].questions[counter].question }
                    </Text>
                    <TextButton onPress={ () => this.changeFace('answer') }>
                      Answer
                    </TextButton>
                  </View>
                ) : (
                  <View>
                    <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
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
