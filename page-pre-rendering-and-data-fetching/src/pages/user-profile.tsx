import { NextPage } from "next";

interface UserProfilePageProps {
  username: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ username }) => {
  return <h1>{username}</h1>;
};

export async function getServerSideProps() {
  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfilePage;
