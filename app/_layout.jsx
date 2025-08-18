import { usePushNotifications } from "@/hooks/usePushNotifications";
import { savePushToken } from "@/store/slices/pushTokenSlice";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../global.css';
import store from '../store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
}

function AppContent() {
  const { expoPushToken, notification } = usePushNotifications();
  const dispatch = useDispatch();
  const { isAuthenticate, user } = useSelector((state) => state.auth);

  const savePush = async () => {
    try {
      console.log("Expo push token:", expoPushToken);
      await dispatch(savePushToken({ token: expoPushToken, user }))

    } catch (error) {
      console.log('Error :', error);
    }
  }

  useEffect(() => {
    if (expoPushToken && isAuthenticate) {
      savePush();
    }
  }, [expoPushToken, isAuthenticate]);

  useEffect(() => {
    if (notification) {
      Toast.show({
        type: "info",
        text1: notification.request.content.title || "New Notification",
        text2: notification.request.content.body,
      });
    }
  }, [notification]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
