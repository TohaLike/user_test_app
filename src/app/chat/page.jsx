import ChatCom from "@/components/ChatCom/ChatCom";
import { fetcher } from "@/fetcher/fetcher";
import React from "react";
import { io } from "socket.io-client";
import useSWR from "swr";

export default function page() {

  return <div><ChatCom /></div>;
}
