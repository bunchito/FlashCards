import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDeckResults } from '../utils/api';
import Deck from './Deck';
import { white } from '../utils/colors';

class DeckList extends Component {

  componentDidMount () {
    const { dispatch } = this.props;

    fetchDeckResults()
    .then((decks) => dispatch(receiveDecks(decks)));
  }

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('DeckDetails', item) }>
        <Deck onTitle={ item.title } onQuestions={ item.questions } onBorder={ 1 } />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ Object.values(this.props.decks) }
          renderItem={ this.renderItem }
          keyExtractor={ (item, index) => index }/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  })

  function mapStateToProps (decks) {
    return { decks }
  }

  export default connect(mapStateToProps)(DeckList);
