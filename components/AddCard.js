import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { white, purple, gray } from '../utils/colors';
import { addCard } from '../actions';
import { addCardLocal } from '../utils/api';
import { SubmitBtn } from '../utils/helpers';

class AddCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title, deck } = navigation.state.params
    return {
      title
    }
  }

  submit = () => {
    if (this.state.question.length < 3) {
      alert('Your new Deck title length should be greater than 3 chars');
    } else if (this.state.answer.length < 3) {
      alert('Your new Deck title length should be greater than 3 chars');
    } else {

      const formattedCard = {
        title: this.props.navigation.state.params.deck,
        question: this.state.question,
        answer: this.state.answer
      }

      addCardLocal(formattedCard);
      this.props.dispatch(addCard(formattedCard));

      this.setState({ question: '', answer: '' });
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          style={ styles.inputText }
          onChangeText={ (question) => this.setState({ question }) }
          value={ this.state.question } placeholder='This is a question...'/>
        <TextInput
          style={ styles.inputText }
          onChangeText={ (answer) => this.setState({ answer }) }
          value={ this.state.answer } placeholder='This is an answer...'/>
        <SubmitBtn onPress={ this.submit } onLabel='Submit' />

        <Text>
          {  JSON.stringify(this.props.decks['JavaScript']) }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  inputText: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    padding: 5,
    marginBottom: 40
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddCard);
