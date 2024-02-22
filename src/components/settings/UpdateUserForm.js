"use client";

import { updateUserInfo } from "@actions/userActions";
import {
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";

const OCCUPATIONS = ["Student", "Unemployed", "Employed", "Others"];

const IMMIGRATION_STATUS = [
  "Singapore Citizen",
  "Singapore PR",
  "Student Pass",
  "Work Pass",
  "Foreigner",
  "Others",
];

const EDUCATION = [
  "PSLE",
  "O Levels",
  "A Levels",
  "University",
  "Post Graduate",
  "Others",
];

const PREFFERED_CATEGORIES = [
  "Environment",
  "Tutoring",
  "Mental Health",
  "Migrant Workers",
  "Children",
  "Elderly Care",
  "Special Needs",
  "Underprivileged",
  "Food",
  "Healthcare",
  "Others",
].map((category) => {
  return { label: category, value: category };
});

export default function UpdateUserForm({ data }) {
  const [isLoading, setIsLoading] = useState(false);

  const cleanedCategory = JSON.parse(data.skills).map((skill) => {
    return { label: skill, value: skill };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
      skills: cleanedCategory,
    },
  });

  const action = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const res = await updateUserInfo(data);
      toast.success("Successfully updated user info");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to update user info");
      setIsLoading(false);
    }
  });

  return (
    <>
      <form className="w-full mx-auto" action={action}>
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

        <div className="mb-4 w-max-full">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Preferred Event Category /
            Skills
          </label>

          <Controller
            control={control}
            name="skills"
            rules={{
              required: "This field is required",
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <MultiSelect
                  options={PREFFERED_CATEGORIES}
                  value={value ? value : []}
                  onChange={onChange}
                  labelledBy="Select"
                  className="w-[736px]"
                />
              );
            }}
          />

          {errors.skills && (
            <p className="text-red-500 text-xs italic">
              {errors.skills.message}
            </p>
          )}
        </div>

        <FormControl isInvalid={errors.occupation} isRequired className="mb-5">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Occupation
          </label>
          <Select
            placeholder="Select option"
            {...register("occupation", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          >
            {/* TODO: fetch options from database*/}
            {OCCUPATIONS.map((category, i) => {
              return (
                <option key={i} value={category}>
                  {category}
                </option>
              );
            })}
          </Select>

          <FormErrorMessage>
            {errors.occupation && errors.occupation.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.immigration} isRequired className="mb-5">
          <label className="block text-gray-700 text-sm mb-2">
            <span className="text-red-300">* </span>Immigration Status
          </label>
          <Select
            placeholder="Select option"
            {...register("immigration", {
              required: "This is required",
            })}
          >
            {/* TODO: fetch options from database*/}
            {IMMIGRATION_STATUS.map((category, i) => {
              return (
                <option key={i} value={category}>
                  {category}
                </option>
              );
            })}
          </Select>

          <FormErrorMessage>
            {errors.immigration && errors.immigration.message}
          </FormErrorMessage>
        </FormControl>

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
            <FormControl
              isInvalid={errors.educationalBackground}
              isRequired
              className="mb-5"
            >
              <label className="block text-gray-700 text-sm mb-2">
                <span className="text-red-300">* </span>Educational Background
              </label>
              <Select
                placeholder="Select option"
                {...register("educationalBackground", {
                  required: "This is required",
                })}
              >
                {/* TODO: fetch options from database*/}
                {EDUCATION.map((category, i) => {
                  return (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  );
                })}
              </Select>

              <FormErrorMessage>
                {errors.educationalBackground &&
                  errors.educationalBackground.message}
              </FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        {/* <div className="mb-4">
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
        </div> */}

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
