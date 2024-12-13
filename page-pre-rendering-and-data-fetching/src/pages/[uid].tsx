import { GetServerSidePropsContext } from "next";

interface UserIdPageProps {
  id: string;
}

function UserIdPage(props: UserIdPageProps) {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const userId = params?.uid;

  return {
    props: {
      id: `userid-${userId}`,
    },
  };
}

export default UserIdPage;
