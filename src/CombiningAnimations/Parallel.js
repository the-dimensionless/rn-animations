import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ParallelAnimation = () => {
  const [colorAnimation, setColorAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation, setScaleAnimation] = useState(new Animated.Value(1));

  const bgInterpolation = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255, 99, 71)', 'rgb(99, 71, 255)'],
  });

  const animatedStyles = {
    backgroundColor: bgInterpolation,
    transform: [{scale: scaleAnimation}],
  };

  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration: 500, //ms,
      useNativeDriver: false,
    }).start();

    Animated.timing(scaleAnimation, {
      toValue: 2,
      duration: 300, //ms,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <Text style={styles.text}>Hi There !</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ParallelAnimation;

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
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    alignSelf: 'center',
  },
});
