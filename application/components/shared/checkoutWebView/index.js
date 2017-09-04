import React, { Component } from 'react';
import { Text, View, } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import CheckoutWebViewWrap from './checkoutWebViewWrap'
import SaveCardOptionBox from './saveCardOptionBox';

import * as userTypes from '../../../statics/actions/user';

class CheckoutWebView extends Component {
    onSaveCardToggle(checked) {
        this.props.actions.persistPaymentMethod(!checked);
    }

    render() {
        const {userAction, auth, persistPaymentMethod} = this.props.user;
        const {navigation} = this.props;
        const isLoggedIn = auth && auth.token;
        const isRemoteAuthorized = auth && auth.remoteAuthorized;

        const show = userAction === userTypes.SETTING_ONE_TIME_PAYMENT;

        return (
            <View
            style={{
                position: 'absolute',
                top: show ? 0 : '100%',
                opacity: show ? 1 : 0,
                height: '100%',
                width: '100%'
            }}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0, .5)',
                        position: 'absolute',
                        top:     0,
                        height: '100%',
                        width: '100%'
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top:     0,
                        left:   0,
                        right: 0,
                        height: !isLoggedIn || !isRemoteAuthorized ? 420 : 350,
                        width: '100%'
                    }}
                >
                    <Card>
                        <View
                            style={{
                                flex: 1,
                                margin: 10,
                                maxHeight: !isLoggedIn || !isRemoteAuthorized ? 290 : 285,
                                width: '100%',
                            }}
                        >
                            <CheckoutWebViewWrap />
                        </View>
                    </Card>
                    <Card
                            styles={{
                                card: {
                                    flex: !isLoggedIn || !isRemoteAuthorized ? .4 : .15 ,
                                }
                            }}
                    >
                        <View
                            style={{
                                height: !isLoggedIn || !isRemoteAuthorized ? 400 : 200,
                                width: '100%'
                            }}
                        >
                            <SaveCardOptionBox
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    width: '100%'
                                }}
                                navigate={navigation.navigate}
                                isLoggedIn={isLoggedIn}
                                isRemoteAuthorized={isRemoteAuthorized}
                                checkboxCb={this.onSaveCardToggle.bind(this, persistPaymentMethod)}
                                persistPaymentMethod={persistPaymentMethod}
                            />
                        </View>
                    </Card>

                    <View
                        style={{
                            flex: .01,
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: 100,
                            width: '100%'
                        }}
                    >
                        <Button
                            style={{
                                ...styles.buttonStyle,
                                alignSelf: 'center'
                            }}
                            onPress={persistPaymentMethod ? this.props.actions.saveCard : this.props.actions.saveNonce}
                        >
                            Save
                        </Button>
                        <Button
                            style={{
                                ...styles.buttonStyle,
                                alignSelf: 'center'
                            }}
                            onPress={this.props.actions.closeSetOneTimePayment}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}

const mapState = (state) => {
    return {
        user: state.user
    };
};

const mapDispatch = dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
});

export default
    connect(mapState, mapDispatch)(CheckoutWebView);


const buttonStyle = {
	padding:15,
	margin: 10,
	height:55,
	overflow:'hidden',
	borderRadius:4,
	backgroundColor: '#41495a',
	fontSize: 20,
	color: 'grey',
};

const styles = {
	tabContainer: {
		flex: 1,
		backgroundColor: 	'#1f232b',
	},
	container: {
        backgroundColor: 	'#1f232b',
        height:             '100%',
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#313744',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
};