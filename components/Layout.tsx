import { FC } from "react";
import Head from "next/head";
import { Flex, VStack, useColorModeValue } from "@chakra-ui/react";
import { Header, Player } from ".";

type Props = {
    [key: string]: any
};

const Layout: FC<Props> = ({ children, ...props }) => (
    <VStack minH="100vh" {...props}>
        <Head>
            <title>Kainet Music</title>
            <link rel="icon" href="/favicon.svg" />
        </Head>

        <Header
            bg={useColorModeValue("kaihui.300", "kaihui.900")}
        />
        <Flex flexGrow={1}>
            {children}
        </Flex>
        <Player
            position="sticky"
            left={0}
            bottom={0}
            bg={useColorModeValue("kaihui.300", "kaihui.900")}
        />
    </VStack>
);

export default Layout;
