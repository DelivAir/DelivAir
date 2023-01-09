import React from 'react';
import { View, StyleSheet,Button,Text, ImageBackground,Image} from 'react-native';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';

const ReclamationForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    reclamation: Yup.string().required('Reclamation is required'),
  });



  return (
    <ImageBackground
    source={{
      uri: "https://wallpapers.com/images/featured/pastel-iphone-nlfoag3cyqt5aoa8.jpg",
    }}
    style={styles.image}
  >
    <View style={styles.formContainer}>
         <Text style={styles.title}>Reclamation !</Text>
         <Formik
        initialValues={{ name: '', email: '', reclamation: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          // Send the reclamation here
          console.log(`Name: ${values.name} Email: ${values.email} Reclamation: ${values.reclamation}`);
        }}
      >
           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View  style={styles.formFieldsContainer}>
              <Image
    source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.GBfJtHNV9InrMI8pV5OGYgHaHa&pid=Api&P=0' }} // URL or path to the image file
    style={styles.logo}
    
  />

</View>)}
      </Formik>
    </View>
    </ImageBackground>
  );
};





















  export default ReclamationForm;