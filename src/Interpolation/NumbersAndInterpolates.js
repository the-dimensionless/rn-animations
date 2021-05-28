import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const NumbersAndInterpolates = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation, setScaleAnimation] = useState(new Animated.Value(1));

  // We can interpolate out interpolation (interpolation returns an animated value!)
  const firstInterpolation = animation.interpolate({
    inputRange: [0, 1, 2], // must be in increasing order
    outputRange: [0, 300, 0],
  });

  // output of first interpolation serves as input to another.
  const doubleInterpolation = firstInterpolation.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5],
  });

  const animatedStyles = {
    transform: [{translateY: firstInterpolation}],
    opacity: doubleInterpolation,
  };

  const onStartAnimation = () => {
    console.log('Start Interpolation Animation');
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });
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

export default NumbersAndInterpolates;

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
    fontSize: 24,
    alignSelf: 'center',
  },
});
