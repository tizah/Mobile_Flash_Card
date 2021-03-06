import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

function DeckItem(props) {
    const link = props.linkTo;
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const scaleUp = () => {
        Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 50,
            useNativeDriver: true,
        }).start(() => scaleDown());
    };
    const scaleDown = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 50,
            useNativeDriver: true,
        }).start(() => clickHandle());
    };

    const clickHandle = () => {
        console.log('click!');
        navigation.navigate(link, { id: props.thisDeckId });
    };

    return (
        <TouchableWithoutFeedback onPress={scaleUp}>
            <Animated.View
                style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
            >
                <Text style={styles.titles}>{props.title}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

function Deck(props) {
    const thisDeckId = props.route.params.id;
    const store = props.store;
    const thisDeck = store[thisDeckId];

    console.log(thisDeck);
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <AntDesign name="arrowleft" size={40} color="#1D3557" />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#1D3557',
                        }}
                    >
                        {thisDeck.title}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Play_400Regular',
                            color: '#457B9D',
                        }}
                    >
                        {thisDeck.cards.length} cards
                    </Text>
                </View>
            </View>
            
            <View style={styles.container}>
            <View style={styles.main_card}>
                <Text style={styles.title}>{thisDeck.title} </Text>
                <Text>{thisDeck.cards.length} cards </Text>
            </View>
            </View>
           
            <View style={styles.container}>
                <DeckItem
                    title="Add Card"
                    iconName="envelope-open-text"
                    linkTo="AddCard"
                    thisDeckId={thisDeckId}
                />
                {thisDeck.cards.length === 0 ? (
                    <View></View>
                ) : (
                    <DeckItem
                        title="Start Quiz"
                        iconName="pen-alt"
                        linkTo="TakeQuiz"
                        thisDeckId={thisDeckId}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: 'white',
        width: 300,
        height: 90,
        borderRadius: 5,
        /* box shadow */
        shadowColor: '#adb5bd',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        /* center content */
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main_card: {
        margin: 10,
        width: 360,
        height: 200,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titles: {
        position: 'absolute',
        top: 25,
        fontSize: 25,
        color: '#1D3557',
    },
    title: {
        color: '#1D3557',
        fontSize: 40,
    },
    navBar: {
        backgroundColor: 'white',
        display: 'flex',
        alignSelf: 'stretch',
        flexDirection: 'row',
        /* box shadow */
        shadowColor: '#adb5bd',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,

        marginBottom: 10,
        height: 100,
        alignItems: 'center',
    },
    cardCards: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        /* box shadow */
        shadowColor: '#adb5bd',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,

        height: 70,
        alignItems: 'center',

        marginBottom: 20,
    },
});

function mapStateToProps(state) {
    return {
        store: state,
    };
}

export default connect(mapStateToProps)(Deck);
