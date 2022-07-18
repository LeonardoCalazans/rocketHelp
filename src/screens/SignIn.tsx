import { useState } from "react";
import { VStack, Heading, useTheme, Icon } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";

import { Button, Input } from "../components";

const SignIn = () => {
  const [user, setUser] = useState<UserAccount>({} as UserAccount);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const { colors } = useTheme();

  const handleSignIn = () => {
    if (!name || !password) return setAlert(true);

    setUser({
      name: name,
      password: password,
    });

    console.log(user.name, user.password, alert);
  };

  return (
    <VStack flex={1} alignItems="center" bg={colors.gray[600]} px={8} pt={24}>
      <Logo />

      <Heading color={colors.gray[100]} fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        active={!name && alert}
        onChangeText={setName}
      />

      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        active={!password && alert}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignIn} />
    </VStack>
  );
};

export default SignIn;
