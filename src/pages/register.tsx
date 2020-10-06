import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [{}, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.register.errors) {
            setErrors(toErrormap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              isLoading={isSubmitting}
              variantColor="teal"
              mt={4}
              type="submit"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
