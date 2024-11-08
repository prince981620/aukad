/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './App.css';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  uUserId: number;
};

function App() {
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    const response = await fetch('https://reqres.in/api/users?page=1');
    const { data } = await response.json();
    const editedData: any = data.map((d: User) => {
      const newUser = {
        ...d,
        isToggled: false,
        uuid: Math.trunc(Math.random() * 100000),
      };
      return newUser;
    });

    setUserData(editedData);
    setLoading(false);
  };

  console.log(userData);

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleEmail = (id: number) => {
    const user = userData.map((curr: any) => {
      if (curr.uuid === id) {
        return {
          ...curr,
          isToggled: !curr.isToggled,
        };
      }
      return curr;
    });

    setUserData(user);

    console.log('user to toggle', user);
  };

  const duplicate = (key: number) => {
    const newArray = [];
    for (let i = 0; i < userData.length; i++) {
      newArray.push(userData[i]);
      if (userData[i].uuid === key) {
        newArray.push({
          ...userData[i],
          uuid: Math.trunc(Math.random() * 100000),
        });
      }
    }

    setUserData(newArray);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <main>
      {userData.map((curUser: any) => {
        return (
          <User
            uUserId={curUser.uuid}
            duplicate={duplicate}
            isToggled={curUser.isToggled}
            toggleEmail={toggleEmail}
            key={curUser?.uuid}
            id={curUser?.id}
            email={curUser?.email}
          />
        );
      })}
    </main>
  );
}

const User = ({
  id,
  email,
  uUserId,
  duplicate,
  toggleEmail,
  isToggled,
}: {
  id: number;
  email: string;
  uUserId: number;
  isToggled: boolean;
  duplicate: (uUserId: number) => void;
  toggleEmail: (uUserId: number) => void;
}) => {
  return (
    <div className="flex">
      <div className="p-2 m-2 border bg-blue-200">{id}</div>
      <div className="p-2 m-2 border bg-blue-200">{isToggled ? 'x@gmail.com' : email}</div>
      <button
        onClick={() => {
          toggleEmail(uUserId);
        }}
        className="p-2 m-2 border bg-blue-200"
      >
        Toggle Email
      </button>
      <button
        onClick={() => {
          duplicate(uUserId);
        }}
        className="p-2 m-2 border bg-blue-200"
      >
        Dublicate
      </button>
    </div>
  );
};

export default App;
