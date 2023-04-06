import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";

type Props = {};

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //Firebase logic
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!loginForm.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update form state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type={"email"}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type={"password"}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        onChange={onChange}
      />

      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width={"100%"}
        height={"36px"}
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>

      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState({ open: true, view: "resetPassword" })
          }
        >
          Reset
        </Text>
      </Flex>

      <Flex fontSize={"9pt"} justifyContent="center">
        <Text mr={1}>New to reddit?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor={"pointer"}
          onClick={(prev) => setAuthModalState({ open: true, view: "signup" })}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
