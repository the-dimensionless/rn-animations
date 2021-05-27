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
  const [animationX, setAnimationX] = useState(new Animated.Value(1));
  const [animationY, setAnimationY] = useState(new Animated.Value(1));

  const animatedStyles = {
    transform: [
      {
        scaleX: animationX,
      },
      {
        scaleY: animationY,
      },
    ],
  };

  const onStartAnimation = () => {
    console.log('Scale X');
    Animated.timing(animationX, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      console.log('Scale Y');
      Animated.timing(animationY, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        console.log('Flip X');
        Animated.timing(animationX, {
          toValue: -2,
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
