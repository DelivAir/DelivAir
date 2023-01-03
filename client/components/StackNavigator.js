import React, { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Login from "./Login";
import SignUp from "./SingnUp";
import AddPost from "./AddPost";
import Reclamation from "./Reclamation";
import Contact from "./ContactList";
import History from "./History";
import Form from "./Forme";
import Home from "./Home";
import Chat from "./Chat";
import Profile from "./Profile";
import Track from "./Track";
import Footer from "./Footer";
import ActionSheet from "./ActionSheet";
const Stack = createNativeStackNavigator();

export default function Stacks() {
  const [selected, setSelected] = useState("home");

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="addpost" component={AddPost} />
      <Stack.Screen name="reclamation" component={Reclamation} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="form" component={Form} />

      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="track" component={Track} />
      <Stack.Screen name="profile" component={Profile} />

    </Stack.Navigator>
  );
}
