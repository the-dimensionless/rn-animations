/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Opacity from './src/animating-properties/index';
import TranslatePosition from './src/animating-properties/translatePosition';
import ScalePosition from './src/animating-properties/scalePosition';
import WidthHeightLayoutChanges from './src/animating-properties/widthHeightChanges';

const App: () => Node = () => {
  return (
    <SafeAreaView style={styles.parent}>
      {/* <Opacity /> */}
      {/* <TranslatePosition /> */}
      {/* <ScalePosition /> */}
      <WidthHeightLayoutChanges />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

export default App;
