import { AspectRatio, Box, HStack, IconButton, Image } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

type ImageItemProps = {
  imageId: string;
  onDelete: () => void;
};
function ImageItem({ imageId, onDelete }: ImageItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      w="5rem"
      h="5rem"
      overflow="hidden"
      borderRadius="md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      position="relative"
    >
      <AspectRatio maxW="5rem" ratio={1}>
        <Image
          src={`${process.env.API_BASE_URI}/attatchments/${imageId}`}
          objectFit="cover"
        />
      </AspectRatio>
      <IconButton
        onClick={() => onDelete()}
        title="삭제"
        visibility={hover ? "visible" : "hidden"}
        size="xs"
        position="absolute"
        right="1"
        top="1"
        aria-label="remove image"
        colorScheme="blackAlpha"
        icon={<CloseIcon />}
      />
    </Box>
  );
}

type ImageUploaderProps = {
  images: string[];
  onImageSelect: (image: File) => void;
  onImageDelete: (imageId: string) => void;
};
export default function ImageUploader(props: ImageUploaderProps) {
  const fileInput = useRef<HTMLInputElement>();
  return (
    <>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        css={{ display: "none" }}
        onChange={(event) => props.onImageSelect(event.currentTarget.files[0])}
      />

      <HStack>
        {props.images.map((imageId) => (
          <ImageItem
            key={imageId}
            imageId={imageId}
            onDelete={() => props.onImageDelete(imageId)}
          />
        ))}

        {props.images.length < 5 && (
          <Box w="5rem" h="5rem">
            <IconButton
              aria-label="add image"
              title="추가"
              icon={<AddIcon />}
              onClick={() => fileInput.current.click()}
              fontSize="2xl"
              w="5rem"
              h="5rem"
            />
          </Box>
        )}
      </HStack>
    </>
  );
}
