
import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SegmentedButtons, Text, TextInput } from 'react-native-paper'
import Button from '../../common/components/Button'
import Title from '../../common/components/Title'
import { randomIntInclusive } from '../../lib'

const Pulse: FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.pulse}>{children}</View>
const Subdivision: FC<{ hasEvent?: boolean }> = ({ hasEvent = false }) => <View style={[styles.subdivision, hasEvent && styles.hasEvent]}></View>
type T_Positions = Array<{
  remainingPositions: number,
  selectedPositionWithEvent: number
}>
const UnoSiUnoNoScreen = () => {
  const [pulsesPerMeasure, setPulsesPerMeasure] = useState<number | ''>(4)
  const [eventsQuantity, setEventsQuantity] = useState<number | ''>(2)
  const [subdivision, setSubdivision] = useState('2');
  const [sequence, setSequence] = useState<Array<boolean> | undefined>(undefined);

  const handleGenerateSequence = () => {
    if (typeof pulsesPerMeasure !== 'number') return
    if (typeof eventsQuantity !== 'number') return

    const totalSubdivisions = parseInt(subdivision) * pulsesPerMeasure
    const newSequence = [...Array(totalSubdivisions)].fill(false)
    const positions: T_Positions = []

    for (let i = 0; i < eventsQuantity; i++) {
      positions.push({
        remainingPositions: totalSubdivisions - i,
        selectedPositionWithEvent: randomIntInclusive(0, totalSubdivisions - 1 - i)
      })
    }

    positions.forEach((currentPosition, idx) => {
      if (idx === 0) {
        newSequence[currentPosition.selectedPositionWithEvent] = true

      } else {

        const prevPosition = positions[idx - 1]
        newSequence[(prevPosition.selectedPositionWithEvent + currentPosition.selectedPositionWithEvent) % totalSubdivisions] = true
      }
    })


    setSequence(newSequence)

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
          <View>
            <Text>Cantidad de eventos</Text>
            <TextInput inputMode='numeric' value={String(eventsQuantity)} onChangeText={(t) => setEventsQuantity(t.length > 0 ? parseInt(t) : '')} />
          </View>
          <Button onPress={handleGenerateSequence}>Generar</Button>
        </View>
        {sequence !== undefined && <>
          <View style={styles.measure}>
            {typeof pulsesPerMeasure === 'number' &&
              [...Array(pulsesPerMeasure)].map((_, pulseIdx) => (
                <Pulse key={pulseIdx}>
                  <View style={styles.subdivisionContainer}>
                    {[...Array(parseInt(subdivision))].map((_, sdIdx) => (<Subdivision key={sdIdx} hasEvent={sequence[pulseIdx * parseInt(subdivision) + sdIdx]} />))}
                  </View>
                  <View>
                    <Text>{pulseIdx + 1}</Text>
                  </View>
                </Pulse>
              ))}
          </View>
        </>
        }
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
  hasEvent: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 30,
    flex: 1
  },
});

export default UnoSiUnoNoScreen