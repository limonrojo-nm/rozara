
import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SegmentedButtons, Text, TextInput } from 'react-native-paper'
import Button from '../../common/components/Button'
import Title from '../../common/components/Title'

const Pulse: FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.pulse}>{children}</View>
const Subdivision: FC<{ hasEvent?: boolean }> = ({ hasEvent = false }) => <View style={styles.subdivision}></View>

const UnoSiUnoNoScreen = () => {
  const [pulsesPerMeasure, setPulsesPerMeasure] = useState<number | ''>(4)
  const [subdivision, setSubdivision] = React.useState('2');
  const handlePress = () => {
    alert("Dale")
  }
  return (
    <View style={styles.wrapper} >
      <View style={styles.titleBar}>
        <Title>Uno si, uno no</Title>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View>
            <Text>Pulsos por compás</Text>
            <TextInput inputMode='numeric' value={String(pulsesPerMeasure)} onChangeText={(t) => setPulsesPerMeasure(t.length > 0 ? parseInt(t) : '')} />
          </View>
          <View>
            <Text>Subdivisión</Text>
            <SegmentedButtons
              value={subdivision}
              onValueChange={setSubdivision}
              buttons={[
                {
                  value: '2',
                  label: 'Binaria',
                },
                {
                  value: '3',
                  label: 'Ternaria',
                },

              ]}
            />
          </View>
          <Button onPress={handlePress}>Generar</Button>
        </View>
        <View style={styles.measure}>
          {typeof pulsesPerMeasure === 'number' &&
            [...Array(pulsesPerMeasure)].map((_, idx) => (
              <Pulse key={idx}>
                <View style={styles.subdivisionContainer}>
                  {[...Array(parseInt(subdivision))].map((_, idx) => (<Subdivision key={idx} />))}
                </View>
                <View>
                  <Text>{idx + 1}</Text>
                </View>
              </Pulse>
            ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  titleBar: {
    width: '100%'
  },
  content: {
    gap: 20,
    justifyContent: 'center',

  },
  form: {
    gap: 10,
    justifyContent: 'center'
  },
  measure: {
    flexDirection: 'row', width: '100%', justifyContent: 'space-between',
    gap: 10,

  },
  pulse: {
    gap: 10,
    backgroundColor: '#EEE',
    padding: 5,
    flex: 1,
    boxSizing: 'border-box',
    overflow: 'hidden',
    borderRadius: 5,
  },
  subdivisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    gap: 5

  },
  subdivision: {
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 30,
    flex: 1
  },
});

export default UnoSiUnoNoScreen