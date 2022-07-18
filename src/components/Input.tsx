import {
  Input as NativeBaseInput,
  IInputProps,
  Icon,
  IIconProps,
  useTheme,
} from "native-base";

type Props = IInputProps & {
  active?: boolean;
  children?: IIconProps;
};

const Input = ({ active, children, ...rest }: Props) => {
  const { colors, fonts, fontSizes } = useTheme();

  return (
    <NativeBaseInput
      bg={colors.gray[700]}
      h={14}
      mb={4}
      size="md"
      borderWidth={active ? 1 : 0}
      fontSize={fontSizes.md}
      fontFamily={fonts.body}
      color={colors.white}
      placeholderTextColor={colors.gray[300]}
      borderColor={active && "danger.600"}
      InputLeftElement={<Icon as={children} ml={4}  />}
      _focus={{
        borderWidth: 1,
        borderColor: colors.green[500],
        bg: colors.gray[700],
      }}
      {...rest}
    />
  );
};

export default Input;
