import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import '../global.css';
import store from '../store/store';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false, }} />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}
