import { ComponentProps } from 'react'
import { Button as RNP_Button } from 'react-native-paper'

type T_Props = ComponentProps<typeof RNP_Button>


const Button = ({ mode = 'contained', ...props }: T_Props) => {
  return <RNP_Button {...props} mode={mode} />
}

export default Button