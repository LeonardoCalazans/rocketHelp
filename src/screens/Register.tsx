import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { Header, Input, Button } from "../components";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const [isActivePatrimony, setIsActivePatrimony] = useState(false);
  const [isActiveDescription, setIsActiveDescription] = useState(false);

  const navigation = useNavigation();

  const handleNewOrderRegister = () => {
    if (!patrimony) {
      setIsActivePatrimony(true);
      return Alert.alert("Registrar", "Preencha o campo Patrimônio.");
    }
    if (!description) {
      setIsActiveDescription(true);
      return Alert.alert("Registrar", "Preencha o campo descrição.");
    }

    setIsLoading(true);

    firestore()
      .collection("orders") //criar coleção orders
      .add({
        //criar tipagem order
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar o pedido"
        );
      });
  };

  useEffect(() => {
    setIsActivePatrimony(false);
    setIsActiveDescription(false);
  }, [patrimony, description]);

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
        active={isActivePatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
        active={isActiveDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
};

export default Register;
