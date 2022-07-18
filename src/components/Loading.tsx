import { Center, Spinner, useTheme } from "native-base";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <Center flex={1} bg={colors.gray[700]}>
      <Spinner color={colors.secondary[700]} />
    </Center>
  );
};

export default Loading;
