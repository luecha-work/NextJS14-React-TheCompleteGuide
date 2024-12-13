interface UserProfilePageProps {
  username: string;
}

function UserProfilePage(props: UserProfilePageProps) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps() {
  //   const { params, req, res } = context;

  //   console.log(req);
  //   console.log(res);

  return {
    props: {
      username: "Max",
    },
  };
}

export default UserProfilePage;
