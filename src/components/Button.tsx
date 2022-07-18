import {
  Button as ButtonNativeBase,
  IButtonProps,
  Heading,
  useTheme,
} from "native-base";

type Props = IButtonProps & {
  title: string;
};

const Button = ({ title, ...rest }: Props) => {
  const { colors, fontSizes } = useTheme();

  return (
    <ButtonNativeBase
      bg={colors.green[700]}
      h={14}
      mt={4}
      fontSize="sm"
      rounded="sm"
      w="full"
      _pressed={{ bg: colors.green[500] }}
      {...rest}
    >
      <Heading color={colors.white} fontSize={fontSizes.sm}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
};

export default Button;
