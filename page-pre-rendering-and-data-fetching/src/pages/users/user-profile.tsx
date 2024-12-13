import { GetServerSidePropsContext } from "next";

interface UserProfilePageProps {
  username: string;
}

function UserProfilePage(props: UserProfilePageProps) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfilePage;
