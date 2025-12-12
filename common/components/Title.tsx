import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'


type T_Props = ComponentProps<typeof Text>

const Title = ({ children, ...props }: T_Props) => {
  return (
    <Text {...props} style={styles.title}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})

export default Title