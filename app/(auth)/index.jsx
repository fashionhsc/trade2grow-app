import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import Login from './Login';

const Index = () => {
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
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
