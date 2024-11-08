  import { useEffect, useState } from 'react'
  import './App.css'

  type User = {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
        uUserId: number;
        isToggled: boolean;
  }

  function App() {
    const [userData,setUserData] = useState<User[]>([]);
    const [loading,setLoading] = useState(false);

    const fetchUserData = async()=>{
      setLoading(true);
      const response = await fetch("https://reqres.in/api/users?page=1");
      const {data} = await response.json();
      console.log(data);
      const newData = data.map((curr: {})=>{
        return {
          ...curr,
          uUserId : Math.trunc(Math.random()*100000),
          isToggled: false,
        }
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
          return {
            ...curr,
            isToggled : !curr.isToggled,
          };
        }else {
          return curr;
        }
      });
      setUserData(user);

    }
    const duplicate = (key:number)=>{
      const dublicateDataIndex = userData.findIndex((curr)=>curr.uUserId===key);
      console.log(userData[dublicateDataIndex]);
      const dublicatedata = {
        ...userData[dublicateDataIndex],
        uUserId : Math.trunc(Math.random()*100000),
      }
      const newArr = [
        ...userData.slice(0,dublicateDataIndex+1),
        dublicatedata,
        ...userData.slice(dublicateDataIndex+1),
      ]
      // let newArr = [];
      // for(let i=0;i<userData.length;i++){
      //   newArr.push(userData[i]);
      //   if(userData[i].uUserId === key){
      //     const obj = {
      //       ...userData[i],
      //       uUserId : Math.trunc(Math.random()*100000),
      //     }
      //     newArr.push(obj);
      //   }
      // }
      setUserData(newArr);
    }

    const deleteItem = (key:number)=>{
      const filteredDta = userData.filter((curr)=>curr.uUserId!==key);
      setUserData(filteredDta)
    }

    return loading ? <div>Loading...</div> :(
      <main>
        {userData.map((curUser)=>{
          return <User deleteItem={deleteItem} isToggled={curUser.isToggled} uUserId={curUser.uUserId} duplicate={duplicate} toggleEmail={toggleEmail} key={curUser?.uUserId} id={curUser?.id} email={curUser?.email}/>
        })}
      </main>
    )
  }

  const User = ({id,email,uUserId,duplicate,toggleEmail,deleteItem,isToggled}:{
    id:number;
    email:string;
    uUserId:number;
    duplicate: (uUserId:number)=>void;
    toggleEmail: (uUserId:number)=>void;
    isToggled:boolean;
    deleteItem:(uUserId:number)=>void;
  })=>{
    return <div className='flex'>
      <div className='p-2 m-2 border bg-blue-200'>{id}</div>
      <div className='p-2 m-2 border bg-blue-200'>{isToggled?"x@gmail.com":email}</div>
      <button onClick={()=>{toggleEmail(uUserId)}} className='p-2 m-2 border bg-blue-200'>Toggle Email</button>
      <button onClick={()=>{duplicate(uUserId)}} className='p-2 m-2 border bg-blue-200'>Dublicate</button>
      <button onClick={()=>{deleteItem(uUserId)}}className='p-2 m-2 border bg-blue-200'> Delete</button>
    </div>
  }

  export default App
