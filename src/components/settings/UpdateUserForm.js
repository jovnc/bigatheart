"use client";

import { updateUserInfo } from "@actions/userActions";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function UpdateUserForm({ data }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.first_name,
      lastName: data.last_name,
      phone: data.phone,
      dob: data.dob,
      occupation: data.occupation,
      immigration: data.immigration,
      school: data.school,
      educationalBackground: data.educationalBackground,
      skills: data.skills,
    },
  });

  const action = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const res = await updateUserInfo(data);
      toast.success("Successfully updated user info");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      // toast.error("Failed to update user info");
      setIsLoading(false);
    }
  });

  return (
    <>
      <form className="w-full mx-auto" action={action}>
        {/* <Text fontSize="2xl" className=" text-center font-bold p-5">
          Update User Information
        </Text> */}
        <div className="mb-4">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
            <GridItem>
              <label className="block text-gray-700 text-sm mb-2">
                <span className="text-red-300">* </span>First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("firstName", {
                  required: "This field is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstName.message}
                </p>
              )}
            </GridItem>
            <GridItem>
              <label className="block text-gray-700 text-sm mb-2">
                <span className="text-red-300">* </span>Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                {...register("lastName", {
                  required: "This field is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic">
                  {errors.lastName.message}
                </p>
              )}
            </GridItem>
          </Grid>
        </div>
        {/* <div className="mb-4">
          <RadioGroup>
            <label className="block text-gray-700 text-sm mb-2">
              <span className="text-red-300">* </span>Gender
            </label>
            <HStack>
              <Radio
                {...register("gender", {
                  required: "This field is required",
                })}
                value={"Male"}
                size="lg"
              >
                <Flex>
                  <FaMale />
                  <Text fontSize="sm" className="text-gray-700">
                    Male
                  </Text>
                </Flex>
              </Radio>
              <Radio
                {...register("gender", {
                  required: "This field is required",
                })}
                value={"Female"}
                size="lg"
              >
                <Flex>
                  <FaFemale />
                  <Text fontSize="sm" className="text-gray-700">
                    Female
                  </Text>
                </Flex>
              </Radio>
              <Radio
                {...register("gender", {
                  required: "This field is required",
                })}
                value={"Others"}
                size="lg"
              >
                <Flex>
                  <FaGenderless />
                  <Text fontSize="sm" className="text-gray-700">
                    Others
                  </Text>
                </Flex>
              </Radio>
            </HStack>
          </RadioGroup>
          {errors.gender && (
            <p className="text-red-500 text-xs italic">
              {errors.gender.message}
            </p>
          )}
        </div> */}

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="tel"
            {...register("phone", {
              required: "Phone Number is required",
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Date of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            {...register("dob", {
              required: "Date of Birth is required",
            })}
          />
          {errors.dob && (
            <p className="text-red-500 text-xs italic">{errors.dob.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Occupation
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("occupation", {
              required: "Occupation is required",
            })}
          />
          {errors.occupation && (
            <p className="text-red-500 text-xs italic">
              {errors.occupation.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Immigration Status
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("immigration")}
          />
          {errors.immigration && (
            <p className="text-red-500 text-xs italic">
              {errors.immigration.message}
            </p>
          )}
        </div>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={8}
          className="mb-4"
        >
          <GridItem>
            <label className="block text-gray-700 text-sm mb-2">
              School (if studying)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              {...register("school")}
            />
            {errors.school && (
              <p className="text-red-500 text-xs italic">
                {errors.school.message}
              </p>
            )}
          </GridItem>
          <GridItem>
            <label className="block text-gray-700 text-sm mb-2">
              <span className="text-red-300">* </span>Educational Background
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              {...register("educationalBackground", {
                required: "This field is required",
              })}
            />
            {errors.educationalBackground && (
              <p className="text-red-500 text-xs italic">
                {errors.educationalBackground.message}
              </p>
            )}
          </GridItem>
        </Grid>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            Relevant Skills for Volunteering
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("skills")}
          />
          {errors.skills && (
            <p className="text-red-500 text-xs italic">
              {errors.skills.message}
            </p>
          )}
        </div>

        <button
          className="bg-yellow-500 hover:shadow-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          type="submit"
        >
          {isLoading ? <Spinner /> : "Update"}
        </button>
      </form>
    </>
  );
}
