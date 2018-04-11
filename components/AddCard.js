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

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
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

      this.goBack();
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 35, textAlign: 'center', marginBottom: 30 }}>Great! You want to add a Card!</Text>
          <TextInput
            style={ styles.inputText }
            onChangeText={ (question) => this.setState({ question }) }
            value={ this.state.question } placeholder='Type here your question...'/>
            <TextInput
              style={ styles.inputText }
              onChangeText={ (answer) => this.setState({ answer }) }
              value={ this.state.answer } placeholder='Type here your answer...'/>
              <SubmitBtn onPress={ this.submit } onLabel='Submit' onParentStyles={{ backgroundColor: purple }} />
            </View>
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
      }
    });

    function mapStateToProps (decks) {
      return {
        decks
      }
    }

    export default connect(mapStateToProps)(AddCard);
