import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, useTheme, Icon } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { Alert } from "react-native";
import Logo from "../assets/logo_primary.svg";
import { Button, Input } from "../components";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  const handleSignUp = () => {};

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignUp}
        isLoading={isLoading}
      />
      
    </VStack>
  );
};

export default SignUp;
