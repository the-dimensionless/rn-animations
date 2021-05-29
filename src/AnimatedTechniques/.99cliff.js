import React, {useMemo, useState} from 'react';
import {
  Animated,
    Dimensions,
    PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const {height} = Dimensions.get('window');

const inputRange = [
    0, (height/2) - 50.01, (height/2) - 50, height
];

const outputRange = [
    "rgb(99, 71, 255)", "rgb(99, 71, 255)", "rgb(255, 0, 0)", "rgb(255, 0, 0)"
];

const Cliff99 = () => {
  const [animation, setAnimation] = useState(new Animated.ValueXY(0));

  const presponder = useMemo(() => {
      console.log('Inside use Memo fn created for first time');
      return PanResponder.create({
        onStartShouldSetPanResponder: (e, gS) => true,
        onMoveShouldSetPanResponder: (e, gS) => true,
        onPanResponderGrant: (e, gS) => {
            console.log('-----on pan responder grant-----');
            animation.extractOffset();
        },
        onPanResponderMove: Animated.event([
            null,
            {
                dx: animation.x,
                dy: animation.y
            }
        ], {useNativeDriver: false})
    })
  }, []);

  const bgInterpolate = animation.y.interpolate({
      inputRange,
      outputRange
  });

  const animatedStyles = {
      backgroundColor: bgInterpolate,
      transform: [
          ... animation.getTranslateTransform()
      ],
  };

  const onStartAnimation = () => {
    console.log('Start Interpolation Animation');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.top, styles.center, styles.container]}>
          <Text>Good</Text>
      </View>
      <View style={[styles.center, styles.container]}>
          <Text>Bad</Text>
      </View>
      <Animated.View style={[styles.box, styles.center, animatedStyles]} {...presponder.panHandlers}>
          <Text>Box</Text>
      </Animated.View>
    </View>
  );
};

export default Cliff99;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
  },
  box: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 0,
    left: 0,
    borderColor:'tomato',
    borderWidth: 2,
  },
  text: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
