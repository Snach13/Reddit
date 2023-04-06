import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const OAuthButtons = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction={"column"} width="100%" mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image
          src="/images/googlelogo.png"
          alt="Google Logo"
          height={"20px"}
          mr={4}
        />
        Continue with Google
      </Button>
      <Button variant={"oauth"}>Some Other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
