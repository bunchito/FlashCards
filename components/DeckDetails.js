import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { white, purple, red } from '../utils/colors';
import { SubmitBtn } from '../utils/helpers';

class DeckDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title
    }
  }

  render() {

    const { title, decks } = this.props;

    return (
      <View style={ styles.container }>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 0.8, flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
            <Deck onTitle={ title } onQuestions={ decks[title].questions ? decks[title].questions : 0 } onBorder={ 0 } />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <SubmitBtn onPress={ () => this.props.navigation.navigate('AddCard', { title: 'Add a Card', deck: title }) }
            onLabel='Add card' onParentStyles={ [styles.addCard, { width: 200 } ] } onChildStyles={{ color: purple }} />
            {decks[title].questions != 0 && (
              <View>
                <SubmitBtn onPress={ () => this.props.navigation.navigate('Quiz', { title: 'Quiz', deck: title }) }
                  onLabel='Start Quiz' onParentStyles={{ width: 200 }} />
                </View>
              )}
            </View>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: white
      },
      addCard: {
        marginBottom: 20,
        backgroundColor: white,
        color: purple,
        borderColor: purple,
        borderWidth: 2
      }
    })

    function mapStateToProps (decks, { navigation }) {
      const { title } = navigation.state.params
      return {
        decks,
        title
      }
    }

    export default connect(mapStateToProps) (DeckDetails);
