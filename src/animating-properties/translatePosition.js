import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

//translate uses grid (0,0) is top left of screen
// +ve X -> LR, +ve Y -> TB (absolute values from current positions)
const TranslatePosition = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const animatedStyles = {
    transform: [
      {
        translateY: animation,
      },
    ],
  };

  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.timing(animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      console.log('callback');
      Animated.timing(animation, {
        toValue: -300,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        console.log('back to original');
        Animated.timing(animation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      });
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

export default TranslatePosition;

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
