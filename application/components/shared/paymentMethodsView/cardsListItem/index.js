import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../../actions';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../../statics/styles';

class CardListItem extends Component {
	render = () => {
		const {actions, idx, card_brand, last_4, isSelected} = this.props;
		return (
		<Button
			onPress={actions.selectCard.bind(this, idx)}
		>
			<Card>
				{
					isSelected ? (
						<AwesomeIcon
							style={{
								position: 'absolute',
								left: 10,
								top: 8
							}}
							name="check" size={30} color="grey" />
					) : null
				}
				<View>
					<CardContent>
						<Text>
							XXXX XXXX XXXX {last_4} {card_brand}
						</Text>
					</CardContent>
				</View>
				<View
					style={{
						position: 'absolute',
						right: 10,
						top: 8
					}}
				>
					<Button
						onPress={actions.removeCard.bind(this, idx)}
					>
						<AwesomeIcon
							name="close" size={30} color="grey" />
					</Button>
				</View>
			</Card>
		</Button>);
	}
}

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(null, mapDispatch)(CardListItem);