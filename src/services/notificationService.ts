import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Constants from 'expo-constants';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';
import { getTodaysCelebrations } from './celebrationService';
import { getUpcomingActivities } from './activitiesService';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// Configuración del manejador de notificaciones (cómo se muestran cuando la app está abierta)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return;
        }
        // Para notificaciones locales no necesitamos el token, pero es bueno tenerlo configurado
        // token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    return token;
}

export async function scheduleDailyNotifications() {
    // Cancelar todas las notificaciones programadas para evitar duplicados
    await Notifications.cancelAllScheduledNotificationsAsync();

    console.log("Programando notificaciones diarias...");

    try {
        // 1. Obtener datos de hoy
        const celebrations = await getTodaysCelebrations(true);
        const activities = await getUpcomingActivities(true);

        // 2. Programar notificación de Celebraciones (si hay)
        if (celebrations.length > 0) {
            const body = celebrations.map(c => `${c.category}: ${c.name}`).join('\n');
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "🎉 ¡Celebraciones de Hoy!",
                    body: body,
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                    hour: 4, // 4:00 AM
                    minute: 0,
                    repeats: false, // Solo por hoy, se reprogramará mañana
                },
            });
            console.log("Notificación de celebraciones programada.");
        }

        // 3. Programar notificación de Actividades (si hay para hoy)
        const today = new Date().toISOString().split('T')[0];
        const todaysActivities = activities.filter(a => {
            const activityDate = a.date.toISOString().split('T')[0];
            return activityDate === today;
        });

        if (todaysActivities.length > 0) {
            const body = todaysActivities.map(a => `${a.time} - ${a.title}`).join('\n');
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "📅 Actividades para Hoy",
                    body: body,
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                    hour: 5, // 5:00 AM
                    minute: 0,
                    repeats: false,
                },
            });
            console.log("Notificación de actividades programada.");
        }

    } catch (error) {
        console.error("Error programando notificaciones:", error);
    }
}

// Definir la tarea en segundo plano
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = new Date();
    console.log(`Got background fetch call at date: ${now.toISOString()}`);

    // Aquí intentamos reprogramar las notificaciones para asegurar que estén actualizadas
    await scheduleDailyNotifications();

    // Retornar resultado
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 60 * 2, // Ejecutar cada 2 horas (en segundos)
        stopOnTerminate: false, // Seguir corriendo después de cerrar la app
        startOnBoot: true, // Iniciar al arrancar el dispositivo
    });
}

export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
