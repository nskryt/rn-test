import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,
  TextStyle,
} from 'react-native';
import {Colors} from '../constants';

type ButtonProps = {
  text: string;
  textStyle?: TextStyle;
  withWrapper?: boolean;
};

export default function CustomButton(
  props: ButtonProps & TouchableOpacityProps,
) {
  const {
    text,
    style,
    textStyle,
    withWrapper = false,
    ...touchableOpacityProps
  } = props;
  const renderedText = (
    <Text style={[styles.text, textStyle]}>{props.text}</Text>
  );
  return (
    <TouchableOpacity style={style} {...touchableOpacityProps}>
      {withWrapper ? (
        <View style={styles.wrapper}>{renderedText}</View>
      ) : (
        renderedText
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 4,
    backgroundColor: Colors.SOFT_VIOLET,
    margin: 24,
  },
  text: {
    padding: 8,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
