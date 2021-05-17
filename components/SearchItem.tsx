import { FC, DOMAttributes } from "react";
import {
    HStack,
    StackDivider,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useBreakpointValue,
    useColorModeValue,
    LayoutProps,
    IconButtonProps
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { RiMore2Fill } from "react-icons/ri";
import { ItemMetadata, ThumbnailButton } from ".";

type Props = {
    onClick: DOMAttributes<any>["onClick"],
    title: string,
    subtitleListMobile: string[],
    subtitleListDesktop: string[],
    imgThumbnails: string[],
    imgWidth?: LayoutProps["w"],
    isPlaying?: boolean,
    label: string,
    playingLabel?: string,
    icon: IconButtonProps["icon"],
    playingIcon?: IconButtonProps["icon"],
    mainActionIcon?: IconButtonProps["icon"],
    extraMenuActions?: JSX.Element,
    [key: string]: any
};

const SearchItem: FC<Props> = ({
    onClick,
    title,
    subtitleListMobile,
    subtitleListDesktop,
    imgThumbnails,
    imgWidth,
    isPlaying,
    label,
    playingLabel,
    icon,
    playingIcon,
    mainActionIcon,
    extraMenuActions,
    ...props
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue([true, null, false]);

    return (
        <HStack
            w="full"
            spacing={[3, null, 4]}
            pr={1.5}
            borderRadius="md"
            bg={useColorModeValue(
                isOpen || isPlaying ? "kaihui.400" : "kaihui.300",
                isOpen || isPlaying ? "kaihui.900" : "kaihui.800"
            )}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            {...props}
        >
            <ThumbnailButton
                width={imgWidth}
                height={[16, null, 20]}
                imgSrc={imgThumbnails[imgThumbnails.length - 1] ?? ""}
                imgAlt={title}
                brLeft="md"
                btnLabel={isPlaying ? `${playingLabel} '${title}'` : `${label} '${title}'`}
                btnIcon={isPlaying ? playingIcon : icon}
                btnSize="lg"
                onClick={onClick}
                isBtnShown={isMobile || isOpen || isPlaying}
                isDisabled={isPlaying}
            />

            <ItemMetadata
                title={title}
                titleFontSize={["sm", null, "md"]}
                titleLines={1}
                titleOnClick={isPlaying || isMobile ? null : onClick}
                subtitleList={useBreakpointValue([subtitleListMobile, null, subtitleListDesktop])}
                subtitleFontSize={["xs", null, "sm"]}
                subtitleLines={1}
                subtitleSeparator={(
                    <StackDivider border={0} boxSize={2}>
                        <StarIcon boxSize={2} mb={[2.5, null, 1]} />
                    </StackDivider>
                )}
                flex={1}
            />

            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="More options"
                    size="lg"
                    icon={<RiMore2Fill />}
                    variant="ghost"
                    colorScheme="kaihui"
                />
                <MenuList fontSize={["sm", null, "md"]} zIndex={6}>
                    <MenuItem icon={mainActionIcon ?? icon} onClick={onClick} disabled={isPlaying}>
                        {label}
                    </MenuItem>
                    {extraMenuActions}
                </MenuList>
            </Menu>
        </HStack>
    );
};

export default SearchItem;
