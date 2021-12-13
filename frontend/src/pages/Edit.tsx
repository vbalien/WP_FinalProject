import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageUploader } from "../components";
import { upload } from "../lib/api/attatchments";
import { deletePost, editPost } from "../lib/api/posts";
import { Post } from "../lib/api/types";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const contentInput = useRef<HTMLTextAreaElement>();
  const [imageIds, setImageIds] = useState<string[]>([]);
  const post: Post = location.state;

  useEffect(() => {
    setImageIds(post.attatchments.map((att) => att.id));
    contentInput.current.value = post.content;
  }, []);

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

  const onEdit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const content = contentInput.current.value;
        await editPost(post.id, {
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

  const onDeleteClick = async () => {
    try {
      await deletePost(post.id);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxW="lg" mt={3}>
      <Heading color="gray.500" align="left" fontSize="md" wordBreak="keep-all">
        {"게시물 수정하기"}
      </Heading>

      <hr css={{ margin: "1rem 0" }} />

      <form onSubmit={onEdit}>
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

          <HStack alignSelf="flex-end" spacing={3}>
            <Button type="button" colorScheme="red" onClick={onDeleteClick}>
              {"삭제하기"}
            </Button>

            <Button type="submit" colorScheme="blue">
              {"수정하기"}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Container>
  );
}
