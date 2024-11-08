import { useEffect, useState } from 'react'
import './App.css'

type User = {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
      uUserId: number;
}

function App() {
  const [userData,setUserData] = useState<User[]>([]);
  const [loading,setLoading] = useState(false);

  const putUuserId = (curr:{})=>{
    const updatedUser = {
      ...curr,
      uUserId : Math.trunc(Math.random()*100000)
    }
    return updatedUser;
  }


  const fetchUserData = async()=>{
    setLoading(true);
    const response = await fetch("https://reqres.in/api/users?page=1");
    const {data} = await response.json();
    console.log(data);
    const newData = data.map((curr: {})=>{
      return putUuserId(curr);
    })
    console.log("new Data",newData);
    setUserData(newData);
    setLoading(false);
  }

  useEffect(()=>{
    fetchUserData();
  },[]);

  const toggleEmail = (id:number)=>{
    // to store this email we can use local storage or we can create other DS like map or any JS object would also work fine
    const user = userData.map((curr)=>{
      if(curr.uUserId === id){
        curr.email 
      }
    });

    console.log("user to toggle",user);
  }
  const duplicate = (key:number)=>{
    console.log("clicked");
  }

  return loading ? <div>Loading...</div> :(
    <main>
      {userData.map((curUser)=>{
        return <User uUserId={curUser.uUserId} duplicate={duplicate} toggleEmail={toggleEmail} key={curUser?.uUserId} id={curUser?.id} email={curUser?.email}/>
      })}
    </main>
  )
}

const User = ({id,email,uUserId,duplicate,toggleEmail}:{
  id:number;
  email:string;
  uUserId:number;
  duplicate: (uUserId:number)=>void;
  toggleEmail: (uUserId:number)=>void;
})=>{
  return <div className='flex'>
    <div className='p-2 m-2 border bg-blue-200'>{id}</div>
    <div className='p-2 m-2 border bg-blue-200'>{email}</div>
    <button onClick={()=>{toggleEmail(uUserId)}} className='p-2 m-2 border bg-blue-200'>Toggle Email</button>
    <button onClick={()=>{duplicate(uUserId)}} className='p-2 m-2 border bg-blue-200'>Dublicate</button>
  </div>
}

export default App
