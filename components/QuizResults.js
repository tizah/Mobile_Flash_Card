import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons, Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

function QuizResults(props) {
    useEffect(() => {
        clearLocalNotification().then(setLocalNotification);
    }, []);

    const navigation = useNavigation();

    const store = props.store;
    const thisDeckId = props.route.params.id;
    const numberOfCorrectAnswers = props.route.params.numberOfCorrectAnswers;
    const numberOfWrongAnswers = props.route.params.numberOfWrongAnswers;
    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.title}>Results</Text>
            <View style={[styles.card, styles.cardQuestions]}>
                <Text style={{ fontSize: 18, color: '#1D3557' }}>
                    Correct Answers:
                </Text>
                <View
                    style={[{ position: 'absolute', right: 20 }, styles.number]}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#1D3557',
                            fontWeight: 'bold',
                        }}
                    >
                        {numberOfCorrectAnswers}
                    </Text>
                </View>
            </View>
            <View style={[styles.card, styles.cardQuestions]}>
                <Text style={{ fontSize: 18, color: '#1D3557' }}>
                    Incorrectly answered questions:
                </Text>
                <View
                    style={[{ position: 'absolute', right: 20 }, styles.number]}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            color: '#1D3557',
                            fontWeight: 'bold',
                        }}
                    >
                        {numberOfWrongAnswers}
                    </Text>
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={[styles.card, styles.percentage]}>
                    <Text style={styles.title}>
                        {Math.round(
                            (numberOfCorrectAnswers * 100) /
                                (numberOfWrongAnswers + numberOfCorrectAnswers)
                        )}
                        %
                    </Text>
                </View>
            </View>

            <View
                style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
            >
                <TouchableOpacity
                    style={[styles.card, styles.btns]}
                    onPress={() => {
                        navigation.navigate('TakeQuiz', { id: thisDeckId });
                    }}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            top: 30,
                            color: '#1D3557',
                        }}
                    >
                        Restart Quiz
                    </Text>
                    <MaterialCommunityIcons
                        name="restart"
                        size={40}
                        color="#1D3557"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.card, styles.btns]}
                    onPress={() => {
                        navigation.navigate('Deck', { id: thisDeckId });
                    }}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            top: 30,
                            color: '#1D3557',
                        }}
                    >
                        Back to Deck
                    </Text>
                    <Ionicons name="return-down-back-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#1D3557',
        fontWeight: 'bold',
        fontSize: 24,
    },
    card: {
        backgroundColor: 'white',
        /* box shadow */
        shadowColor: '#adb5bd',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    cardQuestions: {
        borderRadius: 20,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        marginVertical: 15,
    },
    number: {
        width: 50,
        height: 50,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btns: {
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});

function mapStateToProps(state) {
    return {
        store: state,
    };
}

export default connect(mapStateToProps)(QuizResults);
