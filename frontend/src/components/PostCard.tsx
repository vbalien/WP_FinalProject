import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Link,
  Text,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Fragment, useMemo, useState } from "react";
import { Post } from "../lib/api/types";

function RadioButton(props: UseRadioProps) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Button
        {...checkbox}
        as={Box}
        size="xs"
        cursor="pointer"
        borderRadius="full"
        colorScheme="whiteAlpha"
        borderWidth={1}
        borderColor="black"
        _checked={{
          bg: "black",
          borderColor: "white",
        }}
      />
    </Box>
  );
}

type RadioGroupProps = {
  values: string[];
  onChange: (nextValue: string) => void;
};
function RadioGroup({ values, onChange }: RadioGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "image",
    defaultValue: values[0],
    onChange,
  });
  const group = getRootProps();

  return (
    <HStack {...group} justifyContent="center">
      {values.map((value) => {
        const radio = getRadioProps({ value });
        return <RadioButton key={value} {...radio} />;
      })}
    </HStack>
  );
}

type PostCardProps = Post & {
  editable?: boolean;
};
export default function PostCard({ editable, ...post }: PostCardProps) {
  const navigate = useNavigate();
  const images = useMemo(
    () => post.attatchments.map((att) => att.id),
    [post.attatchments]
  );
  const [curr, setCurr] = useState<string>(images[0]);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box position="relative">
        <AspectRatio ratio={1}>
          <Image
            src={`${process.env.API_BASE_URI}/attatchments/${curr}`}
            loading="lazy"
          />
        </AspectRatio>
        {editable && (
          <Button
            colorScheme="green"
            size="sm"
            position="absolute"
            top={2}
            right={2}
            onClick={() => navigate("/edit", { state: post })}
          >
            {"수정"}
          </Button>
        )}
        <Box position="absolute" bottom={2} left={0} right={0}>
          <RadioGroup onChange={(val) => setCurr(val)} values={images} />
        </Box>
      </Box>
      <Box>
        <Box p={3}>
          <Link
            as={RouterLink}
            color="blue.500"
            to={`/home?query=${encodeURIComponent(
              post.author.username
            )}&kind=author&exact=true`}
          >
            {post.author.username}
          </Link>
          <Text as="span" color="gray.300" mx={2}>
            {"•"}
          </Text>
          <Text as="span" color="gray.700">
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </Box>

        <Divider />

        <Box p={3}>
          <Text as="span" color="gray.700">
            {post.content.split(" ").map((word, idx) => (
              <Fragment key={idx}>
                {" "}
                {/^#\S+$/.test(word) ? (
                  <Link
                    as={RouterLink}
                    color="blue.500"
                    to={`/home?query=${encodeURIComponent(
                      word.slice(1)
                    )}&kind=hashtag&exact=true`}
                  >
                    {word}
                  </Link>
                ) : (
                  word
                )}
              </Fragment>
            ))}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
