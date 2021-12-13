import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUploader } from "../components";
import { upload } from "../lib/api/attatchments";
import { newPost } from "../lib/api/posts";

export default function New() {
  const navigate = useNavigate();
  const contentInput = useRef<HTMLTextAreaElement>();
  const [imageIds, setImageIds] = useState<string[]>([]);

  const onImageSelect = async (image: File) => {
    try {
      const res = await upload(image);
      const newImage = res.data.id;
      setImageIds((images) => [...images, newImage]);
    } catch (err) {
      alert(err.message);
    }
  };

  const onImageDelete = (target: string) => {
    setImageIds((images) => images.filter((image) => image !== target));
  };

  const onWrite = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const content = contentInput.current.value;
        await newPost({
          content,
          images: imageIds,
        });
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    },
    [imageIds]
  );

  return (
    <Container maxW="lg" mt={3}>
      <Heading color="gray.500" align="left" fontSize="md" wordBreak="keep-all">
        {"게시물 작성하기"}
      </Heading>

      <hr css={{ margin: "1rem 0" }} />

      <form onSubmit={onWrite}>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>{"내용"}</FormLabel>
            <Textarea
              ref={contentInput}
              placeholder="내용을 입력해주세요."
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>{"이미지 (최대 5장)"}</FormLabel>
            <ImageUploader
              onImageSelect={onImageSelect}
              onImageDelete={onImageDelete}
              images={imageIds}
            />
          </FormControl>

          <Box alignSelf="flex-end">
            <Button type="submit" colorScheme="blue">
              {"작성하기"}
            </Button>
          </Box>
        </VStack>
      </form>
    </Container>
  );
}
