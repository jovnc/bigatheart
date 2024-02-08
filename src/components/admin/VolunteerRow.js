import { Box, Grid, Text } from "@chakra-ui/react";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import AdminUnregisterEvent from "./AdminUnregisterEvent";

export default function VolunteerRow({ volunteer }) {
  const {
    remarks,
    attended,
    finished,
    volunteer_id,
    event_id,
    users: { first_name, last_name },
  } = volunteer;
  return (
    <Grid templateColumns="1fr 1fr 0.5fr 0.5fr 0.25fr">
      <Text fontSize="xs">{`${first_name} ${last_name}`}</Text>
      <Text fontSize="xs">{remarks ? remarks : "NIL"}</Text>
      <Box>{finished ? <FcCheckmark /> : <FcCancel />}</Box>
      <Box>{attended ? <FcCheckmark /> : <FcCancel />}</Box>
      <Box>
        <AdminUnregisterEvent eventid={event_id} volunteerid={volunteer_id} />
      </Box>
    </Grid>
  );
}
