import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, Spinner, Heading, Link } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.perplexity.ai/search?query=${topic}`);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Local Newspaper
        </Heading>
        <Input placeholder="Enter a topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={fetchArticles} isLoading={loading}>
          Search
        </Button>
        {loading && <Spinner size="xl" />}
        <VStack spacing={4} width="100%">
          {articles.map((article, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" width="100%">
              <Heading fontSize="xl">{article.title}</Heading>
              <Text mt={4}>{article.description}</Text>
              <Link href={article.url} color="teal.500" isExternal mt={2}>
                Read more
              </Link>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
