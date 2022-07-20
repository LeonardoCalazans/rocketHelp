import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { VStack, Text, HStack, useTheme, ScrollView, Box } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  ClipboardText,
} from "phosphor-react-native";
import { dateFormat } from "../utils";
import { Input, Button, Header, Loading, CardDetails } from "../components";
import { OrderFirestoreType } from "../utils/types/orderFirestore";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderType & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { orderId } = route.params as RouteParams;

  const handleOrderClose = () => {
    if (!solution) {
      setIsActive(true);
      return Alert.alert(
        "Solicitação",
        "Informa a solução para encerrar a solicitação"
      );
    }

    firestore()
      .collection<OrderFirestoreType>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada.");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Solicitação", "Não foi possível encerrar a solicitação");
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreType>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
              h={24}
              active={isActive}
            />
          )}
        </CardDetails>

        {order.status === "open" && (
          <Button
            title="Encerrar solicitação"
            mb={4}
            onPress={handleOrderClose}
          />
        )}
      </ScrollView>
    </VStack>
  );
};

export default Details;
