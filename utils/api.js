import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const NOTIFICATION_KEY = 'Flashcard:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: 'STUDY NOW!',
        body: 'Do not forget to study today',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Notifications.requestPermissionsAsync().then(({ granted }) => {
                    if (granted === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();
            
                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(9);
                        tomorrow.setMinutes(0);
            
                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                          time: tomorrow,
                          repeat: "day"
                        });
            
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                      }
                });
            }
        })
}
