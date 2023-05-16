import React from "react";

import { Container, Image, Text, Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import NotFoundImg from "../../img/NotFound.svg";

type NotFoundProps = {
  notButton?: boolean;
};

export const NotFound: React.FC<NotFoundProps> = ({ notButton }) => {
  const navigation = useNavigate();

  return (
    <Container size="md" py={120}>
      <Flex justify="space-between" align="center" direction="column">
        <Image src={NotFoundImg} alt="NotFoundImg" maw={240} />
        <Text size={24} weight={700} py={32}>
          Упс, здесь еще ничего нет!
        </Text>
        {!notButton && (
          <Button
            size="md"
            variant="light"
            onClick={() => navigation("../search")}
          >
            Поиск Вакансий
          </Button>
        )}
      </Flex>
    </Container>
  );
};
