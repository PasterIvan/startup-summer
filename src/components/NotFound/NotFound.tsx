import React from "react";

import {
  Container,
  Image,
  Text,
  Button,
  Flex,
  createStyles,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import NotFoundImg from "../../img/NotFound.svg";

type NotFoundProps = {
  notButton?: boolean;
};

export const NotFound: React.FC<NotFoundProps> = ({ notButton }) => {
  const navigation = useNavigate();
  const { classes } = useStyles();

  return (
    <Container size="md" py={120}>
      <Flex justify="space-between" align="center" direction="column">
        <Image src={NotFoundImg} alt="NotFoundImg" maw={240} />
        <Text size={24} weight={700} py={32} align="center">
          Упс, здесь еще ничего нет!
        </Text>
        {!notButton && (
          <Button
            className={classes.button}
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

const useStyles = createStyles((theme) => ({
  button: {
    background: theme.colors.blue[5],
  },
}));
