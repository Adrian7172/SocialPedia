import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import {
  DoneOutlined,
  Edit,
  HomeOutlined,
  PermContactCalendarOutlined,
  WcOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { colorToken } from "theme";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Wrapper from "components/Wrapper";
import AddPost from "components/AddPost";
import UserPost from "components/UserPost";
import { useGetUserPostQuery } from "state/api/postApi";
import { useParams } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import {
  useAcceptRequestMutation,
  useAddFriendMutation,
  useGetAllFriendsQuery,
  useRemoveFriendMutation,
} from "state/api/userApi";
import { toast } from "react-toastify";
import { useState } from "react";

const ProfilePage = () => {
  const [ignore, setIgnore] = useState(false);

  const theme = useTheme();
  const mode = useSelector((state) => state.persistedReducer.user.mode);
  const token = useSelector((state) => state.persistedReducer.user.token);
  const currUser = useSelector((state) => state.persistedReducer.user.userData);

  const userId = useParams();

  /* GET USER DATA AND POSTS */
  const { data: userData, isLoading } = useGetUserPostQuery([token, userId.id]);
  const user = userData?.user;
  const userPost = userData?.userPost;

  /* GET ALL FRIENDS */
  const { data: friendsAndRequests } = useGetAllFriendsQuery([
    token,
    currUser?._id,
  ]);

  /* USER FRIENDS */
  const friends = friendsAndRequests?.filter(
    (friendShip) => friendShip.status === "accepted"
  );

  /* COMMING REQUESTS */
  const friendRequests = friendsAndRequests?.filter(
    (friendShip) =>
      friendShip.user2 === currUser?._id && friendShip.status === "pending"
  );

  /* SENDED REQUEST */
  const sendedRequests = friendsAndRequests?.filter(
    (friendShip) =>
      friendShip.user1 === currUser?._id && friendShip.status === "pending"
  );

  const isFriend = friends?.some(
    (friendship) =>
      friendship.user1 === user?._id || friendship.user2 === user?._id
  );
  const isFriendRequestResponder = friendRequests?.some(
    (friendship) => friendship.user1 === user?._id
  );

  const isFriendRequester = sendedRequests?.some(
    (friendship) => friendship.user2 === user?._id
  );

  /* ADD FRIEND */
  const [addFriend] = useAddFriendMutation();
  /* REMOVE A FRIEND */
  const [removeFriend] = useRemoveFriendMutation();
  /* ACCEPT REQUEST */
  const [acceptRequest] = useAcceptRequestMutation();

  async function modifyFriendList() {
    try {
      if (isFriend) {
        await removeFriend([
          token,
          { requester: currUser?._id, responder: user?._id },
        ]);
        toast("Friend removed");
        return;
      } else if (isFriendRequestResponder) {
        await acceptRequest([
          token,
          { requester: user?._id, responder: currUser?._id },
        ]);
        toast("Friend request accepted");
        return;
      } else if (isFriendRequester) {
        await removeFriend([
          token,
          { requester: currUser?._id, responder: user?._id },
        ]);
        toast("Friend request canceled");
        return;
      } else {
        await addFriend([
          token,
          { requester: currUser?._id, responder: user?._id },
        ]);
        toast("Friend request send");
      }
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  }

  /* HANDLE IGNORE */
  async function handleIgnore() {
    try {
      if (isFriend) {
        await removeFriend([
          token,
          { requester: currUser?._id, responder: user?._id },
        ]);
        return;
      } else {
        setIgnore(true);
      }
    } catch (error) {
      const msg = error.response.data.message
        ? error.response.data.message
        : "Something went wrong!!!";
      toast(msg);
    }
  }

  const address = `${user?.address?.locality}, ${user?.address?.city},
  ${user?.address?.state}, ${user?.address?.country}`;
  const newDate = new Date(user?.dateOfBirth);
  let dateOfBirth = null;
  if (user?.dateOfBirth) dateOfBirth = format(newDate, "MM/dd/yyyy");

  /*  BREAK POINTS */
  const tabScreen = useMediaQuery("(max-width:765px)");
  const smallScreen = useMediaQuery("(max-width: 550px)");
  const verySmallScreen = useMediaQuery("(max-width: 360px)");

  const PostLoading = () => {
    return (
      <Box
        sx={{
          p: "1rem",
        }}
      >
        <Skeleton
          variant="circular"
          width="4rem"
          height="4rem"
          sx={{
            mb: "1rem",
          }}
        />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton
          variant="rectangular"
          sx={{
            marginTop: "2rem",
            marginBottom: "1rem",
            maxWidth: smallScreen ? "60rem" : "100%",
            height: tabScreen ? (smallScreen ? "24rem" : "30rem") : "35rem",
            borderRadius: "2rem",
          }}
        />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      </Box>
    );
  };
  return (
    <>
      <Box flexDirection="column" flex={5} pb="8rem">
        <Box
          sx={{
            bgcolor: "transparent",
            height: "18rem",
            position: "relative",
            mt: "-1rem",
            ml: "-1.7rem",
            mr: "-1.7rem",
            boxShadow: `0px 18px 18px -18px ${
              mode === "light" ? "#000000" : colorToken.greyColors[80]
            }`,
          }}
        >
          <Image
            width="100%"
            height="18rem"
            src={`${require("../../assets/man-gf003569c4_1280.png")}`}
          />
          {/* {user.coverPicture && (
            <Image width="100%" height="20rem" src={user?.coverPicture} />
          )} */}
          <Button
            sx={{
              position: "absolute",
              textTransform: "none",
              right: "0",
              bottom: "0.5rem",
              color: theme.palette.neutral.main,
              bgcolor:
                mode === "light"
                  ? colorToken.greyColors[25]
                  : colorToken.greyColors[75],

              "&:hover": {
                background:
                  mode === "light"
                    ? colorToken.greyColors[10]
                    : colorToken.greyColors[90],
              },
            }}
          >
            <Edit
              sx={{
                mr: "0.5rem",
              }}
            />
            edit cover photo
          </Button>
        </Box>
        <Box
          width="100%"
          sx={{
            margin: "1.2rem 0",
            border: "1px solid",
            borderColor: theme.palette.secondary.main,
            borderRadius: "1rem",
          }}
        >
          <Box
            p={verySmallScreen ? "0.5rem" : "1.5rem"}
            height="max-content"
            display="flex"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              width="100%"
              flexDirection={smallScreen ? "column" : "row"}
            >
              <Avatar
                src={user?.profilePicture?.imageData}
                sx={{
                  width: smallScreen ? "10rem" : "14rem",
                  height: smallScreen ? "10rem" : "14rem",
                  mt: smallScreen ? "-5rem" : "-8rem",
                  border: "3px solid",
                  borderColor: theme.palette.background.default,
                }}
              />
              <Typography
                color={theme.palette.neutral.main}
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  ml: "1rem",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem", width: "20rem" }}
                  />
                ) : (
                  user?.fullName
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            mx="auto"
            p={
              smallScreen ? (verySmallScreen ? "0 1rem" : "0 2.3rem") : "0 2rem"
            }
            flexDirection="column"
            gap="0.3rem"
          >
            <Typography
              sx={{
                color: theme.palette.neutral.main,
                fontSize: "1.6rem",
                fontWeight: "600",
                mb: "0.3rem",
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem", width: "100%" }}
                />
              ) : (
                user?.bio
              )}
            </Typography>
            {user?.address && (
              <Box display="flex" gap={smallScreen ? 1 : 2}>
                <HomeOutlined
                  sx={{
                    p: "0.15rem",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    color: theme.palette.neutral.main,
                    fontSize: !smallScreen
                      ? "1.5rem"
                      : verySmallScreen
                      ? "1.2rem"
                      : "1.4rem",
                    wordBreak: "break-word",
                  }}
                >
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem", width: "100%" }}
                    />
                  ) : (
                    address
                  )}
                </Typography>
              </Box>
            )}
            {user?.occupation && (
              <Box display="flex" gap={smallScreen ? 1 : 2}>
                <WorkOutline
                  sx={{
                    p: "0.15rem",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    color: theme.palette.neutral.main,
                    fontSize: !smallScreen
                      ? "1.5rem"
                      : verySmallScreen
                      ? "1.2rem"
                      : "1.4rem",
                    wordBreak: "break-word",
                  }}
                >
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem", width: "100%" }}
                    />
                  ) : (
                    user?.occupation
                  )}
                </Typography>
              </Box>
            )}
            {dateOfBirth && (
              <Box display="flex" gap={smallScreen ? 1 : 2}>
                <PermContactCalendarOutlined
                  sx={{
                    p: "0.15rem",
                  }}
                />
                <Typography
                  sx={{
                    width: "100%",
                    color: theme.palette.neutral.main,
                    fontSize: !smallScreen
                      ? "1.5rem"
                      : verySmallScreen
                      ? "1.2rem"
                      : "1.4rem",
                    wordBreak: "break-word",
                  }}
                >
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem", width: "100%" }}
                    />
                  ) : (
                    dateOfBirth
                  )}
                  {!isLoading && <strong>. {user?.age} years old</strong>}
                </Typography>
              </Box>
            )}
            <Box display="flex" gap={smallScreen ? 1 : 2}>
              <WcOutlined
                sx={{
                  p: "0.15rem",
                }}
              />
              <Typography
                sx={{
                  width: "100%",
                  color: theme.palette.neutral.main,
                  fontSize: !smallScreen
                    ? "1.5rem"
                    : verySmallScreen
                    ? "1.2rem"
                    : "1.4rem",
                  wordBreak: "break-word",
                  mb: "2rem",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem", width: "100%" }}
                  />
                ) : (
                  user?.gender
                )}
              </Typography>
            </Box>
          </Box>
          {currUser?._id !== user?._id && !ignore && (
            <FlexBetween
              gap={1}
              sx={{
                width: "100%",
              }}
            >
              <Button
                onClick={handleIgnore}
                sx={{
                  width: "50%",
                  color: theme.palette.neutral.light,
                  textTransform: "none",
                  fontSize: "1.5rem",
                }}
              >
                {isFriend ? "Remove Friend" : "ignore"}
              </Button>
              <Button
                onClick={() => modifyFriendList()}
                variant="contained"
                sx={{
                  width: "50%",
                  textTransform: "none",
                }}
              >
                {isFriend ? (
                  <>
                    <DoneOutlined /> Friends
                  </>
                ) : isFriendRequestResponder ? (
                  "Accept Friend Request"
                ) : isFriendRequester ? (
                  <>
                    <DoneOutlined /> Request Sended
                  </>
                ) : (
                  "Add Friends"
                )}
              </Button>
            </FlexBetween>
          )}
        </Box>
        {user?._id === currUser?._id && <AddPost />}
        {isLoading ? (
          <Box>
            <Wrapper>
              <PostLoading />
            </Wrapper>
            <Wrapper>
              <PostLoading />
            </Wrapper>
            <Wrapper>
              <PostLoading />
            </Wrapper>
          </Box>
        ) : (
          userPost?.map((post) => {
            return <UserPost {...post} key={post._id} />;
          })
        )}
      </Box>
    </>
  );
};

export default ProfilePage;
