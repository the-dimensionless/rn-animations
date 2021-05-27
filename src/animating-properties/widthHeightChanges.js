import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// scale 1 is normal original size
// can try with absolute positioning (@todo)
const WidthHeightLayoutChanges = () => {
  const [animation, setAnimationX] = useState(new Animated.Value(150));

  const animatedStyles = {
    width: animation,
    height: animation,
  };

  const onStartAnimation = () => {
    console.log('Changing width and height');
    Animated.timing(animation, {
      toValue: 300,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <Text>
            This text just states that this animation actually changes layout!
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default WidthHeightLayoutChanges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  box: {
    // no need as overidden by animatedStyles that has width & height
    backgroundColor: 'tomato',
  },
});
