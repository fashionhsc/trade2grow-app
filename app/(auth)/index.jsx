import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import Login from './Login';

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticate, user } = useSelector(state => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  if (isAuthenticate && user.role == 'user') return <Redirect href={'/(tabs)/home'} />
  if (isAuthenticate && user.role == 'admin') return <Redirect href={'/(admin)/dashboard'} />
  
  return (

    <View style={{ justifyContent: showForm ? 'space-between' : 'center' }} className="flex-1 items-center bg-background">
      <Image style={{ marginTop: showForm ? '100' : '0' }} source={require("../../assets/images/splash-icon.png")} />
      {
        showForm && <Login />
      }
    </View>




  );
};

export default Index;
