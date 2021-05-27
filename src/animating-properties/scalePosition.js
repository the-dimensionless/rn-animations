import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// scale 1 is normal original size
const ScalePosition = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const animatedStyles = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  const onStartAnimation = () => {
    console.log('Scale XY UP');
    Animated.timing(animation, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      console.log('Go back to original');
      Animated.timing(animation, {
        toValue: -1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });


  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ScalePosition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
});
