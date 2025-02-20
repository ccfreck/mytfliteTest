import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { RNMediapipe } from '@thinksys/react-native-mediapipe';
import { computeAngles, computeLandmarks } from './PoseDetection';

let landmarks_dict = {};
let angles_dict = {};

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
				<Text style={styles.buttonText}>Open Camera</Text>
			</TouchableOpacity>
		</View>
	);
};

const CameraScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.mediapipeWrapper}>
				<RNMediapipe
					width={300}
					height={500}
					onLandmark={(data) => {
						landmarks_dict = computeLandmarks(data['landmarks']);
						angles_dict = computeAngles(landmarks_dict);
						console.log("===============================================================");
						console.log(landmarks_dict);
						console.log("===============================================================");
						console.log(angles_dict)
					}}
				/>
			</View>
		</View>
	)
};

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Camera" component={CameraScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	button: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#007bff',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	cameraContainer: {
		flex: 1,
	},
	mediapipeWrapper:{
		width:300,
		height: 500,
		overflow:"hidden",
		borderRadius:15,
	}
});
