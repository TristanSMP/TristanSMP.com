import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import Textures from "../textures/1.18";

export function Item(props: { id: string; className?: string }) {
  return (
    <>
      <img
        src={
          Textures.items.find((item: { id: string }) => item.id === props.id)
            ?.texture
        }
        className={props.className + " pixel"}
      />
    </>
  );
}
