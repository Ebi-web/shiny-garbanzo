import React from "react";
import { Text } from "@mantine/core";

interface Props {
  text: string;
}

const EyeCatchingText = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={"w-full max-w-xl"}
    >
      <Text align="center" size="xl" color="indigo" weight={700}>
        True Goal: {props.text}
      </Text>
    </div>
  );
};

export default EyeCatchingText;
